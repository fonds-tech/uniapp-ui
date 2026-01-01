import type TextEllipsis from "./ui-text-ellipsis.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [textEllipsisProps, useTextEllipsisProps] = createProps("textEllipsis", {
  /**
   * 文本内容
   */
  text: String,
  /**
   * 展示的行数
   */
  rows: makeNumericProp(2),
  /**
   * 省略号的文本内容
   */
  dots: makeStringProp("..."),
  /**
   * 文字颜色
   */
  color: String,
  /**
   * 文字粗细
   */
  weight: numericProp,
  /**
   * 文字行高
   */
  lineHeight: numericProp,
  /**
   * 字数偏移，当操作按钮显示不准确时，可以调整此值
   */
  offset: numericProp,
  /**
   * 展开操作的文案
   */
  expandText: makeStringProp("展开"),
  /**
   * 展开操作的文案颜色
   */
  expandTextColor: String,
  /**
   * 收起操作的文案
   */
  collapseText: makeStringProp("收起"),
  /**
   * 收起操作的文案颜色
   */
  collapseTextColor: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const textEllipsisEmits = {
  click: () => true,
}

export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>
export type TextEllipsisInstance = InstanceType<typeof TextEllipsis>
