import type TextHighlight from "./ui-text-highlight.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const textHighlightProps = {
  /**
   * 文本内容
   */
  text: makeStringProp(""),
  /**
   * 匹配文本内容
   */
  match: makeStringProp(""),
  /**
   * 文本颜色
   */
  color: makeStringProp(""),
  /**
   * 文本行数
   */
  textRow: makeNumericProp("2"),
  /**
   * 文本大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 文本粗细
   */
  fontWeight: makeNumericProp(""),
  /**
   * 文本行高
   */
  lineHeight: makeNumericProp(""),
  /**
   * 文本高亮颜色
   */
  highlightColor: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const textHighlightEmits = {
  click: (value: string | number) => true,
  clickMatch: (value: string | number) => true,
}

export type TextHighlightEmits = typeof textHighlightEmits
export type TextHighlightProps = ExtractPropTypes<typeof textHighlightProps>
export interface TextHighlightExpose {
  name: "ui-text-highlight"
  match: () => void
}
export type TextHighlightInstance = InstanceType<typeof TextHighlight>
