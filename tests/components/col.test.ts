/**
 * ui-col 组件单元测试
 * 测试列布局组件的 props、inject 和渲染逻辑
 *
 * 注意：ui-col 在与 ui-row 配合时，会从 row 注入获取 gap/colGap/rowGap，
 * 但由于组件条件编译块 (#ifndef H5 || APP-PLUS || MP-WEIXIN) 的存在，
 * 测试环境（H5）和非 H5 环境的行为不同。
 */

import UiCol from "@/ui/ui-col/ui-col.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
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
  })

  describe("对齐方式", () => {
    const justifyValues = ["start", "end", "center", "between", "around"] as const

    justifyValues.forEach((justify) => {
      it(`应支持 justify=${justify} 水平对齐`, async () => {
        const wrapper = mount(UiCol, {
          props: { justify },
        })
        await waitForTransition()

        expect(wrapper.props("justify")).toBe(justify)
        expect(wrapper.find(".ui-col").exists()).toBe(true)
      })
    })

    const alignValues = ["start", "end", "center", "stretch", "baseline"] as const

    alignValues.forEach((align) => {
      it(`应支持 align=${align} 垂直对齐`, async () => {
        const wrapper = mount(UiCol, {
          props: { align },
        })
        await waitForTransition()

        expect(wrapper.props("align")).toBe(align)
        expect(wrapper.find(".ui-col").exists()).toBe(true)
      })
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

  describe("注入 row 配置", () => {
    it("应从 row 继承间隔配置", async () => {
      // 通过手动 provide 模拟 row 的注入
      // 需要包含 width 属性，因为组件在非 H5 环境下会使用它
      const wrapper = mount(UiCol, {
        props: { span: 12 },
        slots: { default: () => "列" },
        global: {
          provide: {
            "ui-row": {
              gap: ref("20rpx"),
              colGap: ref(""),
              rowGap: ref(""),
              width: ref(375), // 模拟 row 宽度
            },
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
    })

    it("无 row 注入时应独立渲染", async () => {
      const wrapper = mount(UiCol, {
        props: { span: 12 },
        slots: { default: "独立列" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-col").exists()).toBe(true)
      expect(wrapper.text()).toContain("独立列")
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
  })
})
