import { usePromise } from "./usePromise"

/**
 * 模拟 requestAnimationFrame 的自定义函数
 * @param cb 回调函数
 * @returns 包含 Promise 对象及相关方法的对象
 */
export function useRequestAnimationFrame(cb = () => {}) {
  return usePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 30)
  })
}
