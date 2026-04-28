import type Empty from "./ui-empty.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("empty", {
  show: true,
  icon: "",
  text: "暂无数据",
  textSize: "",
  textColor: "",
  textWeight: "",
  iconSize: "300rpx",
  iconColor: "",
  iconWeight: "",
  margin: "",
  padding: "",
  customClass: "",
  customStyle: "",
})

export const emptyProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 图标内容（含 / 或 . 视为图片 URL，否则视为 ui-icon 名；空走默认图） */
  icon: defaultProps("icon", { type: String }),
  /** 文本内容 */
  text: defaultProps("text", { type: String }),
  /** 文本大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文本颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文本粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 图标大小（image 模式下为宽度，高度由 widthFix 自适应） */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色（仅 ui-icon 模式生效） */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细（仅 ui-icon 模式生效） */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
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
