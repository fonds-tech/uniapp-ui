import type Stepper from "./ui-stepper.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const stepperProps = {
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(0),
  /**
   * 最小值
   */
  min: makeNumericProp(0),
  /**
   * 最大值
   */
  max: makeNumericProp(Infinity),
  /**
   * 步长，每次点击时改变的值
   */
  step: makeNumericProp(1),
  /**
   * 标识符
   */
  name: makeNumericProp(""),
  /**
   * 尺寸
   */
  size: { type: String as PropType<StepperSize>, default: "medium" },
  /**
   * 高度（优先级高于 size）
   */
  height: makeNumericProp(""),
  /**
   * 主题样式
   */
  theme: { type: String as PropType<StepperTheme>, default: "button" },
  /**
   * 是否只能输入正整数
   */
  integer: Boolean,
  /**
   * 显示的小数位数
   */
  decimalLength: makeNumericProp(""),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否禁用增加按钮
   */
  disablePlus: Boolean,
  /**
   * 是否禁用减少按钮
   */
  disableMinus: Boolean,
  /**
   * 是否禁止输入框
   */
  disabledInput: Boolean,
  /**
   * 输入框左右间隙
   */
  inputGap: makeNumericProp(""),
  /**
   * 输入框宽度
   */
  inputWidth: makeNumericProp(""),
  /**
   * 输入框颜色
   */
  inputColor: makeStringProp(""),
  /**
   * 输入框文字大小
   */
  inputTextSize: makeNumericProp(""),
  /**
   * 输入框文字粗细
   */
  inputTextWeight: makeNumericProp(""),
  /**
   * 输入框文字颜色
   */
  inputTextColor: makeStringProp(""),
  /**
   * 减少按钮宽度
   */
  minusWidth: makeNumericProp(""),
  /**
   * 减少按钮颜色
   */
  minusColor: makeStringProp(""),
  /**
   * 减少按钮文字大小
   */
  minusTextSize: makeStringProp(""),
  /**
   * 减少按钮文字颜色
   */
  minusTextColor: makeStringProp("#333333"),
  /**
   * border主题下的边框颜色
   */
  minusBorderColor: makeStringProp(""),
  /**
   * 增加按钮宽度
   */
  plusWidth: makeNumericProp(""),
  /**
   * 增加按钮颜色
   */
  plusColor: makeStringProp(""),
  /**
   * 增加按钮文字大小
   */
  plusTextSize: makeStringProp(""),
  /**
   * 增加按钮文字颜色
   */
  plusTextColor: makeStringProp("#333333"),
  /**
   * border主题下的边框颜色
   */
  plusBorderColor: makeStringProp(""),
  /**
   * border主题下的边框颜色
   */
  borderColor: makeStringProp(""),
  /**
   * border主题下的边框宽度
   */
  borderWidth: makeNumericProp(""),
  /**
   * 是否显示增加按钮
   */
  showPlus: truthProp,
  /**
   * 是否显示减少按钮
   */
  showMinus: truthProp,
  /**
   * 是否显示输入框
   */
  showInput: truthProp,
  /**
   * 是否允许长按进行加减
   */
  longPress: Boolean,
  /**
   * 输入值变化前的回调函数
   */
  beforeChange: { type: Function },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const stepperEmits = {
  click: () => true,
  blur: (event: any) => true,
  focus: () => true,
  plus: () => true,
  minus: () => true,
  overlimit: (type: string) => true,
  change: (value: number | string, name: number | string) => true,
  "update:modelValue": (value: number | string) => true,
}

export type StepperEmits = typeof stepperEmits
export type StepperProps = ExtractPropTypes<typeof stepperProps>
export type StepperSize = "small" | "medium" | "large"
export type StepperTheme = "button" | "round" | "border"
export type StepperInstance = InstanceType<typeof Stepper>
