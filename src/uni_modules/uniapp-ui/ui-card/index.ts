import type Card from "./ui-card.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, numericProp, makeStringProp } from "../utils/props"

/**
 * 阴影显示模式
 */
export type CardShadow = "always" | "hover" | "never"

/**
 * 图片填充模式
 */
export type CardThumbMode = "scaleToFill" | "aspectFit" | "aspectFill" | "widthFix" | "heightFix" | "top" | "bottom" | "center" | "left" | "right"

export const [cardProps, useCardProps] = createProps("card", {
  /**
   * 卡片标题
   */
  title: String,
  /**
   * 卡片描述/副标题
   */
  desc: String,
  /**
   * 封面图片地址
   */
  thumb: String,
  /**
   * 封面图片填充模式
   */
  thumbMode: makeStringProp<CardThumbMode>("aspectFill"),
  /**
   * 封面图片高度
   */
  thumbHeight: numericProp,
  /**
   * 是否显示边框
   */
  border: Boolean,
  /**
   * 阴影显示模式
   */
  shadow: makeStringProp<CardShadow>("always"),
  /**
   * 卡片圆角
   */
  radius: numericProp,
  /**
   * 卡片内边距
   */
  padding: numericProp,
  /**
   * 卡片背景颜色
   */
  background: String,
  /**
   * 标题颜色
   */
  titleColor: String,
  /**
   * 标题大小
   */
  titleSize: numericProp,
  /**
   * 标题字重
   */
  titleWeight: numericProp,
  /**
   * 描述颜色
   */
  descColor: String,
  /**
   * 描述大小
   */
  descSize: numericProp,
  /**
   * 是否可点击
   */
  clickable: Boolean,
  /**
   * 是否全宽（无外边距）
   */
  full: Boolean,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const cardEmits = {
  /**
   * 点击卡片时触发
   */
  click: () => true,
  /**
   * 点击封面时触发
   */
  clickThumb: () => true,
}

export type CardEmits = typeof cardEmits
export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = InstanceType<typeof Card>
