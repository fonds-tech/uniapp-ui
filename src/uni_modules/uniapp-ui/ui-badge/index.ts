import type Badge from "./ui-badge.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("badge", {
  value: undefined,
  dot: false,
  icon: undefined,
  color: undefined,
  dotSize: undefined,
  max: "99",
  showZero: false,
  height: undefined,
  radius: undefined,
  offset: undefined,
  zIndex: undefined,
  position: "top-right",
  valueSize: undefined,
  valueColor: undefined,
  valueWeight: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const badgeProps = {
  /** 内容值 */
  value: defaultProps("value", { type: [Number, String] }),
  /** 是否显示圆点 */
  dot: defaultProps("dot", { type: Boolean }),
  /** 图标名称 */
  icon: defaultProps("icon", { type: String }),
  /** 颜色 */
  color: defaultProps("color", { type: String }),
  /** 圆点大小 */
  dotSize: defaultProps("dotSize", { type: [Number, String] }),
  /** 最大值 */
  max: defaultProps("max", { type: [Number, String] }),
  /** 为零时是否显示 */
  showZero: defaultProps("showZero", { type: Boolean }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 圆角值 */
  radius: defaultProps("radius", { type: [Number, String] }),
  /** 位置偏移值 */
  offset: defaultProps("offset", { type: [String, Number, Array] }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 定位类型 */
  position: defaultProps("position", { type: String }),
  /** 字体大小 */
  valueSize: defaultProps("valueSize", { type: [Number, String] }),
  /** 字体颜色 */
  valueColor: defaultProps("valueColor", { type: String }),
  /** 字体粗细 */
  valueWeight: defaultProps("valueWeight", { type: [Number, String] }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const badgeEmits = {
  /** 点击事件 */
  click: () => true,
}

export type BadgeEmits = typeof badgeEmits
export type BadgeProps = ExtractPropTypes<typeof badgeProps>
export type BadgeInstance = InstanceType<typeof Badge>
