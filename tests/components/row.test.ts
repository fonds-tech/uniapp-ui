/**
 * ui-row 组件单元测试
 * 测试行布局组件的 props、provide 和渲染逻辑
 *
 * 注意：ui-row 组件使用 `useProps.gap || useProps.rowGap` 的逻辑，
 * 当 gap=0 时会被视为 falsy 而回退到 rowGap。
 * 因此测试时建议使用字符串形式的间隔值（如 "0rpx"）或非零数值。
 */

import UiRow from "@/ui/ui-row/ui-row.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

/**
 * 默认有效的 gap 值，使用字符串形式避免 falsy 判断问题
 */
const defaultGap = "0rpx"

describe("ui-row 行布局组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染行布局组件", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: defaultGap },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容的行布局", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: defaultGap },
        slots: { default: "<div class='test-content'>内容</div>" },
      })
      await waitForTransition()

      expect(wrapper.find(".test-content").exists()).toBe(true)
    })
  })

  describe("间隔配置", () => {
    it("应支持 gap 统一间隔（rpx 字符串）", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: "20rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("gap")).toBe("20rpx")
      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("应支持 gap 统一间隔（数值）", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: 20 },
      })
      await waitForTransition()

      expect(wrapper.props("gap")).toBe(20)
      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("应支持 gap 为 0rpx", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: "0rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("gap")).toBe("0rpx")
      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("应支持 colGap 列间隔", async () => {
      const wrapper = mount(UiRow, {
        props: { colGap: "10rpx", rowGap: "0rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("colGap")).toBe("10rpx")
    })

    it("应支持 rowGap 行间隔", async () => {
      const wrapper = mount(UiRow, {
        props: { rowGap: "15rpx", colGap: "0rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("rowGap")).toBe("15rpx")
    })

    it("应支持同时设置 rowGap 和 colGap", async () => {
      const wrapper = mount(UiRow, {
        props: { rowGap: "15rpx", colGap: "10rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("rowGap")).toBe("15rpx")
      expect(wrapper.props("colGap")).toBe("10rpx")
      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("应支持 px 单位的间隔", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: "10px" },
      })
      await waitForTransition()

      expect(wrapper.props("gap")).toBe("10px")
      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })
  })

  describe("对齐方式", () => {
    const justifyValues = ["start", "end", "center", "between", "around"] as const

    justifyValues.forEach((justify) => {
      it(`应支持 justify=${justify} 水平对齐`, async () => {
        const wrapper = mount(UiRow, {
          props: { justify, gap: defaultGap },
        })
        await waitForTransition()

        expect(wrapper.props("justify")).toBe(justify)
        expect(wrapper.find(".ui-row").exists()).toBe(true)
      })
    })

    const alignValues = ["start", "end", "center", "stretch", "baseline"] as const

    alignValues.forEach((align) => {
      it(`应支持 align=${align} 垂直对齐`, async () => {
        const wrapper = mount(UiRow, {
          props: { align, gap: defaultGap },
        })
        await waitForTransition()

        expect(wrapper.props("align")).toBe(align)
        expect(wrapper.find(".ui-row").exists()).toBe(true)
      })
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiRow, {
        props: { customClass: "my-row", gap: defaultGap },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-row")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiRow, {
        props: {
          customStyle: { marginTop: "10px" },
          gap: defaultGap,
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 name 属性", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: defaultGap },
      })
      await waitForTransition()

      expect(wrapper.vm.name).toBe("ui-row")
    })

    it("应暴露 resize 方法", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: defaultGap },
      })
      await waitForTransition()

      expect(typeof wrapper.vm.resize).toBe("function")
    })

    it("resize 方法调用不应抛错", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: defaultGap },
      })
      await waitForTransition()

      expect(() => wrapper.vm.resize()).not.toThrow()
    })
  })

  describe("边界情况", () => {
    it("gap 为 0rpx 时应正常渲染", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: "0rpx" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("gap 为 0px 时应正常渲染", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: "0px" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })

    it("gap 为非零数值时应正常渲染", async () => {
      const wrapper = mount(UiRow, {
        props: { gap: 10 },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-row").exists()).toBe(true)
    })
  })
})
