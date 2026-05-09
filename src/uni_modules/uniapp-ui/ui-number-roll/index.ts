import type NumberRoll from "./ui-number-roll.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("number-roll", {
  value: 0,
  color: undefined,
  fontSize: undefined,
  fontWeight: undefined,
  trimZero: true,
  thousandsSep: "",
  decimalPlaces: 2,
  duration: undefined,
  timingFunction: undefined,
  customClass: "",
  customStyle: "",
})

export const numberRollProps = {
  /** 数字值 */
  value: defaultProps("value", { type: [Number, String] }),
  /** 文字颜色 */
  color: defaultProps("color", { type: String }),
  /** 字号 (同时决定行高) */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /** 字重 */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /** 去除小数末尾零 */
  trimZero: defaultProps("trimZero", { type: Boolean }),
  /** 千位分隔符 */
  thousandsSep: defaultProps("thousandsSep", { type: String }),
  /** 小数位数 */
  decimalPlaces: defaultProps("decimalPlaces", { type: Number }),
  /** 过渡时长 (ms 数字 / 带单位字符串) */
  duration: defaultProps("duration", { type: [Number, String] }),
  /** 缓动函数 */
  timingFunction: defaultProps("timingFunction", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export type NumberRollProps = ExtractPropTypes<typeof numberRollProps>
export type NumberRollInstance = InstanceType<typeof NumberRoll>
