import { createApp } from "vue"
import { createPinia } from "pinia"

// css
import "@/assets/styles/_base.css"
import "@/assets/styles/_custom.css"
import "@/assets/styles/_theme.css"
import "@/assets/styles/_iconfont.css"
import "element-plus/dist/index.css"
import "swiper/css"
import "swiper/css/pagination"

import * as ElementPlusIconsVue from "@element-plus/icons-vue"

import { fullScreenLoading } from "@/directives/fullScreen"

import ElementPlus from "element-plus"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

// 全局指令
app.directive("fullScreen", fullScreenLoading)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app")
