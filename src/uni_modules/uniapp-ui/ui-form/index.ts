import type Form from "./ui-form.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const formKey: InjectionKey<FormProvide> = Symbol("ui-form")

const defaultProps = buildDefaultProps("form", {
  model: () => ({}),
  rules: () => ({}),
  colon: false,
  border: false,
  borderColor: "#F6F6F6",
  required: false,
  disabled: false,
  readonly: false,
  labelGap: undefined,
  labelSize: undefined,
  labelColor: undefined,
  labelWeight: undefined,
  labelWidth: "auto",
  labelLineHeight: undefined,
  labelPosition: "left",
  contentAlign: "left",
  errorMessageSize: undefined,
  errorMessageColor: undefined,
  errorMessageWeight: undefined,
  errorMessageAlign: "left",
  showErrorMessage: true,
  validateFirst: false,
  validateTrigger: "blur",
  customClass: undefined,
  customStyle: undefined,
})

export const formProps = {
  /** 表单数据对象 */
  model: defaultProps("model", { type: Object }),
  /** 表单验证规则 */
  rules: defaultProps("rules", { type: Object as PropType<FormRules> }),
  /** 是否在标签文字后面添加冒号 */
  colon: defaultProps("colon", { type: Boolean }),
  /** 是否显示边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 是否为必填项，会显示标签文字右侧*号 */
  required: defaultProps("required", { type: Boolean }),
  /** 是否禁用表单 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否只读状态 */
  readonly: defaultProps("readonly", { type: Boolean }),
  /** 表单域标签文字和内容的间隔 */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /** 表单域标签文字大小 */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /** 表单域标签文字颜色 */
  labelColor: defaultProps("labelColor", { type: String }),
  /** 表单域标签文字字重 */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /** 表单域标签文字宽度 */
  labelWidth: defaultProps("labelWidth", { type: [Number, String] }),
  /** 表单域标签文字行高 */
  labelLineHeight: defaultProps("labelLineHeight", { type: [Number, String] }),
  /** 表单域标签文字位置，可选值为 left right top */
  labelPosition: defaultProps("labelPosition", { type: String as PropType<FormLabelPosition> }),
  /** 输入内容对齐方式，可选值为 left center right */
  contentAlign: defaultProps("contentAlign", { type: String as PropType<FormContentAlign> }),
  /** 校验错误信息文字大小 */
  errorMessageSize: defaultProps("errorMessageSize", { type: [Number, String] }),
  /** 校验错误信息文字颜色 */
  errorMessageColor: defaultProps("errorMessageColor", { type: String }),
  /** 校验错误信息文字字重 */
  errorMessageWeight: defaultProps("errorMessageWeight", { type: [Number, String] }),
  /** 校验错误信息文字对齐方式，可选值为 left center right */
  errorMessageAlign: defaultProps("errorMessageAlign", { type: String as PropType<FormErrorMessageAlign> }),
  /** 是否在校验不通过时在输入框下方展示错误提示 */
  showErrorMessage: defaultProps("showErrorMessage", { type: Boolean }),
  /** 是否在某一项校验不通过时停止校验 */
  validateFirst: defaultProps("validateFirst", { type: Boolean }),
  /** 表单校验触发时机，可选值为 blur change submit，支持通过数组同时设置多个值 */
  validateTrigger: defaultProps("validateTrigger", { type: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const formEmits = {
  /** 提交表单事件 */
  submit: (values: Record<string, unknown>) => true,
  /** 校验失败事件 */
  failed: (result: { values: Record<string, unknown>; errors: FormValidateError[] }) => true,
  /** 更新表单数据事件 */
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
