import request from "@/utils/request"

/**
 * 获取一级分类
 * @returns 
 */
export const getFirstCates = async () => {
    const { data: { list } } = await request({
        url: "/course/category/getFirstCategorys",
        method: "GET",
    })
    return list
}


/**
 * 获取二级分类
 * @returns 
 */
export const getSecondCates = async (id) => {
    const { data: { list } } = await request({
        url: "/course/category/getSecondCategorys",
        method: "GET",
        params: {
            categoryId: id
        }
    })
    return list
}

/**
 * 获取最新课程
 * @returns 
 */
export const getNewCourse = async () => {
    const { data: { pageInfo: { list } } } = await request({
        url: "/course/mostNew",
        method: "POST",
        data: {
            pageNum: 1,
            pageSize: 8,
            entity: {
                sortBy: 'clicks-desc'
            }
        }
    })
    return list
}

/**
 * 查询课程
 */
export const queryCourse = async (queryInfo) => {
    const { data: { pageInfo } } = await request({
        url: "/course/search",
        method: "POST",
        data: queryInfo
    })
    return {
        list: pageInfo.list,
        totalPages: pageInfo.lastPage,
        total: pageInfo.total
    }
}