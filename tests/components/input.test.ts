/**
 * ui-input 组件单元测试
 * 测试输入框组件的 props、events 和渲染逻辑
 */

import UiInput from "@/ui/ui-input/ui-input.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-input 输入框组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认输入框组件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      expect(wrapper.find(".ui-input").exists()).toBe(true)
      expect(wrapper.find(".ui-input__input").exists()).toBe(true)
    })

    it("应正确渲染带默认占位符的输入框", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      expect(wrapper.find("input").attributes("placeholder")).toBe("请输入内容")
    })

    it("应支持自定义占位符", async () => {
      const wrapper = mount(UiInput, {
        props: { placeholder: "请输入用户名" },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("placeholder")).toBe("请输入用户名")
    })
  })

  describe("输入值绑定", () => {
    it("应正确渲染初始值", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: "初始内容" },
      })
      await waitForTransition()

      expect(wrapper.find("input").element.value).toBe("初始内容")
    })

    it("应响应 modelValue 变化", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: "" },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: "新内容" })
      await waitForTransition()

      expect(wrapper.find("input").element.value).toBe("新内容")
    })

    it("输入时应触发 update:modelValue 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "测试输入" } })

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("输入时应触发 input 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "测试输入" } })

      expect(wrapper.emitted("input")).toBeTruthy()
    })

    it("输入时应触发 change 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("input", { detail: { value: "测试输入" } })

      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("输入类型", () => {
    const types = ["text", "number", "idcard", "digit", "tel", "safe-password", "nickname"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, async () => {
        const wrapper = mount(UiInput, {
          props: { type },
        })
        await waitForTransition()

        if (type === "password") {
          expect(wrapper.find("input").attributes("type")).toBe("text")
          expect(wrapper.find("input").attributes("password")).toBe("true")
        } else {
          expect(wrapper.find("input").attributes("type")).toBe(type)
        }
      })
    })

    it("type 为 password 时应转换为 text 类型并启用密码模式", async () => {
      const wrapper = mount(UiInput, {
        props: { type: "password" },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("type")).toBe("text")
    })

    it("password 属性为 true 时应启用密码模式", async () => {
      const wrapper = mount(UiInput, {
        props: { password: true },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("password")).toBe("true")
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = mount(UiInput, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-input--disabled")
    })

    it("disabled 为 true 时 input 应被禁用", async () => {
      const wrapper = mount(UiInput, {
        props: { disabled: true },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })
  })

  describe("只读状态", () => {
    it("readonly 为 true 时应添加只读类名", async () => {
      const wrapper = mount(UiInput, {
        props: { readonly: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-input--readonly")
    })

    it("readonly 为 true 时 input 应被禁用", async () => {
      const wrapper = mount(UiInput, {
        props: { readonly: true },
      })
      await waitForTransition()

      // readonly 模式下 input 也会被禁用
      expect(wrapper.find("input").attributes("disabled")).toBeDefined()
    })

    it("readonly 状态下输入框应添加只读样式类", async () => {
      const wrapper = mount(UiInput, {
        props: { readonly: true },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-input__input").classes()).toContain("ui-input__input--readonly")
    })
  })

  describe("清除按钮", () => {
    it("clearable 默认为 true 时应添加 clearable 类名", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: "内容" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-input--clearable")
    })

    it("clearable 为 false 时不应显示清除按钮", async () => {
      const wrapper = mount(UiInput, {
        props: { clearable: false, modelValue: "内容" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-input__clear").exists()).toBe(false)
    })

    it("无内容时不应显示清除按钮", async () => {
      const wrapper = mount(UiInput, {
        props: { clearable: true, modelValue: "" },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-input__clear").exists()).toBe(false)
    })
  })

  describe("最大长度", () => {
    it("应支持设置 maxlength", async () => {
      const wrapper = mount(UiInput, {
        props: { maxlength: 10 },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("maxlength")).toBe("10")
    })

    it("maxlength 默认为 -1（不限制）", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      expect(wrapper.find("input").attributes("maxlength")).toBe("-1")
    })
  })

  describe("对齐方式", () => {
    const alignments = ["left", "center", "right"] as const

    alignments.forEach((align) => {
      it(`应支持 ${align} 对齐方式`, async () => {
        const wrapper = mount(UiInput, {
          props: { inputAlign: align },
        })
        await waitForTransition()

        expect(wrapper.find(".ui-input__input").classes()).toContain(`ui-input__input--${align}`)
      })
    })
  })

  describe("样式属性", () => {
    it("应支持自定义宽度", async () => {
      const wrapper = mount(UiInput, {
        props: { width: 200 },
      })
      await waitForTransition()

      expect(wrapper.props("width")).toBe(200)
    })

    it("应支持自定义高度", async () => {
      const wrapper = mount(UiInput, {
        props: { height: 80 },
      })
      await waitForTransition()

      expect(wrapper.props("height")).toBe(80)
    })

    it("应支持自定义背景颜色", async () => {
      const wrapper = mount(UiInput, {
        props: { background: "#f5f5f5" },
      })
      await waitForTransition()

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义圆角", async () => {
      const wrapper = mount(UiInput, {
        props: { radius: 8 },
      })
      await waitForTransition()

      expect(wrapper.props("radius")).toBe(8)
    })

    it("应支持自定义内边距", async () => {
      const wrapper = mount(UiInput, {
        props: { padding: 10 },
      })
      await waitForTransition()

      expect(wrapper.props("padding")).toBe(10)
    })

    it("应支持自定义字体颜色", async () => {
      const wrapper = mount(UiInput, {
        props: { color: "#333333" },
      })
      await waitForTransition()

      expect(wrapper.props("color")).toBe("#333333")
    })

    it("应支持自定义字体大小", async () => {
      const wrapper = mount(UiInput, {
        props: { fontSize: 28 },
      })
      await waitForTransition()

      expect(wrapper.props("fontSize")).toBe(28)
    })
  })

  describe("事件处理", () => {
    it("聚焦时应触发 focus 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("focus")

      expect(wrapper.emitted("focus")).toBeTruthy()
    })

    it("失焦时应触发 blur 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("blur")

      // 等待 setTimeout（组件内部使用 100ms 延迟）
      await waitForTransition()

      expect(wrapper.emitted("blur")).toBeTruthy()
    })

    it("确认时应触发 confirm 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find("input").trigger("confirm")

      expect(wrapper.emitted("confirm")).toBeTruthy()
    })

    it("点击输入框应触发 click 事件", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      await wrapper.find(".ui-input").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("键盘设置", () => {
    it("应支持 confirmType 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { confirmType: "search" },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("confirm-type")).toBe("search")
    })

    it("应支持 confirmHold 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { confirmHold: true },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("confirm-hold")).toBe("true")
    })

    it("应支持 adjustPosition 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { adjustPosition: false },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("adjust-position")).toBe("false")
    })

    it("应支持 cursorSpacing 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { cursorSpacing: 50 },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("cursor-spacing")).toBe("50")
    })
  })

  describe("焦点控制", () => {
    it("应支持 focus 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { focus: true },
      })
      await waitForTransition()

      expect(wrapper.props("focus")).toBe(true)
    })

    it("应支持 autoBlur 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { autoBlur: true },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("auto-blur")).toBe("true")
    })
  })

  describe("光标控制", () => {
    it("应支持 cursor 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { cursor: 5 },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("cursor")).toBe("5")
    })

    it("应支持 cursorColor 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { cursorColor: "#1989fa" },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("cursor-color")).toBe("#1989fa")
    })

    it("应支持 selectionStart 和 selectionEnd 属性", async () => {
      const wrapper = mount(UiInput, {
        props: { selectionStart: 0, selectionEnd: 5 },
      })
      await waitForTransition()

      expect(wrapper.find("input").attributes("selection-start")).toBe("0")
      expect(wrapper.find("input").attributes("selection-end")).toBe("5")
    })
  })

  describe("清除图标配置", () => {
    it("应支持自定义清除图标", () => {
      const wrapper = mount(UiInput, {
        props: { clearIcon: "close" },
      })

      expect(wrapper.props("clearIcon")).toBe("close")
    })

    it("应支持自定义清除图标大小", () => {
      const wrapper = mount(UiInput, {
        props: { clearIconSize: "32rpx" },
      })

      expect(wrapper.props("clearIconSize")).toBe("32rpx")
    })

    it("应支持自定义清除图标颜色", () => {
      const wrapper = mount(UiInput, {
        props: { clearIconColor: "#999" },
      })

      expect(wrapper.props("clearIconColor")).toBe("#999")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiInput, {
        props: { customClass: "my-input" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-input")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiInput, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-input").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 reset 方法", async () => {
      const wrapper = mount(UiInput)
      await waitForTransition()

      expect(typeof wrapper.vm.reset).toBe("function")
    })

    it("reset 方法应正确重置值", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: "初始值" },
      })
      await waitForTransition()

      wrapper.vm.reset("新值")
      await waitForTransition()

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })
  })

  describe("边界情况", () => {
    it("modelValue 为数字时应正确转换", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: 123 },
      })
      await waitForTransition()

      expect(wrapper.find("input").element.value).toBe("123")
    })

    it("modelValue 为空字符串时应正常渲染", async () => {
      const wrapper = mount(UiInput, {
        props: { modelValue: "" },
      })
      await waitForTransition()

      expect(wrapper.find("input").element.value).toBe("")
    })
  })
})
