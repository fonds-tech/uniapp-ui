import type Tag from "./ui-tag.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TagType = "primary" | "success" | "warning" | "danger" | "info"

const defaultProps = buildDefaultProps("tag", {
  show: true,
  type: "primary",
  text: undefined,
  textSize: undefined,
  textColor: undefined,
  textWeight: undefined,
  icon: undefined,
  iconSize: undefined,
  iconColor: undefined,
  iconWeight: undefined,
  round: false,
  plain: false,
  closeable: false,
  height: undefined,
  padding: undefined,
  background: undefined,
  borderColor: undefined,
  borderWidth: undefined,
  borderRadius: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const tagProps = {
  /** 显示控制 */
  show: defaultProps("show", { type: Boolean }),
  /** 主题类型 */
  type: defaultProps("type", {
    type: String as PropType<TagType>,
    validator: (v: string) => ["primary", "success", "warning", "danger", "info"].includes(v),
  }),
  /** 文字内容 */
  text: defaultProps("text", { type: String }),
  /** 文字大小 */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /** 文字颜色 */
  textColor: defaultProps("textColor", { type: String }),
  /** 文字粗细 */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /** 图标名 */
  icon: defaultProps("icon", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 图标颜色 */
  iconColor: defaultProps("iconColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 圆角胶囊 */
  round: defaultProps("round", { type: Boolean }),
  /** 镂空 */
  plain: defaultProps("plain", { type: Boolean }),
  /** 可关闭（显示关闭图标） */
  closeable: defaultProps("closeable", { type: Boolean }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 内边距 */
  padding: defaultProps("padding", { type: String }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 边框颜色 */
  borderColor: defaultProps("borderColor", { type: String }),
  /** 边框宽度 */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /** 圆角大小 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const tagEmits = {
  click: () => true,
  close: () => true,
  "update:show": (_show: boolean) => true,
}

export type TagEmits = typeof tagEmits
export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagInstance = InstanceType<typeof Tag>
