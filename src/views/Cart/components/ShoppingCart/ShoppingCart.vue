<script setup>
import Checkbox from "@/components/Checkbox.vue"
import { getCartInfo } from "@/api/shopping_cart"
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const list = ref([])
const $route = useRoute()
const $router = useRouter()

// 课程难度map表
const mapNumToLevel = {
    1: "低级",
    2: "中级",
    3: "高级"
}

const checkedAll = (isChecked) => {
    console.log(isChecked)
}

onMounted(() => {
    list.value = $route.params.list
    console.log(list.value)
})

// 计算每样商品的总价
const sumGoodsPerGoods = (price, num) => {
    return price * num
}


</script>

<template>
    <div class="shopping_cart">
        <h1 class="title">购物车</h1>
        <div class="container">
            <div class="top">
                <div class="nav">
                    <div class="item active">全部课程</div>
                </div>
                <div class="check_order">查看订单</div>
            </div>
            <div class="content">
                <div class="tb_header">
                    <div class="tb_item">
                        <Checkbox @check="checkedAll"></Checkbox>
                        <span>全选</span>
                    </div>
                    <div class="tb_item">课程信息</div>
                    <div class="tb_item">定价（元）</div>
                    <div class="tb_item">数量</div>
                    <div class="tb_item">小计（元）</div>
                    <div class="tb_item">操作</div>
                </div>
                <div class="tb_content">
                    <div v-if="list.length" class="list">
                        <div v-for="item in list" :key="item.id" class="item">
                            <Checkbox />
                            <img :src="item.courseCover" :alt="item.courseName" :title="item.courseName" class="cover">
                            <div class="text">
                                <div class="course_name">{{ item.courseName }}</div>
                                <div class="course_level">课程难度：{{ mapNumToLevel[item.courseLevel] }}</div>
                                <div class="course_description">{{ item.description ? item.description : "该课程暂无更多介绍" }}</div>
                            </div>
                            <div class="price">
                                <div class="origin_price">￥{{ item.salePrice.toFixed(2) }}</div>
                                <div class="cur_price">￥{{ item.discountPrice.toFixed(2) }}</div>
                            </div>
                            <div class="selected_num">{{ item.counter }}</div>
                            <div class="pay_price">{{ sumGoodsPerGoods(item.discountPrice, item.counter) }}</div>
                            <i class="iconfont icon-shanchu delete">删除</i>
                        </div>
                    </div>
                    <div v-else class="empty flex_center">
                        <el-empty description="您的购物车空空如也"></el-empty>
                    </div>
                </div>
                <div class="tb_footer">
                    <div class="selected_num">
                        <span class="word">已选课程</span>
                        <span class="number">0</span>
                    </div>
                    <div class="sum_price">
                        <span class="word">合计</span>
                        <span class="number">0.00</span>
                    </div>
                    <button class="go_pay"
                        :style="{ width: '100px', height: '45px', backgroundColor: '#c82333', borderRadius: '22.5px', color: '#fff', fontWeight: 'bold' }">去结算</button>
                </div>
            </div>
            <div class="go_pay"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.shopping_cart {
    color: var(--first_ft_clr);

    .title {
        font-size: 20px;
        font-weight: bolder;
        color: #fff;
        margin-bottom: 30px;
    }

    .container {
        width: 1110px;
        border-radius: 8px;
        background-color: #e3f5f6;
        padding: 15px 15px 0;

        .top {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;

            .nav {
                .item {
                    cursor: pointer;
                    font-size: 16px;
                    height: 30px;
                    font-weight: bolder;
                }

                .active {
                    color: #fe5632;
                    border-bottom: 3px solid #fe5632;
                }
            }

            .check_order {
                cursor: pointer;
                font-size: 13px;

                &:hover {
                    color: var(--primary_ft_clr);
                }
            }
        }

        .content {
            .tb_header {
                position: relative;
                width: 100%;
                height: 40px;
                border-radius: 10px;
                background-color: var(--primary_bgc);
                margin: 15px 0;

                .tb_item {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }

                :nth-child(1) {
                    display: flex;
                    align-items: center;
                    left: 10px;

                    >span {
                        margin-left: 3px;
                    }
                }

                :nth-child(2) {
                    left: 15%;
                }

                :nth-child(3) {
                    left: 40%;
                }

                :nth-child(4) {
                    left: 60%;
                }

                :nth-child(5) {
                    left: 75%;
                }

                :nth-child(6) {
                    left: 90%;
                }
            }

            .tb_content {
                border-bottom: 1px solid #ccc;

                .list {
                    .item {
                        padding: 10px 15px;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        height: 130px;
                        background-color: var(--primary_bgc);
                        margin-bottom: 15px;
                        border-radius: 10px;
                        .cover {
                            width: 170px;
                            margin: 0 10px;
                        }
                        .text {
                            width: 120px;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            > div {
                                margin: 3px 0;
                            }
                            .course_name {
                                font-size: 18px;
                                font-weight: bolder;
                            }
                            .course_level {
                                font-size: 14px;
                                opacity: 0.8;
                            }
                            .course_description {
                                width: 120px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 13px;
                                color: #ccc;
                            }
                        }

                        .price {
                            margin-left: 8%;
                            .origin_price {
                                color: #ccc;
                                text-decoration: line-through;
                            }
                        }

                        .selected_num {
                            margin-left: 14.5%;
                        }

                        .pay_price {
                            margin-left: 15%;
                        }

                        .delete {
                            cursor: pointer;
                            margin-left: 10%;
                            &:hover {
                                color: var(--primary_ft_clr);
                            }
                        }
                    }
                }
            }

            .tb_footer {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                width: 100%;
                height: 70px;

                .selected_num,
                .sum_price {
                    margin: 0 20px;

                    .words {
                        opacity: 0.8;
                    }

                    .number {
                        font-size: 23px;
                        font-weight: bolder;
                        color: #c82333;
                        margin: 0 5px;
                    }

                    .go_pay {
                        transition: all .3s;

                        &:active {
                            transform: scale(0.8);
                        }
                    }
                }
            }
        }
    }
}
</style>