import type Textarea from "./ui-textarea.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const textareaProps = buildProps("textarea", {
  /**
   * 输入值
   */
  modelValue: { type: String, default: () => "" },
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
  maxlength: makeNumericProp(200),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 输入框为空时的占位符
   */
  placeholder: makeStringProp("请输入内容"),
  /**
   * 输入框为空时的占位符颜色
   */
  placeholderColor: makeStringProp(""),
  /**
   * 输入框为空时的占位符样式
   */
  placeholderStyle: styleProp,
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: makeStringProp("done"),
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: Boolean,
  /**
   * 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: truthProp,
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: Boolean,
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: Boolean,
  /**
   * 是否自动增加高度
   */
  autoHeight: Boolean,
  /**
   * 输入对齐方式，可选值为 left center right
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
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
  cursorColor: makeStringProp(""),
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
   * focus时，点击页面的时候不收起键盘，只微信小程序有效
   */
  holdKeyboard: Boolean,
  /**
   * 输入框字体颜色
   */
  color: makeStringProp(""),
  /**
   * 输入框宽度
   */
  width: makeNumericProp(""),
  /**
   * 内边距
   */
  padding: makeNumericProp(""),
  /**
   * 最小输入框高度
   */
  minHeight: makeNumericProp("150rpx"),
  /**
   * 输入框字体的大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 输入框字体的粗细
   */
  fontWeight: makeNumericProp(""),
  /**
   * 圆角值
   */
  radius: makeNumericProp(""),
  /**
   * 边框样式
   */
  border: makeStringProp(""),
  /**
   * 是否显示字数统计
   */
  showCount: truthProp,
  /**
   * 字数统计字体大小
   */
  countSize: makeNumericProp(""),
  /**
   * 字数统计字体颜色
   */
  countColor: makeStringProp(""),
  /**
   * 字数统计字体粗细
   */
  countWeight: makeNumericProp(""),
  /**
   * 是否去掉 iOS 下的默认内边距
   */
  disableDefaultPadding: Boolean,
  /**
   * 输入框清除图标
   */
  clearIcon: makeStringProp("cross"),
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
  clearIconWeight: makeNumericProp(""),
  /**
   * 输入框清除图标背景色
   */
  clearIconBackground: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
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
