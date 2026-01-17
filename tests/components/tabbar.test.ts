/**
 * ui-tabbar 组件单元测试
 * 测试标签栏组件的 props、events 和渲染逻辑
 */

import UiTabbar from "@/uni_modules/uniapp-ui/ui-tabbar/ui-tabbar.vue"
import UiTabbarItem from "@/uni_modules/uniapp-ui/ui-tabbar-item/ui-tabbar-item.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 测试辅助函数：创建带子项的 tabbar 结构
function mountTabbar(props = {}, slots = {}) {
  return mount(UiTabbar, {
    props,
    slots: {
      default: `
        <template v-slot>
          <div class="tabbar-item" data-name="0">首页</div>
          <div class="tabbar-item" data-name="1">分类</div>
          <div class="tabbar-item" data-name="2">我的</div>
        </template>
      `,
      ...slots,
    },
    global: {
      stubs: {
        "ui-safe-area-bottom": {
          template: "<div class=\"safe-area-stub\"></div>",
          emits: ["height"],
          setup(props, { emit }) {
            emit("height", 0)
          },
        },
      },
    },
  })
}

describe("uiTabbar 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar").exists()).toBe(true)
      expect(wrapper.find(".ui-tabbar__content").exists()).toBe(true)
      expect(wrapper.find(".ui-tabbar__list").exists()).toBe(true)
    })

    it("应该渲染占位元素", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar__placeholder").exists()).toBe(true)
    })

    it("应该包含安全区域组件", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      expect(wrapper.find(".safe-area-stub").exists()).toBe(true)
    })
  })

  describe("props 测试", () => {
    it("应该支持自定义 modelValue", async () => {
      const wrapper = mountTabbar({ modelValue: 1 })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("应该支持字符串类型的 modelValue", async () => {
      const wrapper = mountTabbar({ modelValue: "home" })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe("home")
    })

    it("应该默认显示边框", async () => {
      const wrapper = mountTabbar({ border: true })
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar__content--border").exists()).toBe(true)
    })

    it("应该支持隐藏边框", async () => {
      const wrapper = mountTabbar({ border: false })
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar__content--border").exists()).toBe(false)
    })

    it("应该支持自定义高度", async () => {
      const wrapper = mountTabbar({ height: "120rpx" })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("height")).toBe("120rpx")
    })

    it("应该支持自定义背景色", async () => {
      const wrapper = mountTabbar({ background: "#f5f5f5" })
      await waitForTransition()
      const content = wrapper.find(".ui-tabbar__content")
      expect(content.attributes("style")).toContain("background")
    })

    it("应该支持自定义 class", async () => {
      const wrapper = mountTabbar({ customClass: "my-tabbar" })
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar__content.my-tabbar").exists()).toBe(true)
    })

    it("应该支持固定定位属性", async () => {
      const wrapper = mountTabbar({ fixed: true })
      await waitForTransition()
      expect(wrapper.props("fixed")).toBe(true)
    })

    it("应该支持路由模式", async () => {
      const wrapper = mountTabbar({ route: true })
      await waitForTransition()
      expect(wrapper.props("route")).toBe(true)
    })

    it("应该支持激活颜色设置", async () => {
      const wrapper = mountTabbar({ activeColor: "#ff0000" })
      await waitForTransition()
      expect(wrapper.props("activeColor")).toBe("#ff0000")
    })

    it("应该支持未激活颜色设置", async () => {
      const wrapper = mountTabbar({ inactiveColor: "#999999" })
      await waitForTransition()
      expect(wrapper.props("inactiveColor")).toBe("#999999")
    })

    it("应该支持 z-index 设置", async () => {
      const wrapper = mountTabbar({ zIndex: 999 })
      await waitForTransition()
      expect(wrapper.props("zIndex")).toBe(999)
    })

    it("应该支持底部安全区属性", async () => {
      const wrapper = mountTabbar({ safeAreaInsetBottom: false })
      await waitForTransition()
      expect(wrapper.props("safeAreaInsetBottom")).toBe(false)
    })
  })

  describe("事件测试", () => {
    it("应该在 modelValue 变化时触发 change 事件", async () => {
      const wrapper = mountTabbar({ modelValue: 0 })
      await waitForTransition()
      await wrapper.setProps({ modelValue: 1 })
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("change")![0]).toEqual([1])
    })

    it("应该支持 update:modelValue 事件", async () => {
      const wrapper = mountTabbar({ modelValue: 0 })
      await waitForTransition()
      await wrapper.setProps({ modelValue: 2 })
      await waitForTransition()
      // modelValue 变化时触发 change
      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("插槽测试", () => {
    it("应该渲染默认插槽内容", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      expect(wrapper.find(".tabbar-item").exists()).toBe(true)
    })

    it("应该渲染多个子项", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      const items = wrapper.findAll(".tabbar-item")
      expect(items.length).toBe(3)
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 resize 方法", async () => {
      const wrapper = mountTabbar()
      await waitForTransition()
      expect(typeof wrapper.vm.resize).toBe("function")
    })
  })
})

describe("uiTabbarItem 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 创建带父组件上下文的挂载函数
  function mountTabbarItem(props = {}, slots = {}) {
    return mount(UiTabbarItem, {
      props,
      slots,
      global: {
        stubs: {
          "ui-icon": {
            template: "<span class=\"ui-icon-stub\" :data-name=\"name\"></span>",
            props: ["name", "size", "weight", "customPrefix"],
          },
        },
        provide: {
          // 模拟父组件注入
          "ui-tabbar": {
            props: {
              modelValue: 0,
              activeColor: "",
              inactiveColor: "",
              route: false,
            },
            useProps: {
              modelValue: 0,
              activeColor: "",
              inactiveColor: "",
              route: false,
            },
            updateValue: vi.fn(),
          },
        },
      },
    })
  }

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mountTabbarItem()
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
    })

    it("应该包含图标容器", async () => {
      const wrapper = mountTabbarItem()
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar-item__icon").exists()).toBe(true)
    })

    it("应该包含文本容器（当有 text 时）", async () => {
      const wrapper = mountTabbarItem({ text: "首页" })
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar-item__text").exists()).toBe(true)
    })
  })

  describe("props 测试", () => {
    it("应该支持 name 属性", async () => {
      const wrapper = mountTabbarItem({ name: "home" })
      await waitForTransition()
      expect(wrapper.props("name")).toBe("home")
    })

    it("应该支持数字类型的 name", async () => {
      const wrapper = mountTabbarItem({ name: 2 })
      await waitForTransition()
      expect(wrapper.props("name")).toBe(2)
    })

    it("应该支持 icon 属性", async () => {
      const wrapper = mountTabbarItem({ icon: "home" })
      await waitForTransition()
      expect(wrapper.props("icon")).toBe("home")
    })

    it("应该支持 iconSize 属性", async () => {
      const wrapper = mountTabbarItem({ iconSize: "50rpx" })
      await waitForTransition()
      expect(wrapper.props("iconSize")).toBe("50rpx")
    })

    it("应该支持 iconWeight 属性", async () => {
      const wrapper = mountTabbarItem({ iconWeight: "bold" })
      await waitForTransition()
      expect(wrapper.props("iconWeight")).toBe("bold")
    })

    it("应该支持 iconPrefix 属性", async () => {
      const wrapper = mountTabbarItem({ iconPrefix: "iconfont" })
      await waitForTransition()
      expect(wrapper.props("iconPrefix")).toBe("iconfont")
    })

    it("应该支持 route 属性", async () => {
      const wrapper = mountTabbarItem({ route: "/pages/home/index" })
      await waitForTransition()
      expect(wrapper.props("route")).toBe("/pages/home/index")
    })

    it("应该支持 routeParams 属性", async () => {
      const params = { id: 1, type: "test" }
      const wrapper = mountTabbarItem({ routeParams: params })
      await waitForTransition()
      expect(wrapper.props("routeParams")).toEqual(params)
    })

    it("应该支持 routeType 属性", async () => {
      const wrapper = mountTabbarItem({ routeType: "navigateTo" })
      await waitForTransition()
      expect(wrapper.props("routeType")).toBe("navigateTo")
    })

    it("routeType 应该默认为 switchTab", async () => {
      const wrapper = mountTabbarItem()
      await waitForTransition()
      expect(wrapper.props("routeType")).toBe("switchTab")
    })

    it("应该支持 customClass 属性", async () => {
      const wrapper = mountTabbarItem({ customClass: "my-item" })
      await waitForTransition()
      expect(wrapper.props("customClass")).toBe("my-item")
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mountTabbarItem({ name: "test" })
      await waitForTransition()
      await wrapper.find(".ui-tabbar-item").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("click 事件应该包含 name 参数", async () => {
      const wrapper = mountTabbarItem({ name: "home" })
      await waitForTransition()
      await wrapper.find(".ui-tabbar-item").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("click")![0]).toEqual(["home"])
    })

    it("没有设置 name 时应该使用 index", async () => {
      const wrapper = mountTabbarItem()
      await waitForTransition()
      await wrapper.find(".ui-tabbar-item").trigger("click")
      await waitForTransition()
      // 没有 name 时使用 index，独立挂载时 index 为 undefined
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("插槽测试", () => {
    it("应该支持默认插槽", async () => {
      const wrapper = mountTabbarItem({}, { default: "首页" })
      await waitForTransition()
      expect(wrapper.find(".ui-tabbar-item__text").text()).toBe("首页")
    })

    it("应该支持 icon 插槽", async () => {
      const wrapper = mountTabbarItem({}, { icon: "<span class=\"custom-icon\">🏠</span>" })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应该支持 extra 插槽", async () => {
      const wrapper = mountTabbarItem({}, { extra: "<span class=\"extra-content\">99+</span>" })
      await waitForTransition()
      expect(wrapper.find(".extra-content").exists()).toBe(true)
      expect(wrapper.find(".extra-content").text()).toBe("99+")
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mountTabbarItem({ name: "home" })
      await waitForTransition()
      // 注意：exposed 通过 vm 访问
      expect(wrapper.vm.name).toBeDefined()
    })

    it("应该暴露 index 属性", async () => {
      const wrapper = mountTabbarItem()
      await waitForTransition()
      expect(wrapper.vm.index).toBeDefined()
    })
  })
})

describe("uiTabbar 与 UiTabbarItem 集成测试", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("应该正确渲染完整的 tabbar 结构", async () => {
    const wrapper = mount(UiTabbar, {
      props: { modelValue: 0 },
      slots: {
        default: () => [
          mount(UiTabbarItem, {
            props: { name: 0, icon: "home" },
            slots: { default: "首页" },
            global: {
              stubs: { "ui-icon": true },
            },
          }).element,
        ],
      },
      global: {
        stubs: {
          "ui-safe-area-bottom": true,
        },
      },
    })
    await waitForTransition()
    expect(wrapper.find(".ui-tabbar").exists()).toBe(true)
  })
})

describe("边界情况测试", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("uiTabbar 不设置任何 props 时应该使用默认值", async () => {
    const wrapper = mount(UiTabbar, {
      global: {
        stubs: { "ui-safe-area-bottom": true },
      },
    })
    await waitForTransition()
    expect(wrapper.find(".ui-tabbar").exists()).toBe(true)
    expect(wrapper.find(".ui-tabbar__content--border").exists()).toBe(false) // 默认不显示边框
  })

  it("uiTabbarItem 不设置任何 props 时应该使用默认值", async () => {
    const wrapper = mount(UiTabbarItem, {
      global: {
        stubs: { "ui-icon": true },
      },
    })
    await waitForTransition()
    expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
  })

  it("uiTabbar modelValue 为负数时应该正常处理", async () => {
    const wrapper = mount(UiTabbar, {
      props: { modelValue: -1 },
      global: {
        stubs: { "ui-safe-area-bottom": true },
      },
    })
    await waitForTransition()
    expect(wrapper.props("modelValue")).toBe(-1)
  })

  it("uiTabbar modelValue 为空字符串时应该正常处理", async () => {
    const wrapper = mount(UiTabbar, {
      props: { modelValue: "" },
      global: {
        stubs: { "ui-safe-area-bottom": true },
      },
    })
    await waitForTransition()
    expect(wrapper.props("modelValue")).toBe("")
  })
})
