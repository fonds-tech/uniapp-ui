import type CountDown from "./ui-count-down.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const countDownProps = {
  /**
   * 倒计时时长，单位毫秒
   */
  time: makeNumericProp(0),
  /**
   * 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
   */
  format: makeStringProp("HH:mm:ss"),
  /**
   * 是否自动开始倒计时
   */
  autoStart: truthProp,
  /**
   * 是否展示毫秒倒计时
   */
  millisecond: Boolean,
  /**
   * 计时模式：countdown-倒计时，countup-正计时
   */
  mode: makeStringProp<"countdown" | "countup">("countdown"),
  /**
   * 目标时间戳（毫秒），设置后 time 属性将被忽略
   */
  targetTime: makeNumericProp(0),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const countDownEmits = {
  finish: () => true,
  change: (value: CountDownTimeData) => true,
}

export interface CountDownTimeData {
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  /** 初始总时间（毫秒） */
  total: number
  /** 当前剩余/已过时间（毫秒） */
  current: number
}
export type CountDownProps = ExtractPropTypes<typeof countDownProps>
export interface CountDownExpose {
  start: () => void
  reset: () => void
  pause: () => void
}
export type CountDownInstance = InstanceType<typeof CountDown>
