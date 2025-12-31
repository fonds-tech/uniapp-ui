import type Sticky from "./ui-sticky.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp, makeNumericProp } from "../utils/props"

export const stickyProps = buildProps("sticky", {
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 吸顶时距离顶部距离
   */
  offsetTop: makeNumericProp(0),
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
export const stickyEmits = {
  change: (sticky: boolean) => true,
}

export type StickyEmits = typeof stickyEmits
export type StickyProps = ExtractPropTypes<typeof stickyProps>
export type StickyInstance = InstanceType<typeof Sticky>
