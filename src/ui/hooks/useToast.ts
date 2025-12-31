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
   * 显示 toast
   * 如果实例未注册，将调用放入队列等待实例注册后执行
   */
  function show(options: string | ToastOptions) {
    const instance = getInstance()
    if (instance) {
      instance.show(options)
    } else {
      // 实例未注册，放入队列等待
      enqueuePendingToast("show", options)
    }
  }

  /**
   * 隐藏 toast
   */
  function hide() {
    const instance = getInstance()
    if (instance) {
      instance.hide()
    } else {
      // 实例未注册，放入队列等待
      enqueuePendingToast("hide")
    }
  }

  /**
   * 显示成功提示
   */
  function success(content: string, options?: ToastOptions) {
    show({ ...options, type: "success", content })
  }

  /**
   * 显示失败提示
   */
  function fail(content: string, options?: ToastOptions) {
    show({ ...options, type: "fail", content })
  }

  /**
   * 显示加载中提示
   */
  function loading(content?: string, options?: ToastOptions) {
    show({ ...options, type: "loading", content: content ?? "加载中..." })
  }

  /**
   * 显示等待提示
   */
  function awaitFn(content: string, options?: ToastOptions) {
    show({ ...options, type: "await", content })
  }

  /**
   * 显示默认提示（纯文本）
   */
  function text(content: string, options?: ToastOptions) {
    show({ ...options, type: "default", content })
  }

  return {
    show,
    hide,
    success,
    fail,
    loading,
    await: awaitFn,
    text,
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
 * import { useToast } from "@/ui"
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
