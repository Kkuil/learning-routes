<script setup>
import Navigation from "./components/Navigation.vue"
import Banner from "./components/Banner.vue"

</script>

<template>
	<div class="nav">
		<Navigation />
		<Banner />
</div>
</template>

<style scoped lang="scss">
.nav {
	display: flex;
	width: 1140px;
	height: 530px;
	overflow: hidden;
	border-radius: 20px;
	background-color: var(--primary_bgc);
	box-shadow: 0 0 2px 2px #ccc;
	color: #fff;
}
</style>
