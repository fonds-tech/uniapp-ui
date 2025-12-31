import type CheckboxGroup from "./ui-checkbox-group.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const checkboxGroupKey = Symbol("ui-checkbox-group")
export const checkboxGroupProps = buildProps("checkboxGroup", {
  /**
   * 绑定值
   */
  modelValue: { type: Array as PropType<unknown[]>, default: () => [] },
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
  shape: makeStringProp("dot"),
  /**
   * 是否圆形图标
   */
  round: Boolean,
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
   * 图标前缀
   */
  iconPrefix: makeStringProp("ui-icon"),
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
  checkedIconColor: makeStringProp(""),
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
export const checkboxGroupEmits = {
  click: (evnet: any) => true,
  change: (value: unknown[]) => true,
  "update:modelValue": (value: unknown[]) => true,
}

export interface CheckboxGroupChildrenType {
  id: string
  name: number | string
  index: number
}
export type CheckboxGroupEmits = typeof checkboxGroupEmits
export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>
export interface CheckboxGroupExpose {
  name: "ui-checkbox-group"
  toggleAll: (value: unknown[]) => void
}
export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
