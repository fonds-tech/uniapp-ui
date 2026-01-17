import type SkeletonImage from "./ui-skeleton-image.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp } from "../utils/props"

export const [skeletonImageProps, useSkeletonImageProps] = createProps("skeletonImage", {
  /**
   * 图片占位图大小
   */
  size: numericProp,
  /**
   * 图片占位图宽度
   */
  width: numericProp,
  /**
   * 图片占位图高度
   */
  height: numericProp,
  /**
   * 图片占位图圆角
   */
  radius: numericProp,
  /**
   * 图片占位图是否为方形
   */
  square: Boolean,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export type SkeletonImageProps = ExtractPropTypes<typeof skeletonImageProps>
export type SkeletonImageInstance = InstanceType<typeof SkeletonImage>
