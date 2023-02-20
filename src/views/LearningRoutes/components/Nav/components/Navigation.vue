<script setup>
import { computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getCategory, filter } from "@/hooks/useCategory"
import { mapState } from "pinia"
import { useCourseStore } from "@/stores/course"

const $router = useRouter()
const courseState = {
    ...mapState(useCourseStore, ["cates"])
}

onMounted(() => {
    getCategory(-1)
})

// 跳至分类页
const goCategory = async (flag, courseId) => {
    $router.push(`/course?${flag === 1 ? "firstCategory" : "secondCategory"}=${courseId}&&${flag === 1 ? "secondCategory" : "firstCategory"}=-1`)
}

</script>

<template>
    <div class="navigation">
        <ul>
            <li v-for="first in courseState.cates().first" class="first" @click="goCategory(1, first.id)" :key="first.id">
                <h3 class="first_title">{{ first.categoryName }}</h3>
                <div class="second">
                    <ul>
                        <li class="flex_center" v-for="second in filter(first.id).slice(0, 2)" :key="second.id">
                            <i>&nbsp;|&nbsp;</i>
                            <span @click.stop="goCategory(2, second.id)">{{ second.categoryName }}</span>
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

        .first {
            position: relative;
            display: flex;
            cursor: pointer;
            align-items: center;
            font-size: 14px;
            padding: 0 10px;
            width: 100%;
            height: 58px;
            .first_title {
                min-width: 70px;
                padding: 0 3px;
            }
            .second {
                ul {
                    white-space: nowrap;
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
}
</style>