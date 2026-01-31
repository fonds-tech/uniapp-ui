import type RadioGroup from "./ui-radio-group.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"
import { isNumber, isString } from "../utils/check"

export const radioGroupKey: InjectionKey<RadioGroupProvide> = Symbol("ui-radio-group")

const defaultProps = buildDefaultProps("radio-group", {
  modelValue: "",
  gap: 0,
  columns: "",
  disabled: false,
  icon: "",
  shape: "dot",
  round: true,
  checkedColor: "",
  iconSize: "36rpx",
  iconColor: "",
  iconWeight: "",
  iconRadius: "",
  labelSize: "",
  labelColor: "",
  labelWeight: "",
  labelGap: "",
  labelLeft: false,
  labelDisabled: false,
  checkedIconColor: "primary",
  checkedLabelColor: "",
  customClass: "",
  customStyle: "",
})

export const radioGroupProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 单选框之间的间距 */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 网格布局列数，设置后启用 grid 布局 */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 形状，icon 或 dot */
  shape: defaultProps("shape", { type: String }),
  /** 是否圆形图标 */
  round: defaultProps("round", { type: Boolean }),
  /** 选中的颜色 */
  checkedColor: defaultProps("checkedColor", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 图标圆角值 */
  iconRadius: defaultProps("iconRadius", { type: [Number, String] }),
  /** 标签文本大小 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 标签文本颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 标签文本粗细 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 标签与图标的间距 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 标签是否在图标左侧 */
  labelLeft: defaultProps("labelLeft", { type: Boolean }),
  /** 是否禁用标签点击 */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /** 选中的图标颜色 */
  checkedIconColor: defaultProps("checkedIconColor", { type: String }),
  /** 选中的标签颜色 */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const radioGroupEmits = {
  /** 点击事件 */
  click: () => true,
  /** 值变化事件 */
  change: (value: string | number) => isString(value) || isNumber(value),
  /** 更新绑定值事件 */
  "update:modelValue": (value: string | number) => isString(value) || isNumber(value),
}

export type RadioGroupValueType = string | number

export interface RadioGroupChildrenType {
  id: string
  name: number | string
  index: number
}

export type RadioGroupEmits = typeof radioGroupEmits
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export interface RadioGroupProvide {
  props: RadioGroupProps
  updateValue: (value: RadioGroupValueType) => void
}

export type RadioGroupInstance = InstanceType<typeof RadioGroup>
