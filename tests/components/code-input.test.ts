/**
 * ui-code-input 组件单元测试
 * 测试验证码输入框组件的 props、events 和渲染逻辑
 */

import UiCodeInput from "@/uni_modules/uniapp-ui/ui-code-input/ui-code-input.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-code-input 验证码输入组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认验证码输入组件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      expect(wrapper.find(".ui-code-input").exists()).toBe(true)
      expect(wrapper.find(".ui-code-input__hidden").exists()).toBe(true)
    })

    it("应默认渲染 6 个格子", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__code").length).toBe(6)
    })

    it("应支持自定义长度", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { length: 4 },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__code").length).toBe(4)
    })
  })

  describe("输入值绑定", () => {
    it("应正确渲染初始值", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "123" },
      })
      await waitForTransition()

      const texts = wrapper.findAll(".ui-code-input__text")
      expect(texts.length).toBe(3)
      expect(texts[0].text()).toBe("1")
      expect(texts[1].text()).toBe("2")
      expect(texts[2].text()).toBe("3")
    })

    it("应响应 modelValue 变化", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "" },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: "456" })
      await waitForTransition()

      const texts = wrapper.findAll(".ui-code-input__text")
      expect(texts.length).toBe(3)
    })

    it("输入时应触发 update:modelValue 事件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "1" } })

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("输入时应触发 change 事件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "1" } })

      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("输入完成时应触发 complete 事件", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { length: 4 },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "1234" } })

      expect(wrapper.emitted("complete")).toBeTruthy()
      expect(wrapper.emitted("complete")?.[0]).toEqual(["1234"])
    })

    it("输入未完成时不应触发 complete 事件", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { length: 4 },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "123" } })

      expect(wrapper.emitted("complete")).toBeFalsy()
    })
  })

  describe("样式类型", () => {
    const types = ["box", "underline", "filled"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, async () => {
        const wrapper = mount(UiCodeInput, {
          props: { type },
        })
        await waitForTransition()

        expect(wrapper.classes()).toContain(`ui-code-input--${type}`)
      })
    })
  })

  describe("密码模式", () => {
    it("mask 为 true 时应显示圆点而非文本", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "123", mask: true },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__dot").length).toBe(3)
      expect(wrapper.findAll(".ui-code-input__text").length).toBe(0)
    })

    it("mask 为 false 时应显示文本", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "123", mask: false },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__text").length).toBe(3)
      expect(wrapper.findAll(".ui-code-input__dot").length).toBe(0)
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-code-input--disabled")
    })

    it("disabled 为 true 时 input 应被禁用", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })
  })

  describe("只读状态", () => {
    it("readonly 为 true 时应添加只读类名", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { readonly: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-code-input--readonly")
    })
  })

  describe("错误状态", () => {
    it("error 为 true 时应添加错误类名", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { error: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-code-input--error")
    })
  })

  describe("光标显示", () => {
    it("聚焦时应显示光标", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { showCursor: true },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("focus")
      await waitForTransition()

      expect(wrapper.find(".ui-code-input__cursor").exists()).toBe(true)
    })

    it("showCursor 为 false 时不应显示光标", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { showCursor: false },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("focus")
      await waitForTransition()

      expect(wrapper.find(".ui-code-input__cursor").exists()).toBe(false)
    })
  })

  describe("输入类型", () => {
    it("inputType 为 number 时应过滤非数字字符", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { inputType: "number" },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "1a2b3" } })

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["123"])
    })

    it("inputType 为 text 时应保留所有字符", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { inputType: "text" },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "a1b2" } })

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["a1b2"])
    })
  })

  describe("事件处理", () => {
    it("聚焦时应触发 focus 事件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      await wrapper.find("input").trigger("focus")

      expect(wrapper.emitted("focus")).toBeTruthy()
    })

    it("失焦时应触发 blur 事件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      await wrapper.find("input").trigger("blur")

      expect(wrapper.emitted("blur")).toBeTruthy()
    })

    it("点击时应触发 click 事件", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      await wrapper.find(".ui-code-input").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 focus 方法", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      expect(typeof wrapper.vm.focus).toBe("function")
    })

    it("应暴露 blur 方法", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      expect(typeof wrapper.vm.blur).toBe("function")
    })

    it("应暴露 clear 方法", async () => {
      const wrapper = mount(UiCodeInput)
      await waitForTransition()

      expect(typeof wrapper.vm.clear).toBe("function")
    })

    it("clear 方法应正确清空值", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "123" },
      })
      await waitForTransition()

      wrapper.vm.clear()
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")?.slice(-1)[0]).toEqual([""])
      expect(wrapper.emitted("change")?.slice(-1)[0]).toEqual([""])
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { customClass: "my-code-input" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-code-input")
    })

    it("应支持自定义间距", () => {
      const wrapper = mount(UiCodeInput, {
        props: { gap: "30rpx" },
      })

      expect(wrapper.props("gap")).toBe("30rpx")
    })

    it("应支持自定义格子宽度", () => {
      const wrapper = mount(UiCodeInput, {
        props: { codeWidth: "100rpx" },
      })

      expect(wrapper.props("codeWidth")).toBe("100rpx")
    })

    it("应支持自定义格子高度", () => {
      const wrapper = mount(UiCodeInput, {
        props: { codeHeight: "100rpx" },
      })

      expect(wrapper.props("codeHeight")).toBe("100rpx")
    })
  })

  describe("边界情况", () => {
    it("输入超过长度限制时应截断", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { length: 4 },
      })
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "123456" } })

      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1234"])
    })

    it("modelValue 为空字符串时应正常渲染", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "" },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__text").length).toBe(0)
    })

    it("modelValue 超过 length 时应截断显示", async () => {
      const wrapper = mount(UiCodeInput, {
        props: { modelValue: "12345678", length: 4 },
      })
      await waitForTransition()

      expect(wrapper.findAll(".ui-code-input__text").length).toBe(4)
    })
  })
})
