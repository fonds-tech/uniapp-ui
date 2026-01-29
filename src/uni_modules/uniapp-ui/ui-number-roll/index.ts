import type NumberRoll from "./ui-number-roll.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeNumberProp, makeStringProp, makeNumericProp } from "../utils/props"

export const numberRollProps = {
  /**
   * 数据值
   */
  value: makeNumericProp(0),
  /**
   * 字体颜色
   */
  color: makeStringProp(""),
  /**
   * 字体大小
   */
  fontSize: makeNumericProp(24),
  /**
   * 字体粗细
   */
  fontWeight: makeStringProp(""),
  /**
   * 去除0
   */
  trimZero: truthProp,
  /**
   * 千位分隔符
   */
  thousandsSep: makeStringProp(""),
  /**
   * 小数位数
   */
  decimalPlaces: makeNumberProp(2),
  /**
   * 过渡时间
   */
  duration: makeNumericProp(""),
  /**
   * 动画函数
   */
  timingFunction: makeStringProp(""),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const numberRollEmits = {}

export type NumberRollEmits = typeof numberRollEmits
export type NumberRollProps = ExtractPropTypes<typeof numberRollProps>
export interface NumberRollExpose {
  name: "ui-number-roll"
}
export type NumberRollInstance = InstanceType<typeof NumberRoll>
