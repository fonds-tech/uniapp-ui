import type CheckboxGroup from "./ui-checkbox-group.vue"
import type { CheckboxShape, CheckboxLabelPosition } from "../ui-checkbox"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const checkboxGroupKey: InjectionKey<CheckboxGroupProvide> = Symbol("ui-checkbox-group")

const defaultProps = buildDefaultProps("checkbox-group", {
  modelValue: () => [],
  max: Infinity,
  min: 0,
  gap: 0,
  columns: "",
  disabled: false,
  size: "36rpx",
  shape: "dot",
  round: false,
  color: "",
  checkedColor: "",
  checkedIconColor: "",
  icon: "",
  iconSize: "",
  iconColor: "",
  iconWeight: "",
  iconRadius: "",
  iconPrefix: "ui-icon",
  labelPosition: "right",
  labelLeft: false,
  labelSize: "",
  labelColor: "",
  labelWeight: "",
  labelGap: "",
  labelDisabled: false,
  checkedLabelColor: "",
  customClass: "",
  customStyle: "",
})

export const checkboxGroupProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: Array as PropType<unknown[]> }),
  /** 最大可选数量 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 最小可选数量，达到最小值时无法取消选择 */
  min: defaultProps("min", { type: [Number, String] }),
  /** 复选框之间的间距 */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 网格布局列数，设置后启用 grid 布局 */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 复选框图标大小（继承给子组件） */
  size: defaultProps("size", { type: [Number, String] }),
  /** 形状：dot（圆点）或 icon（勾选图标） */
  shape: defaultProps("shape", { type: String as PropType<CheckboxShape> }),
  /** 是否圆形图标 */
  round: defaultProps("round", { type: Boolean }),
  /** 主色（选中状态的颜色，继承给子组件） */
  color: defaultProps("color", { type: String }),
  /** @deprecated 使用 color 替代，选中的颜色 */
  checkedColor: defaultProps("checkedColor", { type: String }),
  /** @deprecated 使用 color 替代，选中的图标颜色 */
  checkedIconColor: defaultProps("checkedIconColor", { type: String }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 图标圆角值 */
  iconRadius: defaultProps("iconRadius", { type: [Number, String] }),
  /** 图标前缀 */
  iconPrefix: defaultProps("iconPrefix", { type: String }),
  /** 标签位置 */
  labelPosition: defaultProps("labelPosition", { type: String as PropType<CheckboxLabelPosition> }),
  /** @deprecated 使用 labelPosition="left" 替代 */
  labelLeft: defaultProps("labelLeft", { type: Boolean }),
  /** 标签文本大小 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 标签文本颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 标签文本粗细 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 标签与图标的间距 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 是否禁用标签点击 */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /** 选中的标签颜色 */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const checkboxGroupEmits = {
  /** 点击事件 */
  click: (event: any) => true,
  /** 值变化事件 */
  change: (value: unknown[]) => true,
  /** 更新绑定值事件 */
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
