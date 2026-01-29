import type Progress from "./ui-progress.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export type ProgressTextPosition = "inside" | "outside" | "none"

export const progressProps = {
  /**
   * 进度百分比 (0-100)
   */
  percentage: makeNumericProp(0),
  /**
   * 进度条填充色
   */
  color: makeStringProp(""),
  /**
   * 进度条轨道背景色
   */
  trackColor: makeStringProp(""),
  /**
   * 进度文本内容
   */
  text: makeStringProp(""),
  /**
   * 是否显示进度文本
   */
  showText: truthProp,
  /**
   * 文本位置
   * @default 'inside'
   */
  textPosition: makeStringProp<ProgressTextPosition>("inside"),
  /**
   * 进度文本颜色
   */
  textColor: makeStringProp(""),
  /**
   * 进度文本大小
   */
  textSize: makeNumericProp(""),
  /**
   * 进度文本粗细
   */
  textWeight: makeNumericProp(""),
  /**
   * 进度条的高度
   */
  height: makeNumericProp("28rpx"),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const progressEmits = {
  finish: () => true,
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export interface ProgressExpose {
  name: "ui-progress"
}
export type ProgressInstance = InstanceType<typeof Progress>
