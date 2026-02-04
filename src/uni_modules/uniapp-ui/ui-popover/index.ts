import type Popover from "./ui-popover.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 气泡弹出位置类型
 */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right"

/**
 * 气泡主题类型
 */
export type PopoverTheme = "light" | "dark"

/**
 * 气泡触发方式
 */
export type PopoverTrigger = "click" | "manual"

/**
 * 气泡操作项
 */
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
  duration: 300,
  zIndex: undefined,
  overlay: false,
  overlayStyle: undefined,
  customClass: "",
  customStyle: undefined,
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
  /** 是否显示箭头 */
  showArrow: defaultProps("showArrow", { type: Boolean }),
  /** 点击选项后是否关闭 */
  closeOnClickAction: defaultProps("closeOnClickAction", { type: Boolean }),
  /** 点击外部是否关闭 */
  closeOnClickOutside: defaultProps("closeOnClickOutside", { type: Boolean }),
  /** 动画时长 */
  duration: defaultProps("duration", { type: Number }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 是否显示遮罩层 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 遮罩层样式 */
  overlayStyle: defaultProps("overlayStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const popoverEmits = {
  /** 更新显示状态 */
  "update:show": (show: boolean) => true,
  /** 点击选项时触发 */
  select: (action: PopoverAction, index: number) => true,
  /** 打开气泡前触发 */
  open: () => true,
  /** 关闭气泡前触发 */
  close: () => true,
  /** 打开动画结束后触发 */
  opened: () => true,
  /** 关闭动画结束后触发 */
  closed: () => true,
  /** 点击遮罩层触发 */
  clickOverlay: () => true,
}

export type PopoverEmits = typeof popoverEmits
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverInstance = InstanceType<typeof Popover>
