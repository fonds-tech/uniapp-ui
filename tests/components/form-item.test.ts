/**
 * ui-form-item 组件单元测试
 * 测试表单项组件的 props、验证和渲染逻辑
 */

import UiFormItem from "@/uni_modules/uniapp-ui/ui-form-item/ui-form-item.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { formKey } from "@/uni_modules/uniapp-ui/ui-form"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// Mock form 父组件上下文
function createMockFormProvide() {
  return {
    props: {
      labelPosition: "left",
      labelWidth: "auto",
      labelAlign: "left",
      labelGap: "16rpx",
      border: false,
      borderColor: "#eee",
      errorMessageColor: "error",
      validateTrigger: "blur",
    },
    model: ref({}),
    initialModel: ref({}),
    rules: {},
    maxLabelWidth: ref(0),
    link: vi.fn(),
    unlink: vi.fn(),
    childrens: [],
  }
}

describe("ui-form-item 表单项组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  // 辅助函数：创建带有 form 上下文的 FormItem 包装器
  const createFormItemWrapper = (options: any = {}) => {
    const mockFormProvide = createMockFormProvide()
    return mount(UiFormItem, {
      global: {
        provide: {
          [formKey]: mockFormProvide,
        },
      },
      ...options,
    })
  }

  describe("基础渲染", () => {
    it("应正确渲染默认表单项组件", async () => {
      const wrapper = createFormItemWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-form-item").exists()).toBe(true)
    })

    it("应正确渲染带标签的表单项", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "用户名" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item__label").exists()).toBe(true)
      expect(wrapper.text()).toContain("用户名")
    })

    it("应正确渲染带插槽内容", async () => {
      const wrapper = createFormItemWrapper({
        slots: { default: "<input class='test-input' />" },
      })
      await waitForTransition()
      expect(wrapper.find(".test-input").exists()).toBe(true)
    })
  })

  describe("表单域配置", () => {
    it("应支持 prop 属性", async () => {
      const wrapper = createFormItemWrapper({
        props: { prop: "username" },
      })
      await waitForTransition()
      expect(wrapper.props("prop")).toBe("username")
    })
  })

  describe("标签配置", () => {
    it("colon 为 true 时应显示冒号", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", colon: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item__label").text()).toContain(":")
    })

    it("应支持标签宽度", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelWidth: "200rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelWidth")).toBe("200rpx")
    })

    it("应支持标签颜色", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelColor: "#333" },
      })
      await waitForTransition()
      expect(wrapper.props("labelColor")).toBe("#333")
    })

    it("应支持标签大小", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelSize: "28rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelSize")).toBe("28rpx")
    })

    it("应支持标签粗细", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelWeight: 600 },
      })
      await waitForTransition()
      expect(wrapper.props("labelWeight")).toBe(600)
    })

    it("应支持标签间距", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelGap: "24rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("labelGap")).toBe("24rpx")
    })

    it("应支持标签对齐方式", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelAlign: "center" },
      })
      await waitForTransition()
      expect(wrapper.props("labelAlign")).toBe("center")
    })

    it("应支持标签位置", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签", labelPosition: "top" },
      })
      await waitForTransition()
      expect(wrapper.props("labelPosition")).toBe("top")
    })
  })

  describe("必填标识", () => {
    it("required 为 true 时应添加必填类名", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "必填项", required: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item__label--required").exists()).toBe(true)
    })

    it("required 为 false 时不应添加必填类名", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "非必填项", required: false },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item__label--required").exists()).toBe(false)
    })
  })

  describe("内容对齐", () => {
    const alignValues = ["left", "center", "right"] as const

    alignValues.forEach((align) => {
      it(`应支持 contentAlign=${align}`, async () => {
        const wrapper = createFormItemWrapper({
          props: { contentAlign: align },
        })
        await waitForTransition()
        expect(wrapper.find(`.ui-form-item__content--${align}`).exists()).toBe(true)
      })
    })
  })

  describe("边框配置", () => {
    it("应支持显示边框", async () => {
      const wrapper = createFormItemWrapper({
        props: { border: true },
      })
      await waitForTransition()
      expect(wrapper.props("border")).toBe(true)
    })

    it("应支持边框颜色", async () => {
      const wrapper = createFormItemWrapper({
        props: { border: true, borderColor: "#e5e5e5" },
      })
      await waitForTransition()
      expect(wrapper.props("borderColor")).toBe("#e5e5e5")
    })
  })

  describe("错误信息配置", () => {
    it("应支持错误信息文字", async () => {
      const wrapper = createFormItemWrapper({
        props: { errorMessage: "请输入正确的内容" },
      })
      await waitForTransition()
      expect(wrapper.props("errorMessage")).toBe("请输入正确的内容")
    })

    it("应支持错误信息大小", async () => {
      const wrapper = createFormItemWrapper({
        props: { errorMessageSize: "24rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("errorMessageSize")).toBe("24rpx")
    })

    it("应支持错误信息颜色", async () => {
      const wrapper = createFormItemWrapper({
        props: { errorMessageColor: "#ff0000" },
      })
      await waitForTransition()
      expect(wrapper.props("errorMessageColor")).toBe("#ff0000")
    })

    it("应支持错误信息对齐方式", async () => {
      const wrapper = createFormItemWrapper({
        props: { errorMessageAlign: "center" },
      })
      await waitForTransition()
      expect(wrapper.props("errorMessageAlign")).toBe("center")
    })
  })

  describe("内边距配置", () => {
    it("应支持自定义内边距", async () => {
      const wrapper = createFormItemWrapper({
        props: { padding: "20rpx" },
      })
      await waitForTransition()
      expect(wrapper.props("padding")).toBe("20rpx")
    })
  })

  describe("验证触发时机", () => {
    it("应支持 blur 触发验证", async () => {
      const wrapper = createFormItemWrapper({
        props: { validateTrigger: "blur" },
      })
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toBe("blur")
    })

    it("应支持 change 触发验证", async () => {
      const wrapper = createFormItemWrapper({
        props: { validateTrigger: "change" },
      })
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toBe("change")
    })

    it("应支持多种触发方式", async () => {
      const wrapper = createFormItemWrapper({
        props: { validateTrigger: ["blur", "change"] },
      })
      await waitForTransition()
      expect(wrapper.props("validateTrigger")).toEqual(["blur", "change"])
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = createFormItemWrapper({
        props: { customClass: "my-form-item" },
      })
      await waitForTransition()
      expect(wrapper.classes()).toContain("my-form-item")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = createFormItemWrapper({
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 label 插槽", async () => {
      const wrapper = createFormItemWrapper({
        slots: {
          label: "<span class='custom-label'>自定义标签</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-label").exists()).toBe(true)
    })

    it("应支持 error 插槽", async () => {
      const wrapper = createFormItemWrapper({
        slots: {
          error: "<span class='custom-error'>自定义错误</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-error").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无标签时应正常渲染", async () => {
      const wrapper = createFormItemWrapper()
      await waitForTransition()
      expect(wrapper.find(".ui-form-item").exists()).toBe(true)
    })

    it("无内容时应正常渲染", async () => {
      const wrapper = createFormItemWrapper({
        props: { label: "标签" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-form-item__content").exists()).toBe(true)
    })
  })
})
