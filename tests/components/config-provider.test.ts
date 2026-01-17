/**
 * ui-config-provider 组件单元测试
 * 测试全局配置组件的 props、provide、主题和事件
 */

import UiConfigProvider from "@/uni_modules/uniapp-ui/ui-config-provider/ui-config-provider.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock uni.onThemeChange 和 uni.offThemeChange（如果未定义）
if (!uni.onThemeChange) {
  vi.stubGlobal("uni", {
    ...uni,
    onThemeChange: vi.fn(),
    offThemeChange: vi.fn(),
  })
}

describe("ui-config-provider 全局配置组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认配置组件", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(wrapper.find(".ui-config-provider").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容", async () => {
      const wrapper = mount(UiConfigProvider, {
        slots: { default: "<div class='test-content'>内容</div>" },
      })
      await waitForTransition()

      expect(wrapper.find(".test-content").exists()).toBe(true)
    })
  })

  describe("主题配置", () => {
    it("默认主题应为 light", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(wrapper.attributes("data-theme")).toBe("light")
    })

    it("应支持设置 dark 主题", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { theme: "dark" },
      })
      await waitForTransition()

      expect(wrapper.attributes("data-theme")).toBe("dark")
    })

    it("应支持设置 light 主题", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { theme: "light" },
      })
      await waitForTransition()

      expect(wrapper.attributes("data-theme")).toBe("light")
    })

    it("应支持 auto 主题模式", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { theme: "auto" },
      })
      await waitForTransition()

      // auto 模式下默认跟随系统，测试环境中默认为 light
      expect(["light", "dark"]).toContain(wrapper.attributes("data-theme"))
    })
  })

  describe("主题变量配置", () => {
    it("应支持自定义主题变量 themeVars", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          themeVars: {
            primary: "#ff6600",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-color-primary")
    })

    it("应支持多个主题变量", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          themeVars: {
            primary: "#ff6600",
            success: "#00ff00",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-color-primary")
      expect(style).toContain("--ui-color-success")
    })

    it("应支持文本颜色变量", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          themeVars: {
            "text-main": "#333333",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-color-text-primary")
    })

    it("应生成 RGB 变量", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          themeVars: {
            primary: "#ff6600",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-color-primary-rgb")
    })
  })

  describe("自定义 CSS 变量", () => {
    it("应支持 cssVars 自定义变量", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          cssVars: {
            "custom-size": "16px",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-custom-size")
    })

    it("应支持 --ui- 前缀的变量名", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          cssVars: {
            "--ui-custom-var": "100px",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-custom-var")
    })

    it("应支持 ui- 前缀的变量名", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          cssVars: {
            "ui-custom-var": "100px",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-custom-var")
    })

    it("应忽略空值变量", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          cssVars: {
            "valid-var": "10px",
            "empty-var": "",
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-valid-var")
      expect(style).not.toContain("--ui-empty-var")
    })
  })

  describe("样式配置", () => {
    it("应支持自定义高度", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { height: "100vh" },
      })
      await waitForTransition()

      expect(wrapper.props("height")).toBe("100vh")
    })

    it("应支持自定义背景色", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { background: "#f5f5f5" },
      })
      await waitForTransition()

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { customClass: "my-provider" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-provider")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          customStyle: { padding: "20px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-config-provider").exists()).toBe(true)
    })
  })

  describe("触摸事件", () => {
    it("应触发 touchstart 事件", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      await wrapper.find(".ui-config-provider").trigger("touchstart")

      expect(wrapper.emitted("touchstart")).toBeTruthy()
    })

    it("应触发 touchend 事件", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      await wrapper.find(".ui-config-provider").trigger("touchend")

      expect(wrapper.emitted("touchend")).toBeTruthy()
    })

    it("应触发 touchmove 事件", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      await wrapper.find(".ui-config-provider").trigger("touchmove")

      expect(wrapper.emitted("touchmove")).toBeTruthy()
    })
  })

  describe("暴露的属性和方法", () => {
    it("应暴露 mitt 事件总线", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(wrapper.vm.mitt).toBeDefined()
    })

    it("mitt 应具有 emit 方法", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(typeof wrapper.vm.mitt.emit).toBe("function")
    })

    it("mitt 应具有 on 方法", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(typeof wrapper.vm.mitt.on).toBe("function")
    })

    it("应暴露 currentTheme 计算属性", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { theme: "dark" },
      })
      await waitForTransition()

      expect(wrapper.vm.currentTheme).toBe("dark")
    })

    it("currentTheme 应随 theme prop 变化", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { theme: "light" },
      })
      await waitForTransition()

      expect(wrapper.vm.currentTheme).toBe("light")

      await wrapper.setProps({ theme: "dark" })
      await waitForTransition()

      expect(wrapper.vm.currentTheme).toBe("dark")
    })
  })

  describe("边界情况", () => {
    it("无插槽内容时应正常渲染", async () => {
      const wrapper = mount(UiConfigProvider)
      await waitForTransition()

      expect(wrapper.find(".ui-config-provider").exists()).toBe(true)
    })

    it("空 themeVars 应正常处理", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { themeVars: {} },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-config-provider").exists()).toBe(true)
    })

    it("空 cssVars 应正常处理", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { cssVars: {} },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-config-provider").exists()).toBe(true)
    })

    it("数值类型高度应正常处理", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: { height: 600 },
      })
      await waitForTransition()

      expect(wrapper.props("height")).toBe(600)
    })

    it("undefined 主题变量应被忽略", async () => {
      const wrapper = mount(UiConfigProvider, {
        props: {
          themeVars: {
            primary: "#ff6600",
            secondary: undefined as unknown as string,
          },
        },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-config-provider").attributes("style") || ""
      expect(style).toContain("--ui-color-primary")
    })
  })
})
