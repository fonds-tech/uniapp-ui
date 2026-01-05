/**
 * ui-popover 组件单元测试
 * 测试气泡弹出层组件的 props、events 和渲染逻辑
 * 注意：popover 组件使用 useTransition hook，内部用 setInterval 模拟 requestAnimationFrame
 * 测试中需要使用 waitForTransition 推进时间以完成动画初始化
 */

import UiPopover from "@/uni_modules/uniapp-ui/ui-popover/ui-popover.vue"
import type { PopoverAction } from "@/uni_modules/uniapp-ui/ui-popover/index"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 创建 stub 组件
const stubs = {
  "ui-overlay": {
    name: "ui-overlay",
    template: "<div class=\"ui-overlay-stub\" @click=\"$emit('click')\"><slot /></div>",
    props: ["show", "duration", "zIndex", "lazyRender", "opacity"],
  },
  "ui-icon": {
    name: "ui-icon",
    template: "<span class=\"ui-icon-stub\"></span>",
    props: ["name", "size", "color"],
  },
}

describe("ui-popover 气泡弹出层组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认气泡组件", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find(".ui-popover").exists()).toBe(true)
    })

    it("应渲染触发元素区域", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.find(".ui-popover__reference").exists()).toBe(true)
    })

    it("show 为 false 时不应渲染气泡内容", () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      expect(wrapper.find(".ui-popover__content").exists()).toBe(false)
    })

    it("show 为 true 时应渲染气泡内容（动画完成后）", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true },
        global: { stubs },
      })

      // 等待 transition 动画初始化完成
      await waitForTransition()

      expect(wrapper.find(".ui-popover__content").exists()).toBe(true)
    })
  })

  describe("弹出位置属性", () => {
    const placements = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ] as const

    placements.forEach((placement) => {
      it(`应接受 ${placement} 位置属性`, () => {
        const wrapper = mount(UiPopover, {
          props: { placement },
          global: { stubs },
        })

        expect(wrapper.props("placement")).toBe(placement)
      })
    })

    it("默认位置应为 bottom", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("placement")).toBe("bottom")
    })
  })

  describe("主题属性", () => {
    it("默认主题应为 light", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("theme")).toBe("light")
    })

    it("应支持 dark 主题", () => {
      const wrapper = mount(UiPopover, {
        props: { theme: "dark" },
        global: { stubs },
      })

      expect(wrapper.props("theme")).toBe("dark")
    })

    it("light 主题应渲染对应的 CSS 类名", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, theme: "light" },
        global: { stubs },
      })

      await waitForTransition()

      const content = wrapper.find(".ui-popover__content")
      expect(content.exists()).toBe(true)
      expect(content.classes()).toContain("ui-popover__content--light")
    })

    it("dark 主题应渲染对应的 CSS 类名", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, theme: "dark" },
        global: { stubs },
      })

      await waitForTransition()

      const content = wrapper.find(".ui-popover__content")
      expect(content.exists()).toBe(true)
      expect(content.classes()).toContain("ui-popover__content--dark")
    })
  })

  describe("箭头属性", () => {
    it("showArrow 默认为 true", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("showArrow")).toBe(true)
    })

    it("showArrow 为 true 时应渲染箭头", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, showArrow: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-popover__arrow").exists()).toBe(true)
    })

    it("showArrow 为 false 时不应渲染箭头", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, showArrow: false },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-popover__arrow").exists()).toBe(false)
    })

    // 测试箭头方向类名
    const arrowDirections = [
      { placement: "top", arrowClass: "ui-popover__arrow--bottom" },
      { placement: "top-start", arrowClass: "ui-popover__arrow--bottom" },
      { placement: "bottom", arrowClass: "ui-popover__arrow--top" },
      { placement: "bottom-end", arrowClass: "ui-popover__arrow--top" },
      { placement: "left", arrowClass: "ui-popover__arrow--right" },
      { placement: "left-start", arrowClass: "ui-popover__arrow--right" },
      { placement: "right", arrowClass: "ui-popover__arrow--left" },
      { placement: "right-end", arrowClass: "ui-popover__arrow--left" },
    ] as const

    arrowDirections.forEach(({ placement, arrowClass }) => {
      it(`placement 为 ${placement} 时箭头应有 ${arrowClass} 类名`, async () => {
        const wrapper = mount(UiPopover, {
          props: { show: true, showArrow: true, placement },
          global: { stubs },
        })

        await waitForTransition()

        const arrow = wrapper.find(".ui-popover__arrow")
        expect(arrow.exists()).toBe(true)
        expect(arrow.classes()).toContain(arrowClass)
      })
    })
  })

  describe("操作菜单", () => {
    const mockActions: PopoverAction[] = [
      { text: "选项一" },
      { text: "选项二", icon: "star" },
      { text: "选项三", disabled: true },
      { text: "选项四", color: "#ff0000" },
    ]

    it("应正确渲染操作菜单选项", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-popover__action")
      expect(actions.length).toBe(4)
    })

    it("应正确渲染选项文字", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actionTexts = wrapper.findAll(".ui-popover__action-text")
      expect(actionTexts[0].text()).toBe("选项一")
      expect(actionTexts[1].text()).toBe("选项二")
      expect(actionTexts[2].text()).toBe("选项三")
      expect(actionTexts[3].text()).toBe("选项四")
    })

    it("带图标的选项应渲染图标", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-popover__action")
      // 第二个选项有图标
      expect(actions[1].find(".ui-popover__action-icon").exists()).toBe(true)
    })

    it("禁用的选项应有 is-disabled 类名", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-popover__action")
      // 第三个选项是禁用的
      expect(actions[2].classes()).toContain("is-disabled")
    })

    it("点击选项应触发 select 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-popover__action")
      await actions[0].trigger("click")

      expect(wrapper.emitted("select")).toBeTruthy()
      const selectEvents = wrapper.emitted("select") as any[][]
      expect(selectEvents[0][0]).toEqual(mockActions[0])
      expect(selectEvents[0][1]).toBe(0)
    })

    it("点击禁用选项不应触发 select 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: mockActions },
        global: { stubs },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-popover__action")
      // 点击禁用的第三个选项
      await actions[2].trigger("click")

      expect(wrapper.emitted("select")).toBeFalsy()
    })
  })

  describe("触发方式", () => {
    it("trigger 默认为 click", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("trigger")).toBe("click")
    })

    it("trigger 为 click 时点击触发元素应打开气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { trigger: "click" },
        global: { stubs },
      })

      const reference = wrapper.find(".ui-popover__reference")
      await reference.trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents[0][0]).toBe(true)
    })

    it("trigger 为 manual 时点击触发元素不应打开气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { trigger: "manual" },
        global: { stubs },
      })

      const reference = wrapper.find(".ui-popover__reference")
      await reference.trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeFalsy()
    })

    it("气泡打开时再次点击触发元素应关闭气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, trigger: "click" },
        global: { stubs },
      })

      await waitForTransition()

      const reference = wrapper.find(".ui-popover__reference")
      await reference.trigger("click")
      await waitForTransition()

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })
  })

  describe("关闭行为", () => {
    it("closeOnClickOutside 默认为 true", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("closeOnClickOutside")).toBe(true)
    })

    it("closeOnClickAction 默认为 true", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("closeOnClickAction")).toBe(true)
    })

    it("点击遮罩层应触发 clickOverlay 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, closeOnClickOutside: true },
        global: { stubs },
      })

      await waitForTransition()

      const overlay = wrapper.find(".ui-overlay-stub")
      await overlay.trigger("click")

      expect(wrapper.emitted("clickOverlay")).toBeTruthy()
    })

    it("closeOnClickOutside 为 true 时点击遮罩应关闭气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, closeOnClickOutside: true },
        global: { stubs },
      })

      await waitForTransition()

      const overlay = wrapper.find(".ui-overlay-stub")
      await overlay.trigger("click")
      await waitForTransition()

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })

    it("closeOnClickOutside 为 false 时点击遮罩不应关闭气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, closeOnClickOutside: false },
        global: { stubs },
      })

      await waitForTransition()

      // closeOnClickOutside 为 false 时，overlay 不会渲染（除非 overlay 为 true）
      // 需要同时设置 overlay: true 才能测试
      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(false)
    })

    it("closeOnClickAction 为 true 时点击选项应关闭气泡", async () => {
      const actions: PopoverAction[] = [{ text: "选项一" }]
      const wrapper = mount(UiPopover, {
        props: { show: true, actions, closeOnClickAction: true },
        global: { stubs },
      })

      await waitForTransition()

      const action = wrapper.find(".ui-popover__action")
      await action.trigger("click")
      await waitForTransition()

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })

    it("closeOnClickAction 为 false 时点击选项不应关闭气泡", async () => {
      const actions: PopoverAction[] = [{ text: "选项一" }]
      const wrapper = mount(UiPopover, {
        props: { show: true, actions, closeOnClickAction: false },
        global: { stubs },
      })

      await waitForTransition()

      const action = wrapper.find(".ui-popover__action")
      await action.trigger("click")

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      // 打开时会触发一次 true，点击选项后不应触发 false
      const hasCloseEvent = updateShowEvents?.some((event) => event[0] === false)
      expect(hasCloseEvent).toBeFalsy()
    })
  })

  describe("遮罩层", () => {
    it("overlay 默认为 false", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("overlay")).toBe(false)
    })

    it("overlay 为 true 时应渲染遮罩层", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, overlay: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(true)
    })

    it("closeOnClickOutside 为 true 时应渲染透明遮罩层", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, closeOnClickOutside: true },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(true)
    })
  })

  describe("样式属性", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiPopover, {
        props: { borderRadius: 20 },
        global: { stubs },
      })

      expect(wrapper.props("borderRadius")).toBe(20)
    })

    it("默认圆角为 12rpx", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("borderRadius")).toBe("12rpx")
    })

    it("应支持自定义 z-index", () => {
      const wrapper = mount(UiPopover, {
        props: { zIndex: 1000 },
        global: { stubs },
      })

      expect(wrapper.props("zIndex")).toBe(1000)
    })

    it("应支持自定义动画时长", () => {
      const wrapper = mount(UiPopover, {
        props: { duration: 500 },
        global: { stubs },
      })

      expect(wrapper.props("duration")).toBe(500)
    })

    it("默认动画时长为 300", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(wrapper.props("duration")).toBe(300)
    })

    it("应支持自定义偏移量", () => {
      const wrapper = mount(UiPopover, {
        props: { offset: [10, 20] },
        global: { stubs },
      })

      expect(wrapper.props("offset")).toEqual([10, 20])
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiPopover, {
        props: { iconSize: 40 },
        global: { stubs },
      })

      expect(wrapper.props("iconSize")).toBe(40)
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiPopover, {
        props: { iconColor: "#ff0000" },
        global: { stubs },
      })

      expect(wrapper.props("iconColor")).toBe("#ff0000")
    })

    it("应支持自定义文字大小", () => {
      const wrapper = mount(UiPopover, {
        props: { textSize: 28 },
        global: { stubs },
      })

      expect(wrapper.props("textSize")).toBe(28)
    })

    it("应支持自定义文字颜色", () => {
      const wrapper = mount(UiPopover, {
        props: { textColor: "#333333" },
        global: { stubs },
      })

      expect(wrapper.props("textColor")).toBe("#333333")
    })

    it("应支持自定义类名", () => {
      const wrapper = mount(UiPopover, {
        props: { customClass: "my-popover" },
        global: { stubs },
      })

      expect(wrapper.props("customClass")).toBe("my-popover")
    })

    it("自定义类名应被应用到气泡内容元素", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, customClass: "my-custom-popover" },
        global: { stubs },
      })

      await waitForTransition()

      const content = wrapper.find(".ui-popover__content")
      expect(content.classes()).toContain("my-custom-popover")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiPopover, {
        props: { customStyle: { marginTop: "10px" } },
        global: { stubs },
      })

      expect(wrapper.props("customStyle")).toEqual({ marginTop: "10px" })
    })
  })

  describe("事件处理", () => {
    it("打开气泡应触发 open 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("打开动画结束应触发 opened 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      // 触发 transitionend 事件
      const content = wrapper.find(".ui-popover__content")
      await content.trigger("transitionend")

      expect(wrapper.emitted("opened")).toBeTruthy()
    })

    it("关闭气泡应触发 close 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      await wrapper.setProps({ show: false })
      await waitForTransition()

      expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("关闭动画结束应触发 closed 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      await wrapper.setProps({ show: false })
      await waitForTransition()

      // 触发 transitionend 事件
      const content = wrapper.find(".ui-popover__content")
      if (content.exists()) {
        await content.trigger("transitionend")
      }

      expect(wrapper.emitted("closed")).toBeTruthy()
    })

    it("应触发 update:show 事件", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiPopover, { global: { stubs } })

      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("调用 open 方法应打开气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      wrapper.vm.open()
      await waitForTransition()

      expect(wrapper.emitted("update:show")).toBeTruthy()
      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("调用 close 方法应关闭气泡", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true },
        global: { stubs },
      })

      await waitForTransition()

      wrapper.vm.close()
      await waitForTransition()

      const updateShowEvents = wrapper.emitted("update:show") as boolean[][]
      expect(updateShowEvents.some((event) => event[0] === false)).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应渲染默认插槽内容（触发元素）", () => {
      const wrapper = mount(UiPopover, {
        global: { stubs },
        slots: {
          default: "<button class=\"trigger-btn\">点击触发</button>",
        },
      })

      expect(wrapper.find(".trigger-btn").exists()).toBe(true)
      expect(wrapper.find(".trigger-btn").text()).toBe("点击触发")
    })

    it("应渲染 content 插槽内容", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true },
        global: { stubs },
        slots: {
          content: "<div class=\"custom-content\">自定义内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-content").exists()).toBe(true)
      expect(wrapper.find(".custom-content").text()).toBe("自定义内容")
    })

    it("使用 content 插槽时不应渲染默认 actions", async () => {
      const actions: PopoverAction[] = [{ text: "选项一" }]
      const wrapper = mount(UiPopover, {
        props: { show: true, actions },
        global: { stubs },
        slots: {
          content: "<div class=\"custom-content\">自定义内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".custom-content").exists()).toBe(true)
      // 自定义内容会覆盖默认的 actions
      expect(wrapper.find(".ui-popover__action").exists()).toBe(false)
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确设置", () => {
      const wrapper = mount(UiPopover, {
        props: {
          placement: "top",
          theme: "dark",
          showArrow: true,
          overlay: true,
          borderRadius: 20,
          customClass: "my-popover",
        },
        global: { stubs },
      })

      expect(wrapper.props("placement")).toBe("top")
      expect(wrapper.props("theme")).toBe("dark")
      expect(wrapper.props("showArrow")).toBe(true)
      expect(wrapper.props("overlay")).toBe(true)
      expect(wrapper.props("borderRadius")).toBe(20)
      expect(wrapper.props("customClass")).toBe("my-popover")
    })

    it("多个属性的完整气泡应正确渲染", async () => {
      const actions: PopoverAction[] = [{ text: "选项一" }, { text: "选项二" }]
      const wrapper = mount(UiPopover, {
        props: {
          show: true,
          placement: "top",
          theme: "dark",
          showArrow: true,
          overlay: true,
          actions,
          customClass: "my-popover",
        },
        global: { stubs },
      })

      await waitForTransition()

      const content = wrapper.find(".ui-popover__content")
      expect(content.exists()).toBe(true)
      expect(content.classes()).toContain("ui-popover__content--dark")
      expect(content.classes()).toContain("my-popover")
      expect(wrapper.find(".ui-popover__arrow").exists()).toBe(true)
      expect(wrapper.find(".ui-overlay-stub").exists()).toBe(true)
      expect(wrapper.findAll(".ui-popover__action").length).toBe(2)
    })

    it("快速切换 show 状态应正确处理", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: false },
        global: { stubs },
      })

      // 打开
      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.find(".ui-popover__content").exists()).toBe(true)

      // 关闭
      await wrapper.setProps({ show: false })
      await waitForTransition()

      // 再次打开
      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.find(".ui-popover__content").exists()).toBe(true)
    })

    it("空 actions 数组应正确渲染", async () => {
      const wrapper = mount(UiPopover, {
        props: { show: true, actions: [] },
        global: { stubs },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-popover__actions").exists()).toBe(true)
      expect(wrapper.findAll(".ui-popover__action").length).toBe(0)
    })

    it("带自定义类名的选项应正确渲染", async () => {
      const actions: PopoverAction[] = [{ text: "选项一", className: "custom-action-class" }]
      const wrapper = mount(UiPopover, {
        props: { show: true, actions },
        global: { stubs },
      })

      await waitForTransition()

      const action = wrapper.find(".ui-popover__action")
      expect(action.classes()).toContain("custom-action-class")
    })
  })
})
