/**
 * ui-line 组件单元测试
 * 测试分割线组件的 props 和渲染逻辑
 */

import UiLine from "@/uni_modules/uniapp-ui/ui-line/ui-line.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-line 分割线组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认分割线组件", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.find(".ui-line").exists()).toBe(true)
    })
  })

  describe("颜色属性", () => {
    it("应支持自定义颜色", () => {
      const wrapper = mount(UiLine, {
        props: { color: "#e0e0e0" },
      })

      expect(wrapper.props("color")).toBe("#e0e0e0")
    })

    it("应支持主题色", () => {
      const wrapper = mount(UiLine, {
        props: { color: "primary" },
      })

      expect(wrapper.props("color")).toBe("primary")
    })
  })

  describe("尺寸属性", () => {
    it("默认长度应为 100%", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.props("length")).toBe("100%")
    })

    it("应支持自定义长度", () => {
      const wrapper = mount(UiLine, {
        props: { length: 200 },
      })

      expect(wrapper.props("length")).toBe(200)
    })

    it("应支持字符串类型的长度", () => {
      const wrapper = mount(UiLine, {
        props: { length: "50%" },
      })

      expect(wrapper.props("length")).toBe("50%")
    })

    it("默认粗细应为 2rpx", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.props("thickness")).toBe("2rpx")
    })

    it("应支持自定义粗细", () => {
      const wrapper = mount(UiLine, {
        props: { thickness: 4 },
      })

      expect(wrapper.props("thickness")).toBe(4)
    })

    it("应支持字符串类型的粗细", () => {
      const wrapper = mount(UiLine, {
        props: { thickness: "4rpx" },
      })

      expect(wrapper.props("thickness")).toBe("4rpx")
    })
  })

  describe("线条类型属性", () => {
    it("默认类型应为 solid", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.props("type")).toBe("solid")
    })

    it("应支持 dashed 虚线类型", () => {
      const wrapper = mount(UiLine, {
        props: { type: "dashed" },
      })

      expect(wrapper.props("type")).toBe("dashed")
    })

    it("应支持 dotted 点线类型", () => {
      const wrapper = mount(UiLine, {
        props: { type: "dotted" },
      })

      expect(wrapper.props("type")).toBe("dotted")
    })
  })

  describe("方向属性", () => {
    it("默认应为水平线条", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.props("vertical")).toBe(false)
    })

    it("vertical 为 true 时应为垂直线条", () => {
      const wrapper = mount(UiLine, {
        props: { vertical: true },
      })

      expect(wrapper.props("vertical")).toBe(true)
    })

    it("水平线条应应用 border-top 样式", () => {
      const wrapper = mount(UiLine, {
        props: { color: "#ccc", thickness: "4rpx", type: "dashed" },
      })

      const style = wrapper.find(".ui-line").attributes("style") || ""
      expect(style).toContain("border-top")
      expect(style).toContain("dashed")
    })

    it("垂直线条应应用 border-left 样式", () => {
      const wrapper = mount(UiLine, {
        props: { vertical: true, color: "#ccc", thickness: "4rpx", type: "dotted" },
      })

      const style = wrapper.find(".ui-line").attributes("style") || ""
      expect(style).toContain("border-left")
      expect(style).toContain("dotted")
    })
  })

  describe("间距属性", () => {
    it("应支持自定义外间距", () => {
      const wrapper = mount(UiLine, {
        props: { margin: 20 },
      })

      expect(wrapper.props("margin")).toBe(20)
    })

    it("应支持字符串类型的外间距", () => {
      const wrapper = mount(UiLine, {
        props: { margin: "20rpx 0" },
      })

      expect(wrapper.props("margin")).toBe("20rpx 0")
    })
  })

  describe("自定义样式属性", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiLine, {
        props: { customClass: "my-line" },
      })

      expect(wrapper.classes()).toContain("my-line")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiLine, {
        props: { customStyle: { opacity: 0.5 } },
      })

      expect(wrapper.props("customStyle")).toEqual({ opacity: 0.5 })
    })

    it("应支持字符串类型的 customStyle", () => {
      const wrapper = mount(UiLine, {
        props: { customStyle: "opacity: 0.4" },
      })

      expect(wrapper.props("customStyle")).toBe("opacity: 0.4")
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiLine)

      expect(wrapper.vm.name).toBe("ui-line")
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确设置", () => {
      const wrapper = mount(UiLine, {
        props: {
          color: "#cccccc",
          length: 300,
          thickness: 2,
          type: "dashed",
          vertical: false,
          margin: 10,
          customClass: "my-line",
        },
      })

      expect(wrapper.props("color")).toBe("#cccccc")
      expect(wrapper.props("length")).toBe(300)
      expect(wrapper.props("thickness")).toBe(2)
      expect(wrapper.props("type")).toBe("dashed")
      expect(wrapper.props("vertical")).toBe(false)
      expect(wrapper.props("margin")).toBe(10)
      expect(wrapper.classes()).toContain("my-line")
    })

    it("垂直线条应正确设置", () => {
      const wrapper = mount(UiLine, {
        props: {
          vertical: true,
          length: 100,
          thickness: 2,
        },
      })

      expect(wrapper.props("vertical")).toBe(true)
      expect(wrapper.props("length")).toBe(100)
      expect(wrapper.props("thickness")).toBe(2)
    })
  })
})
