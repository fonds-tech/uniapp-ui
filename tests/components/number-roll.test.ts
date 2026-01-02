/**
 * ui-number-roll 组件单元测试
 * 测试数字滚动组件的 props 和渲染逻辑
 */

import UiNumberRoll from "@/ui/ui-number-roll/ui-number-roll.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-number-roll 数字滚动组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认数字滚动组件", async () => {
      const wrapper = mount(UiNumberRoll)

      await waitForTransition()

      expect(wrapper.find(".ui-number-roll").exists()).toBe(true)
    })
  })

  describe("数值配置", () => {
    it("应支持设置数值", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 1234 },
      })

      expect(wrapper.props("value")).toBe(1234)
    })

    it("应支持字符串类型数值", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: "5678" },
      })

      expect(wrapper.props("value")).toBe("5678")
    })

    it("应支持小数", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 123.45 },
      })

      expect(wrapper.props("value")).toBe(123.45)
    })
  })

  describe("格式化配置", () => {
    it("应支持小数位数", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 100, decimalPlaces: 2 },
      })

      expect(wrapper.props("decimalPlaces")).toBe(2)
    })

    it("应支持去除尾部零", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 100.5, trimZero: true },
      })

      expect(wrapper.props("trimZero")).toBe(true)
    })

    it("应支持千分位分隔符", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 1234567, thousandsSep: true },
      })

      expect(wrapper.props("thousandsSep")).toBe(true)
    })
  })

  describe("样式配置", () => {
    it("应支持文字颜色", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { color: "#1989fa" },
      })

      expect(wrapper.props("color")).toBe("#1989fa")
    })

    it("应支持文字大小", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { fontSize: "48rpx" },
      })

      expect(wrapper.props("fontSize")).toBe("48rpx")
    })

    it("应支持文字粗细", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { fontWeight: 600 },
      })

      expect(wrapper.props("fontWeight")).toBe(600)
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiNumberRoll, {
        props: {
          customStyle: { letterSpacing: "2px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-number-roll").exists()).toBe(true)
    })
  })

  describe("动画配置", () => {
    it("应支持动画时长", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { duration: 2000 },
      })

      expect(wrapper.props("duration")).toBe(2000)
    })

    it("应支持缓动函数", () => {
      const wrapper = mount(UiNumberRoll, {
        props: { timingFunction: "ease-in-out" },
      })

      expect(wrapper.props("timingFunction")).toBe("ease-in-out")
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiNumberRoll)

      expect(wrapper.vm.name).toBe("ui-number-roll")
    })
  })

  describe("边界情况", () => {
    it("值为 0 时应正常渲染", async () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: 0 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-number-roll").exists()).toBe(true)
    })

    it("负数值时应正常渲染", async () => {
      const wrapper = mount(UiNumberRoll, {
        props: { value: -100 },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-number-roll").exists()).toBe(true)
    })

    it("无值时应正常渲染", async () => {
      const wrapper = mount(UiNumberRoll)

      await waitForTransition()

      expect(wrapper.find(".ui-number-roll").exists()).toBe(true)
    })
  })
})
