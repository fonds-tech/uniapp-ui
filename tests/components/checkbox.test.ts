/**
 * ui-checkbox 组件单元测试
 * 测试复选框组件的 props、events 和渲染逻辑
 */

import UiCheckbox from "@/ui/ui-checkbox/ui-checkbox.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe, vi, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-checkbox 复选框组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认复选框组件", async () => {
      const wrapper = mount(UiCheckbox)
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox").exists()).toBe(true)
      expect(wrapper.find(".ui-checkbox__icon").exists()).toBe(true)
    })

    it("应正确渲染带标签的复选框", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项一" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__label").exists()).toBe(true)
      expect(wrapper.text()).toContain("选项一")
    })

    it("应支持默认插槽渲染标签", async () => {
      const wrapper = mount(UiCheckbox, {
        slots: { default: "自定义标签" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__label").text()).toContain("自定义标签")
    })
  })

  describe("选中状态", () => {
    it("modelValue 为 true 时应显示选中状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-checkbox--checked")
      expect(wrapper.find(".ui-checkbox__icon").classes()).toContain("ui-checkbox__icon--checked")
    })

    it("modelValue 为 false 时应显示未选中状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-checkbox--checked")
    })

    it("点击复选框应切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })

    it("点击已选中的复选框应取消选中", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: true },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
    })

    it("点击图标区域应切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox__icon").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("点击标签区域应切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false, label: "选项" },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox__label").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-checkbox--disabled")
      expect(wrapper.find(".ui-checkbox__icon").classes()).toContain("ui-checkbox__icon--disabled")
    })

    it("禁用状态下点击不应切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { disabled: true, modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("禁用状态下标签应添加禁用类名", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { disabled: true, label: "选项" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__label").classes()).toContain("ui-checkbox__label--disabled")
    })
  })

  describe("标签禁用", () => {
    it("labelDisabled 为 true 时点击标签不应切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { labelDisabled: true, modelValue: false, label: "选项" },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox__label").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("labelDisabled 为 true 时点击图标仍可切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { labelDisabled: true, modelValue: false, label: "选项" },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox__icon").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("形状配置", () => {
    it("默认形状为 dot", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: true },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__dot").exists()).toBe(true)
    })

    it("shape 为 icon 时应显示图标", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { shape: "icon", modelValue: true },
      })
      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-icon" }).exists()).toBe(true)
    })

    it("round 为 true 时应添加圆形类名", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { round: true },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__icon").classes()).toContain("ui-checkbox__icon--round")
    })
  })

  describe("图标配置", () => {
    it("应支持自定义图标名称", () => {
      const wrapper = mount(UiCheckbox, {
        props: { icon: "success", shape: "icon" },
      })

      expect(wrapper.props("icon")).toBe("success")
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiCheckbox, {
        props: { iconSize: "40rpx" },
      })

      expect(wrapper.props("iconSize")).toBe("40rpx")
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiCheckbox, {
        props: { iconColor: "#999999" },
      })

      expect(wrapper.props("iconColor")).toBe("#999999")
    })

    it("应支持自定义图标圆角", () => {
      const wrapper = mount(UiCheckbox, {
        props: { iconRadius: "8rpx" },
      })

      expect(wrapper.props("iconRadius")).toBe("8rpx")
    })

    it("应支持自定义选中时的图标颜色", () => {
      const wrapper = mount(UiCheckbox, {
        props: { checkedIconColor: "#1989fa", modelValue: true },
      })

      expect(wrapper.props("checkedIconColor")).toBe("#1989fa")
    })
  })

  describe("标签配置", () => {
    it("应支持自定义标签大小", () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", labelSize: "28rpx" },
      })

      expect(wrapper.props("labelSize")).toBe("28rpx")
    })

    it("应支持自定义标签颜色", () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", labelColor: "#333333" },
      })

      expect(wrapper.props("labelColor")).toBe("#333333")
    })

    it("应支持自定义标签粗细", () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", labelWeight: 600 },
      })

      expect(wrapper.props("labelWeight")).toBe(600)
    })

    it("应支持自定义标签与图标的间距", () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", labelGap: "16rpx" },
      })

      expect(wrapper.props("labelGap")).toBe("16rpx")
    })

    it("labelLeft 为 true 时标签应在左侧", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", labelLeft: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-checkbox--left")
      expect(wrapper.find(".ui-checkbox__label").classes()).toContain("ui-checkbox__label--left")
    })

    it("应支持选中时的标签颜色", () => {
      const wrapper = mount(UiCheckbox, {
        props: { label: "选项", checkedLabelColor: "#1989fa", modelValue: true },
      })

      expect(wrapper.props("checkedLabelColor")).toBe("#1989fa")
    })
  })

  describe("事件处理", () => {
    it("切换时应触发 change 事件", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: true })
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("点击时应触发 click 事件", async () => {
      const wrapper = mount(UiCheckbox)
      await waitForTransition()

      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { customClass: "my-checkbox" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-checkbox")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiCheckbox, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 icon 插槽", async () => {
      const wrapper = mount(UiCheckbox, {
        slots: {
          icon: "<span class=\"custom-icon\">✓</span>",
        },
      })
      await waitForTransition()

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("icon 插槽应接收 checked 和 disabled 参数", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: true, disabled: false },
        slots: {
          icon: ({ checked, disabled }: { checked: boolean; disabled: boolean }) => `<span>${checked ? "已选" : "未选"}-${disabled ? "禁用" : "可用"}</span>`,
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__icon").exists()).toBe(true)
    })
  })

  describe("暴露的方法和属性", () => {
    it("应暴露 toggle 方法", async () => {
      const wrapper = mount(UiCheckbox)
      await waitForTransition()

      expect(typeof wrapper.vm.toggle).toBe("function")
    })

    it("应暴露 checked 属性", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: true },
      })
      await waitForTransition()

      expect(wrapper.vm.checked).toBe(true)
    })

    it("toggle 方法应正确切换状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      wrapper.vm.toggle()
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })

    it("toggle 方法可以指定目标状态", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      wrapper.vm.toggle(true)
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })
  })

  describe("name 属性", () => {
    it("应支持 name 属性", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { name: "option1" },
      })
      await waitForTransition()

      expect(wrapper.vm.name).toBe("option1")
    })

    it("name 可以是数字", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { name: 1 },
      })
      await waitForTransition()

      expect(wrapper.vm.name).toBe(1)
    })
  })

  describe("边界情况", () => {
    it("无标签时不应渲染标签元素", async () => {
      const wrapper = mount(UiCheckbox)
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox__label").exists()).toBe(false)
    })

    it("多次快速点击应正确处理", async () => {
      const wrapper = mount(UiCheckbox, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()
      await wrapper.find(".ui-checkbox").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")!.length).toBe(2)
    })
  })
})
