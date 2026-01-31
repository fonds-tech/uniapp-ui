import type SkeletonImage from "./ui-skeleton-image.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("skeleton-image", {
  size: undefined,
  width: undefined,
  height: undefined,
  radius: undefined,
  square: false,
  customClass: undefined,
  customStyle: undefined,
})

export const skeletonImageProps = {
  /** 图片占位图大小 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 图片占位图宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 图片占位图高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 图片占位图圆角 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 图片占位图是否为方形 */
  square: defaultProps("square", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export type SkeletonImageProps = ExtractPropTypes<typeof skeletonImageProps>
export type SkeletonImageInstance = InstanceType<typeof SkeletonImage>
