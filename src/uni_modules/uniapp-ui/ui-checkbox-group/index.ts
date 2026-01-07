import type CheckboxGroup from "./ui-checkbox-group.vue"
import type { CheckboxShape, CheckboxLabelPosition } from "../ui-checkbox"
import type { PropType, InjectionKey, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const checkboxGroupKey: InjectionKey<CheckboxGroupProvide> = Symbol("ui-checkbox-group")

export const [checkboxGroupProps, useCheckboxGroupProps] = createProps("checkboxGroup", {
  /**
   * 绑定值
   */
  modelValue: { type: Array as PropType<unknown[]>, default: () => [] },

  // ============ 数量限制 ============

  /**
   * 最大可选数量
   */
  max: makeNumericProp(Infinity),
  /**
   * 最小可选数量（新增）
   * 设置后，当选中数量达到最小值时，无法继续取消选择
   */
  min: makeNumericProp(0),

  // ============ 布局 ============

  /**
   * 复选框之间的间距
   */
  gap: makeNumericProp(0),
  /**
   * 是否垂直布局
   */
  vertical: Boolean,

  // ============ 状态 ============

  /**
   * 是否禁用
   */
  disabled: Boolean,

  // ============ 尺寸与形状（继承给子组件） ============

  /**
   * 复选框图标大小（继承给子组件）
   */
  size: makeNumericProp("36rpx"),
  /**
   * 形状：dot（圆点）或 icon（勾选图标）
   */
  shape: makeStringProp<CheckboxShape>("dot"),
  /**
   * 是否圆形图标
   */
  round: Boolean,

  // ============ 颜色配置 ============

  /**
   * 主色（选中状态的颜色，继承给子组件）
   */
  color: makeStringProp(""),
  /**
   * @deprecated 使用 color 替代
   * 选中的颜色（向后兼容别名）
   */
  checkedColor: makeStringProp(""),
  /**
   * @deprecated 使用 color 替代
   * 选中的图标颜色（向后兼容别名）
   */
  checkedIconColor: makeStringProp(""),

  // ============ 图标配置 ============

  /**
   * 图标名称
   */
  icon: makeStringProp(""),
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

  // ============ 标签配置 ============

  /**
   * 标签位置
   */
  labelPosition: makeStringProp<CheckboxLabelPosition>("right"),
  /**
   * @deprecated 使用 labelPosition="left" 替代
   * 标签是否在图标左侧（向后兼容别名）
   */
  labelLeft: Boolean,
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
   * 是否禁用标签点击
   */
  labelDisabled: { type: Boolean },
  /**
   * 选中的标签颜色
   */
  checkedLabelColor: makeStringProp(""),

  // ============ 自定义样式 ============

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
  click: (event: any) => true,
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

export interface CheckboxGroupProvide {
  props: CheckboxGroupProps
  useProps: CheckboxGroupProps
  updateValue: (value: unknown[]) => void
}

export interface CheckboxGroupExpose {
  name: "ui-checkbox-group"
  /** 全选/全不选 */
  toggleAll: (checked?: boolean) => void
  /** 获取当前选中数量 */
  getCheckedCount: () => number
  /** 检查是否达到最小选择数量 */
  isAtMinimum: () => boolean
  /** 检查是否达到最大选择数量 */
  isAtMaximum: () => boolean
}

export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
