/**
 * ui-sidebar-item 组件单元测试
 * 测试侧边栏项组件的 props、events 和渲染逻辑
 */

import UiSidebarItem from "@/uni_modules/uniapp-ui/ui-sidebar-item/ui-sidebar-item.vue"
import { mount } from "@vue/test-utils"
import { sidebarKey } from "@/uni_modules/uniapp-ui/ui-sidebar"
import { ref, reactive } from "vue"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建模拟的父组件上下文
function createMockSidebarProvide(overrides = {}) {
  const childrens: any[] = reactive([])

  return {
    // useParent 需要的 link/unlink/childrens
    link: vi.fn((child: any) => {
      childrens.push(child)
    }),
    unlink: vi.fn((child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    }),
    childrens,
    // sidebar 组件提供的数据
    props: {
      titleColor: "#333",
      titleSize: "28rpx",
      titleWeight: 400,
      titleAlign: "center",
      activeTitleColor: "#1989fa",
      activeTitleSize: "28rpx",
      activeTitleWeight: 600,
      background: "#f5f5f5",
      activeBackground: "#fff",
    },
    useProps: {
      titleColor: "#333",
      titleSize: "28rpx",
      titleWeight: 400,
      titleAlign: "center",
      activeTitleColor: "#1989fa",
      activeTitleSize: "28rpx",
      activeTitleWeight: 600,
      background: "#f5f5f5",
      activeBackground: "#fff",
    },
    currentName: ref(0),
    clickItem: vi.fn(),
    setCurrentName: vi.fn(),
    setLine: vi.fn(),
    scrollIntoView: vi.fn(),
    ...overrides,
  }
}

// 创建挂载辅助函数
function mountSidebarItem(props = {}, options = {}) {
  const { provideOverrides = {}, slots = {} } = options as any

  return mount(UiSidebarItem, {
    props,
    slots,
    global: {
      provide: {
        // 使用实际的 sidebarKey Symbol
        [sidebarKey as symbol]: createMockSidebarProvide(provideOverrides),
      },
    },
  })
}

describe("ui-sidebar-item 侧边栏项组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认侧边栏项组件", () => {
      const wrapper = mountSidebarItem()

      expect(wrapper.find(".ui-sidebar-item").exists()).toBe(true)
    })

    it("应正确渲染带标题的侧边栏项", () => {
      const wrapper = mountSidebarItem({ title: "分类一" })

      expect(wrapper.find(".ui-sidebar-item__title").exists()).toBe(true)
      expect(wrapper.text()).toContain("分类一")
    })
  })

  describe("名称配置", () => {
    it("应支持字符串类型 name", () => {
      const wrapper = mountSidebarItem({ name: "category1" })

      expect(wrapper.props("name")).toBe("category1")
    })

    it("应支持数字类型 name", () => {
      const wrapper = mountSidebarItem({ name: 1 })

      expect(wrapper.props("name")).toBe(1)
    })
  })

  describe("标题配置", () => {
    it("应支持标题颜色", () => {
      const wrapper = mountSidebarItem({ title: "标题", titleColor: "#666" })

      expect(wrapper.props("titleColor")).toBe("#666")
    })

    it("应支持标题大小", () => {
      const wrapper = mountSidebarItem({ title: "标题", titleSize: "32rpx" })

      expect(wrapper.props("titleSize")).toBe("32rpx")
    })

    it("应支持标题粗细", () => {
      const wrapper = mountSidebarItem({ title: "标题", titleWeight: 600 })

      expect(wrapper.props("titleWeight")).toBe(600)
    })

    it("应支持标题对齐方式", () => {
      const wrapper = mountSidebarItem({ title: "标题", titleAlign: "left" })

      expect(wrapper.props("titleAlign")).toBe("left")
    })

    it("应支持激活标题颜色", () => {
      const wrapper = mountSidebarItem({ title: "标题", activeTitleColor: "#1989fa" })

      expect(wrapper.props("activeTitleColor")).toBe("#1989fa")
    })

    it("应支持激活标题大小", () => {
      const wrapper = mountSidebarItem({ title: "标题", activeTitleSize: "32rpx" })

      expect(wrapper.props("activeTitleSize")).toBe("32rpx")
    })

    it("应支持激活标题粗细", () => {
      const wrapper = mountSidebarItem({ title: "标题", activeTitleWeight: 700 })

      expect(wrapper.props("activeTitleWeight")).toBe(700)
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mountSidebarItem()

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用状态", () => {
      const wrapper = mountSidebarItem({ disabled: true })

      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("激活状态", () => {
    it("当 name 匹配时应添加激活类名", () => {
      const wrapper = mountSidebarItem({ name: 0 }, {
        provideOverrides: { currentName: ref(0) },
      })

      expect(wrapper.classes()).toContain("ui-sidebar-item--active")
    })

    it("当 name 不匹配时不应添加激活类名", () => {
      const wrapper = mountSidebarItem({ name: 1 }, {
        provideOverrides: { currentName: ref(0) },
      })

      expect(wrapper.classes()).not.toContain("ui-sidebar-item--active")
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义高度", () => {
      const wrapper = mountSidebarItem({ height: "120rpx" })

      expect(wrapper.props("height")).toBe("120rpx")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mountSidebarItem({ background: "#f0f0f0" })

      expect(wrapper.props("background")).toBe("#f0f0f0")
    })

    it("应支持激活背景颜色", () => {
      const wrapper = mountSidebarItem({ activeBackground: "#ffffff" })

      expect(wrapper.props("activeBackground")).toBe("#ffffff")
    })

    it("应支持自定义类名", () => {
      const wrapper = mountSidebarItem({ customClass: "my-sidebar-item" })

      expect(wrapper.classes()).toContain("my-sidebar-item")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mountSidebarItem({
        customStyle: { padding: "10px" },
      })

      expect(wrapper.find(".ui-sidebar-item").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mountSidebarItem({}, {
        slots: {
          default: "<span class='custom-content'>自定义内容</span>",
        },
      })

      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("点击事件", () => {
    it("点击时应调用父组件的 clickItem 方法", async () => {
      const clickItem = vi.fn()
      const setCurrentName = vi.fn()
      const wrapper = mountSidebarItem({ name: "test" }, {
        provideOverrides: { clickItem, setCurrentName },
      })

      await wrapper.find(".ui-sidebar-item").trigger("click")

      expect(clickItem).toHaveBeenCalled()
      expect(setCurrentName).toHaveBeenCalled()
    })

    it("禁用状态下点击不应触发事件", async () => {
      const clickItem = vi.fn()
      const setCurrentName = vi.fn()
      const wrapper = mountSidebarItem({ name: "test", disabled: true }, {
        provideOverrides: { clickItem, setCurrentName },
      })

      await wrapper.find(".ui-sidebar-item").trigger("click")

      expect(clickItem).not.toHaveBeenCalled()
      expect(setCurrentName).not.toHaveBeenCalled()
    })
  })

  describe("暴露的属性和方法", () => {
    it("应暴露 name 计算属性", () => {
      const wrapper = mountSidebarItem({ name: "home" })

      expect(wrapper.vm.name).toBe("home")
    })

    it("应暴露 index 属性", () => {
      const wrapper = mountSidebarItem()

      expect(wrapper.vm.index).toBeDefined()
    })

    it("应暴露 resize 方法", () => {
      const wrapper = mountSidebarItem()

      expect(typeof wrapper.vm.resize).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("无标题时应正常渲染", () => {
      const wrapper = mountSidebarItem()

      expect(wrapper.find(".ui-sidebar-item").exists()).toBe(true)
    })

    it("没有提供 name 时应使用 index 作为标识", () => {
      const wrapper = mountSidebarItem()

      // name 未设置时，应该使用 index
      expect(wrapper.vm.name).toBeDefined()
    })
  })
})
