/**
 * ui-popup 组件单元测试
 * 测试弹出层组件的 props、events 和渲染逻辑
 * 注意：由于 popup 依赖动画和 uni API，部分测试用例专注于 props 检测
 */

import UiPopup from "@/ui/ui-popup/ui-popup.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach } from "vitest"

// Mock uni API
beforeEach(() => {
  vi.stubGlobal("uni", {
    getSystemInfo: vi.fn((options) => {
      if (options.success) {
        options.success({ windowBottom: 0 })
      }
    }),
    getWindowInfo: vi.fn(() => ({ windowBottom: 0 })),
  })
})

// 创建 stub 组件
const stubs = {
  "ui-overlay": {
    name: "ui-overlay",
    template: "<div class=\"ui-overlay-stub\" @click=\"$emit('click')\"><slot /></div>",
    props: ["show", "duration", "zIndex", "lazyRender", "customStyle"],
  },
  "ui-safe-area-top": {
    name: "ui-safe-area-top",
    template: "<div class=\"ui-safe-area-top-stub\"></div>",
  },
  "ui-safe-area-bottom": {
    name: "ui-safe-area-bottom",
    template: "<div class=\"ui-safe-area-bottom-stub\"></div>",
  },
  "ui-icon": {
    name: "ui-icon",
    template: "<span class=\"ui-icon-stub\"></span>",
    props: ["name", "size", "color", "hoverClass"],
  },
}

describe("ui-popup 弹出层组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认弹出层组件", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.exists()).toBe(true)
    })

    it("show 为 false 且 lazyRender 为 true 时不应渲染弹出层", () => {
      const wrapper = mount(UiPopup, {
        props: { show: false, lazyRender: true },
        global: { stubs },
      })

      expect(wrapper.find(".ui-popup").exists()).toBe(false)
    })

    it("lazyRender 为 false 时应立即渲染", () => {
      const wrapper = mount(UiPopup, {
        props: { show: false, lazyRender: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-popup").exists()).toBe(true)
    })
  })

  describe("弹出模式属性", () => {
    const modes = ["top", "bottom", "left", "right", "center"] as const

    modes.forEach((mode) => {
      it(`应接受 ${mode} 模式属性`, () => {
        const wrapper = mount(UiPopup, {
          props: { mode },
          global: { stubs },
        })

        expect(wrapper.props("mode")).toBe(mode)
      })
    })

    it("默认模式应为 bottom", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("mode")).toBe("bottom")
    })
  })

  describe("尺寸属性", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiPopup, {
        props: { width: 300 },
        global: { stubs },
      })

      expect(wrapper.props("width")).toBe(300)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiPopup, {
        props: { height: 400 },
        global: { stubs },
      })

      expect(wrapper.props("height")).toBe(400)
    })

    it("应支持最大宽度", () => {
      const wrapper = mount(UiPopup, {
        props: { maxWidth: 500 },
        global: { stubs },
      })

      expect(wrapper.props("maxWidth")).toBe(500)
    })

    it("应支持最大高度", () => {
      const wrapper = mount(UiPopup, {
        props: { maxHeight: 600 },
        global: { stubs },
      })

      expect(wrapper.props("maxHeight")).toBe(600)
    })

    it("应支持字符串类型的尺寸", () => {
      const wrapper = mount(UiPopup, {
        props: { width: "300rpx", height: "400rpx" },
        global: { stubs },
      })

      expect(wrapper.props("width")).toBe("300rpx")
      expect(wrapper.props("height")).toBe("400rpx")
    })
  })

  describe("遮罩层", () => {
    it("overlay 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("overlay")).toBe(true)
    })

    it("overlay 为 false 时不应显示遮罩层", () => {
      const wrapper = mount(UiPopup, {
        props: { overlay: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(false)
    })
  })

  describe("关闭按钮属性", () => {
    it("closeable 默认为 false", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeable")).toBe(false)
    })

    it("应支持自定义关闭图标", () => {
      const wrapper = mount(UiPopup, {
        props: { closeable: true, closeIcon: "close" },
        global: { stubs },
      })

      expect(wrapper.props("closeIcon")).toBe("close")
    })

    it("默认关闭图标为 cross", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeIcon")).toBe("cross")
    })

    const closePositions = ["top-left", "top-right", "bottom-left", "bottom-right"] as const

    closePositions.forEach((position) => {
      it(`应支持关闭按钮位置 ${position}`, () => {
        const wrapper = mount(UiPopup, {
          props: { closeable: true, closeIconPosition: position },
          global: { stubs },
        })

        expect(wrapper.props("closeIconPosition")).toBe(position)
      })
    })
  })

  describe("样式属性", () => {
    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiPopup, {
        props: { background: "#ffffff" },
        global: { stubs },
      })

      expect(wrapper.props("background")).toBe("#ffffff")
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiPopup, {
        props: { borderRadius: 20 },
        global: { stubs },
      })

      expect(wrapper.props("borderRadius")).toBe(20)
    })

    it("默认圆角为 16rpx", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("borderRadius")).toBe("16rpx")
    })

    it("应支持自定义 z-index", () => {
      const wrapper = mount(UiPopup, {
        props: { zIndex: 1000 },
        global: { stubs },
      })

      expect(wrapper.props("zIndex")).toBe(1000)
    })

    it("应支持自定义动画时长", () => {
      const wrapper = mount(UiPopup, {
        props: { duration: 500 },
        global: { stubs },
      })

      expect(wrapper.props("duration")).toBe(500)
    })

    it("默认动画时长为 300", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("duration")).toBe(300)
    })
  })

  describe("安全区域属性", () => {
    it("safeAreaInsetTop 默认为 false", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("safeAreaInsetTop")).toBe(false)
    })

    it("safeAreaInsetBottom 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })

    it("应支持启用顶部安全区域", () => {
      const wrapper = mount(UiPopup, {
        props: { safeAreaInsetTop: true },
        global: { stubs },
      })

      expect(wrapper.props("safeAreaInsetTop")).toBe(true)
    })
  })

  describe("事件处理", () => {
    it("打开弹出层应触发 open 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("应触发 update:show 事件", async () => {
      const wrapper = mount(UiPopup, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })
  })

  describe("点击遮罩关闭属性", () => {
    it("closeOnClickOverlay 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("应支持禁用点击遮罩关闭", () => {
      const wrapper = mount(UiPopup, {
        props: { closeOnClickOverlay: false },
        global: { stubs },
      })

      expect(wrapper.props("closeOnClickOverlay")).toBe(false)
    })
  })

  describe("懒加载属性", () => {
    it("lazyRender 默认为 true", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("应支持禁用懒加载", () => {
      const wrapper = mount(UiPopup, {
        props: { lazyRender: false },
        global: { stubs },
      })

      expect(wrapper.props("lazyRender")).toBe(false)
    })
  })

  describe("自定义样式属性", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiPopup, {
        props: { customClass: "my-popup" },
        global: { stubs },
      })

      expect(wrapper.props("customClass")).toBe("my-popup")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiPopup, {
        props: { customStyle: { marginTop: "10px" } },
        global: { stubs },
      })

      expect(wrapper.props("customStyle")).toEqual({ marginTop: "10px" })
    })

    it("应支持自定义遮罩层样式", () => {
      const wrapper = mount(UiPopup, {
        props: { overlayStyle: { backgroundColor: "rgba(0,0,0,0.5)" } },
        global: { stubs },
      })

      expect(wrapper.props("overlayStyle")).toEqual({ backgroundColor: "rgba(0,0,0,0.5)" })
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiPopup, { global: { stubs } })

      expect(typeof wrapper.vm.close).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确设置", () => {
      const wrapper = mount(UiPopup, {
        props: {
          mode: "center",
          closeable: true,
          overlay: true,
          borderRadius: 20,
          customClass: "my-popup",
        },
        global: { stubs },
      })

      expect(wrapper.props("mode")).toBe("center")
      expect(wrapper.props("closeable")).toBe(true)
      expect(wrapper.props("overlay")).toBe(true)
      expect(wrapper.props("borderRadius")).toBe(20)
      expect(wrapper.props("customClass")).toBe("my-popup")
    })
  })
})
