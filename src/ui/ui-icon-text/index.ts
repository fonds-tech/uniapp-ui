import type IconText from "./ui-icon-text.vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [iconTextProps, useIconTextProps] = createProps("iconText", {
  /**
   * 图标名称或者图片地址
   */
  name: makeStringProp(""),
  /**
   * 图标大小
   */
  size: makeNumericProp(""),
  /**
   * 图标颜色
   */
  color: makeStringProp(""),
  /**
   * 图标圆角
   */
  radius: makeNumericProp(""),
  /**
   * 图标粗细
   */
  weight: makeStringProp(""),
  /**
   * 文本内容
   */
  text: makeNumericProp(""),
  /**
   * 文本大小
   */
  textSize: makeNumericProp(""),
  /**
   * 文本颜色
   */
  textColor: makeStringProp(""),
  /**
   * 文本粗细
   */
  textWeight: makeStringProp(""),
  /**
   * 文本和图标的间隔
   */
  textGap: makeNumericProp(""),
  /**
   * 文本在图标左边
   */
  textLeft: Boolean,
  /**
   * 图标为图片时的宽度
   */
  width: makeNumericProp(""),
  /**
   * 图标为图片时的高度
   */
  height: makeNumericProp(""),
  /**
   * 图标为图片时的显示模式
   */
  imageMode: makeStringProp("scaleToFill"),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 自定义图标名称前缀
   */
  customPrefix: makeStringProp("ui-icon"),
  /**
   * 激活时的样式
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const iconTextEmits = {
  click: () => true,
}

export type IconTextEmits = typeof iconTextEmits
export interface IconTextExpose {
  name: "ui-icon-text"
}
export type IconTextInstance = InstanceType<typeof IconText>
