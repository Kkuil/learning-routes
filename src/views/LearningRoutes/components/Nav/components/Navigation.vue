<script setup>

import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { getCategory } from "@/hooks/useCategory"
import { mapState } from "pinia"
import { useCourseStore } from "@/stores/course"

const $router = useRouter()
const courseState = {
    ...mapState(useCourseStore, ["cates"])
}

onMounted(getCategory)

// 跳至分类页
const goCategory = async (courseId) => {
    $router.push(`/course?cate=${courseId}`)
}

</script>

<template>
    <div class="navigation">
        <ul>
            <li v-for="first, index in courseState.cates().first" class="first" @click="goCategory(first.id)"
                :key="first.id">
                <span>{{ first.categoryName }}</span>
                <div class="second">
                    <ul class="flex_center">
                        <li class="flex_center" v-for="second in courseState.cates().second[index].slice(0, 2)"
                            :key="second.id">
                            <i>&nbsp;|&nbsp;</i>
                            <span @click.stop="goCategory(second.id)">{{ second.categoryName }}</span>
                        </li>
                    </ul>
                </div>
                <i class="iconfont icon-arrow-right-bold"></i>
            </li>
        </ul>
</div>
</template>

<style scoped lang="scss">
.navigation {
    width: 300px;
    background-color: #000;
    color: #fff;

    >ul {
        padding: 5px 0;
        display: flex;
        flex-direction: column;

        >li {
            position: relative;
            display: flex;
            cursor: pointer;
            align-items: center;
            font-size: 14px;
            padding: 0 10px;
            width: 100%;
            height: 58px;

            .second {
                ul {
                    li {
                        font-size: 10px;
                    }
                }
            }

            .icon-arrow-right-bold {
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
            }

            &:hover {
                background: linear-gradient(90deg, rgb(63, 239, 255), transparent);
            }
        }
    }
}</style>