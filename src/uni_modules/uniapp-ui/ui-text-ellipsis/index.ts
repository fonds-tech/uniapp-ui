import type TextEllipsis from "./ui-text-ellipsis.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const textEllipsisProps = {
  /**
   * 文本内容
   */
  content: makeStringProp(""),
  /**
   * 展示的行数
   */
  rows: makeNumericProp(3),
  /**
   * 展开操作的文案
   */
  expandText: makeStringProp("展开"),
  /**
   * 收起操作的文案
   */
  collapseText: makeStringProp("收起"),
  /**
   * 省略号的文本
   */
  dots: makeStringProp("..."),
  /**
   * 文本颜色
   */
  color: String,
  /**
   * 文本大小
   */
  fontSize: numericProp,
  /**
   * 行高
   */
  lineHeight: numericProp,
  /**
   * 操作按钮颜色
   */
  actionColor: String,
  /**
   * 渐变遮罩颜色
   */
  gradientColor: makeStringProp("#ffffff"),
  /**
   * 是否显示操作按钮
   */
  showAction: truthProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export const textEllipsisEmits = {
  change: (expanded: boolean) => true,
  click: (event: Event) => true,
}

export type TextEllipsisEmits = typeof textEllipsisEmits
export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>
export type TextEllipsisInstance = InstanceType<typeof TextEllipsis>
