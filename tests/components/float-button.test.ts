import UiFloatButton from "@/uni_modules/uniapp-ui/ui-float-button/ui-float-button.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const commonStubs = {
  "ui-icon": true,
  "ui-loading": true,
}

describe("uiFloatButton 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiFloatButton, {
        slots: { default: "<span class=\"custom-icon\">+</span>" },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })
  })

  describe("icon 属性测试", () => {
    it("默认 icon 应该是 plus", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("icon")).toBe("plus")
    })

    it("应该支持自定义图标", () => {
      const wrapper = mount(UiFloatButton, {
        props: { icon: "edit" },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("icon")).toBe("edit")
    })
  })

  describe("text 属性测试", () => {
    it("默认 text 应该是空字符串", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("text")).toBe("")
    })

    it("应该支持设置文本", () => {
      const wrapper = mount(UiFloatButton, {
        props: { text: "添加" },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("text")).toBe("添加")
    })

    it("有文本时应添加 with-text class", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { text: "添加" },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button--with-text").exists()).toBe(true)
    })
  })

  describe("type 属性测试", () => {
    it("默认 type 应该是 primary", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("type")).toBe("primary")
    })

    it.each(["success", "warning", "danger", "default"] as const)("应该支持 %s 类型", (type) => {
      const wrapper = mount(UiFloatButton, {
        props: { type },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("type")).toBe(type)
    })
  })

  describe("size 属性测试", () => {
    it("默认 size 应该是 100rpx", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("size")).toBe("100rpx")
    })

    it("应该支持自定义尺寸", () => {
      const wrapper = mount(UiFloatButton, {
        props: { size: "120rpx" },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("size")).toBe("120rpx")
    })
  })

  describe("position 属性测试", () => {
    it("默认 position 应该是 right-bottom", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("position")).toBe("right-bottom")
    })

    it.each(["left-bottom", "left-top", "right-top"] as const)("应该支持 %s 位置", (position) => {
      const wrapper = mount(UiFloatButton, {
        props: { position },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("position")).toBe(position)
    })
  })

  describe("偏移属性测试", () => {
    it("默认 offsetX 应该是 24rpx", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("offsetX")).toBe("24rpx")
    })

    it("默认 offsetY 应该是 100rpx", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("offsetY")).toBe("100rpx")
    })

    it("应该支持自定义偏移", () => {
      const wrapper = mount(UiFloatButton, {
        props: { offsetX: "40rpx", offsetY: "200rpx" },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("offsetX")).toBe("40rpx")
      expect(wrapper.props("offsetY")).toBe("200rpx")
    })
  })

  describe("zIndex 属性测试", () => {
    it("默认 zIndex 应该是 100", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("zIndex")).toBe(100)
    })

    it("应该支持自定义层级", () => {
      const wrapper = mount(UiFloatButton, {
        props: { zIndex: 999 },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("zIndex")).toBe(999)
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持自定义背景色", () => {
      const wrapper = mount(UiFloatButton, {
        props: { color: "#1989fa" },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("color")).toBe("#1989fa")
    })

    it("默认 foregroundColor 应该是 #fff", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("foregroundColor")).toBe("#fff")
    })

    it("默认 iconSize 应该是 40rpx", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("iconSize")).toBe("40rpx")
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用状态", () => {
      const wrapper = mount(UiFloatButton, {
        props: { disabled: true },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("disabled")).toBe(true)
    })

    it("禁用时应添加 disabled class", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { disabled: true },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button--disabled").exists()).toBe(true)
    })
  })

  describe("show 属性测试", () => {
    it("默认显示", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("show")).toBe(true)
    })

    it("应该支持隐藏", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { show: false },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button-wrapper--hidden").exists()).toBe(true)
    })
  })

  describe("draggable 属性测试", () => {
    it("默认不可拖拽", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("draggable")).toBe(false)
    })

    it("应该支持开启拖拽", () => {
      const wrapper = mount(UiFloatButton, {
        props: { draggable: true },
        global: { stubs: commonStubs },
      })
      expect(wrapper.props("draggable")).toBe(true)
    })

    it("默认 dragBoundary 应该是 true", () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      expect(wrapper.props("dragBoundary")).toBe(true)
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      await waitForTransition()
      await wrapper.find(".ui-float-button").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("禁用时点击不应触发 click 事件", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { disabled: true },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      await wrapper.find(".ui-float-button").trigger("click")
      expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("拖拽时应触发 dragStart/dragMove/dragEnd", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { draggable: true },
        global: { stubs: commonStubs },
      })
      await waitForTransition()

      const root = wrapper.find(".ui-float-button-wrapper")
      await root.trigger("touchstart", {
        touches: [{ clientX: 100, clientY: 100 }],
      })
      expect(wrapper.find(".ui-float-button-wrapper").classes()).toContain("ui-float-button-wrapper--dragging")

      await root.trigger("touchmove", {
        touches: [{ clientX: 120, clientY: 120 }],
      })
      await root.trigger("touchend")

      expect(wrapper.emitted("dragStart")).toBeTruthy()
      expect(wrapper.emitted("dragMove")).toBeTruthy()
      expect(wrapper.emitted("dragEnd")).toBeTruthy()
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { customClass: "my-float-button" },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button.my-float-button").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { customStyle: { padding: "20rpx" } },
        global: { stubs: commonStubs },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button").exists()).toBe(true)
      expect(wrapper.props("icon")).toBe("plus")
      expect(wrapper.props("type")).toBe("primary")
      expect(wrapper.props("position")).toBe("right-bottom")
    })

    it("show 变化应触发 update:show", async () => {
      const wrapper = mount(UiFloatButton, { global: { stubs: commonStubs } })
      await waitForTransition()

      await wrapper.setProps({ show: false })
      await waitForTransition()

      expect(wrapper.emitted("update:show")?.[0]).toEqual([false])
    })
  })
})
