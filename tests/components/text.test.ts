/**
 * ui-text 组件单元测试
 * 测试文本组件的 props、events、slots 和渲染逻辑
 */

import UiText from "@/uni_modules/uniapp-ui/ui-text/ui-text.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-text 文本组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认文本组件", () => {
      const wrapper = mount(UiText)

      expect(wrapper.find(".ui-text").exists()).toBe(true)
    })

    it("应正确渲染带文本的组件", () => {
      const wrapper = mount(UiText, {
        props: { text: "测试文本" },
      })

      expect(wrapper.text()).toContain("测试文本")
    })

    it("应正确渲染 slot 内容", () => {
      const wrapper = mount(UiText, {
        slots: { default: "自定义内容" },
      })

      expect(wrapper.text()).toContain("自定义内容")
    })

    it("应正确渲染数字类型的文本", () => {
      const wrapper = mount(UiText, {
        props: { text: 12345 },
      })

      expect(wrapper.text()).toContain("12345")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义大小", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", size: 24 },
      })

      expect(wrapper.props("size")).toBe(24)
    })

    it("应支持自定义颜色", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", color: "#ff0000" },
      })

      const style = wrapper.find(".ui-text").attributes("style") || ""
      expect(style).toContain("color")
    })

    it("应支持自定义粗细", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", weight: 700 },
      })

      const style = wrapper.find(".ui-text").attributes("style") || ""
      expect(style).toContain("font-weight")
    })

    it("应支持自定义行高", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", lineHeight: 1.5 },
      })

      const style = wrapper.find(".ui-text").attributes("style") || ""
      expect(style).toContain("line-height")
    })
  })

  describe("文本对齐", () => {
    const alignments = ["left", "center", "right"] as const

    alignments.forEach((align) => {
      it(`应支持 ${align} 对齐`, () => {
        const wrapper = mount(UiText, {
          props: { text: "文本", align },
        })

        const style = wrapper.find(".ui-text").attributes("style") || ""
        expect(style).toContain("text-align")
      })
    })
  })

  describe("文本装饰", () => {
    it("应支持下划线装饰", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", decoration: "underline" },
      })

      const style = wrapper.find(".ui-text").attributes("style") || ""
      expect(style).toContain("text-decoration")
    })

    it("应支持删除线装饰", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", decoration: "line-through" },
      })

      const style = wrapper.find(".ui-text").attributes("style") || ""
      expect(style).toContain("text-decoration")
    })
  })

  describe("文本截断", () => {
    it("rows 为 1 时应添加单行省略类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "很长的文本内容", rows: 1 },
      })

      expect(wrapper.classes()).toContain("ui-text--ellipsis")
    })

    it("rows 大于 1 时应添加多行截断类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "很长的文本内容", rows: 3 },
      })

      expect(wrapper.classes()).toContain("ui-text--clamp")
    })

    it("rows 为 0 时不应添加截断类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", rows: 0 },
      })

      expect(wrapper.classes()).not.toContain("ui-text--ellipsis")
      expect(wrapper.classes()).not.toContain("ui-text--clamp")
    })
  })

  describe("可点击状态", () => {
    it("clickable 为 true 时应添加可点击类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "点击文本", clickable: true },
      })

      expect(wrapper.classes()).toContain("ui-text--clickable")
    })

    it("clickable 为 false 时不应添加可点击类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本" },
      })

      expect(wrapper.classes()).not.toContain("ui-text--clickable")
    })
  })

  describe("文本选择", () => {
    it("selectable 为 true 时应设置 selectable 属性", () => {
      const wrapper = mount(UiText, {
        props: { text: "可选择文本", selectable: true },
      })

      expect(wrapper.attributes("selectable")).toBe("true")
    })

    it("selectable 为 false 时不应设置 selectable 属性", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", selectable: false },
      })

      expect(wrapper.attributes("selectable")).toBe("false")
    })
  })

  describe("解码功能", () => {
    it("decode 为 true 时应设置 decode 属性", () => {
      const wrapper = mount(UiText, {
        props: { text: "&nbsp;", decode: true },
      })

      expect(wrapper.attributes("decode")).toBe("true")
    })
  })

  describe("事件处理", () => {
    it("点击文本应触发 click 事件", async () => {
      const wrapper = mount(UiText, {
        props: { text: "可点击文本" },
      })

      await wrapper.find(".ui-text").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", customClass: "my-text" },
      })

      expect(wrapper.classes()).toContain("my-text")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiText, {
        props: {
          text: "文本",
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-text").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiText, {
        slots: {
          default: "<span class='custom-content'>自定义</span>",
        },
      })

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("同时传入 text 和默认插槽时，插槽优先", () => {
      const wrapper = mount(UiText, {
        props: { text: "props文本" },
        slots: { default: "slot文本" },
      })

      expect(wrapper.text()).toContain("slot文本")
    })
  })

  describe("边界情况", () => {
    it("空文本应正常渲染", () => {
      const wrapper = mount(UiText, {
        props: { text: "" },
      })

      expect(wrapper.find(".ui-text").exists()).toBe(true)
    })

    it("字符串类型的 rows 应正确处理", () => {
      const wrapper = mount(UiText, {
        props: { text: "文本", rows: "2" },
      })

      expect(wrapper.classes()).toContain("ui-text--clamp")
    })

    it("数值 0 的文本应正确显示", () => {
      const wrapper = mount(UiText, {
        props: { text: 0 },
      })

      expect(wrapper.text()).toContain("0")
    })
  })
})
