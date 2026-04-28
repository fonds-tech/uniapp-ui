import type Dialog from "./ui-dialog.vue"
import type { Ref, PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("dialog", {
  show: false,
  title: undefined,
  width: "88vw",
  height: undefined,
  content: undefined,
  contentAlign: "center",
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: "确定",
  confirmButtonColor: "primary",
  cancelButtonText: "取消",
  cancelButtonColor: undefined,
  buttonReverse: false,
  overlay: true,
  overlayStyle: () => ({}),
  closeOnClickOverlay: false,
  lazyRender: true,
  padding: undefined,
  offsetTop: undefined,
  asyncClose: false,
  zIndex: undefined,
  duration: 300,
  background: undefined,
  borderRadius: undefined,
  enterTimingFunction: "cubic-bezier(0.5, 1.5, 0.5, 1)",
  leaveTimingFunction: "cubic-bezier(0.4, 0.8, 0.74, 1)",
  customClass: undefined,
  customStyle: undefined,
})

export const dialogProps = {
  /** 是否显示 */
  show: defaultProps("show", { type: Boolean }),
  /** 标题 */
  title: defaultProps("title", { type: String }),
  /** 宽度 */
  width: defaultProps("width", { type: [Number, String] }),
  /** 高度 */
  height: defaultProps("height", { type: [Number, String] }),
  /** 内容 */
  content: defaultProps("content", { type: String }),
  /** 内容对齐方式 */
  contentAlign: defaultProps("contentAlign", { type: String as PropType<DialogContentAlign> }),
  /** 是否显示确认按钮 */
  showConfirmButton: defaultProps("showConfirmButton", { type: Boolean }),
  /** 是否显示取消按钮 */
  showCancelButton: defaultProps("showCancelButton", { type: Boolean }),
  /** 确认按钮文字 */
  confirmButtonText: defaultProps("confirmButtonText", { type: String }),
  /** 确认按钮文字颜色 */
  confirmButtonColor: defaultProps("confirmButtonColor", { type: String }),
  /** 取消按钮文字 */
  cancelButtonText: defaultProps("cancelButtonText", { type: String }),
  /** 取消按钮文字颜色 */
  cancelButtonColor: defaultProps("cancelButtonColor", { type: String }),
  /** 是否对调确认和取消按钮位置 */
  buttonReverse: defaultProps("buttonReverse", { type: Boolean }),
  /** 是否显示遮罩层 */
  overlay: defaultProps("overlay", { type: Boolean }),
  /** 自定义遮罩层样式 */
  overlayStyle: defaultProps("overlayStyle", { type: [Object, String] as PropType<string | CSSProperties> }),
  /** 是否点击遮罩层后关闭 */
  closeOnClickOverlay: defaultProps("closeOnClickOverlay", { type: Boolean }),
  /** 是否在显示时才渲染节点 */
  lazyRender: defaultProps("lazyRender", { type: Boolean }),
  /** 内边距 */
  padding: defaultProps("padding", { type: [Number, String] }),
  /** 弹窗顶部偏移 */
  offsetTop: defaultProps("offsetTop", { type: [Number, String] }),
  /** 是否异步关闭 */
  asyncClose: defaultProps("asyncClose", { type: Boolean }),
  /** 元素层级 */
  zIndex: defaultProps("zIndex", { type: [Number, String] }),
  /** 弹窗打开过渡时间，单位毫秒 */
  duration: defaultProps("duration", { type: Number }),
  /** 背景颜色 */
  background: defaultProps("background", { type: String }),
  /** 弹窗圆角 */
  borderRadius: defaultProps("borderRadius", { type: [Number, String] }),
  /** 进入动画函数 */
  enterTimingFunction: defaultProps("enterTimingFunction", { type: String }),
  /** 离开动画函数 */
  leaveTimingFunction: defaultProps("leaveTimingFunction", { type: String }),
  /** 自定义类名 */
  customClass: defaultProps("customClass", { type: String }),
  /** 自定义样式 */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

export type DialogOpenAction = "inner" | "outside"
export type DialogDoneAction = "confirm" | "cancel" | "overlay"
export type DialogCloseAction = "confirm" | "cancel" | "overlay" | "close"

export interface DialogConfirmNext {
  close: () => void
  done: () => void
}

export interface DialogCancelNext {
  close: () => void
  done: () => void
}

export interface DialogOverlayNext {
  close: (action: DialogCloseAction) => void
}

export const dialogEmits = {
  /** 更新显示状态事件 */
  "update:show": (show: boolean) => true,
  /** 打开弹窗事件 */
  open: () => true,
  /** 打开动画结束事件 */
  opened: () => true,
  /** 关闭弹窗事件 */
  close: () => true,
  /** 关闭动画结束事件 */
  closed: () => true,
  /** 取消事件 */
  cancel: (next?: DialogCancelNext) => true,
  /** 确认事件 */
  confirm: (next?: DialogConfirmNext) => true,
  /** 点击遮罩层事件 */
  clickOverlay: (next?: DialogOverlayNext) => true,
}

/** 命令式 open() / show() 等方法的入参，复用 props 类型并扩展回调 */
export type DialogOptions = Partial<DialogProps> & {
  /** 确认回调 */
  onConfirm?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
  /** 取消回调 */
  onCancel?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
  /** 遮罩层回调 */
  onOverlay?: (next?: { close: (action?: DialogCloseAction) => void; done: (action?: DialogDoneAction) => void }) => void
}

export interface DialogExpose {
  /** 打开对话框 */
  open: (options?: DialogOptions) => void
  /** 关闭对话框 */
  close: () => void
  /** 显示对话框（Promise 风格） */
  show: (options?: DialogOptions) => Promise<boolean>
  /** 显示确认对话框（带确认和取消按钮） */
  confirm: (options?: string | DialogOptions) => Promise<boolean>
  /** 显示提示对话框（只有确认按钮） */
  alert: (options?: string | DialogOptions) => Promise<void>
}

export type DialogContentAlign = "left" | "center" | "right"
export type DialogEmits = typeof dialogEmits
export type DialogProps = ExtractPropTypes<typeof dialogProps>
export type DialogInstance = InstanceType<typeof Dialog>

/** 全局 Dialog 实例存储 */
let globalDialogInstance: Ref<DialogInstance | null> | null = null

/** 待执行队列项：支持 show/alert/confirm/close 四种 action，可选保存 resolve 以便 instance 挂载后回填 Promise 结果 */
type PendingItem =
  | { action: "show"; options?: DialogOptions; resolve?: (value: boolean) => void }
  | { action: "alert"; options?: string | DialogOptions; resolve?: () => void }
  | { action: "confirm"; options?: string | DialogOptions; resolve?: (value: boolean) => void }
  | { action: "close" }

const pendingQueue: PendingItem[] = []

/** 注册全局 Dialog 实例（在根组件中调用） */
export function provideDialog(instance: Ref<DialogInstance | null>) {
  globalDialogInstance = instance
  flushPendingQueue()
}

/** 注销全局 Dialog 实例（在根组件 onUnmounted 时调用，避免持有失效 ref） */
export function unprovideDialog(instance?: Ref<DialogInstance | null>) {
  // 仅在传入 ref 与当前注册的相同时才清空，避免误清后注册的新 instance
  if (!instance || globalDialogInstance === instance) {
    globalDialogInstance = null
  }
}

/** 获取全局 Dialog 实例（内部使用） */
export function getGlobalDialogInstance(): Ref<DialogInstance | null> | null {
  return globalDialogInstance
}

/** 将调用加入待执行队列 */
export function enqueuePendingDialog(item: PendingItem) {
  pendingQueue.push(item)
}

/** 执行队列中的待处理调用，按 action 类型分发到 instance 对应方法 */
function flushPendingQueue() {
  const instance = globalDialogInstance?.value
  if (!instance) return

  while (pendingQueue.length > 0) {
    const item = pendingQueue.shift()
    if (!item) continue

    if (item.action === "show") {
      const promise = instance.show(item.options)
      if (item.resolve) promise.then(item.resolve)
    } else if (item.action === "alert") {
      const promise = instance.alert(item.options)
      if (item.resolve) promise.then(item.resolve)
    } else if (item.action === "confirm") {
      const promise = instance.confirm(item.options)
      if (item.resolve) promise.then(item.resolve)
    } else if (item.action === "close") {
      instance.close()
    }
  }
}
