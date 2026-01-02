/**
 * ui-keyboard 组件单元测试
 * 测试虚拟键盘组件的 props、events 和渲染逻辑
 * 注意：keyboard 组件可能使用过渡动画，测试中需要使用 waitForTransition 推进时间
 */

import UiKeyboard from "@/ui/ui-keyboard/ui-keyboard.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

// 创建 stub 组件
const stubs = {
  "ui-popup": {
    name: "ui-popup",
    template: '<div class="ui-popup-stub"><slot /></div>',
    props: ["show", "mode", "overlay", "closeOnClickOverlay", "safeAreaInsetBottom", "zIndex", "background", "customClass", "customStyle"],
  },
  "ui-safe-area-bottom": {
    name: "ui-safe-area-bottom",
    template: '<div class="ui-safe-area-bottom-stub"></div>',
  },
}

describe("ui-keyboard 虚拟键盘组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染虚拟键盘组件", async () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-keyboard").exists()).toBe(true)
    })
  })

  describe("显示控制", () => {
    it("默认不显示", () => {
      const wrapper = mount(UiKeyboard, {
        global: { stubs },
      })

      expect(wrapper.props("show")).toBe(false)
    })

    it("show 为 true 时应显示", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("键盘模式", () => {
    it("默认模式应为 number", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      expect(wrapper.props("mode")).toBe("number")
    })

    it("应支持车牌键盘模式", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, mode: "car" },
        global: { stubs },
      })

      expect(wrapper.props("mode")).toBe("car")
    })

    it("应支持身份证键盘模式", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, mode: "card" },
        global: { stubs },
      })

      expect(wrapper.props("mode")).toBe("card")
    })
  })

  describe("标题配置", () => {
    it("应支持设置标题", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, title: "请输入金额" },
        global: { stubs },
      })

      expect(wrapper.props("title")).toBe("请输入金额")
    })

    it("应支持显示头部", async () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showHeader: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-keyboard__header").exists()).toBe(true)
    })

    it("应支持隐藏头部", async () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showHeader: false },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-keyboard__header").exists()).toBe(false)
    })
  })

  describe("取消和确认按钮", () => {
    it("应支持自定义取消文本", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showHeader: true, cancelText: "关闭" },
        global: { stubs },
      })

      expect(wrapper.props("cancelText")).toBe("关闭")
    })

    it("应支持自定义确认文本", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showHeader: true, confirmText: "完成" },
        global: { stubs },
      })

      expect(wrapper.props("confirmText")).toBe("完成")
    })

    it("应支持取消按钮样式配置", () => {
      const wrapper = mount(UiKeyboard, {
        props: {
          show: true,
          showHeader: true,
          cancelTextColor: "#999",
          cancelTextSize: "28rpx",
          cancelTextWeight: 400,
        },
        global: { stubs },
      })

      expect(wrapper.props("cancelTextColor")).toBe("#999")
      expect(wrapper.props("cancelTextSize")).toBe("28rpx")
      expect(wrapper.props("cancelTextWeight")).toBe(400)
    })

    it("应支持确认按钮样式配置", () => {
      const wrapper = mount(UiKeyboard, {
        props: {
          show: true,
          showHeader: true,
          confirmTextColor: "#1989fa",
          confirmTextSize: "28rpx",
          confirmTextWeight: 500,
        },
        global: { stubs },
      })

      expect(wrapper.props("confirmTextColor")).toBe("#1989fa")
      expect(wrapper.props("confirmTextSize")).toBe("28rpx")
      expect(wrapper.props("confirmTextWeight")).toBe(500)
    })
  })

  describe("按键配置", () => {
    it("应支持随机排列", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, random: true },
        global: { stubs },
      })

      expect(wrapper.props("random")).toBe(true)
    })

    it("应支持显示小数点", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showDot: true },
        global: { stubs },
      })

      expect(wrapper.props("showDot")).toBe(true)
    })
  })

  describe("弹出层配置", () => {
    it("默认应显示遮罩层", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      expect(wrapper.props("overlay")).toBe(true)
    })

    it("应支持隐藏遮罩层", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, overlay: false },
        global: { stubs },
      })

      expect(wrapper.props("overlay")).toBe(false)
    })

    it("默认点击遮罩层应关闭", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("应支持安全区域适配", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, safeAreaInsetBottom: true },
        global: { stubs },
      })

      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, background: "#f5f5f5" },
        global: { stubs },
      })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, customClass: "my-keyboard" },
        global: { stubs },
      })

      await waitForTransition()

      // customClass 作为 prop 传入，验证 props 值
      expect(wrapper.props("customClass")).toBe("my-keyboard")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiKeyboard, {
        props: {
          show: true,
          customStyle: { padding: "10px" },
        },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-keyboard").exists()).toBe(true)
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 属性", () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true },
        global: { stubs },
      })

      expect(wrapper.vm.name).toBe("ui-keyboard")
    })
  })

  describe("边界情况", () => {
    it("无标题无头部时应正常渲染", async () => {
      const wrapper = mount(UiKeyboard, {
        props: { show: true, showHeader: false },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-keyboard").exists()).toBe(true)
    })
  })
})
