/**
 * ui-loading 组件单元测试
 * 测试加载组件的 props、slots 和渲染逻辑
 */

import UiLoading from "@/uni_modules/uniapp-ui/ui-loading/ui-loading.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-loading 加载组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认加载组件", () => {
      const wrapper = mount(UiLoading)

      expect(wrapper.find(".ui-loading").exists()).toBe(true)
      expect(wrapper.find(".ui-loading__icon").exists()).toBe(true)
      expect(wrapper.find(".ui-loading__rotate").exists()).toBe(true)
    })

    it("默认应显示加载组件（show 默认为 true）", () => {
      const wrapper = mount(UiLoading)

      expect(wrapper.find(".ui-loading").exists()).toBe(true)
    })
  })

  describe("显示控制", () => {
    it("show 为 true 时应显示加载组件", () => {
      const wrapper = mount(UiLoading, {
        props: { show: true },
      })

      expect(wrapper.find(".ui-loading").exists()).toBe(true)
    })

    it("show 为 false 时应隐藏加载组件", () => {
      const wrapper = mount(UiLoading, {
        props: { show: false },
      })

      expect(wrapper.find(".ui-loading").exists()).toBe(false)
    })
  })

  describe("类型变体", () => {
    it("默认类型应为 circular", () => {
      const wrapper = mount(UiLoading)

      expect(wrapper.find(".ui-loading__rotate--circular").exists()).toBe(true)
    })

    it("应支持 spinner 类型", () => {
      const wrapper = mount(UiLoading, {
        props: { type: "spinner" },
      })

      expect(wrapper.find(".ui-loading__rotate--spinner").exists()).toBe(true)
    })

    it("应支持 circular 类型", () => {
      const wrapper = mount(UiLoading, {
        props: { type: "circular" },
      })

      expect(wrapper.find(".ui-loading__rotate--circular").exists()).toBe(true)
    })
  })

  describe("文本显示", () => {
    it("应正确渲染带文本的加载组件", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中..." },
      })

      expect(wrapper.find(".ui-loading__text").exists()).toBe(true)
      expect(wrapper.text()).toContain("加载中...")
    })

    it("无文本时不应渲染文本元素", () => {
      const wrapper = mount(UiLoading)

      expect(wrapper.find(".ui-loading__text").exists()).toBe(false)
    })

    it("应支持通过 slot 设置文本", () => {
      const wrapper = mount(UiLoading, {
        slots: { default: "自定义加载文本" },
      })

      expect(wrapper.find(".ui-loading__text").exists()).toBe(true)
      expect(wrapper.text()).toContain("自定义加载文本")
    })
  })

  describe("图标插槽", () => {
    it("应支持 icon 插槽覆盖默认图标", () => {
      const wrapper = mount(UiLoading, {
        slots: {
          icon: "<span class='custom-icon'>icon</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
      expect(wrapper.find(".ui-loading__rotate").exists()).toBe(false)
    })
  })

  describe("布局模式", () => {
    it("默认应为水平布局", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中" },
      })

      expect(wrapper.classes()).not.toContain("ui-loading--vertical")
    })

    it("应支持垂直布局", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", vertical: true },
      })

      expect(wrapper.classes()).toContain("ui-loading--vertical")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义大小", () => {
      const wrapper = mount(UiLoading, {
        props: { size: 48 },
      })

      expect(wrapper.find(".ui-loading").exists()).toBe(true)
      expect(wrapper.props("size")).toBe(48)
    })

    it("应支持自定义颜色", () => {
      const wrapper = mount(UiLoading, {
        props: { color: "#ff0000" },
      })

      const style = wrapper.find(".ui-loading").attributes("style") || ""
      expect(style).toContain("color")
    })
  })

  describe("文本样式", () => {
    it("应支持自定义文本颜色", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textColor: "#333333" },
      })

      const textStyle = wrapper.find(".ui-loading__text").attributes("style") || ""
      expect(textStyle).toContain("color")
    })

    it("应支持自定义文本大小", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textSize: 14 },
      })

      expect(wrapper.props("textSize")).toBe(14)
    })

    it("应支持自定义文本粗细", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textWeight: 700 },
      })

      expect(wrapper.props("textWeight")).toBe(700)
    })

    it("应支持自定义文本间距", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textGap: 20 },
      })

      expect(wrapper.props("textGap")).toBe(20)
    })

    it("横向布局应使用 margin-left", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textGap: 12, vertical: false },
      })

      const textStyle = wrapper.find(".ui-loading__text").attributes("style") || ""
      expect(textStyle).toContain("margin-left")
    })

    it("纵向布局应使用 margin-top", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "加载中", textGap: 12, vertical: true },
      })

      const textStyle = wrapper.find(".ui-loading__text").attributes("style") || ""
      expect(textStyle).toContain("margin-top")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiLoading, {
        props: { customClass: "my-loading" },
      })

      expect(wrapper.classes()).toContain("my-loading")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiLoading, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-loading").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽（文本内容）", () => {
      const wrapper = mount(UiLoading, {
        slots: {
          default: "<span class='custom-text'>自定义文本</span>",
        },
      })

      expect(wrapper.find(".custom-text").exists()).toBe(true)
    })

    it("应支持图标插槽", () => {
      const wrapper = mount(UiLoading, {
        slots: {
          icon: "<span class='custom-icon'>⏳</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("使用图标插槽时不应渲染默认旋转图标", () => {
      const wrapper = mount(UiLoading, {
        slots: {
          icon: "<span class='custom-icon'>⏳</span>",
        },
      })

      expect(wrapper.find(".ui-loading__rotate").exists()).toBe(false)
    })
  })

  describe("边界情况", () => {
    it("同时传入 text 和默认插槽时，插槽优先", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "props文本" },
        slots: { default: "slot文本" },
      })

      expect(wrapper.text()).toContain("slot文本")
    })

    it("空文本时不应渲染文本元素", () => {
      const wrapper = mount(UiLoading, {
        props: { text: "" },
      })

      expect(wrapper.find(".ui-loading__text").exists()).toBe(false)
    })

    it("字符串类型的 size 应正确处理", () => {
      const wrapper = mount(UiLoading, {
        props: { size: "48rpx" },
      })

      expect(wrapper.props("size")).toBe("48rpx")
    })
  })
})
