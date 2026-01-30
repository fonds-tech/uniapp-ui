import type Slider from "./ui-slider.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 滑块刻度标记配置
 * key: 刻度位置（0-100 对应 min-max）
 * value: 刻度标签文本或配置对象
 */
export type SliderMarks = Record<number, string | { label: string; style?: Record<string, string> }>

/**
 * 滑块值类型
 * 单滑块: number
 * 双滑块（范围选择）: [number, number]
 */
export type SliderValue = number | [number, number]

/**
 * 值提示显示模式
 * always: 始终显示
 * dragging: 拖动时显示
 * never: 不显示
 */
export type SliderShowValueMode = "always" | "dragging" | "never"

/**
 * 滑块尺寸预设
 * small: 小尺寸（适合紧凑布局）
 * medium: 中等尺寸（默认，适合大多数场景）
 * large: 大尺寸（适合需要强调的场景）
 */
export type SliderSize = "small" | "medium" | "large"

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
  barHeight: "",
  handleSize: "",
  activeColor: "",
  inactiveColor: "",
  handleColor: "",
  formatValue: undefined,
  customClass: "",
  customStyle: "",
})

export const sliderProps = {
  /**
   * 绑定值，支持单值或范围值
   */
  modelValue: defaultProps("modelValue", { type: [Number, Array] as PropType<SliderValue> }),
  /**
   * 最小值
   */
  min: defaultProps("min", { type: Number }),
  /**
   * 最大值
   */
  max: defaultProps("max", { type: Number }),
  /**
   * 步长，取值必须大于 0，并且可被 (max - min) 整除
   */
  step: defaultProps("step", { type: Number }),
  /**
   * 是否为范围选择（双滑块模式）
   */
  range: defaultProps("range", { type: Boolean }),
  /**
   * 是否垂直方向展示
   */
  vertical: defaultProps("vertical", { type: Boolean }),
  /**
   * 是否禁用滑块
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 是否只读（可查看但不可修改）
   */
  readonly: defaultProps("readonly", { type: Boolean }),
  /**
   * 是否显示当前值提示
   */
  showValue: defaultProps("showValue", { type: Boolean }),
  /**
   * 值提示显示模式
   * always: 始终显示
   * dragging: 拖动时显示
   * never: 不显示
   */
  showValueMode: defaultProps("showValueMode", { type: String as PropType<SliderShowValueMode> }),
  /**
   * 滑块尺寸预设
   * small: 轨道 4px，把手 20px
   * medium: 轨道 6px，把手 28px（默认）
   * large: 轨道 8px，把手 36px
   */
  size: defaultProps("size", { type: String as PropType<SliderSize> }),
  /**
   * 刻度标记，key 为刻度值，value 为标签内容
   */
  marks: defaultProps("marks", { type: Object as PropType<SliderMarks> }),
  /**
   * 轨道高度（水平模式）或宽度（垂直模式）
   * 传入具体值时会覆盖 size 预设
   */
  barHeight: defaultProps("barHeight", { type: [Number, String] }),
  /**
   * 滑块把手尺寸
   * 传入具体值时会覆盖 size 预设
   */
  handleSize: defaultProps("handleSize", { type: [Number, String] }),
  /**
   * 激活状态轨道颜色
   */
  activeColor: defaultProps("activeColor", { type: String }),
  /**
   * 非激活状态轨道颜色
   */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /**
   * 滑块把手颜色
   */
  handleColor: defaultProps("handleColor", { type: String }),
  /**
   * 格式化显示值的函数
   */
  formatValue: defaultProps("formatValue", { type: Function as PropType<(value: number) => string> }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const sliderEmits = {
  /**
   * 值变化时触发（拖动过程中）
   */
  change: (value: SliderValue) => true,
  /**
   * 值变化完成时触发（拖动结束后）
   */
  "update:modelValue": (value: SliderValue) => true,
  /**
   * 开始拖动时触发
   */
  dragStart: (value: SliderValue, index: number) => true,
  /**
   * 拖动结束时触发
   */
  dragEnd: (value: SliderValue, index: number) => true,
}

export type SliderEmits = typeof sliderEmits
export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderInstance = InstanceType<typeof Slider>
