import type Overlay from "./ui-overlay.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { isBoolean } from "../utils/check"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("overlay", {
  show: false,
  zIndex: undefined,
  opacity: 0.7,
  duration: 300,
  lazyRender: true,
  enterTimingFunction: "ease-out",
  leaveTimingFunction: "ease-in",
  customClass: undefined,
  customStyle: undefined,
})

export const overlayProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 透明度
   */
  opacity: defaultProps("opacity", { type: Number }),
  /**
   * 过渡时间
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /**
   * 进入动画函数
   */
  enterTimingFunction: defaultProps("enterTimingFunction", { type: String }),
  /**
   * 离开动画函数
   */
  leaveTimingFunction: defaultProps("leaveTimingFunction", { type: String }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
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
