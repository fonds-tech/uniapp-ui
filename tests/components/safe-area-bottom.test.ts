/**
 * ui-safe-area-bottom 组件单元测试
 * 测试底部安全区域组件的 props、events 和渲染逻辑
 */

import UiSafeAreaBottom from "@/uni_modules/uniapp-ui/ui-safe-area-bottom/ui-safe-area-bottom.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-safe-area-bottom 底部安全区域组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认底部安全区域组件", async () => {
      const wrapper = mount(UiSafeAreaBottom)

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-bottom").exists()).toBe(true)
    })

    it("初始化应触发 height 事件并应用高度", async () => {
      const wrapper = mount(UiSafeAreaBottom)

      await waitForTransition()

      const emitted = wrapper.emitted("height")
      expect(emitted).toBeTruthy()
      expect(emitted?.[0]?.[0]).toBe(3)

      const style = wrapper.find(".ui-safe-area-bottom").attributes("style") || ""
      expect(style).toContain("height: 3px")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiSafeAreaBottom, {
        props: { background: "#fff" },
      })

      expect(wrapper.props("background")).toBe("#fff")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSafeAreaBottom, {
        props: { customClass: "my-safe-area" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-safe-area")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSafeAreaBottom, {
        props: {
          customStyle: { minHeight: "20px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-bottom").exists()).toBe(true)
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiSafeAreaBottom)

      expect(wrapper.vm.name).toBe("ui-safe-area-bottom")
    })
  })

  describe("边界情况", () => {
    it("无安全区域时应正常渲染", async () => {
      const wrapper = mount(UiSafeAreaBottom)

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-bottom").exists()).toBe(true)
    })
  })
})
