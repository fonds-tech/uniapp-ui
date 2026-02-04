import type Watermark from "./ui-watermark.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/**
 * 水印内容类型
 */
export type WatermarkContent = string | string[]

/**
 * 字体粗细类型
 */
export type WatermarkFontWeight = "normal" | "light" | "bold" | number

const defaultProps = buildDefaultProps("watermark", {
  content: "",
  image: "",
  width: 120,
  height: 64,
  rotate: -22,
  zIndex: 100,
  fullPage: true,
  gapX: 24,
  gapY: 48,
  fontSize: 14,
  fontColor: "rgba(0, 0, 0, 0.15)",
  fontFamily: "PingFang SC, Microsoft YaHei, sans-serif",
  fontWeight: "normal",
  opacity: 1,
  customClass: "",
  customStyle: "",
})

export const watermarkProps = {
  /** 水印文字内容，支持字符串或字符串数组（多行） */
  content: defaultProps("content", { type: [String, Array] as PropType<WatermarkContent> }),
  /** 水印图片 URL，优先级高于文字 */
  image: defaultProps("image", { type: String }),
  /** 单个水印宽度（单位：px） */
  width: defaultProps("width", { type: [Number, String] }),
  /** 单个水印高度（单位：px） */
  height: defaultProps("height", { type: [Number, String] }),
  /** 水印旋转角度 */
  rotate: defaultProps("rotate", { type: Number }),
  /** 水印层级 */
  zIndex: defaultProps("zIndex", { type: Number }),
  /** 是否覆盖整个页面 */
  fullPage: defaultProps("fullPage", { type: Boolean }),
  /** 水印之间的水平间距（单位：px） */
  gapX: defaultProps("gapX", { type: [Number, String] }),
  /** 水印之间的垂直间距（单位：px） */
  gapY: defaultProps("gapY", { type: [Number, String] }),
  /** 字体大小（单位：px） */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 字体颜色 */
  fontColor: defaultProps("fontColor", { type: String }),
  /** 字体 */
  fontFamily: defaultProps("fontFamily", { type: String }),
  /** 字体粗细 */
  fontWeight: defaultProps("fontWeight", { type: [String, Number] as PropType<WatermarkFontWeight> }),
  /** 透明度 */
  opacity: defaultProps("opacity", { type: Number }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const watermarkEmits = {}

export type WatermarkEmits = typeof watermarkEmits
export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
export type WatermarkInstance = InstanceType<typeof Watermark>
