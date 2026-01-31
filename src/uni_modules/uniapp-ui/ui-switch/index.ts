import type Switch from "./ui-switch.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("switch", {
  modelValue: false,
  size: "",
  gutter: "",
  loading: false,
  disabled: false,
  activeValue: true,
  inactiveValue: false,
  activeColor: "",
  inactiveColor: "",
  activeText: "",
  inactiveText: "",
  textSize: "",
  textColor: "",
  textWeight: "",
  loadingIconSize: "",
  loadingIconColor: "",
  beforeChange: undefined,
  customClass: "",
  customStyle: "",
})

export const switchProps = {
  /** 开关选中状态 */
  modelValue: defaultProps("modelValue", { type: [Number, String, Boolean] }),
  /** 开关按钮的尺寸 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 圆点与背景的间距 */
  gutter: defaultProps("gutter", { type: [Number, String] }),
  /** 是否为加载状态 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 是否为禁用状态 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 打开时对应的值 */
  activeValue: defaultProps("activeValue", { type: [Number, String, Boolean] }),
  /** 关闭时对应的值 */
  inactiveValue: defaultProps("inactiveValue", { type: [Number, String, Boolean] }),
  /** 打开时的背景色 */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 关闭时的背景色 */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 打开时显示的文字 */
  activeText: defaultProps("activeText", { type: String }),
  /** 关闭时显示的文字 */
  inactiveText: defaultProps("inactiveText", { type: String }),
  /** 文字大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文字粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 加载中图标大小 */
  loadingIconSize: defaultProps("loadingIconSize", { type: [Number, String] }),
  /** 加载中图标颜色 */
  loadingIconColor: defaultProps("loadingIconColor", { type: String }),
  /** 状态变化前的回调函数 */
  beforeChange: defaultProps("beforeChange", { type: Function }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const switchEmits = {
  /** 值变化事件 */
  change: (value: number | string | boolean) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: number | string | boolean) => true,
}

export type SwitchEmits = typeof switchEmits
export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchInstance = InstanceType<typeof Switch>
