import type SkeletonAvatar from "./ui-skeleton-avatar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("skeleton-avatar", {
  size: undefined,
  shape: "round",
  customClass: undefined,
  customStyle: undefined,
})

export const skeletonAvatarProps = {
  /** 头像占位图尺寸 */
  size: defaultProps("size", { type: [Number, String] }),
  /** 头像占位图形状，round 圆形 / square 方形圆角 */
  shape: defaultProps("shape", { type: String as PropType<SkeletonAvatarShape> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export type SkeletonAvatarShape = "round" | "square"
export type SkeletonAvatarProps = ExtractPropTypes<typeof skeletonAvatarProps>
export type SkeletonAvatarInstance = InstanceType<typeof SkeletonAvatar>
