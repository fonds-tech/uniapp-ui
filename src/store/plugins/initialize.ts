import type { PiniaPluginContext } from "pinia"
import { isFunction } from "@/utils/is"

/**
 * 初始化插件
 * 当 store 被实例化时，检查是否存在 init 方法，如果存在则自动调用
 */
export function initializePlugin({ store }: PiniaPluginContext): void {
  // 检查 store 是否有 init 方法
  if (isFunction(store.init)) {
    // 调用 init 方法
    store.init()
  }
}
