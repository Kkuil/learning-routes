<script setup>
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router"
import { RegistryVerify } from "@/service/verify"
import { registry } from "@/api/registry"
import { useVerify } from "@/hooks/useVerify"
import Agreement from "@/components/Agreement.vue"
import msgTips from "@/service/msgTips"
import Input from "@/components/Input.vue"

import _ from "lodash"

const $router = useRouter()
const registryInfo = ref({
    phone: {
        value: "",
        isVerify: false
    },
    sms: {
        value: "",
        isSend: false,
        remain: 60,
        timerId: null
    },
    account: "",
    fPassword: "",
    sPassword: "",
})
// 焦点
let focus = ref(-1)

// 修改信息
const modify = (key, value) => {
    registryInfo.value = {
        ...registryInfo.value,
        [key]: value
    }
}

// 验证格式
const verify = () => {
    if (!registryInfo.value.phone.isVerify) {
        msgTips.error("电话号码格式错误，请重新填写", 2000)
        return false
    } else if (!useVerify(RegistryVerify.SMS, registryInfo.value.sms.value)) {
        msgTips.error("验证码格式错误", 2000)
        return false
    } else if (!useVerify(RegistryVerify.ACCOUNT, registryInfo.value.account)) {
        msgTips.error("账号格式错误，该账号不能使用", 2000)
        return false
    } else if (!useVerify(RegistryVerify.PASSWORD, registryInfo.value.fPassword)) {
        msgTips.error("密码格式错误，该密码不能使用", 2000)
        return false
    }
    if (registryInfo.value.fPassword !== registryInfo.value.sPassword) {
        msgTips.error("两次密码输入不一致", 2000)
        return false
    }
    return true
}

// 注册
const goRegistry = _.throttle(async () => {
    const isSuccess = verify()
    if (isSuccess) {
        await registry({
            mobile: registryInfo.value.phone.value,
            captcha: registryInfo.value.sms.value,
            username: registryInfo.value.account,
            password: registryInfo.value.fPassword,
            repassword: registryInfo.value.sPassword,
        })
        $router.replace("/login")
    }
}, 2000)

// 返回首页
const returnIndex = () => {
    $router.push("/")
}

// 返回登录页面
const login = () => {
    $router.push("/login")
}

// 聚焦
const onFocus = (flag) => {
    focus.value = flag
}

// 限制电话号码位数
const limitPhoneNum = (e) => {
    const value = e.target.value.slice(0, 11)
    modify("phone", {
        value,
        isVerify: useVerify(RegistryVerify.PHONE, value)
    })
}

// 计算位数
const remainNum = computed(() => {
    return 11 - registryInfo.value.phone.value.length
})

// 监视isSend
watch(() => registryInfo.value.sms.isSend, (nValue, oValue) => {
    if (nValue) {
        registryInfo.value.sms.timerId = setInterval(() => {
            if (registryInfo.value.sms.remain) {
                registryInfo.value.sms.remain--
            } else {
                clearTimeout(registryInfo.value.sms.timerId)
                registryInfo.value.sms.remain = 60
                registryInfo.value.sms.isSend = false
            }
        }, 1000)
    }
})

// 事件监听
const sendMs = () => {
}

</script>

<template>
    <div class="registry_info flex_center">
        <h3 class="title">账号注册</h3>
        <Input class="phone" :class="{ isFocus: focus === 0 }">
        <template #icon>
            <i class="iconfont flex_center icon-phone"></i>
        </template>
        <template #input>
            <input :value="registryInfo.phone.value" @input="limitPhoneNum($event)" @keyup.enter="sendMs"
                @focus="onFocus(0)" @blur="onFocus(-1)" type="text" placeholder="请输入您的手机号" />
        </template>
        <template #helper>
            <span class="num" v-show="remainNum">{{ remainNum }}</span>
            <div v-show="!remainNum" class="flag">
                <i v-show="registryInfo.phone.isVerify" class="iconfont icon-success"></i>
                <i v-show="!registryInfo.phone.isVerify" class="iconfont icon-fail"></i>
            </div>
        </template>
        </Input>
        <Input :class="{ isFocus: focus === 1 }">
        <template #icon>
            <i class="iconfont flex_center icon-sheild"></i>
        </template>
        <template #input>
            <input v-model="registryInfo.sms.value" @keyup.enter="goRegistry" @focus="onFocus(1)" @blur="onFocus(-1)"
                type="text" placeholder="请输入验证码" />
        </template>
        <template #helper>
            <SendMs :phone="registryInfo.phone.value" />
        </template>
        </Input>
        <Input :class="{ isFocus: focus === 2 }">
        <template #icon>
            <i class="iconfont flex_center icon-user"></i>
        </template>
        <template #input>
            <input v-model="registryInfo.account" @keyup.enter="goRegistry" @focus="onFocus(2)" @blur="onFocus(-1)"
                type="text" placeholder="请输入您的账号" />
        </template>
        </Input>
        <Input :class="{ isFocus: focus === 3 }">
        <template #icon>
            <i class="iconfont flex_center icon-password"></i>
        </template>
        <template #input>
            <input v-model="registryInfo.fPassword" @keyup.enter="goRegistry" @focus="onFocus(3)" @blur="onFocus(-1)"
                type="password" placeholder="请输入您的密码" />
        </template>
        </Input>
        <Input :class="{ isFocus: focus === 4 }">
        <template #icon>
            <i class="iconfont flex_center icon-password"></i>
        </template>
        <template #input>
            <input v-model="registryInfo.sPassword" @keyup.enter="goRegistry" @focus="onFocus(4)" @blur="onFocus(-1)"
                type="password" placeholder="请再次输入您的密码" />
        </template>
        </Input>
        <Agreement />
        <button class="registry" @click="goRegistry">立即注册</button>
        <div class="bottom flex_center">
            <span class="return_index" @click="returnIndex">返回首页</span>
            <span class="split">&nbsp;|&nbsp;</span>
            <span class="words">已有账号，马上</span>
            <span class="login" @click="login">去登录</span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.registry_info {
    position: relative;
    flex-direction: column;
    width: 50%;
    height: 100%;
    padding: 10px 70px;

    >div {
        margin-top: 10px;
    }

    .title {
        font-size: 18px;
        font-weight: bolder;
    }

    .registry {
        width: 130px;
        height: 30px;
        border-radius: 15px;
        background-color: var(--primary_clr);
        color: #fff;
        font-size: 13px;
        transition: transform .3s;

        &:active {
            transform: scale(0.95);
        }
    }

    .registry {
        width: 100%;
        height: 40px;
        border-radius: 20px;
        font-weight: bolder;
        margin-top: 15px;
        transition: transform .3s;
    }

    .bottom {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;

        .return_index,
        .login {
            cursor: pointer;
            color: var(--primary_clr);

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .phone {
        .num {
            font-size: 14px;
            color: #777;
        }

        .flag {
            .icon-success {
                color: green;
            }

            .icon-fail {
                color: red;
            }
        }
    }
}
</style>