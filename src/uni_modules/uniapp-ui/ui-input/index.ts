import type Input from "./ui-input.vue"
import type { InputType, InputConfirmType } from "@uni-helper/uni-types"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("input", {
  modelValue: "",
  type: "text",
  password: false,
  color: undefined,
  width: undefined,
  height: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  readonly: false,
  disabled: false,
  clearable: true,
  maxlength: -1,
  background: undefined,
  placeholder: "请输入内容",
  placeholderColor: undefined,
  placeholderStyle: "",
  confirmType: "done",
  confirmHold: false,
  holdKeyboard: false,
  focus: false,
  autoBlur: false,
  ignoreCompositionEvent: true,
  cursor: -1,
  cursorColor: undefined,
  cursorSpacing: 30,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  radius: undefined,
  padding: undefined,
  border: undefined,
  inputAlign: "left",
  prefixIcon: undefined,
  prefixIconSize: undefined,
  prefixIconColor: undefined,
  prefixIconWeight: undefined,
  suffixIcon: undefined,
  suffixIconSize: undefined,
  suffixIconColor: undefined,
  suffixIconWeight: undefined,
  clearIcon: "cross",
  clearIconSize: "20rpx",
  clearIconColor: "#fff",
  clearIconWeight: undefined,
  clearIconBackground: undefined,
  customClass: "",
  customStyle: "",
})

export const inputProps = {
  /** 输入值 */
  modelValue: defaultProps("modelValue", { type: [String, Number] }),
  /** 输入框类型 */
  type: defaultProps("type", { type: String as PropType<InputType | "password"> }),
  /** 是否启用密码模式（兼容 uni-app password 属性） */
  password: defaultProps("password", { type: Boolean }),
  /** 输入框字体颜色 */
  color: defaultProps("color", { type: String }),
  /** 输入框宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 输入框高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 输入框字体的大小 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 输入框字体的粗细 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 是否只读，与disabled不同之处在于disabled会置灰组件 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否显示清除按钮 */
  clearable: defaultProps("clearable", { type: Boolean }),
  /** 最大输入长度，设置为 -1 的时候不限制最大长度 */
  maxlength: defaultProps("maxlength", { type: Number }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 输入框为空时的占位符 */
  placeholder: defaultProps("placeholder", { type: String }),
  /** 输入框为空时的占位符颜色 */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /** 输入框为空时的占位符样式 */
  placeholderStyle: defaultProps("placeholderStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /** 设置右下角按钮的文字，兼容性详见uni-app文档 */
  confirmType: defaultProps("confirmType", { type: String as PropType<InputConfirmType> }),
  /** 点击键盘右下角按钮时是否保持键盘不收起，H5无效 */
  confirmHold: defaultProps("confirmHold", { type: Boolean }),
  /** focus时，点击页面的时候不收起键盘，微信小程序有效 */
  holdKeyboard: defaultProps("holdKeyboard", { type: Boolean }),
  /** 自动获取焦点 */
  focus: defaultProps("focus", { type: Boolean }),
  /** 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 */
  autoBlur: defaultProps("autoBlur", { type: Boolean }),
  /** 是否忽略组件内对文本合成系统事件的处理 */
  ignoreCompositionEvent: defaultProps("ignoreCompositionEvent", { type: Boolean }),
  /** 指定focus时光标的位置 */
  cursor: defaultProps("cursor", { type: Number }),
  /** 光标颜色 */
  cursorColor: defaultProps("cursorColor", { type: String }),
  /** 输入框聚焦时底部与键盘的距离 */
  cursorSpacing: defaultProps("cursorSpacing", { type: Number }),
  /** 光标起始位置，自动聚集时有效，需与selection-end搭配使用 */
  selectionStart: defaultProps("selectionStart", { type: Number }),
  /** 光标结束位置，自动聚集时有效，需与selection-start搭配使用 */
  selectionEnd: defaultProps("selectionEnd", { type: Number }),
  /** 键盘弹起时，是否自动上推页面 */
  adjustPosition: defaultProps("adjustPosition", { type: Boolean }),
  /** 圆角值 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 边框样式 */
  border: defaultProps("border", { type: String }),
  /** 输入内容对齐方式 */
  inputAlign: defaultProps("inputAlign", { type: String as PropType<"left" | "center" | "right"> }),
  /** 前缀图标 */
  prefixIcon: defaultProps("prefixIcon", { type: String }),
  /** 前缀图标大小 */
  prefixIconSize: defaultProps("prefixIconSize", { type: [Number, String] }),
  /** 前缀图标颜色 */
  prefixIconColor: defaultProps("prefixIconColor", { type: String }),
  /** 前缀图标粗细 */
  prefixIconWeight: defaultProps("prefixIconWeight", { type: [Number, String] }),
  /** 后缀图标 */
  suffixIcon: defaultProps("suffixIcon", { type: String }),
  /** 后缀图标大小 */
  suffixIconSize: defaultProps("suffixIconSize", { type: [Number, String] }),
  /** 后缀图标颜色 */
  suffixIconColor: defaultProps("suffixIconColor", { type: String }),
  /** 后缀图标粗细 */
  suffixIconWeight: defaultProps("suffixIconWeight", { type: [Number, String] }),
  /** 输入框清除图标 */
  clearIcon: defaultProps("clearIcon", { type: String }),
  /** 输入框清除图标大小 */
  clearIconSize: defaultProps("clearIconSize", { type: [Number, String] }),
  /** 输入框清除图标颜色 */
  clearIconColor: defaultProps("clearIconColor", { type: String }),
  /** 输入框清除图标粗细 */
  clearIconWeight: defaultProps("clearIconWeight", { type: [Number, String] }),
  /** 输入框清除图标背景色 */
  clearIconBackground: defaultProps("clearIconBackground", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const inputEmits = {
  /** 点击事件 */
  click: () => true,
  /** 清除事件 */
  clear: () => true,
  /** 聚焦事件 */
  focus: () => true,
  /** 失焦事件 */
  blur: (value: string) => true,
  /** 确认事件 */
  confirm: (value: string) => true,
  /** 键盘高度变化事件 */
  keyboardheightchange: () => true,
  /** 输入事件 */
  input: (value: string) => true,
  /** 值变化事件 */
  change: (value: string) => true,
  /** 更新绑定值事件 */
  "update:modelValue": (value: string) => true,
}

export type InputEmits = typeof inputEmits
export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputInstance = InstanceType<typeof Input>
