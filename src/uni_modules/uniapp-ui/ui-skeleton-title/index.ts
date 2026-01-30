import type SkeletonTitle from "./ui-skeleton-title.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("skeleton-title", {
  width: undefined,
  height: undefined,
  radius: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const skeletonTitleProps = {
  /**
   * 标题占位图宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 标题占位图高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 标题占位图圆角
   */
  radius: defaultProps("radius", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export type SkeletonTitleProps = ExtractPropTypes<typeof skeletonTitleProps>
export type SkeletonTitleInstance = InstanceType<typeof SkeletonTitle>
