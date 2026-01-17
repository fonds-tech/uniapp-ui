/**
 * ui-tab 组件单元测试
 * 测试标签页项组件的 props、events 和渲染逻辑
 */

import UiTab from "@/uni_modules/uniapp-ui/ui-tab/ui-tab.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { tabsKey } from "@/uni_modules/uniapp-ui/ui-tabs"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock tabs parent context
function createMockTabsProvide() {
  const childrens: any[] = []
  const tabRects = ref(new Map())
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
      activeFontSize: "28rpx",
      activeFontWeight: 600,
      inactiveColor: "#646566",
      inactiveFontSize: "28rpx",
      inactiveFontWeight: 400,
    },
    useProps: {
      scrollable: false,
      itemWidth: "auto",
      itemMaxWidth: "",
    },
    currentName: ref(0),
    tabRects,
    clickTab: () => {},
    setCurrentName: () => {},
    updateTabRect: (index: number, rect: any) => {
      tabRects.value.set(index, rect)
    },
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}
const mockTabsProvide = createMockTabsProvide()

describe("ui-tab 标签页项组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认标签页项组件", async () => {
      const wrapper = mount(UiTab, {
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tab").exists()).toBe(true)
    })

    it("应正确渲染带标题的标签", async () => {
      const wrapper = mount(UiTab, {
        props: { title: "标签一" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tab__title").exists()).toBe(true)
      expect(wrapper.text()).toContain("标签一")
    })
  })

  describe("标题配置", () => {
    it("应支持字符串类型标题", () => {
      const wrapper = mount(UiTab, {
        props: { title: "首页" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.props("title")).toBe("首页")
    })

    it("应支持空字符串标题", () => {
      const wrapper = mount(UiTab, {
        props: { title: "" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.props("title")).toBe("")
    })
  })

  describe("名称配置", () => {
    it("应支持字符串类型 name", () => {
      const wrapper = mount(UiTab, {
        props: { name: "home" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.props("name")).toBe("home")
    })

    it("应支持数字类型 name", () => {
      const wrapper = mount(UiTab, {
        props: { name: 1 },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.props("name")).toBe(1)
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiTab, {
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("禁用时应添加禁用类名", async () => {
      const wrapper = mount(UiTab, {
        props: { disabled: true },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("ui-tab--disabled")
    })
  })

  describe("激活状态", () => {
    it("当 name 匹配时应添加激活类名", async () => {
      const wrapper = mount(UiTab, {
        props: { name: 0 },
        global: {
          provide: {
            [tabsKey]: {
              ...mockTabsProvide,
              currentName: ref(0),
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("ui-tab--active")
    })

    it("当 name 不匹配时不应添加激活类名", async () => {
      const wrapper = mount(UiTab, {
        props: { name: 1 },
        global: {
          provide: {
            [tabsKey]: {
              ...mockTabsProvide,
              currentName: ref(0),
            },
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).not.toContain("ui-tab--active")
    })
  })

  describe("点击事件", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(UiTab, {
        props: { name: "tab1" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-tab").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")![0]).toEqual(["tab1"])
    })

    it("禁用时点击仍应触发 click 事件", async () => {
      const wrapper = mount(UiTab, {
        props: { name: "tab1", disabled: true },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      await wrapper.find(".ui-tab").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiTab, {
        props: { customClass: "my-tab" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("my-tab")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiTab, {
        props: {
          customStyle: { padding: "10px" },
        },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tab").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", async () => {
      const wrapper = mount(UiTab, {
        slots: {
          default: "<span class='custom-content'>自定义内容</span>",
        },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 计算属性", () => {
      const wrapper = mount(UiTab, {
        props: { name: "home" },
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.vm.name).toBe("home")
    })

    it("应暴露 index 属性", () => {
      const wrapper = mount(UiTab, {
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      expect(wrapper.vm.index).toBeDefined()
    })
  })

  describe("边界情况", () => {
    it("无标题时应正常渲染", async () => {
      const wrapper = mount(UiTab, {
        global: {
          provide: {
            [tabsKey]: mockTabsProvide,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tab").exists()).toBe(true)
    })
  })
})
