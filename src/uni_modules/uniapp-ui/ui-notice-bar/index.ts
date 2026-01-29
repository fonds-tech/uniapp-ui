import type NoticeBar from "./ui-notice-bar.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const noticeBarProps = {
  /**
   * 显示内容，vertical 垂直模式时要求内容为数组
   */
  text: { type: [String, Array], default: "" },
  /**
   * 滚动模式
   */
  mode: { type: String as PropType<NoticeBarMode>, default: "horizontal", validator: (v: string) => ["vertical", "horizontal"].includes(v) },
  /**
   * 内容文本颜色
   */
  color: makeStringProp(""),
  /**
   * 滚动速率(px/s)
   */
  speed: makeNumberProp(60),
  /**
   * 垂直滚动时自动切换时间间隔
   */
  interval: makeNumberProp(3000),
  /**
   * 垂直滚动时滑动动画时长
   */
  duration: makeNumberProp(500),
  /**
   * 是否开启滚动
   */
  scrollable: truthProp,
  /**
   * 最小高度
   */
  minHeight: makeNumericProp("72rpx"),
  /**
   * 内容文本大小
   */
  fontSize: makeNumericProp(""),
  /**
   * 内容文本粗细
   */
  fontWeight: makeNumericProp(""),
  /**
   * 左侧图标名称
   */
  icon: { type: [String], default: "sound" },
  /**
   * 左侧图标大小
   */
  iconSize: makeNumericProp(""),
  /**
   * 左侧图标颜色
   */
  iconColor: makeStringProp("warning"),
  /**
   * 左侧图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 右侧图标名称
   */
  rightIcon: { type: [String], default: "" },
  /**
   * 右侧图标大小
   */
  rightIconSize: makeNumericProp(""),
  /**
   * 右侧图标颜色
   */
  rightIconColor: makeStringProp("warning"),
  /**
   * 右侧图标粗细
   */
  rightIconWeight: makeNumericProp(""),
  /**
   * 背景颜色
   */
  background: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const noticeBarEmits = {
  click: (index: number) => true,
}

export type NoticeBarMode = "vertical" | "horizontal"
export type NoticeBarProps = ExtractPropTypes<typeof noticeBarProps>
export interface NoticeBarExpose {
  name: "ui-notice-bar"
}
export type NoticeBarInstance = InstanceType<typeof NoticeBar>
