const ACCOUNT = /^[a-zA-Z]\w{5,8}$/
const PASSWORD = /^.{6,10}$/
export const RegistryVerify = {
    PHONE: /^1[3-9]\d{9}$/,
    SMS: /^\d{6}$/,
    ACCOUNT,
    PASSWORD
}

export const LoginVerify = {
    ACCOUNT,
    PASSWORD
}