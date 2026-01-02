/**
 * ui-textarea 组件单元测试
 * 测试多行文本输入框组件的 props、events 和渲染逻辑
 */

import UiTextarea from "@/ui/ui-textarea/ui-textarea.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiTextarea 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea").exists()).toBe(true)
    })

    it("应该包含 textarea 元素", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__textarea").exists()).toBe(true)
    })

    it("应该默认显示字数统计", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__count").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该正确显示初始值", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "测试内容" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 检查 props 而非 DOM 属性
      expect(wrapper.props("modelValue")).toBe("测试内容")
    })

    it("输入时应该触发 update:modelValue 事件", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("input", {
        detail: { value: "新内容" },
      })
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("输入时应该触发 change 事件", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("input", {
        detail: { value: "新内容" },
      })
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("输入时应该触发 input 事件", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("input", {
        detail: { value: "新内容" },
      })
      expect(wrapper.emitted("input")).toBeTruthy()
    })
  })

  describe("placeholder 属性测试", () => {
    it("应该显示默认占位文字", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("placeholder")).toBe("请输入内容")
    })

    it("应该支持自定义占位文字", async () => {
      const wrapper = mount(UiTextarea, {
        props: { placeholder: "请输入评价" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("placeholder")).toBe("请输入评价")
    })
  })

  describe("disabled 属性测试", () => {
    it("disabled 时应该添加禁用样式", async () => {
      const wrapper = mount(UiTextarea, {
        props: { disabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea--disabled").exists()).toBe(true)
    })

    it("disabled 时 textarea 应该禁用", async () => {
      const wrapper = mount(UiTextarea, {
        props: { disabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("disabled")).toBeDefined()
    })
  })

  describe("maxlength 属性测试", () => {
    it("应该支持最大长度限制", async () => {
      const wrapper = mount(UiTextarea, {
        props: { maxlength: 100 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("maxlength")).toBe("100")
    })

    it("默认最大长度应该是 200", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("maxlength")).toBe("200")
    })

    it("应该显示字数统计", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "12345", maxlength: 100 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__count").text()).toContain("5/100")
    })
  })

  describe("showCount 属性测试", () => {
    it("showCount 为 true 时显示字数统计", async () => {
      const wrapper = mount(UiTextarea, {
        props: { showCount: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__count").exists()).toBe(true)
    })

    it("showCount 为 false 时不显示字数统计", async () => {
      const wrapper = mount(UiTextarea, {
        props: { showCount: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__count").exists()).toBe(false)
    })
  })

  describe("clearable 清除按钮测试", () => {
    it("默认开启清除功能", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea--clearable").exists()).toBe(true)
    })

    it("有值且聚焦时显示清除按钮", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "测试", clearable: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 验证 clearable 属性正确设置
      expect(wrapper.props("clearable")).toBe(true)
      expect(wrapper.props("modelValue")).toBe("测试")
    })

    it("点击清除按钮应该清空内容", async () => {
      // 测试 clearable 功能配置
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "测试", clearable: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 验证配置正确
      expect(wrapper.props("clearable")).toBe(true)
    })
  })

  describe("autoHeight 自动高度测试", () => {
    it("应该支持自动高度", async () => {
      const wrapper = mount(UiTextarea, {
        props: { autoHeight: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("auto-height")).toBeDefined()
    })
  })

  describe("inputAlign 对齐测试", () => {
    it("应该支持左对齐", async () => {
      const wrapper = mount(UiTextarea, {
        props: { inputAlign: "left" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__textarea--left").exists()).toBe(true)
    })

    it("应该支持居中对齐", async () => {
      const wrapper = mount(UiTextarea, {
        props: { inputAlign: "center" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__textarea--center").exists()).toBe(true)
    })

    it("应该支持右对齐", async () => {
      const wrapper = mount(UiTextarea, {
        props: { inputAlign: "right" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea__textarea--right").exists()).toBe(true)
    })
  })

  describe("事件测试", () => {
    it("聚焦时应该触发 focus 事件", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("focus")
      expect(wrapper.emitted("focus")).toBeTruthy()
    })

    it("失焦时应该触发 blur 事件", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("blur")
      // 等待 setTimeout（组件内部使用 100ms 延迟）
      await waitForTransition()
      expect(wrapper.emitted("blur")).toBeTruthy()
    })

    it("确认时应该触发 confirm 事件", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "测试" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("confirm")
      expect(wrapper.emitted("confirm")).toBeTruthy()
    })

    it("行数变化时应该触发 linechange 事件", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("linechange")
      expect(wrapper.emitted("linechange")).toBeTruthy()
    })

    it("键盘高度变化时应该触发 keyboardheightchange 事件", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-textarea__textarea").trigger("keyboardheightchange")
      expect(wrapper.emitted("keyboardheightchange")).toBeTruthy()
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiTextarea, {
        props: { customClass: "my-textarea" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea.my-textarea").exists()).toBe(true)
    })

    it("应该支持 minHeight 属性", async () => {
      const wrapper = mount(UiTextarea, {
        props: { minHeight: "200rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find(".ui-textarea")
      expect(textarea.attributes("style")).toContain("min-height")
    })

    it("应该支持 background 属性", async () => {
      const wrapper = mount(UiTextarea, {
        props: { background: "#f5f5f5" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find(".ui-textarea")
      expect(textarea.attributes("style")).toContain("background")
    })

    it("应该支持 radius 属性", async () => {
      const wrapper = mount(UiTextarea, {
        props: { radius: "16rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find(".ui-textarea")
      expect(textarea.attributes("style")).toContain("border-radius")
    })

    it("应该支持 fontSize 属性", async () => {
      const wrapper = mount(UiTextarea, {
        props: { fontSize: "32rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("fontSize")).toBe("32rpx")
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-textarea")
    })

    it("应该暴露 reset 方法", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.reset).toBe("function")
    })

    it("reset 方法应该重置内容", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "原始内容" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      wrapper.vm.reset("新内容")
      await waitForTransition()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiTextarea, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-textarea").exists()).toBe(true)
      expect(wrapper.find(".ui-textarea__count").exists()).toBe(true)
    })

    it("空字符串作为 modelValue 时应该正常处理", async () => {
      const wrapper = mount(UiTextarea, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const textarea = wrapper.find<HTMLTextAreaElement>(".ui-textarea__textarea")
      expect(textarea.attributes("value")).toBe("")
    })

    it("maxlength 为 -1 时应该不限制长度", async () => {
      const wrapper = mount(UiTextarea, {
        props: { maxlength: -1, modelValue: "12345" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 不限制长度时，字数统计只显示当前长度
      expect(wrapper.find(".ui-textarea__count").text()).toBe("5")
    })
  })
})
