import type Footer from "./ui-footer.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("footer", {
  zIndex: "",
  offset: 0,
  background: "",
  safeAreaInsetBottom: true,
  customClass: "",
  customStyle: "",
})

export const footerProps = {
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 距离底部偏移 */
  offset: defaultProps("offset", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 是否开启底部安全区域 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const footerEmits = {
  /** 获取元素尺寸事件 */
  rect: (rect: UniApp.NodeInfo) => true,
  /** 高度变化事件 */
  height: (height: number) => true,
}

export type FooterEmits = typeof footerEmits
export type FooterProps = ExtractPropTypes<typeof footerProps>
export type FooterInstance = InstanceType<typeof Footer>
