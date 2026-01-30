import type Checkbox from "./ui-checkbox.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 复选框形状类型
 */
export type CheckboxShape = "dot" | "icon" | ""

/**
 * 标签位置类型
 */
export type CheckboxLabelPosition = "left" | "right"

const defaultProps = buildDefaultProps("checkbox", {
  modelValue: false,
  name: "",
  label: "",
  bindGroup: true,
  disabled: false,
  readonly: false,
  size: "36rpx",
  shape: "",
  round: true,
  indeterminate: false,
  color: "",
  checkedColor: "",
  checkedIconColor: "",
  icon: "check",
  iconSize: "",
  iconColor: "",
  iconWeight: "",
  iconRadius: "",
  labelPosition: "right",
  labelSize: "",
  labelColor: "",
  labelWeight: "",
  labelGap: "",
  labelDisabled: false,
  checkedLabelColor: "",
  customClass: "",
  customStyle: "",
})

export const checkboxProps = {
  /**
   * 绑定值
   */
  modelValue: defaultProps("modelValue", { type: Boolean }),
  /**
   * 标识符，通常为一个唯一的字符串或数字
   */
  name: defaultProps("name", { type: [Number, String] }),
  /**
   * 标签文本内容
   */
  label: defaultProps("label", { type: [Number, String] }),
  /**
   * 是否与复选框组绑定
   */
  bindGroup: defaultProps("bindGroup", { type: Boolean }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 是否只读（可点击但不改变状态）
   */
  readonly: defaultProps("readonly", { type: Boolean }),

  /**
   * 复选框图标大小，支持任意尺寸值如 "36rpx"、"20px"
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 形状：dot（圆点）或 icon（勾选图标）
   * 默认为 dot，作为项目特色保留
   */
  shape: defaultProps("shape", { type: String as PropType<CheckboxShape> }),
  /**
   * 是否圆形
   */
  round: defaultProps("round", { type: Boolean }),

  /**
   * 不确定状态（用于父子关系场景）
   */
  indeterminate: defaultProps("indeterminate", { type: Boolean }),

  /**
   * 主色（选中状态的颜色，简化 API）
   * 同时影响图标边框色和背景色
   */
  color: defaultProps("color", { type: String }),
  /**
   * @deprecated 使用 color 替代
   * 选中的颜色（向后兼容别名）
   */
  checkedColor: defaultProps("checkedColor", { type: String }),
  /**
   * @deprecated 使用 color 替代
   * 选中时的图标颜色（向后兼容别名）
   */
  checkedIconColor: defaultProps("checkedIconColor", { type: String }),

  /**
   * 图标名称（shape="icon" 时使用）
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 图标大小（覆盖 size 预设）
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 图标颜色（未选中状态）
   */
  iconColor: defaultProps("iconColor", { type: String }),
  /**
   * 图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 图标圆角值
   */
  iconRadius: defaultProps("iconRadius", { type: [Number, String] }),

  /**
   * 标签位置：left | right
   */
  labelPosition: defaultProps("labelPosition", { type: String as PropType<CheckboxLabelPosition> }),
  /**
   * 标签文本大小（覆盖 size 预设）
   */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /**
   * 标签文本颜色
   */
  labelColor: defaultProps("labelColor", { type: String }),
  /**
   * 标签文本粗细
   */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /**
   * 标签文本与图标的间距
   */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /**
   * 是否禁用标签文本点击
   */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /**
   * 选中时的标签文本颜色
   */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),

  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
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
