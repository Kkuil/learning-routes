<script setup>
import { defineProps } from 'vue'

const $props = defineProps({
    bgi: {
        type: String,
        required: true
    }
})



</script>

<template>
    <div class="nav_bg" :style="`background-image: url(${$props.bgi});`"></div>
</template>

<style scoped lang="scss">
.nav_bg {
    z-index: -1;
    position: absolute;
    top: 30px;
    width: 100%;
    height: 30px;
    background-repeat: repeat-x;
    opacity: 0.7;
    filter: blur(60px);
}
</style>