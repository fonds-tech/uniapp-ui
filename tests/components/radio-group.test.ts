/**
 * ui-radio-group 组件单元测试
 * 测试单选框组组件的 props、events 和渲染逻辑
 */

import UiRadio from "@/ui/ui-radio/ui-radio.vue"
import UiRadioGroup from "@/ui/ui-radio-group/ui-radio-group.vue"
import { h } from "vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-radio-group 单选框组组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认单选框组组件", async () => {
      const wrapper = mount(UiRadioGroup)
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容", async () => {
      const wrapper = mount(UiRadioGroup, {
        slots: { default: "<div class='test-radio'>单选框</div>" },
      })
      await waitForTransition()

      expect(wrapper.find(".test-radio").exists()).toBe(true)
    })
  })

  describe("绑定值", () => {
    it("默认 modelValue 应为空字符串", () => {
      const wrapper = mount(UiRadioGroup)

      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应支持字符串类型初始值", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1" },
      })

      expect(wrapper.props("modelValue")).toBe("option1")
    })

    it("应支持数字类型初始值", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: 1 },
      })

      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("修改 modelValue 应触发 change 事件", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "a" },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: "b" })
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("布局方向", () => {
    it("默认应为水平布局", async () => {
      const wrapper = mount(UiRadioGroup)
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-radio-group--vertical")
    })

    it("vertical 为 true 时应添加垂直类名", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { vertical: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-radio-group--vertical")
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiRadioGroup)

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用整个组", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { disabled: true },
      })

      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("间距配置", () => {
    it("应支持设置单选框间距", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { gap: "20rpx" },
      })

      expect(wrapper.props("gap")).toBe("20rpx")
    })

    it("应支持数值类型间距", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { gap: 20 },
      })

      expect(wrapper.props("gap")).toBe(20)
    })
  })

  describe("图标配置", () => {
    it("应支持设置图标名称", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { icon: "success" },
      })

      expect(wrapper.props("icon")).toBe("success")
    })

    it("默认形状应为 icon", () => {
      const wrapper = mount(UiRadioGroup)

      expect(wrapper.props("shape")).toBe("icon")
    })

    it("应支持设置形状为 dot", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { shape: "dot" },
      })

      expect(wrapper.props("shape")).toBe("dot")
    })

    it("默认应为圆形图标", () => {
      const wrapper = mount(UiRadioGroup)

      expect(wrapper.props("round")).toBe(true)
    })

    it("应支持设置非圆形图标", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { round: false },
      })

      expect(wrapper.props("round")).toBe(false)
    })

    it("应支持设置图标大小", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { iconSize: "40rpx" },
      })

      expect(wrapper.props("iconSize")).toBe("40rpx")
    })

    it("应支持设置图标颜色", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { iconColor: "#999" },
      })

      expect(wrapper.props("iconColor")).toBe("#999")
    })

    it("应支持设置图标粗细", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { iconWeight: 600 },
      })

      expect(wrapper.props("iconWeight")).toBe(600)
    })

    it("应支持设置图标圆角", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { iconRadius: "8rpx" },
      })

      expect(wrapper.props("iconRadius")).toBe("8rpx")
    })

    it("应支持设置选中图标颜色", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { checkedIconColor: "#1989fa" },
      })

      expect(wrapper.props("checkedIconColor")).toBe("#1989fa")
    })
  })

  describe("标签配置", () => {
    it("应支持设置标签大小", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelSize: "28rpx" },
      })

      expect(wrapper.props("labelSize")).toBe("28rpx")
    })

    it("应支持设置标签颜色", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelColor: "#333" },
      })

      expect(wrapper.props("labelColor")).toBe("#333")
    })

    it("应支持设置标签粗细", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelWeight: 600 },
      })

      expect(wrapper.props("labelWeight")).toBe(600)
    })

    it("应支持设置标签间距", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelGap: "16rpx" },
      })

      expect(wrapper.props("labelGap")).toBe("16rpx")
    })

    it("应支持标签在左侧", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelLeft: true },
      })

      expect(wrapper.props("labelLeft")).toBe(true)
    })

    it("应支持禁用标签点击", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { labelDisabled: true },
      })

      expect(wrapper.props("labelDisabled")).toBe(true)
    })

    it("应支持选中时的标签颜色", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { checkedLabelColor: "#1989fa" },
      })

      expect(wrapper.props("checkedLabelColor")).toBe("#1989fa")
    })
  })

  describe("选中颜色", () => {
    it("应支持设置选中颜色", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { checkedColor: "#ff6600" },
      })

      expect(wrapper.props("checkedColor")).toBe("#ff6600")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { customClass: "my-radio-group" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-radio-group")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
    })
  })

  describe("与 ui-radio 配合使用", () => {
    it("应正确渲染嵌套的单选框", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "a", label: "选项A" }), h(UiRadio, { name: "b", label: "选项B" })],
        },
        global: {
          components: { UiRadio },
        },
      })
      await waitForTransition()

      expect(wrapper.findAllComponents(UiRadio).length).toBe(2)
    })
  })

  describe("边界情况", () => {
    it("无子单选框时应正常渲染", async () => {
      const wrapper = mount(UiRadioGroup)
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
    })

    it("空字符串值应正常处理", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
      })

      expect(wrapper.props("modelValue")).toBe("")
    })

    it("数字 0 值应正常处理", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: 0 },
      })

      expect(wrapper.props("modelValue")).toBe(0)
    })
  })
})
