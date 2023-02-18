<script>

import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
	components: {
		Header,
		Footer,
	},
	data() {
		return {};
	},
};
</script>

<template>
	<Header />
	<div class="content flex_center">
		<RouterView></RouterView>
	</div>
<Footer />
</template>

<style lang="scss" scoped>
.content {
    min-width: 1140px;
	padding: 30px 0;
}
</style>