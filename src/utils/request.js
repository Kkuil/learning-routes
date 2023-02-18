import axios from "axios"
import { BASE_URL, TIMEOUT, HEADERS } from "@/service/config/request.config.js"

const request = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: HEADERS,
    withCredentials: true
})

// request interceptor...
request.interceptors.request.use((config) => {
    return config
}, (error) => {
    Promise.reject(error)
})

// response interceptor...
request.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    Promise.reject(error)
})

export default request