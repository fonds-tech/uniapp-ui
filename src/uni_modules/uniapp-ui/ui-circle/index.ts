import type Circle from "./ui-circle.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 进度条端点样式 */
export type CircleStrokeLinecap = "round" | "butt" | "square"

/** 起始位置 */
export type CircleStartPosition = "top" | "right" | "bottom" | "left"

/** 渐变颜色配置 */
export type CircleGradientColor = Record<string, string>

/** 颜色：纯色字符串 / token 名 / 渐变对象 */
export type CircleColor = string | CircleGradientColor

/** 文字内容：字符串覆盖 / false 隐藏 / undefined 默认显示百分比 */
export type CircleText = string | false

const defaultProps = buildDefaultProps("circle", {
  modelValue: 0,
  size: "200rpx",
  color: undefined,
  layerColor: undefined,
  fill: undefined,
  duration: 1000,
  animated: true,
  text: undefined,
  textSize: undefined,
  textColor: undefined,
  strokeWidth: undefined,
  strokeLinecap: "round" as CircleStrokeLinecap,
  clockwise: true,
  startPosition: "top" as CircleStartPosition,
  customClass: undefined,
  customStyle: undefined,
})

export const circleProps = {
  /** 当前进度（0-100）。组件内部会从旧值动画过渡到新值 */
  modelValue: defaultProps("modelValue", { type: Number }),
  /** 圆环直径 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 进度条颜色：字符串 / token / 渐变对象 `{ '0%': '#3fecff', '100%': '#6149f6' }` */
  color: defaultProps("color", { type: [String, Object] as PropType<CircleColor> }),
  /** 轨道颜色 */
  layerColor: defaultProps("layerColor", { type: String }),
  /** 中心填充色，默认透明 */
  fill: defaultProps("fill", { type: String }),
  /** 动画时长（ms） */
  duration: defaultProps("duration", { type: [Number, String] }),
  /** 是否启用进度过渡动画 */
  animated: defaultProps("animated", { type: Boolean }),
  /** 文字内容：字符串覆盖 / false 隐藏 / 不传则显示百分比 */
  text: defaultProps("text", { type: [String, Boolean] as PropType<CircleText> }),
  /** 文字大小，未传时按 size 比例自适应 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 进度条宽度，未传时按 size 比例自适应（size/20） */
  strokeWidth: defaultProps("strokeWidth", { type: [Number, String] }),
  /** 进度条端点样式 */
  strokeLinecap: defaultProps("strokeLinecap", { type: String as PropType<CircleStrokeLinecap> }),
  /** 是否顺时针 */
  clockwise: defaultProps("clockwise", { type: Boolean }),
  /** 起始位置 */
  startPosition: defaultProps("startPosition", { type: String as PropType<CircleStartPosition> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const circleEmits = {
  /** 进度动画完成事件 */
  finish: () => true,
}

export type CircleEmits = typeof circleEmits
export type CircleProps = ExtractPropTypes<typeof circleProps>

export interface CircleExpose {
  name: "ui-circle"
}

export type CircleInstance = InstanceType<typeof Circle>
