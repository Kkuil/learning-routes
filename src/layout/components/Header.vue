<script setup>


import { ref, onMounted, reactive } from "vue"
import { RouterLink, useRouter } from "vue-router"
import { getUserInfo } from "@/api/user"
import { mapActions, mapState } from "pinia"
import { useUserStore } from "../../stores/user"
import NavBg from "@/views/LearningRoutes/components/Nav/components/NavBg.vue"

const $router = useRouter()

const userInfo = reactive({
	...mapState(useUserStore, ["userInfo"])
})

const useActions = {
	...mapActions(useUserStore, ["set"])
}

onMounted(() => {
	getInfo()
})

const returnIndex = () => {
	$router.push("/index")
}

// 获取用户信息
const getInfo = async () => {
	const userInfo = await getUserInfo()
	useActions.set("userInfo", userInfo)
}

</script>

<template>
	<div class="header flex">
		<div class="logo flex_center" @click="returnIndex">
			<img src="/images/logo.png" alt="logo" title="小鹿线" />
		</div>
		<div class="nav">
			<ul>
				<li>
					<RouterLink to="/index" active-class="active">首页</RouterLink>
				</li>
				<li>
					<RouterLink to="/course" active-class="active">课程</RouterLink>
				</li>
				<li>
					<RouterLink to="/vip" active-class="active">会员</RouterLink>
				</li>
				<li>
					<RouterLink to="/resume" active-class="active">简历</RouterLink>
				</li>
				<li>
					<RouterLink to="/boke" active-class="active">博客</RouterLink>
				</li>
				<li>
					<RouterLink to="/sys_class" active-class="active">系统班</RouterLink>
				</li>
			</ul>
		</div>
		<div class="search">
			<input type="text" placeholder="请输入要搜索的课程">
			<i class="iconfont icon-fangdajing flex_center"></i>
		</div>
		<i class="iconfont icon-cart"></i>
		<span class="my_courses">我的课程</span>
		<div class="login_avatar">
			<div v-if="!userInfo.userInfo()" class="login">登录</div>
			<img v-else :src="userInfo.userInfo().avatar" alt="avatar" :title="userInfo.userInfo().username" class="avatar">
		</div>
		<NavBg />
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

	.nav {
		height: 100%;
		color: var(--second_ft_clr);
		font-weight: bolder;

		ul {
			height: 100%;

			li {
				height: 100%;

				a {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80px;
					height: 100%;
					border-bottom: 4px solid transparent;
				}
			}
		}

		.active {
			color: var(--primary_ft_clr);
			border-bottom: 4px solid var(--primary_ft_clr);
		}
	}

	.search {
		display: flex;
		width: 200px;
		height: 48px;
		background-color: #f0f2f4;
		padding: 10px;
		border-radius: 10px;

		input {
			font-size: 14px;
			width: 80%;
			height: 100%;
			background-color: transparent;
		}

		i {
			width: 20%;
			height: 100%;
			font-size: 20px;
			color: #ccc;
		}
	}

	.icon-cart {
		cursor: pointer;
		color: #ccc;
		font-size: 25px;
		transition: color .3s;

		&:hover {
			color: var(--primary_ft_clr);
		}
	}

	.my_courses {
		cursor: pointer;
		opacity: 0.6;
		color: var(--first_ft_clr);
	}

	.login_avatar {
		cursor: pointer;

		.avatar {
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}

		.login {
			font-weight: bolder;
			transition: color .3s;

			&:hover {
				color: var(--primary_clr);
			}
		}
	}
}
</style>