import type Popover from "./ui-popover.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeArrayProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 气泡菜单选项
 */
export interface PopoverAction {
  /** 选项文字 */
  text: string
  /** 选项图标 */
  icon?: string
  /** 选项颜色 */
  color?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 自定义类名 */
  className?: string
}

/**
 * 气泡弹出位置
 */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

/**
 * 气泡主题
 */
export type PopoverTheme = "light" | "dark"

/**
 * 触发方式
 */
export type PopoverTrigger = "click" | "manual"

export const [popoverProps, usePopoverProps] = createProps("popover", {
  /**
   * 是否显示气泡
   */
  show: Boolean,
  /**
   * 选项列表
   */
  actions: makeArrayProp<PopoverAction>(),
  /**
   * 弹出位置
   */
  placement: makeStringProp<PopoverPlacement>("bottom"),
  /**
   * 主题风格
   */
  theme: makeStringProp<PopoverTheme>("light"),
  /**
   * 触发方式
   */
  trigger: makeStringProp<PopoverTrigger>("click"),
  /**
   * 偏移量 [水平偏移, 垂直偏移]
   */
  offset: makeArrayProp<number>(),
  /**
   * 是否显示箭头
   */
  showArrow: truthProp,
  /**
   * 点击选项后是否关闭
   */
  closeOnClickAction: truthProp,
  /**
   * 点击外部区域是否关闭
   */
  closeOnClickOutside: truthProp,
  /**
   * 是否显示遮罩层
   */
  overlay: Boolean,
  /**
   * 遮罩层透明度
   */
  overlayOpacity: makeNumericProp(0),
  /**
   * 动画时长，单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 圆角大小
   */
  borderRadius: makeNumericProp("12rpx"),
  /**
   * 选项图标大小
   */
  iconSize: numericProp,
  /**
   * 选项图标颜色
   */
  iconColor: String,
  /**
   * 选项文字大小
   */
  textSize: numericProp,
  /**
   * 选项文字颜色
   */
  textColor: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const popoverEmits = {
  /** 显示状态变更 */
  "update:show": (show: boolean) => true,
  /** 打开气泡 */
  open: () => true,
  /** 打开动画结束 */
  opened: () => true,
  /** 关闭气泡 */
  close: () => true,
  /** 关闭动画结束 */
  closed: () => true,
  /** 点击选项 */
  select: (action: PopoverAction, index: number) => true,
  /** 点击遮罩层 */
  clickOverlay: () => true,
}

export type PopoverEmits = typeof popoverEmits
export type PopoverProps = ExtractPropTypes<typeof popoverProps>
export type PopoverInstance = InstanceType<typeof Popover>
