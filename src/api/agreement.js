import request from "@/utils/request"
import { UserAgreementCode, UserPrivatePolicyCode } from "@/service/agreementCode"

export const getAgreement = async (flag) => {
    const { data: { data: { content, createTime, updateTime, title } } } = await request({
        url: "/agreement/getAgreementByCode",
        method: "GET",
        params: {
            code: flag === "agreement" ? UserAgreementCode : UserPrivatePolicyCode
        }
    })
    return { content, createTime, updateTime, title }
}