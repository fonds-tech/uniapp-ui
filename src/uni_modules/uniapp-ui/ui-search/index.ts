import type Search from "./ui-search.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [searchProps, useSearchProps] = createProps("search", {
  // ==================== 基础属性 ====================
  /** 绑定值 */
  modelValue: makeStringProp(""),
  /** 占位文字 */
  placeholder: makeStringProp("请输入搜索关键词"),
  /** 输入框最大输入长度，-1 表示不限制 */
  maxlength: makeNumberProp(-1),
  /** 是否禁用输入框 */
  disabled: Boolean,
  /** 是否自动获得焦点 */
  focus: Boolean,
  /** 是否显示清除按钮（有内容时显示） */
  clearable: truthProp,

  // ==================== 尺寸与布局 ====================
  /** 输入框高度，支持 rpx/px 单位 */
  height: makeNumericProp("72rpx"),
  /** 外边距 */
  margin: makeNumericProp(""),
  /** 是否圆形搜索框 */
  round: Boolean,
  /** 圆角值，覆盖默认圆角 */
  radius: makeNumericProp(""),

  // ==================== 文字样式 ====================
  /** 输入文字颜色 */
  color: makeStringProp(""),
  /** 输入文字大小 */
  fontSize: makeNumericProp(""),
  /** 占位文字颜色 */
  placeholderColor: makeStringProp("#989898"),
  /** 输入框内容水平对齐方式 */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },

  // ==================== 外观样式 ====================
  /** 背景颜色 */
  background: makeStringProp(""),
  /** 边框样式，如 "1px solid #eee" */
  border: makeStringProp(""),

  // ==================== 搜索图标 ====================
  /** 搜索图标名称 */
  icon: makeStringProp("search"),
  /** 搜索图标大小（移动端建议 20px 以上） */
  iconSize: makeNumericProp("40rpx"),
  /** 搜索图标颜色 */
  iconColor: makeStringProp(""),
  /** 搜索图标粗细 */
  iconWeight: makeStringProp(""),

  // ==================== 清除图标 ====================
  /** 清除图标大小 */
  clearSize: makeNumericProp("32"),
  /** 清除图标颜色 */
  clearColor: makeStringProp(""),
  /** 清除图标粗细 */
  clearWeight: makeStringProp(""),

  // ==================== 右侧操作按钮 ====================
  /** 是否显示右侧操作按钮 */
  action: truthProp,
  /** 右侧操作按钮文字 */
  actionText: makeStringProp("搜索"),
  /** 右侧操作按钮文字大小 */
  actionSize: makeNumericProp(""),
  /** 右侧操作按钮文字颜色 */
  actionColor: makeStringProp(""),
  /** 右侧操作按钮文字粗细 */
  actionWeight: makeStringProp(""),

  // ==================== 自定义样式 ====================
  /** 自定义输入框样式 */
  inputStyle: styleProp,
  /** 自定义类名 */
  customClass: makeStringProp(""),
  /** 自定义根元素样式 */
  customStyle: styleProp,
})

export const searchEmits = {
  blur: (event: any) => true,
  focus: (event: any) => true,
  click: (event: any) => true,
  clear: (event: any) => true,
  action: (event: any) => true,
  search: (value: any) => true,
  change: (value: any) => true,
  "update:modelValue": (value: string) => true,
}

export const searchInputAlign = ["left", "center", "right"]

export type SearchShape = "round" | "square"
export type SearchInputAlign = "left" | "center" | "right"
export type SearchEmits = typeof searchEmits
export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = InstanceType<typeof Search>
