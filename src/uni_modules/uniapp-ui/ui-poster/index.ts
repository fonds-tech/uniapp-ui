import type Poster from "./ui-poster.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 图片来源类型: 1 本地路径 (需平台支持) / 2 网络图片 / 3 base64 (App / 微信小程序 / H5) */
export type PosterImageType = 1 | 2 | 3

export interface PosterTextStyle {
  left: number
  top: number
  fontSize: number
  color: string
  baseLine?: "normal" | "top" | "middle" | "bottom"
  textAlign?: "left" | "center" | "right"
  width?: number
  rows?: number
  lineHeight?: number
  fontWeight?: string | number
  fontStyle?: string
  fontFamily?: string
  opacity?: number
  lineThrough?: boolean
  /** 前缀文字字号 (与 frontText 配合) */
  frontSize?: number
  /** 前缀文字与主文本间距 */
  spacing?: number
}

export interface PosterImageStyle {
  left: number
  top: number
  width: number
  height: number
  /** 单值=四角等圆角 / 数组=分别 [tl, tr, br, bl] */
  borderRadius?: number | number[]
  borderWidth?: number
  borderColor?: string
}

export interface PosterRectStyle {
  left: number
  top: number
  width: number
  height: number
  backgroundColor?: string
  /** 渐变终止色 (与 backgroundColor 配合) */
  gradientColor?: string
  /** 渐变方向: 1 横向 / 2 纵向 */
  gradientType?: 1 | 2
  borderRadius?: number | number[]
  borderWidth?: number
  borderColor?: string
  opacity?: number
  globalCompositeOperation?: string
  shadow?: { offsetX: number; offsetY: number; blur: number; color: string }
}

export interface PosterLineStyle {
  left: number
  top: number
  endLeft: number
  endTop: number
  color: string
  width?: number
  /** 虚线段长度数组，省略则实线 */
  lineDash?: number[]
}

export type PosterDrawItem =
  | { type: "text"; text: string; frontText?: string; style: PosterTextStyle }
  | { type: "image"; src: string; imgType: PosterImageType; style: PosterImageStyle }
  | { type: "rect"; style: PosterRectStyle }
  | { type: "line"; style: PosterLineStyle }

const defaultProps = buildDefaultProps("poster", {
  width: 700,
  height: 1100,
  pixel: 3,
})

export const posterProps = {
  /** 海报宽度 (rpx) */
  width: defaultProps("width", { type: [Number, String] }),
  /** 海报高度 (rpx) */
  height: defaultProps("height", { type: [Number, String] }),
  /** 像素比 (越高越清晰，体积越大；2 = 标清，3 = 高清) */
  pixel: defaultProps("pixel", { type: [Number, String] as PropType<number | string> }),
}

export const posterEmits = {
  /** canvas 上下文初始化完成 */
  ready: () => true,
}

export type PosterEmits = typeof posterEmits
export type PosterProps = ExtractPropTypes<typeof posterProps>
export type PosterInstance = InstanceType<typeof Poster>
