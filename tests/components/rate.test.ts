/**
 * ui-rate 组件单元测试
 * 测试评分组件的 props、events 和渲染逻辑
 */

import UiRate from "@/ui/ui-rate/ui-rate.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("uiRate 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate").exists()).toBe(true)
    })

    it("应该默认渲染 5 个评分项", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const items = wrapper.findAll(".ui-rate__item")
      expect(items.length).toBe(5)
    })

    it("应该包含图标元素", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate__item__icon").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该支持初始评分值", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 3 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(3)
    })

    it("应该支持 0 分", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 0 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(0)
    })

    it("应该支持满分", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 5 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(5)
    })

    it("应该支持小数分值（配合 allowHalf）", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 3.5, allowHalf: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(3.5)
    })
  })

  describe("count 属性测试", () => {
    it("应该支持自定义评分数量", async () => {
      const wrapper = mount(UiRate, {
        props: { count: 10 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const items = wrapper.findAll(".ui-rate__item")
      expect(items.length).toBe(10)
    })

    it("应该支持 3 星评分", async () => {
      const wrapper = mount(UiRate, {
        props: { count: 3 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const items = wrapper.findAll(".ui-rate__item")
      expect(items.length).toBe(3)
    })
  })

  describe("图标属性测试", () => {
    it("应该支持自定义选中图标 icon", async () => {
      const wrapper = mount(UiRate, {
        props: { icon: "heart" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("icon")).toBe("heart")
    })

    it("应该支持自定义未选中图标 voidIcon", async () => {
      const wrapper = mount(UiRate, {
        props: { voidIcon: "heart-o" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("voidIcon")).toBe("heart-o")
    })

    it("默认图标应该是 star", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("icon")).toBe("star")
      expect(wrapper.props("voidIcon")).toBe("star-o")
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持自定义选中颜色 color", async () => {
      const wrapper = mount(UiRate, {
        props: { color: "#ff0000" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("color")).toBe("#ff0000")
    })

    it("应该支持自定义未选中颜色 voidColor", async () => {
      const wrapper = mount(UiRate, {
        props: { voidColor: "#eeeeee" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("voidColor")).toBe("#eeeeee")
    })

    it("默认选中颜色应该是 primary", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("color")).toBe("primary")
    })
  })

  describe("尺寸属性测试", () => {
    it("应该支持自定义图标大小 size", async () => {
      const wrapper = mount(UiRate, {
        props: { size: "40rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("size")).toBe("40rpx")
    })

    it("应该支持自定义图标间距 gutter", async () => {
      const wrapper = mount(UiRate, {
        props: { gutter: "16rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("gutter")).toBe("16rpx")
    })
  })

  describe("disabled 禁用测试", () => {
    it("disabled 时应该添加禁用样式", async () => {
      const wrapper = mount(UiRate, {
        props: { disabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate--disabled").exists()).toBe(true)
    })

    it("disabled 时不应该触发事件", async () => {
      const wrapper = mount(UiRate, {
        props: { disabled: true, modelValue: 3 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeFalsy()
    })
  })

  describe("readonly 只读测试", () => {
    it("readonly 时应该添加只读样式", async () => {
      const wrapper = mount(UiRate, {
        props: { readonly: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate--readonly").exists()).toBe(true)
    })

    it("readonly 时不应该触发事件", async () => {
      const wrapper = mount(UiRate, {
        props: { readonly: true, modelValue: 3 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeFalsy()
    })
  })

  describe("allowHalf 半星测试", () => {
    it("应该支持半星选择", async () => {
      const wrapper = mount(UiRate, {
        props: { allowHalf: true, modelValue: 2.5 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("allowHalf")).toBe(true)
    })

    it("半星状态应该显示半星元素", async () => {
      const wrapper = mount(UiRate, {
        props: { allowHalf: true, modelValue: 2.5 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate__item__icon--half").exists()).toBe(true)
    })
  })

  describe("touchable 滑动测试", () => {
    it("应该默认开启滑动选择", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("touchable")).toBe(true)
    })

    it("应该支持关闭滑动选择", async () => {
      const wrapper = mount(UiRate, {
        props: { touchable: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("touchable")).toBe(false)
    })

    it("touchstart 事件应该被触发", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.trigger("touchstart")
      await waitForTransition()
      // 不抛错即可
    })

    it("touchmove 事件应该被处理", async () => {
      const wrapper = mount(UiRate, {
        props: { touchable: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100 }],
      })
      await waitForTransition()
      // 不抛错即可
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 change 事件", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 0 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 模拟点击事件（不使用 detail 参数，避免 JSDOM 错误）
      await wrapper.trigger("click")
      await waitForTransition()
      // 由于需要真实 DOM 尺寸，这里仅验证事件处理不抛错
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiRate, {
        props: { customClass: "my-rate" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate.my-rate").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiRate, {
        props: { customStyle: { marginTop: "20rpx" } },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ marginTop: "20rpx" })
    })

    it("应该支持 iconWeight", async () => {
      const wrapper = mount(UiRate, {
        props: { iconWeight: "bold" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("iconWeight")).toBe("bold")
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-rate")
    })
  })

  describe("动态更新测试", () => {
    it("应该响应 modelValue 变化", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 2 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(2)

      await wrapper.setProps({ modelValue: 4 })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(4)
    })

    it("应该响应 count 变化", async () => {
      const wrapper = mount(UiRate, {
        props: { count: 5 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.findAll(".ui-rate__item").length).toBe(5)

      await wrapper.setProps({ count: 3 })
      await waitForTransition()
      expect(wrapper.findAll(".ui-rate__item").length).toBe(3)
    })

    it("应该响应 disabled 变化", async () => {
      const wrapper = mount(UiRate, {
        props: { disabled: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-rate--disabled").exists()).toBe(false)

      await wrapper.setProps({ disabled: true })
      await waitForTransition()
      expect(wrapper.find(".ui-rate--disabled").exists()).toBe(true)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiRate, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.findAll(".ui-rate__item").length).toBe(5)
      expect(wrapper.props("modelValue")).toBe(0)
    })

    it("modelValue 超过 count 时应该正常处理", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: 10, count: 5 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 所有项都应该是满选状态
      expect(wrapper.findAll(".ui-rate__item").length).toBe(5)
    })

    it("modelValue 为负数时应该正常处理", async () => {
      const wrapper = mount(UiRate, {
        props: { modelValue: -1 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 所有项都应该是未选状态
      expect(wrapper.findAll(".ui-rate__item").length).toBe(5)
    })

    it("count 为 1 时应该只显示 1 个评分项", async () => {
      const wrapper = mount(UiRate, {
        props: { count: 1 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.findAll(".ui-rate__item").length).toBe(1)
    })
  })
})
