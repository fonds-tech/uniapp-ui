import type CountDown from "./ui-count-down.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("count-down", {
  time: 0,
  format: "HH:mm:ss",
  autoStart: true,
  millisecond: false,
  mode: "countdown",
  targetTime: 0,
  customClass: "",
  customStyle: "",
})

export const countDownProps = {
  /**
   * 倒计时时长，单位毫秒
   */
  time: defaultProps("time", { type: [Number, String] }),
  /**
   * 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
   */
  format: defaultProps("format", { type: String }),
  /**
   * 是否自动开始倒计时
   */
  autoStart: defaultProps("autoStart", { type: Boolean }),
  /**
   * 是否展示毫秒倒计时
   */
  millisecond: defaultProps("millisecond", { type: Boolean }),
  /**
   * 计时模式：countdown-倒计时，countup-正计时
   */
  mode: defaultProps("mode", { type: String as PropType<"countdown" | "countup"> }),
  /**
   * 目标时间戳（毫秒），设置后 time 属性将被忽略
   */
  targetTime: defaultProps("targetTime", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
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
