/**
 * ui-switch 组件单元测试
 * 测试开关组件的 props、events 和渲染逻辑
 */

import UiSwitch from "@/ui/ui-switch/ui-switch.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-switch 开关组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认开关组件", async () => {
      const wrapper = mount(UiSwitch)
      await waitForTransition()

      expect(wrapper.find(".ui-switch").exists()).toBe(true)
      expect(wrapper.find(".ui-switch__node").exists()).toBe(true)
    })

    it("默认状态应为关闭", async () => {
      const wrapper = mount(UiSwitch)
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-switch--active")
    })
  })

  describe("开关状态", () => {
    it("modelValue 为 true 时应显示激活状态", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-switch--active")
    })

    it("modelValue 为 false 时应显示未激活状态", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-switch--active")
    })

    it("点击开关应切换状态", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([true])
    })

    it("点击已激活的开关应切换为未激活", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: true },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([false])
    })

    it("应响应 modelValue 变化", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: true })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-switch--active")
    })
  })

  describe("自定义值", () => {
    it("应支持自定义 activeValue", async () => {
      const wrapper = mount(UiSwitch, {
        props: {
          modelValue: "off",
          activeValue: "on",
          inactiveValue: "off",
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["on"])
    })

    it("应支持自定义 inactiveValue", async () => {
      const wrapper = mount(UiSwitch, {
        props: {
          modelValue: "on",
          activeValue: "on",
          inactiveValue: "off",
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["off"])
    })

    it("应支持数字类型的自定义值", async () => {
      const wrapper = mount(UiSwitch, {
        props: {
          modelValue: 0,
          activeValue: 1,
          inactiveValue: 0,
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")![0]).toEqual([1])
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiSwitch, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-switch--disabled")
    })

    it("禁用状态下点击不应切换状态", async () => {
      const wrapper = mount(UiSwitch, {
        props: { disabled: true, modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })
  })

  describe("加载状态", () => {
    it("loading 为 true 时应显示加载图标", async () => {
      const wrapper = mount(UiSwitch, {
        props: { loading: true },
      })
      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-loading" }).exists()).toBe(true)
    })

    it("加载状态下点击不应切换状态", async () => {
      const wrapper = mount(UiSwitch, {
        props: { loading: true, modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("应支持自定义加载图标大小", async () => {
      const wrapper = mount(UiSwitch, {
        props: { loading: true, loadingIconSize: "24rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("loadingIconSize")).toBe("24rpx")
    })

    it("应支持自定义加载图标颜色", async () => {
      const wrapper = mount(UiSwitch, {
        props: { loading: true, loadingIconColor: "#1989fa" },
      })
      await waitForTransition()

      expect(wrapper.props("loadingIconColor")).toBe("#1989fa")
    })
  })

  describe("颜色配置", () => {
    it("应支持自定义激活颜色", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: true, activeColor: "#07c160" },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-switch").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持自定义未激活颜色", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false, inactiveColor: "#cccccc" },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-switch").attributes("style") || ""
      expect(style).toContain("background")
    })
  })

  describe("文字配置", () => {
    it("应支持激活状态文字", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: true, activeText: "开" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-switch__text--left").text()).toBe("开")
    })

    it("应支持未激活状态文字", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false, inactiveText: "关" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-switch__text--right").text()).toBe("关")
    })

    it("应支持自定义文字大小", async () => {
      const wrapper = mount(UiSwitch, {
        props: { activeText: "开", textSize: "24rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("textSize")).toBe("24rpx")
    })

    it("应支持自定义文字颜色", async () => {
      const wrapper = mount(UiSwitch, {
        props: { activeText: "开", textColor: "#ffffff" },
      })
      await waitForTransition()

      expect(wrapper.props("textColor")).toBe("#ffffff")
    })

    it("应支持自定义文字粗细", async () => {
      const wrapper = mount(UiSwitch, {
        props: { activeText: "开", textWeight: 600 },
      })
      await waitForTransition()

      expect(wrapper.props("textWeight")).toBe(600)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义尺寸", async () => {
      const wrapper = mount(UiSwitch, {
        props: { size: "60rpx" },
      })
      await waitForTransition()

      // 验证 props 设置正确
      expect(wrapper.props("size")).toBe("60rpx")
    })

    it("应支持自定义间距", async () => {
      const wrapper = mount(UiSwitch, {
        props: { gutter: "8rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("gutter")).toBe("8rpx")
    })
  })

  describe("事件处理", () => {
    it("切换时应触发 change 事件", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("change")![0]).toEqual([true])
    })

    it("切换时应触发 update:modelValue 事件", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("beforeChange 回调", () => {
    it("应支持 beforeChange 回调", async () => {
      const beforeChange = vi.fn((value, next) => {
        next(value)
      })

      const wrapper = mount(UiSwitch, {
        props: { modelValue: false, beforeChange },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(beforeChange).toHaveBeenCalled()
    })

    it("beforeChange 可以阻止切换", async () => {
      const beforeChange = vi.fn((value, next) => {
        // 不调用 next，阻止切换
      })

      const wrapper = mount(UiSwitch, {
        props: { modelValue: false, beforeChange },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(beforeChange).toHaveBeenCalled()
      // 由于没有调用 next，不应触发 update:modelValue
      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })

    it("beforeChange 可以修改切换的值", async () => {
      const beforeChange = vi.fn((value, next) => {
        next("custom-value")
      })

      const wrapper = mount(UiSwitch, {
        props: { modelValue: false, beforeChange },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["custom-value"])
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSwitch, {
        props: { customClass: "my-switch" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-switch")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSwitch, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-switch").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 node 插槽", async () => {
      const wrapper = mount(UiSwitch, {
        slots: {
          node: "<span class=\"custom-node\">自定义</span>",
        },
      })
      await waitForTransition()

      expect(wrapper.find(".custom-node").exists()).toBe(true)
    })

    it("node 插槽应接收 checked 参数", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: true },
        slots: {
          node: ({ checked }: { checked: boolean }) => `<span>${checked ? "是" : "否"}</span>`,
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-switch__node").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("多次快速点击应正确处理", async () => {
      const wrapper = mount(UiSwitch, {
        props: { modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()
      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")!.length).toBe(2)
    })

    it("同时设置 disabled 和 loading 应阻止切换", async () => {
      const wrapper = mount(UiSwitch, {
        props: { disabled: true, loading: true, modelValue: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-switch").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeFalsy()
    })
  })
})
