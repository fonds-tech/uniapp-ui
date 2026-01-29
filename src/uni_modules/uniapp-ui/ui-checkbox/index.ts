import type Checkbox from "./ui-checkbox.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 复选框形状类型
 */
export type CheckboxShape = "dot" | "icon" | ""

/**
 * 标签位置类型
 */
export type CheckboxLabelPosition = "left" | "right"

export const checkboxProps = {
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
   * 是否只读（可点击但不改变状态）
   */
  readonly: Boolean,

  // ============ 尺寸与形状 ============

  /**
   * 复选框图标大小，支持任意尺寸值如 "36rpx"、"20px"
   */
  size: makeNumericProp("36rpx"),
  /**
   * 形状：dot（圆点）或 icon（勾选图标）
   * 默认为 dot，作为项目特色保留
   */
  shape: makeStringProp<CheckboxShape>(""),
  /**
   * 是否圆形
   */
  round: truthProp,

  // ============ 状态 ============

  /**
   * 不确定状态（用于父子关系场景）
   */
  indeterminate: Boolean,

  // ============ 颜色配置（简化版） ============

  /**
   * 主色（选中状态的颜色，简化 API）
   * 同时影响图标边框色和背景色
   */
  color: makeStringProp(""),
  /**
   * @deprecated 使用 color 替代
   * 选中的颜色（向后兼容别名）
   */
  checkedColor: makeStringProp(""),
  /**
   * @deprecated 使用 color 替代
   * 选中时的图标颜色（向后兼容别名）
   */
  checkedIconColor: makeStringProp(""),

  // ============ 图标配置 ============

  /**
   * 图标名称（shape="icon" 时使用）
   */
  icon: makeStringProp("check"),
  /**
   * 图标大小（覆盖 size 预设）
   */
  iconSize: makeNumericProp(""),
  /**
   * 图标颜色（未选中状态）
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

  // ============ 标签配置 ============

  /**
   * 标签位置：left | right
   */
  labelPosition: makeStringProp<CheckboxLabelPosition>("right"),
  /**
   * 标签文本大小（覆盖 size 预设）
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
   * 是否禁用标签文本点击
   */
  labelDisabled: { type: Boolean },
  /**
   * 选中时的标签文本颜色
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
}
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
  /** 切换选中状态 */
  toggle: (check?: boolean) => void
  /** 当前是否选中 */
  checked: boolean
}
export type CheckboxInstance = InstanceType<typeof Checkbox>
