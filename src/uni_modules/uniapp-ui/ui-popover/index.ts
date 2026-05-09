import type Popover from "./ui-popover.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 气泡弹出位置 */
export type PopoverPlacement = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "right"

/** 气泡主题 */
export type PopoverTheme = "light" | "dark"

/** 气泡触发方式 */
export type PopoverTrigger = "click" | "manual"

/** 气泡操作项 */
export interface PopoverAction {
  /** 唯一标识 */
  id?: string | number
  /** 选项文字 */
  text: string
  /** 选项图标 */
  icon?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
}

const defaultProps = buildDefaultProps("popover", {
  show: false,
  actions: () => [],
  placement: "bottom",
  theme: "light",
  trigger: "click",
  offset: () => [0, 8],
  showArrow: true,
  closeOnClickAction: true,
  closeOnClickOutside: true,
  duration: 200,
  zIndex: undefined,
  overlay: false,
  overlayStyle: undefined,
  customClass: "",
  customStyle: "",
})

export const popoverProps = {
  /** 是否显示气泡 */
  show: defaultProps("show", { type: Boolean }),
  /** 操作选项数组 */
  actions: defaultProps("actions", { type: Array as PropType<PopoverAction[]> }),
  /** 弹出位置 */
  placement: defaultProps("placement", { type: String as PropType<PopoverPlacement> }),
  /** 主题风格 */
  theme: defaultProps("theme", { type: String as PropType<PopoverTheme> }),
  /** 触发方式 */
  trigger: defaultProps("trigger", { type: String as PropType<PopoverTrigger> }),
  /** 偏移量 [x, y] */
  offset: defaultProps("offset", { type: Array as unknown as PropType<[number, number]> }),
  /** 显示箭头 */
  showArrow: defaultProps("showArrow", { type: Boolean }),
  /** 点击选项后自动关闭 */
  closeOnClickAction: defaultProps("closeOnClickAction", { type: Boolean }),
  /** 点击外部 (遮罩或透明拦截层) 自动关闭 */
  closeOnClickOutside: defaultProps("closeOnClickOutside", { type: Boolean }),
  /** 动画时长 (ms) */
  duration: defaultProps("duration", { type: Number }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 显示遮罩层 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 遮罩层样式 */
  overlayStyle: defaultProps("overlayStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const popoverEmits = {
  /** show 双向绑定 */
  "update:show": (show: boolean) => typeof show === "boolean",
  /** 选中操作项 */
  select: (action: PopoverAction, index: number) => !!action && typeof index === "number",
  /** 弹层打开 */
  open: () => true,
  /** 弹层关闭 */
  close: () => true,
  /** 打开动画结束 */
  opened: () => true,
  /** 关闭动画结束 */
  closed: () => true,
  /** 点击外部区域 */
  clickOutside: () => true,
}

// 模块级队列：保证多个 popover 不同时打开 (思路参考 wot-design-uni)
const queue: Array<{ uid: number; close: () => void }> = []

export function pushQueue(item: { uid: number; close: () => void }) {
  queue.push(item)
}

export function removeQueue(uid: number) {
  const idx = queue.findIndex((i) => i.uid === uid)
  if (idx >= 0) queue.splice(idx, 1)
}

export function closeOthers(uid: number) {
  queue.forEach((i) => {
    if (i.uid !== uid) i.close()
  })
}

export type PopoverEmits = typeof popoverEmits
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverInstance = InstanceType<typeof Popover>
