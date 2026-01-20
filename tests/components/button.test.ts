/**
 * ui-button 组件单元测试
 * 测试按钮组件的 props、events、slots 和渲染逻辑
 */

import UiButton from "@/uni_modules/uniapp-ui/ui-button/ui-button.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-button 按钮组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认按钮组件", () => {
      const wrapper = mount(UiButton)

      expect(wrapper.find(".ui-button").exists()).toBe(true)
    })

    it("应正确渲染带文本的按钮", () => {
      const wrapper = mount(UiButton, {
        slots: { default: "点击按钮" },
      })

      expect(wrapper.text()).toContain("点击按钮")
    })
  })

  describe("按钮类型", () => {
    const types = ["primary", "success", "warning", "danger", "info", "default"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, () => {
        const wrapper = mount(UiButton, {
          props: { type },
          slots: { default: "按钮" },
        })

        expect(wrapper.classes()).toContain(`ui-button--${type}`)
      })
    })
  })

  describe("按钮大小", () => {
    const sizes = ["mini", "small", "normal", "large"] as const

    sizes.forEach((size) => {
      it(`应支持 ${size} 大小`, () => {
        const wrapper = mount(UiButton, {
          props: { size },
          slots: { default: "按钮" },
        })

        expect(wrapper.classes()).toContain(`ui-button--${size}`)
      })
    })
  })

  describe("按钮形状", () => {
    it("round 为 true 时应添加圆形类名", () => {
      const wrapper = mount(UiButton, {
        props: { round: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--round")
    })

    it("block 为 true 时应添加块级类名", () => {
      const wrapper = mount(UiButton, {
        props: { block: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--block")
    })
  })

  describe("按钮样式变体", () => {
    it("plain 为 true 时应添加镂空类名", () => {
      const wrapper = mount(UiButton, {
        props: { plain: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--plain")
    })

    it("text 为 true 时应添加文本按钮类名", () => {
      const wrapper = mount(UiButton, {
        props: { text: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--text")
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--disabled")
    })

    it("禁用状态下点击不应触发事件", async () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true },
        slots: { default: "按钮" },
      })

      await wrapper.find(".ui-button").trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })
  })

  describe("加载状态", () => {
    it("loading 为 true 时应添加加载类名", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--loading")
    })

    it("加载状态下应显示加载图标", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button__loading").exists()).toBe(true)
    })

    it("加载状态下点击不应触发事件", async () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "按钮" },
      })

      await wrapper.find(".ui-button").trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("应支持加载文本", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true, loadingText: "加载中..." },
      })

      expect(wrapper.text()).toContain("加载中...")
    })
  })

  describe("图标", () => {
    it("应正确渲染带图标的按钮", () => {
      const wrapper = mount(UiButton, {
        props: { icon: "star" },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button__icon").exists()).toBe(true)
    })

    it("图标位置默认为左侧", () => {
      const wrapper = mount(UiButton, {
        props: { icon: "star" },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button__content").classes()).not.toContain("ui-button__content--reverse")
    })

    it("iconPosition 为 right 时图标应在右侧", () => {
      const wrapper = mount(UiButton, {
        props: { icon: "star", iconPosition: "right" },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button__content").classes()).toContain("ui-button__content--reverse")
    })

    it("加载状态下不应显示图标", () => {
      const wrapper = mount(UiButton, {
        props: { icon: "star", loading: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button__icon").exists()).toBe(false)
      expect(wrapper.find(".ui-button__loading").exists()).toBe(true)
    })
  })

  describe("样式属性", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiButton, {
        props: { width: 200 },
        slots: { default: "按钮" },
      })

      expect(wrapper.props("width")).toBe(200)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiButton, {
        props: { height: 48 },
        slots: { default: "按钮" },
      })

      expect(wrapper.props("height")).toBe(48)
    })

    it("应支持自定义颜色", () => {
      const wrapper = mount(UiButton, {
        props: { color: "#ff0000" },
        slots: { default: "按钮" },
      })

      const style = wrapper.find(".ui-button").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持自定义文本颜色", () => {
      const wrapper = mount(UiButton, {
        props: { textColor: "#ffffff" },
        slots: { default: "按钮" },
      })

      const style = wrapper.find(".ui-button").attributes("style") || ""
      expect(style).toContain("color")
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiButton, {
        props: { borderRadius: 8 },
        slots: { default: "按钮" },
      })

      expect(wrapper.props("borderRadius")).toBe(8)
    })
  })

  describe("事件处理", () => {
    it("点击按钮应触发 click 事件", async () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      await wrapper.find(".ui-button").trigger("click")

      // 由于有节流，需要等待
      await new Promise((resolve) => setTimeout(resolve, 250))

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiButton, {
        props: { customClass: "my-button" },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("my-button")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiButton, {
        props: {
          customStyle: { marginTop: "10px" },
        },
        slots: { default: "按钮" },
      })

      expect(wrapper.find(".ui-button").exists()).toBe(true)
    })
  })

  describe("表单相关", () => {
    it("应支持 formType 属性", () => {
      const wrapper = mount(UiButton, {
        props: { formType: "submit" },
        slots: { default: "提交" },
      })

      expect(wrapper.attributes("form-type")).toBe("submit")
    })
  })

  describe("开放能力", () => {
    it("应支持 openType 属性", () => {
      const wrapper = mount(UiButton, {
        props: { openType: "share" },
        slots: { default: "分享" },
      })

      expect(wrapper.attributes("open-type")).toBe("share")
    })
  })

  describe("悬停效果", () => {
    it("正常状态应有悬停类", () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      expect(wrapper.attributes("hover-class")).toBe("ui-button--active")
    })

    it("禁用状态不应有悬停类", () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.attributes("hover-class")).toBe("")
    })

    it("加载状态不应有悬停类", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "按钮" },
      })

      expect(wrapper.attributes("hover-class")).toBe("")
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 setLoading 方法", () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      expect(typeof wrapper.vm.setLoading).toBe("function")
    })

    it("应暴露 setDisabled 方法", () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      expect(typeof wrapper.vm.setDisabled).toBe("function")
    })

    it("setLoading 应正确控制加载状态", async () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      wrapper.vm.setLoading(true)
      await wrapper.vm.$nextTick()

      expect(wrapper.classes()).toContain("ui-button--loading")
    })

    it("setDisabled 应正确控制禁用状态", async () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      wrapper.vm.setDisabled(true)
      await wrapper.vm.$nextTick()

      expect(wrapper.classes()).toContain("ui-button--disabled")
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", () => {
      const wrapper = mount(UiButton)

      expect(wrapper.find(".ui-button").exists()).toBe(true)
    })

    it("多个修饰符应正确组合", () => {
      const wrapper = mount(UiButton, {
        props: {
          type: "primary",
          size: "large",
          round: true,
          block: true,
        },
        slots: { default: "按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--primary")
      expect(wrapper.classes()).toContain("ui-button--large")
      expect(wrapper.classes()).toContain("ui-button--round")
      expect(wrapper.classes()).toContain("ui-button--block")
    })
  })
})
