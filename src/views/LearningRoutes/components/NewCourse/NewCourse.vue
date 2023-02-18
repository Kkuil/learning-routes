<script setup>
import { onMounted, ref } from "vue"
import Section from '@/components/Section.vue'
import CourseCard from '@/components/CourseCard.vue'
import { getNewCourse } from "@/api/course"

let newCourses = ref([])

onMounted(() => {
    getNew()
})

const getNew = async () => {
    const list = await getNewCourse()
    newCourses.value = list
}

</script>

<template>
    <Section title="新上好课">
        <template #content>
            <div class="content">
                <course-card v-for="item in newCourses" :item="item" :key="item.id"></course-card>
            </div>
        </template>
</Section>
</template>

<style scoped lang="scss">
.content {
    width: 1140px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>