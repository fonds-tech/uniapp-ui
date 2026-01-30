import type Loading from "./ui-loading.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("loading", {
  show: true,
  type: "circular",
  size: "32rpx",
  color: "#999999",
  text: undefined,
  textGap: "12rpx",
  textSize: undefined,
  textColor: undefined,
  textWeight: undefined,
  vertical: false,
  customClass: undefined,
  customStyle: undefined,
})

export const loadingProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 类型
   */
  type: defaultProps("type", { type: String as PropType<LoadingType> }),
  /**
   * 大小
   */
  size: defaultProps("size", { type: [Number, String] }),
  /**
   * 颜色
   */
  color: defaultProps("color", { type: String }),
  /**
   * 文本内容
   */
  text: defaultProps("text", { type: String }),
  /**
   * 文本和图标的间距
   */
  textGap: defaultProps("textGap", { type: [Number, String] }),
  /**
   * 文本大小
   */
  textSize: defaultProps("textSize", { type: [Number, String] }),
  /**
   * 文本颜色
   */
  textColor: defaultProps("textColor", { type: String }),
  /**
   * 文本粗细
   */
  textWeight: defaultProps("textWeight", { type: [Number, String] }),
  /**
   * 垂直布局
   */
  vertical: defaultProps("vertical", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const loadingEmits = {}

export type LoadingType = "circular" | "spinner"
export type LoadingEmits = typeof loadingEmits
export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingInstance = InstanceType<typeof Loading>
