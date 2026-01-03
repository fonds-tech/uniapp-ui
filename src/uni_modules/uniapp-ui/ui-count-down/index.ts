import type CountDown from "./ui-count-down.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [countDownProps, useCountDownProps] = createProps("countDown", {
  /**
   * 倒计时时长，单位毫秒
   */
  time: makeNumericProp(""),
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
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

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
}
export type CountDownProps = ExtractPropTypes<typeof countDownProps>
export interface CountDownExpose {
  name: "ui-count-down"
}
export type CountDownInstance = InstanceType<typeof CountDown>
