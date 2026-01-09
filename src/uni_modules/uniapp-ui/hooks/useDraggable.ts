import type { Ref } from "vue"
import { ref, unref, onUnmounted } from "vue"

type MaybeRef<T> = T | Ref<T>

export interface DragPosition {
  x: number
  y: number
}

export interface DragDetail {
  /** 当前偏移量 */
  offset: DragPosition
  /** 本次移动的增量 */
  delta: DragPosition
  /** 拖拽起始位置 */
  start: DragPosition
}

export interface UseDraggableOptions {
  /** 是否禁用拖拽 */
  disabled?: MaybeRef<boolean>
  /** 初始偏移量 */
  initialOffset?: DragPosition
  /** 边界限制（返回修正后的 offset） */
  onBoundary?: (offset: DragPosition) => DragPosition
  /** 拖拽开始回调 */
  onDragStart?: (detail: DragDetail) => void
  /** 拖拽移动回调 */
  onDragMove?: (detail: DragDetail) => void
  /** 拖拽结束回调 */
  onDragEnd?: (detail: DragDetail) => void
}

/**
 * 从事件对象中提取坐标（兼容多端）
 * - H5: MouseEvent / TouchEvent
 * - 小程序: touches / changedTouches / detail
 */
export function extractEventPosition(event: any): DragPosition | null {
  // touch 事件
  if (event.touches && event.touches.length > 0) {
    const touch = event.touches[0]
    return { x: touch.clientX, y: touch.clientY }
  }

  // touchend 使用 changedTouches
  if (event.changedTouches && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0]
    return { x: touch.clientX, y: touch.clientY }
  }

  // 小程序 tap 事件使用 detail
  if (event.detail && typeof event.detail.x === "number") {
    return { x: event.detail.x, y: event.detail.y }
  }

  // H5 mouse 事件
  if (typeof event.clientX === "number") {
    return { x: event.clientX, y: event.clientY }
  }

  return null
}

/**
 * 通用拖拽 hook
 * 兼容 H5 (mouse + touch) 和小程序 (touch)
 */
export function useDraggable(options: UseDraggableOptions = {}) {
  const { initialOffset = { x: 0, y: 0 }, onBoundary, onDragStart, onDragMove, onDragEnd } = options

  const dragging = ref(false)
  const offset = ref<DragPosition>({ ...initialOffset })
  const startPos = ref<DragPosition>({ x: 0, y: 0 })

  // #ifdef H5
  let documentMouseBound = false
  let documentTouchBound = false
  // #endif

  function isDisabled() {
    return unref(options.disabled)
  }

  function applyBoundary(pos: DragPosition): DragPosition {
    return onBoundary ? onBoundary(pos) : pos
  }

  function buildDetail(delta: DragPosition = { x: 0, y: 0 }): DragDetail {
    return {
      offset: { ...offset.value },
      delta,
      start: { ...startPos.value },
    }
  }

  // ========== Touch 事件处理 ==========
  function handleTouchStart(event: any) {
    if (isDisabled()) return

    const pos = extractEventPosition(event)
    if (!pos) return

    startPos.value = pos
    dragging.value = true

    // #ifdef H5
    bindDocumentTouch()
    // #endif

    onDragStart?.(buildDetail())
  }

  function handleTouchMove(event: any) {
    if (isDisabled() || !dragging.value) return

    // 阻止页面滚动
    if (event.cancelable !== false) {
      event.preventDefault?.()
    }

    const pos = extractEventPosition(event)
    if (!pos) return

    const delta = {
      x: pos.x - startPos.value.x,
      y: pos.y - startPos.value.y,
    }

    const newOffset = applyBoundary({
      x: offset.value.x + delta.x,
      y: offset.value.y + delta.y,
    })

    offset.value = newOffset
    startPos.value = pos

    onDragMove?.(buildDetail(delta))
  }

  function handleTouchEnd() {
    if (isDisabled() || !dragging.value) {
      // #ifdef H5
      unbindDocumentTouch()
      // #endif
      return
    }

    dragging.value = false

    // #ifdef H5
    unbindDocumentTouch()
    // #endif

    onDragEnd?.(buildDetail())
  }

  // ========== H5 Mouse 事件处理 ==========
  function handleMouseDown(event: any) {
    // #ifdef H5
    if (isDisabled()) return

    event.preventDefault()
    const pos = extractEventPosition(event)
    if (!pos) return

    startPos.value = pos
    dragging.value = true
    bindDocumentMouse()

    onDragStart?.(buildDetail())
    // #endif
  }

  function handleMouseMove(event: any) {
    if (isDisabled() || !dragging.value) return

    const pos = extractEventPosition(event)
    if (!pos) return

    const delta = {
      x: pos.x - startPos.value.x,
      y: pos.y - startPos.value.y,
    }

    const newOffset = applyBoundary({
      x: offset.value.x + delta.x,
      y: offset.value.y + delta.y,
    })

    offset.value = newOffset
    startPos.value = pos

    onDragMove?.(buildDetail(delta))
  }

  function handleMouseUp() {
    // #ifdef H5
    if (isDisabled() || !dragging.value) {
      unbindDocumentMouse()
      return
    }

    dragging.value = false
    unbindDocumentMouse()

    onDragEnd?.(buildDetail())
    // #endif
  }

  // ========== H5 Document 事件绑定 ==========
  // #ifdef H5
  function bindDocumentTouch() {
    if (documentTouchBound) return
    documentTouchBound = true
    document.addEventListener("touchmove", onDocTouchMove, { passive: false })
    document.addEventListener("touchend", onDocTouchEnd)
    document.addEventListener("touchcancel", onDocTouchEnd)
  }

  function unbindDocumentTouch() {
    if (!documentTouchBound) return
    documentTouchBound = false
    document.removeEventListener("touchmove", onDocTouchMove)
    document.removeEventListener("touchend", onDocTouchEnd)
    document.removeEventListener("touchcancel", onDocTouchEnd)
  }

  function onDocTouchMove(e: TouchEvent) {
    handleTouchMove(e)
  }

  function onDocTouchEnd() {
    handleTouchEnd()
  }

  function bindDocumentMouse() {
    if (documentMouseBound) return
    documentMouseBound = true
    document.addEventListener("mousemove", onDocMouseMove)
    document.addEventListener("mouseup", onDocMouseUp)
  }

  function unbindDocumentMouse() {
    if (!documentMouseBound) return
    documentMouseBound = false
    document.removeEventListener("mousemove", onDocMouseMove)
    document.removeEventListener("mouseup", onDocMouseUp)
  }

  function onDocMouseMove(e: MouseEvent) {
    handleMouseMove(e)
  }

  function onDocMouseUp() {
    handleMouseUp()
  }
  // #endif

  // 清理
  function cleanup() {
    // #ifdef H5
    unbindDocumentTouch()
    unbindDocumentMouse()
    // #endif
  }

  onUnmounted(cleanup)

  // 重置
  function reset() {
    offset.value = { ...initialOffset }
    dragging.value = false
  }

  // 设置偏移量
  function setOffset(newOffset: DragPosition) {
    offset.value = applyBoundary(newOffset)
  }

  // #ifdef H5
  function isDocumentTouchBound() {
    return documentTouchBound
  }
  // #endif

  // 元素事件处理器（H5 上需要避免与 document 事件重复处理）
  function elementTouchMove(event: any) {
    // #ifdef H5
    if (isDocumentTouchBound()) return
    // #endif
    handleTouchMove(event)
  }

  function elementTouchEnd() {
    // #ifdef H5
    if (isDocumentTouchBound()) return
    // #endif
    handleTouchEnd()
  }

  return {
    // 状态
    dragging,
    offset,

    // 事件处理器（供模板绑定）
    handlers: {
      onTouchstart: handleTouchStart,
      onTouchmove: elementTouchMove,
      onTouchend: elementTouchEnd,
      onMousedown: handleMouseDown,
    },

    // 方法
    reset,
    setOffset,
    cleanup,
  }
}
