import type Input from "./ui-input.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { InputType, InputConfirmType } from "@uni-helper/uni-types"
import { createProps } from "../hooks"
import { styleProp, makeStringProp } from "../utils/props"

export const [inputProps, useInputProps] = createProps("input", {
  /**
   * 输入值
   */
  modelValue: { type: [String, Number], default: () => "" },
  /**
   * 输入框类型
   */
  type: { type: [String] as PropType<InputType | "password">, default: () => "text" },
  /**
   * 输入框字体颜色
   */
  color: { type: String, default: "" },
  /**
   * 输入框宽度
   */
  width: { type: [String, Number], default: "" },
  /**
   * 输入框高度
   */
  height: { type: [String, Number], default: "" },
  /**
   * 输入框字体的大小
   */
  fontSize: { type: [String, Number], default: "" },
  /**
   * 输入框字体的粗细
   */
  fontWeight: { type: [String, Number], default: "" },
  /**
   * 是否是密码类型
   */
  password: Boolean,
  /**
   * 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
   */
  readonly: Boolean,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 是否显示清除按钮
   */
  clearable: { type: Boolean, default: true },
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: { type: [String, Number], default: -1 },
  /**
   * 背景颜色
   */
  background: { type: String, default: "" },
  /**
   * 输入框为空时的占位符
   */
  placeholder: { type: String, default: "请输入内容" },
  /**
   * 输入框为空时的占位符颜色
   */
  placeholderColor: { type: String, default: "" },
  /**
   * 输入框为空时的占位符样式
   */
  placeholderStyle: styleProp,
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: { type: [String] as PropType<InputConfirmType>, default: "done" },
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: Boolean,
  /**
   * focus时，点击页面的时候不收起键盘，微信小程序有效
   */
  holdKeyboard: Boolean,
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: Boolean,
  /**
   * 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
   */
  autoBlur: Boolean,
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: { type: Boolean, default: true },
  /**
   * 指定focus时光标的位置
   */
  cursor: { type: [String, Number], default: -1 },
  /**
   * 光标颜色
   */
  cursorColor: { type: String, default: "" },
  /**
   * 输入框聚焦时底部与键盘的距离
   */
  cursorSpacing: { type: [String, Number], default: 30 },
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: { type: [String, Number], default: -1 },
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: { type: [String, Number], default: -1 },
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: { type: Boolean, default: true },
  /**
   * 圆角值
   */
  radius: { type: [String, Number], default: "" },
  /**
   * 内边距
   */
  padding: { type: [String, Number], default: "" },
  /**
   * 输入内容对齐方式
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 输入框清除图标
   */
  clearIcon: { type: String, default: "cross" },
  /**
   * 输入框清除图标大小
   */
  clearIconSize: { type: [String, Number], default: "24rpx" },
  /**
   * 输入框清除图标颜色
   */
  clearIconColor: { type: String, default: "#fff" },
  /**
   * 输入框清除图标粗细
   */
  clearIconWeight: { type: [String, Number], default: "" },
  /**
   * 输入框清除图标背景色
   */
  clearIconBackground: { type: String, default: "" },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const inputEmits = {
  click: () => true,
  clear: () => true,
  focus: () => true,
  blur: (value: string) => true,
  confirm: (value: string) => true,
  keyboardheightchange: () => true,
  input: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export type InputEmits = typeof inputEmits
export type InputProps = ExtractPropTypes<typeof inputProps>
export type InputInstance = InstanceType<typeof Input>
