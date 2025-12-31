import type Popup from "./ui-popup.vue"
import type { PropType, CSSProperties } from "vue"
import { truthProp, buildProps, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const popupProps = buildProps("popup", {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 显示模式，可选值 top, bottom, left, right, center
   */
  mode: makeStringProp<PopupMode>("bottom"),
  /**
   * 宽度
   */
  width: numericProp,
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 最大宽度
   */
  maxWidth: numericProp,
  /**
   * 最大高度
   */
  maxHeight: numericProp,
  /**
   * 是否显示遮罩层
   */
  overlay: truthProp,
  /**
   * 动画时长，单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 是否显示关闭按钮
   */
  closeable: Boolean,
  /**
   * 关闭按钮的图标，默认为 "cross"
   */
  closeIcon: makeStringProp("cross"),
  /**
   * 关闭按钮的位置，可选值 top-left, top-right, bottom-left, bottom-right
   */
  closeIconPosition: makeStringProp<PopupCloseIconPosition>(""),
  /**
   * 圆角大小
   */
  borderRadius: makeNumericProp("16rpx"),
  /**
   * 点击遮罩层时是否关闭弹窗
   */
  closeOnClickOverlay: truthProp,
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: truthProp,
  /**
   * 是否开启顶部安全距离
   */
  safeAreaInsetTop: Boolean,
  /**
   * 是否开启底部安全距离
   */
  safeAreaInsetBottom: truthProp,
  /**
   * 自定义覆盖层的样式
   */
  overlayStyle: [Object, String] as PropType<string | CSSProperties>,
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})

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
export type PopupProps = typeof popupProps
export type PopupInstance = InstanceType<typeof Popup>
