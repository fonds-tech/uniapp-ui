import type Text from "./ui-text.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildProps, makeStringProp, makeNumericProp } from "../utils/props"

export const textProps = buildProps("text", {
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
  align: makeNumericProp("left"),
  /**
   * 展示的行数
   */
  rows: makeNumericProp(Infinity),
  /**
   * 文本超出显示方式
   */
  overflow: makeStringProp("ellipsis"),
  /**
   * 文本修饰，可选值 underline、line-through
   */
  decoration: makeStringProp(""),
  /**
   * 文本行高
   */
  lineHeight: makeNumericProp(""),
  /**
   * 是否点击拨打电话
   */
  cell: Boolean,
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
   * 文本前缀
   */
  prefix: makeNumericProp(""),
  /**
   * 文本前缀大小
   */
  prefixSize: makeNumericProp(""),
  /**
   * 文本前缀颜色
   */
  prefixColor: makeStringProp(""),
  /**
   * 文本前缀粗细
   */
  prefixWeight: makeNumericProp(""),
  /**
   * 文本前缀与文本的间隔
   */
  prefixGutter: makeNumericProp(""),
  /**
   * 文本前缀修饰，可选值 underline、line-through
   */
  prefixDecoration: makeStringProp(""),
  /**
   * 文本后缀
   */
  suffix: makeNumericProp(""),
  /**
   * 文本后缀大小
   */
  suffixSize: makeNumericProp(""),
  /**
   * 文本后缀颜色
   */
  suffixColor: makeStringProp(""),
  /**
   * 文本后缀粗细
   */
  suffixWeight: makeNumericProp(""),
  /**
   * 文本后缀与文本的间隔
   */
  suffixGutter: makeNumericProp(""),
  /**
   * 文本后缀修饰，可选值 underline、line-through
   */
  suffixDecoration: makeStringProp(""),
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
