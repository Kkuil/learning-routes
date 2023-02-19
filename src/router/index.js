import { createRouter, createWebHistory } from "vue-router"
import { routes, mapNameToTitle } from "@/service/config/router.config"

const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes,
})

// 全局前置守卫...
router.beforeEach((to, from, next) => {
	next()
})

// 全局后置守卫...
router.afterEach((to, from, failure) => {
	document.title = "小鹿线" + mapNameToTitle[to.name]
})

export default router
