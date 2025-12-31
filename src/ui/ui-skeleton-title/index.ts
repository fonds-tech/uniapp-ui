import type SkeletonTitle from "./ui-skeleton-title.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp } from "../utils/props"

export const skeletonTitleProps = buildProps("skeletonTitle", {
  /**
   * 标题占位图宽度
   */
  width: numericProp,
  /**
   * 标题占位图高度
   */
  height: numericProp,
  /**
   * 标题占位图圆角
   */
  radius: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const skeletonTitleEmits = {}

export type SkeletonTitleEmits = typeof skeletonTitleEmits
export type SkeletonTitleProps = ExtractPropTypes<typeof skeletonTitleProps>
export type SkeletonTitleInstance = InstanceType<typeof SkeletonTitle>
