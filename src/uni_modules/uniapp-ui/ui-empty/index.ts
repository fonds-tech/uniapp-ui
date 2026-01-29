import type Empty from "./ui-empty.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const emptyProps = {
  /**
   * 是否显示
   */
  show: truthProp,
  /**
   * 图标内容
   */
  icon: makeStringProp(""),
  /**
   * 文本内容
   */
  text: makeStringProp("暂无数据~"),
  /**
   * 文本大小
   */
  textSize: makeNumericProp(""),
  /**
   * 文本颜色
   */
  textColor: makeStringProp(""),
  /**
   * 文本粗细
   */
  textWeight: makeNumericProp(""),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp(""),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 图标宽度
   */
  iconWidth: makeNumericProp(""),
  /**
   * 图标高度
   */
  iconHeight: makeNumericProp(""),
  /**
   * 外边距
   */
  margin: makeNumericProp(""),
  /**
   * 内边距
   */
  padding: makeNumericProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const emptyEmits = {}

export type EmptyEmits = typeof emptyEmits
export type EmptyProps = ExtractPropTypes<typeof emptyProps>

export interface EmptyExpose {
  name: "ui-empty"
}
export type EmptyInstance = InstanceType<typeof Empty>
