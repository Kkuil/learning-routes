import request from "@/utils/request"

import storage from "../utils/storage"
import { Encrypt } from "@/utils/aes_parser"
import msgTips from "@/service/msgTips"
import { LoginResStatusCode } from "@/service/loginStatusCode"

/**
 * 利用APP扫码登录
 * @param 无参数
 */
export const loginWithAppQr = async () => {
    const data = await request({
        url: "/qrcode/getLoginQrCode",
        method: "GET"
    })
    return data
}

/**
 * 获取扫码状态
 * @param {String} uuid 
 */
export const getLoginQrStatus = async (uuid) => {
    const data = await request({
        url: "/qrcode/getLoginStatus",
        method: "GET",
        params: {
            uuid
        }
    })
    return data
}

/**
 * 利用账号密码登录
 * @param {Object} userInfo { username, password }
 */
export const loginWithAccount = async ({ username, password }) => {
    const { data: { accessToken }, meta: { code, success } } = await request({
        url: "/u/loginByJson",
        method: "POST",
        data: {
            username: Encrypt(username),
            password: Encrypt(password)
        }
    })
    if (accessToken && code === "10006" && success) {
        msgTips.success(LoginResStatusCode[code], 2000)
        storage.setItem("accessToken", accessToken)
        return true
    } else {
        msgTips.error(LoginResStatusCode[code], 2000)
        return false
    }
}

export const loginWithMobile = async ({ mobile, captcha }) => {
    const { data: { accessToken }, meta: { code, success } } = await request({
        url: "/u/loginByMobile",
        method: "POST",
        data: {
            mobile: Encrypt(mobile),
            captcha
        }
    })
    if (accessToken && code === "10006" && success) {
        msgTips.success(LoginResStatusCode[code], 2000)
        storage.setItem("accessToken", accessToken)
        return true
    } else {
        msgTips.error(LoginResStatusCode[code], 2000)
        return false
    }
}