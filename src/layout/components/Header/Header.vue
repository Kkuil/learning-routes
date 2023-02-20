<script setup>
import { mapState } from "pinia"
import { useUserStore } from "@/stores/user"
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getInfo } from "@/hooks/useUser"
import Nav from "./components/Nav.vue"
import Search from "./components/Search.vue"
import Cart from "./components/Cart.vue"
import MyCourse from "./components/MyCourse.vue"
import Avatar from "./components/Avatar.vue"
import NavBg from "@/views/LearningRoutes/components/Nav/components/NavBg.vue"

const userInfo = {
    ...mapState(useUserStore, ["userInfo"])
}
const $router = useRouter()

onMounted(() => {
	getInfo()
})

const returnIndex = () => {
	$router.push("/index")
}

</script>

<template>
	<div class="header flex">
		<div class="logo flex_center" @click="returnIndex">
			<img src="/images/logo.png" alt="logo" title="小鹿线" />
		</div>
		<Nav />
		<Search />
		<Cart />
		<MyCourse />
		<Avatar />
		<NavBg bgi="https://oss.xuexiluxian.cn/xiaoluxian-vcr/8c6ee4cf7fb54425987871b9a2f52f2e.png"/>
	</div>
</template>

<style lang="scss" scoped>
.header {
	justify-content: space-around;
	align-items: center;
	min-width: 1140px;
	height: 100px;
	padding: 0 10%;
	box-shadow: 0 0 3px 2px #ccc;
	background-color: var(--primary_bgc);

	.logo {
		width: 140px;
		height: 100%;

		img {
			width: 140px;
			height: 56px;
			cursor: pointer;
		}
	}




}
</style>