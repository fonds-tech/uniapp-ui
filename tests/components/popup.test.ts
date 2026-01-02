/**
 * ui-popup 组件单元测试
 * 测试弹出层组件的 props、events 和渲染逻辑
 * 注意：popup 组件使用 useTransition hook，内部用 setInterval 模拟 requestAnimationFrame
 * 测试中需要使用 waitForTransition 推进时间以完成动画初始化
 */

import UiPopup from "@/ui/ui-popup/ui-popup.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

// 创建 stub 组件
const stubs = {
  "ui-overlay": {
    name: "ui-overlay",
    template: "<div class=\"ui-overlay-stub\" @click=\"$emit('click')\"><slot /></div>",
    props: ["show", "duration", "zIndex", "lazyRender", "customStyle"],
  },
  "ui-safe-area-top": {
    name: "ui-safe-area-top",
    template: "<div class=\"ui-safe-area-top-stub\"></div>",
  },
  "ui-safe-area-bottom": {
    name: "ui-safe-area-bottom",
    template: "<div class=\"ui-safe-area-bottom-stub\"></div>",
  },
  "ui-icon": {
    name: "ui-icon",
    template: "<span class=\"ui-icon-stub\"></span>",
    props: ["name", "size", "color", "hoverClass"],
  },
}

describe("ui-popup 弹出层组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认弹出层组件", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.exists()).toBe(true)
    })

    it("show 为 false 且 lazyRender 为 true 时不应渲染弹出层", () => {
      const wrapper = mount(UiPopup, {
        props: { show: false, lazyRender: true },
        global: { stubs },
      })

      expect(wrapper.find(".ui-popup").exists()).toBe(false)
    })

    it("lazyRender 为 false 时应立即渲染", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false, lazyRender: false },
        global: { stubs },
      })

      // lazyRender 为 false 时，inited 始终为 true，无需等待动画
      expect(wrapper.find(".ui-popup").exists()).toBe(true)
    })

    it("show 为 true 时应渲染弹出层（动画完成后）", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true },
        global: { stubs },
      })

      // 等待 transition 动画初始化完成
      await waitForTransition()

      expect(wrapper.find(".ui-popup").exists()).toBe(true)
    })
  })

  describe("弹出模式属性", () => {
    const modes = ["top", "bottom", "left", "right", "center"] as const

    modes.forEach((mode) => {
      it(`应接受 ${mode} 模式属性`, () => {
        const wrapper = mount(UiPopup, {
          props: { mode },
          global: { stubs },
        })

        expect(wrapper.props("mode")).toBe(mode)
      })
    })

    it("默认模式应为 bottom", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("mode")).toBe("bottom")
    })

    modes.forEach((mode) => {
      it(`${mode} 模式应渲染对应的 CSS 类名`, async () => {
        const wrapper = mount(UiPopup, {
          props: { show: true, mode },
          global: { stubs },
        })

        await waitForTransition()

        const popup = wrapper.find(".ui-popup")
        expect(popup.exists()).toBe(true)
        expect(popup.classes()).toContain(`ui-popup--${mode}`)
      })
    })
  })

  describe("尺寸属性", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiPopup, {
        props: { width: 300 },
        global: { stubs },
      })

      expect(wrapper.props("width")).toBe(300)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiPopup, {
        props: { height: 400 },
        global: { stubs },
      })

      expect(wrapper.props("height")).toBe(400)
    })

    it("应支持最大宽度", () => {
      const wrapper = mount(UiPopup, {
        props: { maxWidth: 500 },
        global: { stubs },
      })

      expect(wrapper.props("maxWidth")).toBe(500)
    })

    it("应支持最大高度", () => {
      const wrapper = mount(UiPopup, {
        props: { maxHeight: 600 },
        global: { stubs },
      })

      expect(wrapper.props("maxHeight")).toBe(600)
    })

    it("应支持字符串类型的尺寸", () => {
      const wrapper = mount(UiPopup, {
        props: { width: "300rpx", height: "400rpx" },
        global: { stubs },
      })

      expect(wrapper.props("width")).toBe("300rpx")
      expect(wrapper.props("height")).toBe("400rpx")
    })
  })

  describe("遮罩层", () => {
    it("overlay 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("overlay")).toBe(true)
    })

    it("overlay 为 false 时不应显示遮罩层", () => {
      const wrapper = mount(UiPopup, {
        props: { overlay: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(false)
    })

    it("overlay 为 true 时应显示遮罩层", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, overlay: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(true)
    })
  })

  describe("关闭按钮属性", () => {
    it("closeable 默认为 false", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeable")).toBe(false)
    })

    it("应支持自定义关闭图标", () => {
      const wrapper = mount(UiPopup, {
        props: { closeable: true, closeIcon: "close" },
        global: { stubs },
      })

      expect(wrapper.props("closeIcon")).toBe("close")
    })

    it("默认关闭图标为 cross", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeIcon")).toBe("cross")
    })

    const closePositions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const

    closePositions.forEach((position) => {
      it(`应支持关闭按钮位置 ${position}`, () => {
        const wrapper = mount(UiPopup, {
          props: { closeable: true, closeIconPosition: position },
          global: { stubs },
        })

        expect(wrapper.props("closeIconPosition")).toBe(position)
      })
    })

    it("closeable 为 true 时应渲染关闭按钮", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, closeable: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-popup__close").exists()).toBe(true)
    })

    it("closeable 为 false 时不应渲染关闭按钮", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, closeable: false },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-popup__close").exists()).toBe(false)
    })

    closePositions.forEach((position) => {
      it(`关闭按钮位置 ${position} 应渲染对应的 CSS 类名`, async () => {
        const wrapper = mount(UiPopup, {
          props: { show: true, closeable: true, closeIconPosition: position },
          global: { stubs },
        })

        await waitForTransition()

        const closeBtn = wrapper.find(".ui-popup__close")
        expect(closeBtn.exists()).toBe(true)
        expect(closeBtn.classes()).toContain(`ui-popup__close--${position}`)
      })
    })
  })

  describe("样式属性", () => {
    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiPopup, {
        props: { background: "#ffffff" },
        global: { stubs },
      })

      expect(wrapper.props("background")).toBe("#ffffff")
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiPopup, {
        props: { borderRadius: 20 },
        global: { stubs },
      })

      expect(wrapper.props("borderRadius")).toBe(20)
    })

    it("默认圆角为 16rpx", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("borderRadius")).toBe("16rpx")
    })

    it("应支持自定义 z-index", () => {
      const wrapper = mount(UiPopup, {
        props: { zIndex: 1000 },
        global: { stubs },
      })

      expect(wrapper.props("zIndex")).toBe(1000)
    })

    it("应支持自定义动画时长", () => {
      const wrapper = mount(UiPopup, {
        props: { duration: 500 },
        global: { stubs },
      })

      expect(wrapper.props("duration")).toBe(500)
    })

    it("默认动画时长为 300", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("duration")).toBe(300)
    })
  })

  describe("安全区域属性", () => {
    it("safeAreaInsetTop 默认为 false", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("safeAreaInsetTop")).toBe(false)
    })

    it("safeAreaInsetBottom 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })

    it("应支持启用顶部安全区域", () => {
      const wrapper = mount(UiPopup, {
        props: { safeAreaInsetTop: true },
        global: { stubs },
      })

      expect(wrapper.props("safeAreaInsetTop")).toBe(true)
    })

    it("safeAreaInsetTop 为 true 时应渲染顶部安全区域组件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, safeAreaInsetTop: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-top-stub").exists()).toBe(true)
    })

    it("safeAreaInsetBottom 为 true 时应渲染底部安全区域组件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, safeAreaInsetBottom: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-bottom-stub").exists()).toBe(true)
    })
  })

  describe("事件处理", () => {
    it("打开弹出层应触发 open 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("应触发 update:show 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })

    it("点击遮罩层应触发 clickOverlay 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, overlay: true, closeOnClickOverlay: true },
        global: { stubs },
      })

      await waitForTransition()

      const overlay = wrapper.find(".ui-overlay-stub")
      await overlay.trigger("click")

      expect(wrapper.emitted("clickOverlay")).toBeTruthy()
    })

    it("点击遮罩层且 closeOnClickOverlay 为 true 时应触发关闭", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, overlay: true, closeOnClickOverlay: true },
        global: { stubs },
      })

      await waitForTransition()

      const overlay = wrapper.find(".ui-overlay-stub")
      await overlay.trigger("click")

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      // 第一次是打开时触发的 true，第二次是点击遮罩关闭时触发的 false
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })

    it("closeOnClickOverlay 为 false 时点击遮罩层不应触发关闭", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, overlay: true, closeOnClickOverlay: false },
        global: { stubs },
      })

      await waitForTransition()

      const overlay = wrapper.find(".ui-overlay-stub")
      await overlay.trigger("click")

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      // 只有打开时的 true 事件，没有关闭的 false 事件
      const hasCloseEvent = updateShowEvents.some((event) => event[0] === false)
      expect(hasCloseEvent).toBe(false)
    })

    it("点击关闭按钮应触发 clickClose 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, closeable: true },
        global: { stubs },
      })

      await waitForTransition()

      const closeBtn = wrapper.find(".ui-popup__close")
      await closeBtn.trigger("click")

      expect(wrapper.emitted("clickClose")).toBeTruthy()
    })

    it("点击关闭按钮应触发关闭", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, closeable: true },
        global: { stubs },
      })

      await waitForTransition()

      const closeBtn = wrapper.find(".ui-popup__close")
      await closeBtn.trigger("click")

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })
  })

  describe("点击遮罩关闭属性", () => {
    it("closeOnClickOverlay 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("应支持禁用点击遮罩关闭", () => {
      const wrapper = mount(UiPopup, {
        props: { closeOnClickOverlay: false },
        global: { stubs },
      })

      expect(wrapper.props("closeOnClickOverlay")).toBe(false)
    })
  })

  describe("懒加载属性", () => {
    it("lazyRender 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("应支持禁用懒加载", () => {
      const wrapper = mount(UiPopup, {
        props: { lazyRender: false },
        global: { stubs },
      })

      expect(wrapper.props("lazyRender")).toBe(false)
    })
  })

  describe("自定义样式属性", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiPopup, {
        props: { customClass: "my-popup" },
        global: { stubs },
      })

      expect(wrapper.props("customClass")).toBe("my-popup")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiPopup, {
        props: { customStyle: { marginTop: "10px" } },
        global: { stubs },
      })

      expect(wrapper.props("customStyle")).toEqual({ marginTop: "10px" })
    })

    it("应支持自定义遮罩层样式", () => {
      const wrapper = mount(UiPopup, {
        props: { overlayStyle: { backgroundColor: "rgba(0,0,0,0.5)" } },
        global: { stubs },
      })

      expect(wrapper.props("overlayStyle")).toEqual({ backgroundColor: "rgba(0,0,0,0.5)" })
    })

    it("自定义类名应被应用到弹出层元素", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true, customClass: "my-custom-popup" },
        global: { stubs },
      })

      await waitForTransition()

      const popup = wrapper.find(".ui-popup")
      expect(popup.classes()).toContain("my-custom-popup")
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("调用 open 方法应打开弹出层", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      wrapper.vm.open()
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("调用 close 方法应关闭弹出层", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      wrapper.vm.close()
      await waitForTransition()

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确设置", () => {
      const wrapper = mount(UiPopup, {
        props: {
          mode: "center",
          closeable: true,
          overlay: true,
          borderRadius: 20,
          customClass: "my-popup",
        },
        global: { stubs },
      })

      expect(wrapper.props("mode")).toBe("center")
      expect(wrapper.props("closeable")).toBe(true)
      expect(wrapper.props("overlay")).toBe(true)
      expect(wrapper.props("borderRadius")).toBe(20)
      expect(wrapper.props("customClass")).toBe("my-popup")
    })

    it("多个属性的完整弹出层应正确渲染", async () => {
      const wrapper = mount(UiPopup, {
        props: {
          show: true,
          mode: "center",
          closeable: true,
          overlay: true,
          borderRadius: 20,
          customClass: "my-popup",
          safeAreaInsetTop: true,
          safeAreaInsetBottom: true,
        },
        global: { stubs },
      })

      await waitForTransition()

      const popup = wrapper.find(".ui-popup")
      expect(popup.exists()).toBe(true)
      expect(popup.classes()).toContain("ui-popup--center")
      expect(popup.classes()).toContain("my-popup")
      expect(wrapper.find(".ui-popup__close").exists()).toBe(true)
      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(true)
      expect(wrapper.find(".ui-safe-area-top-stub").exists()).toBe(true)
      expect(wrapper.find(".ui-safe-area-bottom-stub").exists()).toBe(true)
    })

    it("快速切换 show 状态应正确处理", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      // 打开
      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.find(".ui-popup").exists()).toBe(true)

      // 关闭
      await wrapper.setProps({ show: false })
      await waitForTransition()

      // 再次打开
      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.find(".ui-popup").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应渲染默认插槽内容", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true },
        global: { stubs },
        slots: {
          default: "<div class=\"slot-content\">测试内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".slot-content").exists()).toBe(true)
      expect(wrapper.find(".slot-content").text()).toBe("测试内容")
    })

    it("应渲染 header 插槽内容", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true },
        global: { stubs },
        slots: {
          header: "<div class=\"header-content\">头部内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".header-content").exists()).toBe(true)
    })

    it("应渲染 footer 插槽内容", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: true },
        global: { stubs },
        slots: {
          footer: "<div class=\"footer-content\">底部内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".footer-content").exists()).toBe(true)
    })
  })
})
