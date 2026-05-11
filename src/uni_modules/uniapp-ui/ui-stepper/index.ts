import type Stepper from "./ui-stepper.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type StepperSize = "small" | "medium" | "large"
export type StepperTheme = "button" | "round" | "border"

/** beforeChange 拦截器：返回 boolean / Promise<boolean> 控制是否放行 */
export type StepperBeforeChange = (value: number | string, name: number | string | undefined) => boolean | Promise<boolean>

/** 长按触发起始延迟（ms） */
export const STEPPER_LONG_PRESS_START = 500
/** 长按持续间隔（ms） */
export const STEPPER_LONG_PRESS_INTERVAL = 200

const defaultProps = buildDefaultProps("stepper", {
  modelValue: 0,
  min: 0,
  max: Infinity,
  step: 1,
  name: undefined,
  size: "medium",
  height: undefined,
  theme: "button",
  integer: false,
  decimalLength: undefined,
  disabled: false,
  disablePlus: false,
  disableMinus: false,
  disabledInput: false,
  inputGap: undefined,
  inputWidth: undefined,
  inputColor: undefined,
  inputTextSize: undefined,
  inputTextWeight: undefined,
  inputTextColor: undefined,
  minusWidth: undefined,
  minusColor: undefined,
  minusBorderColor: undefined,
  plusWidth: undefined,
  plusColor: undefined,
  plusBorderColor: undefined,
  borderColor: undefined,
  borderWidth: undefined,
  showPlus: true,
  showMinus: true,
  showInput: true,
  longPress: false,
  beforeChange: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const stepperProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 最小值 */
  min: defaultProps("min", { type: [Number, String] }),
  /** 最大值 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 步长 */
  step: defaultProps("step", { type: [Number, String] }),
  /** 标识符（change 事件第二个参数） */
  name: defaultProps("name", { type: [Number, String] }),
  /** 尺寸预设（复合 height + button + input + font-size） */
  size: defaultProps("size", { type: String as PropType<StepperSize> }),
  /** 自定义高度，覆盖 size 预设 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 主题：button 块状 / round 圆角 / border 边框 */
  theme: defaultProps("theme", { type: String as PropType<StepperTheme> }),
  /** 仅允许正整数 */
  integer: defaultProps("integer", { type: Boolean }),
  /** 显示的小数位数 */
  decimalLength: defaultProps("decimalLength", { type: [Number, String] }),
  /** 禁用整个组件 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 仅禁用加号 */
  disablePlus: defaultProps("disablePlus", { type: Boolean }),
  /** 仅禁用减号 */
  disableMinus: defaultProps("disableMinus", { type: Boolean }),
  /** 禁用输入框输入 */
  disabledInput: defaultProps("disabledInput", { type: Boolean }),
  /** 输入框左右间隙 */
  inputGap: defaultProps("inputGap", { type: [Number, String] }),
  /** 输入框宽度 */
  inputWidth: defaultProps("inputWidth", { type: [Number, String] }),
  /** 输入框背景色 */
  inputColor: defaultProps("inputColor", { type: String }),
  /** 输入框文字大小 */
  inputTextSize: defaultProps("inputTextSize", { type: [Number, String] }),
  /** 输入框文字粗细 */
  inputTextWeight: defaultProps("inputTextWeight", { type: [Number, String] }),
  /** 输入框文字颜色 */
  inputTextColor: defaultProps("inputTextColor", { type: String }),
  /** 减号宽度 */
  minusWidth: defaultProps("minusWidth", { type: [Number, String] }),
  /** 减号背景色 */
  minusColor: defaultProps("minusColor", { type: String }),
  /** 减号边框颜色（border 主题） */
  minusBorderColor: defaultProps("minusBorderColor", { type: String }),
  /** 加号宽度 */
  plusWidth: defaultProps("plusWidth", { type: [Number, String] }),
  /** 加号背景色 */
  plusColor: defaultProps("plusColor", { type: String }),
  /** 加号边框颜色（border 主题） */
  plusBorderColor: defaultProps("plusBorderColor", { type: String }),
  /** 外框颜色（border 主题） */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 外框宽度（border 主题） */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 显示加号 */
  showPlus: defaultProps("showPlus", { type: Boolean }),
  /** 显示减号 */
  showMinus: defaultProps("showMinus", { type: Boolean }),
  /** 显示输入框 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 长按连续加减 */
  longPress: defaultProps("longPress", { type: Boolean }),
  /** 值变化前拦截：返回 false / Promise<false> 取消变更 */
  beforeChange: defaultProps("beforeChange", { type: Function as PropType<StepperBeforeChange> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const stepperEmits = {
  click: () => true,
  blur: (_event: unknown) => true,
  focus: () => true,
  plus: () => true,
  minus: () => true,
  overlimit: (_type: "plus" | "minus") => true,
  change: (_value: number | string, _name: number | string | undefined) => true,
  "update:modelValue": (_value: number | string) => true,
}

export type StepperEmits = typeof stepperEmits
export type StepperProps = ExtractPropTypes<typeof stepperProps>
export type StepperInstance = InstanceType<typeof Stepper>
