/**
 * ui-skeleton 组件单元测试
 * 测试骨架屏组件的 props、slots 和渲染逻辑
 */

import UiSkeleton from "@/uni_modules/uniapp-ui/ui-skeleton/ui-skeleton.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-skeleton 骨架屏组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认骨架屏组件", () => {
      const wrapper = mount(UiSkeleton)

      expect(wrapper.find(".ui-skeleton").exists()).toBe(true)
    })

    it("应正确渲染包含内容的骨架屏", () => {
      const wrapper = mount(UiSkeleton, {
        slots: {
          default: "<div class='skeleton-content'>骨架内容</div>",
        },
      })

      expect(wrapper.find(".skeleton-content").exists()).toBe(true)
      expect(wrapper.text()).toContain("骨架内容")
    })
  })

  describe("动画属性", () => {
    it("animate 默认为 true", () => {
      const wrapper = mount(UiSkeleton)

      expect(wrapper.props("animate")).toBe(true)
    })

    it("应支持禁用动画", () => {
      const wrapper = mount(UiSkeleton, {
        props: { animate: false },
      })

      expect(wrapper.props("animate")).toBe(false)
    })
  })

  describe("背景颜色属性", () => {
    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiSkeleton, {
        props: { background: "#f5f5f5" },
      })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持透明背景", () => {
      const wrapper = mount(UiSkeleton, {
        props: { background: "transparent" },
      })

      expect(wrapper.props("background")).toBe("transparent")
    })
  })

  describe("自定义样式属性", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiSkeleton, {
        props: { customClass: "my-skeleton" },
      })

      expect(wrapper.classes()).toContain("my-skeleton")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiSkeleton, {
        props: { customStyle: { padding: "20px" } },
      })

      expect(wrapper.props("customStyle")).toEqual({ padding: "20px" })
    })

    it("应支持自定义样式字符串", () => {
      const wrapper = mount(UiSkeleton, {
        props: { customStyle: "padding: 20px" },
      })

      expect(wrapper.props("customStyle")).toBe("padding: 20px")
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiSkeleton, {
        slots: {
          default: "<div class='custom-content'>自定义内容</div>",
        },
      })

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("应支持多个子元素", () => {
      const wrapper = mount(UiSkeleton, {
        slots: {
          default: `
            <div class="skeleton-item-1">项目1</div>
            <div class="skeleton-item-2">项目2</div>
            <div class="skeleton-item-3">项目3</div>
          `,
        },
      })

      expect(wrapper.find(".skeleton-item-1").exists()).toBe(true)
      expect(wrapper.find(".skeleton-item-2").exists()).toBe(true)
      expect(wrapper.find(".skeleton-item-3").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空内容应正常渲染", () => {
      const wrapper = mount(UiSkeleton)

      expect(wrapper.find(".ui-skeleton").exists()).toBe(true)
    })

    it("多个属性应正确设置", () => {
      const wrapper = mount(UiSkeleton, {
        props: {
          animate: true,
          background: "#ffffff",
          customClass: "my-skeleton",
        },
      })

      expect(wrapper.props("animate")).toBe(true)
      expect(wrapper.props("background")).toBe("#ffffff")
      expect(wrapper.classes()).toContain("my-skeleton")
    })
  })
})
