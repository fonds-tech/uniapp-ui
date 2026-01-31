import type Skeleton from "./ui-skeleton.vue"
import type { PropType, InjectionKey, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export const skeletonKey: InjectionKey<SkeletonProvide> = Symbol("ui-skeleton")

const defaultProps = buildDefaultProps("skeleton", {
  loading: true,
  animate: true,
  background: "#ffffff",
  gap: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const skeletonProps = {
  /** 是否显示骨架屏，false 时显示插槽内容 */
  loading: defaultProps("loading", { type: Boolean }),
  /** 是否开启动画 */
  animate: defaultProps("animate", { type: Boolean }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 子元素间距 */
  gap: defaultProps("gap", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export interface SkeletonProvide {
  props: SkeletonProps
}

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonInstance = InstanceType<typeof Skeleton>
