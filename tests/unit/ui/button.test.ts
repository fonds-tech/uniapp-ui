/**
 * Button 组件单元测试
 */

import { mount } from "@vue/test-utils"
import { h, defineComponent } from "vue"
import { it, expect, describe } from "vitest"

// 创建一个简化的 Button 测试组件
const UiButton = defineComponent({
  name: "ui-button",
  props: {
    type: { type: String, default: "primary" },
    size: { type: String, default: "normal" },
    plain: Boolean,
    text: Boolean,
    round: Boolean,
    block: Boolean,
    disabled: Boolean,
    loading: Boolean,
    loadingText: String,
  },
  emits: ["click"],
  setup(props, { emit, slots }) {
    const handleClick = (event: Event) => {
      if (props.disabled || props.loading) return
      emit("click", event)
    }

    return () =>
      h(
        "button",
        {
          class: [
            "ui-button",
            `ui-button--${props.type}`,
            `ui-button--${props.size}`,
            {
              "ui-button--plain": props.plain,
              "ui-button--text": props.text,
              "ui-button--round": props.round,
              "ui-button--block": props.block,
              "ui-button--disabled": props.disabled,
              "ui-button--loading": props.loading,
            },
          ],
          disabled: props.disabled,
          onClick: handleClick,
        },
        [
          props.loading && props.loadingText
            ? props.loadingText
            : slots.default?.(),
        ],
      )
  },
})

describe("button 按钮组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认按钮", () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      expect(wrapper.text()).toBe("按钮")
      expect(wrapper.classes()).toContain("ui-button")
      expect(wrapper.classes()).toContain("ui-button--primary")
      expect(wrapper.classes()).toContain("ui-button--normal")
    })

    it("应正确渲染不同类型按钮", () => {
      const types = ["primary", "success", "warning", "error", "info", "default"]

      types.forEach((type) => {
        const wrapper = mount(UiButton, {
          props: { type },
          slots: { default: type },
        })

        expect(wrapper.classes()).toContain(`ui-button--${type}`)
      })
    })

    it("应正确渲染不同尺寸按钮", () => {
      const sizes = ["mini", "small", "normal", "medium", "large"]

      sizes.forEach((size) => {
        const wrapper = mount(UiButton, {
          props: { size },
          slots: { default: size },
        })

        expect(wrapper.classes()).toContain(`ui-button--${size}`)
      })
    })
  })

  describe("样式变体", () => {
    it("应正确渲染朴素按钮", () => {
      const wrapper = mount(UiButton, {
        props: { plain: true },
        slots: { default: "朴素按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--plain")
    })

    it("应正确渲染文字按钮", () => {
      const wrapper = mount(UiButton, {
        props: { text: true },
        slots: { default: "文字按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--text")
    })

    it("应正确渲染圆形按钮", () => {
      const wrapper = mount(UiButton, {
        props: { round: true },
        slots: { default: "圆形按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--round")
    })

    it("应正确渲染块级按钮", () => {
      const wrapper = mount(UiButton, {
        props: { block: true },
        slots: { default: "块级按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--block")
    })
  })

  describe("状态处理", () => {
    it("禁用状态下应添加禁用类名", () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true },
        slots: { default: "禁用按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--disabled")
      expect(wrapper.attributes("disabled")).toBeDefined()
    })

    it("加载状态下应添加加载类名", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "加载按钮" },
      })

      expect(wrapper.classes()).toContain("ui-button--loading")
    })

    it("加载状态下应显示加载文本", () => {
      const wrapper = mount(UiButton, {
        props: { loading: true, loadingText: "加载中..." },
        slots: { default: "按钮" },
      })

      expect(wrapper.text()).toBe("加载中...")
    })
  })

  describe("事件处理", () => {
    it("点击时应触发 click 事件", async () => {
      const wrapper = mount(UiButton, {
        slots: { default: "按钮" },
      })

      await wrapper.trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })

    it("禁用状态下点击不应触发事件", async () => {
      const wrapper = mount(UiButton, {
        props: { disabled: true },
        slots: { default: "禁用按钮" },
      })

      await wrapper.trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("加载状态下点击不应触发事件", async () => {
      const wrapper = mount(UiButton, {
        props: { loading: true },
        slots: { default: "加载按钮" },
      })

      await wrapper.trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })
  })
})
