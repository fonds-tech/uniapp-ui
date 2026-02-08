/**
 * ui-segmented 组件单元测试
 * 测试分段控制器组件的 props、events 和渲染逻辑
 */

import UiSegmented from "@/uni_modules/uniapp-ui/ui-segmented/ui-segmented.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const defaultOptions = [
  { label: "选项 A", value: "a" },
  { label: "选项 B", value: "b" },
  { label: "选项 C", value: "c" },
]

describe("ui-segmented 分段控制器组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认分段控制器组件", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-segmented").exists()).toBe(true)
    })

    it("应渲染正确数量的选项", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-segmented__item").length).toBe(3)
    })

    it("应正确显示选项文本", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions },
      })
      await waitForTransition()

      const items = wrapper.findAll(".ui-segmented__item")
      expect(items[0].text()).toBe("选项 A")
      expect(items[1].text()).toBe("选项 B")
      expect(items[2].text()).toBe("选项 C")
    })
  })

  describe("选中状态", () => {
    it("应正确标记选中项", async () => {
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "b", options: defaultOptions },
      })
      await waitForTransition()

      const items = wrapper.findAll(".ui-segmented__item")
      expect(items[1].classes()).toContain("ui-segmented__item--active")
    })

    it("点击选项应更新选中状态", async () => {
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "a", options: defaultOptions },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[1].trigger("click")

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["b"])
    })

    it("点击选项应触发 change 事件", async () => {
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "a", options: defaultOptions },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[2].trigger("click")

      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("change")?.[0]).toEqual(["c"])
    })

    it("点击已选中项不应触发事件", async () => {
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "a", options: defaultOptions },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[0].trigger("click")

      expect(wrapper.emitted("change")).toBeFalsy()
    })
  })

  describe("样式类型", () => {
    const types = ["filled", "outline", "block"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, async () => {
        const wrapper = mount(UiSegmented, {
          props: { options: defaultOptions, type },
        })
        await waitForTransition()

        expect(wrapper.classes()).toContain(`ui-segmented--${type}`)
      })
    })
  })

  describe("尺寸变体", () => {
    const sizes = ["small", "medium", "large"] as const

    sizes.forEach((size) => {
      it(`应支持 ${size} 尺寸`, async () => {
        const wrapper = mount(UiSegmented, {
          props: { options: defaultOptions, size },
        })
        await waitForTransition()

        expect(wrapper.classes()).toContain(`ui-segmented--${size}`)
      })
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions, disabled: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-segmented--disabled")
    })

    it("disabled 为 true 时点击应无效", async () => {
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "a", options: defaultOptions, disabled: true },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[1].trigger("click")

      expect(wrapper.emitted("change")).toBeFalsy()
    })

    it("单个选项禁用时应添加禁用类名", async () => {
      const disabledOptions = [
        { label: "A", value: "a" },
        { label: "B", value: "b", disabled: true },
      ]
      const wrapper = mount(UiSegmented, {
        props: { options: disabledOptions },
      })
      await waitForTransition()

      const items = wrapper.findAll(".ui-segmented__item")
      expect(items[1].classes()).toContain("ui-segmented__item--disabled")
    })

    it("禁用的单个选项点击应无效", async () => {
      const disabledOptions = [
        { label: "A", value: "a" },
        { label: "B", value: "b", disabled: true },
      ]
      const wrapper = mount(UiSegmented, {
        props: { modelValue: "a", options: disabledOptions },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[1].trigger("click")

      expect(wrapper.emitted("change")).toBeFalsy()
    })
  })

  describe("block 模式", () => {
    it("block 为 true 时应添加 block 类名", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions, block: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-segmented--block")
    })
  })

  describe("圆角模式", () => {
    it("round 为 true 时应添加 round 类名", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions, round: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-segmented--round")
    })
  })

  describe("点击事件", () => {
    it("应触发 click 事件并传递选项信息", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions },
      })
      await waitForTransition()

      await wrapper.findAll(".ui-segmented__item")[1].trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.[0]).toEqual([{ label: "选项 B", value: "b" }])
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSegmented, {
        props: { options: defaultOptions, customClass: "my-segmented" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-segmented")
    })
  })
})
