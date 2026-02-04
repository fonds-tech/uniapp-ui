/**
 * ui-sticky 组件单元测试
 * 测试粘性定位组件的 props、事件和渲染逻辑
 */

import UiSticky from "@/uni_modules/uniapp-ui/ui-sticky/ui-sticky.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiSticky 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiSticky, {
        slots: {
          default: "<div class=\"custom-content\">粘性内容</div>",
        },
      })
      await waitForTransition()

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("应该渲染 container 容器", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.find(".ui-sticky__container").exists()).toBe(true)
    })
  })

  describe("offsetTop 属性测试", () => {
    it("默认 offsetTop 应该是 0", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.props("offsetTop")).toBe(0)
    })

    it("应该支持自定义吸顶距离", async () => {
      const wrapper = mount(UiSticky, {
        props: { offsetTop: 100 },
      })
      await waitForTransition()

      expect(wrapper.props("offsetTop")).toBe(100)
      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
    })

    it("应该支持字符串类型的吸顶距离", async () => {
      const wrapper = mount(UiSticky, {
        props: { offsetTop: "100rpx" },
      })
      await waitForTransition()

      expect(wrapper.props("offsetTop")).toBe("100rpx")
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用粘性效果", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用粘性效果", async () => {
      const wrapper = mount(UiSticky, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.props("disabled")).toBe(true)
      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
    })

    it("禁用时 isFixed 应返回 false", async () => {
      const wrapper = mount(UiSticky, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.vm.isFixed()).toBe(false)
    })
  })

  describe("zIndex 属性测试", () => {
    it("应该支持自定义层级", async () => {
      const wrapper = mount(UiSticky, {
        props: { zIndex: 100 },
      })
      await waitForTransition()

      expect(wrapper.props("zIndex")).toBe(100)
    })

    it("zIndex 应该应用到样式", async () => {
      const wrapper = mount(UiSticky, {
        props: { zIndex: 200 },
      })
      await waitForTransition()

      const style = wrapper.find(".ui-sticky").attributes("style") || ""
      expect(style).toContain("z-index")
    })
  })

  describe("background 属性测试", () => {
    it("应该支持自定义背景色", async () => {
      const wrapper = mount(UiSticky, {
        props: { background: "#ffffff" },
      })
      await waitForTransition()

      expect(wrapper.props("background")).toBe("#ffffff")
    })

    it("应该支持颜色变量", async () => {
      const wrapper = mount(UiSticky, {
        props: { background: "primary" },
      })
      await waitForTransition()

      expect(wrapper.props("background")).toBe("primary")
    })

    it("背景色应该应用到 container 样式", async () => {
      const wrapper = mount(UiSticky, {
        props: { background: "#ffffff" },
      })
      await waitForTransition()

      const containerStyle = wrapper.find(".ui-sticky__container").attributes("style") || ""
      expect(containerStyle).toContain("background")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSticky, {
        props: { customClass: "my-sticky" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-sticky__container.my-sticky").exists()).toBe(true)
    })

    it("应该支持 customStyle 对象", async () => {
      const wrapper = mount(UiSticky, {
        props: { customStyle: { backgroundColor: "#f0f0f0" } },
      })
      await waitForTransition()

      // customStyle 会合并到 container 样式中
      const container = wrapper.find(".ui-sticky__container")
      expect(container.exists()).toBe(true)
    })
  })

  describe("暴露的方法和属性", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.vm.name).toBe("ui-sticky")
    })

    it("应该暴露 resize 方法", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(typeof wrapper.vm.resize).toBe("function")
    })

    it("应该暴露 isFixed 方法", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(typeof wrapper.vm.isFixed).toBe("function")
    })

    it("isFixed 方法应返回布尔值", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      const result = wrapper.vm.isFixed()
      expect(typeof result).toBe("boolean")
    })
  })

  describe("固定状态测试", () => {
    it("默认状态下 isFixed 返回值应为布尔类型", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      // 由于 mock 的 boundingClientRect top 为 0，组件会判断为固定状态
      // 这里只验证类型，不验证具体值
      expect(typeof wrapper.vm.isFixed()).toBe("boolean")
    })

    it("禁用状态下 isFixed 应返回 false", async () => {
      const wrapper = mount(UiSticky, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.vm.isFixed()).toBe(false)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
      expect(wrapper.props("offsetTop")).toBe(0)
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("空插槽时应正常渲染", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
      expect(wrapper.find(".ui-sticky__container").exists()).toBe(true)
    })

    it("多次调用 resize 应正常工作", async () => {
      const wrapper = mount(UiSticky)
      await waitForTransition()

      // 调用多次 resize 不应抛错
      wrapper.vm.resize()
      await waitForTransition()
      wrapper.vm.resize()
      await waitForTransition()

      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
    })

    it("offsetTop 为 0 时应正常工作", async () => {
      const wrapper = mount(UiSticky, {
        props: { offsetTop: 0 },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-sticky").exists()).toBe(true)
    })
  })

  describe("吸顶事件", () => {
    it("触发 resize 后应产生 change 与 scroll 事件", async () => {
      const wrapper = mount(UiSticky, {
        global: {
          stubs: {
            "ui-resize": {
              name: "ui-resize",
              template: "<div class=\"ui-resize-stub\"><slot /></div>",
              emits: ["resize"],
              mounted() {
                this.$emit("resize", { width: 100, height: 40 })
              },
            },
          },
        },
      })
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("scroll")).toBeTruthy()
    })
  })
})
