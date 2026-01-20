import type { NotifyOptions, NotifyInstance } from "../ui-notify"
import { enqueuePendingNotify, getGlobalNotifyInstance } from "../ui-notify"

/**
 * Notify 控制器接口
 */
export interface NotifyController {
  /**
   * 显示通知
   * @param options 显示选项，可以是字符串（作为 content）或配置对象
   */
  show: (options: string | NotifyOptions) => void
  /**
   * 关闭通知
   */
  close: () => void
  /**
   * 显示主要通知
   */
  primary: (options?: string | NotifyOptions) => void
  /**
   * 显示成功通知
   */
  success: (options?: string | NotifyOptions) => void
  /**
   * 显示警告通知
   */
  warning: (options?: string | NotifyOptions) => void
  /**
   * 显示危险通知
   */
  danger: (options?: string | NotifyOptions) => void
}

/**
 * 创建 Notify 控制器
 */
function createNotifyController(getInstance: () => NotifyInstance | null): NotifyController {
  function normalizeOptions(options: string | NotifyOptions | undefined): NotifyOptions {
    if (typeof options === "string") {
      return { content: options }
    }
    return options || {}
  }

  function callShow(options: NotifyOptions) {
    const instance = getInstance()
    if (instance) {
      instance.show(options)
    } else {
      enqueuePendingNotify("show", options)
    }
  }

  function callClose() {
    const instance = getInstance()
    if (instance) {
      instance.close()
    } else {
      enqueuePendingNotify("close")
    }
  }

  return {
    show: (options) => callShow(normalizeOptions(options)),
    close: () => callClose(),
    primary: (options) => callShow({ ...normalizeOptions(options), type: "primary" }),
    success: (options) => callShow({ ...normalizeOptions(options), type: "success" }),
    warning: (options) => callShow({ ...normalizeOptions(options), type: "warning" }),
    danger: (options) => callShow({ ...normalizeOptions(options), type: "danger" }),
  }
}

/**
 * 获取 Notify 控制器
 *
 * @example
 * ```vue
 * <script setup>
 * import { useNotify } from "@/uni_modules/uniapp-ui"
 *
 * const notify = useNotify()
 *
 * // 显示主要通知
 * notify.primary("这是一条通知")
 *
 * // 显示成功通知
 * notify.success("操作成功")
 *
 * // 显示警告通知
 * notify.warning("请注意")
 *
 * // 显示危险通知
 * notify.danger("操作失败")
 *
 * // 自定义选项
 * notify.show({
 *   type: "success",
 *   content: "自定义通知",
 *   duration: 5000,
 *   safeAreaInsetTop: true,
 * })
 * </script>
 * ```
 */
export function useNotify(): NotifyController {
  const getInstance = () => {
    const instanceRef = getGlobalNotifyInstance()
    return instanceRef?.value ?? null
  }

  return createNotifyController(getInstance)
}
