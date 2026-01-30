import type Progress from "./ui-progress.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type ProgressTextPosition = "inside" | "outside" | "none"

const defaultProps = buildDefaultProps("progress", {
  percentage: 0,
  color: "",
  trackColor: "",
  text: "",
  showText: true,
  textPosition: "inside",
  textColor: "",
  textSize: "",
  textWeight: "",
  height: "28rpx",
  customClass: "",
  customStyle: "",
})

export const progressProps = {
  /**
   * 进度百分比 (0-100)
   */
  percentage: defaultProps("percentage", { type: Number }),
  /**
   * 进度条填充色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 进度条轨道背景色
   */
  trackColor: defaultProps("trackColor", { type: String }),
  /**
   * 进度文本内容
   */
  text: defaultProps("text", { type: String }),
  /**
   * 是否显示进度文本
   */
  showText: defaultProps("showText", { type: Boolean }),
  /**
   * 文本位置
   * @default 'inside'
   */
  textPosition: defaultProps("textPosition", { type: String as PropType<ProgressTextPosition> }),
  /**
   * 进度文本颜色
   */
  textColor: defaultProps("textColor", { type: String }),
  /**
   * 进度文本大小
   */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /**
   * 进度文本粗细
   */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /**
   * 进度条的高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const progressEmits = {
  finish: () => true,
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
export interface ProgressExpose {
  name: "ui-progress"
}
export type ProgressInstance = InstanceType<typeof Progress>
