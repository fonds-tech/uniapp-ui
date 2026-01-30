import type NumberRoll from "./ui-number-roll.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("number-roll", {
  value: 0,
  color: "",
  fontSize: 24,
  fontWeight: "",
  trimZero: true,
  thousandsSep: "",
  decimalPlaces: 2,
  duration: "",
  timingFunction: "",
  customClass: "",
  customStyle: "",
})

export const numberRollProps = {
  /**
   * 数据值
   */
  value: defaultProps("value", { type: [Number, String] }),
  /**
   * 字体颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 字体大小
   */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /**
   * 字体粗细
   */
  fontWeight: defaultProps("fontWeight", { type: String }),
  /**
   * 去除0
   */
  trimZero: defaultProps("trimZero", { type: Boolean }),
  /**
   * 千位分隔符
   */
  thousandsSep: defaultProps("thousandsSep", { type: String }),
  /**
   * 小数位数
   */
  decimalPlaces: defaultProps("decimalPlaces", { type: Number }),
  /**
   * 过渡时间
   */
  duration: defaultProps("duration", { type: [Number, String] }),
  /**
   * 动画函数
   */
  timingFunction: defaultProps("timingFunction", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const numberRollEmits = {}

export type NumberRollEmits = typeof numberRollEmits
export type NumberRollProps = ExtractPropTypes<typeof numberRollProps>
export interface NumberRollExpose {
  name: "ui-number-roll"
}
export type NumberRollInstance = InstanceType<typeof NumberRoll>
