import type Line from "./ui-line.vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [lineProps, useLineProps] = createProps("line", {
  /**
   * 线条颜色
   */
  color: makeStringProp(""),
  /**
   * 线条长度
   */
  length: makeNumericProp("100%"),
  /**
   * 线条粗细
   */
  thickness: makeNumericProp("2rpx"),
  /**
   * 线条类型 solid 实线 dashed 虚线 dotted 点线
   */
  type: makeStringProp("solid"),
  /**
   * 是否为垂直线条，默认为水平线条
   */
  vertical: Boolean,
  /**
   * 外间距
   */
  margin: makeNumericProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const lineEmits = {}

export type LineEmits = typeof lineEmits
export interface LineExpose {
  name: "ui-line"
}
export type LineInstance = InstanceType<typeof Line>
