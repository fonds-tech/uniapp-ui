/**
 * ui-qrcode 组件单元测试
 * 测试二维码/条形码生成组件的 props、methods 和渲染逻辑
 */

import UiQrcode from "@/uni_modules/uniapp-ui/ui-qrcode/ui-qrcode.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-qrcode 二维码组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认二维码组件", async () => {
      const wrapper = mount(UiQrcode)

      await waitForTransition()

      expect(wrapper.find(".ui-qrcode").exists()).toBe(true)
    })

    it("应渲染 canvas 元素", async () => {
      const wrapper = mount(UiQrcode)

      await waitForTransition()

      expect(wrapper.find(".ui-qrcode-canvas").exists()).toBe(true)
    })
  })

  describe("显示控制", () => {
    it("默认显示", () => {
      const wrapper = mount(UiQrcode)

      expect(wrapper.props("show")).toBe(true)
    })

    it("应支持隐藏", () => {
      const wrapper = mount(UiQrcode, {
        props: { show: false },
      })

      expect(wrapper.props("show")).toBe(false)
    })
  })

  describe("内容配置", () => {
    it("应支持设置二维码内容", () => {
      const wrapper = mount(UiQrcode, {
        props: { value: "https://example.com" },
      })

      expect(wrapper.props("value")).toBe("https://example.com")
    })

    it("应支持空内容", () => {
      const wrapper = mount(UiQrcode, {
        props: { value: "" },
      })

      expect(wrapper.props("value")).toBe("")
    })
  })

  describe("类型配置", () => {
    it("默认类型应为二维码", () => {
      const wrapper = mount(UiQrcode)

      expect(wrapper.props("type")).toBe("qrcode")
    })

    it("应支持条形码类型", () => {
      const wrapper = mount(UiQrcode, {
        props: { type: "barcode" },
      })

      expect(wrapper.props("type")).toBe("barcode")
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义尺寸", () => {
      const wrapper = mount(UiQrcode, {
        props: { size: "300rpx" },
      })

      expect(wrapper.props("size")).toBe("300rpx")
    })

    it("应支持条形码宽度", () => {
      const wrapper = mount(UiQrcode, {
        props: { type: "barcode", barcodeWidth: "400rpx" },
      })

      expect(wrapper.props("barcodeWidth")).toBe("400rpx")
    })

    it("应支持条形码高度", () => {
      const wrapper = mount(UiQrcode, {
        props: { type: "barcode", barcodeHeight: "150rpx" },
      })

      expect(wrapper.props("barcodeHeight")).toBe("150rpx")
    })
  })

  describe("样式配置", () => {
    it("应支持前景色", () => {
      const wrapper = mount(UiQrcode, {
        props: { foreground: "#1989fa" },
      })

      expect(wrapper.props("foreground")).toBe("#1989fa")
    })

    it("应支持背景色", () => {
      const wrapper = mount(UiQrcode, {
        props: { background: "#ffffff" },
      })

      expect(wrapper.props("background")).toBe("#ffffff")
    })

    it("应支持定位角点颜色", () => {
      const wrapper = mount(UiQrcode, {
        props: { pdground: "#ff0000" },
      })

      expect(wrapper.props("pdground")).toBe("#ff0000")
    })

    it("应支持容错级别", () => {
      const wrapper = mount(UiQrcode, {
        props: { lv: 2 },
      })

      expect(wrapper.props("lv")).toBe(2)
    })
  })

  describe("自动生成配置", () => {
    it("默认自动生成", () => {
      const wrapper = mount(UiQrcode)

      expect(wrapper.props("auto")).toBe(true)
    })

    it("应支持禁用自动生成", () => {
      const wrapper = mount(UiQrcode, {
        props: { auto: false },
      })

      expect(wrapper.props("auto")).toBe(false)
    })
  })

  describe("加载文本配置", () => {
    it("应支持自定义加载文本", () => {
      const wrapper = mount(UiQrcode, {
        props: { loadingText: "正在生成..." },
      })

      expect(wrapper.props("loadingText")).toBe("正在生成...")
    })

    it("默认加载文本", () => {
      const wrapper = mount(UiQrcode)

      expect(wrapper.props("loadingText")).toBe("生成中...")
    })
  })

  describe("图标配置", () => {
    it("应支持二维码图标", () => {
      const wrapper = mount(UiQrcode, {
        props: { icon: "/static/logo.png" },
      })

      expect(wrapper.props("icon")).toBe("/static/logo.png")
    })

    it("应支持图标尺寸", () => {
      const wrapper = mount(UiQrcode, {
        props: { icon: "/static/logo.png", iconSize: "50rpx" },
      })

      expect(wrapper.props("iconSize")).toBe("50rpx")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiQrcode, {
        props: { customClass: "my-qrcode" },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-qrcode")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiQrcode, {
        props: {
          customStyle: { margin: "10px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-qrcode").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 makeCode 方法", () => {
      const wrapper = mount(UiQrcode)

      expect(typeof wrapper.vm.makeCode).toBe("function")
    })

    it("应暴露 saveCode 方法", () => {
      const wrapper = mount(UiQrcode)

      expect(typeof wrapper.vm.saveCode).toBe("function")
    })

    it("应暴露 name 属性", () => {
      const wrapper = mount(UiQrcode)

      expect(wrapper.vm.name).toBe("ui-qrcode")
    })
  })

  describe("方法与事件", () => {
    it("auto 为 false 时不应自动生成", async () => {
      const wrapper = mount(UiQrcode, {
        props: { auto: false, value: "123" },
      })

      await waitForTransition()

      expect(wrapper.emitted("success")).toBeFalsy()
      expect(wrapper.emitted("error")).toBeFalsy()
    })

    it("点击组件应触发 click 事件", async () => {
      const wrapper = mount(UiQrcode)

      await waitForTransition()
      await wrapper.trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("makeCode 应生成条形码并触发 success 事件", async () => {
      const wrapper = mount(UiQrcode, {
        props: {
          auto: false,
          type: "barcode",
          value: "1234567890",
          barcodeWidth: "300rpx",
          barcodeHeight: "100rpx",
        },
      })

      wrapper.vm.makeCode()
      await vi.advanceTimersByTimeAsync(220)

      expect(wrapper.emitted("success")).toBeTruthy()
      expect(wrapper.emitted("error")).toBeFalsy()
    })

    it("saveCode 在生成成功后应保存图片", async () => {
      const wrapper = mount(UiQrcode, {
        props: {
          auto: false,
          type: "barcode",
          value: "1234567890",
          barcodeWidth: "300rpx",
          barcodeHeight: "100rpx",
        },
      })

      const saveSpy = vi.spyOn(uni, "saveImageToPhotosAlbum")
      const toastSpy = vi.spyOn(uni, "showToast")

      wrapper.vm.makeCode()
      await vi.advanceTimersByTimeAsync(220)

      wrapper.vm.saveCode()

      expect(saveSpy).toHaveBeenCalled()
      expect(toastSpy).toHaveBeenCalled()
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiQrcode)

      await waitForTransition()

      expect(wrapper.find(".ui-qrcode").exists()).toBe(true)
    })

    it("长内容应正常渲染", () => {
      const longValue = "https://example.com/very/long/path?with=many&query=params&and=more"
      const wrapper = mount(UiQrcode, {
        props: { value: longValue },
      })

      expect(wrapper.props("value")).toBe(longValue)
    })
  })
})
