/**
 * ui-search 组件单元测试
 * 测试搜索框组件的 props、events 和渲染逻辑
 */

import UiSearch from "@/uni_modules/uniapp-ui/ui-search/ui-search.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiSearch 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search").exists()).toBe(true)
    })

    it("应该包含搜索图标", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__icon").exists()).toBe(true)
    })

    it("应该包含输入框", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__value").exists()).toBe(true)
    })

    it("应该默认显示搜索按钮", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__action").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该正确显示初始值", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试关键词" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.element.value).toBe("测试关键词")
    })

    it("输入时应该触发 update:modelValue 事件", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      await input.setValue("新关键词")
      await waitForTransition()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("输入时应该触发 change 事件", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      await input.setValue("新关键词")
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("placeholder 属性测试", () => {
    it("应该显示默认占位文字", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.attributes("placeholder")).toBe("请输入搜索关键词")
    })

    it("应该支持自定义占位文字", async () => {
      const wrapper = mount(UiSearch, {
        props: { placeholder: "搜索商品" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.attributes("placeholder")).toBe("搜索商品")
    })
  })

  describe("disabled 属性测试", () => {
    it("disabled 时输入框应该禁用", async () => {
      const wrapper = mount(UiSearch, {
        props: { disabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.attributes("disabled")).toBeDefined()
    })

    it("disabled 时应该添加禁用样式", async () => {
      const wrapper = mount(UiSearch, {
        props: { disabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__value--disabled").exists()).toBe(true)
    })
  })

  describe("clearabled 清除按钮测试", () => {
    it("有值时应该显示清除按钮", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试", clearabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__clear").exists()).toBe(true)
    })

    it("无值时不应该显示清除按钮", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "", clearabled: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__clear").exists()).toBe(false)
    })

    it("点击清除按钮应该清空输入", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search__clear").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("clear")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual([""])
    })

    it("clearabled 为 false 时不显示清除按钮", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试", clearabled: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__clear").exists()).toBe(false)
    })
  })

  describe("action 搜索按钮测试", () => {
    it("默认应该显示搜索按钮", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__action").exists()).toBe(true)
    })

    it("action 为 false 时不显示搜索按钮", async () => {
      const wrapper = mount(UiSearch, {
        props: { action: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__action").exists()).toBe(false)
    })

    it("应该显示默认搜索文字", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__action__button").text()).toBe("搜索")
    })

    it("应该支持自定义搜索文字", async () => {
      const wrapper = mount(UiSearch, {
        props: { actionText: "取消" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__action__button").text()).toBe("取消")
    })

    it("点击搜索按钮应该触发 action 事件", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search__action").trigger("click")
      expect(wrapper.emitted("action")).toBeTruthy()
    })
  })

  describe("focus 属性测试", () => {
    it("应该支持自动聚焦", async () => {
      const wrapper = mount(UiSearch, {
        props: { focus: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("focus")).toBe(true)
    })
  })

  describe("round 圆形样式测试", () => {
    it("round 为 true 时应该显示圆形样式", async () => {
      const wrapper = mount(UiSearch, {
        props: { round: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__content--round").exists()).toBe(true)
    })

    it("round 为 false 时不显示圆形样式", async () => {
      const wrapper = mount(UiSearch, {
        props: { round: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search__content--round").exists()).toBe(false)
    })
  })

  describe("maxlength 属性测试", () => {
    it("应该支持最大长度限制", async () => {
      const wrapper = mount(UiSearch, {
        props: { maxlength: 10 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.attributes("maxlength")).toBe("10")
    })
  })

  describe("inputAlign 对齐测试", () => {
    it("应该支持左对齐", async () => {
      const wrapper = mount(UiSearch, {
        props: { inputAlign: "left" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find(".ui-search__value")
      expect(input.attributes("style")).toContain("text-align: left")
    })

    it("应该支持居中对齐", async () => {
      const wrapper = mount(UiSearch, {
        props: { inputAlign: "center" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find(".ui-search__value")
      expect(input.attributes("style")).toContain("text-align: center")
    })

    it("应该支持右对齐", async () => {
      const wrapper = mount(UiSearch, {
        props: { inputAlign: "right" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find(".ui-search__value")
      expect(input.attributes("style")).toContain("text-align: right")
    })
  })

  describe("事件测试", () => {
    it("聚焦时应该触发 focus 事件", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search__value").trigger("focus")
      expect(wrapper.emitted("focus")).toBeTruthy()
    })

    it("失焦时应该触发 blur 事件", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search__value").trigger("blur")
      await waitForTransition()
      expect(wrapper.emitted("blur")).toBeTruthy()
    })

    it("确认时应该触发 search 事件", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search__value").trigger("confirm")
      expect(wrapper.emitted("search")).toBeTruthy()
      expect(wrapper.emitted("search")![0]).toEqual(["测试"])
    })

    it("点击组件应该触发 click 事件", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-search").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("插槽测试", () => {
    it("应该支持 icon 插槽", async () => {
      const wrapper = mount(UiSearch, {
        slots: {
          icon: "<span class=\"custom-icon\">icon</span>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应该支持 clear 插槽", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "测试" },
        slots: {
          clear: "<span class=\"custom-clear\">x</span>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-clear").exists()).toBe(true)
    })

    it("应该支持 action 插槽", async () => {
      const wrapper = mount(UiSearch, {
        slots: {
          action: "<button class=\"custom-action\">搜一搜</button>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-action").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSearch, {
        props: { customClass: "my-search" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search.my-search").exists()).toBe(true)
    })

    it("应该支持 height 属性", async () => {
      const wrapper = mount(UiSearch, {
        props: { height: "80rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("height")).toBe("80rpx")
    })

    it("应该支持 background 属性", async () => {
      const wrapper = mount(UiSearch, {
        props: { background: "#f5f5f5" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const content = wrapper.find(".ui-search__content")
      expect(content.attributes("style")).toContain("background")
    })

    it("应该支持 radius 属性", async () => {
      const wrapper = mount(UiSearch, {
        props: { radius: "20rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const content = wrapper.find(".ui-search__content")
      expect(content.attributes("style")).toContain("border-radius")
    })

    it("应该支持 actionColor 属性", async () => {
      const wrapper = mount(UiSearch, {
        props: { actionColor: "#1989fa" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const actionBtn = wrapper.find(".ui-search__action__button")
      expect(actionBtn.attributes("style")).toContain("color")
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-search")
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiSearch, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-search").exists()).toBe(true)
      expect(wrapper.find(".ui-search__action").exists()).toBe(true)
    })

    it("空字符串作为 modelValue 时应该正常处理", async () => {
      const wrapper = mount(UiSearch, {
        props: { modelValue: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-search__value")
      expect(input.element.value).toBe("")
    })
  })
})
