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

export const getCategory = async () => {
    const first = await getFirstCates()
    courseActions.set("cates", {
        first
    })
    for (var i = 0; i < first.length; i++) {
        courseActions.set("cates", {
            second: [...courseState.cates().second, await getSecondCates(first[i].id)]
        })
    }
}