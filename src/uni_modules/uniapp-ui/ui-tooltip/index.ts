import type Tooltip from "./ui-tooltip.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TooltipPlacement =
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

/** 触发方式（小程序仅 click；H5 / App 支持 hover） */
export type TooltipTrigger = "click" | "hover"

/** 箭头尺寸（px） */
export const TOOLTIP_ARROW_SIZE = 5

/** placement → 箭头朝向类名 */
export const TOOLTIP_ARROW_CLASS_MAP: Record<TooltipPlacement, string> = {
  top: "ui-tooltip__arrow--down",
  "top-start": "ui-tooltip__arrow--down",
  "top-end": "ui-tooltip__arrow--down",
  bottom: "ui-tooltip__arrow--up",
  "bottom-start": "ui-tooltip__arrow--up",
  "bottom-end": "ui-tooltip__arrow--up",
  left: "ui-tooltip__arrow--right",
  "left-start": "ui-tooltip__arrow--right",
  "left-end": "ui-tooltip__arrow--right",
  right: "ui-tooltip__arrow--left",
  "right-start": "ui-tooltip__arrow--left",
  "right-end": "ui-tooltip__arrow--left",
}

const defaultProps = buildDefaultProps("tooltip", {
  content: undefined,
  placement: "top",
  trigger: "click",
  visible: false,
  disabled: false,
  offset: 0,
  showArrow: true,
  closeOnClickOutside: true,
  bgColor: undefined,
  textColor: undefined,
  maxWidth: undefined,
  duration: 200,
  zIndex: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const tooltipProps = {
  /** 提示内容 */
  content: defaultProps("content", { type: String }),
  /** 弹出位置 */
  placement: defaultProps("placement", { type: String as PropType<TooltipPlacement> }),
  /** 触发方式（MP 仅 click 生效） */
  trigger: defaultProps("trigger", { type: String as PropType<TooltipTrigger> }),
  /** 显示状态（v-model:visible） */
  visible: defaultProps("visible", { type: Boolean }),
  /** 禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 偏移量（px） */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 显示箭头 */
  showArrow: defaultProps("showArrow", { type: Boolean }),
  /** 点击外部自动关闭 */
  closeOnClickOutside: defaultProps("closeOnClickOutside", { type: Boolean }),
  /** 背景色 */
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
  "update:visible": (_visible: boolean) => true,
  open: () => true,
  close: () => true,
}

export type TooltipEmits = typeof tooltipEmits
export type TooltipProps = ExtractPropTypes<typeof tooltipProps>
export type TooltipInstance = InstanceType<typeof Tooltip>
