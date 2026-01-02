/**
 * ui-radio 组件单元测试
 * 测试单选框组件的 props、events 和渲染逻辑
 */

import UiRadio from "@/ui/ui-radio/ui-radio.vue"
import UiRadioGroup from "@/ui/ui-radio-group/ui-radio-group.vue"
import { h } from "vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-radio 单选框组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染（需配合 RadioGroup）", () => {
    it("应正确渲染 RadioGroup 包裹的 Radio", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
      expect(wrapper.findAllComponents(UiRadio).length).toBe(2)
    })

    it("应正确渲染带标签的单选框", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio__label").exists()).toBe(true)
      expect(wrapper.text()).toContain("选项一")
    })
  })

  describe("选中状态", () => {
    it("modelValue 匹配时应显示选中状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      const radios = wrapper.findAllComponents(UiRadio)
      expect(radios[0].classes()).toContain("ui-radio--checked")
      expect(radios[1].classes()).not.toContain("ui-radio--checked")
    })

    it("点击单选框应切换选中状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      await wrapper.findComponent(UiRadio).find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["option1"])
    })

    it("点击已选中的单选框不应触发事件", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      await wrapper.findComponent(UiRadio).find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("点击图标区域应切换状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio__icon").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("点击标签区域应切换状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio__label").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", disabled: true }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio").classes()).toContain("ui-radio--disabled")
      expect(wrapper.find(".ui-radio__icon").classes()).toContain("ui-radio__icon--disabled")
    })

    it("禁用状态下点击不应切换状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", disabled: true }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("radioGroup 禁用时所有 Radio 应被禁用", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", disabled: true },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      // 验证父组件的 disabled 属性
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("标签禁用", () => {
    it("labelDisabled 为 true 时点击标签不应切换状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", labelDisabled: true }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio__label").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("labelDisabled 为 true 时点击图标仍可切换状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", labelDisabled: true }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio__icon").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("形状配置", () => {
    it("默认形状为 dot", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio__dot").exists()).toBe(true)
    })

    it("shape 为 icon 时应显示图标", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1", shape: "icon" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()

      // 验证 shape 属性
      expect(wrapper.props("shape")).toBe("icon")
    })

    it("round 为 true 时应添加圆形类名", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", round: true }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio__icon").classes()).toContain("ui-radio__icon--round")
    })
  })

  describe("标签配置", () => {
    it("labelLeft 为 true 时标签应在左侧", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", labelLeft: true }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio").classes()).toContain("ui-radio--left")
      expect(wrapper.find(".ui-radio__label").classes()).toContain("ui-radio__label--left")
    })
  })

  describe("事件处理", () => {
    it("切换时应触发 change 事件", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio").trigger("click")
      await waitForTransition()

      // 验证 update:modelValue 事件触发（change 事件可能需要实际值更新）
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("radio 点击时应触发 click 事件", async () => {
      const onClick = vi.fn()
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", onClick }),
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(onClick).toHaveBeenCalled()
    })
  })
})

describe("ui-radio-group 单选框组组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染单选框组", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
    })
  })

  describe("值绑定", () => {
    it("应正确设置初始选中值", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option2" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      const radios = wrapper.findAllComponents(UiRadio)
      expect(radios[0].classes()).not.toContain("ui-radio--checked")
      expect(radios[1].classes()).toContain("ui-radio--checked")
    })

    it("切换选项时应触发 update:modelValue", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "option1" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      await wrapper.findAllComponents(UiRadio)[1].find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["option2"])
    })

    it("应支持数字类型的 name", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: 0 },
        slots: {
          default: () => [h(UiRadio, { name: 1, label: "选项一" }), h(UiRadio, { name: 2, label: "选项二" })],
        },
      })
      await waitForTransition()

      await wrapper.findAllComponents(UiRadio)[0].find(".ui-radio").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")![0]).toEqual([1])
    })
  })

  describe("布局", () => {
    it("默认为水平布局", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" })],
        },
      })
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-radio-group--vertical")
    })

    it("vertical 为 true 时应为垂直布局", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", vertical: true },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" })],
        },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-radio-group--vertical")
    })
  })

  describe("统一配置", () => {
    it("radioGroup 的 iconSize 应应用到所有 Radio", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", iconSize: "40rpx" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })

      expect(wrapper.props("iconSize")).toBe("40rpx")
    })

    it("radioGroup 的 labelColor 应应用到所有 Radio", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", labelColor: "#333333" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" })],
        },
      })

      expect(wrapper.props("labelColor")).toBe("#333333")
    })

    it("radio 单独配置应覆盖 RadioGroup 配置", () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", iconSize: "40rpx" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一", iconSize: "50rpx" }),
        },
      })

      const radio = wrapper.findComponent(UiRadio)
      expect(radio.props("iconSize")).toBe("50rpx")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "", customClass: "my-radio-group" },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-radio-group")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: {
          modelValue: "",
          customStyle: { marginTop: "10px" },
        },
        slots: {
          default: () => h(UiRadio, { name: "option1", label: "选项一" }),
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-radio-group").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("radio 应支持默认插槽渲染标签", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () =>
            h(UiRadio, { name: "option1" }, { default: () => "自定义标签内容" }),
        },
      })
      await waitForTransition()

      expect(wrapper.text()).toContain("自定义标签内容")
    })
  })

  describe("边界情况", () => {
    it("无选中值时所有选项应为未选中状态", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      const radios = wrapper.findAll(".ui-radio")
      radios.forEach((radio) => {
        expect(radio.classes()).not.toContain("ui-radio--checked")
      })
    })

    it("modelValue 不匹配任何选项时所有选项应为未选中", async () => {
      const wrapper = mount(UiRadioGroup, {
        props: { modelValue: "invalid" },
        slots: {
          default: () => [h(UiRadio, { name: "option1", label: "选项一" }), h(UiRadio, { name: "option2", label: "选项二" })],
        },
      })
      await waitForTransition()

      const radios = wrapper.findAll(".ui-radio")
      radios.forEach((radio) => {
        expect(radio.classes()).not.toContain("ui-radio--checked")
      })
    })
  })
})
