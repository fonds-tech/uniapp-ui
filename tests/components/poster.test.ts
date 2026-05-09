/**
 * ui-poster 组件单元测试
 * 测试海报生成组件的 props、暴露方法和 ready 事件。
 * 注：内部 helper (如像素换算 / 文本测量) 不再 expose，转为黑盒测试公开 API。
 */

import UiPoster from "@/uni_modules/uniapp-ui/ui-poster/ui-poster.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-poster 海报生成组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认海报组件", () => {
      const wrapper = mount(UiPoster)
      expect(wrapper.find(".ui-poster").exists()).toBe(true)
    })

    it("应渲染 canvas 元素", () => {
      const wrapper = mount(UiPoster)
      expect(wrapper.find("canvas").exists()).toBe(true)
    })

    it("canvas 元素应有唯一 canvasId", () => {
      const a = mount(UiPoster)
      const b = mount(UiPoster)
      // 多实例不能共享 canvasId，否则同页面共存时画布串扰
      expect(a.vm.canvasId).not.toBe(b.vm.canvasId)
      expect(a.vm.canvasId).toMatch(/^ui-poster-/)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiPoster, { props: { width: 600 } })
      expect(wrapper.props("width")).toBe(600)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiPoster, { props: { height: 800 } })
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
      const wrapper = mount(UiPoster, { props: { pixel: 2 } })
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

    it("应暴露 canvasId", () => {
      const wrapper = mount(UiPoster)
      expect(typeof wrapper.vm.canvasId).toBe("string")
    })
  })

  describe("事件触发", () => {
    it("挂载后应触发 ready 事件", async () => {
      const wrapper = mount(UiPoster)
      await vi.advanceTimersByTimeAsync(60)
      expect(wrapper.emitted("ready")).toBeTruthy()
    })
  })

  describe("边界情况", () => {
    it("宽高为 0 时应正常渲染", () => {
      const wrapper = mount(UiPoster, { props: { width: 0, height: 0 } })
      expect(wrapper.find(".ui-poster").exists()).toBe(true)
    })

    it("字符串类型尺寸应正常渲染", () => {
      const wrapper = mount(UiPoster, { props: { width: "500", height: "800" } })
      expect(wrapper.props("width")).toBe("500")
      expect(wrapper.props("height")).toBe("800")
    })

    it("draw 不传 items 应抛错", async () => {
      const wrapper = mount(UiPoster)
      await vi.advanceTimersByTimeAsync(60)
      await expect(wrapper.vm.draw([])).rejects.toThrow()
    })
  })
})
