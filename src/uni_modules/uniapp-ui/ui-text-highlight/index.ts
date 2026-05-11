import type TextHighlight from "./ui-text-highlight.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("text-highlight", {
  text: undefined,
  match: undefined,
  color: undefined,
  textRow: 2,
  fontSize: undefined,
  fontWeight: undefined,
  lineHeight: undefined,
  highlightColor: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const textHighlightProps = {
  /** 完整文本 */
  text: defaultProps("text", { type: String }),
  /** 需匹配高亮的子串 */
  match: defaultProps("match", { type: String }),
  /** 文本颜色 */
  color: defaultProps("color", { type: String }),
  /** 行数（line-clamp） */
  textRow: defaultProps("textRow", { type: [Number, String] }),
  /** 字号 */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 粗细 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 行高 */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /** 高亮文字颜色 */
  highlightColor: defaultProps("highlightColor", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const textHighlightEmits = {
  click: (_value: string | number) => true,
  clickMatch: (_value: string | number) => true,
}

export type TextHighlightEmits = typeof textHighlightEmits
export type TextHighlightProps = ExtractPropTypes<typeof textHighlightProps>
export type TextHighlightInstance = InstanceType<typeof TextHighlight>
