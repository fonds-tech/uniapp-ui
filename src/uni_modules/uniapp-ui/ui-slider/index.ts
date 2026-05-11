import type Slider from "./ui-slider.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 滑块刻度标记配置 */
export type SliderMarks = Record<number, string | { label: string; style?: Record<string, string> }>

/** 滑块值类型：单滑块为 number，双滑块为 [number, number] */
export type SliderValue = number | [number, number]

/** 值提示显示模式 */
export type SliderShowValueMode = "always" | "dragging" | "never"

/** 滑块尺寸预设（复合调整 track/handle 视觉尺寸） */
export type SliderSize = "small" | "medium" | "large"

/** a11y 最小触摸区域（px） */
export const SLIDER_MIN_TOUCH_SIZE = 44

const defaultProps = buildDefaultProps("slider", {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  range: false,
  vertical: false,
  disabled: false,
  readonly: false,
  showValue: true,
  showValueMode: "dragging",
  size: "medium",
  marks: undefined,
  barHeight: undefined,
  handleSize: undefined,
  activeColor: undefined,
  inactiveColor: undefined,
  handleColor: undefined,
  formatValue: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const sliderProps = {
  /** 绑定值，支持单值或范围值 */
  modelValue: defaultProps("modelValue", { type: [Number, Array] as PropType<SliderValue> }),
  /** 最小值 */
  min: defaultProps("min", { type: Number }),
  /** 最大值 */
  max: defaultProps("max", { type: Number }),
  /** 步长，必须大于 0 */
  step: defaultProps("step", { type: Number }),
  /** 是否为范围选择（双滑块模式） */
  range: defaultProps("range", { type: Boolean }),
  /** 是否垂直方向展示 */
  vertical: defaultProps("vertical", { type: Boolean }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否显示当前值提示 */
  showValue: defaultProps("showValue", { type: Boolean }),
  /** 值提示显示模式 */
  showValueMode: defaultProps("showValueMode", { type: String as PropType<SliderShowValueMode> }),
  /** 尺寸预设（复合 track + handle） */
  size: defaultProps("size", { type: String as PropType<SliderSize> }),
  /** 刻度标记，key 为刻度值，value 为标签或带样式对象 */
  marks: defaultProps("marks", { type: Object as PropType<SliderMarks> }),
  /** 轨道高度（水平）/ 宽度（垂直）；未传走 size 预设 */
  barHeight: defaultProps("barHeight", { type: [Number, String] }),
  /** 把手尺寸；未传走 size 预设 */
  handleSize: defaultProps("handleSize", { type: [Number, String] }),
  /** 激活轨道颜色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 非激活轨道颜色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 把手颜色 */
  handleColor: defaultProps("handleColor", { type: String }),
  /** 格式化显示值的函数 */
  formatValue: defaultProps("formatValue", { type: Function as PropType<(value: number) => string> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const sliderEmits = {
  /** 拖动过程中触发 */
  change: (_value: SliderValue) => true,
  /** 拖动结束后 / 点击轨道后触发 */
  "update:modelValue": (_value: SliderValue) => true,
  /** 开始拖动 */
  dragStart: (_value: SliderValue, _index: number) => true,
  /** 拖动结束 */
  dragEnd: (_value: SliderValue, _index: number) => true,
}

export type SliderEmits = typeof sliderEmits
export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderInstance = InstanceType<typeof Slider>
