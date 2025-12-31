import type FormItem from "./ui-form-item.vue"
import type { PropType, ExtractPropTypes } from "vue"
import type { FormLabelPosition, FormValidateError, FormValidateTrigger, FormErrorMessageAlign } from "../ui-form"
import { styleProp, truthProp, buildProps, numericProp, makeStringProp } from "../utils/props"

export const formItemKey = Symbol("ui-form-item")
export const formItemProps = buildProps("formItem", {
  /**
   * model的键名
   */
  prop: String,
  /**
   * 标签文本
   */
  label: String,
  /**
   * 是否在标签文字后面添加冒号
   */
  colon: Boolean,
  /**
   * 是否显示边框
   */
  border: { type: Boolean, default: undefined },
  /**
   * 边框颜色
   */
  borderColor: String,
  /**
   * 是否为必填项，会显示标签文字右侧*号
   */
  required: Boolean,
  /**
   * 内边距
   */
  padding: numericProp,
  /**
   * 表单域标签文字和内容的间隔
   */
  labelGap: numericProp,
  /**
   * 表单域标签文字大小
   */
  labelSize: numericProp,
  /**
   * 表单域标签文字颜色
   */
  labelColor: String,
  /**
   * 表单域标签文字宽度
   */
  labelWidth: numericProp,
  /**
   * 表单域标签文字字重
   */
  labelWeight: numericProp,
  /**
   * 表单域标签文字行高
   */
  labelLineHeight: numericProp,
  /**
   * 表单域标签对齐方式
   */
  labelAlign: String as PropType<FormItemLabelAlign>,
  /**
   * 表单域标签文字位置，可选值为 left right top
   */
  labelPosition: String as PropType<FormLabelPosition>,
  /**
   * 输入内容对齐方式，可选值为 left center right
   */
  contentAlign: String as PropType<FormItemContentAlign>,
  /**
   * 校验错误信息文字
   */
  errorMessage: String,
  /**
   * 校验错误信息文字大小
   */
  errorMessageSize: numericProp,
  /**
   * 校验错误信息文字颜色
   */
  errorMessageColor: makeStringProp("error"),
  /**
   * 校验错误信息文字字重
   */
  errorMessageWeight: numericProp,
  /**
   * 校验错误信息文字对齐方式，可选值为 left center right
   */
  errorMessageAlign: { type: String as PropType<FormErrorMessageAlign>, default: "" },
  /**
   * 是否在校验不通过时在输入框下方展示错误提示
   */
  showErrorMessage: truthProp,
  /**
   * 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值
   */
  validateTrigger: { type: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]>, default: "blur" },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const formItemEmits = {
  submit: (values: Record<string, unknown>) => values,
  failed: (result: { values: Record<string, unknown>; errors: FormValidateError[] }) => result,
}

export type FormItemLabelAlign = "top" | "center" | "bottom"
export type FormItemContentAlign = "left" | "center" | "right"
export type FormItemEmits = typeof formItemEmits
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof FormItem>
