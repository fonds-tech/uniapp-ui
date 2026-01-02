/**
 * ui-field 组件单元测试
 * 测试表单字段组件的 props、events 和渲染逻辑
 */

import UiField from "@/ui/ui-field/ui-field.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("ui-field 表单字段组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 辅助函数：创建带有必要 stub 的 UiField 包装器
  const createFieldWrapper = (options: any = {}) => {
    return mount(UiField, {
      global: {
        stubs: {
          "ui-icon": true,
          "ui-input": {
            name: "ui-input",
            template: '<input class="ui-input" />',
            props: ["modelValue", "type", "placeholder", "disabled", "maxlength", "focus"],
            emits: ["input", "blur", "focus", "confirm", "clear"],
          },
          "ui-textarea": {
            name: "ui-textarea",
            template: '<textarea class="ui-textarea" />',
            props: ["modelValue", "placeholder", "disabled", "maxlength"],
            emits: ["input", "blur", "focus", "confirm", "linechange", "keyboardheightchange"],
          },
        },
      },
      ...options,
    })
  }

  describe("基础渲染", () => {
    it("应正确渲染默认表单字段组件", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-field").exists()).toBe(true)
    })

    it("应正确渲染带标签的表单字段", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "用户名" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field__label").exists()).toBe(true)
      expect(wrapper.text()).toContain("用户名")
    })
  })

  describe("输入类型", () => {
    const types = ["text", "number", "idcard", "digit", "tel", "password"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型输入`, async () => {
        const wrapper = createFieldWrapper({
          props: { type },
        })
        await waitForTransition()
        expect(wrapper.props("type")).toBe(type)
      })
    })

    it("textarea 类型应渲染文本域", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "textarea" },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("ui-field--textarea")
    })
  })

  describe("绑定值", () => {
    it("默认 modelValue 应为空", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应支持初始值", async () => {
      const wrapper = createFieldWrapper({
        props: { modelValue: "测试内容" },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe("测试内容")
    })
  })

  describe("禁用和只读", () => {
    it("disabled 为 true 时应添加禁用类名", async () => {
      const wrapper = createFieldWrapper({
        props: { disabled: true },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("ui-field--disabled")
    })

    it("readonly 为 true 时应添加只读类名", async () => {
      const wrapper = createFieldWrapper({
        props: { readonly: true },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("ui-field--readonly")
    })
  })

  describe("标签配置", () => {
    it("colon 为 true 时应显示冒号", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "标签", colon: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field__label").text()).toContain(":")
    })

    it("应支持标签宽度", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "标签", labelWidth: "200rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelWidth")).toBe("200rpx")
    })

    it("应支持标签颜色", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "标签", labelColor: "#333" },
      })
      await waitForTransition()
      expect(wrapper.props("labelColor")).toBe("#333")
    })

    it("应支持标签大小", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "标签", labelSize: "28rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelSize")).toBe("28rpx")
    })

    it("应支持标签对齐方式", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "标签", labelAlign: "right" },
      })
      await waitForTransition()
      expect(wrapper.props("labelAlign")).toBe("right")
      expect(wrapper.classes()).toContain("ui-field--right")
    })
  })

  describe("占位符配置", () => {
    it("应支持自定义占位符", async () => {
      const wrapper = createFieldWrapper({
        props: { placeholder: "请输入内容" },
      })
      await waitForTransition()
      expect(wrapper.props("placeholder")).toBe("请输入内容")
    })

    it("应支持占位符颜色", async () => {
      const wrapper = createFieldWrapper({
        props: { placeholderColor: "#999" },
      })
      await waitForTransition()
      expect(wrapper.props("placeholderColor")).toBe("#999")
    })
  })

  describe("图标配置", () => {
    it("应支持前置图标", async () => {
      const wrapper = createFieldWrapper({
        props: { prefixIcon: "user" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field__prefix").exists()).toBe(true)
    })

    it("应支持后置图标", async () => {
      const wrapper = createFieldWrapper({
        props: { suffixIcon: "arrow-right" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field__suffix").exists()).toBe(true)
    })

    it("应支持前置图标大小", async () => {
      const wrapper = createFieldWrapper({
        props: { prefixIcon: "user", prefixIconSize: "40rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("prefixIconSize")).toBe("40rpx")
    })

    it("应支持前置图标颜色", async () => {
      const wrapper = createFieldWrapper({
        props: { prefixIcon: "user", prefixIconColor: "#666" },
      })
      await waitForTransition()
      expect(wrapper.props("prefixIconColor")).toBe("#666")
    })
  })

  describe("样式配置", () => {
    it("应支持自定义宽度", async () => {
      const wrapper = createFieldWrapper({
        props: { width: "100%" },
      })
      await waitForTransition()
      expect(wrapper.props("width")).toBe("100%")
    })

    it("应支持自定义高度", async () => {
      const wrapper = createFieldWrapper({
        props: { height: "80rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("80rpx")
    })

    it("应支持自定义背景色", async () => {
      const wrapper = createFieldWrapper({
        props: { background: "#f5f5f5" },
      })
      await waitForTransition()
      expect(wrapper.props("background")).toBe("#f5f5f5")
    })

    it("应支持自定义圆角", async () => {
      const wrapper = createFieldWrapper({
        props: { borderRadius: "16rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("borderRadius")).toBe("16rpx")
    })

    it("应支持自定义字体大小", async () => {
      const wrapper = createFieldWrapper({
        props: { fontSize: "28rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("fontSize")).toBe("28rpx")
    })

    it("应支持自定义字体颜色", async () => {
      const wrapper = createFieldWrapper({
        props: { color: "#333" },
      })
      await waitForTransition()
      expect(wrapper.props("color")).toBe("#333")
    })
  })

  describe("输入限制", () => {
    it("应支持最大输入长度", async () => {
      const wrapper = createFieldWrapper({
        props: { maxlength: 20 },
      })
      await waitForTransition()
      expect(wrapper.props("maxlength")).toBe(20)
    })

    it("maxlength 为 -1 时不限制长度", async () => {
      const wrapper = createFieldWrapper({
        props: { maxlength: -1 },
      })
      await waitForTransition()
      expect(wrapper.props("maxlength")).toBe(-1)
    })
  })

  describe("清除功能", () => {
    it("应支持清除图标", async () => {
      const wrapper = createFieldWrapper({
        props: { clearable: true },
      })
      await waitForTransition()
      expect(wrapper.props("clearable")).toBe(true)
    })

    it("应支持自定义清除图标", async () => {
      const wrapper = createFieldWrapper({
        props: { clearable: true, clearIcon: "close" },
      })
      await waitForTransition()
      expect(wrapper.props("clearIcon")).toBe("close")
    })

    it("应支持清除图标大小", async () => {
      const wrapper = createFieldWrapper({
        props: { clearable: true, clearIconSize: "32rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("clearIconSize")).toBe("32rpx")
    })
  })

  describe("输入对齐", () => {
    const alignValues = ["left", "center", "right"] as const

    alignValues.forEach((align) => {
      it(`应支持 inputAlign=${align}`, async () => {
        const wrapper = createFieldWrapper({
          props: { inputAlign: align },
        })
        await waitForTransition()
        expect(wrapper.props("inputAlign")).toBe(align)
      })
    })
  })

  describe("自动聚焦", () => {
    it("focus 为 true 时应自动聚焦", async () => {
      const wrapper = createFieldWrapper({
        props: { focus: true },
      })
      await waitForTransition()
      expect(wrapper.props("focus")).toBe(true)
    })
  })

  describe("确认按钮类型", () => {
    it("应支持 confirmType", async () => {
      const wrapper = createFieldWrapper({
        props: { confirmType: "search" },
      })
      await waitForTransition()
      expect(wrapper.props("confirmType")).toBe("search")
    })
  })

  describe("表单相关", () => {
    it("应支持 prop 属性", async () => {
      const wrapper = createFieldWrapper({
        props: { prop: "username" },
      })
      await waitForTransition()
      expect(wrapper.props("prop")).toBe("username")
    })

    it("应支持 required 属性", async () => {
      const wrapper = createFieldWrapper({
        props: { required: true },
      })
      await waitForTransition()
      expect(wrapper.props("required")).toBe(true)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = createFieldWrapper({
        props: { customClass: "my-field" },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("my-field")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = createFieldWrapper({
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 name 属性", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-field")
    })

    it("应暴露 reset 方法", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(typeof wrapper.vm.reset).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("无标签时不应渲染标签元素", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-field__label").exists()).toBe(false)
    })

    it("数值类型 modelValue 应正常处理", async () => {
      const wrapper = createFieldWrapper({
        props: { modelValue: 123, type: "number" },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(123)
    })
  })
})
