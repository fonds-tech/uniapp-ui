import type BackTop from "./ui-back-top.vue"
import type { TransitionName } from "../ui-transition"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const backTopProps = {
  /**
   * 页面滚动距离，可选。
   * - 不传：组件自动监听页面滚动事件
   * - 传入：使用外部传入的滚动位置
   */
  scrollTop: numericProp,
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
   * 图标名称
   */
  icon: makeStringProp("arrowup"),
  /**
   * 图标颜色
   */
  iconColor: makeStringProp("#fff"),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp("40rpx"),
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 按钮文字
   */
  text: makeStringProp(""),
  /**
   * 文字颜色
   */
  textColor: makeStringProp("#fff"),
  /**
   * 文字大小
   */
  textSize: makeNumericProp("20rpx"),
  /**
   * 文字粗细
   */
  textWeight: makeNumericProp(""),
  /**
   * 按钮尺寸（宽高相等）
   */
  size: makeNumericProp("80rpx"),
  /**
   * 按钮宽度（优先于 size）
   */
  width: numericProp,
  /**
   * 按钮高度（优先于 size）
   */
  height: numericProp,
  /**
   * 过渡动画类型
   */
  transition: { type: String as PropType<TransitionName>, default: "fade" },
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export const backTopEmits = {
  click: () => true,
}

export type BackTopEmits = typeof backTopEmits
export type BackTopProps = ExtractPropTypes<typeof backTopProps>
export type BackTopInstance = InstanceType<typeof BackTop>
