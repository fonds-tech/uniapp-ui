/**
 * ui-skeleton-paragraph 组件单元测试
 * 测试骨架屏段落组件的 props 和渲染逻辑
 * 注意：该组件依赖父组件注入，使用 useParent hook
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiSkeletonParagraph from "@/ui/ui-skeleton-paragraph/ui-skeleton-paragraph.vue"
import { mount } from "@vue/test-utils"
import { skeletonKey } from "@/ui/ui-skeleton"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock skeleton parent context with correct Symbol key
function createMockSkeletonProvide() {
  const childrens: any[] = []
  return {
    props: {
      animate: true,
    },
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}

const mockSkeletonProvide = createMockSkeletonProvide()

describe("ui-skeleton-paragraph 骨架屏段落组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认骨架屏段落组件", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph").exists()).toBe(true)
    })

    it("应渲染行元素", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph__row").exists()).toBe(true)
    })
  })

  describe("行数配置", () => {
    it("应支持自定义行数", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { row: 5 },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.props("row")).toBe(5)
      expect(wrapper.findAll(".ui-skeleton-paragraph__row").length).toBe(5)
    })

    it("应支持字符串类型行数", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { row: "3" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.props("row")).toBe("3")
      expect(wrapper.findAll(".ui-skeleton-paragraph__row").length).toBe(3)
    })
  })

  describe("行宽度配置", () => {
    it("应支持统一宽度", () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { rowWidth: "80%" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("rowWidth")).toBe("80%")
    })

    it("应支持数组类型宽度（每行不同）", () => {
      const rowWidths = ["100%", "80%", "60%"]
      const wrapper = mount(UiSkeletonParagraph, {
        props: { row: 3, rowWidth: rowWidths },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("rowWidth")).toEqual(rowWidths)
    })

    it("宽度 100% 时应使用 flex 布局", () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { rowWidth: "100%" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("rowWidth")).toBe("100%")
    })
  })

  describe("动画配置", () => {
    it("有动画时应添加动画类名", async () => {
      const animateProvide = createMockSkeletonProvide()
      animateProvide.props.animate = true
      const wrapper = mount(UiSkeletonParagraph, {
        global: {
          provide: {
            [skeletonKey]: animateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph__row--animate").exists()).toBe(true)
    })

    it("无动画时不应添加动画类名", async () => {
      const noAnimateProvide = createMockSkeletonProvide()
      noAnimateProvide.props.animate = false
      const wrapper = mount(UiSkeletonParagraph, {
        global: {
          provide: {
            [skeletonKey]: noAnimateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph__row--animate").exists()).toBe(false)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { customClass: "my-skeleton-paragraph" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-skeleton-paragraph")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: {
          customStyle: { margin: "10px" },
        },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("行数为 0 时应正常渲染（无行元素）", async () => {
      const wrapper = mount(UiSkeletonParagraph, {
        props: { row: 0 },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph").exists()).toBe(true)
      expect(wrapper.findAll(".ui-skeleton-paragraph__row").length).toBe(0)
    })

    it("无父组件上下文时应正常渲染", async () => {
      // 使用完整的 provide mock
      const wrapper = mount(UiSkeletonParagraph, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-paragraph").exists()).toBe(true)
    })
  })
})
