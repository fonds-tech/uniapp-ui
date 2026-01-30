import type Notify from "./ui-notify.vue"
import type { Ref, PropType, ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("notify", {
  show: false,
  type: "primary",
  content: "",
  duration: "3000",
  color: "",
  fontSize: "",
  fontWeight: "",
  background: "",
  zIndex: "2000",
  offsetTop: "",
  customClass: "",
  customStyle: "",
})

export const notifyProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 通知类型
   */
  type: defaultProps("type", {
    type: String as PropType<NotifyType>,
    validator: (t: string) => ["primary", "success", "warning", "danger"].includes(t),
  }),
  /**
   * 展示内容
   */
  content: defaultProps("content", { type: String }),
  /**
   * 展示时长，单位ms
   */
  duration: defaultProps("duration", { type: [Number, String] }),
  /**
   * 字体颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 字体大小
   */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /**
   * 字体粗细
   */
  fontWeight: defaultProps("fontWeight", { type: String }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 距离顶部偏移
   */
  offsetTop: defaultProps("offsetTop", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const notifyEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: () => true,
  "update:show": (value: boolean) => true,
}

export interface NotifyOptions {
  show?: boolean
  type?: NotifyType
  content?: string
  duration?: string | number
  color?: string
  fontSize?: string | number
  fontWeight?: string
  background?: string
  zIndex?: string | number
  offsetTop?: string | number
  customClass?: string
  customStyle?: string | Record<string, any>
}
export type NotifyType = "primary" | "success" | "warning" | "danger"
export type NotifyProps = ExtractPropTypes<typeof notifyProps>
export type NotifyInstance = InstanceType<typeof Notify>

/**
 * 全局 Notify 实例存储
 */
let globalNotifyInstance: Ref<NotifyInstance | null> | null = null

/**
 * 待执行的 notify 调用队列
 */
const pendingQueue: Array<{ action: "show" | "close"; options?: NotifyOptions }> = []

/**
 * 注册全局 Notify 实例
 * @param instance Notify 组件实例的 ref
 */
export function provideNotify(instance: Ref<NotifyInstance | null>) {
  globalNotifyInstance = instance
  flushPendingQueue()
}

/**
 * 获取全局 Notify 实例
 */
export function getGlobalNotifyInstance(): Ref<NotifyInstance | null> | null {
  return globalNotifyInstance
}

/**
 * 将调用加入待执行队列
 */
export function enqueuePendingNotify(action: "show" | "close", options?: NotifyOptions) {
  pendingQueue.push({ action, options })
}

/**
 * 执行队列中的待处理调用
 */
function flushPendingQueue() {
  if (!globalNotifyInstance?.value) return

  while (pendingQueue.length > 0) {
    const item = pendingQueue.shift()
    if (!item) continue

    if (item.action === "show" && item.options !== undefined) {
      globalNotifyInstance.value.show(item.options)
    } else if (item.action === "close") {
      globalNotifyInstance.value.close()
    }
  }
}
