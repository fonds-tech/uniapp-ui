import UiTooltip from "@/uni_modules/uniapp-ui/ui-tooltip/ui-tooltip.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-tooltip 文字提示", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应渲染根节点 + 触发元素 slot", () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示" },
        slots: { default: "<text>按钮</text>" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      expect(wrapper.find(".ui-tooltip").exists()).toBe(true)
      expect(wrapper.find(".ui-tooltip__target").exists()).toBe(true)
      expect(wrapper.html()).toContain("按钮")
    })

    it("默认 visible=false 时不显示 popup overlay", () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      expect(wrapper.find(".ui-tooltip__overlay").exists()).toBe(false)
    })
  })

  describe("点击触发", () => {
    it("点击 target 应切换显示", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", trigger: "click" },
        slots: { default: "<text>按钮</text>" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await wrapper.find(".ui-tooltip__target").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("update:visible")?.[0]).toEqual([true])
      expect(wrapper.emitted("open")).toBeTruthy()

      await wrapper.find(".ui-tooltip__target").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("update:visible")?.[1]).toEqual([false])
      expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("disabled 时点击不显示", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", disabled: true },
        slots: { default: "<text>按钮</text>" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await wrapper.find(".ui-tooltip__target").trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("open")).toBeFalsy()
    })
  })

  describe("v-model:visible 受控", () => {
    it("visible=true 时应自动打开", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: false },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await wrapper.setProps({ visible: true })
      await waitForTransition()
      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("visible=false 时应自动关闭", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: true },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      await wrapper.setProps({ visible: false })
      await waitForTransition()
      expect(wrapper.emitted("close")).toBeTruthy()
    })
  })

  describe("点击外部关闭", () => {
    it("closeOnClickOutside=true 时点击 overlay 关闭", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: true, closeOnClickOutside: true },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      const overlay = wrapper.find(".ui-tooltip__overlay")
      expect(overlay.exists()).toBe(true)
      await overlay.trigger("click")
      await nextTick()
      expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("closeOnClickOutside=false 时不渲染 overlay", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: true, closeOnClickOutside: false },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tooltip__overlay").exists()).toBe(false)
    })
  })

  describe("箭头", () => {
    it("showArrow=true 时显示箭头", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: true, showArrow: true },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tooltip__arrow").exists()).toBe(true)
    })

    it("showArrow=false 时不显示箭头", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示", visible: true, showArrow: false },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-tooltip__arrow").exists()).toBe(false)
    })
  })

  describe("插槽与方法", () => {
    it("content slot 优先于 content prop", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "props 内容", visible: true },
        slots: { content: "<text>slot 内容</text>" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      await waitForTransition()
      expect(wrapper.html()).toContain("slot 内容")
    })

    it("应暴露 open / close / toggle 方法", () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      expect(typeof wrapper.vm.open).toBe("function")
      expect(typeof wrapper.vm.close).toBe("function")
      expect(typeof wrapper.vm.toggle).toBe("function")
    })

    it("open 方法应触发 open 事件", async () => {
      const wrapper = mount(UiTooltip, {
        props: { content: "提示" },
        global: { stubs: { "ui-transition": { template: "<view><slot /></view>" }, "ui-icon": true } },
      })
      wrapper.vm.open()
      await waitForTransition()
      expect(wrapper.emitted("open")).toBeTruthy()
    })
  })
})
