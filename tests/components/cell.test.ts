/**
 * ui-cell 组件单元测试
 * 测试单元格组件的 props、events、slots 和渲染逻辑
 */

import UiCell from "@/uni_modules/uniapp-ui/ui-cell/ui-cell.vue"
import UiCellGroup from "@/uni_modules/uniapp-ui/ui-cell-group/ui-cell-group.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { it, expect, describe } from "vitest"

describe("ui-cell 单元格组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认单元格组件", () => {
      const wrapper = mount(UiCell)

      expect(wrapper.find(".ui-cell").exists()).toBe(true)
    })

    it("应正确渲染带标题的单元格", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-cell__title").exists()).toBe(true)
      expect(wrapper.text()).toContain("标题")
    })

    it("应正确渲染带内容的单元格", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
        slots: {
          default: "<span class='test-value'>内容</span>",
        },
      })

      expect(wrapper.find(".test-value").exists()).toBe(true)
      expect(wrapper.text()).toContain("内容")
    })

    it("应正确渲染带描述的单元格", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", label: "描述信息" },
      })

      expect(wrapper.find(".ui-cell__label").exists()).toBe(true)
      expect(wrapper.text()).toContain("描述信息")
    })
  })

  describe("图标", () => {
    it("应正确渲染带图标的单元格", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", icon: "star" },
      })

      expect(wrapper.find(".ui-cell__icon").exists()).toBe(true)
    })

    it("无图标时不应渲染图标区域", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-cell__icon").exists()).toBe(false)
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", icon: "star", iconSize: 24 },
      })

      expect(wrapper.props("iconSize")).toBe(24)
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", icon: "star", iconColor: "#ff0000" },
      })

      expect(wrapper.props("iconColor")).toBe("#ff0000")
    })
  })

  describe("右侧图标（链接模式）", () => {
    it("isLink 为 true 时应显示右侧图标", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", isLink: true },
      })

      expect(wrapper.find(".ui-cell__right-icon").exists()).toBe(true)
    })

    it("isLink 为 false 时不应显示右侧图标", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", isLink: false },
      })

      expect(wrapper.find(".ui-cell__right-icon").exists()).toBe(false)
    })

    it("应支持自定义右侧图标", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", isLink: true, rightIcon: "arrow-right" },
      })

      expect(wrapper.find(".ui-cell__right-icon").exists()).toBe(true)
    })

    it("应支持自定义右侧图标大小", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", isLink: true, rightIconSize: 20 },
      })

      expect(wrapper.props("rightIconSize")).toBe(20)
    })
  })

  describe("边框", () => {
    it("单独使用时默认不显示边框", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.classes()).not.toContain("ui-cell--border")
    })

    it("border 为 false 时不应显示边框", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", border: false },
      })

      expect(wrapper.classes()).not.toContain("ui-cell--border")
    })

    it("在 cell-group 中且非最后一项应显示边框", async () => {
      const wrapper = mount(UiCellGroup, {
        slots: {
          default: "<ui-cell title='标题一' /><ui-cell title='标题二' />",
        },
        global: {
          components: { UiCell },
        },
      })

      await nextTick()

      const cells = wrapper.findAllComponents(UiCell)

      expect(cells[0].classes()).toContain("ui-cell--border")
      expect(cells[1].classes()).not.toContain("ui-cell--border")
    })

    it("应支持自定义边框颜色", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", borderColor: "#e0e0e0" },
      })

      expect(wrapper.props("borderColor")).toBe("#e0e0e0")
    })
  })

  describe("可点击状态", () => {
    it("默认不应添加可点击类名", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.classes()).not.toContain("ui-cell--clickable")
    })

    it("clickable 为 false 时不应添加可点击类名", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", clickable: false },
      })

      expect(wrapper.classes()).not.toContain("ui-cell--clickable")
    })

    it("clickable 为 true 时应添加可点击类名", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", clickable: true },
      })

      expect(wrapper.classes()).toContain("ui-cell--clickable")
    })

    it("isLink 为 true 时应有悬停效果类", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", isLink: true },
      })

      expect(wrapper.attributes("hover-class")).toBe("ui-cell--active")
    })
  })

  describe("标题样式", () => {
    it("应支持自定义标题颜色", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", titleColor: "#333333" },
      })

      expect(wrapper.props("titleColor")).toBe("#333333")
    })

    it("应支持自定义标题大小", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", titleSize: 16 },
      })

      expect(wrapper.props("titleSize")).toBe(16)
    })

    it("应支持自定义标题粗细", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", titleWeight: 700 },
      })

      expect(wrapper.props("titleWeight")).toBe(700)
    })
  })

  describe("描述样式", () => {
    it("应支持自定义描述颜色", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", label: "描述", labelColor: "#999999" },
      })

      expect(wrapper.props("labelColor")).toBe("#999999")
    })

    it("应支持自定义描述大小", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", label: "描述", labelSize: 12 },
      })

      expect(wrapper.props("labelSize")).toBe(12)
    })
  })

  describe("布局样式", () => {
    it("应支持自定义高度", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", height: 60 },
      })

      expect(wrapper.props("height")).toBe(60)
    })

    it("应支持自定义内边距", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", padding: 20 },
      })

      expect(wrapper.props("padding")).toBe(20)
    })

    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", background: "#f5f5f5" },
      })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })
  })

  describe("事件处理", () => {
    it("点击单元格应触发 click 事件", async () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      await wrapper.find(".ui-cell").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题", customClass: "my-cell" },
      })

      expect(wrapper.classes()).toContain("my-cell")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiCell, {
        props: {
          title: "标题",
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-cell").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 title 插槽", () => {
      const wrapper = mount(UiCell, {
        slots: {
          title: "<span class='custom-title'>自定义标题</span>",
        },
      })

      expect(wrapper.find(".custom-title").exists()).toBe(true)
    })

    it("应支持 label 插槽", () => {
      const wrapper = mount(UiCell, {
        slots: {
          label: "<span class='custom-label'>自定义描述</span>",
        },
      })

      expect(wrapper.find(".custom-label").exists()).toBe(true)
    })

    it("应支持内容插槽（默认插槽）", () => {
      const wrapper = mount(UiCell, {
        slots: {
          default: "<span class='custom-value'>自定义内容</span>",
        },
      })

      expect(wrapper.find(".custom-value").exists()).toBe(true)
    })

    it("应支持 icon 插槽", () => {
      const wrapper = mount(UiCell, {
        slots: {
          icon: "<span class='custom-icon'>★</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应支持 right-icon 插槽", () => {
      const wrapper = mount(UiCell, {
        slots: {
          "right-icon": "<span class='custom-right-icon'>→</span>",
        },
      })

      expect(wrapper.find(".custom-right-icon").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无标题时不应渲染标题元素", () => {
      const wrapper = mount(UiCell)

      expect(wrapper.find(".ui-cell__title").exists()).toBe(false)
    })

    it("无描述时不应渲染描述元素", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-cell__label").exists()).toBe(false)
    })

    it("无内容时不应渲染内容元素", () => {
      const wrapper = mount(UiCell, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-cell__value").exists()).toBe(false)
    })

    it("同时显示标题、描述和内容", () => {
      const wrapper = mount(UiCell, {
        slots: {
          default: "<span class='test-value'>内容</span>",
        },
        props: { title: "标题", label: "描述" },
      })

      expect(wrapper.find(".ui-cell__title").exists()).toBe(true)
      expect(wrapper.find(".ui-cell__label").exists()).toBe(true)
      expect(wrapper.find(".test-value").exists()).toBe(true)
    })
  })
})
