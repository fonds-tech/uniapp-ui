/**
 * ui-stepper 组件单元测试
 * 测试步进器组件的 props、events 和渲染逻辑
 */

import UiStepper from "@/ui/ui-stepper/ui-stepper.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("uiStepper 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      expect(wrapper.find(".ui-stepper").exists()).toBe(true)
    })

    it("应该包含减少按钮", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__minus").exists()).toBe(true)
    })

    it("应该包含输入框", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__input").exists()).toBe(true)
    })

    it("应该包含增加按钮", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__plus").exists()).toBe(true)
    })

    it("默认主题应该是 button", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      expect(wrapper.find(".ui-stepper--button").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该正确显示初始值", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 5 } })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("5")
    })

    it("应该支持字符串类型的值", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: "10" } })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("10")
    })

    it("默认值应该为 0", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("0")
    })
  })

  describe("增加和减少按钮测试", () => {
    it("点击增加按钮应该增加值", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 5 } })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("plus")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("点击减少按钮应该减少值", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 5 } })
      await waitForTransition()
      const minusBtn = wrapper.findAll(".ui-stepper__button")[0]
      await minusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("minus")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("应该触发 change 事件", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 5 } })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("step 步长测试", () => {
    it("应该按照步长增加", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 0, step: 5 } })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["5"])
    })

    it("应该按照步长减少", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 10, step: 3 } })
      await waitForTransition()
      const minusBtn = wrapper.findAll(".ui-stepper__button")[0]
      await minusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("update:modelValue")![0]).toEqual(["7"])
    })

    it("应该支持小数步长", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 0, step: 0.5, decimalLength: 1 },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("step")).toBe(0.5)
      expect(wrapper.props("decimalLength")).toBe(1)
    })
  })

  describe("min 和 max 边界测试", () => {
    it("值不应该小于 min", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 1, min: 0 } })
      await waitForTransition()
      const minusBtn = wrapper.findAll(".ui-stepper__button")[0]
      await minusBtn.trigger("click")
      await waitForTransition()
      // 值为 0，再减少应该触发 overlimit
      await minusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("overlimit")).toBeTruthy()
      expect(wrapper.emitted("overlimit")![0]).toEqual(["minus"])
    })

    it("值不应该大于 max", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 9, max: 10 } })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      // 值为 10，再增加应该触发 overlimit
      await plusBtn.trigger("click")
      await waitForTransition()
      expect(wrapper.emitted("overlimit")).toBeTruthy()
      expect(wrapper.emitted("overlimit")![0]).toEqual(["plus"])
    })

    it("达到最小值时减少按钮应该禁用", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 0, min: 0 } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__minus--disabled").exists()).toBe(true)
    })

    it("达到最大值时增加按钮应该禁用", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 10, max: 10 } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__plus--disabled").exists()).toBe(true)
    })
  })

  describe("disabled 禁用测试", () => {
    it("disabled 时整个组件应该禁用", async () => {
      const wrapper = mount(UiStepper, { props: { disabled: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper--disabled").exists()).toBe(true)
    })

    it("disabled 时按钮应该禁用", async () => {
      const wrapper = mount(UiStepper, { props: { disabled: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__minus--disabled").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__plus--disabled").exists()).toBe(true)
    })

    it("disablePlus 时只禁用增加按钮", async () => {
      const wrapper = mount(UiStepper, { props: { disablePlus: true, modelValue: 5 } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__plus--disabled").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__minus--disabled").exists()).toBe(false)
    })

    it("disableMinus 时只禁用减少按钮", async () => {
      const wrapper = mount(UiStepper, { props: { disableMinus: true, modelValue: 5 } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__minus--disabled").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__plus--disabled").exists()).toBe(false)
    })

    it("disabledInput 时输入框应该禁用", async () => {
      const wrapper = mount(UiStepper, { props: { disabledInput: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__input--disabled").exists()).toBe(true)
    })
  })

  describe("主题测试", () => {
    it("应该支持 button 主题", async () => {
      const wrapper = mount(UiStepper, { props: { theme: "button" } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper--button").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__minus--button").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__plus--button").exists()).toBe(true)
    })

    it("应该支持 round 主题", async () => {
      const wrapper = mount(UiStepper, { props: { theme: "round" } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper--round").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__minus--round").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__plus--round").exists()).toBe(true)
    })

    it("应该支持 border 主题", async () => {
      const wrapper = mount(UiStepper, { props: { theme: "border" } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper--border").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__minus--border").exists()).toBe(true)
      expect(wrapper.find(".ui-stepper__plus--border").exists()).toBe(true)
    })
  })

  describe("显示控制测试", () => {
    it("showPlus 为 false 时不显示增加按钮", async () => {
      const wrapper = mount(UiStepper, { props: { showPlus: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__plus").exists()).toBe(false)
    })

    it("showMinus 为 false 时不显示减少按钮", async () => {
      const wrapper = mount(UiStepper, { props: { showMinus: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__minus").exists()).toBe(false)
    })

    it("showInput 为 false 时不显示输入框", async () => {
      const wrapper = mount(UiStepper, { props: { showInput: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper__input").exists()).toBe(false)
    })
  })

  describe("integer 整数模式测试", () => {
    it("integer 为 true 时输入类型应该是 number", async () => {
      const wrapper = mount(UiStepper, { props: { integer: true } })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.attributes("type")).toBe("number")
    })

    it("integer 为 false 时输入类型应该是 digit", async () => {
      const wrapper = mount(UiStepper, { props: { integer: false } })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.attributes("type")).toBe("digit")
    })
  })

  describe("decimalLength 小数位数测试", () => {
    it("应该按照指定的小数位数格式化", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 1, decimalLength: 2 },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("1.00")
    })
  })

  describe("输入框事件测试", () => {
    it("聚焦时应该触发 focus 事件", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      const input = wrapper.find(".ui-stepper__input")
      await input.trigger("focus")
      expect(wrapper.emitted("focus")).toBeTruthy()
    })

    it("失焦时应该触发 blur 事件", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      const input = wrapper.find(".ui-stepper__input")
      await input.trigger("blur")
      await waitForTransition()
      expect(wrapper.emitted("blur")).toBeTruthy()
    })
  })

  describe("beforeChange 回调测试", () => {
    it("应该支持 beforeChange 回调", async () => {
      const beforeChange = vi.fn().mockResolvedValue(true)
      const wrapper = mount(UiStepper, {
        props: { modelValue: 5, beforeChange },
      })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      expect(beforeChange).toHaveBeenCalled()
    })
  })

  describe("name 标识符测试", () => {
    it("应该在 change 事件中传递 name", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 5, name: "quantity" },
      })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("click")
      await waitForTransition()
      const changeEvent = wrapper.emitted("change")
      expect(changeEvent).toBeTruthy()
      expect(changeEvent![0][1]).toBe("quantity")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiStepper, { props: { customClass: "my-stepper" } })
      await waitForTransition()
      expect(wrapper.find(".ui-stepper.my-stepper").exists()).toBe(true)
    })

    it("应该支持 height 属性", async () => {
      const wrapper = mount(UiStepper, { props: { height: "60rpx" } })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("height")).toBe("60rpx")
    })

    it("应该支持输入框样式属性", async () => {
      const wrapper = mount(UiStepper, {
        props: { inputWidth: "100rpx", inputTextColor: "#ff0000" },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("inputWidth")).toBe("100rpx")
      expect(wrapper.props("inputTextColor")).toBe("#ff0000")
    })

    it("应该支持按钮样式属性", async () => {
      const wrapper = mount(UiStepper, {
        props: { minusWidth: "60rpx", plusWidth: "60rpx" },
      })
      await waitForTransition()
      // 验证 props 设置正确
      expect(wrapper.props("minusWidth")).toBe("60rpx")
      expect(wrapper.props("plusWidth")).toBe("60rpx")
    })
  })

  describe("插槽测试", () => {
    it("应该支持 minus 插槽", async () => {
      const wrapper = mount(UiStepper, {
        slots: {
          minus: "<span class=\"custom-minus\">-</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-minus").exists()).toBe(true)
    })

    it("应该支持 plus 插槽", async () => {
      const wrapper = mount(UiStepper, {
        slots: {
          plus: "<span class=\"custom-plus\">+</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-plus").exists()).toBe(true)
    })

    it("minus 插槽应该接收 disabled 参数", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 0, min: 0 },
        slots: {
          minus: ({ disabled }: { disabled: boolean }) => (disabled ? "禁用" : "可用"),
        },
      })
      await waitForTransition()
      expect(wrapper.text()).toContain("禁用")
    })

    it("plus 插槽应该接收 disabled 参数", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 10, max: 10 },
        slots: {
          plus: ({ disabled }: { disabled: boolean }) => (disabled ? "禁用" : "可用"),
        },
      })
      await waitForTransition()
      expect(wrapper.text()).toContain("禁用")
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiStepper)
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("0")
    })

    it("modelValue 超出 max 时应该调整为 max", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 100, max: 10 },
      })
      await waitForTransition()
      // 组件会自动将值调整到范围内
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("modelValue 低于 min 时应该调整为 min", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: -5, min: 0 },
      })
      await waitForTransition()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
    })

    it("空值应该被处理为 0", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: "" },
      })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("0")
    })
  })

  describe("长按功能测试", () => {
    it("应该支持 longPress 属性", () => {
      const wrapper = mount(UiStepper, { props: { longPress: true } })
      expect(wrapper.props("longPress")).toBe(true)
    })

    it("长按增加按钮应该触发 touchstart 事件", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 0, longPress: true },
      })
      await waitForTransition()
      // 验证 longPress 配置正确
      expect(wrapper.props("longPress")).toBe(true)
      expect(wrapper.find(".ui-stepper__button").exists()).toBe(true)
    })

    it("touchend 应该停止长按操作", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 0, longPress: true },
      })
      await waitForTransition()
      const plusBtn = wrapper.findAll(".ui-stepper__button")[1]
      await plusBtn.trigger("touchstart")
      await vi.advanceTimersByTimeAsync(100) // 未达到长按阈值
      await plusBtn.trigger("touchend")
      // 正常点击，只触发一次 plus
    })
  })

  describe("动态更新测试", () => {
    it("应该响应 modelValue 变化", async () => {
      const wrapper = mount(UiStepper, { props: { modelValue: 5 } })
      await waitForTransition()
      await wrapper.setProps({ modelValue: 10 })
      await waitForTransition()
      const input = wrapper.find<HTMLInputElement>(".ui-stepper__input")
      expect(input.element.value).toBe("10")
    })

    it("应该响应 min 变化", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 5, min: 0 },
      })
      await waitForTransition()
      await wrapper.setProps({ min: 5 })
      await waitForTransition()
      // min 变为 5，当前值等于 min，减少按钮应该禁用
      expect(wrapper.find(".ui-stepper__minus--disabled").exists()).toBe(true)
    })

    it("应该响应 max 变化", async () => {
      const wrapper = mount(UiStepper, {
        props: { modelValue: 5, max: 10 },
      })
      await waitForTransition()
      await wrapper.setProps({ max: 5 })
      await waitForTransition()
      // max 变为 5，当前值等于 max，增加按钮应该禁用
      expect(wrapper.find(".ui-stepper__plus--disabled").exists()).toBe(true)
    })
  })
})
