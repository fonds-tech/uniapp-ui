/**
 * ui-arc 组件单元测试
 * 测试弧形组件的 props、events 和渲染逻辑
 */

import UiArc from "@/uni_modules/uniapp-ui/ui-arc/ui-arc.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-arc 弧形组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认弧形组件", async () => {
      const wrapper = mount(UiArc)

      await waitForTransition()

      expect(wrapper.find(".ui-arc").exists()).toBe(true)
    })

    it("应渲染内部弧形", async () => {
      const wrapper = mount(UiArc)

      await waitForTransition()

      expect(wrapper.find(".ui-arc__inner").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义高度", () => {
      const wrapper = mount(UiArc, {
        props: { height: "100rpx" },
      })

      expect(wrapper.props("height")).toBe("100rpx")
    })

    it("应支持数字类型高度", () => {
      const wrapper = mount(UiArc, {
        props: { height: 80 },
      })

      expect(wrapper.props("height")).toBe(80)
    })
  })

  describe("弧度配置", () => {
    it("应支持自定义弧度百分比", () => {
      const wrapper = mount(UiArc, {
        props: { curvature: 120 },
      })

      expect(wrapper.props("curvature")).toBe(120)
    })

    it("默认弧度百分比应为 120", () => {
      const wrapper = mount(UiArc)

      expect(wrapper.props("curvature")).toBe(120)
    })

    it("弧度超过最大值时应进行限制", async () => {
      const wrapper = mount(UiArc, {
        props: { curvature: 800 },
      })

      await waitForTransition()

      const innerStyle = wrapper.find(".ui-arc__inner").attributes("style") || ""
      expect(innerStyle).toContain("left: -200%")
    })
  })

  describe("位置配置", () => {
    it("应支持自定义 top 偏移", () => {
      const wrapper = mount(UiArc, {
        props: { top: "20rpx" },
      })

      expect(wrapper.props("top")).toBe("20rpx")
    })

    it("应支持自定义 left 偏移", () => {
      const wrapper = mount(UiArc, {
        props: { left: "10rpx" },
      })

      expect(wrapper.props("left")).toBe("10rpx")
    })
  })

  describe("固定定位", () => {
    it("默认固定定位", () => {
      const wrapper = mount(UiArc)

      expect(wrapper.props("fixed")).toBe(false)
    })

    it("应支持固定定位", () => {
      const wrapper = mount(UiArc, {
        props: { fixed: true },
      })

      expect(wrapper.props("fixed")).toBe(true)
    })

    it("fixed 为 true 时应设置 fixed 定位", async () => {
      const wrapper = mount(UiArc, {
        props: { fixed: true },
      })

      await waitForTransition()

      const style = wrapper.find(".ui-arc").attributes("style") || ""
      expect(style).toContain("position: fixed")
    })
  })

  describe("方向配置", () => {
    it("direction 为 top 时应添加对应类名", () => {
      const wrapper = mount(UiArc, {
        props: { direction: "top" },
      })

      expect(wrapper.classes()).toContain("ui-arc--top")
    })
  })

  describe("样式配置", () => {
    it("应支持层级", () => {
      const wrapper = mount(UiArc, {
        props: { zIndex: 10 },
      })

      expect(wrapper.props("zIndex")).toBe(10)
    })

    it("应支持背景颜色", () => {
      const wrapper = mount(UiArc, {
        props: { background: "#1989fa" },
      })

      expect(wrapper.props("background")).toBe("#1989fa")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiArc, {
        props: { customClass: "my-arc" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-arc")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiArc, {
        props: {
          customStyle: { opacity: 0.8 },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-arc").exists()).toBe(true)
    })
  })

  describe("点击事件", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(UiArc)

      await waitForTransition()

      await wrapper.find(".ui-arc").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("边界情况", () => {
    it("弧度百分比小于 100 时应正常渲染", async () => {
      const wrapper = mount(UiArc, {
        props: { curvature: 80 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-arc").exists()).toBe(true)
    })

    it("弧度百分比大于 100 时应正常渲染", async () => {
      const wrapper = mount(UiArc, {
        props: { curvature: 150 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-arc").exists()).toBe(true)
    })
  })
})
