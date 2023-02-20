<script setup>
import { useRoute, useRouter } from "vue-router"
import { mapState } from "pinia"
import { useCourseStore } from "@/stores/course"
import { onMounted, ref, watch } from "vue"
import { getCategory } from "@/hooks/useCategory"
import { queryCourse } from "@/api/course"
import CourseCard from "@/components/CourseCard.vue"

let pageInfo = ref({
    list: [],
    total: 8,
    totalPages: 1
})
const searchParams = ref({
    pageNum: 1,
    pageSize: 8,
    activeKeys: {
        firstCategory: '-1',
        secondCategory: '-1',
        sortBy: "",
        courseLevel: 0,
    },
    isMember: 0,
    isFree: 0,
})
const $route = useRoute()
const $router = useRouter()
const courseState = {
    ...mapState(useCourseStore, ["cates"])
}

watch(searchParams, async (nValue) => {
    const {
        pageNum,
        pageSize,
        activeKeys: {
            firstCategory,
            secondCategory,
            sortBy,
            courseLevel,
        },
        isMember,
        isFree
    } = nValue
    const data = await queryCourse({
        pageNum,
        pageSize,
        entity: {
            firstCategory: firstCategory == '-1' ? 0 : firstCategory,
            secondCategory: secondCategory == '-1' ? 0 : secondCategory,
            isMember,
            isFree,
            courseLevel,
            sortBy
        }
    })
    pageInfo.value = {
        ...pageInfo,
        ...data
    }
}, {
    deep: true,
    immediate: true
})

watch(() => $route.query, ({ firstCategory = '-1', secondCategory = '-1' }) => {
    // 合并参数
    searchParams.value.activeKeys = {
        ...searchParams.value.activeKeys,
        firstCategory,
        secondCategory
    }
}, {
    immediate: true
})

const sortType = () => {
    if (searchParams.value.activeKeys.sortBy === "price-asc") {
        searchParams.value.activeKeys.sortBy = "price-desc"
    } else {
        searchParams.value.activeKeys.sortBy = "price-asc"
    }
}

/**
 * 修改查询信息
 * @param {Array} keys 
 * @param {String} value 
 */
const changeInfo = (keys, value) => {
    if (keys.includes("firstCategory")) {
        console.log(123)
        getCategory(value)
    }
    if (keys.length <= 1) {
        searchParams.value[keys[0]] = value
    } else {
        deepIterator(searchParams.value, keys, value)
    }
}

const deepIterator = (iterator, keys, value) => {
    if (keys.length == 1) {
        iterator[keys[0]] = value
    } else {
        deepIterator(iterator[keys[0]], keys.slice(1), value)
    }
}

onMounted(() => {
    getCategory(searchParams.value.activeKeys.firstCategory)
})

</script>

<template>
    <div class="category">
        <div class="select_cate">
            <div class="course_direction">
                <b class="title">
                    <span>课程方向</span>
                    <i class="iconfont icon-arrow-right-bold"></i>
                </b>
                <ul>
                    <li :class="{ active: searchParams.activeKeys.firstCategory == '-1' }"
                        @click="changeInfo(['activeKeys', 'firstCategory'], '-1')">全部</li>
                    <li v-for="first in courseState.cates().first" :key="first.id"
                        :class="{ active: searchParams.activeKeys.firstCategory == first.id }"
                        @click="changeInfo(['activeKeys', 'firstCategory'], first.id)">
                        {{ first.categoryName }}
                    </li>
                </ul>
            </div>
            <div class="course_cate">
                <b class="title">
                    <span>课程分类</span>
                    <i class="iconfont icon-arrow-right-bold"></i>
                </b>
                <ul>
                    <li :class="{ active: searchParams.activeKeys.secondCategory == '-1' }"
                        @click="searchParams.activeKeys.secondCategory = '-1'">全部</li>
                    <li v-for="second in courseState.cates().second" :key="second.id"
                        :class="{ active: searchParams.activeKeys.secondCategory == second.id }"
                        @click="searchParams.activeKeys.secondCategory = second.id">
                        {{ second.categoryName }}
                    </li>
                </ul>
            </div>
            <div class="course_difficulty_rank">
                <b class="title">
                    <span>课程难度</span>
                    <i class="iconfont icon-arrow-right-bold"></i>
                </b>
                <ul>
                    <li :class="{ active: !searchParams.activeKeys.courseLevel }"
                        @click="searchParams.activeKeys.courseLevel = 0">全部</li>
                    <li :class="{ active: searchParams.activeKeys.courseLevel == 1 }"
                        @click="searchParams.activeKeys.courseLevel = 1">初级</li>
                    <li :class="{ active: searchParams.activeKeys.courseLevel == 2 }"
                        @click="searchParams.activeKeys.courseLevel = 2">中级</li>
                    <li :class="{ active: searchParams.activeKeys.courseLevel == 3 }"
                        @click="searchParams.activeKeys.courseLevel = 3">高级</li>
                </ul>
            </div>
        </div>
        <div class="sort_selection">
            <div class="sortBy">
                <ul>
                    <li class="words" :class="{ active: !searchParams.activeKeys.sortBy }"
                        @click="changeInfo(['activeKeys', 'sortBy'], '')">综合</li>
                    <li class="split">|</li>
                    <li class="words" :class="{ active: searchParams.activeKeys.sortBy === 'time-asc' }"
                        @click="changeInfo(['activeKeys', 'sortBy'], 'time-asc')">最新课程</li>
                    <li class="split">|</li>
                    <li class="words" :class="{ active: searchParams.activeKeys.sortBy === 'purchase-asc' }"
                        @click="changeInfo(['activeKeys', 'sortBy'], 'purchase-asc')">最多购买</li>
                    <li class="split">|</li>
                    <li class="words price" :class="{ active: /price/.test(searchParams.activeKeys.sortBy) }"
                        @click="sortType">
                        <span>价格</span>
                        <div class="icon flex">
                            <el-icon>
                                <CaretTop :class="{ active: searchParams.activeKeys.sortBy === 'price-asc' }" />
                            </el-icon>
                            <el-icon>
                                <CaretBottom :class="{ active: searchParams.activeKeys.sortBy === 'price-desc' }" />
                            </el-icon>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="selection">
                <div class="free_course flex_center">
                    <input type="checkbox" :checked="searchParams.isFree"
                        @change="changeInfo(['isFree'], $event.target.checked ? 1 : 0)">
                    <span>免费课程</span>
                </div>
                <div class="vip_course flex_center">
                    <input type="checkbox" :checked="searchParams.isMember"
                        @change="changeInfo(['isMember'], $event.target.checked ? 1 : 0)">
                    <span>会员课程</span>
                </div>
            </div>
        </div>
        <div class="list">
            <CourseCard class="item" v-for="item in pageInfo.list" :key="item.id" :item="item"></CourseCard>
            <div v-show="!pageInfo.list.length" class="empty flex_center">
                <el-empty description="什么都没有" />
            </div>
        </div>
        <div v-show="pageInfo.list.length" class="pagination flex_center">
            <el-pagination small background layout="prev, pager, next" :total="pageInfo.total"
                :page-count="pageInfo.totalPages" class="mt-4" @current-change="(page) => changeInfo(['pageNum'], page)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
$selection_ft: 14px;
.category {
    width: 1140px;
    color: var(--first_ft_clr);
    .select_cate {
        padding: 10px;
        width: 100%;
        height: 270px;

        >[class^=course] {
            display: flex;
            padding: 5px 0;

            .title {
                display: flex;
                justify-content: space-between;
                width: 100px;
                font-size: 14px;

                i {
                    margin-top: 3px;
                    font-size: 12px;
                    color: #777;
                }
            }

            ul {
                display: flex;
                flex-wrap: wrap;
                width: calc(100% - 100px);

                li {
                    border-radius: 5px;
                    font-size: 15px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    padding: 0 8px;
                    margin: 0 15px 10px;

                    &:hover {
                        background-color: #dee9fa;
                        color: var(--primary_ft_clr);
                    }
                }

                .active {
                    background-color: #dee9fa;
                    color: var(--primary_ft_clr);
                }
            }
        }
    }

    .sort_selection {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;

        .sortBy {
            width: 300px;

            ul {
                width: 100%;
                display: flex;
                justify-content: space-between;

                li {
                    font-size: $selection_ft;
                }

                .price {
                    display: flex;

                    >.icon {
                        width: 20px;
                        height: 25px;
                        margin-left: 3px;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        .el-icon {
                            color: #ccc;
                        }

                        .active {
                            color: #000;
                        }
                    }
                }

                li[class^=words] {
                    cursor: pointer;
                }

                li[class^=split] {
                    color: #ccc;
                }

                .active {
                    color: var(--primary_ft_clr);
                }
            }
        }

        .selection {
            font-size: $selection_ft;
            display: flex;

            >div {
                margin: 0 5px;

                input {
                    margin-right: 2px;
                }
            }
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        .empty {
            width: 100%;
            min-height: 200px;
        }

        .item {
            transition: transform .3s;
            margin: 0 20px 20px 0;

            &:nth-child(4n) {
                margin-right: 0;
            }

            &:hover {
                transform: translateY(-10px);
            }
        }
    }

    .pagination {
        margin: 10px 0;
    }
}
</style>