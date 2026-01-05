import type Avatar from "./ui-avatar.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

/**
 * 头像形状类型
 */
export type AvatarShape = "circle" | "square"

/**
 * 头像尺寸类型
 */
export type AvatarSize = "mini" | "small" | "medium" | "large" | string | number

/**
 * 图片填充模式
 */
export type AvatarFit = "contain" | "cover" | "fill" | "none" | "scale-down"

export const [avatarProps, useAvatarProps] = createProps("avatar", {
  /**
   * 头像图片地址
   */
  src: makeStringProp(""),
  /**
   * 头像尺寸，可选值为 mini/small/medium/large 或具体数值
   */
  size: makeNumericProp<AvatarSize>("medium"),
  /**
   * 头像形状，可选值为 circle/square
   */
  shape: makeStringProp<AvatarShape>("circle"),
  /**
   * 图标名称，当无图片时显示
   */
  icon: makeStringProp(""),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp(""),
  /**
   * 文字内容，当无图片和图标时显示
   */
  text: makeStringProp(""),
  /**
   * 文字颜色
   */
  textColor: makeStringProp(""),
  /**
   * 文字大小
   */
  textSize: makeNumericProp(""),
  /**
   * 图片替代文字
   */
  alt: makeStringProp(""),
  /**
   * 图片填充模式
   */
  fit: makeStringProp<AvatarFit>("cover"),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 边框颜色
   */
  borderColor: makeStringProp(""),
  /**
   * 边框宽度
   */
  borderWidth: makeNumericProp(""),
  /**
   * 自定义圆角（仅 shape 为 square 时生效）
   */
  radius: makeNumericProp(""),
  /**
   * 是否懒加载图片
   */
  lazyLoad: Boolean,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const avatarEmits = {
  /**
   * 点击头像时触发
   */
  click: (event: any) => true,
  /**
   * 图片加载成功时触发
   */
  load: (event: any) => true,
  /**
   * 图片加载失败时触发
   */
  error: (event: any) => true,
}

export type AvatarEmits = typeof avatarEmits
export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarInstance = InstanceType<typeof Avatar>
