import type BackTop from "./ui-back-top.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp, makeNumericProp } from "../utils/props"

export const backTopProps = buildProps("backTop", {
  /**
   * 滚动高度达到此参数值时才显示组件
   */
  offset: makeNumericProp("200rpx"),
  /**
   * 距离页面右侧的距离
   */
  right: numericProp,
  /**
   * 距离页面底部的距离
   */
  bottom: numericProp,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 返回顶部过程中的过渡时间，单位ms
   */
  duration: makeNumericProp("200"),
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 圆角值
   */
  borderRadius: numericProp,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const backTopEmits = {
  click: () => true,
}

export type BackTopEmits = typeof backTopEmits
export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopInstance = InstanceType<typeof BackTop>
