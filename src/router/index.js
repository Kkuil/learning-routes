import { createRouter, createWebHistory } from "vue-router"
import { routes, mapNameToTitle } from "@/service/config/router.config"

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
})

// 全局前置守卫...
router.beforeEach((to, from, next) => {
	document.title = "小鹿线" + mapNameToTitle[to.name]
	if(to.meta.requiredLogin) {
		// ...
	} else next()
})

// 全局后置守卫...
router.afterEach((to, from, failure) => {
	
})

export default router
