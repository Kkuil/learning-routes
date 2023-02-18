<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import Agreement from "@/components/Agreement.vue"
import Account from "./components/Account.vue"
import Sms from "./components/Sms.vue"

const $router = useRouter()
const activeKey = ref(0)

const returnIndex = () => {
    $router.replace("/")
}

const registry = () => {
    $router.replace("/registry")
}

</script>

<template>
    <div class="pwd_login flex_center">
        <div class="container">
            <div class="nav flex">
                <div class="account flex_center" :class="{ active: !activeKey }" @click="activeKey = 0">账号登录</div>
                <div class="sms flex_center" :class="{ active: activeKey }" @click="activeKey = 1">短信登录</div>
            </div>
            <div class="form">
                <Account v-show="!activeKey" />
                <Sms v-show="activeKey" />
                <div class="forget_pwd">忘记密码？</div>
                <Agreement />
            </div>
            <div class="bottom flex_center">
                <span class="return_index" @click="returnIndex">返回首页</span>
                <span class="split">&nbsp;|&nbsp;</span>
                <span class="words">还没有账号？</span>
                <span class="registry" @click="registry">去注册</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.pwd_login {
    background: url("/images/login-ybbg.jpg") no-repeat center;
    width: 50%;
    height: 100%;

    .container {
        position: relative;
        width: 350px;
        height: 440px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 8px #ccc;
        padding: 10px 40px;

        .nav {
            width: 100%;
            font-weight: bolder;
            justify-content: space-around;

            >div {
                cursor: pointer;
                width: 100px;
                height: 45px;
                border-bottom: 4px solid transparent;
            }

            .active {
                color: var(--primary_clr);
                border-color: var(--primary_clr);
            }
        }

        .form {
            .forget_pwd {
                display: flex;
                justify-content: flex-end;
                cursor: pointer;
                margin-top: 5px;
                font-size: 13px;
                color: #777;
                transition: color .3s;

                &:hover {
                    color: var(--primary_clr);
                }
            }
        }

        .bottom {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 12px;

            .return_index,
            .registry {
                cursor: pointer;
                color: var(--primary_clr);

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>