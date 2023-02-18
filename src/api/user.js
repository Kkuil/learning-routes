import request from "@/utils/request"
import storage from "@/utils/storage"
import msgTips from "@/service/msgTips"

/**
 * 获取用户信息
 * @param {String} token 
 * @returns 
 */
export const getUserInfo = async () => {
    const token = storage.getItem("accessToken")
    if(token) {
        const { data: { data } } = await request({
            url: "/member/getInfo",
            method: "GET",
            params: {
                token
            },
            headers: {
                Authorization: token
            }
        })
        return data
    } else {
        msgTips.info("您还未登录，登录可以解锁更多功能哦~", 2000)
    }
}