/**
 * ui-index-bar 和 ui-index-anchor 组件单元测试
 * 测试索引栏组件的 props 和渲染逻辑
 */

import UiIndexBar from "@/uni_modules/uniapp-ui/ui-index-bar/ui-index-bar.vue"
import UiIndexAnchor from "@/uni_modules/uniapp-ui/ui-index-anchor/ui-index-anchor.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { indexBarKey } from "@/uni_modules/uniapp-ui/ui-index-bar"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiIndexBar 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const mockIndexs = ["A", "B", "C", "D", "E", "F", "G", "H"]

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-bar").exists()).toBe(true)
    })

    it("应该渲染索引列表", async () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      await waitForTransition()
      const indexItems = wrapper.findAll(".ui-index-bar__index")
      expect(indexItems.length).toBe(mockIndexs.length)
    })
  })

  describe("indexs 属性测试", () => {
    it("默认 indexs 应该是空数组", () => {
      const wrapper = mount(UiIndexBar, {
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("indexs")).toEqual([])
    })

    it("应该支持设置索引字符列表", () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("indexs")).toEqual(mockIndexs)
    })

    it("应该支持数字类型的索引", () => {
      const numberIndexs = [1, 2, 3, 4, 5]
      const wrapper = mount(UiIndexBar, {
        props: { indexs: numberIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("indexs")).toEqual(numberIndexs)
    })
  })

  describe("zIndex 属性测试", () => {
    it("默认 zIndex 应该是 1", () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("zIndex")).toBe("1")
    })

    it("应该支持自定义层级", () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs, zIndex: 100 },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("zIndex")).toBe(100)
    })
  })

  describe("sticky 属性测试", () => {
    it("默认应该自动吸顶", () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("sticky")).toBe(true)
    })

    it("应该支持禁用吸顶", () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs, sticky: false },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("sticky")).toBe(false)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs, customClass: "my-index-bar" },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-bar.my-index-bar").exists()).toBe(true)
    })

    it("应该正确传递 customStyle 属性", () => {
      const customStyle = { padding: "20rpx" }
      const wrapper = mount(UiIndexBar, {
        props: { indexs: mockIndexs, customStyle },
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      expect(wrapper.props("customStyle")).toEqual(customStyle)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiIndexBar, {
        global: {
          stubs: {
            "scroll-view": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-bar").exists()).toBe(true)
      expect(wrapper.props("indexs")).toEqual([])
      expect(wrapper.props("sticky")).toBe(true)
    })
  })
})

describe("uiIndexAnchor 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 创建用于 mock parent context 的辅助函数
  const createMockParentProvide = (currentNameValue: string | number | null = "A") => ({
    props: { sticky: true },
    currentName: ref(currentNameValue),
    link: vi.fn(),
    unlink: vi.fn(),
    childrens: [],
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "A" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-anchor").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "A" },
        slots: {
          default: "<div class=\"custom-anchor\">自定义锚点</div>",
        },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-anchor").exists()).toBe(true)
    })
  })

  describe("name 属性测试", () => {
    it("默认 name 应该是空字符串", () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("name")).toBe("")
    })

    it("应该支持字符串类型的 name", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { name: "A" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("name")).toBe("A")
    })

    it("应该支持数字类型的 name", () => {
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

  describe("text 属性测试", () => {
    it("默认 text 应该是空字符串", () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("text")).toBe("")
    })

    it("应该支持设置索引字符", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { text: "A" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("text")).toBe("A")
    })
  })

  describe("color 属性测试", () => {
    it("默认 color 应该是空字符串", () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("color")).toBe("")
    })

    it("应该支持自定义颜色", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { color: "#1989fa" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("color")).toBe("#1989fa")
    })
  })

  describe("height 属性测试", () => {
    it("应该支持自定义高度", () => {
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

  describe("fontSize 属性测试", () => {
    it("应该支持自定义字体大小", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { fontSize: "32rpx" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("fontSize")).toBe("32rpx")
    })
  })

  describe("fontWeight 属性测试", () => {
    it("应该支持自定义字体粗细", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { fontWeight: "bold" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("fontWeight")).toBe("bold")
    })
  })

  describe("background 属性测试", () => {
    it("默认 background 应该是空字符串", () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("background")).toBe("")
    })

    it("应该支持自定义背景颜色", () => {
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
  })

  describe("吸顶样式属性测试", () => {
    it("应该支持 stickyColor 属性", () => {
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

    it("应该支持 stickyFontSize 属性", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyFontSize: "36rpx" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyFontSize")).toBe("36rpx")
    })

    it("应该支持 stickyFontWeight 属性", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyFontWeight: "bold" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyFontWeight")).toBe("bold")
    })

    it("应该支持 stickyBackground 属性", () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { stickyBackground: "#ffffff" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("stickyBackground")).toBe("#ffffff")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiIndexAnchor, {
        props: { customClass: "my-anchor" },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-anchor.my-anchor").exists()).toBe(true)
    })

    it("应该正确传递 customStyle 属性", () => {
      const customStyle = { padding: "20rpx" }
      const wrapper = mount(UiIndexAnchor, {
        props: { customStyle },
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      expect(wrapper.props("customStyle")).toEqual(customStyle)
    })
  })

  describe("激活状态测试", () => {
    it("当 name 匹配 currentName 时应该添加 is-active 类名", async () => {
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

    it("当 name 不匹配 currentName 时不应该添加 is-active 类名", async () => {
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

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiIndexAnchor, {
        global: {
          provide: {
            [indexBarKey as symbol]: createMockParentProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-index-anchor").exists()).toBe(true)
      expect(wrapper.props("name")).toBe("")
      expect(wrapper.props("text")).toBe("")
    })
  })
})
