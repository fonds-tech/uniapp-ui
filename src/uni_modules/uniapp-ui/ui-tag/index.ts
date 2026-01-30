import type Tag from "./ui-tag.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("tag", {
  show: true,
  type: "primary",
  text: "",
  textSize: "",
  textColor: "",
  textWeight: "",
  icon: "",
  iconSize: "",
  iconColor: "",
  iconWeight: "",
  round: false,
  plain: false,
  closeable: false,
  height: "",
  padding: "",
  background: "",
  borderColor: "",
  borderWidth: "",
  borderRadius: "",
  customClass: "",
  customStyle: "",
})

export const tagProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 主题类型
   */
  type: defaultProps("type", { type: String, validator: (v: string) => ["primary", "success", "warning", "danger", "info"].includes(v) }),
  /**
   * 标签的文字内容
   */
  text: defaultProps("text", { type: String }),
  /**
   * 标签的文字大小
   */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /**
   * 标签的文字颜色
   */
  textColor: defaultProps("textColor", { type: String }),
  /**
   * 标签的文字粗细
   */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /**
   * 图标名称
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 图标颜色
   */
  iconColor: defaultProps("iconColor", { type: String }),
  /**
   * 图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 是否圆形的
   */
  round: defaultProps("round", { type: Boolean }),
  /**
   * 是否镂空的
   */
  plain: defaultProps("plain", { type: Boolean }),
  /**
   * 是否为可关闭标签
   */
  closeable: defaultProps("closeable", { type: Boolean }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 内边距
   */
  padding: defaultProps("padding", { type: String }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 边框颜色
   */
  borderColor: defaultProps("borderColor", { type: String }),
  /**
   * 边框大小
   */
  borderWidth: defaultProps("borderWidth", { type: [Number, String] }),
  /**
   * 圆角大小
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const tagEmits = {
  click: () => true,
  close: () => true,
  "update:show": (show: boolean) => typeof show === "boolean",
}

export type TagEmits = typeof tagEmits
export type TagProps = ExtractPropTypes<typeof tagProps>
export type TagInstance = InstanceType<typeof Tag>
