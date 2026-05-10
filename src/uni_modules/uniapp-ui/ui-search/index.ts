import type Search from "./ui-search.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const SEARCH_INPUT_ALIGN = ["left", "center", "right"] as const

export type SearchInputAlign = (typeof SEARCH_INPUT_ALIGN)[number]

const defaultProps = buildDefaultProps("search", {
  modelValue: "",
  placeholder: "请输入搜索关键词",
  maxlength: -1,
  disabled: false,
  focus: false,
  clearable: true,
  height: "72rpx",
  margin: undefined,
  round: false,
  radius: undefined,
  color: undefined,
  fontSize: undefined,
  placeholderColor: undefined,
  inputAlign: "left" as SearchInputAlign,
  background: undefined,
  border: undefined,
  icon: "search",
  iconSize: "40rpx",
  iconColor: undefined,
  iconWeight: undefined,
  clearIcon: "close",
  clearIconSize: "32rpx",
  clearIconColor: undefined,
  clearIconWeight: undefined,
  action: true,
  actionText: "搜索",
  actionSize: undefined,
  actionColor: undefined,
  actionWeight: undefined,
  inputStyle: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const searchProps = {
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 占位文字 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 输入框最大长度，-1 表示不限制 */
  maxlength: defaultProps("maxlength", { type: Number }),
  /** 是否禁用输入框 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否自动获得焦点 */
  focus: defaultProps("focus", { type: Boolean }),
  /** 是否显示清除按钮（有内容时显示） */
  clearable: defaultProps("clearable", { type: Boolean }),
  /** 输入框高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 外边距 */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 是否圆形搜索框 */
  round: defaultProps("round", { type: Boolean }),
  /** 圆角值，覆盖默认圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 输入文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 输入文字大小 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 占位文字颜色 */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /** 输入内容水平对齐 */
  inputAlign: defaultProps("inputAlign", {
    type: String as PropType<SearchInputAlign>,
    validator: (v: string) => SEARCH_INPUT_ALIGN.includes(v as SearchInputAlign),
  }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 边框 (CSS 简写，如 "1px solid #eee") */
  border: defaultProps("border", { type: String }),
  /** 搜索图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 搜索图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 搜索图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 搜索图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [String, Number] }),
  /** 清除图标名称 */
  clearIcon: defaultProps("clearIcon", { type: String }),
  /** 清除图标大小 */
  clearIconSize: defaultProps("clearIconSize", { type: [Number, String] }),
  /** 清除图标颜色 */
  clearIconColor: defaultProps("clearIconColor", { type: String }),
  /** 清除图标粗细 */
  clearIconWeight: defaultProps("clearIconWeight", { type: [String, Number] }),
  /** 是否显示右侧操作按钮 */
  action: defaultProps("action", { type: Boolean }),
  /** 右侧操作按钮文字 */
  actionText: defaultProps("actionText", { type: String }),
  /** 右侧操作按钮文字大小 */
  actionSize: defaultProps("actionSize", { type: [Number, String] }),
  /** 右侧操作按钮文字颜色 */
  actionColor: defaultProps("actionColor", { type: String }),
  /** 右侧操作按钮文字粗细 */
  actionWeight: defaultProps("actionWeight", { type: [String, Number] }),
  /** 自定义输入框样式 */
  inputStyle: defaultProps("inputStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义根元素样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const searchEmits = {
  /** 失焦事件 */
  blur: (event: FocusEvent) => !!event,
  /** 聚焦事件 */
  focus: (event: FocusEvent) => !!event,
  /** 点击事件 */
  click: (event: Event) => !!event,
  /** 清除事件 */
  clear: (event: Event) => !!event,
  /** 操作按钮点击事件 */
  action: (event: Event) => !!event,
  /** 搜索事件 (键盘 confirm 触发) */
  search: (value: string) => typeof value === "string",
  /** 值变化事件 */
  change: (value: string) => typeof value === "string",
  /** 更新绑定值事件 */
  "update:modelValue": (value: string) => typeof value === "string",
}

export type SearchEmits = typeof searchEmits
export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = InstanceType<typeof Search>
