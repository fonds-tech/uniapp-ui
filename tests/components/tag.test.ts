/**
 * ui-tag 组件单元测试
 * 测试标签组件的 props、events、slots 和渲染逻辑
 */

import UiTag from "@/ui/ui-tag/ui-tag.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-tag 标签组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认标签组件", () => {
      const wrapper = mount(UiTag)

      expect(wrapper.find(".ui-tag").exists()).toBe(true)
    })

    it("应正确渲染带文本的标签", () => {
      const wrapper = mount(UiTag, {
        props: { text: "标签" },
      })

      expect(wrapper.text()).toContain("标签")
    })

    it("应正确渲染 slot 内容", () => {
      const wrapper = mount(UiTag, {
        slots: { default: "自定义标签" },
      })

      expect(wrapper.text()).toContain("自定义标签")
    })
  })

  describe("标签类型", () => {
    const types = ["primary", "success", "warning", "danger", "info"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, () => {
        const wrapper = mount(UiTag, {
          props: { type, text: "标签" },
        })

        expect(wrapper.classes()).toContain(`ui-tag--${type}`)
      })
    })
  })

  describe("标签形状", () => {
    it("round 为 true 时应添加圆形类名", () => {
      const wrapper = mount(UiTag, {
        props: { round: true, text: "标签" },
      })

      expect(wrapper.classes()).toContain("ui-tag--round")
    })

    it("plain 为 true 时应添加镂空类名", () => {
      const wrapper = mount(UiTag, {
        props: { plain: true, text: "标签" },
      })

      expect(wrapper.classes()).toContain("ui-tag--plain")
    })
  })

  describe("可关闭标签", () => {
    it("closeable 为 true 时应显示关闭按钮", () => {
      const wrapper = mount(UiTag, {
        props: { closeable: true, text: "标签" },
      })

      expect(wrapper.find(".ui-tag__close").exists()).toBe(true)
      expect(wrapper.classes()).toContain("ui-tag--closeable")
    })

    it("closeable 为 false 时不应显示关闭按钮", () => {
      const wrapper = mount(UiTag, {
        props: { closeable: false, text: "标签" },
      })

      expect(wrapper.find(".ui-tag__close").exists()).toBe(false)
    })

    it("点击关闭按钮应触发 close 事件", async () => {
      const wrapper = mount(UiTag, {
        props: { closeable: true, text: "标签" },
      })

      await wrapper.find(".ui-tag__close").trigger("click")

      expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("点击关闭按钮后标签应隐藏", async () => {
      const wrapper = mount(UiTag, {
        props: { closeable: true, text: "标签" },
      })

      await wrapper.find(".ui-tag__close").trigger("click")

      expect(wrapper.find(".ui-tag").exists()).toBe(false)
    })
  })

  describe("显示控制", () => {
    it("show 为 true 时应显示标签", () => {
      const wrapper = mount(UiTag, {
        props: { show: true, text: "标签" },
      })

      expect(wrapper.find(".ui-tag").exists()).toBe(true)
    })

    it("show 为 false 时不应显示标签", () => {
      const wrapper = mount(UiTag, {
        props: { show: false, text: "标签" },
      })

      expect(wrapper.find(".ui-tag").exists()).toBe(false)
    })
  })

  describe("图标", () => {
    it("应正确渲染带图标的标签", () => {
      const wrapper = mount(UiTag, {
        props: { icon: "star", text: "标签" },
      })

      expect(wrapper.find(".ui-tag__icon").exists()).toBe(true)
    })

    it("无图标时不应渲染图标区域", () => {
      const wrapper = mount(UiTag, {
        props: { text: "标签" },
      })

      expect(wrapper.find(".ui-tag__icon").exists()).toBe(false)
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiTag, {
        props: { icon: "star", iconSize: 24, text: "标签" },
      })

      expect(wrapper.props("iconSize")).toBe(24)
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiTag, {
        props: { icon: "star", iconColor: "#ff0000", text: "标签" },
      })

      expect(wrapper.props("iconColor")).toBe("#ff0000")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义高度", () => {
      const wrapper = mount(UiTag, {
        props: { height: 32, text: "标签" },
      })

      expect(wrapper.props("height")).toBe(32)
    })

    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiTag, {
        props: { background: "#ff0000", text: "标签" },
      })

      const style = wrapper.find(".ui-tag").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持自定义边框颜色", () => {
      const wrapper = mount(UiTag, {
        props: { borderColor: "#ff0000", text: "标签" },
      })

      const style = wrapper.find(".ui-tag").attributes("style") || ""
      expect(style).toContain("border-color")
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiTag, {
        props: { borderRadius: 8, text: "标签" },
      })

      expect(wrapper.props("borderRadius")).toBe(8)
    })
  })

  describe("文本样式", () => {
    it("应支持自定义文本大小", () => {
      const wrapper = mount(UiTag, {
        props: { textSize: 14, text: "标签" },
      })

      expect(wrapper.props("textSize")).toBe(14)
    })

    it("应支持自定义文本颜色", () => {
      const wrapper = mount(UiTag, {
        props: { textColor: "#333333", text: "标签" },
      })

      const style = wrapper.find(".ui-tag").attributes("style") || ""
      expect(style).toContain("color")
    })

    it("应支持自定义文本粗细", () => {
      const wrapper = mount(UiTag, {
        props: { textWeight: 700, text: "标签" },
      })

      expect(wrapper.props("textWeight")).toBe(700)
    })
  })

  describe("事件处理", () => {
    it("点击标签应触发 click 事件", async () => {
      const wrapper = mount(UiTag, {
        props: { text: "标签" },
      })

      await wrapper.find(".ui-tag").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiTag, {
        props: { customClass: "my-tag", text: "标签" },
      })

      expect(wrapper.classes()).toContain("my-tag")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiTag, {
        props: {
          text: "标签",
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-tag").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiTag, {
        slots: {
          default: "<span class='custom-text'>自定义文本</span>",
        },
      })

      expect(wrapper.find(".custom-text").exists()).toBe(true)
    })

    it("应支持 icon 插槽", () => {
      const wrapper = mount(UiTag, {
        slots: {
          icon: "<span class='custom-icon'>★</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应支持 close 插槽", () => {
      const wrapper = mount(UiTag, {
        slots: {
          close: "<span class='custom-close'>×</span>",
        },
      })

      expect(wrapper.find(".custom-close").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空文本应正常渲染", () => {
      const wrapper = mount(UiTag, {
        props: { text: "" },
      })

      expect(wrapper.find(".ui-tag").exists()).toBe(true)
    })

    it("多个修饰符应正确组合", () => {
      const wrapper = mount(UiTag, {
        props: {
          type: "success",
          round: true,
          plain: true,
          closeable: true,
          text: "标签",
        },
      })

      expect(wrapper.classes()).toContain("ui-tag--success")
      expect(wrapper.classes()).toContain("ui-tag--round")
      expect(wrapper.classes()).toContain("ui-tag--plain")
      expect(wrapper.classes()).toContain("ui-tag--closeable")
    })
  })
})
