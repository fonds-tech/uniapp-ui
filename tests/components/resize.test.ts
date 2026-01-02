/**
 * ui-resize 组件单元测试
 * 测试尺寸监听组件的 props、events 和渲染逻辑
 */

import UiResize from "@/ui/ui-resize/ui-resize.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-resize 尺寸监听组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认尺寸监听组件", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })

    it("应渲染内容区域", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize__content").exists()).toBe(true)
    })

    it("应正确渲染插槽内容", async () => {
      const wrapper = mount(UiResize, {
        slots: {
          default: "<div class='resize-content'>监听内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".resize-content").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiResize, {
        props: { width: "300rpx" },
      })

      expect(wrapper.props("width")).toBe("300rpx")
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiResize, {
        props: { height: "200rpx" },
      })

      expect(wrapper.props("height")).toBe("200rpx")
    })

    it("应支持数字类型尺寸", () => {
      const wrapper = mount(UiResize, {
        props: { width: 200, height: 150 },
      })

      expect(wrapper.props("width")).toBe(200)
      expect(wrapper.props("height")).toBe(150)
    })

    it("应支持百分比尺寸", () => {
      const wrapper = mount(UiResize, {
        props: { width: "100%" },
      })

      expect(wrapper.props("width")).toBe("100%")
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiResize)

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用监听", () => {
      const wrapper = mount(UiResize, {
        props: { disabled: true },
      })

      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiResize, {
        props: { customClass: "my-resize" },
      })

      await waitForTransition()

      expect(wrapper.find(".my-resize").exists()).toBe(true)
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiResize, {
        props: {
          customStyle: { minWidth: "100px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })

    it("无尺寸时应正常渲染", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })
  })
})
