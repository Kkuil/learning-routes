<script setup>


import { useRoute } from "vue-router"

const $route = useRoute()

</script>

<template>
    <div class="not_found flex_center">
        <img src="/images/empty-resource.png" alt="404" title="404" class="not_found_img">
        <h1>/{{ $route.params.path }}路径不匹配</h1>
</div>
</template>

<style scoped lang="scss">
.not_found {
    flex-direction: column;
    height: calc(100vh - 310px);

    h1 {
        font-size: 20px;
        font-weight: bolder;
    }
}
</style>