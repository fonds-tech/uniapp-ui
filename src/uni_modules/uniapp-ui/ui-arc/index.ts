import type Arc from "./ui-arc.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type ArcDirection = "top" | "bottom"

const defaultProps = buildDefaultProps("arc", {
  height: "130rpx",
  curvature: 120,
  direction: "bottom",
  background: undefined,
  top: undefined,
  left: undefined,
  fixed: false,
  zIndex: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const arcProps = {
  /**
   * 弧形高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 曲率（50-500），值越大弧度越平缓，值越小弧度越陡
   * @default 120
   */
  curvature: defaultProps("curvature", { type: Number }),
  /**
   * 弧形方向
   * @default 'bottom'
   */
  direction: defaultProps("direction", { type: String as PropType<ArcDirection> }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 顶部位置
   */
  top: defaultProps("top", { type: [Number, String] }),
  /**
   * 左边位置
   */
  left: defaultProps("left", { type: [Number, String] }),
  /**
   * 是否固定定位
   * @default false
   */
  fixed: defaultProps("fixed", { type: Boolean }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const arcEmits = {
  click: () => true,
}
export type ArcEmits = typeof arcEmits
export type ArcProps = ExtractPropTypes<typeof arcProps>
export type ArcInstance = InstanceType<typeof Arc>
