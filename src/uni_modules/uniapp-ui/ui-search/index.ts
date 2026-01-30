import type Search from "./ui-search.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("search", {
  modelValue: "",
  placeholder: "请输入搜索关键词",
  maxlength: -1,
  disabled: false,
  focus: false,
  clearable: true,
  clearabled: undefined,
  height: "72rpx",
  margin: "",
  round: false,
  radius: "",
  color: "",
  fontSize: "",
  placeholderColor: "#969799",
  inputAlign: "left",
  background: "",
  border: "",
  icon: "search",
  iconSize: "40rpx",
  iconColor: "",
  iconWeight: "",
  clearSize: "32",
  clearColor: "",
  clearWeight: "",
  action: true,
  actionText: "搜索",
  actionSize: "",
  actionColor: "",
  actionWeight: "",
  inputStyle: "",
  customClass: "",
  customStyle: "",
})

export const searchProps = {
  // ==================== 基础属性 ====================
  /** 绑定值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 占位文字 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 输入框最大输入长度，-1 表示不限制 */
  maxlength: defaultProps("maxlength", { type: Number }),
  /** 是否禁用输入框 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否自动获得焦点 */
  focus: defaultProps("focus", { type: Boolean }),
  /** 是否显示清除按钮（有内容时显示） */
  clearable: defaultProps("clearable", { type: Boolean }),
  /** 是否显示清除按钮（兼容历史 clearabled） */
  clearabled: defaultProps("clearabled", { type: Boolean }),

  // ==================== 尺寸与布局 ====================
  /** 输入框高度，支持 rpx/px 单位 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 外边距 */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 是否圆形搜索框 */
  round: defaultProps("round", { type: Boolean }),
  /** 圆角值，覆盖默认圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),

  // ==================== 文字样式 ====================
  /** 输入文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 输入文字大小 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 占位文字颜色 */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /** 输入框内容水平对齐方式 */
  inputAlign: defaultProps("inputAlign", { type: String, validator: (v: string) => ["left", "center", "right"].includes(v) }),

  // ==================== 外观样式 ====================
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 边框样式，如 "1px solid #eee" */
  border: defaultProps("border", { type: String }),

  // ==================== 搜索图标 ====================
  /** 搜索图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 搜索图标大小（移动端建议 20px 以上） */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 搜索图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 搜索图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: String }),

  // ==================== 清除图标 ====================
  /** 清除图标大小 */
  clearSize: defaultProps("clearSize", { type: [Number, String] }),
  /** 清除图标颜色 */
  clearColor: defaultProps("clearColor", { type: String }),
  /** 清除图标粗细 */
  clearWeight: defaultProps("clearWeight", { type: String }),

  // ==================== 右侧操作按钮 ====================
  /** 是否显示右侧操作按钮 */
  action: defaultProps("action", { type: Boolean }),
  /** 右侧操作按钮文字 */
  actionText: defaultProps("actionText", { type: String }),
  /** 右侧操作按钮文字大小 */
  actionSize: defaultProps("actionSize", { type: [Number, String] }),
  /** 右侧操作按钮文字颜色 */
  actionColor: defaultProps("actionColor", { type: String }),
  /** 右侧操作按钮文字粗细 */
  actionWeight: defaultProps("actionWeight", { type: String }),

  // ==================== 自定义样式 ====================
  /** 自定义输入框样式 */
  inputStyle: defaultProps("inputStyle", styleProp),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义根元素样式 */
  customStyle: defaultProps("customStyle", styleProp),
}
export const searchEmits = {
  blur: (event: any) => true,
  focus: (event: any) => true,
  click: (event: any) => true,
  clear: (event: any) => true,
  action: (event: any) => true,
  search: (value: any) => true,
  change: (value: any) => true,
  "update:modelValue": (value: string) => true,
}

export const searchInputAlign = ["left", "center", "right"]

export type SearchShape = "round" | "square"
export type SearchInputAlign = "left" | "center" | "right"
export type SearchEmits = typeof searchEmits
export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = InstanceType<typeof Search>
