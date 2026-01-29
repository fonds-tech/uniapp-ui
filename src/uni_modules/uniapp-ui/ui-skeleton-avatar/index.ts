import type SkeletonAvatar from "./ui-skeleton-avatar.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { numericProp, makeStringProp } from "../utils/props"

export const skeletonAvatarProps = {
  /**
   * 头像占位图大小
   */
  size: numericProp,
  /**
   * 头像占位图形状，可选值为 square
   */
  shape: makeStringProp<SkeletonAvatarShape>("round"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export type SkeletonAvatarShape = "round" | "square"
export type SkeletonAvatarProps = ExtractPropTypes<typeof skeletonAvatarProps>
export type SkeletonAvatarInstance = InstanceType<typeof SkeletonAvatar>
