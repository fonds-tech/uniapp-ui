/**
 * ui-safe-area-top 组件单元测试
 * 测试顶部安全区域组件的 props、events 和渲染逻辑
 */

import UiSafeAreaTop from "@/uni_modules/uniapp-ui/ui-safe-area-top/ui-safe-area-top.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-safe-area-top 顶部安全区域组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认顶部安全区域组件", async () => {
      const wrapper = mount(UiSafeAreaTop)

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-top").exists()).toBe(true)
    })

    it("应应用系统状态栏高度", async () => {
      const wrapper = mount(UiSafeAreaTop)

      await waitForTransition()

      const style = wrapper.find(".ui-safe-area-top").attributes("style") || ""
      expect(style).toContain("height: 20px")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiSafeAreaTop, {
        props: { background: "#fff" },
      })

      expect(wrapper.props("background")).toBe("#fff")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSafeAreaTop, {
        props: { customClass: "my-safe-area" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-safe-area")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSafeAreaTop, {
        props: {
          customStyle: { minHeight: "20px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-top").exists()).toBe(true)
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiSafeAreaTop)

      expect(wrapper.vm.name).toBe("ui-safe-area-top")
    })
  })

  describe("边界情况", () => {
    it("无安全区域时应正常渲染", async () => {
      const wrapper = mount(UiSafeAreaTop)

      await waitForTransition()

      expect(wrapper.find(".ui-safe-area-top").exists()).toBe(true)
    })
  })
})
