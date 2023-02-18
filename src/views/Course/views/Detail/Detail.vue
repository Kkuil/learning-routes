<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"

const $route = useRoute()

onMounted(() => {
    console.log($route.params.id)
})

</script>

<template>
    <div class="details">details</div>
</template>

<style scoped lang="scss"></style>