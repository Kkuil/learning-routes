export const useVerify = (rule, value) => {
    return rule.test(value)
}