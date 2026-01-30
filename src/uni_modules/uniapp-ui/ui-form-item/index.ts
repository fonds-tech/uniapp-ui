import type FormItem from "./ui-form-item.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import type { FormLabelPosition, FormValidateError, FormValidateTrigger, FormErrorMessageAlign } from "../ui-form"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("form-item", {
  prop: undefined,
  label: undefined,
  colon: false,
  border: undefined,
  borderColor: undefined,
  required: false,
  padding: undefined,
  labelGap: undefined,
  labelSize: undefined,
  labelColor: undefined,
  labelWidth: undefined,
  labelWeight: undefined,
  labelLineHeight: undefined,
  labelAlign: undefined,
  labelPosition: undefined,
  contentAlign: undefined,
  errorMessage: undefined,
  errorMessageSize: undefined,
  errorMessageColor: "error",
  errorMessageWeight: undefined,
  errorMessageAlign: "",
  showErrorMessage: true,
  validateTrigger: "blur",
  customClass: "",
  customStyle: "",
})

export const formItemProps = {
  /**
   * model的键名
   */
  prop: defaultProps("prop", { type: String }),
  /**
   * 标签文本
   */
  label: defaultProps("label", { type: String }),
  /**
   * 是否在标签文字后面添加冒号
   */
  colon: defaultProps("colon", { type: Boolean }),
  /**
   * 是否显示边框
   */
  border: defaultProps("border", { type: Boolean }),
  /**
   * 边框颜色
   */
  borderColor: defaultProps("borderColor", { type: String }),
  /**
   * 是否为必填项，会显示标签文字右侧*号
   */
  required: defaultProps("required", { type: Boolean }),
  /**
   * 内边距
   */
  padding: defaultProps("padding", { type: [Number, String] }),
  /**
   * 表单域标签文字和内容的间隔
   */
  labelGap: defaultProps("labelGap", { type: [Number, String] }),
  /**
   * 表单域标签文字大小
   */
  labelSize: defaultProps("labelSize", { type: [Number, String] }),
  /**
   * 表单域标签文字颜色
   */
  labelColor: defaultProps("labelColor", { type: String }),
  /**
   * 表单域标签文字宽度
   */
  labelWidth: defaultProps("labelWidth", { type: [Number, String] }),
  /**
   * 表单域标签文字字重
   */
  labelWeight: defaultProps("labelWeight", { type: [Number, String] }),
  /**
   * 表单域标签文字行高
   */
  labelLineHeight: defaultProps("labelLineHeight", { type: [Number, String] }),
  /**
   * 表单域标签对齐方式
   */
  labelAlign: defaultProps("labelAlign", { type: String as PropType<FormItemLabelAlign> }),
  /**
   * 表单域标签文字位置，可选值为 left right top
   */
  labelPosition: defaultProps("labelPosition", { type: String as PropType<FormLabelPosition> }),
  /**
   * 输入内容对齐方式，可选值为 left center right
   */
  contentAlign: defaultProps("contentAlign", { type: String as PropType<FormItemContentAlign> }),
  /**
   * 校验错误信息文字
   */
  errorMessage: defaultProps("errorMessage", { type: String }),
  /**
   * 校验错误信息文字大小
   */
  errorMessageSize: defaultProps("errorMessageSize", { type: [Number, String] }),
  /**
   * 校验错误信息文字颜色
   */
  errorMessageColor: defaultProps("errorMessageColor", { type: String }),
  /**
   * 校验错误信息文字字重
   */
  errorMessageWeight: defaultProps("errorMessageWeight", { type: [Number, String] }),
  /**
   * 校验错误信息文字对齐方式，可选值为 left center right
   */
  errorMessageAlign: defaultProps("errorMessageAlign", { type: String as PropType<FormErrorMessageAlign> }),
  /**
   * 是否在校验不通过时在输入框下方展示错误提示
   */
  showErrorMessage: defaultProps("showErrorMessage", { type: Boolean }),
  /**
   * 表单校验触发时机，可选值为 blur change submit 支持通过数组同时设置多个值
   */
  validateTrigger: defaultProps("validateTrigger", { type: [String, Array] as PropType<FormValidateTrigger | FormValidateTrigger[]> }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const formItemEmits = {
  submit: (values: Record<string, unknown>) => values,
  failed: (result: { values: Record<string, unknown>; errors: FormValidateError[] }) => result,
}

export type FormItemLabelAlign = "top" | "center" | "bottom"
export type FormItemContentAlign = "left" | "center" | "right"
export type FormItemEmits = typeof formItemEmits
export type FormItemProps = ExtractPropTypes<typeof formItemProps>
export type FormItemInstance = InstanceType<typeof FormItem>

/**
 * FormItem 提供给子组件的上下文类型
 * 用于表单验证触发
 */
export interface FormItemProvide {
  props: FormItemProps
  prop: string
  /** 触发 blur 验证 */
  onBlur: (value?: unknown) => void
  /** 触发 change 验证 */
  onChange: (value?: unknown) => void
}

export const formItemKey: InjectionKey<FormItemProvide> = Symbol("ui-form-item")
