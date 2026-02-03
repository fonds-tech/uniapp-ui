/**
 * ui-footer 组件单元测试
 * 测试底部固定组件的 props、events 和渲染逻辑
 */

import UiFooter from "@/uni_modules/uniapp-ui/ui-footer/ui-footer.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建 stub 组件
const stubs = {
  "ui-safe-area-bottom": {
    name: "ui-safe-area-bottom",
    template: "<div class=\"ui-safe-area-bottom-stub\"></div>",
  },
}

describe("ui-footer 底部固定组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认底部组件", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-footer").exists()).toBe(true)
    })

    it("应渲染内部区域", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-footer__inner").exists()).toBe(true)
    })

    it("应渲染占位符", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-footer__placeholder").exists()).toBe(true)
    })

    it("应正确渲染插槽内容", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
        slots: {
          default: "<div class='footer-content'>底部内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".footer-content").exists()).toBe(true)
    })
  })

  describe("样式配置", () => {
    it("应支持层级", () => {
      const wrapper = mount(UiFooter, {
        props: { zIndex: 200 },
        global: { stubs },
      })

      expect(wrapper.props("zIndex")).toBe(200)
    })

    it("应支持偏移量", () => {
      const wrapper = mount(UiFooter, {
        props: { offset: "10rpx" },
        global: { stubs },
      })

      expect(wrapper.props("offset")).toBe("10rpx")
    })

    it("应支持背景颜色", () => {
      const wrapper = mount(UiFooter, {
        props: { background: "#fff" },
        global: { stubs },
      })

      expect(wrapper.props("background")).toBe("#fff")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiFooter, {
        props: {
          customStyle: { boxShadow: "0 -2px 4px rgba(0,0,0,0.1)" },
        },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-footer").exists()).toBe(true)
    })
  })

  describe("安全区域", () => {
    it("默认应启用安全区域适配", () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })

      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })

    it("应支持禁用安全区域适配", () => {
      const wrapper = mount(UiFooter, {
        props: { safeAreaInsetBottom: false },
        global: { stubs },
      })

      expect(wrapper.props("safeAreaInsetBottom")).toBe(false)
    })

    it("启用安全区域时应添加对应类名", async () => {
      const wrapper = mount(UiFooter, {
        props: { safeAreaInsetBottom: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".safe-area-inset-bottom").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-footer").exists()).toBe(true)
    })

    it("resize 方法应触发 rect 与 height 事件", async () => {
      const wrapper = mount(UiFooter, {
        global: { stubs },
      })
      await waitForTransition()

      await wrapper.vm.resize()
      await waitForTransition()

      expect(wrapper.emitted("rect")).toBeTruthy()
      expect(wrapper.emitted("height")).toBeTruthy()
      expect(wrapper.emitted("height")?.[0]?.[0]).toBe(100)
    })
  })
})
