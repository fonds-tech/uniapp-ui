import type Footer from "./ui-footer.vue"
import type { ExtractPropTypes } from "vue"
import { styleProp, truthProp, makeStringProp, makeNumericProp } from "../utils/props"

export const footerProps = {
  /**
   * 元素层级
   */
  zIndex: makeNumericProp(""),
  /**
   * 距离底部偏移
   */
  offset: makeNumericProp(0),
  /**
   * 背景色
   */
  background: makeStringProp(""),
  /**
   * 是否开启底部安全区域
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 自定义类名
   */
  customClass: makeStringProp(""),
  /**
   * 自定义样式
   */
  customStyle: styleProp,
}
export const footerEmits = {
  rect: (rect: UniApp.NodeInfo) => true,
  height: (height: number) => true,
}

export type FooterEmits = typeof footerEmits
export type FooterProps = ExtractPropTypes<typeof footerProps>
export type FooterInstance = InstanceType<typeof Footer>
