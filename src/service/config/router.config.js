import { getCartInfo } from "@/api/shopping_cart"
import { defineAsyncComponent } from "vue"
import Error from "@/components/Error.vue"
import Loading from "@/components/Loading.vue"
import msgTips from "@/service/msgTips"
import { useRouter } from "vue-router"
import storage from "../../utils/storage"

// routes 
export const routes = [
    {
        path: "/",
        redirect: "/index",
        name: "LearningRoutes",
        component: defineAsyncComponent({
            loader: () => import("@/layout/Layout.vue"),
            suspensible: true,
            loadingComponent: Loading,
            // 展示加载组件前的延迟时间，默认为 200ms
            delay: 200,
            errorComponent: Error,
            timeout: 3000
        }),
        children: [
            {
                path: "index",
                name: "Index",
                component: () => import("@/views/LearningRoutes/LearningRoutes.vue")
            },
            {
                path: "course",
                name: "Category",
                component: defineAsyncComponent(() => import("@/views/Course/views/Category/Category.vue"))
            },
            {
                path: "course",
                name: "Course",
                component: () => import("@/views/Course/Course.vue"),
                children: [
                    {
                        path: "detail/:id",
                        name: "Detail",
                        component: () => import("@/views/Course/views/Detail/Detail.vue")
                    }
                ]
            },
            {
                path: "vip",
                name: "Vip",
                component: () => import("@/views/Vip/Vip.vue")
            },
            {
                path: "resume",
                name: "Resume",
                component: () => import("@/views/Resume/Resume.vue")
            },
            {
                path: "boke",
                name: "Boke",
                component: () => import("@/views/Boke/Boke.vue")
            },
            {
                path: "sys_class",
                name: "SysClass",
                component: () => import("@/views/SysClass/SysClass.vue")
            },
            {
                path: "agreement",
                name: "Agreement",
                component: () => import("@/views/Agreement/Agreement.vue")
            },
            {
                path: "feedback",
                name: "Feedback",
                component: () => import("@/views/Feedback/Feedback.vue")
            },
            {
                path: "cart",
                name: "Cart",
                component: () => import("@/views/Cart/Cart.vue"),
                beforeEnter: async (to, from, next) => {
                    const token = storage.getItem("accessToken")
                    if (token) {
                        const list = await getCartInfo()
                        if (!list) {
                            msgTips.error("Query Error", 2000)
                            const $router = useRouter()
                            $router.replace("/login")
                            return
                        }
                        // 合并参数
                        to.params = {
                            ...to.params,
                            list
                        }
                        next()
                    } else {
                        msgTips.error("您还未登录，请先登录后再查看吧！", 2000)
                    }
                }
            },
            {
                path: "/:path(.*)",
                name: "NotFound",
                component: () => import("@/views/NotFound/NotFound.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: defineAsyncComponent({
            loader: () => import("@/views/Login/Login.vue"),
            suspensible: true,
            loadingComponent: Loading,
            // 展示加载组件前的延迟时间，默认为 200ms
            delay: 200,
            errorComponent: Error,
            timeout: 3000
        }),
    },
    {
        path: "/registry",
        name: "Registry",
        component: defineAsyncComponent({
            loader: () => import("@/views/Registry/Registry.vue"),
            suspensible: true,
            loadingComponent: Loading,
            // 展示加载组件前的延迟时间，默认为 200ms
            delay: 200,
            errorComponent: Error,
            timeout: 3000
        }),
    },
    {
        path: "/test",
        name: "Test",
        component: () => import("@/Test/model.test.vue")
    }
]

// 路由与标题映射表
export const mapNameToTitle = {
    Index: "",
    Login: "-登录",
    Test: "-测试",
    Agreement: "-协议",
    Registry: "-注册",
    Course: "-课程",
    Vip: "-vip",
    Resume: "-简历",
    Boke: "-博客",
    SysClass: "-系统班",
    Detail: "-课程详情",
    Category: "-课程分类",
    Cart: "-购物车",
    NotFound: "404不存在"
}