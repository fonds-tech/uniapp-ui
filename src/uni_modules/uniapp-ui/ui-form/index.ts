import type Form from "./ui-form.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const formKey: InjectionKey<FormProvide> = Symbol("ui-form")
export const formProps = {
  /**
   * 表单数据对象
   */
  model: { type: Object, default: () => ({}) },
  /**
   * 表单验证规则
   */
  rules: { type: Object as PropType<FormRules>, default: () => ({}) },
  /**
   * 是否在标签文字后面添加冒号
   */
  colon: Boolean,
  /**
   * 是否显示边框
   */
  border: Boolean,
  /**
   * 边框颜色
   */
  borderColor: makeStringProp("#F6F6F6"),
  /**
   * 是否为必填项，会显示标签文字右侧*号
   */
  required: Boolean,
  /**
   * 是否禁用表单
   */
  disabled: Boolean,
  /**
   * 是否只读状态
   */
  readonly: Boolean,
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
   * 表单域标签文字字重
   */
  labelWeight: numericProp,
  /**
   * 表单域标签文字宽度
   */
  labelWidth: makeNumericProp("auto"),
  /**
   * 表单域标签文字行高
   */
  labelLineHeight: numericProp,
  /**
   * 表单域标签文字位置，可选值为 left right top
   */
  labelPosition: makeStringProp<FormLabelPosition>("left"),
  /**
   * 输入内容对齐方式，可选值为 left center right
   */
  contentAlign: makeStringProp<FormContentAlign>("left"),
  /**
   * 校验错误信息文字大小
   */
  errorMessageSize: numericProp,
  /**
   * 校验错误信息文字颜色
   */
  errorMessageColor: String,
  /**
   * 校验错误信息文字字重
   */
  errorMessageWeight: numericProp,
  /**
   * 校验错误信息文字对齐方式，可选值为 left center right
   */
  errorMessageAlign: makeStringProp<FormErrorMessageAlign>("left"),
  /**
   * 是否在校验不通过时在输入框下方展示错误提示
   */
  showErrorMessage: truthProp,
  /**
   * 是否在某一项校验不通过时停止校验
   */
  validateFirst: Boolean,
  /**
   * 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值
   */
  validateTrigger: { type: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]>, default: "blur" },
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export const formEmits = {
  submit: (values: Record<string, unknown>) => true,
  failed: (result: { values: Record<string, unknown>; errors: FormValidateError[] }) => true,
  "update:model": (values: Record<string, unknown>) => true,
}

export interface FormProvide {
  props: FormProps
  /** 表单数据模型 */
  model: import("vue").WritableComputedRef<Record<string, unknown>>
  /** 表单验证规则 */
  rules: FormRules
  /** 初始表单数据（用于重置） */
  initialModel: import("vue").Ref<Record<string, unknown>>
  /** 最大标签宽度（用于自动对齐） */
  maxLabelWidth: import("vue").ComputedRef<number>
  /** 注册子组件的标签宽度 */
  registerLabelWidth: (uid: number, width: number, isTop: boolean) => void
  /** 注销子组件的标签宽度 */
  unregisterLabelWidth: (uid: number) => void
  submit: () => void
  getValues: () => Record<string, unknown>
  validate: {
    (): Promise<void>
    (callback: FormValidateCallback): void
  }
  validateField: {
    (prop: string): Promise<void>
    (prop: string, callback: FormValidateCallback): void
  }
  validateFields: {
    (props: string[]): Promise<void>
    (props: string[], callback: FormValidateCallback): void
  }
  resetValidation: (name?: string | string[]) => void
  getValidationStatus: () => Record<string, unknown>
}
export interface FormValidateRule {
  pattern?: RegExp
  trigger?: FormValidateTrigger | FormValidateTrigger[]
  message?: FormRuleMessage
  required?: boolean
  validator?: FormRuleValidator
  formatter?: FormRuleFormatter
  validateEmpty?: boolean
}

export type FormLabelPosition = "left" | "right" | "top"
export type FormContentAlign = "left" | "center" | "right"
export type FormRules = Record<string, FormValidateRule | FormValidateRule[]>
export type FormRuleMessage = string | ((value: any, rule: FormValidateRule) => string)
export type FormRuleFormatter = (value: any, rule: FormValidateRule) => string
export type FormRuleValidator = (value: any, rule: FormValidateRule) => boolean | string | Promise<boolean | string>
export interface FormValidateError {
  prop?: string
  message: string
}
export type FormValidateCallback = (valid: boolean, errors?: FormValidateError[]) => void
export type FormValidateTrigger = "blur" | "change" | "submit"
export type FormValidationStatus = "passed" | "failed" | "unvalidated"
export type FormErrorMessageAlign = "left" | "center" | "right"

export interface FormExpose {
  validate: {
    (): Promise<void>
    (callback: FormValidateCallback): void
  }
  validateField: {
    (prop: string): Promise<void>
    (prop: string, callback: FormValidateCallback): void
  }
  validateFields: {
    (props: string[]): Promise<void>
    (props: string[], callback: FormValidateCallback): void
  }
  resetValidation: (name?: string | string[]) => void
  getValidationStatus: () => Record<string, unknown>
}
export type FormEmits = typeof formEmits
export type FormProps = ExtractPropTypes<typeof formProps>
export type FormInstance = InstanceType<typeof Form>
