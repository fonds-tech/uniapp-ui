import type RadioGroup from "./ui-radio-group.vue"
import type { ExtractPropTypes } from "vue"
import { isString, isBoolean } from "../utils/check"
import { styleProp, truthProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const radioGroupKey = Symbol("ui-radio-group")
export const radioGroupProps = buildProps("radioGroup", {
  /**
   * 绑定值
   */
  modelValue: makeNumericProp(""),
  /**
   * 最大可选数量
   */
  max: makeNumericProp(Infinity),
  /**
   * 复选框之间的间距
   */
  gap: makeNumericProp(0),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否垂直布局
   */
  vertical: Boolean,
  /**
   * 图标名称
   */
  icon: makeStringProp(""),
  /**
   * 形状，icon 或 dot
   */
  shape: makeStringProp("icon"),
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
  iconSize: makeNumericProp("28rpx"),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp("#BFBFBF"),
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
   * 标签与图标的间距
   */
  labelGap: makeNumericProp(""),
  /**
   * 标签是否在图标左侧
   */
  labelLeft: Boolean,
  /**
   * 是否禁用标签点击
   */
  labelDisabled: { type: Boolean },
  /**
   * 选中的图标颜色
   */
  checkedIconColor: makeStringProp("primary"),
  /**
   * 选中的标签颜色
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
export const radioGroupEmits = {
  click: () => true,
  change: (value: string | number) => isBoolean(value) || isString(value),
  "update:modelValue": (value: string | number) => isBoolean(value) || isString(value),
}

export type RadioGroupValueType = string | number
export interface RadioGroupChildrenType {
  id: string
  name: number | string
  index: number
}
export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>
export type RadioGroupInstance = InstanceType<typeof RadioGroup>
