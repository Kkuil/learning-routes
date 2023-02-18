export default {
    getItem: (key) => {
        return localStorage.getItem(key)
    },
    setItem: (key, value) => {
        key = typeof key !== "string" ? JSON.stringify(key) : key
        value = typeof value !== "string" ? JSON.stringify(value) : value
        return localStorage.setItem(key, value)
    },
    removeItem: (key) => {
        return localStorage.removeItem(key)
    },
    clear: () => {
        return localStorage.clear()
    }
}