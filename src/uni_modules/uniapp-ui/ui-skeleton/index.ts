import type Skeleton from "./ui-skeleton.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp } from "../utils/props"

export const skeletonKey: InjectionKey<SkeletonProvide> = Symbol("ui-skeleton")
export const [skeletonProps, useSkeletonProps] = createProps("skeleton", {
  /**
   * 是否显示骨架屏，false 时显示插槽内容
   */
  loading: truthProp,
  /**
   * 是否开启动画
   */
  animate: truthProp,
  /**
   * 背景色
   */
  background: { type: String, default: "#ffffff" },
  /**
   * 子元素间距
   */
  gap: numericProp,
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
