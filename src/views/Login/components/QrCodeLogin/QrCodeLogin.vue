<script>
import AraleQRCode from "arale-qrcode"
import msgTips from "@/service/msgTips"
import { mapActions } from "pinia"
import { useLoginStore } from "@/stores/login"

import { Decrypt } from "@/utils/aes_parser"
import { loginWithAppQr, getLoginQrStatus } from "@/api/login"
import { reactive } from "@vue/reactivity"
export default {
    setup() {
        const timerId = reactive({
            refreshTimerId: null,
            scheduleTimerId: null
        })
        return {
            timerId
        }
    },
    created() {
        this.setAesToken()
    },
    unmounted() {
        this.clearTimer()
    },
    methods: {
        // 获取二维码数据
        async setAesToken() {
            const { data: { data }, meta: { code, success } } = await loginWithAppQr()
            if (code === "200" && success) {
                this.refreshQrCodeAsSchedule()
                const { uuid } = Decrypt(data)
                this.getQrStatus(uuid)
                this.set("uuid", uuid)
                this.showQrCode(data)
            } else {
                msgTips.error("获取二维码失败，请再次刷新", 2000, () => {
                    // ...
                }, true)
            }
        },
        ...mapActions(useLoginStore, ["set"]),
        // 短轮询二维码状态
        getQrStatus(uuid) {
            this.timerId = setInterval(async () => {
                await getLoginQrStatus(uuid)
            }, 3000)
        },
        // 显示二维码
        showQrCode(text) {
            const code_pic = new AraleQRCode({
                render: "svg",
                text,
                size: 180
            })
            this.$refs.code.querySelector("svg")?.remove()
            this.$refs.code.appendChild(code_pic)
        },
        // 刷新二维码
        refresh() {
            this.clearTimer()
            this.setAesToken()
        },
        // 定期刷新二维码
        refreshQrCodeAsSchedule() {
            this.scheduleTimerId = setInterval(() => {
                this.refresh()
            }, 1000 * 60 * 3)
        },
        // 清除定时器
        clearTimer() {
            this.timerId.refreshTimerId && clearInterval(this.timerId.refreshTimerId)
            this.timerId.scheduleTimerId && clearInterval(this.timerId.scheduleTimerId)
        }
    }
}
</script>

<template>
    <div class="qr_code_login flex_center">
        <img src="/images/logo02.png" title="小鹿线" alt="logo" class="logo">
        <div class="qr_code">
            <div class="code" ref="code"></div>
            <div @click="refresh" class="refresh">
                <i class="iconfont icon-shuaxin"></i>
                <span>点击刷新</span>
            </div>
            <div class="comment">注：此二维码三分钟内有效</div>
        </div>
        <div class="words">扫码登录</div>
        <div class="split">————— 快捷登录 —————</div>
        <div class="other_ways flex">
            <div class="wechat flex_center">
                <a href="https://open.weixin.qq.com/connect/qrconnect?response_type=code&appid=wx49a4993d58eeeff8&redirect_uri=https://www.xuexiluxian.cn/oauth/WECHAT_OPEN/callback&scope=snsapi_login&state=df2562ec68e49f873d08bd468974f029"
                    target="_blank">
                    <img src="/images/wx.png" alt="WeChat" title="WeChat" />
                </a>
            </div>
            <div class="qq flex_center">
                <a href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101981229&redirect_uri=https://www.xuexiluxian.cn/oauth/QQ/callback&state=39958d9a2b9e4bdbb605cf76bda9a08d&scope=get_user_info"
                    target="_blank">
                    <img src="/images/qq.png" alt="QQ" title="QQ" />
                </a>
            </div>
            <div class="weibo flex_center">
                <a href="https://api.weibo.com/oauth2/authorize?response_type=code&client_id=4232965955&redirect_uri=https://www.xuexiluxian.cn/oauth/weibo/callback&state=e26d178b4666a73b23e3b049df552949&scope=all###"
                    target="_blank">
                    <img src="/images/weibo.png" alt="Webo" title="Webo" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.qr_code_login {
    position: relative;
    background-color: #388fff;
    flex-direction: column;
    width: 50%;
    height: 100%;

    >div {
        margin-top: 10px;
    }

    .logo {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 120px;
        height: 48px;
    }

    .qr_code {
        padding: 10px 10px 5px;
        background-color: #fff;

        .refresh {
            cursor: pointer;
            text-align: center;
            font-size: 13px;
            color: var(--primary_clr);
        }

        .comment {
            text-align: center;
            font-size: 10px;
            color: #777;
        }
    }

    >.words {
        color: #fff;
        font-size: 14px;
    }

    .split {
        color: #ddd7e7;
        font-size: 14px;
    }

    .other_ways {
        width: 50%;
        justify-content: space-around;

        >div {
            cursor: pointer;
            width: 30px;
            height: 30px;
            border-radius: 15px;
            background-color: #fff;
            transition: background-color .3s;

            &:hover {
                background-color: #84ebbe;
            }
        }
    }
}
</style>
