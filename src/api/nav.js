import request from "@/utils/request"

/**
 * 获取轮播图数据
 * @returns 
 */
export const getBanners = async () => {
    const { data: { list } } = await request({
        url: "/slider/getSliders",
        method: "GET"
    })
    return list
}