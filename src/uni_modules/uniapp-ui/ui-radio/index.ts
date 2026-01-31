import type Radio from "./ui-radio.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("radio", {
  name: "",
  modelValue: "",
  label: "",
  disabled: false,
  readonly: false,
  bindGroup: true,
  icon: "check",
  shape: "",
  round: true,
  checkedColor: "",
  iconSize: "",
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

export const radioProps = {
  /** 标识符，通常为一个唯一的字符串或数字 */
  name: defaultProps("name", { type: [Number, String], required: true }),
  /** 当前选中的值（独立使用时） */
  modelValue: defaultProps("modelValue", { type: [Number, String, Boolean] }),
  /** 标签文本内容 */
  label: defaultProps("label", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否与 radio-group 绑定 */
  bindGroup: defaultProps("bindGroup", { type: Boolean }),
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
  /** 标签文本与图标的间距 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 标签文本是否在图标左侧 */
  labelLeft: defaultProps("labelLeft", { type: Boolean }),
  /** 是否禁用标签文本点击 */
  labelDisabled: defaultProps("labelDisabled", { type: Boolean }),
  /** 选中时的图标颜色 */
  checkedIconColor: defaultProps("checkedIconColor", { type: String }),
  /** 选中时的标签文本颜色 */
  checkedLabelColor: defaultProps("checkedLabelColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const radioEmits = {
  /** 点击事件 */
  click: () => true,
  /** 值变化事件 */
  change: (value: RadioValueType) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: RadioValueType) => true,
}

export type RadioValueType = string | number | boolean
export type RadioNameType = string | number
export type RadioEmits = typeof radioEmits
export type RadioProps = ExtractPropTypes<typeof radioProps>
export type RadioInstance = InstanceType<typeof Radio>
