import { mapState, mapActions } from "pinia"
import { useCourseStore } from "@/stores/course"
import { getFirstCates, getSecondCates } from "@/api/course"

const courseActions = {
    ...mapActions(useCourseStore, ["modify"]),
    set(key, value) {
        this.modify(key, {
            ...courseState.cates(),
            ...value
        })
    }
}
const courseState = {
    ...mapState(useCourseStore, ["cates"])
}

export const getCategory = async (categoryId) => {
    const first = await getFirstCates()
    courseActions.set("cates", {
        first,
        second: await getSecondCates(categoryId)
    })
}

// 过滤
export const filter = (parentId) => {
    return courseState.cates().second.filter(item => item.parentId === parentId)
}