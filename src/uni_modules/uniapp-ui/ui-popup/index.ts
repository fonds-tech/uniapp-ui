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
  closeIcon: "cross",
  closeIconPosition: "",
  borderRadius: undefined,
  closeOnClickOverlay: true,
  lazyRender: true,
  // 顶部安全区默认 false（top 模式少见）；底部默认 true（bottom 模式高频，避免 iOS 全面屏小条遮挡）
  safeAreaInsetTop: false,
  safeAreaInsetBottom: true,
  overlayStyle: undefined,
  customClass: undefined,
  customStyle: undefined,
})

export const popupProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 显示模式 */
  mode: defaultProps("mode", { type: String as PropType<PopupMode> }),
  /** 宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 最大宽度 */
  maxWidth: defaultProps("maxWidth", { type: [Number, String] }),
  /** 最大高度 */
  maxHeight: defaultProps("maxHeight", { type: [Number, String] }),
  /** 是否显示遮罩层 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 动画时长 (ms) */
  duration: defaultProps("duration", { type: Number }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 背景色 */
  background: defaultProps("background", { type: String }),
  /** 显示关闭按钮 */
  closeable: defaultProps("closeable", { type: Boolean }),
  /** 关闭按钮图标名 */
  closeIcon: defaultProps("closeIcon", { type: String }),
  /** 关闭按钮位置 */
  closeIconPosition: defaultProps("closeIconPosition", { type: String as PropType<PopupCloseIconPosition> }),
  /** 圆角大小 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 点击遮罩自动关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 显示时才挂载节点 */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /** 顶部安全区填充 */
  safeAreaInsetTop: defaultProps("safeAreaInsetTop", { type: Boolean }),
  /** 底部安全区填充 */
  safeAreaInsetBottom: defaultProps("safeAreaInsetBottom", { type: Boolean }),
  /** 遮罩自定义样式 */
  overlayStyle: defaultProps("overlayStyle", { type: [Object, String] as PropType<string | CSSProperties> }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export const popupEmits = {
  /** show 双向绑定 */
  "update:show": (show: boolean) => typeof show === "boolean",
  /** 弹出 */
  open: () => true,
  /** 弹出动画结束 */
  opened: () => true,
  /** 关闭 (action 来源: external|close|overlay) */
  close: (action: PopupCloseAction) => typeof action === "string",
  /** 关闭动画结束 */
  closed: (action: PopupCloseAction) => typeof action === "string",
  /** 点击 popup 主体 */
  click: () => true,
  /** 点击关闭按钮 */
  clickClose: () => true,
  /** 点击遮罩 */
  clickOverlay: () => true,
}

export type PopupMode = "top" | "bottom" | "left" | "right" | "center"
export type PopupCloseIconPosition = "" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
export type PopupCloseAction = "external" | "close" | "overlay"
export type PopupEmits = typeof popupEmits
export type PopupProps = ExtractPropTypes<typeof popupProps>
export type PopupInstance = InstanceType<typeof Popup>
