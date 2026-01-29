import type Radio from "./ui-radio.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const radioProps = {
  /**
   * 标识符，通常为一个唯一的字符串或数字
   */
  name: { type: [Number, String], required: true, default: "" },
  /**
   * 当前选中的值（独立使用时）
   */
  modelValue: { type: [Number, String, Boolean], default: "" },
  /**
   * 标签文本内容
   */
  label: makeNumericProp(""),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否只读
   */
  readonly: Boolean,
  /**
   * 是否与 radio-group 绑定
   */
  bindGroup: truthProp,
  /**
   * 图标名称
   */
  icon: makeStringProp("check"),
  /**
   * 形状，icon 或 dot
   */
  shape: makeStringProp(""),
  /**
   * 是否圆形图标
   */
  round: truthProp,
  /**
   * 选中的颜色
   */
  checkedColor: makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp(""),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 图标圆角值
   */
  iconRadius: makeNumericProp(""),
  /**
   * 标签文本大小
   */
  labelSize: makeNumericProp(""),
  /**
   * 标签文本颜色
   */
  labelColor: makeStringProp(""),
  /**
   * 标签文本粗细
   */
  labelWeight: makeNumericProp(""),
  /**
   * 标签文本与图标的间距
   */
  labelGap: makeNumericProp(""),
  /**
   * 标签文本是否在图标左侧
   */
  labelLeft: Boolean,
  /**
   * 是否禁用标签文本点击
   */
  labelDisabled: { type: Boolean },
  /**
   * 选中时的图标颜色
   */
  checkedIconColor: makeStringProp("primary"),
  /**
   * 选中时的标签文本颜色
   */
  checkedLabelColor: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const radioEmits = {
  click: () => true,
  change: (value: RadioValueType) => true,
  "update:modelValue": (value: RadioValueType) => true,
}

export type RadioValueType = string | number | boolean
export type RadioNameType = string | number
export type RadioEmits = typeof radioEmits
export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioInstance = InstanceType<typeof Radio>
