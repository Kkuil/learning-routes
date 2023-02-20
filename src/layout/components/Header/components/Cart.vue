<script setup>
import { useConfirmLogin } from "@/hooks/useConfirmLogin"
import { getCartInfo } from "@/api/shopping_cart"
import { ref } from "@vue/reactivity"
import { useRouter } from "vue-router"

const $router = useRouter()
const isLogin = await useConfirmLogin()
const cart_goods = ref([])

const isShowCartInfo = ref(false)

const showCartInfo = async () => {
    isShowCartInfo.value = true
    if (isLogin) {
        cart_goods.value = await getCartInfo()
    }
}

const hideCartInfo = async () => {
    isShowCartInfo.value = false
}

const goDetail = async (e) => {
    const { id } = e.target.dataset
    if(id) {
        $router.push(`/course/detail/${id}`)
    }
}

</script>

<template>
    <div class="container" @mouseenter="showCartInfo" @mouseleave="hideCartInfo">
        <i class="iconfont icon-cart"></i>
        <div v-show="isShowCartInfo" class="cart_info">
            <div class="header">
                <span>我的购物车</span>
                <span>已加入{{ cart_goods.length }}门课程</span>
            </div>
            <div class="goods" @click="goDetail">
                <div v-for="item in cart_goods" :key="item.id" class="item" :data-id="item.id">
                    <div class="wrapper flex">
                        <img class="cover" :src="item.courseCover" />
                        <div class="right">
                            <div class="title">{{ item?.courseName }}</div>
                            <div class="description">{{ item?.description ? item.description : "此商品暂无更多描述" }}</div>
                            <div class="price">￥{{ item?.discountPrice }}</div>
                        </div>
                    </div>
                </div>
                <div v-show="!cart_goods.length" class="empty flex_center">
                    <el-empty description="您的购物车空空如也" />
                </div>
            </div>
            <div class="order_cart">
                <span>我的订单</span>
                <i class="iconfont icon-cart" @click="() => $router.push('/cart')">去购物车</i>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    width: auto;
    position: relative;
    color: var(--first_ft_clr);

    >.icon-cart {
        cursor: pointer;
        color: #ccc;
        font-size: 25px;
        transition: color .3s;

        &:hover {
            color: var(--primary_ft_clr);
        }
    }

    .cart_info {
        padding: 0 8px;
        z-index: 9999;
        position: absolute;
        left: -100px;
        width: 300px;
        background-color: var(--primary_bgc);
        box-shadow: 1px 1px 2px 3px #ccc;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;

        .header,
        .order_cart {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 45px;
        }

        .header {
            :first-child {
                color: var(--first_ft_clr);
                font-size: 15px;
                font-weight: bolder;
            }

            :nth-child(2) {
                font-size: 12px;
                color: #d1d1d1;
            }
        }

        .order_cart {
            :first-child {
                cursor: pointer;
                font-size: 10px;
                font-weight: bolder;
                color: #93999f;
            }

            :nth-child(2) {
                cursor: pointer;
                font-size: 14px;
                color: var(--primary_ft_clr);
            }
        }

        .goods {
            min-height: 150px;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;

            .item {
                cursor: pointer;
                border-bottom: 1px solid #ccc;
                padding: 10px 0;
                &:hover {
                    background-color: rgba(228, 228, 228, 0.6);
                }
                .wrapper {
                    pointer-events: none;
    
                    .cover {
                        width: 40%;
                        height: 100%;
                        margin: 0 5px 3px;
                    }
    
                    .right {
                        width: 60%;
                        height: 100%;
                        > div {
                            font-size: 12px;
                            height: 23px;
                        }
                        .title {
                            font-weight: bolder;
                        }
                        .description {
                            color: #ccc;
                        }
                        .price {
                            font-weight: bolder;
                            color: red;
                        }
                    }
                }
            }


            .empty {
                width: 100%;
                height: 100%;
            }
        }
    }
}</style>