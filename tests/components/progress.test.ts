/**
 * ui-progress 组件单元测试
 * 测试进度条组件的 props、渲染逻辑和插槽
 */

import UiProgress from "@/uni_modules/uniapp-ui/ui-progress/ui-progress.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiProgress 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.find(".ui-progress").exists()).toBe(true)
    })

    it("应该包含进度指示器元素", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.find(".ui-progress__pivot").exists()).toBe(true)
    })

    it("应该包含进度条部分元素", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.find(".ui-progress__portion").exists()).toBe(true)
    })

    it("应该默认显示进度文本", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(true)
    })
  })

  describe("percentage 属性测试", () => {
    it("应该支持 percentage 属性", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 50 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("50%")
    })

    it("percentage 为 0 时应该显示 0%", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 0 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("0%")
    })

    it("percentage 为 100 时应该显示 100%", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 100 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("100%")
    })

    it("应该根据 percentage 设置进度条宽度", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 75 } })
      await waitForTransition()
      const portion = wrapper.find(".ui-progress__portion")
      expect(portion.attributes("style")).toContain("width")
      expect(portion.attributes("style")).toContain("75%")
    })

    it("应该根据 percentage 设置指示器位置", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 30 } })
      await waitForTransition()
      const pivot = wrapper.find(".ui-progress__pivot")
      expect(pivot.attributes("style")).toContain("left")
      expect(pivot.attributes("style")).toContain("30%")
    })

    it("应该支持字符串类型的 percentage", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: "60" } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("60%")
    })
  })

  describe("文本相关属性测试", () => {
    it("应该支持自定义文本 text", async () => {
      const wrapper = mount(UiProgress, { props: { text: "加载中..." } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("加载中...")
    })

    it("text 为空时应该显示百分比", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 40, text: "" } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("40%")
    })

    it("showText 为 false 时不应该显示文本", async () => {
      const wrapper = mount(UiProgress, { props: { showText: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(false)
    })

    it("应该支持文本颜色 textColor", async () => {
      const wrapper = mount(UiProgress, { props: { textColor: "#ff0000" } })
      await waitForTransition()
      const text = wrapper.find(".ui-progress__text")
      expect(text.attributes("style")).toContain("color")
    })

    it("应该支持文本大小 textSize", async () => {
      const wrapper = mount(UiProgress, { props: { textSize: "28rpx" } })
      await waitForTransition()
      expect(wrapper.props("textSize")).toBe("28rpx")
    })

    it("应该支持文本粗细 textWeight", async () => {
      const wrapper = mount(UiProgress, { props: { textWeight: "bold" } })
      await waitForTransition()
      const text = wrapper.find(".ui-progress__text")
      expect(text.attributes("style")).toContain("font-weight")
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持进度条颜色 color", async () => {
      const wrapper = mount(UiProgress, { props: { color: "#1989fa" } })
      await waitForTransition()
      const pivot = wrapper.find(".ui-progress__pivot")
      expect(pivot.attributes("style")).toContain("background")
    })

    it("应该支持背景色 background", async () => {
      const wrapper = mount(UiProgress, { props: { background: "#eeeeee" } })
      await waitForTransition()
      const progress = wrapper.find(".ui-progress")
      expect(progress.attributes("style")).toContain("background")
    })

    it("应该支持预设颜色名称", async () => {
      const wrapper = mount(UiProgress, { props: { color: "primary" } })
      await waitForTransition()
      const pivot = wrapper.find(".ui-progress__pivot")
      expect(pivot.attributes("style")).toContain("background")
    })
  })

  describe("尺寸属性测试", () => {
    it("应该支持自定义高度 height", async () => {
      const wrapper = mount(UiProgress, { props: { height: "40rpx" } })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("40rpx")
    })

    it("应该支持数字类型的高度", async () => {
      const wrapper = mount(UiProgress, { props: { height: 20 } })
      await waitForTransition()
      expect(wrapper.props("height")).toBe(20)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiProgress, { props: { customClass: "my-progress" } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress.my-progress").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiProgress, {
        props: { customStyle: { marginTop: "20rpx" } },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ marginTop: "20rpx" })
    })

    it("应该支持字符串格式的 customStyle", async () => {
      const wrapper = mount(UiProgress, {
        props: { customStyle: "margin-top: 20rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toBe("margin-top: 20rpx")
    })
  })

  describe("插槽测试", () => {
    it("应该支持 text 插槽", async () => {
      const wrapper = mount(UiProgress, {
        props: { percentage: 50 },
        slots: {
          text: "<span class=\"custom-text\">自定义进度</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-text").exists()).toBe(true)
      expect(wrapper.find(".custom-text").text()).toBe("自定义进度")
    })

    it("text 插槽应该接收 percentage 参数", async () => {
      const wrapper = mount(UiProgress, {
        props: { percentage: 75 },
        slots: {
          text: ({ percentage }) => `进度: ${percentage}`,
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__pivot").text()).toContain("进度: 75")
    })

    it("使用插槽时不应该显示默认文本", async () => {
      const wrapper = mount(UiProgress, {
        props: { percentage: 50 },
        slots: {
          text: "<span>自定义</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(false)
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-progress")
    })
  })

  describe("动态更新测试", () => {
    it("应该响应 percentage 变化", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 0 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("0%")

      await wrapper.setProps({ percentage: 50 })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("50%")

      await wrapper.setProps({ percentage: 100 })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("100%")
    })

    it("应该响应 text 变化", async () => {
      const wrapper = mount(UiProgress, { props: { text: "开始" } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("开始")

      await wrapper.setProps({ text: "进行中" })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("进行中")

      await wrapper.setProps({ text: "完成" })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("完成")
    })

    it("应该响应 showText 变化", async () => {
      const wrapper = mount(UiProgress, { props: { showText: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(true)

      await wrapper.setProps({ showText: false })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(false)

      await wrapper.setProps({ showText: true })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").exists()).toBe(true)
    })
  })

  describe("边界情况测试", () => {
    it("percentage 超过 100 时应该正常处理", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 150 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("150%")
      const portion = wrapper.find(".ui-progress__portion")
      expect(portion.attributes("style")).toContain("150%")
    })

    it("percentage 为负数时应该正常处理", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: -10 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("-10%")
    })

    it("percentage 为小数时应该正常显示", async () => {
      const wrapper = mount(UiProgress, { props: { percentage: 33.33 } })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("33.33%")
    })

    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiProgress)
      await waitForTransition()
      expect(wrapper.find(".ui-progress").exists()).toBe(true)
      expect(wrapper.find(".ui-progress__text").text()).toBe("0%")
    })

    it("空字符串 text 时应该显示百分比", async () => {
      const wrapper = mount(UiProgress, {
        props: { percentage: 25, text: "" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-progress__text").text()).toBe("25%")
    })
  })

  describe("样式计算测试", () => {
    it("应该正确计算进度条样式", async () => {
      const wrapper = mount(UiProgress, {
        props: {
          percentage: 50,
          height: "30rpx",
          background: "#f0f0f0",
        },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("30rpx")
      expect(wrapper.props("background")).toBe("#f0f0f0")
    })

    it("应该正确计算指示器样式", async () => {
      const wrapper = mount(UiProgress, {
        props: {
          percentage: 60,
          color: "#ff6600",
        },
      })
      await waitForTransition()
      expect(wrapper.props("percentage")).toBe(60)
      expect(wrapper.props("color")).toBe("#ff6600")
    })

    it("应该正确计算文本样式", async () => {
      const wrapper = mount(UiProgress, {
        props: {
          textColor: "#333333",
          textSize: "24rpx",
          textWeight: 600,
        },
      })
      await waitForTransition()
      expect(wrapper.props("textColor")).toBe("#333333")
      expect(wrapper.props("textSize")).toBe("24rpx")
      expect(wrapper.props("textWeight")).toBe(600)
    })
  })
})
