<script setup>
import { onMounted } from 'vue'
import createModel from '@/service/model.jsx'

onMounted(() => {
    createModel("<div>123</div>")
})
</script>

<template>
    <div>123</div>
</template>

<style scoped>

</style>