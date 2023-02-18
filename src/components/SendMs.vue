<script setup>

import { reactive, onUnmounted, watch, defineProps } from "vue"
import _ from "lodash"
import { sendCaptcha } from "@/api/registry"
import { RegistryVerify } from "@/service/verify"
import { useVerify } from "@/hooks/useVerify"
import msgTips from "@/service/msgTips"

const $props = defineProps(["phone"])

const info = reactive({
    isSend: false,
    remain: 60,
    timerId: null
})

// 发送短信验证码
const sendSm = _.throttle(async () => {
    if (useVerify(RegistryVerify.PHONE, $props.phone)) {
        if (!info.isSend) {
            await sendCaptcha($props.phone)
            info.isSend = true
            info.timerId = setInterval(() => {
                info.remain--
            }, 1000)
        }
    } else {
        msgTips.error("手机号格式错误，请再次检查", 2000)
    }
}, 2000)

onUnmounted(() => {
    info.timerId && clearInterval(info.timerId)
})

watch(() => info.remain, (nValue, oValue) => {
    if (!nValue) {
        info.isSend = false
        info.remain = 60
    }
})

</script>

<template>
    <button class="sendSm" @click="sendSm" :disabled="info.isSend"
        :style="{ 'background-color': info.isSend ? '#ccc' : '' }">{{
            info.isSend ? `${info.remain}秒后再试` :
            "发送验证码"
        }}</button>
</template>

<style scoped lang="scss">
.sendSm {
    width: 130px;
    height: 30px;
    border-radius: 15px;
    background-color: var(--primary_clr);
    color: #fff;
    font-size: 13px;
    transition: transform .3s;
}
</style>