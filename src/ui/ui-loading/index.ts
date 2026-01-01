import type Loading from "./ui-loading.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [loadingProps, useLoadingProps] = createProps("loading", {
  /**
   * 是否显示
   */
  show: truthProp,
  /**
   * 类型
   */
  type: makeStringProp<LoadingType>("circular"),
  /**
   * 大小
   */
  size: makeNumericProp("32rpx"),
  /**
   * 颜色
   */
  color: makeStringProp("#999999"),
  /**
   * 文本内容
   */
  text: String,
  /**
   * 文本和图标的间距
   */
  textGap: makeNumericProp("12rpx"),
  /**
   * 文本大小
   */
  textSize: numericProp,
  /**
   * 文本颜色
   */
  textColor: String,
  /**
   * 文本粗细
   */
  textWeight: numericProp,
  /**
   * 垂直布局
   */
  vertical: Boolean,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const loadingEmits = {}

export type LoadingType = "circular" | "spinner"
export type LoadingEmits = typeof loadingEmits
export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingInstance = InstanceType<typeof Loading>
