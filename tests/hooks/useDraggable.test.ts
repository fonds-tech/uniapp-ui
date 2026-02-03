/**
 * useDraggable 单元测试
 * 测试拖拽事件解析与偏移更新
 */

import { mount } from "@vue/test-utils"
import { defineComponent } from "vue"
import { it, vi, expect, describe } from "vitest"
import { useDraggable, extractEventPosition } from "@/uni_modules/uniapp-ui/hooks/useDraggable"

describe("useDraggable", () => {
  it("extractEventPosition 应解析多种事件格式", () => {
    expect(extractEventPosition({ touches: [{ clientX: 1, clientY: 2 }] })).toEqual({ x: 1, y: 2 })
    expect(extractEventPosition({ changedTouches: [{ clientX: 3, clientY: 4 }] })).toEqual({ x: 3, y: 4 })
    expect(extractEventPosition({ detail: { x: 5, y: 6 } })).toEqual({ x: 5, y: 6 })
    expect(extractEventPosition({ clientX: 7, clientY: 8 })).toEqual({ x: 7, y: 8 })
    expect(extractEventPosition({})).toBeNull()
  })

  it("应根据触摸移动更新偏移量", () => {
    const onDragMove = vi.fn()
    const Comp = defineComponent({
      setup() {
        const draggable = useDraggable({ onDragMove })
        return { draggable }
      },
      template: "<div></div>",
    })

    const wrapper = mount(Comp)
    const draggable = wrapper.vm.draggable

    draggable.handlers.onTouchstart({ touches: [{ clientX: 0, clientY: 0 }] })
    const moveEvent = new Event("touchmove", { cancelable: true }) as Event & {
      touches?: Array<{ clientX: number; clientY: number }>
    }
    moveEvent.touches = [{ clientX: 10, clientY: 20 }]
    document.dispatchEvent(moveEvent)

    expect(draggable.offset.value).toEqual({ x: 10, y: 20 })
    expect(onDragMove).toHaveBeenCalled()

    const endEvent = new Event("touchend") as Event & {
      changedTouches?: Array<{ clientX: number; clientY: number }>
    }
    endEvent.changedTouches = [{ clientX: 10, clientY: 20 }]
    document.dispatchEvent(endEvent)
    expect(draggable.dragging.value).toBe(false)

    wrapper.unmount()
  })

  it("应应用边界限制与 setOffset", () => {
    const Comp = defineComponent({
      setup() {
        const draggable = useDraggable({
          onBoundary: (pos) => ({ x: Math.max(0, pos.x), y: Math.max(0, pos.y) }),
        })
        return { draggable }
      },
      template: "<div></div>",
    })

    const wrapper = mount(Comp)
    const draggable = wrapper.vm.draggable

    draggable.setOffset({ x: -10, y: 5 })
    expect(draggable.offset.value).toEqual({ x: 0, y: 5 })

    wrapper.unmount()
  })
})
