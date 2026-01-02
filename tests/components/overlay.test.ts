/**
 * ui-overlay 组件单元测试
 * 测试遮罩层组件的 props、events 和渲染逻辑
 *
 * 注意：该组件使用 useTransition hook，内部用 setInterval 模拟 requestAnimationFrame
 * 需要使用 waitForTransition 辅助函数来推进时间，确保动画初始化完成
 */

import UiOverlay from "@/ui/ui-overlay/ui-overlay.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe, vi, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-overlay 遮罩层组件", () => {
  // 在每个测试前启用假定时器
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 在每个测试后恢复真实定时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认遮罩层组件", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.exists()).toBe(true)
    })

    it("show 为 false 且 lazyRender 为 true 时不应渲染遮罩层", () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false, lazyRender: true },
      })

      expect(wrapper.find(".ui-overlay").exists()).toBe(false)
    })

    it("lazyRender 为 false 时应立即渲染", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false, lazyRender: false },
      })

      // 即使 show=false，lazyRender=false 时也应该渲染 DOM 元素
      await waitForTransition()
      expect(wrapper.find(".ui-overlay").exists()).toBe(true)
    })

    it("show 为 true 时应渲染遮罩层", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      // 需要等待过渡动画初始化完成
      await waitForTransition()
      expect(wrapper.find(".ui-overlay").exists()).toBe(true)
    })
  })

  describe("显示控制属性", () => {
    it("show 默认为 false", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("show")).toBe(false)
    })

    it("应接受 show 属性", () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("透明度属性", () => {
    it("默认透明度应为 0.7", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("opacity")).toBe(0.7)
    })

    it("应支持自定义透明度", () => {
      const wrapper = mount(UiOverlay, {
        props: { opacity: 0.5 },
      })

      expect(wrapper.props("opacity")).toBe(0.5)
    })

    it("应支持完全透明", () => {
      const wrapper = mount(UiOverlay, {
        props: { opacity: 0 },
      })

      expect(wrapper.props("opacity")).toBe(0)
    })

    it("应支持完全不透明", () => {
      const wrapper = mount(UiOverlay, {
        props: { opacity: 1 },
      })

      expect(wrapper.props("opacity")).toBe(1)
    })

    it("透明度应正确应用到样式中", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true, opacity: 0.5 },
      })

      await waitForTransition()
      const overlay = wrapper.find(".ui-overlay")
      expect(overlay.exists()).toBe(true)
      // 检查背景色包含正确的透明度
      const style = overlay.attributes("style")
      expect(style).toContain("rgba(0, 0, 0, 0.5)")
    })
  })

  describe("层级属性", () => {
    it("应支持自定义 z-index", () => {
      const wrapper = mount(UiOverlay, {
        props: { zIndex: 1000 },
      })

      expect(wrapper.props("zIndex")).toBe(1000)
    })

    it("应支持字符串类型的 z-index", () => {
      const wrapper = mount(UiOverlay, {
        props: { zIndex: "2000" },
      })

      expect(wrapper.props("zIndex")).toBe("2000")
    })

    it("z-index 应正确应用到样式中", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true, zIndex: 1000 },
      })

      await waitForTransition()
      const overlay = wrapper.find(".ui-overlay")
      expect(overlay.exists()).toBe(true)
      const style = overlay.attributes("style")
      expect(style).toContain("z-index: 1000")
    })
  })

  describe("动画属性", () => {
    it("默认动画时长应为 300", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("duration")).toBe(300)
    })

    it("应支持自定义动画时长", () => {
      const wrapper = mount(UiOverlay, {
        props: { duration: 500 },
      })

      expect(wrapper.props("duration")).toBe(500)
    })

    it("默认进入动画函数应为 ease-out", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("enterTimingFunction")).toBe("ease-out")
    })

    it("应支持自定义进入动画函数", () => {
      const wrapper = mount(UiOverlay, {
        props: { enterTimingFunction: "linear" },
      })

      expect(wrapper.props("enterTimingFunction")).toBe("linear")
    })

    it("默认离开动画函数应为 ease-in", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("leaveTimingFunction")).toBe("ease-in")
    })

    it("应支持自定义离开动画函数", () => {
      const wrapper = mount(UiOverlay, {
        props: { leaveTimingFunction: "ease-in-out" },
      })

      expect(wrapper.props("leaveTimingFunction")).toBe("ease-in-out")
    })
  })

  describe("懒加载属性", () => {
    it("lazyRender 默认为 true", () => {
      const wrapper = mount(UiOverlay)

      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("应支持禁用懒加载", () => {
      const wrapper = mount(UiOverlay, {
        props: { lazyRender: false },
      })

      expect(wrapper.props("lazyRender")).toBe(false)
    })
  })

  describe("事件处理", () => {
    it("打开遮罩层应触发 open 事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("应触发 update:show 事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })

    it("点击遮罩层应触发 click 事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()
      const overlay = wrapper.find(".ui-overlay")
      await overlay.trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("关闭遮罩层应触发 close 事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()

      await wrapper.setProps({ show: false })
      await waitForTransition()

      expect(wrapper.emitted("close")).toBeTruthy()
    })
  })

  describe("自定义样式属性", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiOverlay, {
        props: { customClass: "my-overlay" },
      })

      expect(wrapper.props("customClass")).toBe("my-overlay")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiOverlay, {
        props: { customStyle: { backgroundColor: "rgba(0,0,0,0.8)" } },
      })

      expect(wrapper.props("customStyle")).toEqual({ backgroundColor: "rgba(0,0,0,0.8)" })
    })

    it("应支持自定义样式字符串", () => {
      const wrapper = mount(UiOverlay, {
        props: { customStyle: "background-color: rgba(0,0,0,0.8)" },
      })

      expect(wrapper.props("customStyle")).toBe("background-color: rgba(0,0,0,0.8)")
    })

    it("自定义类名应正确应用到 DOM", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true, customClass: "my-overlay" },
      })

      await waitForTransition()
      const overlay = wrapper.find(".ui-overlay")
      expect(overlay.classes()).toContain("my-overlay")
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiOverlay)

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiOverlay)

      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("调用 open 方法应显示遮罩层", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false },
      })

      wrapper.vm.open()
      await waitForTransition()

      expect(wrapper.find(".ui-overlay").exists()).toBe(true)
      expect(wrapper.emitted("update:show")).toBeTruthy()
    })

    it("调用 close 方法应关闭遮罩层", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()
      expect(wrapper.find(".ui-overlay").exists()).toBe(true)

      wrapper.vm.close()
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
      // 检查最后一次 update:show 事件的值为 false
      const emittedEvents = wrapper.emitted("update:show") as any[][]
      expect(emittedEvents[emittedEvents.length - 1][0]).toBe(false)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
        slots: {
          default: "<div class='overlay-content'>遮罩层内容</div>",
        },
      })

      await waitForTransition()
      expect(wrapper.find(".overlay-content").exists()).toBe(true)
      expect(wrapper.find(".overlay-content").text()).toBe("遮罩层内容")
    })

    it("lazyRender 为 false 时默认插槽也应渲染", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false, lazyRender: false },
        slots: {
          default: "<div class='overlay-content'>遮罩层内容</div>",
        },
      })

      await waitForTransition()
      expect(wrapper.find(".overlay-content").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确设置", () => {
      const wrapper = mount(UiOverlay, {
        props: {
          opacity: 0.5,
          zIndex: 1000,
          duration: 500,
          customClass: "my-overlay",
        },
      })

      expect(wrapper.props("opacity")).toBe(0.5)
      expect(wrapper.props("zIndex")).toBe(1000)
      expect(wrapper.props("duration")).toBe(500)
      expect(wrapper.props("customClass")).toBe("my-overlay")
    })

    it("快速切换 show 状态应正确处理", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false },
      })

      // 快速切换
      await wrapper.setProps({ show: true })
      await waitForTransition()
      await wrapper.setProps({ show: false })
      await waitForTransition()
      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.find(".ui-overlay").exists()).toBe(true)
    })

    it("重复设置相同的 show 值不应重复触发事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()
      const initialOpenCount = (wrapper.emitted("open") || []).length

      // 再次设置 show: true
      await wrapper.setProps({ show: true })
      await waitForTransition()

      // open 事件数量不应增加
      expect((wrapper.emitted("open") || []).length).toBe(initialOpenCount)
    })
  })

  describe("样式计算", () => {
    it("display 样式应根据可见状态正确设置", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()
      const overlay = wrapper.find(".ui-overlay")
      const style = overlay.attributes("style")
      expect(style).toContain("display: block")
    })

    it("关闭后 display 样式应为 none", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: true },
      })

      await waitForTransition()
      await wrapper.setProps({ show: false })
      // 关闭动画需要更长时间完成（包括动画持续时间 300ms）
      await waitForTransition(500)

      const overlay = wrapper.find(".ui-overlay")
      if (overlay.exists()) {
        const style = overlay.attributes("style")
        expect(style).toContain("display: none")
      }
    })
  })
})
