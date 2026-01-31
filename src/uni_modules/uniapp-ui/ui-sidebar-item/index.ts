import type SidebarItem from "./ui-sidebar-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("sidebar-item", {
  name: undefined,
  title: undefined,
  height: undefined,
  disabled: false,
  dot: false,
  badge: undefined,
  titleColor: undefined,
  titleSize: undefined,
  titleWeight: undefined,
  titleAlign: "center",
  activeTitleColor: undefined,
  activeTitleSize: undefined,
  activeTitleWeight: undefined,
  background: undefined,
  activeBackground: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const sidebarItemProps = {
  /** 标识符 */
  name: defaultProps("name", { type: [Number, String] }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 是否禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 是否显示圆点徽标 */
  dot: defaultProps("dot", { type: Boolean }),
  /** 徽标内容 */
  badge: defaultProps("badge", { type: [Number, String] }),
  /** 标题颜色 */
  titleColor: defaultProps("titleColor", { type: String }),
  /** 标题大小 */
  titleSize: defaultProps("titleSize", { type: [Number, String] }),
  /** 标题粗细 */
  titleWeight: defaultProps("titleWeight", { type: [Number, String] }),
  /** 文字对齐方式 */
  titleAlign: defaultProps("titleAlign", { type: String }),
  /** 标题激活颜色 */
  activeTitleColor: defaultProps("activeTitleColor", { type: String }),
  /** 标题激活大小 */
  activeTitleSize: defaultProps("activeTitleSize", { type: [Number, String] }),
  /** 标题激活粗细 */
  activeTitleWeight: defaultProps("activeTitleWeight", { type: [Number, String] }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 激活背景颜色 */
  activeBackground: defaultProps("activeBackground", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const sidebarItemEmits = {}

export type SidebarItemEmits = typeof sidebarItemEmits
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
export type SidebarItemInstance = InstanceType<typeof SidebarItem>
