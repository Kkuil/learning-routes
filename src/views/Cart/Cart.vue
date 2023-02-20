<script setup>
import ColorfulGradientBg from "@/components/ColorfulGradientBg.vue"
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.vue"

</script>

<template>
    <div class="cart flex_center">
        <ColorfulGradientBg class="bgc" />
        <ShoppingCart />
    </div>
</template>

<style scoped lang="scss">
.cart {
    width: 100%;
    .bgc {
        z-index: 0;
        position: absolute;
        top: 100px;
    }
}
</style>