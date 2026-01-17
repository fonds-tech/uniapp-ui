/**
 * ui-tabs 组件单元测试
 * 测试标签页容器组件的 props、事件和渲染逻辑
 */

import UiTab from "@/uni_modules/uniapp-ui/ui-tab/ui-tab.vue"
import UiTabs from "@/uni_modules/uniapp-ui/ui-tabs/ui-tabs.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { tabsKey } from "@/uni_modules/uniapp-ui/ui-tabs"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock tabs parent context for tab tests
function createMockTabsProvide() {
  const childrens: any[] = []
  return {
    props: {
      scrollable: false,
      itemWidth: "auto",
      itemMaxWidth: "",
      showIndicator: true,
      indicatorWidth: "40rpx",
      indicatorHeight: "6rpx",
      indicatorColor: "primary",
      indicatorRadius: "9999rpx",
      activeColor: "#1989fa",
      activeSize: "28rpx",
      activeWeight: 600,
      inactiveColor: "#646566",
      inactiveSize: "28rpx",
      inactiveWeight: 400,
    },
    currentName: ref(0),
    clickTab: vi.fn(),
    setCurrentName: vi.fn(),
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}

// 辅助函数：挂载 tab 组件，自动添加 provide
function mountTab(props: Record<string, unknown> = {}, options: { slots?: Record<string, string | (() => string)> } = {}) {
  return mount(UiTab, {
    props,
    slots: options.slots,
    global: {
      provide: {
        [tabsKey]: createMockTabsProvide(),
      },
    },
  })
}

describe("uiTabs 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs").exists()).toBe(true)
    })

    it("应该包含列表容器", async () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs__list").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiTabs, {
        slots: {
          default: "<div class=\"custom-tab\">自定义标签</div>",
        },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-tab").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是 0", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(0)
    })

    it("应该支持设置初始激活项", () => {
      const wrapper = mount(UiTabs, {
        props: { modelValue: 1 },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("应该支持字符串类型的 modelValue", () => {
      const wrapper = mount(UiTabs, {
        props: { modelValue: "tab1" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("tab1")
    })
  })

  describe("height 属性测试", () => {
    it("应该支持自定义高度", async () => {
      const wrapper = mount(UiTabs, {
        props: { height: "100rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("100rpx")
    })
  })

  describe("scrollable 属性测试", () => {
    it("默认应该可以滚动", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("scrollable")).toBe(true)
    })

    it("应该支持禁用滚动", () => {
      const wrapper = mount(UiTabs, {
        props: { scrollable: false },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("scrollable")).toBe(false)
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持 activeColor 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { activeColor: "#1989fa" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("activeColor")).toBe("#1989fa")
    })

    it("应该支持 inactiveColor 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { inactiveColor: "#666666" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("inactiveColor")).toBe("#666666")
    })

    it("应该支持 lineColor 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { indicatorColor: "#1989fa" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("indicatorColor")).toBe("#1989fa")
    })
  })

  describe("尺寸属性测试", () => {
    it("应该支持 activeSize 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { activeSize: "32rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("activeSize")).toBe("32rpx")
    })

    it("应该支持 inactiveSize 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { inactiveSize: "28rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("inactiveSize")).toBe("28rpx")
    })
  })

  describe("粗细属性测试", () => {
    it("应该支持 activeWeight 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { activeWeight: "bold" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("activeWeight")).toBe("bold")
    })

    it("应该支持 inactiveWeight 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { inactiveWeight: "normal" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("inactiveWeight")).toBe("normal")
    })
  })

  describe("指示器属性测试", () => {
    it("默认应该显示指示器", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("showIndicator")).toBe(true)
    })

    it("应该支持隐藏指示器", () => {
      const wrapper = mount(UiTabs, {
        props: { showIndicator: false },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("showIndicator")).toBe(false)
    })

    it("应该支持 indicatorWidth 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { indicatorWidth: "60rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("indicatorWidth")).toBe("60rpx")
    })

    it("默认 indicatorWidth 应该是 40rpx", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("indicatorWidth")).toBe("40rpx")
    })

    it("应该支持 indicatorHeight 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { indicatorHeight: "8rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("indicatorHeight")).toBe("8rpx")
    })

    it("应该支持 indicatorRadius 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { indicatorRadius: "4rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("indicatorRadius")).toBe("4rpx")
    })

    it("应该支持 autoIndicatorWidth 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { autoIndicatorWidth: true },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("autoIndicatorWidth")).toBe(true)
    })

    it("默认 autoIndicatorWidth 应该是 false", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("autoIndicatorWidth")).toBe(false)
    })

    it("showIndicator 为 true 时应该渲染指示器元素", async () => {
      const wrapper = mount(UiTabs, {
        props: { showIndicator: true },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs__indicator").exists()).toBe(true)
    })

    it("showIndicator 为 false 时不应该渲染指示器元素", async () => {
      const wrapper = mount(UiTabs, {
        props: { showIndicator: false },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs__indicator").exists()).toBe(false)
    })
  })

  describe("单项尺寸属性测试", () => {
    it("应该支持 tabWidth 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { itemWidth: "200rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("itemWidth")).toBe("200rpx")
    })

    it("应该支持 tabMaxWidth 属性", () => {
      const wrapper = mount(UiTabs, {
        props: { itemMaxWidth: "300rpx" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("itemMaxWidth")).toBe("300rpx")
    })
  })

  describe("background 属性测试", () => {
    it("应该支持自定义背景色", async () => {
      const wrapper = mount(UiTabs, {
        props: { background: "#ffffff" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#ffffff")
    })
  })

  describe("duration 属性测试", () => {
    it("默认动画时长应该是 300ms", () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("duration")).toBe(300)
    })

    it("应该支持自定义动画时长", () => {
      const wrapper = mount(UiTabs, {
        props: { duration: 500 },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("borderBottom 属性测试", () => {
    it("默认不显示底部边框", async () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs--border").exists()).toBe(false)
    })

    it("应该支持显示底部边框", async () => {
      const wrapper = mount(UiTabs, {
        props: { borderBottom: true },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs--border").exists()).toBe(true)
    })
  })

  describe("zIndex 属性测试", () => {
    it("应该支持自定义层级", async () => {
      const wrapper = mount(UiTabs, {
        props: { zIndex: 100 },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("zIndex")).toBe(100)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiTabs, {
        props: { customClass: "my-tabs" },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs.my-tabs").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiTabs, {
        props: { customStyle: { padding: "10rpx" } },
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "10rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiTabs, {
        global: {
          stubs: {
            "scroll-view": {
              template: "<div class=\"scroll-view\"><slot /></div>",
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tabs").exists()).toBe(true)
      expect(wrapper.props("modelValue")).toBe(0)
      expect(wrapper.props("scrollable")).toBe(true)
    })
  })
})

describe("uiTab 组件（集成于 tabs.test.ts）", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mountTab({ title: "标签" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab").exists()).toBe(true)
    })

    it("应该显示标题", async () => {
      const wrapper = mountTab({ title: "标签标题" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab__title").text()).toBe("标签标题")
    })
  })

  describe("title 属性测试", () => {
    it("应该支持字符串标题", async () => {
      const wrapper = mountTab({ title: "首页" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab__title").text()).toBe("首页")
    })

    it("应该支持数字标题", async () => {
      const wrapper = mountTab({ title: 123 })
      await waitForTransition()
      expect(wrapper.find(".ui-tab__title").text()).toBe("123")
    })
  })

  describe("name 属性测试", () => {
    it("应该支持设置标识符", () => {
      const wrapper = mountTab({ title: "标签", name: "tab1" })
      expect(wrapper.props("name")).toBe("tab1")
    })

    it("应该支持数字类型的 name", () => {
      const wrapper = mountTab({ title: "标签", name: 0 })
      expect(wrapper.props("name")).toBe(0)
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", async () => {
      const wrapper = mountTab({ title: "标签" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab--disabled").exists()).toBe(false)
    })

    it("禁用时应该添加禁用样式", async () => {
      const wrapper = mountTab({ title: "标签", disabled: true })
      await waitForTransition()
      expect(wrapper.find(".ui-tab--disabled").exists()).toBe(true)
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const wrapper = mountTab({ title: "标签" })
      await waitForTransition()
      await wrapper.find(".ui-tab").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("插槽测试", () => {
    it("应该支持默认插槽", async () => {
      const wrapper = mountTab(
        { title: "标签" },
        {
          slots: {
            default: "<span class=\"custom-content\">自定义内容</span>",
          },
        },
      )
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mountTab({ title: "标签", customClass: "my-tab" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab.my-tab").exists()).toBe(true)
    })

    it("应该支持 customStyle", () => {
      const wrapper = mountTab({ title: "标签", customStyle: { padding: "20rpx" } })
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 name 属性", () => {
      const wrapper = mountTab({ title: "标签", name: "test" })
      expect(wrapper.vm.name).toBeDefined()
    })

    it("应该暴露 index 属性", () => {
      const wrapper = mountTab({ title: "标签" })
      expect(wrapper.vm.index).toBeDefined()
    })
  })

  describe("边界情况测试", () => {
    it("不设置 title 时应该正常渲染", async () => {
      const wrapper = mountTab({})
      await waitForTransition()
      expect(wrapper.find(".ui-tab").exists()).toBe(true)
    })

    it("title 为空字符串时应该正常处理", async () => {
      const wrapper = mountTab({ title: "" })
      await waitForTransition()
      expect(wrapper.find(".ui-tab__title").text()).toBe("")
    })
  })
})
