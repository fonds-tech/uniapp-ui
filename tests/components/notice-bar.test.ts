/**
 * ui-notice-bar 组件单元测试
 * 测试通知栏组件的 props、events 和渲染逻辑
 */

import UiNoticeBar from "@/uni_modules/uniapp-ui/ui-notice-bar/ui-notice-bar.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiNoticeBar 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知内容" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar").exists()).toBe(true)
    })

    it("应该默认显示左侧图标", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知内容" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__left").exists()).toBe(true)
    })

    it("默认应该是水平滚动模式", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知内容" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__horizontal").exists()).toBe(true)
    })
  })

  describe("text 属性测试", () => {
    it("应该支持字符串类型的 text", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "这是一条通知" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.text()).toContain("这是一条通知")
    })

    it("应该支持数组类型的 text（垂直模式）", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: {
          text: ["通知1", "通知2", "通知3"],
          mode: "vertical",
        },
        global: {
          stubs: { "ui-icon": true, swiper: true, "swiper-item": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__vertical").exists()).toBe(true)
    })

    it("垂直模式应正确渲染文本内容", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: {
          text: ["通知1", "通知2"],
          mode: "vertical",
        },
        global: {
          stubs: {
            "ui-icon": true,
            swiper: { template: "<div><slot /></div>" },
            "swiper-item": { template: "<div><slot /></div>" },
          },
        },
      })
      await waitForTransition()
      const texts = wrapper.findAll(".ui-notice-bar__vertical__text")
      expect(texts).toHaveLength(2)
      expect(texts[0].text()).toBe("通知1")
      expect(texts[1].text()).toBe("通知2")
    })

    it("水平模式下数组只显示第一条", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: {
          text: ["通知1", "通知2"],
          mode: "horizontal",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__horizontal__text").text()).toContain("通知1")
    })
  })

  describe("mode 属性测试", () => {
    it("应该支持 horizontal 水平模式", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", mode: "horizontal" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__horizontal").exists()).toBe(true)
      expect(wrapper.find(".ui-notice-bar__vertical").exists()).toBe(false)
    })

    it("应该支持 vertical 垂直模式", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: ["通知1", "通知2"], mode: "vertical" },
        global: {
          stubs: { "ui-icon": true, swiper: true, "swiper-item": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__vertical").exists()).toBe(true)
      expect(wrapper.find(".ui-notice-bar__horizontal").exists()).toBe(false)
    })
  })

  describe("scrollable 属性测试", () => {
    it("默认应该开启滚动", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", scrollable: true },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__horizontal__text--scrollable").exists()).toBe(true)
    })

    it("scrollable 为 false 时不开启滚动", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", scrollable: false },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__horizontal__text--scrollable").exists()).toBe(false)
    })
  })

  describe("图标属性测试", () => {
    it("应该支持自定义左侧图标", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", icon: "info" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__left").exists()).toBe(true)
    })

    it("icon 为空时不显示左侧图标区域（无左侧插槽）", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", icon: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      // 没有 icon 且没有左侧插槽时不显示
      expect(wrapper.find(".ui-notice-bar__left").exists()).toBe(false)
    })

    it("应该支持右侧图标", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", rightIcon: "arrow" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__right").exists()).toBe(true)
    })

    it("rightIcon 为空时不显示右侧图标区域（无右侧插槽）", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", rightIcon: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar__right").exists()).toBe(false)
    })
  })

  describe("speed 和 interval 属性测试", () => {
    it("应该支持自定义滚动速度", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", speed: 100 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("speed")).toBe(100)
    })

    it("应该支持自定义切换间隔（垂直模式）", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: ["通知1", "通知2"], mode: "vertical", interval: 5000 },
        global: {
          stubs: { "ui-icon": true, swiper: true, "swiper-item": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("interval")).toBe(5000)
    })

    it("应该支持自定义动画时长（垂直模式）", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: ["通知1", "通知2"], mode: "vertical", duration: 800 },
        global: {
          stubs: { "ui-icon": true, swiper: true, "swiper-item": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("duration")).toBe(800)
    })
  })

  describe("事件测试", () => {
    it("点击通知内容应该触发 click 事件", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-notice-bar__horizontal__text").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")![0]).toEqual([0])
    })

    it("垂直模式点击应触发 click 事件", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: ["通知1", "通知2"], mode: "vertical" },
        global: {
          stubs: {
            "ui-icon": true,
            swiper: { template: "<div><slot /></div>" },
            "swiper-item": { template: "<div class=\"swiper-item-stub\" @click=\"$emit('click')\"><slot /></div>" },
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".swiper-item-stub").trigger("click")
      expect(wrapper.emitted("click")?.[0]).toEqual([0])
    })
  })

  describe("插槽测试", () => {
    it("应该支持 left 插槽", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", icon: "" },
        slots: {
          left: "<span class=\"custom-left\">📢</span>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-left").exists()).toBe(true)
    })

    it("应该支持 right 插槽", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", rightIcon: "" },
        slots: {
          right: "<span class=\"custom-right\">→</span>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-right").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", customClass: "my-notice" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar.my-notice").exists()).toBe(true)
    })

    it("应该支持 background 属性", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", background: "#fff9e6" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#fff9e6")
    })

    it("应该支持 color 属性", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", color: "#ff6600" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("color")).toBe("#ff6600")
    })

    it("应该支持 fontSize 属性", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", fontSize: "28rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("fontSize")).toBe("28rpx")
    })

    it("应该支持 minHeight 属性", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知", minHeight: "100rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("minHeight")).toBe("100rpx")
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "通知" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-notice-bar")
    })
  })

  describe("边界情况测试", () => {
    it("text 为空字符串时应该正常处理", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: "" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar").exists()).toBe(true)
    })

    it("text 为空数组时应该正常处理", async () => {
      const wrapper = mount(UiNoticeBar, {
        props: { text: [], mode: "vertical" },
        global: {
          stubs: { "ui-icon": true, swiper: true, "swiper-item": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-notice-bar").exists()).toBe(true)
    })
  })
})
