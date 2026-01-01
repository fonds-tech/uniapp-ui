import type Text from "./ui-text.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [textProps, useTextProps] = createProps("text", {
  /**
   * 文本内容
   */
  text: makeNumericProp(""),
  /**
   * 文本大小
   */
  size: makeNumericProp(""),
  /**
   * 文本颜色
   */
  color: makeStringProp(""),
  /**
   * 文本粗细
   */
  weight: makeNumericProp(""),
  /**
   * 文本对齐方式，可选值 left、center、right
   */
  align: makeStringProp("left"),
  /**
   * 展示的行数，0 表示不限制
   */
  rows: makeNumericProp(0),
  /**
   * 文本修饰，可选值 underline、line-through
   */
  decoration: makeStringProp(""),
  /**
   * 文本行高
   */
  lineHeight: makeNumericProp(""),
  /**
   * 是否解码
   */
  decode: Boolean,
  /**
   * 是否可点击的，点击会有状态变化
   */
  clickable: Boolean,
  /**
   * 文本是否可选
   */
  selectable: Boolean,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const textEmits = {
  click: () => true,
}
export type TextEmits = typeof textEmits
export type TextProps = ExtractPropTypes<typeof textProps>
export type TextInstance = InstanceType<typeof Text>
