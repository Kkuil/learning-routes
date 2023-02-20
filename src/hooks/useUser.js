import { mapActions, mapState } from "pinia"
import { useUserStore } from "@/stores/user"
import { getUserInfo } from "@/api/user"

const userInfo = {
    ...mapState(useUserStore, ["userInfo"])
}

const useActions = {
    ...mapActions(useUserStore, ["set"])
}

// 获取用户信息
export const getInfo = async () => {
    const userInfo = await getUserInfo()
    useActions.set("userInfo", userInfo)
}