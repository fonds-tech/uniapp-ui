/**
 * ui-picker-panel 组件单元测试
 * 测试选择器面板组件的 props、events 和渲染逻辑
 */

import UiPickerPanel from "@/ui/ui-picker-panel/ui-picker-panel.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建 stub 组件
const stubs = {
  "ui-loading": {
    name: "ui-loading",
    template: "<div class=\"ui-loading-stub\"><slot /></div>",
    props: ["show"],
  },
}

describe("ui-picker-panel 选择器面板组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  // 单列选项数据
  const singleColumns = [
    { text: "选项1", value: "1" },
    { text: "选项2", value: "2" },
    { text: "选项3", value: "3" },
  ]

  // 多列选项数据
  const multipleColumns = [
    [
      { text: "A1", value: "a1" },
      { text: "A2", value: "a2" },
    ],
    [
      { text: "B1", value: "b1" },
      { text: "B2", value: "b2" },
    ],
  ]

  // 级联选项数据
  const cascadeColumns = [
    {
      text: "浙江",
      value: "zj",
      children: [
        { text: "杭州", value: "hz", children: [{ text: "西湖区", value: "xh" }] },
        { text: "宁波", value: "nb", children: [{ text: "海曙区", value: "hs" }] },
      ],
    },
    {
      text: "江苏",
      value: "js",
      children: [
        { text: "南京", value: "nj", children: [{ text: "玄武区", value: "xw" }] },
        { text: "苏州", value: "sz", children: [{ text: "姑苏区", value: "gs" }] },
      ],
    },
  ]

  describe("基础渲染", () => {
    it("应正确渲染默认选择器面板组件", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-picker-panel").exists()).toBe(true)
    })

    it("有数据时应渲染选择器视图", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-picker-panel__view").exists()).toBe(true)
    })
  })

  describe("单列选择器", () => {
    it("应正确渲染单列选项", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(wrapper.props("columns")).toEqual(singleColumns)
    })

    it("应支持设置默认值", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["2"] },
        global: { stubs },
      })

      expect(wrapper.props("modelValue")).toEqual(["2"])
    })
  })

  describe("多列选择器", () => {
    it("应正确渲染多列选项", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: multipleColumns, modelValue: ["a1", "b1"] },
        global: { stubs },
      })

      expect(wrapper.props("columns")).toEqual(multipleColumns)
    })

    it("应支持多列默认值", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: multipleColumns, modelValue: ["a2", "b2"] },
        global: { stubs },
      })

      expect(wrapper.props("modelValue")).toEqual(["a2", "b2"])
    })
  })

  describe("级联选择器", () => {
    it("应正确渲染级联选项", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: cascadeColumns, modelValue: ["zj", "hz", "xh"] },
        global: { stubs },
      })

      expect(wrapper.props("columns")).toEqual(cascadeColumns)
    })
  })

  describe("列高度配置", () => {
    it("应支持自定义列高度", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, columnHeight: "88rpx" },
        global: { stubs },
      })

      expect(wrapper.props("columnHeight")).toBe("88rpx")
    })

    it("应支持可见列数", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, visibleColumnNum: 5 },
        global: { stubs },
      })

      expect(wrapper.props("visibleColumnNum")).toBe(5)
    })
  })

  describe("样式配置", () => {
    it("应支持列文字颜色", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, columnColor: "#666" },
        global: { stubs },
      })

      expect(wrapper.props("columnColor")).toBe("#666")
    })

    it("应支持列文字大小", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, columnSize: "28rpx" },
        global: { stubs },
      })

      expect(wrapper.props("columnSize")).toBe("28rpx")
    })

    it("应支持列文字粗细", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, columnWeight: 400 },
        global: { stubs },
      })

      expect(wrapper.props("columnWeight")).toBe(400)
    })

    it("应支持激活列文字颜色", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, activeColumnColor: "#1989fa" },
        global: { stubs },
      })

      expect(wrapper.props("activeColumnColor")).toBe("#1989fa")
    })

    it("应支持激活列文字大小", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, activeColumnSize: "32rpx" },
        global: { stubs },
      })

      expect(wrapper.props("activeColumnSize")).toBe("32rpx")
    })

    it("应支持激活列文字粗细", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, activeColumnWeight: 600 },
        global: { stubs },
      })

      expect(wrapper.props("activeColumnWeight")).toBe(600)
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, customClass: "my-picker-panel" },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-picker-panel")
    })
  })

  describe("字段映射", () => {
    it("应支持自定义字段映射", () => {
      const customColumns = [
        { label: "选项1", id: "1" },
        { label: "选项2", id: "2" },
      ]
      const wrapper = mount(UiPickerPanel, {
        props: {
          columns: customColumns,
          columnFields: { text: "label", value: "id" },
        },
        global: { stubs },
      })

      expect(wrapper.props("columnFields")).toEqual({ text: "label", value: "id" })
    })
  })

  describe("加载状态", () => {
    it("默认不加载", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns },
        global: { stubs },
      })

      expect(wrapper.props("loading")).toBe(false)
    })

    it("加载时应显示加载指示器", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, loading: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-picker-panel__loading").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 getSelectedValues 方法", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(typeof wrapper.vm.getSelectedValues).toBe("function")
    })

    it("应暴露 getSelectedIndexs 方法", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(typeof wrapper.vm.getSelectedIndexs).toBe("function")
    })

    it("应暴露 getSelectedColumns 方法", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(typeof wrapper.vm.getSelectedColumns).toBe("function")
    })

    it("应暴露 getColumns 方法", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(typeof wrapper.vm.getColumns).toBe("function")
    })

    it("应暴露 setColumnValue 方法", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns, modelValue: ["1"] },
        global: { stubs },
      })

      expect(typeof wrapper.vm.setColumnValue).toBe("function")
    })

    it("应暴露 name 属性", () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns },
        global: { stubs },
      })

      expect(wrapper.vm.name).toBe("ui-picker-panel")
    })
  })

  describe("边界情况", () => {
    it("空选项数组应正常渲染", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: [] },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-picker-panel").exists()).toBe(true)
    })

    it("无默认值时应正常渲染", async () => {
      const wrapper = mount(UiPickerPanel, {
        props: { columns: singleColumns },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-picker-panel").exists()).toBe(true)
    })
  })
})
