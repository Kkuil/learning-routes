import { getUserInfo } from "@/api/user"

/**
 * 确认登录操作
 * @returns 
 */
export const useConfirmLogin = async () => {
    const { id } = await getUserInfo()
    return !!id
}