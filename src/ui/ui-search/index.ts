import type Search from "./ui-search.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, buildProps, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const searchProps = buildProps("search", {
  /**
   * 绑定值
   */
  modelValue: makeStringProp(""),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 占位文字
   */
  placeholder: makeStringProp("请输入搜索关键词"),
  /**
   * 占位文字颜色
   */
  placeholderColor: makeStringProp("#989898"),
  /**
   * 是否启用输入框
   */
  disabled: Boolean,
  /**
   * 是否启用清除控件
   */
  clearabled: truthProp,
  /**
   * 输入框最大能输入的长度
   */
  maxlength: makeNumberProp(-1),
  /**
   * 输入框高度
   */
  height: makeNumericProp("68rpx"),
  /**
   * 外边距
   */
  margin: makeNumericProp(""),
  /**
   * 是否圆形搜索框
   */
  round: Boolean,
  /**
   * 颜色
   */
  color: makeStringProp(""),
  /**
   * 是否自动获得焦点
   */
  focus: Boolean,
  /**
   * 边框
   */
  border: makeStringProp(""),
  /**
   * 圆角值
   */
  radius: makeNumericProp(""),
  /**
   * 搜索框字体大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 搜索图标
   */
  icon: makeStringProp("search"),
  /**
   * 搜索图标大小
   */
  iconSize: makeNumericProp("32rpx"),
  /**
   * 搜索图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 搜索图标大小
   */
  iconWeight: makeStringProp(""),
  /**
   * 是否显示右侧控件(右侧的"搜索"按钮)
   */
  action: truthProp,
  /**
   * 右侧控件文字
   */
  actionText: makeStringProp("搜索"),
  /**
   * 右侧控件文字大小
   */
  actionSize: makeNumericProp(""),
  /**
   * 右侧控件文字颜色
   */
  actionColor: makeStringProp("#333"),
  /**
   * 右侧控件文字大小
   */
  actionWeight: makeStringProp(""),
  /**
   * 输入框内容水平对齐方式
   */
  inputAlign: { type: String, default: "left", validator: (v: string) => ["left", "center", "right"].includes(v) },
  /**
   * 自定义输入框样式，对象形式
   */
  inputStyle: styleProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const searchEmits = {
  blur: (event: any) => true,
  focus: (event: any) => true,
  click: (event: any) => true,
  cancel: () => true,
  clear: (event: any) => true,
  action: (event: any) => true,
  search: (value: string) => true,
  change: (value: string) => true,
  "update:modelValue": (value: string) => true,
}

export const searchInputAlign = ["left", "center", "right"]

export type SearchShape = "round" | "square"
export type SearchInputAlign = "left" | "center" | "right"
export type SearchEmits = typeof searchEmits
export type SearchProps = ExtractPropTypes<typeof searchProps>
export type SearchInstance = InstanceType<typeof Search>
