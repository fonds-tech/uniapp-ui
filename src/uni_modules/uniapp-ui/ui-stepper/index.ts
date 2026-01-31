import type Stepper from "./ui-stepper.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("stepper", {
  modelValue: 0,
  min: 0,
  max: Infinity,
  step: 1,
  name: "",
  size: "medium",
  height: "",
  theme: "button",
  integer: false,
  decimalLength: "",
  disabled: false,
  disablePlus: false,
  disableMinus: false,
  disabledInput: false,
  inputGap: "",
  inputWidth: "",
  inputColor: "",
  inputTextSize: "",
  inputTextWeight: "",
  inputTextColor: "",
  minusWidth: "",
  minusColor: "",
  minusTextSize: "",
  minusTextColor: "#333333",
  minusBorderColor: "",
  plusWidth: "",
  plusColor: "",
  plusTextSize: "",
  plusTextColor: "#333333",
  plusBorderColor: "",
  borderColor: "",
  borderWidth: "",
  showPlus: true,
  showMinus: true,
  showInput: true,
  longPress: false,
  beforeChange: undefined,
  customClass: "",
  customStyle: "",
})

export const stepperProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 最小值 */
  min: defaultProps("min", { type: [Number, String] }),
  /** 最大值 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 步长，每次点击时改变的值 */
  step: defaultProps("step", { type: [Number, String] }),
  /** 标识符 */
  name: defaultProps("name", { type: [Number, String] }),
  /** 尺寸 */
  size: defaultProps("size", { type: String as PropType<StepperSize> }),
  /** 高度（优先级高于 size） */
  height: defaultProps("height", { type: [Number, String] }),
  /** 主题样式 */
  theme: defaultProps("theme", { type: String as PropType<StepperTheme> }),
  /** 是否只能输入正整数 */
  integer: defaultProps("integer", { type: Boolean }),
  /** 显示的小数位数 */
  decimalLength: defaultProps("decimalLength", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否禁用增加按钮 */
  disablePlus: defaultProps("disablePlus", { type: Boolean }),
  /** 是否禁用减少按钮 */
  disableMinus: defaultProps("disableMinus", { type: Boolean }),
  /** 是否禁止输入框 */
  disabledInput: defaultProps("disabledInput", { type: Boolean }),
  /** 输入框左右间隙 */
  inputGap: defaultProps("inputGap", { type: [Number, String] }),
  /** 输入框宽度 */
  inputWidth: defaultProps("inputWidth", { type: [Number, String] }),
  /** 输入框颜色 */
  inputColor: defaultProps("inputColor", { type: String }),
  /** 输入框文字大小 */
  inputTextSize: defaultProps("inputTextSize", { type: [Number, String] }),
  /** 输入框文字粗细 */
  inputTextWeight: defaultProps("inputTextWeight", { type: [Number, String] }),
  /** 输入框文字颜色 */
  inputTextColor: defaultProps("inputTextColor", { type: String }),
  /** 减少按钮宽度 */
  minusWidth: defaultProps("minusWidth", { type: [Number, String] }),
  /** 减少按钮颜色 */
  minusColor: defaultProps("minusColor", { type: String }),
  /** 减少按钮文字大小 */
  minusTextSize: defaultProps("minusTextSize", { type: String }),
  /** 减少按钮文字颜色 */
  minusTextColor: defaultProps("minusTextColor", { type: String }),
  /** border主题下减少按钮边框颜色 */
  minusBorderColor: defaultProps("minusBorderColor", { type: String }),
  /** 增加按钮宽度 */
  plusWidth: defaultProps("plusWidth", { type: [Number, String] }),
  /** 增加按钮颜色 */
  plusColor: defaultProps("plusColor", { type: String }),
  /** 增加按钮文字大小 */
  plusTextSize: defaultProps("plusTextSize", { type: String }),
  /** 增加按钮文字颜色 */
  plusTextColor: defaultProps("plusTextColor", { type: String }),
  /** border主题下增加按钮边框颜色 */
  plusBorderColor: defaultProps("plusBorderColor", { type: String }),
  /** border主题下的边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** border主题下的边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 是否显示增加按钮 */
  showPlus: defaultProps("showPlus", { type: Boolean }),
  /** 是否显示减少按钮 */
  showMinus: defaultProps("showMinus", { type: Boolean }),
  /** 是否显示输入框 */
  showInput: defaultProps("showInput", { type: Boolean }),
  /** 是否允许长按进行加减 */
  longPress: defaultProps("longPress", { type: Boolean }),
  /** 输入值变化前的回调函数 */
  beforeChange: defaultProps("beforeChange", { type: Function }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const stepperEmits = {
  /** 点击事件 */
  click: () => true,
  /** 失焦事件 */
  blur: (event: any) => true,
  /** 聚焦事件 */
  focus: () => true,
  /** 增加按钮点击事件 */
  plus: () => true,
  /** 减少按钮点击事件 */
  minus: () => true,
  /** 超出范围事件 */
  overlimit: (type: string) => true,
  /** 值变化事件 */
  change: (value: number | string, name: number | string) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: number | string) => true,
}

export type StepperEmits = typeof stepperEmits
export type StepperProps = ExtractPropTypes<typeof stepperProps>
export type StepperSize = "small" | "medium" | "large"
export type StepperTheme = "button" | "round" | "border"
export type StepperInstance = InstanceType<typeof Stepper>
