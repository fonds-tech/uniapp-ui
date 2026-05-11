import type TabbarItem from "./ui-tabbar-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

export type TabbarRouteType = "switchTab" | "navigateTo" | "redirectTo" | "reLaunch"

const defaultProps = buildDefaultProps("tabbar-item", {
  name: undefined,
  text: undefined,
  icon: undefined,
  activeIcon: undefined,
  iconSize: "48rpx",
  dot: false,
  badge: undefined,
  disabled: false,
  activeColor: undefined,
  inactiveColor: undefined,
  iconWeight: undefined,
  iconPrefix: undefined,
  route: undefined,
  routeParams: () => ({}),
  routeType: "switchTab",
  customClass: undefined,
  customStyle: undefined,
})

export const tabbarItemProps = {
  /** 标识符（匹配 ui-tabbar modelValue） */
  name: defaultProps("name", { type: [Number, String] }),
  /** 文字 */
  text: defaultProps("text", { type: String }),
  /** 图标名 或 图片链接 */
  icon: defaultProps("icon", { type: String }),
  /** 激活态图标 */
  activeIcon: defaultProps("activeIcon", { type: String }),
  /** 图标大小 */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /** 小红点 */
  dot: defaultProps("dot", { type: Boolean }),
  /** 徽标内容 */
  badge: defaultProps("badge", { type: String }),
  /** 禁用 */
  disabled: defaultProps("disabled", { type: Boolean }),
  /** 激活色（覆盖父级 activeColor） */
  activeColor: defaultProps("activeColor", { type: String }),
  /** 未激活色（覆盖父级 inactiveColor） */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /** 图标粗细 */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /** 图标自定义前缀 */
  iconPrefix: defaultProps("iconPrefix", { type: String }),
  /** 路由路径（父级 route=true 时必传） */
  route: defaultProps("route", { type: String }),
  /** 路由参数（routeType !== switchTab 时拼接 query） */
  routeParams: defaultProps("routeParams", { type: Object }),
  /** 跳转类型 */
  routeType: defaultProps("routeType", { type: String as PropType<TabbarRouteType> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const tabbarItemEmits = {
  click: (_name: string | number) => true,
}

export type TabbarItemEmits = typeof tabbarItemEmits
export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
export type TabbarItemInstance = InstanceType<typeof TabbarItem>
