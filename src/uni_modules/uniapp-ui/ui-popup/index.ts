import type Popup from "./ui-popup.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("popup", {
  show: false,
  mode: "bottom",
  width: undefined,
  height: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  overlay: true,
  duration: 300,
  zIndex: undefined,
  background: undefined,
  closeable: false,
  closeIcon: "close",
  closeIconPosition: "",
  borderRadius: "16rpx",
  closeOnClickOverlay: true,
  lazyRender: true,
  safeAreaInsetTop: false,
  safeAreaInsetBottom: true,
  overlayStyle: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const popupProps = {
  /**
   * 是否显示
   */
  show: defaultProps("show", { type: Boolean }),
  /**
   * 显示模式，可选值 top, bottom, left, right, center
   */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /**
   * 宽度
   */
  width: defaultProps("width", { type: [Number, String] }),
  /**
   * 高度
   */
  height: defaultProps("height", { type: [Number, String] }),
  /**
   * 最大宽度
   */
  maxWidth: defaultProps("maxWidth", { type: [Number, String] }),
  /**
   * 最大高度
   */
  maxHeight: defaultProps("maxHeight", { type: [Number, String] }),
  /**
   * 是否显示遮罩层
   */
  overlay: defaultProps("overlay", { type: Boolean }),
  /**
   * 动画时长，单位毫秒
   */
  duration: defaultProps("duration", { type: Number }),
  /**
   * 元素层级
   */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /**
   * 背景颜色
   */
  background: defaultProps("background", { type: String }),
  /**
   * 是否显示关闭按钮
   */
  closeable: defaultProps("closeable", { type: Boolean }),
  /**
   * 关闭按钮的图标，默认为 "cross"
   */
  closeIcon: defaultProps("closeIcon", { type: String }),
  /**
   * 关闭按钮的位置，可选值 top-left, top-right, bottom-left, bottom-right
   */
  closeIconPosition: defaultProps("closeIconPosition", { type: String as PropType<PopupCloseIconPosition> }),
  /**
   * 圆角大小
   */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /**
   * 点击遮罩层时是否关闭弹窗
   */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /**
   * 是否开启顶部安全距离
   */
  safeAreaInsetTop: defaultProps("safeAreaInsetTop", { type: Boolean }),
  /**
   * 是否开启底部安全距离
   */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /**
   * 自定义覆盖层的样式
   */
  overlayStyle: defaultProps("overlayStyle", { type: [Object, String] as PropType<string | CSSProperties> }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}
export const popupEmits = {
  "update:show": (show: boolean) => true,
  open: () => true,
  opened: () => true,
  close: (action: string) => true,
  closed: (action: string) => true,
  click: () => true,
  clickClose: () => true,
  clickOverlay: () => true,
}

export type PopupMode = "top" | "bottom" | "left" | "right" | "center"
export type PopupCloseIconPosition = "" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
export type PopupEmits = typeof popupEmits
export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupInstance = InstanceType<typeof Popup>
