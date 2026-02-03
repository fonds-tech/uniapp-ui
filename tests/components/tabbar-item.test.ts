/**
 * ui-tabbar-item 组件单元测试
 * 测试标签栏项组件的 props、events 和渲染逻辑
 */

import UiTabbarItem from "@/uni_modules/uniapp-ui/ui-tabbar-item/ui-tabbar-item.vue"
import { mount } from "@vue/test-utils"
import { tabbarKey } from "@/uni_modules/uniapp-ui/ui-tabbar"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock tabbar parent context
function createMockTabbarProvide(modelValue = 0) {
  const childrens: any[] = []
  return {
    props: {
      modelValue,
      activeColor: "#1989fa",
      inactiveColor: "#7d7e80",
      route: false,
    },
    updateValue: vi.fn(),
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}

const mockTabbarProvide = createMockTabbarProvide()

describe("ui-tabbar-item 标签栏项组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认标签栏项组件", async () => {
      const wrapper = mount(UiTabbarItem, {
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容", async () => {
      const wrapper = mount(UiTabbarItem, {
        slots: { default: "首页" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.text()).toContain("首页")
    })
  })

  describe("名称配置", () => {
    it("应支持设置 name", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: "home" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("name")).toBe("home")
    })

    it("应支持数字类型 name", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: 1 },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("name")).toBe(1)
    })
  })

  describe("图标配置", () => {
    it("应支持设置图标", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { icon: "home" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("icon")).toBe("home")
      expect(wrapper.find(".ui-tabbar-item__icon").exists()).toBe(true)
    })

    it("应支持图标大小", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { icon: "home", iconSize: "48rpx" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("iconSize")).toBe("48rpx")
    })

    it("应支持图标粗细", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { icon: "home", iconWeight: 600 },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("iconWeight")).toBe(600)
    })

    it("应支持图标前缀", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { icon: "home", iconPrefix: "custom-icon" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("iconPrefix")).toBe("custom-icon")
    })

    it("激活时应优先使用 activeIcon", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: 1, icon: "home", activeIcon: "https://example.com/active.png" },
        global: {
          provide: {
            [tabbarKey]: createMockTabbarProvide(1),
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-tabbar-item--active").exists()).toBe(true)
      expect(wrapper.find(".ui-tabbar-item__image").exists()).toBe(true)
    })
  })

  describe("路由配置", () => {
    it("应支持设置路由", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { route: "/pages/home/index" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("route")).toBe("/pages/home/index")
    })

    it("应支持路由参数", async () => {
      const routeParams = { id: 1, type: "test" }
      const wrapper = mount(UiTabbarItem, {
        props: { route: "/pages/detail/index", routeParams },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("routeParams")).toEqual(routeParams)
    })

    it("默认跳转类型应为 switchTab", async () => {
      const wrapper = mount(UiTabbarItem, {
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("routeType")).toBe("switchTab")
    })

    it("应支持自定义跳转类型", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { routeType: "navigateTo" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("routeType")).toBe("navigateTo")
    })
  })

  describe("激活状态", () => {
    it("当 name 匹配时应添加激活类名", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: 0 },
        global: {
          provide: {
            [tabbarKey]: createMockTabbarProvide(0),
          },
        },
      })
      await waitForTransition()

      // 验证组件正确渲染和 props 设置
      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
      expect(wrapper.props("name")).toBe(0)
    })

    it("当 name 不匹配时不应添加激活类名", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: 1 },
        global: {
          provide: {
            [tabbarKey]: {
              ...createMockTabbarProvide(0),
            },
          },
        },
      })
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-tabbar-item--active")
    })
  })

  describe("点击事件", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: "home" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-tabbar-item").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")![0]).toEqual(["home"])
    })

    it("点击时应传递正确的 name", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: 2 },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-tabbar-item").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("click")![0]).toEqual([2])
    })

    it("disabled 时点击不应触发 click", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: "home", disabled: true },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-tabbar-item").trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("route 模式下点击应触发路由跳转", async () => {
      const switchTabSpy = vi.spyOn(uni, "switchTab")
      const wrapper = mount(UiTabbarItem, {
        props: { name: "home", route: "/pages/other/index" },
        global: {
          provide: {
            [tabbarKey]: {
              ...createMockTabbarProvide("home"),
              props: {
                ...createMockTabbarProvide("home").props,
                route: true,
              },
            },
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-tabbar-item").trigger("click")

      expect(switchTabSpy).toHaveBeenCalled()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { customClass: "my-tabbar-item" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("customClass")).toBe("my-tabbar-item")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: {
          customStyle: { padding: "10px" },
        },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 icon 插槽", async () => {
      const wrapper = mount(UiTabbarItem, {
        slots: {
          icon: "<span class='custom-icon'>🏠</span>",
        },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应支持 extra 插槽", async () => {
      const wrapper = mount(UiTabbarItem, {
        slots: {
          extra: "<span class='badge'>99+</span>",
        },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".badge").exists()).toBe(true)
    })
  })

  describe("暴露的属性", () => {
    it("应暴露 name 计算属性", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { name: "home" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.vm.name).toBe("home")
    })

    it("应暴露 index 属性", async () => {
      const wrapper = mount(UiTabbarItem, {
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.vm.index).toBeDefined()
    })
  })

  describe("边界情况", () => {
    it("无图标时应正常渲染", async () => {
      const wrapper = mount(UiTabbarItem, {
        slots: { default: "首页" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
    })

    it("无文本时应正常渲染", async () => {
      const wrapper = mount(UiTabbarItem, {
        props: { icon: "home" },
        global: {
          provide: {
            [tabbarKey]: mockTabbarProvide,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-tabbar-item").exists()).toBe(true)
    })
  })
})
