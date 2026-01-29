import type Slider from "./ui-slider.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

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

export const sliderProps = {
  /**
   * 绑定值，支持单值或范围值
   */
  modelValue: {
    type: [Number, Array] as PropType<SliderValue>,
    default: 0,
  },
  /**
   * 最小值
   */
  min: makeNumberProp(0),
  /**
   * 最大值
   */
  max: makeNumberProp(100),
  /**
   * 步长，取值必须大于 0，并且可被 (max - min) 整除
   */
  step: makeNumberProp(1),
  /**
   * 是否为范围选择（双滑块模式）
   */
  range: Boolean,
  /**
   * 是否垂直方向展示
   */
  vertical: Boolean,
  /**
   * 是否禁用滑块
   */
  disabled: Boolean,
  /**
   * 是否只读（可查看但不可修改）
   */
  readonly: Boolean,
  /**
   * 是否显示当前值提示
   */
  showValue: truthProp,
  /**
   * 值提示显示模式
   * always: 始终显示
   * dragging: 拖动时显示
   * never: 不显示
   */
  showValueMode: {
    type: String as PropType<SliderShowValueMode>,
    default: "dragging",
  },
  /**
   * 滑块尺寸预设
   * small: 轨道 4px，把手 20px
   * medium: 轨道 6px，把手 28px（默认）
   * large: 轨道 8px，把手 36px
   */
  size: {
    type: String as PropType<SliderSize>,
    default: "medium",
  },
  /**
   * 刻度标记，key 为刻度值，value 为标签内容
   */
  marks: {
    type: Object as PropType<SliderMarks>,
    default: undefined,
  },
  /**
   * 轨道高度（水平模式）或宽度（垂直模式）
   * 传入具体值时会覆盖 size 预设
   */
  barHeight: makeNumericProp(""),
  /**
   * 滑块把手尺寸
   * 传入具体值时会覆盖 size 预设
   */
  handleSize: makeNumericProp(""),
  /**
   * 激活状态轨道颜色
   */
  activeColor: makeStringProp(""),
  /**
   * 非激活状态轨道颜色
   */
  inactiveColor: makeStringProp(""),
  /**
   * 滑块把手颜色
   */
  handleColor: makeStringProp(""),
  /**
   * 格式化显示值的函数
   */
  formatValue: {
    type: Function as PropType<(value: number) => string>,
    default: undefined,
  },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
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
