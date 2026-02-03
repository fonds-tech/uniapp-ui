/**
 * ui-form 组件单元测试
 * 测试表单组件的 props、方法和渲染逻辑
 */

import UiForm from "@/uni_modules/uniapp-ui/ui-form/ui-form.vue"
import UiFormItem from "@/uni_modules/uniapp-ui/ui-form-item/ui-form-item.vue"
import { h } from "vue"
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

  describe("验证行为", () => {
    it("validate 失败时应返回错误", async () => {
      const model = { username: "" }
      const rules = { username: [{ required: true, message: "请输入用户名" }] }
      const wrapper = mount(UiForm, {
        props: { model, rules },
        slots: {
          default: h(UiFormItem, { prop: "username", label: "用户名" }),
        },
      })
      await waitForTransition()

      await expect(wrapper.vm.validate()).rejects.toEqual([{ prop: "username", message: "请输入用户名" }])
    })

    it("submit 应在失败时触发 failed，在通过时触发 submit", async () => {
      const model = { username: "" }
      const rules = { username: [{ required: true, message: "请输入用户名" }] }
      const wrapper = mount(UiForm, {
        props: { model, rules },
        slots: {
          default: h(UiFormItem, { prop: "username", label: "用户名" }),
        },
      })
      await waitForTransition()

      wrapper.vm.submit()
      await waitForTransition()
      expect(wrapper.emitted("failed")).toBeTruthy()

      model.username = "ok"
      wrapper.vm.submit()
      await waitForTransition()
      expect(wrapper.emitted("submit")).toBeTruthy()
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
