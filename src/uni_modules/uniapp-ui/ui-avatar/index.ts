import type Avatar from "./ui-avatar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 头像形状类型 */
export type AvatarShape = "circle" | "square"

/** 头像尺寸类型 */
export type AvatarSize = "mini" | "small" | "medium" | "large" | string | number

/** 图片填充模式 */
export type AvatarFit = "contain" | "cover" | "fill" | "none" | "scale-down"

const defaultProps = buildDefaultProps("avatar", {
  src: "",
  size: "medium",
  shape: "circle",
  icon: "",
  iconColor: "",
  iconSize: "",
  text: "",
  textColor: "",
  textSize: "",
  alt: "",
  fit: "cover",
  background: "",
  borderColor: "",
  borderWidth: "",
  radius: "",
  lazyLoad: false,
  customClass: "",
  customStyle: "",
})

export const avatarProps = {
  /** 头像图片地址 */
  src: defaultProps("src", { type: String }),
  /** 头像尺寸，可选值为 mini/small/medium/large 或具体数值 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 头像形状，可选值为 circle/square */
  shape: defaultProps("shape", { type: String as PropType<AvatarShape> }),
  /** 图标名称，当无图片时显示 */
  icon: defaultProps("icon", { type: String }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 文字内容，当无图片和图标时显示 */
  text: defaultProps("text", { type: String }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文字大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 图片替代文字 */
  alt: defaultProps("alt", { type: String }),
  /** 图片填充模式 */
  fit: defaultProps("fit", { type: String as PropType<AvatarFit> }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 自定义圆角（仅 shape 为 square 时生效） */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 是否懒加载图片 */
  lazyLoad: defaultProps("lazyLoad", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const avatarEmits = {
  /** 点击头像时触发 */
  click: (event: any) => true,
  /** 图片加载成功时触发 */
  load: (event: any) => true,
  /** 图片加载失败时触发 */
  error: (event: any) => true,
}

export type AvatarEmits = typeof avatarEmits
export type AvatarProps = ExtractPropTypes<typeof avatarProps>
export type AvatarInstance = InstanceType<typeof Avatar>
