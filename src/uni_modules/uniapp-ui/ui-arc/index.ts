import type Arc from "./ui-arc.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export type ArcDirection = "top" | "bottom"

export const [arcProps, useArcProps] = createProps("arc", {
  /**
   * 弧形高度
   */
  height: makeNumericProp("130rpx"),
  /**
   * 曲率（100-500），值越大弧度越平缓，值越小弧度越陡
   * @default 120
   */
  curvature: makeNumericProp(120),
  /**
   * 弧形方向
   * @default 'bottom'
   */
  direction: makeStringProp<ArcDirection>("bottom"),
  /**
   * 背景色
   */
  background: String,
  /**
   * 顶部位置
   */
  top: numericProp,
  /**
   * 左边位置
   */
  left: numericProp,
  /**
   * 是否固定定位
   */
  fixed: Boolean,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const arcEmits = {
  click: () => true,
}
export type ArcEmits = typeof arcEmits
export type ArcProps = ExtractPropTypes<typeof arcProps>
export type ArcInstance = InstanceType<typeof Arc>
