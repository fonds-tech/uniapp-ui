import type Overlay from "./ui-overlay.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { isBoolean } from "../utils/check"
import { truthProp, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const overlayProps = {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 透明度
   */
  opacity: makeNumericProp(0.7),
  /**
   * 过渡时间
   */
  duration: makeNumericProp(300),
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: truthProp,
  /**
   * 进入动画函数
   */
  enterTimingFunction: makeStringProp("ease-out"),
  /**
   * 离开动画函数
   */
  leaveTimingFunction: makeStringProp("ease-in"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
}
export const overlayEmits = {
  "update:show": (show: boolean) => isBoolean(show),
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  click: () => true,
}

export type OverlayEmits = typeof overlayEmits
export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayInstance = InstanceType<typeof Overlay>
