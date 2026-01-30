import type Toast from "./ui-toast.vue"
import type { Ref, PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * Toast 组件 Props 定义
 * 支持两种使用方式：
 * 1. 声明式：通过 Props + v-model:show 控制
 * 2. 命令式：通过 ref.show(options) 方法调用
 */
const defaultProps = buildDefaultProps("toast", {
  show: false,
  type: "default",
  icon: undefined,
  mask: false,
  content: undefined,
  width: undefined,
  offset: 150,
  iconSize: "80rpx",
  iconPrefix: "ui-icon",
  duration: 2000,
  position: "middle",
  background: "rgba(0, 0, 0, 0.7)",
  customClass: undefined,
  customStyle: undefined,
})

export const toastProps = {
  /**
   * 是否显示 toast
   * 支持 v-model:show 双向绑定
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 显示类型
   * - loading: 加载中（不会自动关闭，除非设置 duration）
   * - await: 等待中
   * - success: 成功
   * - fail: 失败
   * - default: 默认（纯文本）
   */
  type: defaultProps("type", { type: String as PropType<"loading" | "await" | "success" | "fail" | "default"> }),
  /**
   * 自定义图标（支持图标名称或图片 URL）
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 是否显示透明蒙层，防止触摸穿透
   */
  mask: defaultProps("mask", { type: Boolean }),
  /**
   * 显示内容
   */
  content: defaultProps("content", { type: String }),
  /**
   * 显示宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 位置偏移（仅 position 为 top/bottom 时生效）
   */
  offset: defaultProps("offset", { type: [Number, String] }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: String }),
  /**
   * 图标前缀
   */
  iconPrefix: defaultProps("iconPrefix", { type: String }),
  /**
   * 显示持续时间（毫秒）
   * - 默认 2000ms
   * - 设置为 0 则不自动关闭
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 显示位置
   * - top: 顶部
   * - middle: 居中
   * - bottom: 底部
   */
  position: defaultProps("position", { type: String as PropType<"top" | "bottom" | "middle"> }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
/**
 * Toast 组件事件定义
 */
export const toastEmits = {
  /**
   * 显示状态变化时触发，用于 v-model:show
   */
  "update:show": (show: boolean) => true,
  /**
   * toast 打开时触发
   */
  open: () => true,
  /**
   * toast 关闭时触发
   */
  close: () => true,
  /**
   * toast 打开动画结束时触发
   */
  opened: () => true,
  /**
   * toast 关闭动画结束时触发
   */
  closed: () => true,
}

/**
 * 命令式调用 show 方法的参数类型
 * 可以是字符串（直接作为 content）或配置对象
 */
export type ToastOptions = Partial<Omit<ExtractPropTypes<typeof toastProps>, "show" | "customClass" | "customStyle">>

export type ToastEmits = typeof toastEmits
export type ToastProps = ExtractPropTypes<typeof toastProps>
export type ToastInstance = InstanceType<typeof Toast>

/**
 * 全局 Toast 实例存储
 * 使用全局变量而非 provide/inject，因为 uni-app 页面与 App.vue 不是真正的父子关系
 */
let globalToastInstance: Ref<ToastInstance | null> | null = null

/**
 * 待执行的 toast 调用队列
 * 当实例未注册时，将调用放入队列，等实例注册后执行
 */
const pendingQueue: Array<{ action: "show" | "hide"; options?: string | ToastOptions }> = []

/**
 * 注册全局 Toast 实例（在根组件中调用）
 * 使任意页面/组件可以通过 useToast() 获取全局 toast 控制器
 *
 * @param instance Toast 组件实例的 ref
 *
 * @example
 * ```vue
 * <template>
 *   <ui-toast ref="toastRef" />
 * </template>
 *
 * <script setup>
 * import { ref } from "vue"
 * import { provideToast } from "@/uni_modules/uniapp-ui/ui-toast"
 *
 * const toastRef = ref()
 * provideToast(toastRef)
 * </script>
 * ```
 */
export function provideToast(instance: Ref<ToastInstance | null>) {
  globalToastInstance = instance

  // 实例注册后，执行队列中的待处理调用
  flushPendingQueue()
}

/**
 * 获取全局 Toast 实例（内部使用）
 * @returns 全局 Toast 实例的 ref，可能为 null
 */
export function getGlobalToastInstance(): Ref<ToastInstance | null> | null {
  return globalToastInstance
}

/**
 * 将调用加入待执行队列
 * @param action 动作类型
 * @param options 选项
 */
export function enqueuePendingToast(action: "show" | "hide", options?: string | ToastOptions) {
  pendingQueue.push({ action, options })
}

/**
 * 执行队列中的待处理调用
 */
function flushPendingQueue() {
  if (!globalToastInstance?.value) return

  while (pendingQueue.length > 0) {
    const item = pendingQueue.shift()
    if (!item) continue

    if (item.action === "show" && item.options !== undefined) {
      globalToastInstance.value.show(item.options)
    } else if (item.action === "hide") {
      globalToastInstance.value.hide()
    }
  }
}
