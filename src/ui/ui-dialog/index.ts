import type Dialog from "./ui-dialog.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { truthProp, buildProps, numericProp, makeStringProp, makeNumericProp } from "../utils/props"

export const dialogProps = buildProps("dialog", {
  /**
   * 是否显示
   */
  show: Boolean,
  /**
   * 标题
   */
  title: String,
  /**
   * 宽度
   */
  width: makeNumericProp("88vw"),
  /**
   * 高度
   */
  height: numericProp,
  /**
   * 内容
   */
  content: String,
  /**
   * 内容对齐方式
   */
  contentAlign: makeStringProp<DialogContentAlign>("center"),
  /**
   * 是否显示确认按钮
   */
  showConfirmButton: truthProp,
  /**
   * 是否显示取消按钮
   */
  showCancelButton: Boolean,
  /**
   * 确认按钮文字
   */
  confirmButtonText: makeStringProp("确认"),
  /**
   * 确认按钮文字颜色
   */
  confirmButtonColor: makeStringProp("primary"),
  /**
   * 取消按钮文字
   */
  cancelButtonText: makeStringProp("取消"),
  /**
   * 取消按钮文字颜色
   */
  cancelButtonColor: String,
  /**
   * 是否对调确认和取消按钮位置
   */
  buttonReverse: Boolean,
  /**
   * 否显示遮罩层
   */
  overlay: truthProp,
  /**
   * 自定义遮罩层样式
   */
  overlayStyle: { type: [Object, String], default: () => ({}) },
  /**
   * 是否点击遮罩层后关闭
   */
  closeOnClickOverlay: Boolean,
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender: truthProp,
  /**
   * 内边距
   */
  padding: numericProp,
  /**
   * 弹窗顶部偏移
   */
  offsetTop: numericProp,
  /**
   * 是否异步关闭
   */
  asyncClose: Boolean,
  /**
   * 元素层级
   */
  zIndex: numericProp,
  /**
   * 弹窗打开过渡时间,单位毫秒
   */
  duration: makeNumericProp(300),
  /**
   * 背景颜色
   */
  background: String,
  /**
   * 弹窗圆角
   */
  borderRadius: numericProp,
  /**
   * 进入动画函数
   */
  enterTimingFunction: makeStringProp("cubic-bezier(0.5, 1.5, 0.5, 1)"),
  /**
   * 离开动画函数
   */
  leaveTimingFunction: makeStringProp("cubic-bezier(0.4, 0.8, 0.74, 1)"),
  /**
   * 自定义类名
   */
  customClass: String,
  /**
   * 自定义样式
   */
  customStyle: [String, Object] as PropType<string | CSSProperties>,
})
export const dialogEmits = {
  "update:show": (show: boolean) => true,
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  cancel: (next?: { close: (action: DialogCloseAction) => void; done: (action: DialogDoneAction) => void }) => true,
  confirm: (next?: { close: (action: DialogCloseAction) => void; done: (action: DialogDoneAction) => void }) => true,
  clickOverlay: (next?: { close: (action: DialogCloseAction) => void }) => true,
}

export type DialogOpenAction = "inner" | "outside"
export type DialogDoneAction = "confirm" | "cancel" | "overlay"
export type DialogCloseAction = "confirm" | "cancel" | "overlay" | "close"

export interface DialogOptions {
  /**
   * 是否显示
   */
  show?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 宽度
   */
  width?: string | number
  /**
   * 高度
   */
  height?: string | number
  /**
   * 内容
   */
  content?: string
  /**
   * 内容对齐方式
   */
  contentAlign?: "left" | "center" | "right"
  /**
   * 是否显示确认按钮
   */
  showConfirmButton?: boolean
  /**
   * 是否显示取消按钮
   */
  showCancelButton?: boolean
  /**
   * 确认按钮文字
   */
  confirmButtonText?: string
  /**
   * 确认按钮文字颜色
   */
  confirmButtonColor?: string
  /**
   * 取消按钮文字
   */
  cancelButtonText?: string
  /**
   * 取消按钮文字颜色
   */
  cancelButtonColor?: string
  /**
   * 进入动画函数
   */
  enterTimingFunction?: string
  /**
   * 离开动画函数
   */
  leaveTimingFunction?: string
  /**
   * 是否对调确认和取消按钮位置
   */
  buttonReverse?: boolean
  /**
   * 否显示遮罩层
   */
  overlay?: boolean
  /**
   * 自定义遮罩层样式
   */
  overlayStyle?: string | CSSProperties
  /**
   * 是否点击遮罩层后关闭
   */
  closeOnClickOverlay?: boolean
  /**
   * 是否在显示时才渲染节点
   */
  lazyRender?: boolean
  /**
   * 内边距
   */
  padding?: string | number
  /**
   * 弹窗顶部偏移
   */
  offsetTop?: string | number
  /**
   * 是否异步关闭
   */
  asyncClose?: boolean
  /**
   * 元素层级
   */
  zIndex?: string | number
  /**
   * 弹窗打开过渡时间,单位毫秒
   */
  duration?: string | number
  /**
   * 背景颜色
   */
  background?: string
  /**
   * 弹窗圆角
   */
  borderRadius?: string | number
  /**
   * 自定义样式
   */
  customStyle?: string | CSSProperties
  /**
   * 确认回调
   */
  onConfirm?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
  /**
   * 取消回调
   */
  onCancel?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
  /**
   * 遮罩层回调
   */
  onOverlay?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
}
export interface DialogExpose {
  open: (options?: DialogOptions) => void
  close: () => void
}
export type DialogContentAlign = "left" | "center" | "right"
export type DialogEmits = typeof dialogEmits
export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogInstance = InstanceType<typeof Dialog>
