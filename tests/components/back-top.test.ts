import UiBackTop from "@/ui/ui-back-top/ui-back-top.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiBackTop 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiBackTop, {
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-back-top").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiBackTop, {
        slots: {
          default: "<span class=\"custom-icon\">↑</span>",
        },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })
  })

  describe("offset 属性测试", () => {
    it("默认 offset 应该是 200rpx", () => {
      const wrapper = mount(UiBackTop, {
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("offset")).toBe("200rpx")
    })

    it("应该支持自定义显示阈值", () => {
      const wrapper = mount(UiBackTop, {
        props: { offset: "400rpx" },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("offset")).toBe("400rpx")
    })

    it("应该支持数字类型的显示阈值", () => {
      const wrapper = mount(UiBackTop, {
        props: { offset: 400 },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("offset")).toBe(400)
    })
  })

  describe("right 属性测试", () => {
    it("应该支持自定义距右侧距离", () => {
      const wrapper = mount(UiBackTop, {
        props: { right: 40 },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("right")).toBe(40)
    })
  })

  describe("bottom 属性测试", () => {
    it("应该支持自定义距底部距离", () => {
      const wrapper = mount(UiBackTop, {
        props: { bottom: 100 },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("bottom")).toBe(100)
    })
  })

  describe("zIndex 属性测试", () => {
    it("应该支持自定义层级", () => {
      const wrapper = mount(UiBackTop, {
        props: { zIndex: 999 },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("zIndex")).toBe(999)
    })
  })

  describe("duration 属性测试", () => {
    it("默认 duration 应该是 200ms", () => {
      const wrapper = mount(UiBackTop, {
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe("200")
    })

    it("应该支持自定义过渡时间", () => {
      const wrapper = mount(UiBackTop, {
        props: { duration: 500 },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("background 属性测试", () => {
    it("应该支持自定义背景色", () => {
      const wrapper = mount(UiBackTop, {
        props: { background: "#1989fa" },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("background")).toBe("#1989fa")
    })
  })

  describe("borderRadius 属性测试", () => {
    it("应该支持自定义圆角", () => {
      const wrapper = mount(UiBackTop, {
        props: { borderRadius: "50%" },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      expect(wrapper.props("borderRadius")).toBe("50%")
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mount(UiBackTop, {
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-back-top").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiBackTop, {
        props: { customClass: "my-back-top" },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-back-top.my-back-top").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiBackTop, {
        props: { customStyle: { padding: "20rpx" } },
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiBackTop, {
        global: {
          stubs: {
            "ui-icon": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-back-top").exists()).toBe(true)
      expect(wrapper.props("offset")).toBe("200rpx")
      expect(wrapper.props("duration")).toBe("200")
    })
  })
})
