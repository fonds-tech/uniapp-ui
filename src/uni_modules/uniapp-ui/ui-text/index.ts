import type Text from "./ui-text.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("text", {
  text: "",
  size: "",
  color: "",
  weight: "",
  align: "left",
  rows: 0,
  decoration: "",
  lineHeight: "",
  decode: false,
  clickable: false,
  selectable: false,
  customClass: "",
  customStyle: "",
})

export const textProps = {
  /**
   * 文本内容
   */
  text: defaultProps("text", { type: [Number, String] }),
  /**
   * 文本大小
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 文本颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 文本粗细
   */
  weight: defaultProps("weight", { type: [Number, String] }),
  /**
   * 文本对齐方式，可选值 left、center、right
   */
  align: defaultProps("align", { type: String }),
  /**
   * 展示的行数，0 表示不限制
   */
  rows: defaultProps("rows", { type: [Number, String] }),
  /**
   * 文本修饰，可选值 underline、line-through
   */
  decoration: defaultProps("decoration", { type: String }),
  /**
   * 文本行高
   */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /**
   * 是否解码
   */
  decode: defaultProps("decode", { type: Boolean }),
  /**
   * 是否可点击的，点击会有状态变化
   */
  clickable: defaultProps("clickable", { type: Boolean }),
  /**
   * 文本是否可选
   */
  selectable: defaultProps("selectable", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const textEmits = {
  click: () => true,
}
export type TextEmits = typeof textEmits
export type TextProps = ExtractPropTypes<typeof textProps>
export type TextInstance = InstanceType<typeof Text>
