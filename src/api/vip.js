import request from "@/utils/request"
import storage from "@/utils/storage"
import msgTips from "@/service/msgTips"

/**
 * 获取vip信息
 * @returns 
 */
export const getVipInfo = async () => {
    const { data: { list } } = await request({
        url: "/vip/getAllVips",
        method: "POST",
    })
    return list
}

/**
 * 创建订单token
 * @returns 
 */
export const createToken = async () => {
    const { data: { token } } = await request({
        url: "/token/createToken",
        method: "GET"
    })
    return token
}

/**
 * 获取vip订单信息
 * @returns 
 */
export const getOrderInfo = async (id) => {
    const token = await createToken()
    if (token) {
        const data = await request({
            url: "/vip/settlement",
            method: "GET",
            params: {
                id
            },
            headers: {
                token
            }
        })
        return data
    } else {
        msgTips.error("您还未登录，请登录后再进行操作", 2000)
        return {}
    }
}