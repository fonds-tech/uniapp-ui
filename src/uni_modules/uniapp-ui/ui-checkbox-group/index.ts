import type CheckboxGroup from "./ui-checkbox-group.vue"
import type { CheckboxShape, CheckboxLabelPosition } from "../ui-checkbox"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const checkboxGroupKey: InjectionKey<CheckboxGroupProvide> = Symbol("ui-checkbox-group")

const defaultProps = buildDefaultProps("checkbox-group", {
  modelValue: () => [],
  max: Infinity,
  min: 0,
  gap: undefined,
  columns: undefined,
  vertical: false,
  disabled: false,
  size: undefined,
  shape: "dot" as CheckboxShape,
  round: true,
  color: undefined,
  icon: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconRadius: undefined,
  labelPosition: "right" as CheckboxLabelPosition,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  labelGap: undefined,
  labelDisabled: false,
  checkedLabelColor: undefined,
  customClass: undefined,
  customStyle: undefined,
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
  /** 网格列数，设置后启用 grid 布局 */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 是否垂直排列 */
  vertical: defaultProps("vertical", { type: Boolean }),
  /** 是否禁用整组 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 复选框尺寸（继承给子组件） */
  size: defaultProps("size", { type: [Number, String] }),
  /** 形状 */
  shape: defaultProps("shape", { type: String as PropType<CheckboxShape> }),
  /** 是否圆形 */
  round: defaultProps("round", { type: Boolean }),
  /** 选中态主色（继承给子组件） */
  color: defaultProps("color", { type: String }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 图标尺寸 */
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
  /** 是否禁用标签点击 */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /** 选中态标签颜色 */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const checkboxGroupEmits = {
  /** 值变化事件 */
  change: (value: unknown[]) => Array.isArray(value),
  /** 更新绑定值事件 */
  "update:modelValue": (value: unknown[]) => Array.isArray(value),
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
  /** 是否达到最小选择数量 */
  isAtMinimum: () => boolean
  /** 是否达到最大选择数量 */
  isAtMaximum: () => boolean
}

export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>
