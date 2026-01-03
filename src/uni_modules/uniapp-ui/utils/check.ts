/**
 * 检查值是否不为空
 * @param value 值
 * @return {boolean} 是否不为空
 */
export const isDef = <T>(value: T): value is NonNullable<T> => value !== undefined && value !== null && value !== ""

/**
 * 校验是否是十六进制颜色
 * @param {string} value 校验内容
 */
export function isHexColor(value: any): boolean {
  return /^#?(?:[a-f0-9]{6}|[a-f0-9]{3})$/i.test(value)
}

/**
 * 校验是否是邮箱
 * @param {string} value 校验内容
 */
export function isEmail(value: any): boolean {
  return /[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:\w(?:[\w-]*\w)?\.)+\w(?:[\w-]*\w)?/.test(value)
}

/**
 * 校验两个值是否相同
 * @param {*} value1 校验内容
 * @param {*} value2 校验内容
 */
export function isEqual(value1: any, value2: any): boolean {
  return String(value1) === String(value2)
}

/**
 * 校验是否是电话号码
 * @param {string} value 校验内容
 */
export function isPhoneNo(value: any): boolean {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 校验是否是URL格式
 * @param {string} url 校验内容
 */
export function isUrl(url: string): boolean {
  const reg = /^(?:https?|ftp|file):\/\/[\w\-.][-\w]*\.[\w\-.][\w./?#&=-]*$/
  return reg.test(url)
}

/**
 * 校验链接是否为图片
 * @param {string} value 校验内容
 */
export function isImage(value: any): boolean {
  const reg = /\.(?:jpeg|jpg|gif|png|bmp|webp)$/i
  return reg.test(value)
}

/**
 * 校验链接是否为文档
 * @param {string} link - 要校验的链接
 */
export function isDocument(link: any): boolean {
  const reg = /\.(?:docx|xlsx|pptx|pdf|txt|html|csv|json|xml)$/i
  return reg.test(link)
}

/**
 * 校验是否是日期格式
 * @param {string | Date} value 校验内容
 */
export function isDate(value: any): boolean {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 校验是否是整数
 * @param {*} value 校验内容
 */
export function isDigits(value: any): boolean {
  return /^\d+$/.test(value)
}

/**
 * 校验是否是百分比
 * @param {*} value 校验内容
 */
export function isPercentage(value: any): boolean {
  const reg = /^(?:0|[1-9]\d*)%$/
  return reg.test(value)
}

/**
 * 校验是否是数字
 * @param {string | number} value 校验内容
 */
export function isNumber(value: any): boolean {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value)
}

/**
 * 检查给定的值是否为字符串类型
 * @param {*} value - 要检查的值
 */
export function isString(value: any): value is string {
  return typeof value === "string"
}

/**
 * 判断给定的参数是否为函数
 * @param value - 需要检查的参数
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === "function"
}

/**
 * 是否布尔值
 * @param {*} value 校验内容
 */
export function isBoolean(value: any): boolean {
  return typeof value === "boolean"
}

/**
 * 检查给定值是否为 Promise 对象。
 * @param val 校验内容
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * 校验是否是数组
 * @param value 校验内容
 */
export function isArray<T>(value: any): value is Array<T> {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === "[object Array]"
  }
}

/**
 * 校验是否是对象
 * @param value 校验内容
 */
export function isObject(value: unknown): value is Record<any, any> {
  return value !== null && typeof value === "object"
}

/**
 * 判断值是否为普通对象（非数组、非 null）
 * @param val - 待判断的值
 * @returns 是否为普通对象
 */
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return Object.prototype.toString.call(val) === "[object Object]"
}

/**
 * 校验是否为空
 * @param {*} value 校验内容
 */
export function isEmpty(value: any): boolean {
  switch (typeof value) {
    case "undefined":
      return true
    case "string":
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length === 0) return true
      break
    case "boolean":
      if (!value) return true
      break
    case "number":
      if (value === 0 || Number.isNaN(value)) return true
      break
    case "object":
      if (value === null || value.length === 0) return true
      // 检查对象是否为空(没有自有可枚举属性)
      if (Object.keys(value).length === 0) return true
      return false
  }
  return false
}

/**
 * 校验是否为空数据
 * @param value 校验内容
 */
export function isNoEmpty(value: any): boolean {
  return !isEmpty(value)
}

/**
 * 校验是否包含某个值
 * @param {string} value 校验内容
 * @param {string | number} param 包含内容
 */
export function isContains(value: any, param: any): boolean {
  return value.includes(param)
}
