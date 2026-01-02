/**
 * ui-poster 组件单元测试
 * 测试海报生成组件的 props、methods 和渲染逻辑
 */

import UiPoster from "@/ui/ui-poster/ui-poster.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-poster 海报生成组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认海报组件", async () => {
      const wrapper = mount(UiPoster)

      await waitForTransition()

      expect(wrapper.find(".ui-poster").exists()).toBe(true)
    })

    it("应渲染 canvas 元素", async () => {
      const wrapper = mount(UiPoster)

      await waitForTransition()

      // 组件使用 canvas 标签
      expect(wrapper.find("canvas").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiPoster, {
        props: { width: 600 },
      })

      expect(wrapper.props("width")).toBe(600)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiPoster, {
        props: { height: 800 },
      })

      expect(wrapper.props("height")).toBe(800)
    })

    it("默认宽度应为 700", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.props("width")).toBe(700)
    })

    it("默认高度应为 1100", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.props("height")).toBe(1100)
    })
  })

  describe("像素比配置", () => {
    it("应支持像素比", () => {
      const wrapper = mount(UiPoster, {
        props: { pixel: 2 },
      })

      expect(wrapper.props("pixel")).toBe(2)
    })

    it("默认像素比应为 3", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.props("pixel")).toBe(3)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 draw 方法", () => {
      const wrapper = mount(UiPoster)

      expect(typeof wrapper.vm.draw).toBe("function")
    })

    it("应暴露 save 方法", () => {
      const wrapper = mount(UiPoster)

      expect(typeof wrapper.vm.save).toBe("function")
    })

    it("应暴露 usePixel 方法", () => {
      const wrapper = mount(UiPoster)

      expect(typeof wrapper.vm.usePixel).toBe("function")
    })

    it("应暴露 toast 方法", () => {
      const wrapper = mount(UiPoster)

      expect(typeof wrapper.vm.toast).toBe("function")
    })
  })

  describe("内部状态", () => {
    it("应有 canvasId", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.vm.canvasId).toBeDefined()
      expect(typeof wrapper.vm.canvasId).toBe("string")
    })

    it("应有 cv_width", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.vm.cv_width).toBeDefined()
    })

    it("应有 cv_height", () => {
      const wrapper = mount(UiPoster)

      expect(wrapper.vm.cv_height).toBeDefined()
    })
  })

  describe("边界情况", () => {
    it("宽高为 0 时应正常渲染", async () => {
      const wrapper = mount(UiPoster, {
        props: { width: 0, height: 0 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-poster").exists()).toBe(true)
    })

    it("字符串类型尺寸应正常渲染", () => {
      const wrapper = mount(UiPoster, {
        props: { width: "500", height: "800" },
      })

      expect(wrapper.props("width")).toBe("500")
      expect(wrapper.props("height")).toBe("800")
    })
  })
})
