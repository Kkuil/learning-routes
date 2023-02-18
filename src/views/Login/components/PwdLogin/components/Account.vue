<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { loginWithAccount } from "@/api/login"
import msgTips from "@/service/msgTips"
import Input from "@/components/Input.vue"

const $router = useRouter()
const loginInfo = ref({
    account: "",
    password: ""
})
// 焦点
let focus = ref(-1)

const login = async () => {
    if (loginInfo.value.account && loginInfo.value.password) {
        const isLogin = await loginWithAccount({
            username: loginInfo.value.account,
            password: loginInfo.value.password
        })
        if (isLogin) {
            $router.replace("/")
        } else {
            loginInfo.value.account = ""
            loginInfo.value.password = ""
        }
    } else {
        msgTips.error("账号密码不能为空", 2000, (close) => {
            // ...
        }, true)
    }
}

const onFocus = (flag) => {
    focus.value = flag
}

</script>

<template>
    <div class="account flex">
        <Input :class="{ isFocus: focus === 0 }">
        <template #icon>
            <i class="iconfont flex_center icon-user"></i>
        </template>
        <template #input>
            <input v-model="loginInfo.account" @keyup.enter="login" @focus="onFocus(0)" @blur="onFocus(-1)" type="text"
                placeholder="请输入您的账号" />
        </template>
        </Input>
        <Input :class="{ isFocus: focus === 1 }">
        <template #icon>
            <i class="iconfont flex_center icon-password"></i>
        </template>
        <template #input>
            <input v-model="loginInfo.password" @keyup.enter="login" @focus="onFocus(1)" @blur="onFocus(-1)" type="password"
                placeholder="请输入您的密码" />
        </template>
        </Input>
        <button class="login" @click="login">登录</button>
</div>
</template>

<style scoped lang="scss">
.account {
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
