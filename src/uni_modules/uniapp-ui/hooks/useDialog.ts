import type { DialogOptions, DialogInstance } from "../ui-dialog"
import { enqueuePendingDialog, getGlobalDialogInstance } from "../ui-dialog"

/**
 * Dialog 控制器接口
 * 提供便捷方法调用全局 Dialog
 */
export interface DialogController {
  /**
   * 显示 dialog（Promise 风格）
   * @param options 显示选项
   * @returns Promise，confirm 时 resolve(true)，cancel/overlay 时 resolve(false)
   */
  show: (options?: DialogOptions) => Promise<boolean>
  /**
   * 关闭 dialog
   */
  close: () => void
  /**
   * 显示确认对话框（带确认和取消按钮）
   * @param options 可以是字符串（作为 title）或配置对象
   * @returns Promise，确认时 resolve(true)，取消时 resolve(false)
   */
  confirm: (options?: string | DialogOptions) => Promise<boolean>
  /**
   * 显示提示对话框（只有确认按钮）
   * @param options 可以是字符串（作为 title）或配置对象
   * @returns Promise，确认时 resolve
   */
  alert: (options?: string | DialogOptions) => Promise<void>
}

/**
 * 创建 Dialog 控制器
 * @param getInstance 获取 Dialog 实例的函数（延迟获取，确保在调用时实例已存在）
 * @returns Dialog 控制器
 */
function createDialogController(getInstance: () => DialogInstance | null): DialogController {
  // instance 未挂载时，调用入队列并保存 resolve；instance 就绪后由 flushPendingQueue 把真实结果回填给 Promise
  function show(options?: DialogOptions): Promise<boolean> {
    const instance = getInstance()
    if (instance) return instance.show(options)
    return new Promise<boolean>((resolve) => {
      enqueuePendingDialog({ action: "show", options, resolve })
    })
  }

  function close() {
    const instance = getInstance()
    if (instance) {
      instance.close()
    } else {
      enqueuePendingDialog({ action: "close" })
    }
  }

  function confirm(options?: string | DialogOptions): Promise<boolean> {
    const instance = getInstance()
    if (instance) return instance.confirm(options)
    return new Promise<boolean>((resolve) => {
      enqueuePendingDialog({ action: "confirm", options, resolve })
    })
  }

  function alert(options?: string | DialogOptions): Promise<void> {
    const instance = getInstance()
    if (instance) return instance.alert(options)
    return new Promise<void>((resolve) => {
      enqueuePendingDialog({ action: "alert", options, resolve })
    })
  }

  return {
    show,
    close,
    confirm,
    alert,
  }
}

/**
 * 获取 Dialog 控制器（在任意页面/组件中调用）
 *
 * 特性：
 * - 即使在组件挂载前调用，也会将请求放入队列，组件挂载后自动执行；Promise 结果由队列保存的 resolve 回填
 * - 支持 Promise 风格的调用，可使用 async/await
 *
 * @returns Dialog 控制器，包含 show、close、confirm、alert 方法
 *
 * @example
 * ```vue
 * <script setup>
 * import { useDialog } from "@/uni_modules/uniapp-ui"
 *
 * const dialog = useDialog()
 *
 * async function handleDelete() {
 *   const confirmed = await dialog.confirm("确认删除", "删除后无法恢复，是否继续？")
 *   if (confirmed) {
 *     // 执行删除操作
 *   }
 * }
 * </script>
 * ```
 */
export function useDialog(): DialogController {
  // 延迟获取全局实例，确保在调用方法时实例已经注册
  const getInstance = () => {
    const instanceRef = getGlobalDialogInstance()
    return instanceRef?.value ?? null
  }

  return createDialogController(getInstance)
}
