/**
 * ui-index-anchor 组件单元测试
 * 测试索引锚点组件的 props 和渲染逻辑
 */

import UiIndexAnchor from "@/ui/ui-index-anchor/ui-index-anchor.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { indexBarKey } from "@/ui/ui-index-bar"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建用于 mock parent context 的辅助函数
function createMockParentProvide(currentNameValue: string | number | null = "A") {
  return {
  props: {},
  useProps: {
    sticky: true,
  },
  currentName: ref(currentNameValue),
  link: vi.fn(),
  unlink: vi.fn(),
  childrens: [],
}
}

describe("ui-index-anchor 索引锚点组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认索引锚点组件", async () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-anchor").exists()).toBe(true)
    })

    it("应正确渲染带文本内容", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { text: "A" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.text()).toContain("A")
    })
  })

  describe("名称配置", () => {
    it("应支持字符串类型 name", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "B" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("name")).toBe("B")
    })

    it("应支持数字类型 name", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: 1 },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("name")).toBe(1)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义高度", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { height: "80rpx" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("height")).toBe("80rpx")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { background: "#f5f5f5" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持吸顶背景颜色", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyBackground: "#fff" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyBackground")).toBe("#fff")
    })

    it("应支持文字颜色", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { color: "#333" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("color")).toBe("#333")
    })

    it("应支持吸顶文字颜色", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyColor: "#1989fa" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyColor")).toBe("#1989fa")
    })

    it("应支持文字大小", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { fontSize: "28rpx" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("fontSize")).toBe("28rpx")
    })

    it("应支持吸顶文字大小", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyFontSize: "32rpx" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyFontSize")).toBe("32rpx")
    })

    it("应支持文字粗细", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { fontWeight: 500 },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("fontWeight")).toBe(500)
    })

    it("应支持吸顶文字粗细", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyFontWeight: 600 },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyFontWeight")).toBe(600)
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { customClass: "my-index-anchor" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("my-index-anchor")
    })
  })

  describe("激活状态", () => {
    it("当 name 匹配时应添加激活类名", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "A" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide("A"),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("is-active")
    })

    it("当 name 不匹配时不应添加激活类名", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "B" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide("A"),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).not.toContain("is-active")
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", async () => {
      const wrapper = mount(UiIndexAnchor, {
        slots: {
          default: "<span class='custom-content'>自定义内容</span>",
        },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("暴露的属性和方法", () => {
    it("应暴露 name 计算属性", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "C" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("C")
    })

    it("应暴露 resize 方法", async () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.resize).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("无 name 时应使用索引", async () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-anchor").exists()).toBe(true)
    })
  })
})
