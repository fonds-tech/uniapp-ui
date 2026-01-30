import type IndexAnchor from "./ui-index-anchor.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("index-anchor", {
  name: "",
  text: "",
  color: "",
  height: "",
  fontSize: "",
  fontWeight: "",
  background: "",
  stickyColor: "",
  stickyFontSize: "",
  stickyFontWeight: "",
  stickyBackground: "",
  customClass: "",
  customStyle: "",
})

export const indexAnchorProps = {
  /**
   * 索引名称，作为匹配的标识符
   */
  name: defaultProps("name", { type: [Number, String] }),
  /**
   * 索引字符
   */
  text: defaultProps("text", { type: [Number, String] }),
  /**
   * 字符颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 字符大小
   */
  fontSize: defaultProps("fontSize", { type: [Number, String] }),
  /**
   * 字符粗细
   */
  fontWeight: defaultProps("fontWeight", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 吸顶时字符颜色
   */
  stickyColor: defaultProps("stickyColor", { type: String }),
  /**
   * 吸顶时字符大小
   */
  stickyFontSize: defaultProps("stickyFontSize", { type: [Number, String] }),
  /**
   * 吸顶时字符粗细
   */
  stickyFontWeight: defaultProps("stickyFontWeight", { type: [Number, String] }),
  /**
   * 吸顶时背景颜色
   */
  stickyBackground: defaultProps("stickyBackground", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const indexAnchorEmits = {
  blur: () => true,
}

export type IndexAnchorEmits = typeof indexAnchorEmits
export type IndexAnchorProps = ExtractPropTypes<typeof indexAnchorProps>
export type IndexAnchorInstance = InstanceType<typeof IndexAnchor>
