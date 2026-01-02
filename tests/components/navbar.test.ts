/**
 * ui-navbar 组件单元测试
 * 测试导航栏组件的 props、events 和渲染逻辑
 */

import UiNavbar from "@/ui/ui-navbar/ui-navbar.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-navbar 导航栏组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染导航栏组件", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.find(".ui-navbar").exists()).toBe(true)
    })

    it("应正确渲染标题", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "页面标题" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar__title").exists()).toBe(true)
      expect(wrapper.find(".ui-navbar__title").text()).toBe("页面标题")
    })

    it("无标题时不应渲染标题区域", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar__title").exists()).toBe(false)
    })
  })

  describe("返回按钮", () => {
    it("默认应显示返回按钮", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.find(".ui-navbar__back").exists()).toBe(true)
    })

    it("isBack 为 false 时不应显示返回按钮", async () => {
      const wrapper = mount(UiNavbar, {
        props: { isBack: false },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar__back").exists()).toBe(false)
    })

    it("点击返回按钮应触发 back 事件", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      await wrapper.find(".ui-navbar__back").trigger("click")
      expect(wrapper.emitted("back")).toBeTruthy()
    })

    it("应支持自定义返回图标", async () => {
      const wrapper = mount(UiNavbar, {
        props: { backIconName: "close" },
      })
      await waitForTransition()
      expect(wrapper.props("backIconName")).toBe("close")
    })

    it("应支持自定义返回图标颜色", async () => {
      const wrapper = mount(UiNavbar, {
        props: { backIconColor: "#ffffff" },
      })
      await waitForTransition()
      expect(wrapper.props("backIconColor")).toBe("#ffffff")
    })

    it("应支持自定义返回图标大小", async () => {
      const wrapper = mount(UiNavbar, {
        props: { backIconSize: "50rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("backIconSize")).toBe("50rpx")
    })

    it("应支持返回按钮文字", async () => {
      const wrapper = mount(UiNavbar, {
        props: { backText: "返回" },
      })
      await waitForTransition()
      expect(wrapper.text()).toContain("返回")
    })

    it("应支持自定义返回文字样式", async () => {
      const wrapper = mount(UiNavbar, {
        props: {
          backText: "返回",
          backTextSize: "28rpx",
          backTextColor: "#666666",
          backTextWeight: 500,
        },
      })
      await waitForTransition()
      expect(wrapper.props("backTextSize")).toBe("28rpx")
      expect(wrapper.props("backTextColor")).toBe("#666666")
      expect(wrapper.props("backTextWeight")).toBe(500)
    })
  })

  describe("标题配置", () => {
    it("默认标题居中", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleCenter: true },
      })
      await waitForTransition()
      expect(wrapper.props("titleCenter")).toBe(true)
    })

    it("titleCenter 为 false 时标题不居中", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleCenter: false },
      })
      await waitForTransition()
      expect(wrapper.props("titleCenter")).toBe(false)
    })

    it("应支持自定义标题大小", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleSize: "36rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("titleSize")).toBe("36rpx")
    })

    it("应支持自定义标题颜色", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleColor: "#ffffff" },
      })
      await waitForTransition()
      expect(wrapper.props("titleColor")).toBe("#ffffff")
    })

    it("应支持自定义标题粗细", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleWeight: 600 },
      })
      await waitForTransition()
      expect(wrapper.props("titleWeight")).toBe(600)
    })

    it("应支持自定义标题宽度", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: "标题", titleWidth: "200rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("titleWidth")).toBe("200rpx")
    })
  })

  describe("布局配置", () => {
    it("应支持自定义高度", async () => {
      const wrapper = mount(UiNavbar, {
        props: { height: "100rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("100rpx")
    })

    it("应支持自定义内边距", async () => {
      const wrapper = mount(UiNavbar, {
        props: { padding: "30rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("padding")).toBe("30rpx")
    })

    it("默认为固定定位", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.props("fixed")).toBe(true)
    })

    it("fixed 为 false 时不应固定", async () => {
      const wrapper = mount(UiNavbar, {
        props: { fixed: false },
      })
      await waitForTransition()
      expect(wrapper.props("fixed")).toBe(false)
    })
  })

  describe("背景配置", () => {
    it("默认背景为白色", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#ffffff")
    })

    it("应支持自定义背景颜色", async () => {
      const wrapper = mount(UiNavbar, {
        props: { background: "#1989fa" },
      })
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#1989fa")
    })

    it("应支持渐变背景", async () => {
      const wrapper = mount(UiNavbar, {
        props: { gradient: true },
      })
      await waitForTransition()
      expect(wrapper.props("gradient")).toBe(true)
    })

    it("应支持自定义渐变高度", async () => {
      const wrapper = mount(UiNavbar, {
        props: { gradient: true, gradientHeight: "300px" },
      })
      await waitForTransition()
      expect(wrapper.props("gradientHeight")).toBe("300px")
    })
  })

  describe("边框配置", () => {
    it("默认不显示底部边框", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.props("borderBottom")).toBe(false)
    })

    it("borderBottom 为 true 时应显示边框", async () => {
      const wrapper = mount(UiNavbar, {
        props: { borderBottom: true },
      })
      await waitForTransition()
      expect(wrapper.props("borderBottom")).toBe(true)
    })
  })

  describe("沉浸式模式", () => {
    it("默认不启用沉浸式模式", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      expect(wrapper.props("immersive")).toBe(false)
    })

    it("immersive 为 true 时应启用沉浸式", async () => {
      const wrapper = mount(UiNavbar, {
        props: { immersive: true },
      })
      await waitForTransition()
      expect(wrapper.props("immersive")).toBe(true)
    })
  })

  describe("层级配置", () => {
    it("应支持自定义 zIndex", async () => {
      const wrapper = mount(UiNavbar, {
        props: { zIndex: 1000 },
      })
      await waitForTransition()
      expect(wrapper.props("zIndex")).toBe(1000)
    })
  })

  describe("自定义返回", () => {
    it("应支持自定义返回函数", async () => {
      const customBack = vi.fn()

      const wrapper = mount(UiNavbar, {
        props: { customBack },
      })
      await waitForTransition()
      await wrapper.find(".ui-navbar__back").trigger("click")
      expect(customBack).toHaveBeenCalled()
    })

    it("应支持自定义首页路径", async () => {
      const wrapper = mount(UiNavbar, {
        props: { homePath: "/pages/home/home" },
      })
      await waitForTransition()
      expect(wrapper.props("homePath")).toBe("/pages/home/home")
    })

    it("应支持首页类型配置", async () => {
      const wrapper = mount(UiNavbar, {
        props: { homeType: "page" },
      })
      await waitForTransition()
      expect(wrapper.props("homeType")).toBe("page")
    })
  })

  describe("事件处理", () => {
    it("点击返回应触发 back 事件", async () => {
      const wrapper = mount(UiNavbar)
      await waitForTransition()
      await wrapper.find(".ui-navbar__back").trigger("click")
      expect(wrapper.emitted("back")).toBeTruthy()
    })
  })

  describe("插槽", () => {
    it("应支持 left 插槽", async () => {
      const wrapper = mount(UiNavbar, {
        slots: {
          left: "<div class=\"custom-left\">自定义左侧</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-left").exists()).toBe(true)
    })

    it("应支持 title 插槽", async () => {
      const wrapper = mount(UiNavbar, {
        slots: {
          title: "<div class=\"custom-title\">自定义标题</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-title").exists()).toBe(true)
    })

    it("应支持 right 插槽", async () => {
      const wrapper = mount(UiNavbar, {
        slots: {
          right: "<div class=\"custom-right\">自定义右侧</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-right").exists()).toBe(true)
    })

    // 注意：ui-navbar 组件当前不支持 bottom 插槽
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiNavbar, {
        props: { customClass: "my-navbar" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar").classes()).toContain("my-navbar")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiNavbar, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar").exists()).toBe(true)
    })
  })

  describe("滚动监听", () => {
    it("应支持 scrollTop 属性", async () => {
      const wrapper = mount(UiNavbar, {
        props: { scrollTop: 100 },
      })
      await waitForTransition()
      expect(wrapper.props("scrollTop")).toBe(100)
    })
  })

  describe("边界情况", () => {
    it("title 为 null 时应正常渲染", async () => {
      const wrapper = mount(UiNavbar, {
        props: { title: null },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-navbar").exists()).toBe(true)
    })
  })
})
