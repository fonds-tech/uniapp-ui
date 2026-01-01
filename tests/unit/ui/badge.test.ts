/**
 * ui-badge 组件单元测试
 * 测试徽章组件的 props、events、slots 和渲染逻辑
 */

import UiBadge from "@/ui/ui-badge/ui-badge.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-badge 徽章组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认徽章组件", () => {
      const wrapper = mount(UiBadge)

      expect(wrapper.find(".ui-badge").exists()).toBe(true)
    })

    it("应正确渲染带数值的徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5 },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(true)
      expect(wrapper.text()).toContain("5")
    })

    it("应正确渲染带字符串值的徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: "新" },
      })

      expect(wrapper.text()).toContain("新")
    })
  })

  describe("显示控制", () => {
    it("value 为正数时应显示徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 10 },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(true)
    })

    it("value 为 0 且 showZero 为 false 时不应显示徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 0, showZero: false },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(false)
    })

    it("value 为 0 且 showZero 为 true 时应显示徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 0, showZero: true },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(true)
      expect(wrapper.text()).toContain("0")
    })

    it("value 为空字符串时不应显示徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: "" },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(false)
    })
  })

  describe("最大值限制", () => {
    it("value 大于 max 时应显示 max+", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 100, max: 99 },
      })

      expect(wrapper.text()).toContain("99+")
    })

    it("value 等于 max 时应显示实际值", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 99, max: 99 },
      })

      expect(wrapper.text()).toContain("99")
      expect(wrapper.text()).not.toContain("+")
    })

    it("value 小于 max 时应显示实际值", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 50, max: 99 },
      })

      expect(wrapper.text()).toContain("50")
    })

    it("自定义 max 值应正确生效", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 20, max: 10 },
      })

      expect(wrapper.text()).toContain("10+")
    })
  })

  describe("圆点模式", () => {
    it("dot 为 true 时应显示圆点样式", () => {
      const wrapper = mount(UiBadge, {
        props: { dot: true },
      })

      expect(wrapper.find(".ui-badge__inner--dot").exists()).toBe(true)
    })

    it("圆点模式下文本值不可见（样式隐藏）", () => {
      const wrapper = mount(UiBadge, {
        props: { dot: true, value: 10 },
      })

      // 圆点模式使用圆点样式类
      expect(wrapper.find(".ui-badge__inner--dot").exists()).toBe(true)
    })

    it("应支持自定义圆点大小", () => {
      const wrapper = mount(UiBadge, {
        props: { dot: true, dotSize: 20 },
      })

      expect(wrapper.props("dotSize")).toBe(20)
    })
  })

  describe("图标模式", () => {
    it("设置 icon 时应显示图标", () => {
      const wrapper = mount(UiBadge, {
        props: { icon: "star" },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(true)
    })

    it("图标模式不应显示文本值", () => {
      const wrapper = mount(UiBadge, {
        props: { icon: "star", value: 10 },
      })

      expect(wrapper.find(".ui-badge__value").exists()).toBe(false)
    })
  })

  describe("位置定位", () => {
    const positions = ["top-right", "top-left", "bottom-right", "bottom-left"] as const

    positions.forEach((position) => {
      it(`应支持 ${position} 位置`, () => {
        const wrapper = mount(UiBadge, {
          props: { value: 5, position },
          slots: { default: "<div>内容</div>" },
        })

        expect(wrapper.find(`.ui-badge__inner--${position}`).exists()).toBe(true)
      })
    })
  })

  describe("偏移量", () => {
    it("应支持数字类型的偏移量", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, offset: 10 },
      })

      expect(wrapper.props("offset")).toBe(10)
    })

    it("应支持数组类型的偏移量", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, offset: [5, 10] },
      })

      expect(wrapper.props("offset")).toEqual([5, 10])
    })
  })

  describe("样式属性", () => {
    it("应支持自定义颜色", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, color: "#ff0000" },
      })

      const style = wrapper.find(".ui-badge__inner").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, height: 24 },
      })

      expect(wrapper.props("height")).toBe(24)
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, radius: 8 },
      })

      expect(wrapper.props("radius")).toBe(8)
    })

    it("应支持自定义 z-index", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, zIndex: 100 },
      })

      expect(wrapper.props("zIndex")).toBe(100)
    })
  })

  describe("字体样式", () => {
    it("应支持自定义字体大小", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, valueSize: 14 },
      })

      expect(wrapper.props("valueSize")).toBe(14)
    })

    it("应支持自定义字体颜色", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, valueColor: "#ffffff" },
      })

      expect(wrapper.props("valueColor")).toBe("#ffffff")
    })

    it("应支持自定义字体粗细", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, valueWeight: 700 },
      })

      expect(wrapper.props("valueWeight")).toBe(700)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5, customClass: "my-badge" },
      })

      expect(wrapper.find(".my-badge").exists()).toBe(true)
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiBadge, {
        props: {
          value: 5,
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(true)
    })
  })

  describe("事件处理", () => {
    it("点击徽章应触发 click 事件", async () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5 },
      })

      await wrapper.find(".ui-badge__inner").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽（包裹内容）", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5 },
        slots: {
          default: "<span class='badge-content'>内容</span>",
        },
      })

      expect(wrapper.find(".badge-content").exists()).toBe(true)
    })

    it("有默认插槽时徽章应使用绝对定位", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5 },
        slots: {
          default: "<span>内容</span>",
        },
      })

      expect(wrapper.find(".ui-badge__inner--absolute").exists()).toBe(true)
    })

    it("应支持 content 插槽", () => {
      const wrapper = mount(UiBadge, {
        props: { value: 5 },
        slots: {
          content: "<span class='custom-content'>自定义</span>",
        },
      })

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("负数 value 不应显示徽章", () => {
      const wrapper = mount(UiBadge, {
        props: { value: -5 },
      })

      expect(wrapper.find(".ui-badge__inner").exists()).toBe(false)
    })

    it("字符串类型的数值应正确处理", () => {
      const wrapper = mount(UiBadge, {
        props: { value: "100", max: "99" },
      })

      expect(wrapper.text()).toContain("99+")
    })
  })
})
