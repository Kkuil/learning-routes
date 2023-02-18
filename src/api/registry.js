import request from "@/utils/request"
import msgTips from "@/service/msgTips"
import { Encrypt } from "@/utils/aes_parser"

/**
 * 发送验证码
 * @param {String} mobile 
 * @returns 
 */
export const sendCaptcha = async (mobile) => {
    const { meta: { code, success } } = await request({
        url: "/sms/sendRegisterOrLoginCaptcha",
        method: "GET",
        params: {
            mobile
        }
    })
    if (code === "200" && success) {
        msgTips.success("发送成功", 2000)
    } else {
        msgTips.error("发送失败", 2000, () => { }, true)
    }
    return success
}

/**
 * 注册用户
 * @param {Object} registryInfo 
 * @returns 
 */
export const registry = async({ mobile, captcha, username, password, repassword }) => {
    const data = await request({
        url: "/member/register",
        method: "POST",
        data: {
            mobile: Encrypt(mobile),
            captcha,
            username: Encrypt(username),
            password: Encrypt(password),
            repassword
        }
    })
    msgTips.success("注册成功，快去登录吧", 1000)
    return data
}