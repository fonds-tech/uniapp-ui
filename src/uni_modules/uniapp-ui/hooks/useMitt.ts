import { globalMitt } from "../utils/mitt"

/**
 * 使用事件监听器（全局单例）
 * @returns Mitt 实例
 */
export function useMitt() {
  return globalMitt
}
