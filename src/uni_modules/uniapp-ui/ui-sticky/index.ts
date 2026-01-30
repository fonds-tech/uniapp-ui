import type Sticky from "./ui-sticky.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("sticky", {
  zIndex: undefined,
  offsetTop: 0,
  disabled: false,
  background: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const stickyProps = {
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 吸顶时距离顶部距离
   */
  offsetTop: defaultProps("offsetTop", { type: [Number, String] }),
  /**
   * 是否禁用粘性效果
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 背景色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const stickyEmits = {
  change: (sticky: boolean) => true,
  scroll: (data: { scrollTop: number; isFixed: boolean }) => true,
}

export type StickyEmits = typeof stickyEmits
export type StickyProps = ExtractPropTypes<typeof stickyProps>
export type StickyInstance = InstanceType<typeof Sticky>
