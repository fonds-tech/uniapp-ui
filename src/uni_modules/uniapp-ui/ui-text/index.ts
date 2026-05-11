import type Text from "./ui-text.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TextAlign = "left" | "center" | "right"
export type TextDecoration = "none" | "underline" | "line-through"

const defaultProps = buildDefaultProps("text", {
  text: undefined,
  size: undefined,
  color: undefined,
  weight: undefined,
  align: undefined,
  rows: 0,
  decoration: undefined,
  lineHeight: undefined,
  decode: false,
  clickable: false,
  selectable: false,
  customClass: undefined,
  customStyle: undefined,
})

export const textProps = {
  /** 文本内容 */
  text: defaultProps("text", { type: [Number, String] }),
  /** 文本大小 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 文本颜色 */
  color: defaultProps("color", { type: String }),
  /** 文本粗细 */
  weight: defaultProps("weight", { type: [Number, String] }),
  /** 对齐方式 */
  align: defaultProps("align", { type: String as PropType<TextAlign> }),
  /** 展示行数（0=不限；1=单行省略；>1=多行省略） */
  rows: defaultProps("rows", { type: [Number, String] }),
  /** 文本修饰 */
  decoration: defaultProps("decoration", { type: String as PropType<TextDecoration> }),
  /** 行高 */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /** uniapp text 组件 decode */
  decode: defaultProps("decode", { type: Boolean }),
  /** 可点击（点击 active 反馈） */
  clickable: defaultProps("clickable", { type: Boolean }),
  /** 可选中 */
  selectable: defaultProps("selectable", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const textEmits = {
  click: () => true,
}

export type TextEmits = typeof textEmits
export type TextProps = ExtractPropTypes<typeof textProps>
export type TextInstance = InstanceType<typeof Text>
