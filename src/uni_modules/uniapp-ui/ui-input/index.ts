import type Input from "./ui-input.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { InputType, InputConfirmType } from "@uni-helper/uni-types"
import { styleProp, truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const inputProps = {
  /**
   * 输入值
   */
  modelValue: { type: [String, Number], default: "" },
  /**
   * 输入框类型
   */
  type: makeStringProp<InputType | "password">("text"),
  /**
   * 是否启用密码模式（兼容 uni-app password 属性）
   */
  password: Boolean,
  /**
   * 输入框字体颜色
   */
  color: String,
  /**
   * 输入框宽度
   */
  width: numericProp,
  /**
   * 输入框高度
   */
  height: numericProp,
  /**
   * 输入框字体的大小
   */
  fontSize: numericProp,
  /**
   * 输入框字体的粗细
   */
  fontWeight: numericProp,
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
  clearable: truthProp,
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: makeNumericProp(-1),
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 输入框为空时的占位符
   */
  placeholder: makeStringProp("请输入内容"),
  /**
   * 输入框为空时的占位符颜色
   */
  placeholderColor: String,
  /**
   * 输入框为空时的占位符样式
   */
  placeholderStyle: styleProp,
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: makeStringProp<InputConfirmType>("done"),
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
  ignoreCompositionEvent: truthProp,
  /**
   * 指定focus时光标的位置
   */
  cursor: makeNumericProp(-1),
  /**
   * 光标颜色
   */
  cursorColor: String,
  /**
   * 输入框聚焦时底部与键盘的距离
   */
  cursorSpacing: makeNumericProp(30),
  /**
   * 光标起始位置，自动聚集时有效，需与selection-end搭配使用
   */
  selectionStart: makeNumericProp(-1),
  /**
   * 光标结束位置，自动聚集时有效，需与selection-start搭配使用
   */
  selectionEnd: makeNumericProp(-1),
  /**
   * 键盘弹起时，是否自动上推页面
   */
  adjustPosition: truthProp,
  /**
   * 圆角值
   */
  radius: numericProp,
  /**
   * 内边距
   */
  padding: numericProp,
  /**
   * 边框样式
   */
  border: String,
  /**
   * 输入内容对齐方式
   */
  inputAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left",
  },
  /**
   * 前缀图标
   */
  prefixIcon: String,
  /**
   * 前缀图标大小
   */
  prefixIconSize: numericProp,
  /**
   * 前缀图标颜色
   */
  prefixIconColor: String,
  /**
   * 前缀图标粗细
   */
  prefixIconWeight: numericProp,
  /**
   * 后缀图标
   */
  suffixIcon: String,
  /**
   * 后缀图标大小
   */
  suffixIconSize: numericProp,
  /**
   * 后缀图标颜色
   */
  suffixIconColor: String,
  /**
   * 后缀图标粗细
   */
  suffixIconWeight: numericProp,
  /**
   * 输入框清除图标
   */
  clearIcon: makeStringProp("close"),
  /**
   * 输入框清除图标大小
   */
  clearIconSize: makeNumericProp("24rpx"),
  /**
   * 输入框清除图标颜色
   */
  clearIconColor: makeStringProp("#fff"),
  /**
   * 输入框清除图标粗细
   */
  clearIconWeight: numericProp,
  /**
   * 输入框清除图标背景色
   */
  clearIconBackground: String,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
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
