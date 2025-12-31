import type Field from "./ui-field.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const fieldKey = Symbol("ui-form")
export const fieldProps = buildProps("field", {
  /**
   * 当前输入的值
   */
  modelValue: makeNumericProp(""),
  /**
   * 输入框左侧文本
   */
  label: makeStringProp(""),
  /**
   * 表单域字段名
   */
  prop: makeStringProp(""),
  /**
   * 输入框类型
   */
  type: { type: String as PropType<FieldType>, default: "text" },
  /**
   * 最大输入长度，设置为 -1 的时候不限制最大长度
   */
  maxlength: makeNumericProp(2000),
  /**
   * 是否禁用输入框
   */
  disabled: Boolean,
  /**
   * 是否为只读状态，只读状态下无法输入内容
   */
  readonly: Boolean,
  /**
   * 自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
   */
  focus: Boolean,
  /**
   * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
   */
  fixed: Boolean,
  /**
   * 是否在 label 后面添加冒号
   */
  colon: Boolean,
  /**
   * 是否显示表单必填星号
   */
  required: Boolean,
  /**
   * 是否自适应内容高度，只对 textarea 有效，
   */
  autosize: Boolean,
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 是否启用清除图标，点击清除图标后会清空输入框
   */
  clearable: Boolean,
  /**
   * 清除图标名称
   */
  clearIcon: makeStringProp("cross"),
  /**
   * 清除图标大小
   */
  clearIconSize: makeNumericProp("24rpx"),
  /**
   * 清除图标颜色
   */
  clearIconColor: makeStringProp("#fff"),
  /**
   * 清除图标粗细
   */
  clearIconWeight: makeNumericProp(""),
  /**
   * 输入框前置图标
   */
  prefixIcon: makeStringProp(""),
  /**
   * 输入框前置图标大小
   */
  prefixIconSize: makeNumericProp(""),
  /**
   * 输入框前置图标颜色
   */
  prefixIconColor: makeStringProp(""),
  /**
   * 输入框前置图标粗细
   */
  prefixIconWeight: makeNumericProp(""),
  /**
   * 输入框后置图标
   */
  suffixIcon: makeStringProp(""),
  /**
   * 输入框后置图标大小
   */
  suffixIconSize: makeNumericProp(""),
  /**
   * 输入框后置图标颜色
   */
  suffixIconColor: makeStringProp(""),
  /**
   * 输入框后置图标粗细
   */
  suffixIconWeight: makeNumericProp(""),
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
   * 表单项 label 宽度
   */
  labelWidth: makeNumericProp(""),
  /**
   * 表单项 label 字体大小
   */
  labelSize: makeNumericProp(""),
  /**
   * 表单项 label 字体颜色
   */
  labelColor: makeStringProp(""),
  /**
   * 表单项 label 字体粗细
   */
  labelWeight: makeNumericProp(""),
  /**
   * 表单项 label 对齐方式，可选值为 left center right top
   */
  labelAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right", "top"].includes(v) },
  /**
   * 输入对齐方式，可选值为 left center right
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 设置右下角按钮的文字，兼容性详见uni-app文档
   */
  confirmType: makeStringProp("done"),
  /**
   * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
   */
  ignoreCompositionEvent: truthProp,
  /**
   * 指定focus时光标的位置
   */
  cursor: makeNumericProp(-1),
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
   * 是否显示键盘上方带有”完成“按钮那一栏
   */
  showConfirmBar: truthProp,
  /**
   * 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
   */
  autoBlur: Boolean,
  /**
   * 点击键盘右下角按钮时是否保持键盘不收起，H5无效
   */
  confirmHold: Boolean,
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
   * 输入框高度
   */
  height: makeNumericProp(""),
  /**
   * 最小输入框高度
   */
  minHeight: makeNumericProp(""),
  /**
   * 输入框字体的大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 输入框字体的粗细
   */
  fontWeight: makeNumericProp(""),
  /**
   * 边框样式
   */
  border: makeStringProp(""),
  /**
   * 圆角值
   */
  borderRadius: makeNumericProp(""),
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
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const fieldEmits = {
  clear: () => true,
  focus: () => true,
  blur: (value: string) => value,
  confirm: (value: string) => value,
  keyboardheightchange: () => true,
  input: (value: string) => value,
  change: (value: string) => value,
  linechange: (event: any) => event,
  startValidate: () => true,
  endValidate: (result: { status: FieldValidationStatus; message: string }) => result,
  "update:modelValue": (value: string) => value,
}

export interface FieldRule {
  pattern?: RegExp
  trigger?: FieldValidateTrigger | FieldValidateTrigger[]
  message?: FieldRuleMessage
  required?: boolean
  validator?: FieldRuleValidator
  formatter?: FieldRuleFormatter
  validateEmpty?: boolean
}
export type FieldType = "text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "password" | "textarea"
export type FieldRuleMessage = string | ((value: any, rule: FieldRule) => string)
export type FieldRuleFormatter = (value: any, rule: FieldRule) => string
export type FieldRuleValidator = (value: any, rule: FieldRule) => boolean | string | Promise<boolean | string>
export interface FieldValidateError {
  prop?: string
  message: string
}
export type FieldValidateTrigger = "onBlur" | "onChange" | "onSubmit"
export type FieldValidationStatus = "passed" | "failed" | "unvalidated"
export type FieldEmits = typeof fieldEmits
export type FieldProps = ExtractPropTypes<typeof fieldProps>
export interface FieldExpose {}
export type FieldInstance = InstanceType<typeof Field>
