import type Checkbox from "./ui-checkbox.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [checkboxProps, useCheckboxProps] = createProps("checkbox", {
  /**
   * 绑定值
   */
  modelValue: Boolean,
  /**
   * 标识符，通常为一个唯一的字符串或数字
   */
  name: makeNumericProp(""),
  /**
   * 标签文本内容
   */
  label: makeNumericProp(""),
  /**
   * 是否与复选框组绑定
   */
  bindGroup: truthProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 图标名称
   */
  icon: makeStringProp("check"),
  /**
   * 形状，icon 或 dot
   */
  shape: makeStringProp("dot"),
  /**
   * 圆形的
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
  checkedIconColor: makeStringProp(""),
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
})
export const checkboxEmits = {
  click: (event: any) => true,
  change: (value: CheckboxValueType) => true,
  "update:modelValue": (value: CheckboxValueType) => true,
}

export type CheckboxValueType = string | number | boolean
export type CheckboxEmits = typeof checkboxEmits
export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
export interface CheckboxExpose {
  name: "ui-checkbox"
}
export type CheckboxInstance = InstanceType<typeof Checkbox>
