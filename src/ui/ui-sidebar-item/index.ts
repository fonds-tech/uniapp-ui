import type SidebarItem from "./ui-sidebar-item.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildProps, numericProp, makeStringProp } from "../utils/props"

export const sidebarItemProps = buildProps("sidebarItem", {
  /**
   * 标识符
   */
  name: numericProp,
  /**
   * 标题
   */
  title: numericProp,
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 标题颜色
   */
  titleColor: String,
  /**
   * 标题大小
   */
  titleSize: numericProp,
  /**
   * 标题粗细
   */
  titleWeight: numericProp,
  /**
   * 文字对齐方式
   */
  titleAlign: makeStringProp("center"),
  /**
   * 标题激活颜色
   */
  activeTitleColor: String,
  /**
   * 标题激活大小
   */
  activeTitleSize: numericProp,
  /**
   * 标题激活粗细
   */
  activeTitleWeight: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 激活背景颜色
   */
  activeBackground: String,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

export const sidebarItemEmits = {}

export type SidebarItemEmits = typeof sidebarItemEmits
export type SidebarItemProps = ExtractPropTypes<typeof sidebarItemProps>
export type SidebarItemInstance = InstanceType<typeof SidebarItem>
