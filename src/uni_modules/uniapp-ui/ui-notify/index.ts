import type Notify from "./ui-notify.vue"
import type { Ref, PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 进出场动画时长(ms)，与 SCSS `--ui-transition-duration` 对齐 */
export const NOTIFY_ANIMATION_DURATION = 300
/** 默认展示时长(ms) */
export const NOTIFY_DEFAULT_DURATION = 3000

const defaultProps = buildDefaultProps("notify", {
  show: false,
  type: "primary",
  content: "",
  duration: NOTIFY_DEFAULT_DURATION,
  color: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  background: undefined,
  zIndex: 2000,
  offsetTop: undefined,
  customClass: "",
  customStyle: "",
})

export const notifyProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 通知类型 */
  type: defaultProps("type", {
    type: String as PropType<NotifyType>,
    validator: (t: string) => ["primary", "success", "warning", "danger"].includes(t),
  }),
  /** 展示内容 */
  content: defaultProps("content", { type: String }),
  /** 展示时长 (ms) */
  duration: defaultProps("duration", { type: [Number, String] }),
  /** 文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 字号 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 字重 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 距离顶部偏移 */
  offsetTop: defaultProps("offsetTop", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const notifyEmits = {
  /** 弹层打开 */
  open: () => true,
  /** 打开动画结束 */
  opened: () => true,
  /** 弹层关闭 */
  close: () => true,
  /** 关闭动画结束 */
  closed: () => true,
  /** 点击事件 */
  click: () => true,
  /** show 双向绑定 */
  "update:show": (value: boolean) => true,
}

export interface NotifyOptions {
  show?: boolean
  type?: NotifyType
  content?: string
  duration?: string | number
  color?: string
  fontSize?: string | number
  fontWeight?: string | number
  background?: string
  zIndex?: string | number
  offsetTop?: string | number
  customClass?: string
  customStyle?: string | CSSProperties
}

export type NotifyType = "primary" | "success" | "warning" | "danger"
export type NotifyEmits = typeof notifyEmits
export type NotifyProps = ExtractPropTypes<typeof notifyProps>
export type NotifyInstance = InstanceType<typeof Notify>

/** 全局 Notify 实例 */
let globalNotifyInstance: Ref<NotifyInstance | null> | null = null
/** 待执行调用队列 */
const pendingQueue: Array<{ action: "show" | "close"; options?: NotifyOptions }> = []

/** 注册全局实例 */
export function provideNotify(instance: Ref<NotifyInstance | null>) {
  globalNotifyInstance = instance
  flushPendingQueue()
}

/** 获取全局实例 */
export function getGlobalNotifyInstance(): Ref<NotifyInstance | null> | null {
  return globalNotifyInstance
}

/** 入队 */
export function enqueuePendingNotify(action: "show" | "close", options?: NotifyOptions) {
  pendingQueue.push({ action, options })
}

/** 出队执行 */
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
