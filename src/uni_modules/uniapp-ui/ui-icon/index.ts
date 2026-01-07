import type Icon from "./ui-icon.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [iconProps, useIconProps] = createProps("icon", {
  /**
   * 图标名称或者图片地址
   */
  name: { type: [String, null], default: "" },
  /**
   * 图标大小
   */
  size: makeNumericProp(""),
  /**
   * 图标颜色
   */
  color: { type: [String, null], default: "" },
  /**
   * 图标圆角
   */
  radius: makeNumericProp(""),
  /**
   * 图标粗细
   */
  weight: makeNumericProp(""),
  /**
   * 图标为图片时的宽度
   */
  width: makeNumericProp(""),
  /**
   * 图标为图片时的高度
   */
  height: makeNumericProp(""),
  /**
   * 行高
   */
  lineHeight: makeNumericProp(""),
  /**
   * 图标为图片时的显示模式
   */
  imageMode: {
    type: String,
    default: "scaleToFill",
    values: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "heightFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"],
  },
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 自定义图标名称前缀
   */
  customPrefix: makeStringProp("ui-icon"),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const iconEmits = {
  click: () => true,
}

export type IconEmits = typeof iconEmits
export type IconProps = ExtractPropTypes<typeof iconProps>
export interface IconExpose {
  name: "ui-icon"
}
export type IconInstance = InstanceType<typeof Icon>
