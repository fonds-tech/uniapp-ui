import type TextHighlight from "./ui-text-highlight.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("text-highlight", {
  text: "",
  match: "",
  color: "",
  textRow: "2",
  fontSize: "",
  fontWeight: "",
  lineHeight: "",
  highlightColor: "",
  customClass: "",
  customStyle: "",
})

export const textHighlightProps = {
  /**
   * 文本内容
   */
  text: defaultProps("text", { type: String }),
  /**
   * 匹配文本内容
   */
  match: defaultProps("match", { type: String }),
  /**
   * 文本颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 文本行数
   */
  textRow: defaultProps("textRow", { type: [Number, String] }),
  /**
   * 文本大小
   */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /**
   * 文本粗细
   */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /**
   * 文本行高
   */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /**
   * 文本高亮颜色
   */
  highlightColor: defaultProps("highlightColor", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
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
