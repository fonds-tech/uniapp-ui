import type RadioGroup from "./ui-radio-group.vue"
import type { RadioShape, RadioLabelPosition } from "../ui-radio"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"
import { isNumber, isString } from "../utils/check"

export const radioGroupKey: InjectionKey<RadioGroupProvide> = Symbol("ui-radio-group")

const defaultProps = buildDefaultProps("radio-group", {
  modelValue: undefined,
  gap: undefined,
  columns: undefined,
  vertical: false,
  disabled: false,
  size: undefined,
  shape: "dot" as RadioShape,
  round: true,
  color: undefined,
  icon: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconRadius: undefined,
  labelPosition: "right" as RadioLabelPosition,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  labelGap: undefined,
  labelDisabled: false,
  checkedLabelColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const radioGroupProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: [Number, String] }),
  /** 单选框之间的间距 */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 网格列数（启用 grid，与 vertical 互斥） */
  columns: defaultProps("columns", { type: [Number, String] }),
  /** 垂直排列（与 columns 互斥） */
  vertical: defaultProps("vertical", { type: Boolean }),
  /** 整组禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 单选框尺寸（继承给子组件） */
  size: defaultProps("size", { type: [Number, String] }),
  /** 形状 */
  shape: defaultProps("shape", { type: String as PropType<RadioShape> }),
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
  labelPosition: defaultProps("labelPosition", { type: String as PropType<RadioLabelPosition> }),
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

export const radioGroupEmits = {
  /** 值变化事件 */
  change: (value: RadioGroupValueType) => isString(value) || isNumber(value),
  /** 更新绑定值事件 */
  "update:modelValue": (value: RadioGroupValueType) => isString(value) || isNumber(value),
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
