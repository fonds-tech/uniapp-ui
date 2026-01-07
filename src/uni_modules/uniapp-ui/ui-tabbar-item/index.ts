import type TabbarItem from "./ui-tabbar-item.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [tabbarItemProps, useTabbarItemProps] = createProps("tabbarItem", {
  /**
   * 标签名称，作为匹配的标识符
   */
  name: makeNumericProp(""),
  /**
   * 图标名称或图片链接
   */
  icon: makeStringProp(""),
  /**
   * 图标大小
   */
  iconSize: makeNumericProp("44rpx"),
  /**
   * 图标粗细
   */
  iconWeight: makeNumericProp(""),
  /**
   * 图标前缀
   */
  iconPrefix: makeStringProp(""),
  /**
   * 跳转路由
   */
  route: makeStringProp(""),
  /**
   * 跳转参数
   */
  routeParams: { type: Object, default: () => ({}) },
  /**
   * 跳转类型
   */
  routeType: makeStringProp("switchTab"),
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

export const tabbarItemEmits = {
  click: (name: string | number) => true,
}
export type TabbarItemEmits = typeof tabbarItemEmits
export type TabbarItemProps = ExtractPropTypes<typeof tabbarItemProps>
export type TabbarItemInstance = InstanceType<typeof TabbarItem>
