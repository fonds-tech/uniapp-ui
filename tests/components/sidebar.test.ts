/**
 * ui-sidebar 组件单元测试
 * 测试侧边栏组件的 props、events 和渲染逻辑
 */

import UiSidebar from "@/uni_modules/uniapp-ui/ui-sidebar/ui-sidebar.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建挂载辅助函数
function mountSidebar(props = {}, slots = {}) {
  return mount(UiSidebar, {
    props,
    slots,
    global: {
      stubs: {
        // stub ui-resize 组件，避免组件解析警告
        "ui-resize": {
          name: "ui-resize",
          template: "<div class=\"ui-resize-stub\"><slot /></div>",
          props: ["width", "height"],
          emits: ["resize"],
        },
        "scroll-view": {
          name: "scroll-view",
          template: "<div class=\"scroll-view-stub\"><slot /></div>",
          props: ["scroll-y", "scroll-top", "scroll-with-animation", "enable-flex"],
        },
      },
    },
  })
}

describe("ui-sidebar 侧边栏组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认侧边栏组件", () => {
      const wrapper = mountSidebar()

      expect(wrapper.find(".ui-sidebar").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容", () => {
      const wrapper = mountSidebar(
        {},
        { default: "<div class='test-item'>侧边栏项</div>" },
      )

      expect(wrapper.find(".test-item").exists()).toBe(true)
    })
  })

  describe("绑定值", () => {
    it("默认 modelValue 应为 0", () => {
      const wrapper = mountSidebar()

      expect(wrapper.props("modelValue")).toBe(0)
    })

    it("应支持数字类型 modelValue", () => {
      const wrapper = mountSidebar({ modelValue: 1 })

      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("应支持字符串类型 modelValue", () => {
      const wrapper = mountSidebar({ modelValue: "item1" })

      expect(wrapper.props("modelValue")).toBe("item1")
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mountSidebar({ width: "200rpx" })

      expect(wrapper.props("width")).toBe("200rpx")
    })

    it("应支持自定义高度", () => {
      const wrapper = mountSidebar({ height: "100vh" })

      expect(wrapper.props("height")).toBe("100vh")
    })
  })

  describe("激活线条配置", () => {
    it("默认应显示激活线条", () => {
      const wrapper = mountSidebar()

      expect(wrapper.props("showLine")).toBe(true)
    })

    it("应支持隐藏激活线条", () => {
      const wrapper = mountSidebar({ showLine: false })

      expect(wrapper.props("showLine")).toBe(false)
    })

    it("应支持激活线条颜色", () => {
      const wrapper = mountSidebar({ lineColor: "#1989fa" })

      expect(wrapper.props("lineColor")).toBe("#1989fa")
    })

    it("应支持激活线条宽度", () => {
      const wrapper = mountSidebar({ lineWidth: "6rpx" })

      expect(wrapper.props("lineWidth")).toBe("6rpx")
    })

    it("应支持激活线条高度", () => {
      const wrapper = mountSidebar({ lineHeight: "60rpx" })

      expect(wrapper.props("lineHeight")).toBe("60rpx")
    })

    it("应支持激活线条圆角", () => {
      const wrapper = mountSidebar({ lineRadius: "4rpx" })

      expect(wrapper.props("lineRadius")).toBe("4rpx")
    })
  })

  describe("动画配置", () => {
    it("默认动画时长应为 300ms", () => {
      const wrapper = mountSidebar()

      expect(wrapper.props("duration")).toBe(300)
    })

    it("应支持自定义动画时长", () => {
      const wrapper = mountSidebar({ duration: 500 })

      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("样式配置", () => {
    it("应支持自定义背景色", () => {
      const wrapper = mountSidebar({ background: "#f5f5f5" })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义层级", () => {
      const wrapper = mountSidebar({ zIndex: 100 })

      expect(wrapper.props("zIndex")).toBe(100)
    })

    it("应支持自定义类名", () => {
      const wrapper = mountSidebar({ customClass: "my-sidebar" })

      expect(wrapper.classes()).toContain("my-sidebar")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mountSidebar({
        customStyle: { padding: "10px" },
      })

      expect(wrapper.find(".ui-sidebar").exists()).toBe(true)
    })
  })

  describe("自动滚动", () => {
    it("默认应启用自动滚动", () => {
      const wrapper = mountSidebar()

      expect(wrapper.props("autoScroll")).toBe(true)
    })

    it("应支持禁用自动滚动", () => {
      const wrapper = mountSidebar({ autoScroll: false })

      expect(wrapper.props("autoScroll")).toBe(false)
    })
  })

  describe("插槽", () => {
    it("应支持 line 插槽", () => {
      const wrapper = mountSidebar(
        {},
        {
          line: "<div class='custom-line'>自定义线条</div>",
        },
      )

      expect(wrapper.find(".custom-line").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 resize 方法", () => {
      const wrapper = mountSidebar()

      expect(typeof wrapper.vm.resize).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("无子元素时应正常渲染", () => {
      const wrapper = mountSidebar()

      expect(wrapper.find(".ui-sidebar").exists()).toBe(true)
    })

    it("数值类型尺寸应正常处理", () => {
      const wrapper = mountSidebar({ width: 200, height: 500 })

      expect(wrapper.props("width")).toBe(200)
      expect(wrapper.props("height")).toBe(500)
    })
  })
})
