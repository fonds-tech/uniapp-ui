import type IndexAnchor from "./ui-index-anchor.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [indexAnchorProps, useIndexAnchorProps] = createProps("indexAnchor", {
  /**
   * 索引名称，作为匹配的标识符
   */
  name: makeNumericProp(""),
  /**
   * 索引字符
   */
  text: makeNumericProp(""),
  /**
   * 字符颜色
   */
  color: makeStringProp(""),
  /**
   * 高度
   */
  height: makeNumericProp(""),
  /**
   * 字符大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 字符粗细
   */
  fontWeight: makeNumericProp(""),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 吸顶时字符颜色
   */
  stickyColor: makeStringProp(""),
  /**
   * 吸顶时字符大小
   */
  stickyFontSize: makeNumericProp(""),
  /**
   * 吸顶时字符粗细
   */
  stickyFontWeight: makeNumericProp(""),
  /**
   * 吸顶时背景颜色
   */
  stickyBackground: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const indexAnchorEmits = {
  blur: () => true,
}

export type IndexAnchorEmits = typeof indexAnchorEmits
export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
export type IndexAnchorInstance = InstanceType<typeof IndexAnchor>
