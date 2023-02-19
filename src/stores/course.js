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
            this[key] = value
        }
    }
})