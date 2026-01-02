import UiFloatButton from "@/ui/ui-float-button/ui-float-button.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiFloatButton 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiFloatButton, {
        slots: {
          default: "<span class=\"custom-icon\">+</span>",
        },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })
  })

  describe("icon 属性测试", () => {
    it("默认 icon 应该是 plus", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("icon")).toBe("plus")
    })

    it("应该支持自定义图标", () => {
      const wrapper = mount(UiFloatButton, {
        props: { icon: "edit" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("icon")).toBe("edit")
    })
  })

  describe("text 属性测试", () => {
    it("默认 text 应该是空字符串", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("text")).toBe("")
    })

    it("应该支持设置文本", () => {
      const wrapper = mount(UiFloatButton, {
        props: { text: "添加" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("text")).toBe("添加")
    })
  })

  describe("type 属性测试", () => {
    it("默认 type 应该是 primary", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("type")).toBe("primary")
    })

    it("应该支持 success 类型", () => {
      const wrapper = mount(UiFloatButton, {
        props: { type: "success" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("type")).toBe("success")
    })

    it("应该支持 warning 类型", () => {
      const wrapper = mount(UiFloatButton, {
        props: { type: "warning" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("type")).toBe("warning")
    })

    it("应该支持 danger 类型", () => {
      const wrapper = mount(UiFloatButton, {
        props: { type: "danger" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("type")).toBe("danger")
    })

    it("应该支持 default 类型", () => {
      const wrapper = mount(UiFloatButton, {
        props: { type: "default" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("type")).toBe("default")
    })
  })

  describe("size 属性测试", () => {
    it("默认 size 应该是 100rpx", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("size")).toBe("100rpx")
    })

    it("应该支持自定义尺寸", () => {
      const wrapper = mount(UiFloatButton, {
        props: { size: "120rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("size")).toBe("120rpx")
    })
  })

  describe("position 属性测试", () => {
    it("默认 position 应该是 right-bottom", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("position")).toBe("right-bottom")
    })

    it("应该支持 left-bottom 位置", () => {
      const wrapper = mount(UiFloatButton, {
        props: { position: "left-bottom" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("position")).toBe("left-bottom")
    })

    it("应该支持 left-top 位置", () => {
      const wrapper = mount(UiFloatButton, {
        props: { position: "left-top" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("position")).toBe("left-top")
    })

    it("应该支持 right-top 位置", () => {
      const wrapper = mount(UiFloatButton, {
        props: { position: "right-top" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("position")).toBe("right-top")
    })
  })

  describe("距离属性测试", () => {
    it("默认 right 应该是 24rpx", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("right")).toBe("24rpx")
    })

    it("默认 bottom 应该是 100rpx", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("bottom")).toBe("100rpx")
    })

    it("应该支持自定义距离", () => {
      const wrapper = mount(UiFloatButton, {
        props: { right: "40rpx", bottom: "200rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("right")).toBe("40rpx")
      expect(wrapper.props("bottom")).toBe("200rpx")
    })
  })

  describe("zIndex 属性测试", () => {
    it("默认 zIndex 应该是 100", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("zIndex")).toBe(100)
    })

    it("应该支持自定义层级", () => {
      const wrapper = mount(UiFloatButton, {
        props: { zIndex: 999 },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("zIndex")).toBe(999)
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持自定义背景色", () => {
      const wrapper = mount(UiFloatButton, {
        props: { color: "#1989fa" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("color")).toBe("#1989fa")
    })

    it("默认 iconColor 应该是 #fff", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("iconColor")).toBe("#fff")
    })

    it("默认 iconSize 应该是 40rpx", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("iconSize")).toBe("40rpx")
    })

    it("默认 textColor 应该是 #fff", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("textColor")).toBe("#fff")
    })
  })

  describe("shadow 属性测试", () => {
    it("默认应该有阴影", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("shadow")).toBe("0 4rpx 16rpx 0 rgba(0, 0, 0, 0.2)")
    })

    it("应该支持自定义阴影", () => {
      const wrapper = mount(UiFloatButton, {
        props: { shadow: "0 8rpx 32rpx 0 rgba(0, 0, 0, 0.3)" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("shadow")).toBe("0 8rpx 32rpx 0 rgba(0, 0, 0, 0.3)")
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用状态", () => {
      const wrapper = mount(UiFloatButton, {
        props: { disabled: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("loading 属性测试", () => {
    it("默认不加载", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(false)
    })

    it("应该支持加载状态", () => {
      const wrapper = mount(UiFloatButton, {
        props: { loading: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(true)
    })
  })

  describe("safeAreaBottom 属性测试", () => {
    it("默认应该适配底部安全区域", () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("safeAreaBottom")).toBe(true)
    })

    it("应该支持禁用底部安全区适配", () => {
      const wrapper = mount(UiFloatButton, {
        props: { safeAreaBottom: false },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("safeAreaBottom")).toBe(false)
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-float-button").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { customClass: "my-float-button" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button.my-float-button").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiFloatButton, {
        props: { customStyle: { padding: "20rpx" } },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiFloatButton, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-float-button").exists()).toBe(true)
      expect(wrapper.props("icon")).toBe("plus")
      expect(wrapper.props("type")).toBe("primary")
      expect(wrapper.props("position")).toBe("right-bottom")
    })
  })
})
