<script setup>


import { mapState, mapActions } from "pinia"
import { useCourseStore } from "@/stores/course"
import { onMounted } from "@vue/runtime-core"
import { getCategory } from "../../../../hooks/useCategory";

const courseState = {
    ...mapState(useCourseStore, ["cates"])
}

onMounted(() => {
    if (!courseState.cates().first.length) {
        getCategory()
    }
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
                    <li class="active">全部</li>
                    <li v-for="first in courseState.cates().first" :key="first.id">
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
                    <li class="active">全部</li>
                    <li v-for="second in courseState.cates().second.flat(1)" :key="second.id">
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
                    <li class="active">全部</li>
                    <li>初级</li>
                    <li>中级</li>
                    <li>高级</li>
                </ul>
            </div>
        </div>
</div>
</template>

<style scoped lang="scss">
.category {
    width: 1140px;

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
                }

                .active {
                    background-color: #dee9fa;
                    color: var(--primary_ft_clr);
                }
            }
        }
    }
}</style>