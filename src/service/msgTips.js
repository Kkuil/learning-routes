import { ElMessage } from "element-plus"

const defaultParams = {
	duration: 2000,
	fn: () => { }
}

class msgTips {
	// 节流标志位
	throttle_flag = false
	/**
	 * 节流函数
	 * @param {Function} fn 
	 * @param {Number} timeout 
	 * @returns  
	 */
	throttle = (fn, timeout = 1000) => {
		if (!this.throttle_flag) {
			this.throttle_flag = true
			fn()
			setTimeout(() => {
				this.throttle_flag = false
			}, timeout)
		} else {
			// 错误提示，点太快了
			this.error("点击过快，请稍后再试", 2)
		}
	}
	/**
	 * 成功消息
	 * @param {String} message 
	 * @param {Number} duration 
	 * @param {Function} fn 
	 * @param {Boolean} showClose 
	 */
	success = (message = "success", duration = defaultParams.duration, fn = defaultParams.fn, showClose = false) => {
		this.throttle(() => {
			ElMessage({
				type: "success",
				message,
				duration,
				onClose: fn,
				showClose
			})
		}, 2000)
	}
	/**
	 * 失败消息
	 * @param {String} message 
	 * @param {Number} duration 
	 * @param {Function} fn 
	 * @param {Boolean} showClose 
	 */
	error = (message = "error", duration = defaultParams.duration, fn = defaultParams.fn, showClose = false) => {
		this.throttle(() => {
			ElMessage({
				type: "error",
				message,
				duration,
				onClose: fn,
				showClose
			})
		}, 1000)
	}
	/**
	 * 普通消息
	 * @param {String} message 
	 * @param {Number} duration 
	 * @param {Function} fn 
	 * @param {Boolean} showClose 
	 */
	info = (message = "info", duration = defaultParams.duration, fn = defaultParams.fn, showClose = false) => {
		this.throttle(() => {
			ElMessage({
				type: "info",
				message,
				duration,
				onClose: fn,
				showClose
			})
		}, 3000)
	}
	/**
	 * 警告消息
	 * @param {String} message 
	 * @param {Number} duration 
	 * @param {Function} fn 
	 * @param {Boolean} showClose 
	 */
	warning = (message = "warning", duration = defaultParams.duration, fn = defaultParams.fn, showClose = false) => {
		this.throttle(() => {
			ElMessage({
				type: "warning",
				message,
				duration,
				onClose: fn,
				showClose
			})
		}, 3000)
	}
}

export default new msgTips()