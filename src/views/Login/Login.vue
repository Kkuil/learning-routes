<script setup>
import LoginRegistry from "@/components/LoginRegistry.vue"
import QrCodeLogin from "@/views/Login/components/QrCodeLogin/QrCodeLogin.vue"
import PwdLogin from "@/views/Login/components/PwdLogin/PwdLogin.vue"
</script>

<template>
    <LoginRegistry>
        <template #left>
            <QrCodeLogin />
        </template>
        <template #right>
            <PwdLogin />
        </template>
    </LoginRegistry>
</template>