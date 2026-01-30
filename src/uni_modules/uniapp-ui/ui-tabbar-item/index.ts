import type TabbarItem from "./ui-tabbar-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("tabbar-item", {
  name: "",
  text: "",
  icon: "",
  activeIcon: "",
  iconSize: "48rpx",
  dot: false,
  badge: "",
  disabled: false,
  activeColor: "",
  inactiveColor: "",
  iconWeight: "",
  iconPrefix: "",
  route: "",
  routeParams: () => ({}),
  routeType: "switchTab",
  customClass: "",
  customStyle: "",
})

export const tabbarItemProps = {
  /**
   * 标签名称，作为匹配的标识符
   */
  name: defaultProps("name", { type: [Number, String] }),
  /**
   * 文字内容
   */
  text: defaultProps("text", { type: String }),
  /**
   * 图标名称或图片链接
   */
  icon: defaultProps("icon", { type: String }),
  /**
   * 激活时的图标
   */
  activeIcon: defaultProps("activeIcon", { type: String }),
  /**
   * 图标大小
   */
  iconSize: defaultProps("iconSize", { type: [Number, String] }),
  /**
   * 是否显示小红点
   */
  dot: defaultProps("dot", { type: Boolean }),
  /**
   * 徽标内容
   */
  badge: defaultProps("badge", { type: String }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 激活颜色
   */
  activeColor: defaultProps("activeColor", { type: String }),
  /**
   * 未激活颜色
   */
  inactiveColor: defaultProps("inactiveColor", { type: String }),
  /**
   * 图标粗细
   */
  iconWeight: defaultProps("iconWeight", { type: [Number, String] }),
  /**
   * 图标前缀
   */
  iconPrefix: defaultProps("iconPrefix", { type: String }),
  /**
   * 跳转路由
   */
  route: defaultProps("route", { type: String }),
  /**
   * 跳转参数
   */
  routeParams: defaultProps("routeParams", { type: Object }),
  /**
   * 跳转类型
   */
  routeType: defaultProps("routeType", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const tabbarItemEmits = {
  click: (name: string | number) => true,
}
export type TabbarItemEmits = typeof tabbarItemEmits
export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
export type TabbarItemInstance = InstanceType<typeof TabbarItem>
