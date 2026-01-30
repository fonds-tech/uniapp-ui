import type Line from "./ui-line.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("line", {
  color: "",
  length: "100%",
  thickness: "2rpx",
  type: "solid",
  vertical: false,
  margin: "",
  customClass: "",
  customStyle: "",
})

export const lineProps = {
  /**
   * 线条颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 线条长度
   */
  length: defaultProps("length", { type: [Number, String] }),
  /**
   * 线条粗细
   */
  thickness: defaultProps("thickness", { type: [Number, String] }),
  /**
   * 线条类型 solid 实线 dashed 虚线 dotted 点线
   */
  type: defaultProps("type", { type: String }),
  /**
   * 是否为垂直线条，默认为水平线条
   */
  vertical: defaultProps("vertical", { type: Boolean }),
  /**
   * 外间距
   */
  margin: defaultProps("margin", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const lineEmits = {}

export type LineEmits = typeof lineEmits
export type LineProps = ExtractPropTypes<typeof lineProps>
export interface LineExpose {
  name: "ui-line"
}
export type LineInstance = InstanceType<typeof Line>
