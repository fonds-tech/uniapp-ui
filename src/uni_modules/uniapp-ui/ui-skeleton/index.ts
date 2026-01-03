import type Skeleton from "./ui-skeleton.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp } from "../utils/props"
import { createProps } from "../hooks"

export const skeletonKey: InjectionKey<SkeletonProvide> = Symbol("ui-skeleton")
export const [skeletonProps, useSkeletonProps] = createProps("skeleton", {
  /**
   * 是否开启动画
   */
  animate: truthProp,
  /**
   * 背景色
   */
  background: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export interface SkeletonProvide {
  props: SkeletonProps
}
export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonInstance = InstanceType<typeof Skeleton>
