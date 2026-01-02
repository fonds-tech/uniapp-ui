/**
 * ui-icon-text 组件单元测试
 * 测试图标文本组件的 props、events 和渲染逻辑
 */

import UiIconText from "@/ui/ui-icon-text/ui-icon-text.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

// 创建 stub 组件
const stubs = {
  "ui-icon": {
    name: "ui-icon",
    template: '<span class="ui-icon-stub"></span>',
    props: ["name", "size", "color", "weight", "radius", "background", "customPrefix"],
  },
  "ui-text": {
    name: "ui-text",
    template: '<span class="ui-text-stub"><slot /></span>',
    props: ["color", "size", "weight"],
  },
}

describe("ui-icon-text 图标文本组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认图标文本组件", async () => {
      const wrapper = mount(UiIconText, {
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-icon-text").exists()).toBe(true)
    })

    it("应正确渲染带图标和文本", async () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", text: "首页" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("首页")
    })
  })

  describe("图标配置", () => {
    it("应支持设置图标名称", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "settings" },
        global: { stubs },
      })

      expect(wrapper.props("name")).toBe("settings")
    })

    it("应支持图标大小", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", size: "48rpx" },
        global: { stubs },
      })

      expect(wrapper.props("size")).toBe("48rpx")
    })

    it("应支持图标颜色", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", color: "#1989fa" },
        global: { stubs },
      })

      expect(wrapper.props("color")).toBe("#1989fa")
    })

    it("应支持图标圆角", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", radius: "8rpx" },
        global: { stubs },
      })

      expect(wrapper.props("radius")).toBe("8rpx")
    })

    it("应支持图标粗细", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", weight: 600 },
        global: { stubs },
      })

      expect(wrapper.props("weight")).toBe(600)
    })

    it("应支持自定义图标前缀", () => {
      const wrapper = mount(UiIconText, {
        props: { name: "custom", customPrefix: "my-icon" },
        global: { stubs },
      })

      expect(wrapper.props("customPrefix")).toBe("my-icon")
    })
  })

  describe("文本配置", () => {
    it("应支持设置文本", () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试文本" },
        global: { stubs },
      })

      expect(wrapper.props("text")).toBe("测试文本")
    })

    it("应支持文本颜色", () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试", textColor: "#666" },
        global: { stubs },
      })

      expect(wrapper.props("textColor")).toBe("#666")
    })

    it("应支持文本大小", () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试", textSize: "28rpx" },
        global: { stubs },
      })

      expect(wrapper.props("textSize")).toBe("28rpx")
    })

    it("应支持文本粗细", () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试", textWeight: 500 },
        global: { stubs },
      })

      expect(wrapper.props("textWeight")).toBe(500)
    })

    it("应支持文本间距", () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试", textGap: "16rpx" },
        global: { stubs },
      })

      expect(wrapper.props("textGap")).toBe("16rpx")
    })
  })

  describe("文本位置", () => {
    it("默认文本在右侧", async () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-icon-text--left")
    })

    it("textLeft 为 true 时文本在左侧", async () => {
      const wrapper = mount(UiIconText, {
        props: { text: "测试", textLeft: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-icon-text--left")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiIconText, {
        props: { background: "#f5f5f5" },
        global: { stubs },
      })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiIconText, {
        props: { customClass: "my-icon-text" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-icon-text")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiIconText, {
        props: {
          customStyle: { padding: "10px" },
        },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-icon-text").exists()).toBe(true)
    })
  })

  describe("点击事件", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home", text: "首页" },
        global: { stubs },
      })

      await waitForTransition()

      await wrapper.find(".ui-icon-text").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiIconText, {
        global: { stubs },
      })

      expect(wrapper.vm.name).toBe("ui-icon-text")
    })
  })

  describe("边界情况", () => {
    it("无图标时应正常渲染", async () => {
      const wrapper = mount(UiIconText, {
        props: { text: "仅文本" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-icon-text").exists()).toBe(true)
    })

    it("无文本时应正常渲染", async () => {
      const wrapper = mount(UiIconText, {
        props: { name: "home" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-icon-text").exists()).toBe(true)
    })
  })
})
