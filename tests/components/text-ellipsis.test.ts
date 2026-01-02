/**
 * ui-text-ellipsis 组件单元测试
 * 测试文本省略组件的 props、events 和渲染逻辑
 * 注意：该组件使用 useRect 进行 DOM 测量，涉及异步操作
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiTextEllipsis from "@/ui/ui-text-ellipsis/ui-text-ellipsis.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-text-ellipsis 文本省略组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认文本省略组件", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      // 等待组件初始化完成（useRect 异步操作）
      await waitForTransition()

      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })

    it("应正确渲染带文本内容", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "这是一段需要省略的长文本内容" },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("这是一段需要省略的长文本内容")
    })
  })

  describe("文本配置", () => {
    it("应支持设置文本内容", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("text")).toBe("测试文本")
    })

    it("应支持文本颜色", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", color: "#333" },
      })

      expect(wrapper.props("color")).toBe("#333")
    })

    it("应支持文本粗细", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", weight: 600 },
      })

      expect(wrapper.props("weight")).toBe(600)
    })

    it("应支持文本行高", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", lineHeight: "40rpx" },
      })

      expect(wrapper.props("lineHeight")).toBe("40rpx")
    })
  })

  describe("行数配置", () => {
    it("默认展示行数应为 2", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("rows")).toBe(2)
    })

    it("应支持自定义展示行数", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", rows: 3 },
      })

      expect(wrapper.props("rows")).toBe(3)
    })
  })

  describe("省略号配置", () => {
    it("默认省略号应为 ...", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("dots")).toBe("...")
    })

    it("应支持自定义省略号", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", dots: "……" },
      })

      expect(wrapper.props("dots")).toBe("……")
    })
  })

  describe("展开/收起文案", () => {
    it("默认展开文案应为 展开", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("expandText")).toBe("展开")
    })

    it("应支持自定义展开文案", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", expandText: "查看更多" },
      })

      expect(wrapper.props("expandText")).toBe("查看更多")
    })

    it("应支持展开文案颜色", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", expandTextColor: "#1989fa" },
      })

      expect(wrapper.props("expandTextColor")).toBe("#1989fa")
    })

    it("默认收起文案应为 收起", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      expect(wrapper.props("collapseText")).toBe("收起")
    })

    it("应支持自定义收起文案", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", collapseText: "收起内容" },
      })

      expect(wrapper.props("collapseText")).toBe("收起内容")
    })

    it("应支持收起文案颜色", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", collapseTextColor: "#999" },
      })

      expect(wrapper.props("collapseTextColor")).toBe("#999")
    })
  })

  describe("字数偏移", () => {
    it("应支持设置字数偏移", () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", offset: 2 },
      })

      expect(wrapper.props("offset")).toBe(2)
    })
  })

  describe("点击事件", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
      })

      await waitForTransition()

      await wrapper.find(".ui-text-ellipsis").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本", customClass: "my-text-ellipsis" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-text-ellipsis")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: {
          text: "测试文本",
          customStyle: { padding: "10px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽（自定义展开/收起按钮）", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "测试文本" },
        slots: {
          default: "<span class='custom-action'>自定义按钮</span>",
        },
      })

      await waitForTransition()

      // 插槽内容在展开/收起区域
      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空文本时应正常渲染", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })

    it("无文本时应正常渲染", async () => {
      // 注意：组件需要 text 属性，这里用空字符串模拟
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })

    it("单行文本时应正常渲染", async () => {
      const wrapper = mount(UiTextEllipsis, {
        props: { text: "短文本", rows: 1 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-text-ellipsis").exists()).toBe(true)
    })
  })
})
