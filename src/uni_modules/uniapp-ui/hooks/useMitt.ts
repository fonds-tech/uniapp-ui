import { Mitt } from "../utils/mitt"

/**
 * 使用事件监听器
 * @returns Mitt 实例
 */
export function useMitt() {
  const pages = getCurrentPages()
  const { route } = pages[pages.length - 1]
  const mitt = new Mitt(route)
  return mitt
}
