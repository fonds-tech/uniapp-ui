/**
 * ui-dropdown-item 组件单元测试
 * 测试下拉菜单项组件的 props、events 和渲染逻辑
 */

import UiDropdownItem from "@/ui/ui-dropdown-item/ui-dropdown-item.vue"
import { dropdownMenuKey } from "@/ui/ui-dropdown-menu"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

// Mock dropdown-menu parent context
const createMockDropdownMenuProvide = () => {
  const childrens: any[] = []
  return {
    props: {
      direction: "down",
      overlay: true,
      duration: 200,
      closeOnClickOverlay: true,
      borderRadius: "16rpx",
      activeOptionColor: "primary",
      optionColor: "#333",
      labelField: "label",
      valueField: "value",
    },
    rect: { value: { top: 100, bottom: 150 } },
    close: () => {},
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}

describe("ui-dropdown-item 下拉菜单项组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认下拉菜单项组件", async () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })
  })

  describe("绑定值", () => {
    it("应支持字符串类型 modelValue", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { modelValue: "option1" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("modelValue")).toBe("option1")
    })

    it("应支持数字类型 modelValue", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { modelValue: 1 },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("应支持数组类型 modelValue（多选模式）", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { modelValue: ["a", "b"], mode: "multiple" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("modelValue")).toEqual(["a", "b"])
    })
  })

  describe("选择模式", () => {
    it("默认模式应为单选 single", () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("mode")).toBe("single")
    })

    it("应支持多选模式 multiple", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { mode: "multiple" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("mode")).toBe("multiple")
    })
  })

  describe("标题配置", () => {
    it("应支持设置标题", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { title: "选择分类" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("title")).toBe("选择分类")
    })

    it("应支持标题颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { titleColor: "#333" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("titleColor")).toBe("#333")
    })

    it("应支持标题大小", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { titleSize: "28rpx" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("titleSize")).toBe("28rpx")
    })

    it("应支持标题粗细", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { titleWeight: 600 },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("titleWeight")).toBe(600)
    })

    it("应支持激活标题颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { activeTitleColor: "#1989fa" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("activeTitleColor")).toBe("#1989fa")
    })
  })

  describe("选项配置", () => {
    it("应支持选项数组", () => {
      const options = [
        { label: "选项1", value: "1" },
        { label: "选项2", value: "2" },
      ]
      const wrapper = mount(UiDropdownItem, {
        props: { options },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("options")).toEqual(options)
    })

    it("应支持自定义 labelField", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { labelField: "name" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("labelField")).toBe("name")
    })

    it("应支持自定义 valueField", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { valueField: "id" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("valueField")).toBe("id")
    })

    it("应支持选项颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { optionColor: "#666" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("optionColor")).toBe("#666")
    })

    it("应支持激活选项颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { activeOptionColor: "#1989fa" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("activeOptionColor")).toBe("#1989fa")
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用状态", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { disabled: true },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("图标配置", () => {
    it("应支持设置图标", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { icon: "arrow-down" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("icon")).toBe("arrow-down")
    })

    it("应支持图标大小", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { iconSize: "32rpx" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("iconSize")).toBe("32rpx")
    })

    it("应支持图标颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { iconColor: "#999" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("iconColor")).toBe("#999")
    })

    it("应支持激活图标颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { activeIconColor: "#1989fa" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("activeIconColor")).toBe("#1989fa")
    })
  })

  describe("高度配置", () => {
    it("应支持最小高度", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { minHeight: "200rpx" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("minHeight")).toBe("200rpx")
    })

    it("应支持最大高度", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { maxHeight: "500rpx" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("maxHeight")).toBe("500rpx")
    })
  })

  describe("样式配置", () => {
    it("应支持背景颜色", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { background: "#fff" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("background")).toBe("#fff")
    })

    it("应支持圆角值", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { borderRadius: "20rpx" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("borderRadius")).toBe("20rpx")
    })

    it("应支持自定义类名", async () => {
      const wrapper = mount(UiDropdownItem, {
        props: { customClass: "my-dropdown-item" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("my-dropdown-item")
    })
  })

  describe("遮罩层配置", () => {
    it("默认应显示遮罩层", () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("overlay")).toBe(true)
    })

    it("应支持隐藏遮罩层", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { overlay: false },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("overlay")).toBe(false)
    })

    it("默认点击遮罩层应关闭", () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })
  })

  describe("动画配置", () => {
    it("应支持动画时长", () => {
      const wrapper = mount(UiDropdownItem, {
        props: { duration: 300 },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })

      expect(wrapper.props("duration")).toBe(300)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 toggle 方法", async () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.toggle).toBe("function")
    })

    it("应暴露 visible 属性", async () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.visible).toBeDefined()
    })

    it("应暴露 title 计算属性", async () => {
      const wrapper = mount(UiDropdownItem, {
        props: { title: "测试标题" },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.title).toBe("测试标题")
    })
  })

  describe("边界情况", () => {
    it("空选项数组应正常渲染", async () => {
      const wrapper = mount(UiDropdownItem, {
        props: { options: [] },
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })

    it("无标题时应正常渲染", async () => {
      const wrapper = mount(UiDropdownItem, {
        global: {
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })
  })
})
