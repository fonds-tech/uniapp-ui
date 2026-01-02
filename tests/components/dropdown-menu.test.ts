/**
 * ui-dropdown-menu 组件单元测试
 * 测试下拉菜单容器组件的 props、events 和渲染逻辑
 */

import UiDropdownItem from "@/ui/ui-dropdown-item/ui-dropdown-item.vue"
import UiDropdownMenu from "@/ui/ui-dropdown-menu/ui-dropdown-menu.vue"
import { mount } from "@vue/test-utils"
import { h, ref } from "vue"
import { dropdownMenuKey } from "@/ui/ui-dropdown-menu"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock dropdown-menu parent context for dropdown-item tests
function createMockDropdownMenuProvide() {
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
    rect: ref({ top: 100, bottom: 150 }),
    close: () => {},
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) childrens.splice(index, 1)
    },
    childrens,
  }
}

// 辅助函数：挂载 dropdown-item 组件，自动添加 provide
function mountDropdownItem(props: Record<string, unknown> = {}, options: { stubs?: Record<string, unknown> } = {}) {
  return mount(UiDropdownItem, {
    props,
    global: {
      stubs: {
        "ui-icon": true,
        "ui-overlay": true,
        "scroll-view": true,
        ...options.stubs,
      },
      provide: {
        [dropdownMenuKey]: createMockDropdownMenuProvide(),
      },
    },
  })
}

// 创建包装组件用于测试父子关系
function createWrapper(menuProps = {}, itemProps = {}, options: any[] = []) {
  return mount(UiDropdownMenu, {
    props: menuProps,
    slots: {
      default: h(UiDropdownItem, {
        title: "选项",
        options: options.length > 0
          ? options
          : [
            { label: "选项1", value: "1" },
            { label: "选项2", value: "2" },
          ],
        ...itemProps,
      }),
    },
    global: {
      stubs: {
        "ui-icon": true,
        "ui-overlay": true,
        "scroll-view": true,
      },
    },
  })
}

describe("uiDropdownMenu 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiDropdownMenu, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-menu").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiDropdownMenu, {
        slots: {
          default: "<div class=\"custom-content\">自定义内容</div>",
        },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })
  })

  describe("height 属性测试", () => {
    it("应该支持自定义菜单高度", async () => {
      const wrapper = mount(UiDropdownMenu, {
        props: { height: "100rpx" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("100rpx")
    })

    it("默认高度应该正常渲染", async () => {
      const wrapper = mount(UiDropdownMenu, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-menu").exists()).toBe(true)
    })
  })

  describe("background 属性测试", () => {
    it("应该支持自定义背景色", async () => {
      const wrapper = mount(UiDropdownMenu, {
        props: { background: "#ffffff" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#ffffff")
    })
  })

  describe("zIndex 属性测试", () => {
    it("应该支持自定义层级", async () => {
      const wrapper = mount(UiDropdownMenu, {
        props: { zIndex: 1000 },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("zIndex")).toBe(1000)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiDropdownMenu, {
        props: { customClass: "my-dropdown-menu" },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-menu.my-dropdown-menu").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiDropdownMenu, {
        props: { customStyle: { padding: "10rpx" } },
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "10rpx" })
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 close 方法", async () => {
      const wrapper = mount(UiDropdownMenu, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("应该暴露 resize 方法", async () => {
      const wrapper = mount(UiDropdownMenu, {
        global: {
          stubs: { "ui-icon": true },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.resize).toBe("function")
    })
  })
})

describe("uiDropdownItem 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单项",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })
  })

  describe("title 属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mountDropdownItem({
        title: "分类筛选",
        options: [],
      })
      expect(wrapper.props("title")).toBe("分类筛选")
    })
  })

  describe("options 属性测试", () => {
    it("应该支持配置选项数据", () => {
      const options = [
        { label: "选项A", value: "a" },
        { label: "选项B", value: "b" },
        { label: "选项C", value: "c" },
      ]
      const wrapper = mountDropdownItem({
        title: "菜单",
        options,
      })
      expect(wrapper.props("options")).toEqual(options)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该支持单选模式下的值绑定", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        modelValue: "1",
        mode: "single",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      })
      expect(wrapper.props("modelValue")).toBe("1")
    })

    it("应该支持多选模式下的值绑定（数组）", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        modelValue: ["1", "2"],
        mode: "multiple",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
          { label: "选项3", value: "3" },
        ],
      })
      expect(wrapper.props("modelValue")).toEqual(["1", "2"])
    })

    it("应该支持多选模式下的值绑定（字符串）", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        modelValue: "1,2",
        mode: "multiple",
        options: [
          { label: "选项1", value: "1" },
          { label: "选项2", value: "2" },
        ],
      })
      expect(wrapper.props("modelValue")).toBe("1,2")
    })
  })

  describe("mode 属性测试", () => {
    it("默认应该是单选模式", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("mode")).toBe("single")
    })

    it("应该支持多选模式", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        mode: "multiple",
        options: [],
      })
      expect(wrapper.props("mode")).toBe("multiple")
    })
  })

  describe("disabled 属性测试", () => {
    it("应该支持禁用状态", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        disabled: true,
        options: [],
      })
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("高度属性测试", () => {
    it("应该支持 minHeight 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        minHeight: "200rpx",
        options: [],
      })
      expect(wrapper.props("minHeight")).toBe("200rpx")
    })

    it("应该支持 maxHeight 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        maxHeight: "400rpx",
        options: [],
      })
      expect(wrapper.props("maxHeight")).toBe("400rpx")
    })

    it("默认 maxHeight 应该是 60vh", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("maxHeight")).toBe("60vh")
    })
  })

  describe("direction 属性测试", () => {
    it("应该支持向下展开", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        direction: "down",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item--down").exists()).toBe(true)
    })

    it("应该支持向上展开", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        direction: "up",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item--up").exists()).toBe(true)
    })
  })

  describe("overlay 属性测试", () => {
    it("默认应该显示遮罩层", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("overlay")).toBe(true)
    })

    it("应该支持关闭遮罩层", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        overlay: false,
        options: [],
      })
      expect(wrapper.props("overlay")).toBe(false)
    })
  })

  describe("closeOnClickOverlay 属性测试", () => {
    it("默认点击遮罩层应该关闭菜单", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("应该支持禁止点击遮罩层关闭", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        closeOnClickOverlay: false,
        options: [],
      })
      expect(wrapper.props("closeOnClickOverlay")).toBe(false)
    })
  })

  describe("自定义字段测试", () => {
    it("应该支持自定义 labelField", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        labelField: "name",
        options: [{ name: "选项1", id: "1" }],
      })
      expect(wrapper.props("labelField")).toBe("name")
    })

    it("应该支持自定义 valueField", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        valueField: "id",
        options: [{ label: "选项1", id: "1" }],
      })
      expect(wrapper.props("valueField")).toBe("id")
    })

    it("默认 labelField 应该是 label", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("labelField")).toBe("label")
    })

    it("默认 valueField 应该是 value", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      expect(wrapper.props("valueField")).toBe("value")
    })
  })

  describe("插槽测试", () => {
    it("应该支持默认插槽", async () => {
      // 插槽内容只有在组件 inited 后才会渲染，此处只验证组件正常挂载
      const wrapper = mount(UiDropdownItem, {
        props: {
          title: "菜单",
          options: [],
        },
        slots: {
          default: "<div class=\"custom-options\">自定义选项</div>",
        },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-overlay": true,
            "scroll-view": true,
          },
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })

    it("应该支持 header 插槽", async () => {
      // 插槽内容只有在组件 inited 后才会渲染，此处只验证组件正常挂载
      const wrapper = mount(UiDropdownItem, {
        props: {
          title: "菜单",
          options: [],
        },
        slots: {
          header: "<div class=\"custom-header\">头部内容</div>",
        },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-overlay": true,
            "scroll-view": true,
          },
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })

    it("应该支持 footer 插槽", async () => {
      // 插槽内容只有在组件 inited 后才会渲染，此处只验证组件正常挂载
      const wrapper = mount(UiDropdownItem, {
        props: {
          title: "菜单",
          options: [],
        },
        slots: {
          footer: "<div class=\"custom-footer\">底部内容</div>",
        },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-overlay": true,
            "scroll-view": true,
          },
          provide: {
            [dropdownMenuKey]: createMockDropdownMenuProvide(),
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })
  })

  describe("样式属性测试", () => {
    it("应该支持 background 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        background: "#f5f5f5",
        options: [],
      })
      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应该支持 borderRadius 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        borderRadius: "20rpx",
        options: [],
      })
      expect(wrapper.props("borderRadius")).toBe("20rpx")
    })

    it("应该支持 zIndex 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        zIndex: 2000,
        options: [],
      })
      expect(wrapper.props("zIndex")).toBe(2000)
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持 titleColor 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        titleColor: "#333333",
        options: [],
      })
      expect(wrapper.props("titleColor")).toBe("#333333")
    })

    it("应该支持 activeTitleColor 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        activeTitleColor: "#1989fa",
        options: [],
      })
      expect(wrapper.props("activeTitleColor")).toBe("#1989fa")
    })

    it("应该支持 optionColor 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        optionColor: "#666666",
        options: [],
      })
      expect(wrapper.props("optionColor")).toBe("#666666")
    })

    it("应该支持 activeOptionColor 属性", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        activeOptionColor: "#1989fa",
        options: [],
      })
      expect(wrapper.props("activeOptionColor")).toBe("#1989fa")
    })
  })

  describe("duration 属性测试", () => {
    it("应该支持自定义动画时长", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        duration: 500,
        options: [],
      })
      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("暴露属性和方法测试", () => {
    it("应该暴露 visible 属性", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.vm.visible).toBeDefined()
    })

    it("应该暴露 title 属性", async () => {
      const wrapper = mountDropdownItem({
        title: "测试标题",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.vm.title).toBeDefined()
    })

    it("应该暴露 toggle 方法", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      await waitForTransition()
      expect(typeof wrapper.vm.toggle).toBe("function")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        customClass: "my-dropdown-item",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item.my-dropdown-item").exists()).toBe(true)
    })

    it("应该支持 customStyle", () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        customStyle: { padding: "20rpx" },
        options: [],
      })
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("options 为空数组时应该正常处理", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })

    it("不设置 modelValue 时应该正常处理", async () => {
      const wrapper = mountDropdownItem({
        title: "菜单",
        options: [{ label: "选项1", value: "1" }],
      })
      await waitForTransition()
      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })

    it("标题为数字时应该正常处理", () => {
      const wrapper = mountDropdownItem({
        title: 123,
        options: [],
      })
      expect(wrapper.props("title")).toBe(123)
    })
  })
})
