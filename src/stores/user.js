import { defineStore } from 'pinia'

export const useUserStore = defineStore("user", {
    state: () => ({
        userInfo: null
    }),
    actions: {
        // 修改字段信息
        set(prop, value) {
            this[prop] = value
        }
    },
    getters: {

    }
})
