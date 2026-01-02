/**
 * ui-text-highlight 组件单元测试
 * 测试文本高亮组件的 props、events 和渲染逻辑
 * 注意：该组件使用 watch + immediate 进行文本匹配，涉及异步渲染
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiTextHighlight from "@/ui/ui-text-highlight/ui-text-highlight.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-text-highlight 文本高亮组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认文本高亮组件", async () => {
      const wrapper = mount(UiTextHighlight)

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
    })

    it("应正确渲染带文本内容", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本" },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("这是一段测试文本")
    })
  })

  describe("文本配置", () => {
    it("应支持设置文本内容", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("text")).toBe("测试文本")
    })

    it("应支持文本颜色", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", color: "#333" },
      })

      expect(wrapper.props("color")).toBe("#333")
    })

    it("应支持文本大小", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", fontSize: "28rpx" },
      })

      expect(wrapper.props("fontSize")).toBe("28rpx")
    })

    it("应支持文本粗细", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", fontWeight: 600 },
      })

      expect(wrapper.props("fontWeight")).toBe(600)
    })

    it("应支持文本行高", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", lineHeight: "40rpx" },
      })

      expect(wrapper.props("lineHeight")).toBe("40rpx")
    })

    it("应支持文本行数", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", textRow: 3 },
      })

      expect(wrapper.props("textRow")).toBe(3)
    })
  })

  describe("匹配配置", () => {
    it("应支持设置匹配文本", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本", match: "测试" },
      })

      expect(wrapper.props("match")).toBe("测试")
    })

    it("匹配文本应添加高亮类名", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本", match: "测试" },
      })

      await waitForTransition()

      expect(wrapper.find(".is-matched").exists()).toBe(true)
    })

    it("应支持高亮颜色", () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本", match: "测试", highlightColor: "#ff0000" },
      })

      expect(wrapper.props("highlightColor")).toBe("#ff0000")
    })
  })

  describe("点击事件", () => {
    it("点击匹配文本应触发 clickMatch 事件", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本", match: "测试" },
      })

      await waitForTransition()

      await wrapper.find(".is-matched").trigger("click")

      expect(wrapper.emitted("clickMatch")).toBeTruthy()
      expect(wrapper.emitted("clickMatch")![0]).toEqual(["测试"])
    })

    it("点击非匹配文本应触发 click 事件", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本", match: "测试" },
      })

      await waitForTransition()

      const nonMatchedText = wrapper.findAll(".ui-text-highlight__text").find((el) => !el.classes().includes("is-matched"))
      if (nonMatchedText) {
        await nonMatchedText.trigger("click")
        expect(wrapper.emitted("click")).toBeTruthy()
      }
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { customClass: "my-text-highlight" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-text-highlight")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: {
          customStyle: { padding: "10px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 match 方法", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "测试文本" },
      })

      await waitForTransition()

      expect(typeof wrapper.vm.match).toBe("function")
    })

    it("应暴露 name 属性", async () => {
      const wrapper = mount(UiTextHighlight)

      await waitForTransition()

      expect(wrapper.vm.name).toBe("ui-text-highlight")
    })
  })

  describe("边界情况", () => {
    it("空文本时应正常渲染", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
    })

    it("无匹配文本时应正常渲染", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
      expect(wrapper.find(".is-matched").exists()).toBe(false)
    })

    it("匹配文本不存在于文本中时应正常渲染", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是一段测试文本", match: "不存在的文本" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
      expect(wrapper.find(".is-matched").exists()).toBe(false)
    })

    it("特殊字符匹配时应正常处理", async () => {
      const wrapper = mount(UiTextHighlight, {
        props: { text: "这是$特殊$字符", match: "$特殊$" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-highlight").exists()).toBe(true)
    })
  })
})
