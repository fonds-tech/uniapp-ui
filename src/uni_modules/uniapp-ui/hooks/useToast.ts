import type { ToastOptions, ToastInstance } from "../ui-toast"
import { enqueuePendingToast, getGlobalToastInstance } from "../ui-toast"

/**
 * Toast 控制器接口
 * 提供便捷方法调用全局 Toast
 */
export interface ToastController {
  /**
   * 显示 toast
   * @param options 显示选项，可以是字符串（作为 content）或配置对象
   */
  show: (options: string | ToastOptions) => void
  /**
   * 隐藏 toast
   */
  hide: () => void
  /**
   * 显示成功提示
   * @param content 提示内容
   * @param options 可选配置
   */
  success: (content: string, options?: ToastOptions) => void
  /**
   * 显示失败提示
   * @param content 提示内容
   * @param options 可选配置
   */
  fail: (content: string, options?: ToastOptions) => void
  /**
   * 显示加载中提示
   * @param content 提示内容（可选）
   * @param options 可选配置
   */
  loading: (content?: string, options?: ToastOptions) => void
  /**
   * 显示等待提示
   * @param content 提示内容
   * @param options 可选配置
   */
  await: (content: string, options?: ToastOptions) => void
  /**
   * 显示默认提示（纯文本）
   * @param content 提示内容
   * @param options 可选配置
   */
  text: (content: string, options?: ToastOptions) => void
}

/**
 * 创建 Toast 控制器
 * @param getInstance 获取 Toast 实例的函数（延迟获取，确保在调用时实例已存在）
 * @returns Toast 控制器
 */
function createToastController(getInstance: () => ToastInstance | null): ToastController {
  /**
   * 通用调用方法，处理实例不存在时的队列逻辑
   */
  function callMethod<K extends keyof ToastInstance>(
    method: K,
    ...args: ToastInstance[K] extends (...args: infer P) => unknown ? P : never
  ) {
    const instance = getInstance()
    if (instance) {
      const fn = instance[method]
      if (typeof fn === "function") {
        ;(fn as (...args: unknown[]) => void)(...args)
      }
    } else if (method === "show" || method === "hide") {
      // 实例未注册时，只有 show/hide 需要入队列
      enqueuePendingToast(method as "show" | "hide", args[0] as string | ToastOptions | undefined)
    }
  }

  return {
    show: (options) => callMethod("show", options),
    hide: () => callMethod("hide"),
    success: (content, options) => callMethod("success", content, options),
    fail: (content, options) => callMethod("fail", content, options),
    loading: (content, options) => callMethod("loading", content, options),
    await: (content, options) => callMethod("await", content, options),
    text: (content, options) => callMethod("text", content, options),
  }
}

/**
 * 获取 Toast 控制器（在任意页面/组件中调用）
 *
 * 特性：
 * - 即使在组件挂载前调用，也会将请求放入队列，组件挂载后自动执行
 * - 适用于请求拦截器等可能在页面渲染前执行的场景
 *
 * @returns Toast 控制器，包含 show、hide、success、fail、loading、await、text 方法
 *
 * @example
 * ```vue
 * <script setup>
 * import { useToast } from "@/uni_modules/uniapp-ui"
 *
 * const toast = useToast()
 *
 * // 显示成功提示
 * toast.success("操作成功")
 *
 * // 显示失败提示
 * toast.fail("操作失败")
 *
 * // 显示加载中（不自动关闭）
 * toast.loading("加载中...")
 * // 手动关闭
 * toast.hide()
 *
 * // 显示等待提示
 * toast.await("请稍候...")
 *
 * // 显示纯文本提示
 * toast.text("这是一条消息")
 *
 * // 自定义选项
 * toast.show({
 *   type: "success",
 *   content: "保存成功",
 *   duration: 3000,
 *   position: "top",
 * })
 * </script>
 * ```
 */
export function useToast(): ToastController {
  // 延迟获取全局实例，确保在调用方法时实例已经注册
  const getInstance = () => {
    const instanceRef = getGlobalToastInstance()
    return instanceRef?.value ?? null
  }

  return createToastController(getInstance)
}
