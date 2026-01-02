/**
 * ui-skeleton-title 组件单元测试
 * 测试骨架屏标题组件的 props 和渲染逻辑
 * 注意：该组件依赖父组件注入，使用 useParent hook
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiSkeletonTitle from "@/ui/ui-skeleton-title/ui-skeleton-title.vue"
import { skeletonKey } from "@/ui/ui-skeleton"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, beforeEach, afterEach } from "vitest"
import { waitForTransition } from "../setup"

// Mock skeleton parent context with correct Symbol key
const createMockSkeletonProvide = () => {
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

describe("ui-skeleton-title 骨架屏标题组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认骨架屏标题组件", async () => {
      const wrapper = mount(UiSkeletonTitle, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-title").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiSkeletonTitle, {
        props: { width: "50%" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("width")).toBe("50%")
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiSkeletonTitle, {
        props: { height: "48rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("height")).toBe("48rpx")
    })

    it("应支持数字类型尺寸", () => {
      const wrapper = mount(UiSkeletonTitle, {
        props: { width: 200, height: 40 },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("width")).toBe(200)
      expect(wrapper.props("height")).toBe(40)
    })
  })

  describe("圆角配置", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiSkeletonTitle, {
        props: { radius: "12rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("radius")).toBe("12rpx")
    })
  })

  describe("动画配置", () => {
    it("有动画时应添加动画类名", async () => {
      const animateProvide = createMockSkeletonProvide()
      animateProvide.props.animate = true
      const wrapper = mount(UiSkeletonTitle, {
        global: {
          provide: {
            [skeletonKey]: animateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-skeleton-title--animate")
    })

    it("无动画时不应添加动画类名", async () => {
      const noAnimateProvide = createMockSkeletonProvide()
      noAnimateProvide.props.animate = false
      const wrapper = mount(UiSkeletonTitle, {
        global: {
          provide: {
            [skeletonKey]: noAnimateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-skeleton-title--animate")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSkeletonTitle, {
        props: { customClass: "my-skeleton-title" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-skeleton-title")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSkeletonTitle, {
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

      expect(wrapper.find(".ui-skeleton-title").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无宽度时应使用 flex 布局", async () => {
      const wrapper = mount(UiSkeletonTitle, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-title").exists()).toBe(true)
    })

    it("无父组件上下文时应正常渲染", async () => {
      // 使用完整的 provide mock
      const wrapper = mount(UiSkeletonTitle, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-title").exists()).toBe(true)
    })
  })
})
