import type Toast from "./ui-toast.vue"
import type { Ref, PropType, CSSProperties, ExtractPropTypes } from "vue"
import { numericProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * Toast 组件 Props 定义
 * 支持两种使用方式：
 * 1. 声明式：通过 Props + v-model:show 控制
 * 2. 命令式：通过 ref.show(options) 方法调用
 */
export const toastProps = {
  /**
   * 是否显示 toast
   * 支持 v-model:show 双向绑定
   */
  show: Boolean,
  /**
   * 显示类型
   * - loading: 加载中（不会自动关闭，除非设置 duration）
   * - await: 等待中
   * - success: 成功
   * - fail: 失败
   * - default: 默认（纯文本）
   */
  type: makeStringProp<"loading" | "await" | "success" | "fail" | "default">("default"),
  /**
   * 自定义图标（支持图标名称或图片 URL）
   */
  icon: String,
  /**
   * 是否显示透明蒙层，防止触摸穿透
   */
  mask: Boolean,
  /**
   * 显示内容
   */
  content: String,
  /**
   * 显示宽度
   */
  width: numericProp,
  /**
   * 位置偏移（仅 position 为 top/bottom 时生效）
   */
  offset: makeNumericProp(150),
  /**
   * 图标大小
   */
  iconSize: makeStringProp("80rpx"),
  /**
   * 图标前缀
   */
  iconPrefix: makeStringProp("ui-icon"),
  /**
   * 显示持续时间（毫秒）
   * - 默认 2000ms
   * - 设置为 0 则不自动关闭
   */
  duration: makeNumericProp(2000),
  /**
   * 显示位置
   * - top: 顶部
   * - middle: 居中
   * - bottom: 底部
   */
  position: makeStringProp<"top" | "bottom" | "middle">("middle"),
  /**
   * 背景色
   */
  background: makeStringProp("rgba(0, 0, 0, 0.7)"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
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
