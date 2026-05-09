import type Progress from "./ui-progress.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type ProgressTextPosition = "inside" | "outside" | "none"

const defaultProps = buildDefaultProps("progress", {
  percentage: 0,
  color: undefined,
  trackColor: undefined,
  text: "",
  showText: true,
  textPosition: "inside",
  textColor: undefined,
  textSize: undefined,
  textWeight: undefined,
  height: undefined,
  customClass: "",
  customStyle: "",
})

export const progressProps = {
  /** 进度百分比 (0-100) */
  percentage: defaultProps("percentage", { type: [Number, String] }),
  /** 进度条填充色 */
  color: defaultProps("color", { type: String }),
  /** 进度条轨道背景色 */
  trackColor: defaultProps("trackColor", { type: String }),
  /** 进度文本 (默认 `${percentage}%`) */
  text: defaultProps("text", { type: String }),
  /** 显示进度文本 */
  showText: defaultProps("showText", { type: Boolean }),
  /** 文本位置: inside 跟随 portion / outside 固定右侧 / none 不渲染 */
  textPosition: defaultProps("textPosition", { type: String as PropType<ProgressTextPosition> }),
  /** 进度文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 进度文本字号 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 进度文本字重 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 进度条高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const progressEmits = {
  /** 百分比由非 100 跨入 100 时触发一次 */
  finish: () => true,
}

export type ProgressEmits = typeof progressEmits
export type ProgressProps = ExtractPropTypes<typeof progressProps>
export type ProgressInstance = InstanceType<typeof Progress>
