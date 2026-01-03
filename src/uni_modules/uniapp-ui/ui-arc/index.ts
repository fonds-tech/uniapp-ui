import type Arc from "./ui-arc.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeNumericProp } from "../utils/props"

export const [arcProps, useArcProps] = createProps("arc", {
  /**
   * 弧形高度
   */
  height: makeNumericProp("130rpx"),
  /**
   * 圆弧半径
   */
  percent: makeNumericProp(120),
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
  fixed: truthProp,
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
