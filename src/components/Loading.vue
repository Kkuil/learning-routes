<script>
export default {
	data() {
		return {};
	},
};
</script>

<template>
	<div class="mask_loading">
		<div class="loading"></div>
	</div>
</template>

<style scoped lang="scss">
.mask_loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0 , 0, 0.6);
	$animation-duration: 1.8s;

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 50px;
		height: 10px;
		background: #3498db;
		border-radius: 5px;
		animation: load $animation-duration ease-in-out infinite;
		&:before,
		&:after {
			position: absolute;
			display: block;
			content: "";
			animation: load $animation-duration ease-in-out infinite;
			height: 10px;
			border-radius: 5px;
		}
		&:before {
			top: -20px;
			left: 10px;
			width: 40px;
			background: #ef4836;
		}
		&:after {
			bottom: -20px;
			width: 35px;
			background: #f5ab35;
		}
	}

	@keyframes load {
		0% {
			transform: translateX(40px);
		}

		50% {
			transform: translateX(-30px);
		}
		100% {
			transform: translateX(40px);
		}
	}
}
</style>