/**
 * ui-cell-group 组件单元测试
 * 测试单元格组组件的 props、slots 和渲染逻辑
 */

import UiCellGroup from "@/uni_modules/uniapp-ui/ui-cell-group/ui-cell-group.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-cell-group 单元格组组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认单元格组组件", () => {
      const wrapper = mount(UiCellGroup)

      expect(wrapper.find(".ui-cell-group").exists()).toBe(true)
    })

    it("应正确渲染包含内容的单元格组", () => {
      const wrapper = mount(UiCellGroup, {
        slots: {
          default: "<div class='test-content'>测试内容</div>",
        },
      })

      expect(wrapper.find(".test-content").exists()).toBe(true)
      expect(wrapper.text()).toContain("测试内容")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiCellGroup, {
        props: { radius: 16 },
      })

      const style = wrapper.find(".ui-cell-group").attributes("style") || ""
      expect(style).toContain("border-radius")
    })

    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiCellGroup, {
        props: { background: "#f5f5f5" },
      })

      const style = wrapper.find(".ui-cell-group").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持字符串类型的圆角", () => {
      const wrapper = mount(UiCellGroup, {
        props: { radius: "20rpx" },
      })

      expect(wrapper.props("radius")).toBe("20rpx")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiCellGroup, {
        props: { customClass: "my-cell-group" },
      })

      expect(wrapper.classes()).toContain("my-cell-group")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiCellGroup, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-cell-group").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiCellGroup, {
        slots: {
          default: "<span class='custom-content'>自定义内容</span>",
        },
      })

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("应支持多个子元素", () => {
      const wrapper = mount(UiCellGroup, {
        slots: {
          default: `
            <div class="cell-1">单元格1</div>
            <div class="cell-2">单元格2</div>
            <div class="cell-3">单元格3</div>
          `,
        },
      })

      expect(wrapper.find(".cell-1").exists()).toBe(true)
      expect(wrapper.find(".cell-2").exists()).toBe(true)
      expect(wrapper.find(".cell-3").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空内容应正常渲染", () => {
      const wrapper = mount(UiCellGroup)

      expect(wrapper.find(".ui-cell-group").exists()).toBe(true)
    })

    it("多个样式属性应正确组合", () => {
      const wrapper = mount(UiCellGroup, {
        props: {
          radius: 16,
          background: "#ffffff",
          customClass: "my-group",
        },
      })

      expect(wrapper.classes()).toContain("my-group")
      const style = wrapper.find(".ui-cell-group").attributes("style") || ""
      expect(style).toContain("border-radius")
      expect(style).toContain("background")
    })
  })
})
