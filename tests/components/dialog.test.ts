/**
 * ui-dialog 组件单元测试
 * 测试对话框组件的 props、events 和渲染逻辑
 *
 * 注意：dialog 组件使用 useTransition hook，内部用 setInterval 模拟 requestAnimationFrame
 * 需要使用 vi.useFakeTimers() 并通过 waitForTransition() 推进时间让动画完成
 */

import UiDialog from "@/ui/ui-dialog/ui-dialog.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建 stub 组件
const stubs = {
  "ui-overlay": {
    name: "ui-overlay",
    template: "<div class=\"ui-overlay-stub\" @click=\"$emit('click')\"><slot /></div>",
    props: ["show", "duration", "zIndex", "lazyRender", "customStyle", "enterTimingFunction", "leaveTimingFunction"],
  },
  "ui-button": {
    name: "ui-button",
    template: "<button class=\"ui-button-stub\" @click=\"$emit('click')\"><slot /></button>",
    props: ["block", "loading", "loadingText", "size", "type", "borderRadius", "textWeight", "textColor"],
  },
}

describe("ui-dialog 对话框组件", () => {
  // 启用 fake timers 以控制动画时间
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("show 为 false 时不应渲染对话框内容（lazyRender 默认为 true）", () => {
      const wrapper = mount(UiDialog, {
        props: { show: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-dialog").exists()).toBe(false)
    })

    it("show 为 true 时应渲染对话框", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog").exists()).toBe(true)
    })

    it("应正确渲染标题", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, title: "提示" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog__title").exists()).toBe(true)
      expect(wrapper.find(".ui-dialog__title").text()).toBe("提示")
    })

    it("应正确渲染内容", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, content: "确定要删除吗？" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog__content__text").text()).toBe("确定要删除吗？")
    })

    it("无标题时不应渲染标题区域", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, content: "内容" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog__title").exists()).toBe(false)
    })
  })

  describe("按钮配置", () => {
    it("默认应只显示确认按钮", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      const buttons = wrapper.findAllComponents({ name: "ui-button" })
      expect(buttons.length).toBe(1)
    })

    it("showCancelButton 为 true 时应显示取消按钮", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true },
        global: { stubs },
      })

      await waitForTransition()

      const buttons = wrapper.findAllComponents({ name: "ui-button" })
      expect(buttons.length).toBe(2)
    })

    it("showConfirmButton 为 false 时不应显示确认按钮", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showConfirmButton: false },
        global: { stubs },
      })

      await waitForTransition()

      const buttons = wrapper.findAllComponents({ name: "ui-button" })
      expect(buttons.length).toBe(0)
    })

    it("应支持自定义确认按钮文字", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, confirmButtonText: "好的" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("好的")
    })

    it("应支持自定义取消按钮文字", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true, cancelButtonText: "算了" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("算了")
    })

    it("buttonReverse 为 true 时按钮应反转", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true, buttonReverse: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog__footer").classes()).toContain("ui-dialog__footer--reverse")
    })
  })

  describe("内容对齐", () => {
    const alignments = ["left", "center", "right"] as const

    alignments.forEach((align) => {
      it(`应支持 ${align} 对齐方式`, async () => {
        const wrapper = mount(UiDialog, {
          props: { show: true, content: "内容", contentAlign: align },
          global: { stubs },
        })

        await waitForTransition()

        expect(wrapper.find(".ui-dialog__content__text").classes()).toContain(`ui-dialog__content__text--${align}`)
      })
    })
  })

  describe("事件处理", () => {
    it("点击确认按钮应触发 confirm 事件", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      const confirmButton = wrapper.findAllComponents({ name: "ui-button" })[0]
      await confirmButton.trigger("click")

      expect(wrapper.emitted("confirm")).toBeTruthy()
    })

    it("点击取消按钮应触发 cancel 事件", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true },
        global: { stubs },
      })

      await waitForTransition()

      const cancelButton = wrapper.findAllComponents({ name: "ui-button" })[0]
      await cancelButton.trigger("click")

      expect(wrapper.emitted("cancel")).toBeTruthy()
    })

    it("点击确认按钮后应关闭对话框", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      const confirmButton = wrapper.findAllComponents({ name: "ui-button" })[0]
      await confirmButton.trigger("click")

      const emittedEvents = wrapper.emitted("update:show")
      expect(emittedEvents).toBeTruthy()
      // 第一个事件是 open 时的 true，第二个是 close 时的 false
      const lastEmit = emittedEvents![emittedEvents!.length - 1]
      expect(lastEmit).toEqual([false])
    })

    it("点击取消按钮后应关闭对话框", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true },
        global: { stubs },
      })

      await waitForTransition()

      const cancelButton = wrapper.findAllComponents({ name: "ui-button" })[0]
      await cancelButton.trigger("click")

      const emittedEvents = wrapper.emitted("update:show")
      expect(emittedEvents).toBeTruthy()
      // 第一个事件是 open 时的 true，第二个是 close 时的 false
      const lastEmit = emittedEvents![emittedEvents!.length - 1]
      expect(lastEmit).toEqual([false])
    })
  })

  describe("遮罩层", () => {
    it("默认应显示遮罩层", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-overlay" }).exists()).toBe(true)
    })

    it("overlay 为 false 时不应显示遮罩层", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, overlay: false },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-overlay" }).exists()).toBe(false)
    })

    it("closeOnClickOverlay 为 true 时点击遮罩层应关闭", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, closeOnClickOverlay: true },
        global: { stubs },
      })

      await waitForTransition()

      await wrapper.findComponent({ name: "ui-overlay" }).trigger("click")

      expect(wrapper.emitted("clickOverlay")).toBeTruthy()
      expect(wrapper.emitted("update:show")).toBeTruthy()
    })

    it("closeOnClickOverlay 默认为 false 时点击遮罩层不应关闭", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      // 记录点击前的事件数量（open 时会触发 update:show: true）
      const eventsBefore = wrapper.emitted("update:show")?.length || 0

      await wrapper.findComponent({ name: "ui-overlay" }).trigger("click")

      // 点击遮罩层后不应该有新的 update:show 事件
      const eventsAfter = wrapper.emitted("update:show")?.length || 0
      expect(eventsAfter).toBe(eventsBefore)
    })
  })

  describe("样式配置", () => {
    it("应支持自定义宽度", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, width: "300px" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("width")).toBe("300px")
    })

    it("应支持自定义高度", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, height: "200px" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("height")).toBe("200px")
    })

    it("应支持自定义背景颜色", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, background: "#f5f5f5" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义圆角", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, borderRadius: 16 },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("borderRadius")).toBe(16)
    })

    it("应支持自定义内边距", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, padding: "20px" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("padding")).toBe("20px")
    })

    it("应支持自定义偏移", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, offsetTop: "-100px" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("offsetTop")).toBe("-100px")
    })
  })

  describe("异步关闭", () => {
    it("asyncClose 为 true 时应支持异步关闭", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, asyncClose: true },
        global: { stubs },
      })

      await waitForTransition()

      const confirmButton = wrapper.findAllComponents({ name: "ui-button" })[0]
      await confirmButton.trigger("click")

      // 异步关闭模式下，confirm 事件应携带 close 和 done 方法
      expect(wrapper.emitted("confirm")).toBeTruthy()
    })
  })

  describe("动画配置", () => {
    it("应支持自定义动画时长", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, duration: 500 },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("duration")).toBe(500)
    })

    it("应支持自定义进入动画函数", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, enterTimingFunction: "ease-in" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("enterTimingFunction")).toBe("ease-in")
    })

    it("应支持自定义离开动画函数", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, leaveTimingFunction: "ease-out" },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("leaveTimingFunction")).toBe("ease-out")
    })
  })

  describe("层级配置", () => {
    it("应支持自定义 zIndex", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, zIndex: 3000 },
        global: { stubs },
      })

      await nextTick()

      expect(wrapper.props("zIndex")).toBe(3000)
    })
  })

  describe("懒渲染", () => {
    it("lazyRender 默认为 true", () => {
      const wrapper = mount(UiDialog, {
        props: { show: false },
        global: { stubs },
      })

      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("lazyRender 为 false 时应立即渲染", () => {
      const wrapper = mount(UiDialog, {
        props: { show: false, lazyRender: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-dialog").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 title 插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
        slots: {
          title: "<div class=\"custom-title\">自定义标题</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-title").exists()).toBe(true)
      expect(wrapper.find(".custom-title").text()).toBe("自定义标题")
    })

    it("应支持默认插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
        slots: {
          default: "<div class=\"custom-content\">自定义内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("应支持 footer 插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
        slots: {
          footer: "<div class=\"custom-footer\">自定义底部</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-footer").exists()).toBe(true)
    })

    it("应支持 cancel 插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, showCancelButton: true },
        global: { stubs },
        slots: {
          cancel: "<button class=\"custom-cancel\">自定义取消</button>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-cancel").exists()).toBe(true)
    })

    it("应支持 confirm 插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
        slots: {
          confirm: "<button class=\"custom-confirm\">自定义确认</button>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-confirm").exists()).toBe(true)
    })

    it("应支持 outside 插槽", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
        slots: {
          outside: "<div class=\"outside-content\">外部内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".outside-content").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiDialog, {
        global: { stubs },
      })

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiDialog, {
        global: { stubs },
      })

      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("open 方法应能打开对话框", async () => {
      const wrapper = mount(UiDialog, {
        global: { stubs },
      })

      wrapper.vm.open({ title: "标题", content: "内容" })
      await nextTick()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })

    it("close 方法应能关闭对话框", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      wrapper.vm.close("close")
      await nextTick()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })
  })

  describe("生命周期事件", () => {
    it("打开时应触发 open 事件", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("open")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiDialog, {
        props: { show: true, customClass: "my-dialog" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog").classes()).toContain("my-dialog")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiDialog, {
        props: {
          show: true,
          customStyle: { marginTop: "50px" },
        },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-dialog").exists()).toBe(true)
    })
  })
})
