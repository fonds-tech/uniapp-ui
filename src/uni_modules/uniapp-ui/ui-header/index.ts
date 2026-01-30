import type Header from "./ui-header.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("header", {
  zIndex: "",
  offset: 0,
  background: "",
  safeAreaInsetTop: false,
  customClass: "",
  customStyle: "",
})

export const headerProps = {
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 距离顶部偏移
   */
  offset: defaultProps("offset", { type: [Number, String] }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 是否开启顶部安全区域适配
   */
  safeAreaInsetTop: defaultProps("safeAreaInsetTop", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", styleProp),
}
export const headerEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
}

export type HeaderEmits = typeof headerEmits
export type HeaderProps = ExtractPropTypes<typeof headerProps>
export type HeaderInstance = InstanceType<typeof Header>
