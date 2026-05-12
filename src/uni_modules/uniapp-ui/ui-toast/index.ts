import type Toast from "./ui-toast.vue"
import type { Ref, PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type ToastType = "loading" | "await" | "success" | "fail" | "default"
export type ToastPosition = "top" | "middle" | "bottom"

/** 内置 type 对应的图标名 */
export const TOAST_TYPE_ICON_MAP: Record<Exclude<ToastType, "default" | "loading">, string> = {
  await: "clock-o",
  fail: "clear",
  success: "success",
}

const defaultProps = buildDefaultProps("toast", {
  show: false,
  type: "default",
  icon: undefined,
  mask: false,
  content: undefined,
  width: undefined,
  offset: undefined,
  iconSize: undefined,
  iconPrefix: "ui-icon",
  duration: 2000,
  position: "middle",
  background: undefined,
  lazyRender: true,
  customClass: undefined,
  customStyle: undefined,
})

export const toastProps = {
  /** 显示状态（v-model:show） */
  show: defaultProps("show", { type: Boolean }),
  /** 显示类型 */
  type: defaultProps("type", { type: String as PropType<ToastType> }),
  /** 自定义图标（图标名或图片 URL） */
  icon: defaultProps("icon", { type: String }),
  /** 显示透明蒙层防穿透 */
  mask: defaultProps("mask", { type: Boolean }),
  /** 显示内容 */
  content: defaultProps("content", { type: String }),
  /** 容器宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 位置偏移（top/bottom 时生效） */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 图标尺寸 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标前缀 */
  iconPrefix: defaultProps("iconPrefix", { type: String }),
  /** 自动关闭时长（毫秒），0 表示不自动关闭。loading 类型默认不自动关闭 */
  duration: defaultProps("duration", { type: Number }),
  /** 显示位置 */
  position: defaultProps("position", { type: String as PropType<ToastPosition> }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 显示时才挂载节点 */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const toastEmits = {
  "update:show": (_show: boolean) => true,
  open: () => true,
  close: () => true,
  opened: () => true,
  closed: () => true,
}

/** 命令式调用参数（去除 show/customClass/customStyle/lazyRender） */
export type ToastOptions = Partial<Omit<ExtractPropTypes<typeof toastProps>, "show" | "customClass" | "customStyle" | "lazyRender">>

export type ToastEmits = typeof toastEmits
export type ToastProps = ExtractPropTypes<typeof toastProps>
export type ToastInstance = InstanceType<typeof Toast>

let globalToastInstance: Ref<ToastInstance | null> | null = null

const pendingQueue: Array<{ action: "show" | "hide"; options?: string | ToastOptions }> = []

/** 注册全局 Toast 实例（根组件调用） */
export function provideToast(instance: Ref<ToastInstance | null>) {
  globalToastInstance = instance
  flushPendingQueue()
}

/** 注销全局 Toast 实例（根组件 onUnmounted 时调用） */
export function unprovideToast(instance?: Ref<ToastInstance | null>) {
  if (!instance || globalToastInstance === instance) globalToastInstance = null
}

/** 获取全局 Toast 实例（内部） */
export function getGlobalToastInstance(): Ref<ToastInstance | null> | null {
  return globalToastInstance
}

/** 入队待执行 */
export function enqueuePendingToast(action: "show" | "hide", options?: string | ToastOptions) {
  pendingQueue.push({ action, options })
}

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
