import type Header from "./ui-header.vue"
import type { ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, makeStringProp, makeNumericProp } from "../utils/props"

export const [headerProps, useHeaderProps] = createProps("header", {
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(""),
  /**
   * 距离顶部偏移
   */
  offset: makeNumericProp(0),
  /**
   * 背景色
   */
  background: makeStringProp(""),
  /**
   * 是否开启顶部安全区域适配
   */
  safeAreaInsetTop: { type: Boolean },
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})
export const headerEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
}

export type HeaderEmits = typeof headerEmits
export type HeaderProps = ExtractPropTypes<typeof headerProps>
export type HeaderInstance = InstanceType<typeof Header>
