/**
 * ui-dropdown-item 组件单元测试
 * 测试下拉菜单项的渲染、选项交互与事件
 */

import UiDropdownItem from "@/uni_modules/uniapp-ui/ui-dropdown-item/ui-dropdown-item.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { dropdownMenuKey } from "@/uni_modules/uniapp-ui/ui-dropdown-menu"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const overlayStub = {
  name: "ui-overlay",
  template: "<div class=\"ui-overlay-stub\" @click=\"$emit('click')\"></div>",
  props: ["show", "zIndex", "duration", "customStyle"],
}

const iconStub = {
  name: "ui-icon",
  template: "<i class=\"ui-icon-stub\"></i>",
  props: ["name", "size", "weight", "color"],
}

function createParent() {
  const childrens: any[] = []
  return {
    props: {
      direction: "down",
      duration: 300,
      overlay: true,
      closeOnClickOverlay: true,
      optionColor: "#333333",
      activeOptionColor: "#1989fa",
      labelField: "label",
      valueField: "value",
    },
    rect: ref({ top: 0, bottom: 100 }),
    close: vi.fn(),
    resize: vi.fn(),
    link: (child: any) => childrens.push(child),
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index >= 0) childrens.splice(index, 1)
    },
    childrens,
  }
}

function mountDropdownItem(props: Record<string, any> = {}) {
  const parent = createParent()
  const wrapper = mount(UiDropdownItem, {
    props,
    global: {
      stubs: {
        "ui-overlay": overlayStub,
        "ui-icon": iconStub,
      },
      provide: {
        [dropdownMenuKey]: parent,
      },
    },
  })
  return { wrapper, parent }
}

describe("ui-dropdown-item 下拉菜单项", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认组件", async () => {
      const { wrapper } = mountDropdownItem()
      await waitForTransition()

      expect(wrapper.find(".ui-dropdown-item").exists()).toBe(true)
    })
  })

  describe("标题与模式", () => {
    it("单选模式下应根据选中项显示标题", async () => {
      const { wrapper } = mountDropdownItem({
        modelValue: 2,
        options: [
          { label: "选项一", value: 1 },
          { label: "选项二", value: 2 },
        ],
      })
      await waitForTransition()

      expect(wrapper.vm.title).toBe("选项二")
    })

    it("多选模式下标题应使用 props.title", async () => {
      const { wrapper } = mountDropdownItem({
        mode: "multiple",
        title: "多选标题",
      })
      await waitForTransition()

      expect(wrapper.vm.title).toBe("多选标题")
    })
  })

  describe("选项交互", () => {
    it("单选模式点击选项应更新值", async () => {
      const { wrapper } = mountDropdownItem({
        modelValue: 1,
        options: [
          { label: "选项一", value: 1 },
          { label: "选项二", value: 2 },
        ],
      })
      await waitForTransition()

      wrapper.vm.toggle(true)
      await waitForTransition()

      await wrapper.findAll(".ui-dropdown-item__option")[1].trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([2])
    })

    it("多选模式数组值点击应切换选中", async () => {
      const { wrapper } = mountDropdownItem({
        mode: "multiple",
        modelValue: ["a"],
        options: [
          { label: "A", value: "a" },
          { label: "B", value: "b" },
        ],
      })
      await waitForTransition()

      wrapper.vm.toggle(true)
      await waitForTransition()

      await wrapper.findAll(".ui-dropdown-item__option")[1].trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([["a", "b"]])
    })
  })

  describe("遮罩交互", () => {
    it("点击遮罩层应关闭父组件", async () => {
      const { wrapper, parent } = mountDropdownItem({
        options: [{ label: "选项", value: 1 }],
      })
      await waitForTransition()

      wrapper.vm.toggle(true)
      await waitForTransition()

      await wrapper.find(".ui-overlay-stub").trigger("click")

      expect(parent.close).toHaveBeenCalled()
    })
  })
})
