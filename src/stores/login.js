import { defineStore } from 'pinia'

export const useLoginStore = defineStore("login", {
	state: () => ({
		uuid: ""
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
