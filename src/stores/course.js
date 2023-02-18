import { defineStore } from "pinia"

export const useCourseStore = defineStore("course", {
    state: () => {
        return {
            cates: {
                first: [],
                second: []
            }
        }
    },
    actions: {
        modify(key, value) {
            console.log(123)
            this[key] = value
        }
    }
})