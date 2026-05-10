import type Checkbox from "./ui-checkbox.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 复选框形状 */
export type CheckboxShape = "dot" | "icon"

/** 标签位置 */
export type CheckboxLabelPosition = "left" | "right"

const defaultProps = buildDefaultProps("checkbox", {
  modelValue: false,
  name: undefined,
  label: undefined,
  bindGroup: true,
  disabled: false,
  readonly: false,
  size: undefined,
  shape: undefined as CheckboxShape | undefined,
  round: true,
  indeterminate: false,
  color: undefined,
  icon: "check",
  iconSize: undefined,
  iconColor: undefined,
  iconRadius: undefined,
  labelPosition: undefined as CheckboxLabelPosition | undefined,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  labelGap: undefined,
  labelDisabled: false,
  checkedLabelColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const checkboxProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: Boolean }),
  /** 标识符（在 group 中作为选项 key） */
  name: defaultProps("name", { type: [Number, String] }),
  /** 标签文本 */
  label: defaultProps("label", { type: [Number, String] }),
  /** 是否与复选框组绑定 */
  bindGroup: defaultProps("bindGroup", { type: Boolean }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读（可见但不可改） */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 复选框尺寸（图标尺寸的快捷别名） */
  size: defaultProps("size", { type: [Number, String] }),
  /** 形状 */
  shape: defaultProps("shape", { type: String as PropType<CheckboxShape> }),
  /** 是否圆形 */
  round: defaultProps("round", { type: Boolean }),
  /** 不确定状态（用于全选父项的中间态） */
  indeterminate: defaultProps("indeterminate", { type: Boolean }),
  /** 选中态主色 */
  color: defaultProps("color", { type: String }),
  /** 图标名称（shape="icon" 时使用） */
  icon: defaultProps("icon", { type: String }),
  /** 图标尺寸（覆盖 size） */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 未选态边框颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标圆角 */
  iconRadius: defaultProps("iconRadius", { type: [Number, String] }),
  /** 标签位置 */
  labelPosition: defaultProps("labelPosition", { type: String as PropType<CheckboxLabelPosition> }),
  /** 标签字号 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 标签颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 标签字重 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 标签与图标的间距 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 是否禁用标签点击切换 */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /** 选中态标签颜色 */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const checkboxEmits = {
  /** 点击事件 */
  click: (event: Event) => event ?? true,
  /** 值变化事件 */
  change: (value: CheckboxValueType) => value !== undefined,
  /** 更新绑定值事件 */
  "update:modelValue": (value: CheckboxValueType) => value !== undefined,
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
