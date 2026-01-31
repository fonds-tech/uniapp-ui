import type Icon from "./ui-icon.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("icon", {
  name: "",
  size: "",
  color: "",
  radius: "",
  weight: "",
  width: "",
  height: "",
  lineHeight: "",
  imageMode: "scaleToFill",
  background: "",
  customPrefix: "ui-icon",
  customClass: "",
  hoverClass: "",
  customStyle: "",
})

export const iconProps = {
  /** 图标名称或者图片地址 */
  name: defaultProps("name", { type: [String, null] }),
  /** 图标大小 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 图标颜色 */
  color: defaultProps("color", { type: [String, null] }),
  /** 图标圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 图标粗细 */
  weight: defaultProps("weight", { type: [Number, String] }),
  /** 图标为图片时的宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 图标为图片时的高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 行高 */
  lineHeight: defaultProps("lineHeight", { type: [Number, String] }),
  /** 图标为图片时的显示模式 */
  imageMode: defaultProps("imageMode", {
    type: String,
    values: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "heightFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"],
  }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 自定义图标名称前缀 */
  customPrefix: defaultProps("customPrefix", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 悬停时附加的类名 */
  hoverClass: defaultProps("hoverClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const iconEmits = {
  /** 点击事件 */
  click: () => true,
}

export type IconEmits = typeof iconEmits
export type IconProps = ExtractPropTypes<typeof iconProps>

export interface IconExpose {
  name: "ui-icon"
}

export type IconInstance = InstanceType<typeof Icon>
