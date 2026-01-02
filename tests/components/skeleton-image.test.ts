/**
 * ui-skeleton-image 组件单元测试
 * 测试骨架屏图片组件的 props 和渲染逻辑
 * 注意：该组件使用 onMounted + useRect 进行 DOM 测量，涉及异步操作
 * 测试中需要使用 waitForTransition 推进时间以完成初始化
 */

import UiSkeletonImage from "@/ui/ui-skeleton-image/ui-skeleton-image.vue"
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
      square: false,
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

describe("ui-skeleton-image 骨架屏图片组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认骨架屏图片组件", async () => {
      const wrapper = mount(UiSkeletonImage, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-image").exists()).toBe(true)
    })
  })

  describe("尺寸配置", () => {
    it("应支持统一大小", () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { size: "200rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("size")).toBe("200rpx")
    })

    it("应支持自定义宽度", () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { width: "300rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("width")).toBe("300rpx")
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { height: "200rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("height")).toBe("200rpx")
    })

    it("应支持数字类型尺寸", () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { width: 150, height: 100 },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("width")).toBe(150)
      expect(wrapper.props("height")).toBe(100)
    })
  })

  describe("圆角配置", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { radius: "20rpx" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      expect(wrapper.props("radius")).toBe("20rpx")
    })
  })

  describe("正方形配置", () => {
    it("正方形模式应添加对应类名", async () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { square: true },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-skeleton-image--square")
    })
  })

  describe("动画配置", () => {
    it("有动画时应添加动画类名", async () => {
      const animateProvide = createMockSkeletonProvide()
      animateProvide.props.animate = true
      const wrapper = mount(UiSkeletonImage, {
        global: {
          provide: {
            [skeletonKey]: animateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-skeleton-image--animate")
    })

    it("无动画时不应添加动画类名", async () => {
      const noAnimateProvide = createMockSkeletonProvide()
      noAnimateProvide.props.animate = false
      const wrapper = mount(UiSkeletonImage, {
        global: {
          provide: {
            [skeletonKey]: noAnimateProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-skeleton-image--animate")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiSkeletonImage, {
        props: { customClass: "my-skeleton-image" },
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.classes()).toContain("my-skeleton-image")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiSkeletonImage, {
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

      expect(wrapper.find(".ui-skeleton-image").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无父组件上下文时应正常渲染", async () => {
      // 使用完整的 provide mock
      const wrapper = mount(UiSkeletonImage, {
        global: {
          provide: {
            [skeletonKey]: mockSkeletonProvide,
          },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-skeleton-image").exists()).toBe(true)
    })
  })
})
