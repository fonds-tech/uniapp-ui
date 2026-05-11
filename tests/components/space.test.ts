/**
 * ui-space 组件单元测试
 */

import UiSpace from "@/uni_modules/uniapp-ui/ui-space/ui-space.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-space 间距组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认 space", () => {
      const wrapper = mount(UiSpace)
      expect(wrapper.find(".ui-space").exists()).toBe(true)
    })

    it("应渲染默认插槽内容", () => {
      const wrapper = mount(UiSpace, {
        slots: { default: "<view class='child'>子项</view>" },
      })
      expect(wrapper.find(".child").exists()).toBe(true)
    })
  })

  describe("direction", () => {
    it("默认水平方向", () => {
      const wrapper = mount(UiSpace)
      expect(wrapper.find(".ui-space--horizontal").exists()).toBe(true)
    })

    it("vertical 方向加对应类", () => {
      const wrapper = mount(UiSpace, { props: { direction: "vertical" } })
      expect(wrapper.find(".ui-space--vertical").exists()).toBe(true)
    })
  })

  describe("size 预设", () => {
    it.each(["xs", "sm", "md", "lg", "xl"])("接受预设档 %s", (size) => {
      const wrapper = mount(UiSpace, { props: { size } })
      expect(wrapper.props("size")).toBe(size)
      expect(wrapper.attributes("style")).toContain("gap")
    })

    it("接受字符串自定义间距", () => {
      const wrapper = mount(UiSpace, { props: { size: "48rpx" } })
      expect(wrapper.attributes("style")).toContain("48rpx")
    })

    it("接受数字自定义间距", () => {
      const wrapper = mount(UiSpace, { props: { size: 20 } })
      expect(wrapper.attributes("style")).toContain("gap")
    })
  })

  describe("布尔修饰符", () => {
    it("wrap 加 --wrap 类", () => {
      const wrapper = mount(UiSpace, { props: { wrap: true } })
      expect(wrapper.find(".ui-space--wrap").exists()).toBe(true)
    })

    it("fill 加 --fill 类", () => {
      const wrapper = mount(UiSpace, { props: { fill: true } })
      expect(wrapper.find(".ui-space--fill").exists()).toBe(true)
    })

    it("inline 加 --inline 类", () => {
      const wrapper = mount(UiSpace, { props: { inline: true } })
      expect(wrapper.find(".ui-space--inline").exists()).toBe(true)
    })
  })

  describe("align / justify", () => {
    it.each(["start", "end", "center", "baseline", "stretch"])("align=%s", (align) => {
      const wrapper = mount(UiSpace, { props: { align } })
      expect(wrapper.find(`.ui-space--align-${align}`).exists()).toBe(true)
    })

    it.each(["start", "end", "center", "space-between", "space-around", "space-evenly"])("justify=%s", (justify) => {
      const wrapper = mount(UiSpace, { props: { justify } })
      expect(wrapper.find(`.ui-space--justify-${justify}`).exists()).toBe(true)
    })

    it("未设 align/justify 时不加对应类", () => {
      const wrapper = mount(UiSpace)
      expect(wrapper.find("[class*='align-']").exists()).toBe(false)
      expect(wrapper.find("[class*='justify-']").exists()).toBe(false)
    })
  })

  describe("gap-row / gap-col", () => {
    it("gapRow 覆盖 size（wrap 时影响行间距）", () => {
      const wrapper = mount(UiSpace, { props: { wrap: true, gapRow: "40rpx", gapCol: "10rpx" } })
      const style = wrapper.attributes("style") || ""
      expect(style).toContain("40rpx")
      expect(style).toContain("10rpx")
    })

    it("vertical 方向只读 gapRow", () => {
      const wrapper = mount(UiSpace, { props: { direction: "vertical", gapRow: "40rpx" } })
      expect(wrapper.attributes("style")).toContain("40rpx")
    })
  })

  describe("自定义类名 / 样式", () => {
    it("customClass 合并到根节点", () => {
      const wrapper = mount(UiSpace, { props: { customClass: "my-space" } })
      expect(wrapper.classes()).toContain("my-space")
    })

    it("customStyle 合并到 inline style", () => {
      const wrapper = mount(UiSpace, { props: { customStyle: { marginTop: "10px" } } })
      expect(wrapper.attributes("style")).toContain("margin-top")
    })
  })
})
