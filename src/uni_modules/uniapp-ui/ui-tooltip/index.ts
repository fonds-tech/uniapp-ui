import type Tooltip from "./ui-tooltip.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 提示框弹出位置类型
 */
export type TooltipPlacement = "top" | "bottom" | "left" | "right"

/**
 * 提示框触发方式
 * 注意：小程序环境仅支持 click
 */
export type TooltipTrigger = "click" | "hover"

const defaultProps = buildDefaultProps("tooltip", {
  content: "",
  placement: "top",
  trigger: "click",
  visible: false,
  disabled: false,
  offset: 8,
  showArrow: true,
  bgColor: undefined,
  textColor: undefined,
  maxWidth: "300rpx",
  duration: 300,
  zIndex: undefined,
  customClass: "",
  customStyle: undefined,
})

export const tooltipProps = {
  /** 提示内容 */
  content: defaultProps("content", { type: String }),
  /** 弹出位置 */
  placement: defaultProps("placement", { type: String as PropType<TooltipPlacement> }),
  /** 触发方式（小程序仅支持 click） */
  trigger: defaultProps("trigger", { type: String as PropType<TooltipTrigger> }),
  /** 是否显示，支持 v-model */
  visible: defaultProps("visible", { type: Boolean }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 偏移量 */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 是否显示箭头 */
  showArrow: defaultProps("showArrow", { type: Boolean }),
  /** 背景颜色 */
  bgColor: defaultProps("bgColor", { type: String }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 最大宽度 */
  maxWidth: defaultProps("maxWidth", { type: [Number, String] }),
  /** 动画时长（毫秒） */
  duration: defaultProps("duration", { type: Number }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const tooltipEmits = {
  /** 更新显示状态 */
  "update:visible": (visible: boolean) => true,
  /** 打开时触发 */
  open: () => true,
  /** 关闭时触发 */
  close: () => true,
}

export type TooltipEmits = typeof tooltipEmits
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipInstance = InstanceType<typeof Tooltip>
