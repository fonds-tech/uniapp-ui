import type Textarea from "./ui-textarea.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TextareaConfirmType = "send" | "search" | "next" | "go" | "done" | "return"
export type TextareaInputAlign = "left" | "center" | "right"

const defaultProps = buildDefaultProps("textarea", {
  modelValue: "",
  disabled: false,
  readonly: false,
  clearable: true,
  maxlength: 200,
  background: undefined,
  placeholder: "请输入内容",
  placeholderColor: undefined,
  placeholderStyle: undefined,
  confirmType: "done",
  confirmHold: false,
  showConfirmBar: true,
  focus: false,
  fixed: false,
  autoHeight: false,
  inputAlign: "left",
  ignoreCompositionEvent: true,
  cursor: -1,
  cursorColor: undefined,
  cursorSpacing: 30,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  color: undefined,
  width: undefined,
  padding: undefined,
  minHeight: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  radius: undefined,
  border: undefined,
  showCount: false,
  countSize: undefined,
  countColor: undefined,
  countWeight: undefined,
  disableDefaultPadding: false,
  clearIcon: "cross",
  clearIconSize: undefined,
  clearIconColor: undefined,
  clearIconWeight: undefined,
  clearIconBackground: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const textareaProps = {
  /** 输入值 */
  modelValue: defaultProps("modelValue", { type: String }),
  /** 是否禁用（置灰 + 阻止输入） */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读（阻止编辑但不置灰，可选中文本） */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否显示清除按钮 */
  clearable: defaultProps("clearable", { type: Boolean }),
  /** 最大输入长度，-1 不限制 */
  maxlength: defaultProps("maxlength", { type: Number }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 占位符 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 占位符颜色 */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /** 占位符样式（透传 placeholder-style） */
  placeholderStyle: defaultProps("placeholderStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 键盘右下角按钮文字 */
  confirmType: defaultProps("confirmType", { type: String as PropType<TextareaConfirmType> }),
  /** 点击确认后是否保持键盘不收起 */
  confirmHold: defaultProps("confirmHold", { type: Boolean }),
  /** 是否显示键盘上方"完成"栏 */
  showConfirmBar: defaultProps("showConfirmBar", { type: Boolean }),
  /** 自动聚焦 */
  focus: defaultProps("focus", { type: Boolean }),
  /** position:fixed 父容器内需置 true */
  fixed: defaultProps("fixed", { type: Boolean }),
  /** 内容超出时自动撑高 */
  autoHeight: defaultProps("autoHeight", { type: Boolean }),
  /** 文本对齐 */
  inputAlign: defaultProps("inputAlign", { type: String as PropType<TextareaInputAlign>, validator: (v: string) => ["left", "center", "right"].includes(v) }),
  /** 忽略合成事件 */
  ignoreCompositionEvent: defaultProps("ignoreCompositionEvent", { type: Boolean }),
  /** 聚焦时光标位置 */
  cursor: defaultProps("cursor", { type: Number }),
  /** 光标颜色 */
  cursorColor: defaultProps("cursorColor", { type: String }),
  /** 聚焦时底部与键盘距离 */
  cursorSpacing: defaultProps("cursorSpacing", { type: Number }),
  /** 选区起点 */
  selectionStart: defaultProps("selectionStart", { type: Number }),
  /** 选区终点 */
  selectionEnd: defaultProps("selectionEnd", { type: Number }),
  /** 键盘弹起时自动上推页面 */
  adjustPosition: defaultProps("adjustPosition", { type: Boolean }),
  /** 聚焦后点击页面不收起键盘（仅 MP-WEIXIN） */
  holdKeyboard: defaultProps("holdKeyboard", { type: Boolean }),
  /** 字体颜色 */
  color: defaultProps("color", { type: String }),
  /** 容器宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 最小高度 */
  minHeight: defaultProps("minHeight", { type: [Number, String] }),
  /** 字号 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 字重 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 边框样式 */
  border: defaultProps("border", { type: String }),
  /** 是否显示字数统计 */
  showCount: defaultProps("showCount", { type: Boolean }),
  /** 字数统计字号 */
  countSize: defaultProps("countSize", { type: [Number, String] }),
  /** 字数统计颜色 */
  countColor: defaultProps("countColor", { type: String }),
  /** 字数统计字重 */
  countWeight: defaultProps("countWeight", { type: [Number, String] }),
  /** 去掉 iOS 默认内边距 */
  disableDefaultPadding: defaultProps("disableDefaultPadding", { type: Boolean }),
  /** 清除按钮图标 */
  clearIcon: defaultProps("clearIcon", { type: String }),
  /** 清除按钮图标尺寸 */
  clearIconSize: defaultProps("clearIconSize", { type: [Number, String] }),
  /** 清除按钮图标颜色 */
  clearIconColor: defaultProps("clearIconColor", { type: String }),
  /** 清除按钮图标字重 */
  clearIconWeight: defaultProps("clearIconWeight", { type: [Number, String] }),
  /** 清除按钮背景色 */
  clearIconBackground: defaultProps("clearIconBackground", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const textareaEmits = {
  clear: () => true,
  focus: () => true,
  blur: (_value: string) => true,
  confirm: (_value: string) => true,
  linechange: (_event: unknown) => true,
  keyboardheightchange: () => true,
  input: (_value: string) => true,
  change: (_value: string) => true,
  "update:modelValue": (_value: string) => true,
}

export type TextareaEmits = typeof textareaEmits
export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaInstance = InstanceType<typeof Textarea>
