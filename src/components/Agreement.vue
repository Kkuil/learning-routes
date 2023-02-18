<script setup>
import { useRouter } from "vue-router"

const $router = useRouter()

const checkAgreement = (agreement_type) => {
    $router.push(`/agreement?agreement_type=${agreement_type}`)
}
</script>

<template>
    <div class="agreements">
        <span>登录即同意</span>
        <span @click="checkAgreement('agreement')" target="_blank" class="service_agreement">《小鹿线用户服务协议》</span>
        <span @click="checkAgreement('policy')" target="_blank" class="private_policy">《小鹿线用户隐私政策》</span>
    </div>
</template>

<style scoped lang="scss">
.agreements {
    margin-top: 10px;
    font-size: 13px;

    .service_agreement,
    .private_policy {
        cursor: pointer;

        &:hover {
            color: var(--primary_clr);
            text-decoration: underline;
        }
    }
}
</style>