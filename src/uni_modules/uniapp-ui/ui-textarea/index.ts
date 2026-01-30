import type Textarea from "./ui-textarea.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("textarea", {
  modelValue: "",
  disabled: false,
  readonly: false,
  clearable: true,
  maxlength: 200,
  background: "",
  placeholder: "请输入内容",
  placeholderColor: "",
  placeholderStyle: "",
  confirmType: "return",
  confirmHold: false,
  showConfirmBar: true,
  focus: false,
  fixed: false,
  autoHeight: false,
  inputAlign: "left",
  ignoreCompositionEvent: true,
  cursor: -1,
  cursorColor: "",
  cursorSpacing: 30,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  color: "",
  width: "",
  padding: "",
  minHeight: "150rpx",
  fontSize: "",
  fontWeight: "",
  radius: "",
  border: "",
  showCount: false,
  countSize: "",
  countColor: "",
  countWeight: "",
  disableDefaultPadding: false,
  clearIcon: "close",
  clearIconSize: "24rpx",
  clearIconColor: "#fff",
  clearIconWeight: "",
  clearIconBackground: "",
  customClass: "",
  customStyle: "",
})

export const textareaProps = {
  /**
   * 输入值
   */
  modelValue: defaultProps("modelValue", { type: String }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
   */
  readonly: defaultProps("readonly", { type: Boolean }),
  /**
   * 是否显示清除按钮
   */
  clearable: defaultProps("clearable", { type: Boolean }),
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: defaultProps("maxlength", { type: Number }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 输入框为空时的占位符
   */
  placeholder: defaultProps("placeholder", { type: String }),
  /**
   * 输入框为空时的占位符颜色
   */
  placeholderColor: defaultProps("placeholderColor", { type: String }),
  /**
   * 输入框为空时的占位符样式
   */
  placeholderStyle: defaultProps("placeholderStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: defaultProps("confirmType", { type: String as PropType<"send" | "search" | "next" | "go" | "done" | "return"> }),
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: defaultProps("confirmHold", { type: Boolean }),
  /**
   * 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: defaultProps("showConfirmBar", { type: Boolean }),
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: defaultProps("focus", { type: Boolean }),
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: defaultProps("fixed", { type: Boolean }),
  /**
   * 是否自动增加高度
   */
  autoHeight: defaultProps("autoHeight", { type: Boolean }),
  /**
   * 输入对齐方式，可选值为 left center right
   */
  inputAlign: defaultProps("inputAlign", { type: String, validator: (v: string) => ["left", "center", "right"].includes(v) }),
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: defaultProps("ignoreCompositionEvent", { type: Boolean }),
  /**
   * 指定focus时光标的位置
   */
  cursor: defaultProps("cursor", { type: Number }),
  /**
   * 光标颜色
   */
  cursorColor: defaultProps("cursorColor", { type: String }),
  /**
   * 输入框聚焦时底部与键盘的距离
   */
  cursorSpacing: defaultProps("cursorSpacing", { type: Number }),
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: defaultProps("selectionStart", { type: Number }),
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: defaultProps("selectionEnd", { type: Number }),
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: defaultProps("adjustPosition", { type: Boolean }),
  /**
   * focus时，点击页面的时候不收起键盘，只微信小程序有效
   */
  holdKeyboard: defaultProps("holdKeyboard", { type: Boolean }),
  /**
   * 输入框字体颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 输入框宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 内边距
   */
  padding: defaultProps("padding", { type: [Number, String] }),
  /**
   * 最小输入框高度
   */
  minHeight: defaultProps("minHeight", { type: [Number, String] }),
  /**
   * 输入框字体的大小
   */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /**
   * 输入框字体的粗细
   */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /**
   * 圆角值
   */
  radius: defaultProps("radius", { type: [Number, String] }),
  /**
   * 边框样式
   */
  border: defaultProps("border", { type: String }),
  /**
   * 是否显示字数统计
   */
  showCount: defaultProps("showCount", { type: Boolean }),
  /**
   * 字数统计字体大小
   */
  countSize: defaultProps("countSize", { type: [Number, String] }),
  /**
   * 字数统计字体颜色
   */
  countColor: defaultProps("countColor", { type: String }),
  /**
   * 字数统计字体粗细
   */
  countWeight: defaultProps("countWeight", { type: [Number, String] }),
  /**
   * 是否去掉 iOS 下的默认内边距
   */
  disableDefaultPadding: defaultProps("disableDefaultPadding", { type: Boolean }),
  /**
   * 输入框清除图标
   */
  clearIcon: defaultProps("clearIcon", { type: String }),
  /**
   * 输入框清除图标大小
   */
  clearIconSize: defaultProps("clearIconSize", { type: [Number, String] }),
  /**
   * 输入框清除图标颜色
   */
  clearIconColor: defaultProps("clearIconColor", { type: String }),
  /**
   * 输入框清除图标粗细
   */
  clearIconWeight: defaultProps("clearIconWeight", { type: [Number, String] }),
  /**
   * 输入框清除图标背景色
   */
  clearIconBackground: defaultProps("clearIconBackground", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const textareaEmits = {
  clear: () => true,
  focus: () => true,
  blur: (value: string) => true,
  confirm: (value: string) => true,
  linechange: (event: any) => true,
  keyboardheightchange: () => true,
  input: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export type TextareaEmits = typeof textareaEmits
export type TextareaProps = ExtractPropTypes<typeof textareaProps>
export type TextareaInstance = InstanceType<typeof Textarea>
