import request from "@/utils/request"
import storage from "@/utils/storage"

/**
 * 获取购物车信息
 * @returns 
 */
export const getCartInfo = async () => {
    const token = storage.getItem("accessToken")
    const { data: { list } } = await request({
        url: "/shopcar/getShopCarList",
        method: "GET",
        params: {
            token
        },
        headers: {
            Authorization: token
        }
    })
    return list
}