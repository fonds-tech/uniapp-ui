/**
 * ui-overlay 组件单元测试
 * 测试遮罩层组件的 props、events 和渲染逻辑
 */

import UiOverlay from "@/ui/ui-overlay/ui-overlay.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-overlay 遮罩层组件", () => {
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

    it("lazyRender 为 false 时应立即渲染", () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false, lazyRender: false },
      })

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
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("应触发 update:show 事件", async () => {
      const wrapper = mount(UiOverlay, {
        props: { show: false },
      })

      await wrapper.setProps({ show: true })
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted("update:show")).toBeTruthy()
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
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiOverlay, {
        props: { lazyRender: false },
        slots: {
          default: "<div class='overlay-content'>遮罩层内容</div>",
        },
      })

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
  })
})
