export function noop() {
  return false
}

/**
 * uuid
 * @return {string}
 */
export function uuid(): string {
  let d = new Date().getTime()
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((d + Math.random() * 16) % 16) | 0
    d = Math.floor(d / 16)
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}

/**
 * 对象深度克隆
 * @param {object} obj 克隆对象
 * @return {object}
 */
export function clone(obj: any): any {
  if ([null, undefined, Number.NaN, false].includes(obj)) return obj
  if (typeof obj !== "object" && typeof obj !== "function") {
    return obj
  }
  const o = Array.isArray(obj) ? [] : {}
  for (const i in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? clone(obj[i]) : obj[i]
    }
  }
  return o
}

/**
 * 对象深度合并
 * @param {object} target 目标对象
 * @param {object} source 源对象
 * @return {object}
 */
export function merge(target: any = {}, source: any = {}): any {
  target = clone(target)
  if (typeof target !== "object" || typeof source !== "object") return false
  for (const prop in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (!source.hasOwnProperty(prop)) continue
    if (prop in target) {
      if (typeof target[prop] !== "object") {
        target[prop] = source[prop]
      } else {
        if (typeof source[prop] !== "object") {
          target[prop] = source[prop]
        } else {
          if (target[prop]?.concat && source[prop]?.concat) {
            target[prop] = target[prop].concat(source[prop])
          } else {
            target[prop] = merge(target[prop], source[prop])
          }
        }
      }
    } else {
      target[prop] = source[prop]
    }
  }
  return target
}

/**
 * 获取url参数
 * @param query url字符串
 */
export function getUrlParams(query: string): Record<string, any> {
  let params = {}
  // #ifdef H5
  decodeURIComponent(query || window.location.href).replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (params[k] = v))
  // #endif
  // #ifndef H5
  try {
    query = query.replace("?", "")
    const paramPairs = query.split("&")
    for (const pair of paramPairs) {
      const [key, value] = pair.split("=")
      params[key] = value
    }
  } catch (error) {
    params = {}
  }
  // #endif
  return params
}

/**
 * 创建url参数
 * @param object 参数对象
 * @param isPrefix 是否自动加上?号，默认为true
 */
export function createUrlParams(object = {}, isPrefix = true) {
  const prefix = isPrefix ? "?" : ""
  const result = Object.entries(object)
    .filter(([_, value]) => !["", undefined, null].includes(value as any))
    .flatMap(([key, value]) => (Array.isArray(value) ? value.map((_value) => `${key}[]=${_value}`) : `${key}=${value}`))
  return result.length ? prefix + result.join("&") : ""
}

/**
 * 延时指定的时间后执行回调函数
 * @param {number} delay - 延时时间（毫秒）
 * @returns {Promise} - 返回一个Promise对象
 */
export function delay(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * 函数防抖 短时间内多次触发同一事件，只执行最后一次，或者只执行最开始的一次，中间的不执行
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 * @returns 返回防抖后的函数（每次调用返回独立实例）
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number = 500, immediate: boolean = false): (...args: Parameters<T>) => void {
  // 闭包内管理 timeout，确保每次调用 debounce 返回独立实例
  let timeout: ReturnType<typeof setTimeout> | null = null
  let callToken = 0

  return function (this: unknown, ...args: Parameters<T>): void {
    callToken += 1
    const token = callToken

    // 立即执行模式
    if (immediate) {
      const callNow = !timeout
      if (timeout !== null) clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(this, args)
      return
    }

    // 延迟执行模式（始终只执行最后一次）
    if (timeout !== null) clearTimeout(timeout)
    const boundFunc = func.bind(this, ...args)
    timeout = setTimeout(() => {
      if (token !== callToken) return
      boundFunc()
      timeout = null
    }, wait)
  }
}

/**
 * Create a throttled function that limits execution frequency
 * @param wait Throttle interval in milliseconds
 * @param immediate Execute immediately on first call (default: true)
 * @returns Throttled function wrapper
 */
export function createThrottle(wait: number = 500, immediate: boolean = true) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let flag = false

  return function throttle(func: (...args: any[]) => any): void {
    if (immediate) {
      if (!flag) {
        flag = true
        typeof func === "function" && func()
        timer = setTimeout(() => {
          flag = false
        }, wait)
      }
    } else {
      if (!flag) {
        flag = true
        timer = setTimeout(() => {
          flag = false
          typeof func === "function" && func()
        }, wait)
      }
    }
  }
}

/**
 * 函数节流 在一定时间内，无论触发多少次回调，都只执行一次
 * @deprecated 建议使用 createThrottle() 以获得更好的实例隔离
 * @param func 目标函数
 * @param wait 节流间隔毫秒数
 * @param immediate true - 立即执行， false - 延迟执行
 * @returns 返回节流后的函数（每次调用返回独立实例）
 */
export function throttling<T extends (...args: any[]) => any>(func: T, wait: number = 500, immediate: boolean = true): (...args: Parameters<T>) => void {
  // 闭包内管理 timer 和 flag，确保每次调用 throttling 返回独立实例
  let timer: ReturnType<typeof setTimeout> | null = null
  let flag = false

  return function (this: unknown, ...args: Parameters<T>): void {
    // 使用 bind 绑定当前 this 上下文
    const boundFunc = func.bind(this, ...args)

    if (immediate) {
      if (!flag) {
        flag = true
        typeof func === "function" && boundFunc()
        timer = setTimeout(() => {
          flag = false
        }, wait)
      }
    } else {
      if (!flag) {
        flag = true
        timer = setTimeout(() => {
          flag = false
          typeof func === "function" && boundFunc()
        }, wait)
      }
    }
  }
}

/**
 * 将一个数字限制在指定的范围内
 * @param {number} num - 要限制的数字
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} - 限制后的数字
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max)
}

/**
 * 从对象中选择指定的键，返回一个新对象
 * @param {object} obj - 要选择键的对象
 * @param {Array} keys - 要选择的键的数组
 * @returns {object} - 包含选定键值对的新对象
 */
export function pick(obj: any, keys: string[]): any {
  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}

/**
 * 在数字或字符串前面补零，使其达到指定的长度
 * @param num 要补零的数字或字符串
 * @param size 最终要达到的长度，默认为2
 * @returns 补零后的字符串
 */
export function padZero(num: string | number, size = 2): string {
  let str = `${num}`
  while (str.length < size) {
    str = `0${str}`
  }
  return str
}

/**
 * 将传入的参数转换为数组
 * @param item 待转换为数组的元素或数组
 */
export function toArray<T>(item: T | T[]): T[] {
  return Array.isArray(item) ? item : [item]
}

/**
 * 在数组中查找与目标数值最接近的数字
 * @param {number[]} arr 数字数组
 * @param {number} target 目标数值
 * @returns {number} 最接近目标数值的数字
 */
export function findClosestNumber(arr: number[], target: number): number {
  let closestNumber = arr[0]
  let minDiff = Math.abs(target - arr[0])
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(target - arr[i])
    if (diff < minDiff) {
      minDiff = diff
      closestNumber = arr[i]
    }
  }
  return closestNumber
}

/**
 * 将数组乱序
 * @param array 要乱序的数组
 * @returns 乱序后的数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  const len = array.length
  for (let i = len - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const temp = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = temp
  }
  return array
}

/**
 * 将两个数字相加并返回结果，保留小数点后十位
 * @param num1 第一个数字
 * @param num2 第二个数字
 * @returns 两个数字相加后的结果，保留小数点后十位
 */
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10
  return Math.round((num1 + num2) * cardinal) / cardinal
}

/**
 * 根据对象和键名获取深层次属性值
 * @param obj 待获取属性的对象
 * @param keyName 深层次属性的键名，支持a.b.c格式
 * @returns 返回对应属性的值，如果属性不存在则返回undefined
 */
export function getDeepValue(obj: Record<string, any>, keyName: string): any {
  // 按照'.'分隔键名，得到键名数组
  const keys: string[] = keyName.split(".")

  // 利用reduce方法逐层获取属性值
  return keys.reduce((acc: any, key: string) => {
    // 如果acc为undefined或者不是对象，则返回undefined
    if (acc === undefined || typeof acc !== "object") {
      return undefined
    }
    // 获取当前层级的属性值
    return acc[key]
  }, obj)
}

/**
 * 获取链接后缀名
 * @param link 链接
 * @returns 返回小写的扩展名，如果无法获取则返回空字符串
 */
export function getLinkExtension(link: string): string {
  // 输入验证
  if (!link || typeof link !== "string") return ""

  // 移除查询参数和锚点
  const cleanUrl = link.split("?")[0].split("#")[0]

  // 使用正则匹配扩展名
  const match = cleanUrl.match(/\.([^./]+)$/)

  // 返回小写的扩展名，或空字符串
  return match ? match[1].toLowerCase() : ""
}

/**
 * 对象转换为url参数
 * @description 对象转换为url参数
 * @param object 对象
 * @param isPrefix 是否自动加上?号，默认为true
 * @return url参数字符串
 */
export function objectToUrlParams(object = {}, isPrefix = true) {
  const prefix = isPrefix ? "?" : ""
  const _result = []
  for (const key in object) {
    const value = object[key]
    // 去掉为空的参数
    if (["", undefined, null].includes(value)) {
      continue
    }
    if (value.constructor === Array) {
      value?.forEach((_value) => {
        _result.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(_value)}`)
      })
    } else {
      _result.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return _result.length ? prefix + _result.join("&") : ""
}
