/**
 * ui-col 组件单元测试
 * 测试列布局组件的 props 和渲染逻辑
 */

import UiCol from "@/uni_modules/uniapp-ui/ui-col/ui-col.vue"
import { mount } from "@vue/test-utils"
import { computed } from "vue"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-col 列布局组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认列布局组件", async () => {
      const wrapper = mount(UiCol)
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容的列布局", async () => {
      const wrapper = mount(UiCol, {
        slots: { default: "<div class='test-content'>内容</div>" },
      })
      await waitForTransition()

      expect(wrapper.find(".test-content").exists()).toBe(true)
    })
  })

  describe("栅格配置", () => {
    it("默认 span 应为 24", async () => {
      const wrapper = mount(UiCol)
      await waitForTransition()

      expect(wrapper.props("span")).toBe(24)
    })

    const spanValues = [1, 6, 8, 12, 18, 24]

    spanValues.forEach((span) => {
      it(`应支持 span=${span} 栅格占位`, async () => {
        const wrapper = mount(UiCol, {
          props: { span },
        })
        await waitForTransition()

        expect(wrapper.props("span")).toBe(span)
        expect(wrapper.find(".ui-col").exists()).toBe(true)
      })
    })

    it("span 超过 24 时仍接收原值（组件内部处理）", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 30 },
      })
      await waitForTransition()

      // 组件内部会 Math.min(24, span)，但 props 仍为传入值
      expect(wrapper.props("span")).toBe(30)
      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })
  })

  describe("偏移配置", () => {
    it("默认 offset 应为 0", async () => {
      const wrapper = mount(UiCol)
      await waitForTransition()

      expect(wrapper.props("offset")).toBe(0)
    })

    it("应支持数值类型偏移", async () => {
      const wrapper = mount(UiCol, {
        props: { offset: 6 },
      })
      await waitForTransition()

      expect(wrapper.props("offset")).toBe(6)
      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })

    it("偏移值应影响样式", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 12, offset: 6 },
      })
      await waitForTransition()

      // 偏移量为 6/24 = 25%
      const style = wrapper.find(".ui-col").attributes("style")
      expect(style).toContain("margin-left")
    })

    it("offset 超出可用范围时应被限制", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 20, offset: 10 },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-col").attributes("style") || ""
      expect(style).toContain("margin-left: 16.666")
    })
  })

  describe("行列间距", () => {
    it("应从 Row 注入间距并应用 padding", async () => {
      const wrapper = mount(UiCol, {
        global: {
          provide: {
            "ui-row": computed(() => ({
              rowGap: "8px",
              colGap: "12px",
            })),
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-col").attributes("style") || ""
      expect(style).toContain("padding: calc(8px / 2) calc(12px / 2)")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiCol, {
        props: { customClass: "my-col" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-col")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiCol, {
        props: {
          customStyle: { padding: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 name 属性", async () => {
      const wrapper = mount(UiCol)
      await waitForTransition()

      expect(wrapper.vm.name).toBe("ui-col")
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiCol)
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })

    it("独立使用时应正常渲染", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 12 },
        slots: { default: "独立列" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
      expect(wrapper.text()).toContain("独立列")
    })

    it("多个不同 span 值应正常渲染", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 6 },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
      expect(wrapper.props("span")).toBe(6)
    })

    it("span 为 0 时宽度应为 0%", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 0 },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-col").attributes("style")
      expect(style).toContain("width: 0%")
    })

    it("span 为负数时宽度应为 0%", async () => {
      const wrapper = mount(UiCol, {
        props: { span: -6 },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-col").attributes("style") || ""
      expect(style).toContain("width: 0%")
    })
  })
})
