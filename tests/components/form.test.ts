/**
 * ui-form 组件单元测试
 * 测试表单组件的 props、方法和渲染逻辑
 */

import UiForm from "@/uni_modules/uniapp-ui/ui-form/ui-form.vue"
import UiField from "@/uni_modules/uniapp-ui/ui-field/ui-field.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiForm 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.find(".ui-form").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiForm, {
        slots: {
          default: "<div class=\"custom-field\">自定义表单项</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-field").exists()).toBe(true)
    })
  })

  describe("model 属性测试", () => {
    it("默认 model 应该是空对象", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("model")).toEqual({})
    })

    it("应该支持设置表单数据", async () => {
      const model = { username: "test", password: "123456" }
      const wrapper = mount(UiForm, {
        props: { model },
      })
      await waitForTransition()
      expect(wrapper.props("model")).toEqual(model)
    })
  })

  describe("rules 属性测试", () => {
    it("默认 rules 应该是空对象", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("rules")).toEqual({})
    })

    it("应该支持设置验证规则", async () => {
      const rules = {
        username: [{ required: true, message: "请输入用户名" }],
      }
      const wrapper = mount(UiForm, {
        props: { rules },
      })
      await waitForTransition()
      expect(wrapper.props("rules")).toEqual(rules)
    })
  })

  describe("colon 属性测试", () => {
    it("默认不显示冒号", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("colon")).toBe(false)
    })

    it("应该支持显示冒号", async () => {
      const wrapper = mount(UiForm, {
        props: { colon: true },
      })
      await waitForTransition()
      expect(wrapper.props("colon")).toBe(true)
    })
  })

  describe("border 属性测试", () => {
    it("默认不显示边框", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("border")).toBe(false)
    })

    it("应该支持显示边框", async () => {
      const wrapper = mount(UiForm, {
        props: { border: true },
      })
      await waitForTransition()
      expect(wrapper.props("border")).toBe(true)
    })
  })

  describe("borderColor 属性测试", () => {
    it("默认边框颜色应该是 #F6F6F6", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("borderColor")).toBe("#F6F6F6")
    })

    it("应该支持自定义边框颜色", async () => {
      const wrapper = mount(UiForm, {
        props: { borderColor: "#e5e5e5" },
      })
      await waitForTransition()
      expect(wrapper.props("borderColor")).toBe("#e5e5e5")
    })
  })

  describe("required 属性测试", () => {
    it("默认不显示必填星号", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("required")).toBe(false)
    })

    it("应该支持显示必填星号", async () => {
      const wrapper = mount(UiForm, {
        props: { required: true },
      })
      await waitForTransition()
      expect(wrapper.props("required")).toBe(true)
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.find(".ui-form--disabled").exists()).toBe(false)
    })

    it("禁用时应该添加禁用样式", async () => {
      const wrapper = mount(UiForm, {
        props: { disabled: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form--disabled").exists()).toBe(true)
    })
  })

  describe("readonly 属性测试", () => {
    it("默认不是只读状态", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.find(".ui-form--readonly").exists()).toBe(false)
    })

    it("只读时应该添加只读样式", async () => {
      const wrapper = mount(UiForm, {
        props: { readonly: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form--readonly").exists()).toBe(true)
    })
  })

  describe("label 相关属性测试", () => {
    it("默认 labelWidth 应该是 auto", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("labelWidth")).toBe("auto")
    })

    it("应该支持自定义 labelWidth", async () => {
      const wrapper = mount(UiForm, {
        props: { labelWidth: "200rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelWidth")).toBe("200rpx")
    })

    it("默认 labelPosition 应该是 left", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("labelPosition")).toBe("left")
    })

    it("应该支持 labelPosition 为 top", async () => {
      const wrapper = mount(UiForm, {
        props: { labelPosition: "top" },
      })
      await waitForTransition()
      expect(wrapper.props("labelPosition")).toBe("top")
    })

    it("应该支持 labelPosition 为 right", async () => {
      const wrapper = mount(UiForm, {
        props: { labelPosition: "right" },
      })
      await waitForTransition()
      expect(wrapper.props("labelPosition")).toBe("right")
    })
  })

  describe("contentAlign 属性测试", () => {
    it("默认 contentAlign 应该是 left", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("contentAlign")).toBe("left")
    })

    it("应该支持 contentAlign 为 center", async () => {
      const wrapper = mount(UiForm, {
        props: { contentAlign: "center" },
      })
      await waitForTransition()
      expect(wrapper.props("contentAlign")).toBe("center")
    })

    it("应该支持 contentAlign 为 right", async () => {
      const wrapper = mount(UiForm, {
        props: { contentAlign: "right" },
      })
      await waitForTransition()
      expect(wrapper.props("contentAlign")).toBe("right")
    })
  })

  describe("错误信息相关属性测试", () => {
    it("默认应该显示错误信息", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("showErrorMessage")).toBe(true)
    })

    it("应该支持隐藏错误信息", async () => {
      const wrapper = mount(UiForm, {
        props: { showErrorMessage: false },
      })
      await waitForTransition()
      expect(wrapper.props("showErrorMessage")).toBe(false)
    })

    it("默认 errorMessageAlign 应该是 left", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("errorMessageAlign")).toBe("left")
    })
  })

  describe("validateFirst 属性测试", () => {
    it("默认不在校验不通过时停止", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("validateFirst")).toBe(false)
    })

    it("应该支持在校验不通过时停止", async () => {
      const wrapper = mount(UiForm, {
        props: { validateFirst: true },
      })
      await waitForTransition()
      expect(wrapper.props("validateFirst")).toBe(true)
    })
  })

  describe("validateTrigger 属性测试", () => {
    it("默认 validateTrigger 应该是 blur", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toBe("blur")
    })

    it("应该支持 change 触发验证", async () => {
      const wrapper = mount(UiForm, {
        props: { validateTrigger: "change" },
      })
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toBe("change")
    })

    it("应该支持多个触发时机", async () => {
      const wrapper = mount(UiForm, {
        props: { validateTrigger: ["blur", "change"] },
      })
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toEqual(["blur", "change"])
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 submit 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.submit).toBeDefined()
    })

    it("应该暴露 validate 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.validate).toBeDefined()
    })

    it("应该暴露 validateField 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.validateField).toBeDefined()
    })

    it("应该暴露 resetFields 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.resetFields).toBeDefined()
    })

    it("应该暴露 getValues 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.getValues).toBeDefined()
    })

    it("应该暴露 clearValidate 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.clearValidate).toBeDefined()
    })

    it("应该暴露 getValidateStatus 方法", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.vm.getValidateStatus).toBeDefined()
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiForm, {
        props: { customClass: "my-form" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form.my-form").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiForm, {
        props: { customStyle: { padding: "20rpx" } },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiForm)
      await waitForTransition()
      expect(wrapper.find(".ui-form").exists()).toBe(true)
      expect(wrapper.props("model")).toEqual({})
      expect(wrapper.props("rules")).toEqual({})
    })
  })
})

describe("uiField 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 辅助函数：创建带有必要 stub 的 UiField 包装器
  const createFieldWrapper = (options: any = {}): any => {
    // 说明：当前项目中 UiField 为“虚拟/外部”组件类型（在类型层面无法完整推断 props 键名）
    // 测试关注运行时行为，这里将 wrapper 标注为 any，避免 wrapper.props(key) 的类型约束影响测试编写。
    return mount(UiField, {
      global: {
        stubs: {
          "ui-icon": true,
          "ui-input": {
            name: "ui-input",
            template: "<input class=\"ui-input\" />",
            props: ["modelValue", "type", "placeholder", "disabled", "maxlength", "focus"],
            emits: ["input", "blur", "focus", "confirm", "clear"],
          },
          "ui-textarea": {
            name: "ui-textarea",
            template: "<textarea class=\"ui-textarea\" />",
            props: ["modelValue", "placeholder", "disabled", "maxlength"],
            emits: ["input", "blur", "focus", "confirm", "linechange", "keyboardheightchange"],
          },
        },
      },
      ...options,
    }) as any
  }

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-field").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是空字符串", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应该支持设置初始值", async () => {
      const wrapper = createFieldWrapper({
        props: { modelValue: "test value" },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe("test value")
    })
  })

  describe("label 属性测试", () => {
    it("默认 label 应该是空字符串", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("label")).toBe("")
    })

    it("应该支持设置标签文字", async () => {
      const wrapper = createFieldWrapper({
        props: { label: "用户名" },
      })
      await waitForTransition()
      expect(wrapper.props("label")).toBe("用户名")
    })
  })

  describe("prop 属性测试", () => {
    it("默认 prop 应该是空字符串", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("prop")).toBe("")
    })

    it("应该支持设置字段名", async () => {
      const wrapper = createFieldWrapper({
        props: { prop: "username" },
      })
      await waitForTransition()
      expect(wrapper.props("prop")).toBe("username")
    })
  })

  describe("type 属性测试", () => {
    it("默认 type 应该是 text", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("type")).toBe("text")
    })

    it("应该支持 password 类型", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "password" },
      })
      await waitForTransition()
      expect(wrapper.props("type")).toBe("password")
    })

    it("应该支持 number 类型", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "number" },
      })
      await waitForTransition()
      expect(wrapper.props("type")).toBe("number")
    })

    it("应该支持 textarea 类型", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "textarea" },
      })
      await waitForTransition()
      expect(wrapper.props("type")).toBe("textarea")
    })

    it("应该支持 tel 类型", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "tel" },
      })
      await waitForTransition()
      expect(wrapper.props("type")).toBe("tel")
    })

    it("应该支持 idcard 类型", async () => {
      const wrapper = createFieldWrapper({
        props: { type: "idcard" },
      })
      await waitForTransition()
      expect(wrapper.props("type")).toBe("idcard")
    })
  })

  describe("maxlength 属性测试", () => {
    it("默认 maxlength 应该是 2000", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("maxlength")).toBe(2000)
    })

    it("应该支持自定义 maxlength", async () => {
      const wrapper = createFieldWrapper({
        props: { maxlength: 100 },
      })
      await waitForTransition()
      expect(wrapper.props("maxlength")).toBe(100)
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用状态", async () => {
      const wrapper = createFieldWrapper({
        props: { disabled: true },
      })
      await waitForTransition()
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("readonly 属性测试", () => {
    it("默认不是只读状态", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("readonly")).toBe(false)
    })

    it("应该支持只读状态", async () => {
      const wrapper = createFieldWrapper({
        props: { readonly: true },
      })
      await waitForTransition()
      expect(wrapper.props("readonly")).toBe(true)
    })
  })

  describe("colon 属性测试", () => {
    it("默认不显示冒号", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("colon")).toBe(false)
    })

    it("应该支持显示冒号", async () => {
      const wrapper = createFieldWrapper({
        props: { colon: true },
      })
      await waitForTransition()
      expect(wrapper.props("colon")).toBe(true)
    })
  })

  describe("required 属性测试", () => {
    it("默认不显示必填星号", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("required")).toBe(false)
    })

    it("应该支持显示必填星号", async () => {
      const wrapper = createFieldWrapper({
        props: { required: true },
      })
      await waitForTransition()
      expect(wrapper.props("required")).toBe(true)
    })
  })

  describe("clearable 属性测试", () => {
    it("默认不可清除", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("clearable")).toBe(false)
    })

    it("应该支持可清除", async () => {
      const wrapper = createFieldWrapper({
        props: { clearable: true },
      })
      await waitForTransition()
      expect(wrapper.props("clearable")).toBe(true)
    })
  })

  describe("清除图标属性测试", () => {
    it("默认 clearIcon 应该是 close", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("clearIcon")).toBe("close")
    })

    it("默认 clearIconSize 应该是 24rpx", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("clearIconSize")).toBe("24rpx")
    })

    it("默认 clearIconColor 应该是 #fff", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("clearIconColor")).toBe("#fff")
    })
  })

  describe("前置图标属性测试", () => {
    it("默认 prefixIcon 应该是空字符串", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("prefixIcon")).toBe("")
    })

    it("应该支持自定义前置图标", async () => {
      const wrapper = createFieldWrapper({
        props: { prefixIcon: "user" },
      })
      await waitForTransition()
      expect(wrapper.props("prefixIcon")).toBe("user")
    })
  })

  describe("后置图标属性测试", () => {
    it("默认 suffixIcon 应该是空字符串", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("suffixIcon")).toBe("")
    })

    it("应该支持自定义后置图标", async () => {
      const wrapper = createFieldWrapper({
        props: { suffixIcon: "arrow-right" },
      })
      await waitForTransition()
      expect(wrapper.props("suffixIcon")).toBe("arrow-right")
    })
  })

  describe("placeholder 属性测试", () => {
    it("默认 placeholder 应该是 '请输入内容'", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("placeholder")).toBe("请输入内容")
    })

    it("应该支持自定义 placeholder", async () => {
      const wrapper = createFieldWrapper({
        props: { placeholder: "请输入用户名" },
      })
      await waitForTransition()
      expect(wrapper.props("placeholder")).toBe("请输入用户名")
    })
  })

  describe("label 样式属性测试", () => {
    it("默认 labelAlign 应该是 left", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("labelAlign")).toBe("left")
    })

    it("应该支持自定义 labelWidth", async () => {
      const wrapper = createFieldWrapper({
        props: { labelWidth: "200rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelWidth")).toBe("200rpx")
    })
  })

  describe("inputAlign 属性测试", () => {
    it("默认 inputAlign 应该是 left", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("inputAlign")).toBe("left")
    })

    it("应该支持 inputAlign 为 center", async () => {
      const wrapper = createFieldWrapper({
        props: { inputAlign: "center" },
      })
      await waitForTransition()
      expect(wrapper.props("inputAlign")).toBe("center")
    })

    it("应该支持 inputAlign 为 right", async () => {
      const wrapper = createFieldWrapper({
        props: { inputAlign: "right" },
      })
      await waitForTransition()
      expect(wrapper.props("inputAlign")).toBe("right")
    })
  })

  describe("confirmType 属性测试", () => {
    it("默认 confirmType 应该是 done", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("confirmType")).toBe("done")
    })

    it("应该支持自定义 confirmType", async () => {
      const wrapper = createFieldWrapper({
        props: { confirmType: "search" },
      })
      await waitForTransition()
      expect(wrapper.props("confirmType")).toBe("search")
    })
  })

  describe("字数统计属性测试", () => {
    it("默认应该显示字数统计", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("showCount")).toBe(true)
    })

    it("应该支持隐藏字数统计", async () => {
      const wrapper = createFieldWrapper({
        props: { showCount: false },
      })
      await waitForTransition()
      expect(wrapper.props("showCount")).toBe(false)
    })
  })

  describe("autosize 属性测试", () => {
    it("默认不自适应高度", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("autosize")).toBe(false)
    })

    it("应该支持自适应高度", async () => {
      const wrapper = createFieldWrapper({
        props: { autosize: true, type: "textarea" },
      })
      await waitForTransition()
      expect(wrapper.props("autosize")).toBe(true)
    })
  })

  describe("focus 属性测试", () => {
    it("默认不自动聚焦", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("focus")).toBe(false)
    })

    it("应该支持自动聚焦", async () => {
      const wrapper = createFieldWrapper({
        props: { focus: true },
      })
      await waitForTransition()
      expect(wrapper.props("focus")).toBe(true)
    })
  })

  describe("cursorSpacing 属性测试", () => {
    it("默认 cursorSpacing 应该是 30", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("cursorSpacing")).toBe(30)
    })

    it("应该支持自定义 cursorSpacing", async () => {
      const wrapper = createFieldWrapper({
        props: { cursorSpacing: 50 },
      })
      await waitForTransition()
      expect(wrapper.props("cursorSpacing")).toBe(50)
    })
  })

  describe("adjustPosition 属性测试", () => {
    it("默认应该自动上推页面", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("adjustPosition")).toBe(true)
    })

    it("应该支持禁用自动上推", async () => {
      const wrapper = createFieldWrapper({
        props: { adjustPosition: false },
      })
      await waitForTransition()
      expect(wrapper.props("adjustPosition")).toBe(false)
    })
  })

  describe("showConfirmBar 属性测试", () => {
    it("默认应该显示完成栏", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.props("showConfirmBar")).toBe(true)
    })

    it("应该支持隐藏完成栏", async () => {
      const wrapper = createFieldWrapper({
        props: { showConfirmBar: false },
      })
      await waitForTransition()
      expect(wrapper.props("showConfirmBar")).toBe(false)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = createFieldWrapper({
        props: { customClass: "my-field" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-field.my-field").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = createFieldWrapper({
        props: { customStyle: { padding: "20rpx" } },
      })
      await waitForTransition()
      expect(wrapper.findComponent({ name: "ui-field" }).props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = createFieldWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-field").exists()).toBe(true)
      expect(wrapper.props("modelValue")).toBe("")
      expect(wrapper.props("type")).toBe("text")
    })
  })
})
