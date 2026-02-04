import type Card from "./ui-card.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

/** 阴影大小类型 */
export type CardShadow = "none" | "small" | "medium" | "large"

const defaultProps = buildDefaultProps("card", {
  title: undefined,
  desc: undefined,
  thumb: undefined,
  border: true,
  shadow: "small" as CardShadow,
  radius: undefined,
  padding: undefined,
  margin: undefined,
  thumbWidth: undefined,
  thumbHeight: undefined,
  thumbRadius: undefined,
  thumbMode: "aspectFill",
  background: undefined,
  titleSize: undefined,
  titleColor: undefined,
  titleWeight: undefined,
  descSize: undefined,
  descColor: undefined,
  descWeight: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const cardProps = {
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 描述/副标题 */
  desc: defaultProps("desc", { type: String }),
  /** 左侧图片 */
  thumb: defaultProps("thumb", { type: String }),
  /** 是否显示边框 */
  border: defaultProps("border", { type: Boolean }),
  /** 阴影大小 */
  shadow: defaultProps("shadow", { type: String as PropType<CardShadow> }),
  /** 圆角大小 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 外边距 */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 图片宽度 */
  thumbWidth: defaultProps("thumbWidth", { type: [Number, String] }),
  /** 图片高度 */
  thumbHeight: defaultProps("thumbHeight", { type: [Number, String] }),
  /** 图片圆角 */
  thumbRadius: defaultProps("thumbRadius", { type: [Number, String] }),
  /** 图片裁剪模式 */
  thumbMode: defaultProps("thumbMode", { type: String }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 标题字体大小 */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题字重 */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /** 描述字体大小 */
  descSize: defaultProps("descSize", { type: [Number, String] }),
  /** 描述颜色 */
  descColor: defaultProps("descColor", { type: String }),
  /** 描述字重 */
  descWeight: defaultProps("descWeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const cardEmits = {
  /** 点击卡片事件 */
  click: () => true,
  /** 点击图片事件 */
  clickThumb: () => true,
}

export type CardEmits = typeof cardEmits
export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardInstance = InstanceType<typeof Card>
