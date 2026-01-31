import type Empty from "./ui-empty.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("empty", {
  show: true,
  icon: "",
  text: "暂无数据~",
  textSize: "",
  textColor: "",
  textWeight: "",
  iconSize: "",
  iconColor: "",
  iconWeight: "",
  iconWidth: "",
  iconHeight: "",
  margin: "",
  padding: "",
  customClass: "",
  customStyle: "",
})

export const emptyProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 图标内容 */
  icon: defaultProps("icon", { type: String }),
  /** 文本内容 */
  text: defaultProps("text", { type: String }),
  /** 文本大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文本粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 图标宽度 */
  iconWidth: defaultProps("iconWidth", { type: [Number, String] }),
  /** 图标高度 */
  iconHeight: defaultProps("iconHeight", { type: [Number, String] }),
  /** 外边距 */
  margin: defaultProps("margin", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const emptyEmits = {}

export type EmptyEmits = typeof emptyEmits
export type EmptyProps = ExtractPropTypes<typeof emptyProps>

export interface EmptyExpose {
  name: "ui-empty"
}

export type EmptyInstance = InstanceType<typeof Empty>
