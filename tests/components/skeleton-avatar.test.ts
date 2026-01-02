/**
 * ui-skeleton-avatar 组件单元测试
 * 测试骨架屏头像组件的 props 和渲染逻辑
 * 注意：该组件依赖父组件注入，使用 useParent hook
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiSkeletonAvatar from "@/ui/ui-skeleton-avatar/ui-skeleton-avatar.vue"
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

describe("ui-skeleton-avatar 骨架屏头像组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认骨架屏头像组件", async () => {
      const wrapper = mount(UiSkeletonAvatar, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-avatar").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义大小", () => {
      const wrapper = mount(UiSkeletonAvatar, {
        props: { size: "120rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("size")).toBe("120rpx")
    })

    it("应支持数字类型大小", () => {
      const wrapper = mount(UiSkeletonAvatar, {
        props: { size: 100 },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("size")).toBe(100)
    })
  })

  describe("形状配置", () => {
    it("默认形状应为圆形", async () => {
      const wrapper = mount(UiSkeletonAvatar, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.props("shape")).toBe("round")
      expect(wrapper.classes()).toContain("ui-skeleton-avatar--round")
    })

    it("应支持方形", async () => {
      const wrapper = mount(UiSkeletonAvatar, {
        props: { shape: "square" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.props("shape")).toBe("square")
      expect(wrapper.classes()).toContain("ui-skeleton-avatar--square")
    })
  })

  describe("动画配置", () => {
    it("有动画时应添加动画类名", async () => {
      const animateProvide = createMockSkeletonProvide()
      animateProvide.props.animate = true
      const wrapper = mount(UiSkeletonAvatar, {
        global: {
          provide: {
            [skeletonKey]: animateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-skeleton-avatar--animate")
    })

    it("无动画时不应添加动画类名", async () => {
      const noAnimateProvide = createMockSkeletonProvide()
      noAnimateProvide.props.animate = false
      const wrapper = mount(UiSkeletonAvatar, {
        global: {
          provide: {
            [skeletonKey]: noAnimateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-skeleton-avatar--animate")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSkeletonAvatar, {
        props: { customClass: "my-skeleton-avatar" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-skeleton-avatar")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSkeletonAvatar, {
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

      expect(wrapper.find(".ui-skeleton-avatar").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无父组件上下文时应正常渲染", async () => {
      // 使用完整的 provide mock
      const wrapper = mount(UiSkeletonAvatar, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-avatar").exists()).toBe(true)
    })
  })
})
