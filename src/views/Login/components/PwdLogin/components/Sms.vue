<script setup>
import Input from "@/components/Input.vue"
import SendMs from "@/components/SendMs.vue"
import { loginWithMobile } from "@/api/login"
import { useVerify } from "@/hooks/useVerify"
import { RegistryVerify } from "@/service/verify"

import { ref, reactive } from "vue"
import msgTips from "@/service/msgTips"
import { useRouter } from "vue-router"

const $router = useRouter()
const info = reactive({
    phone: "",
    captcha: ""
})

const login = async () => {
    if (useVerify(RegistryVerify.PHONE, info.phone)) {
        const isLogin = await loginWithMobile({
            mobile: info.phone,
            captcha: info.captcha,
        })
        isLogin && $router.replace("/")
    } else {
        msgTips.error("手机号格式错误，请重新输入", 2000)
    }
}

</script>

<template>
    <div class="sms flex">
        <Input class="phone">
        <template #icon>
            <i class="iconfont icon-phone"></i>
        </template>
        <template #input>
            <input v-model="info.phone" type="text" placeholder="请输入您的手机号" />
        </template>
        </Input>
        <Input class="captcha">
        <template #input>
            <input v-model="info.captcha" type="text" placeholder="请输入验证码" @keyup.enter="login" />
        </template>
        <template #helper>
            <SendMs :phone="info.phone" />
        </template>
        </Input>
        <button class="login" @click="login">登录</button>
</div>
</template>

<style scoped lang="scss">
.sms {
    margin-top: 20px;
    flex-direction: column;
    justify-content: space-around;
    height: 180px;

    .login {
        margin-top: 20px;
        width: 100%;
        height: 35px;
        border-radius: 17.5px;
        color: #fff;
        font-weight: bolder;
        background-color: var(--primary_clr);
        transition: transform .3s;

        &:active {
            transform: scale(0.95);
        }
    }
}
</style>