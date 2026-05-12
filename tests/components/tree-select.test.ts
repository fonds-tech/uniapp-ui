import UiTreeSelect from "@/uni_modules/uniapp-ui/ui-tree-select/ui-tree-select.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

const items = [
  { text: "浙江", children: [{ id: 1, text: "杭州" }, { id: 2, text: "温州", disabled: true }] },
  { text: "江苏", children: [{ id: 3, text: "南京" }] },
  { text: "广东", disabled: true, children: [{ id: 4, text: "广州" }] },
]

const stubs = { "ui-icon": true }

describe("ui-tree-select 分类选择", () => {
  describe("基础渲染", () => {
    it("应渲染分类与子项", () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0 },
        global: { stubs },
      })
      expect(wrapper.findAll(".ui-tree-select__nav-item").length).toBe(3)
      expect(wrapper.findAll(".ui-tree-select__item").length).toBe(2)
    })

    it("默认主索引 0 时应高亮第一项", () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0 },
        global: { stubs },
      })
      const navItems = wrapper.findAll(".ui-tree-select__nav-item")
      expect(navItems[0].classes()).toContain("ui-tree-select__nav-item--active")
    })
  })

  describe("分类切换", () => {
    it("点击分类应触发 update:mainActiveIndex + clickNav", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0 },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__nav-item")[1].trigger("click")
      expect(wrapper.emitted("update:mainActiveIndex")?.[0]).toEqual([1])
      expect(wrapper.emitted("clickNav")?.[0]).toEqual([1])
    })

    it("禁用分类点击不触发事件", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0 },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__nav-item")[2].trigger("click")
      expect(wrapper.emitted("clickNav")).toBeFalsy()
    })
  })

  describe("单选模式", () => {
    it("传单值 activeId 时进入单选模式", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0, activeId: 1 },
        global: { stubs },
      })
      const childItems = wrapper.findAll(".ui-tree-select__item")
      expect(childItems[0].classes()).toContain("ui-tree-select__item--active")

      await childItems[0].trigger("click")
      // 第二次点击单选，emit child.id（仍是 1）
      expect(wrapper.emitted("update:activeId")?.[0]).toEqual([1])
      expect(wrapper.emitted("clickItem")).toBeTruthy()
    })

    it("禁用子项点击不触发", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0, activeId: 1 },
        global: { stubs },
      })
      const childItems = wrapper.findAll(".ui-tree-select__item")
      await childItems[1].trigger("click")
      expect(wrapper.emitted("clickItem")).toBeFalsy()
    })
  })

  describe("多选模式", () => {
    it("传数组 activeId 时进入多选模式", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0, activeId: [] as number[] },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__item")[0].trigger("click")
      expect(wrapper.emitted("update:activeId")?.[0]).toEqual([[1]])
    })

    it("已选中再次点击取消选择", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0, activeId: [1] },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__item")[0].trigger("click")
      expect(wrapper.emitted("update:activeId")?.[0]).toEqual([[]])
    })

    it("达到 max 上限再点触发 maxReached 且不变更", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items: [{ text: "A", children: [{ id: 1, text: "1" }, { id: 2, text: "2" }, { id: 3, text: "3" }] }], mainActiveIndex: 0, activeId: [1, 2], max: 2 },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__item")[2].trigger("click")
      expect(wrapper.emitted("maxReached")?.[0]).toEqual([2])
      expect(wrapper.emitted("update:activeId")).toBeFalsy()
    })

    it("max=0 表示无上限", async () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items: [{ text: "A", children: [{ id: 1, text: "1" }, { id: 2, text: "2" }, { id: 3, text: "3" }] }], mainActiveIndex: 0, activeId: [1, 2], max: 0 },
        global: { stubs },
      })
      await wrapper.findAll(".ui-tree-select__item")[2].trigger("click")
      expect(wrapper.emitted("update:activeId")?.[0]).toEqual([[1, 2, 3]])
      expect(wrapper.emitted("maxReached")).toBeFalsy()
    })
  })

  describe("自定义样式 CSS var", () => {
    it("navWidth/activeColor 应注入 CSS var", () => {
      const wrapper = mount(UiTreeSelect, {
        props: { items, mainActiveIndex: 0, navWidth: "300rpx", activeColor: "danger" },
        global: { stubs },
      })
      const style = wrapper.attributes("style") || ""
      expect(style).toContain("--ui-tree-select-nav-width")
      expect(style).toContain("--ui-tree-select-active-color")
    })
  })
})
