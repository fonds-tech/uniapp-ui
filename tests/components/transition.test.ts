import UiTransition from "@/uni_modules/uniapp-ui/ui-transition/ui-transition.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiTransition 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-transition").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
        slots: {
          default: "<div class=\"custom-content\">过渡内容</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("show 属性测试", () => {
    it("默认不显示", () => {
      const wrapper = mount(UiTransition)
      expect(wrapper.props("show")).toBe(false)
    })

    it("show 为 true 时应该显示", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("name 属性测试", () => {
    it("默认动画名称应该是 fade", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("name")).toBe("fade")
    })

    it("应该支持 zoom-in 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "zoom-in" },
      })
      expect(wrapper.props("name")).toBe("zoom-in")
    })

    it("应该支持 fade-up 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "fade-up" },
      })
      expect(wrapper.props("name")).toBe("fade-up")
    })

    it("应该支持 fade-down 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "fade-down" },
      })
      expect(wrapper.props("name")).toBe("fade-down")
    })

    it("应该支持 fade-left 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "fade-left" },
      })
      expect(wrapper.props("name")).toBe("fade-left")
    })

    it("应该支持 fade-right 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "fade-right" },
      })
      expect(wrapper.props("name")).toBe("fade-right")
    })

    it("应该支持 slide-up 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "slide-up" },
      })
      expect(wrapper.props("name")).toBe("slide-up")
    })

    it("应该支持 slide-down 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "slide-down" },
      })
      expect(wrapper.props("name")).toBe("slide-down")
    })

    it("应该支持 slide-left 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "slide-left" },
      })
      expect(wrapper.props("name")).toBe("slide-left")
    })

    it("应该支持 slide-right 动画", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, name: "slide-right" },
      })
      expect(wrapper.props("name")).toBe("slide-right")
    })
  })

  describe("duration 属性测试", () => {
    it("默认 duration 应该是 300ms", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("duration")).toBe(300)
    })

    it("应该支持自定义过渡时间", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, duration: 500 },
      })
      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("zIndex 属性测试", () => {
    it("应该支持自定义层级", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, zIndex: 100 },
      })
      expect(wrapper.props("zIndex")).toBe(100)
    })
  })

  describe("lazyRender 属性测试", () => {
    it("默认应该懒渲染", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("应该支持禁用懒渲染", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, lazyRender: false },
      })
      expect(wrapper.props("lazyRender")).toBe(false)
    })
  })

  describe("enterTimingFunction 属性测试", () => {
    it("默认 enterTimingFunction 应该是 ease-out", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("enterTimingFunction")).toBe("ease-out")
    })

    it("应该支持自定义进入动画函数", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, enterTimingFunction: "ease-in-out" },
      })
      expect(wrapper.props("enterTimingFunction")).toBe("ease-in-out")
    })
  })

  describe("leaveTimingFunction 属性测试", () => {
    it("默认 leaveTimingFunction 应该是 ease-in", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      expect(wrapper.props("leaveTimingFunction")).toBe("ease-in")
    })

    it("应该支持自定义离开动画函数", () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, leaveTimingFunction: "ease-out" },
      })
      expect(wrapper.props("leaveTimingFunction")).toBe("ease-out")
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })
      await waitForTransition()
      await wrapper.find(".ui-transition").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("show 从 false 变为 true 应触发 enter 系列事件", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: false },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("beforeEnter")).toBeTruthy()
      expect(wrapper.emitted("enter")).toBeTruthy()
      expect(wrapper.emitted("afterEnter")).toBeTruthy()
      expect(wrapper.emitted("update:show")?.[0]).toEqual([true])
    })

    it("show 从 true 变为 false 应触发 leave 系列事件", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true },
      })

      await waitForTransition()
      await wrapper.setProps({ show: false })
      await waitForTransition()

      expect(wrapper.emitted("beforeLeave")).toBeTruthy()
      expect(wrapper.emitted("leave")).toBeTruthy()
      expect(wrapper.emitted("afterLeave")).toBeTruthy()
      expect(wrapper.emitted("update:show")?.some((item) => item[0] === false)).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 enter/leave 方法", () => {
      const wrapper = mount(UiTransition)
      expect(typeof wrapper.vm.enter).toBe("function")
      expect(typeof wrapper.vm.leave).toBe("function")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, customClass: "my-transition" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-transition.my-transition").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiTransition, {
        props: { show: true, customStyle: { padding: "20rpx" } },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", () => {
      const wrapper = mount(UiTransition)
      expect(wrapper.props("show")).toBe(false)
      expect(wrapper.props("name")).toBe("fade")
      expect(wrapper.props("duration")).toBe(300)
    })
  })
})
