/**
 * ui-header 组件单元测试
 * 测试头部固定组件的 props、events 和渲染逻辑
 */

import UiHeader from "@/ui/ui-header/ui-header.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-header 头部固定组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认头部组件", async () => {
      const wrapper = mount(UiHeader)

      await waitForTransition()

      expect(wrapper.find(".ui-header").exists()).toBe(true)
    })

    it("应渲染内容区域", async () => {
      const wrapper = mount(UiHeader)

      await waitForTransition()

      expect(wrapper.find(".ui-header__content").exists()).toBe(true)
    })

    it("应渲染占位符", async () => {
      const wrapper = mount(UiHeader)

      await waitForTransition()

      expect(wrapper.find(".ui-header__placeholder").exists()).toBe(true)
    })

    it("应正确渲染插槽内容", async () => {
      const wrapper = mount(UiHeader, {
        slots: {
          default: "<div class='header-content'>头部内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".header-content").exists()).toBe(true)
    })
  })

  describe("样式配置", () => {
    it("应支持层级", () => {
      const wrapper = mount(UiHeader, {
        props: { zIndex: 200 },
      })

      expect(wrapper.props("zIndex")).toBe(200)
    })

    it("应支持偏移量", () => {
      const wrapper = mount(UiHeader, {
        props: { offset: "10rpx" },
      })

      expect(wrapper.props("offset")).toBe("10rpx")
    })

    it("应支持背景颜色", () => {
      const wrapper = mount(UiHeader, {
        props: { background: "#fff" },
      })

      expect(wrapper.props("background")).toBe("#fff")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiHeader, {
        props: {
          customStyle: { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-header").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiHeader)

      await waitForTransition()

      expect(wrapper.find(".ui-header").exists()).toBe(true)
    })
  })
})
