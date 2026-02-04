import type Circle from "./ui-circle.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 进度条端点样式 */
export type CircleStrokeLinecap = "round" | "butt" | "square"

/** 起始位置 */
export type CircleStartPosition = "top" | "right" | "bottom" | "left"

/** 渐变颜色配置 */
export type CircleGradientColor = Record<string, string>

/** 颜色类型：支持字符串或渐变对象 */
export type CircleColor = string | CircleGradientColor

const defaultProps = buildDefaultProps("circle", {
  modelValue: 0,
  rate: 100,
  size: "200rpx",
  color: "",
  layerColor: "",
  fill: "transparent",
  speed: 50,
  text: "",
  strokeWidth: "8rpx",
  strokeLinecap: "round",
  clockwise: true,
  startPosition: "top",
  customClass: "",
  customStyle: undefined,
})

export const circleProps = {
  /** 当前进度（0-100），支持 v-model */
  modelValue: defaultProps("modelValue", { type: Number }),
  /** 目标进度（0-100） */
  rate: defaultProps("rate", { type: Number }),
  /** 圆环直径 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 进度条颜色，支持字符串或渐变对象 { '0%': '#3fecff', '100%': '#6149f6' } */
  color: defaultProps("color", { type: [String, Object] as PropType<CircleColor> }),
  /** 轨道颜色 */
  layerColor: defaultProps("layerColor", { type: String }),
  /** 填充颜色 */
  fill: defaultProps("fill", { type: String }),
  /** 动画速度（每秒增加的进度） */
  speed: defaultProps("speed", { type: Number }),
  /** 文字内容 */
  text: defaultProps("text", { type: String }),
  /** 进度条宽度 */
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
  /** 更新当前进度 */
  "update:modelValue": (value: number) => typeof value === "number",
  /** 进度动画完成事件 */
  finish: () => true,
}

export type CircleEmits = typeof circleEmits
export type CircleProps = ExtractPropTypes<typeof circleProps>

export interface CircleExpose {
  name: "ui-circle"
}

export type CircleInstance = InstanceType<typeof Circle>
