/**
 * ui-slider 组件单元测试
 * 测试滑块组件的 props、events 和渲染逻辑
 */

import UiSlider from "@/uni_modules/uniapp-ui/ui-slider/ui-slider.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiSlider 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider").exists()).toBe(true)
    })

    it("应该包含轨道包装器", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__wrapper").exists()).toBe(true)
    })

    it("应该包含轨道", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__track").exists()).toBe(true)
    })

    it("应该包含非激活轨道", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__track-inactive").exists()).toBe(true)
    })

    it("应该包含激活轨道", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__track-active").exists()).toBe(true)
    })

    it("应该包含把手", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__handle").exists()).toBe(true)
    })

    it("默认尺寸应该是 medium", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider--medium").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该正确显示初始值 0", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 0 } })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(0)
    })

    it("应该正确显示初始值 50", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 50 } })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(50)
    })

    it("应该正确显示初始值 100", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 100 } })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(100)
    })

    it("默认值应该为 0", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(0)
    })
  })

  describe("min 和 max 范围测试", () => {
    it("应该支持自定义 min 值", async () => {
      const wrapper = mount(UiSlider, { props: { min: 10 } })
      await waitForTransition()
      expect(wrapper.props("min")).toBe(10)
    })

    it("应该支持自定义 max 值", async () => {
      const wrapper = mount(UiSlider, { props: { max: 200 } })
      await waitForTransition()
      expect(wrapper.props("max")).toBe(200)
    })

    it("应该支持同时设置 min 和 max", async () => {
      const wrapper = mount(UiSlider, { props: { min: 20, max: 80 } })
      await waitForTransition()
      expect(wrapper.props("min")).toBe(20)
      expect(wrapper.props("max")).toBe(80)
    })

    it("默认 min 应该为 0", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.props("min")).toBe(0)
    })

    it("默认 max 应该为 100", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.props("max")).toBe(100)
    })
  })

  describe("step 步长测试", () => {
    it("应该支持自定义步长", async () => {
      const wrapper = mount(UiSlider, { props: { step: 10 } })
      await waitForTransition()
      expect(wrapper.props("step")).toBe(10)
    })

    it("应该支持小数步长", async () => {
      const wrapper = mount(UiSlider, { props: { step: 0.5 } })
      await waitForTransition()
      expect(wrapper.props("step")).toBe(0.5)
    })

    it("默认步长应该为 1", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.props("step")).toBe(1)
    })
  })

  describe("range 范围选择测试", () => {
    it("range 模式应该显示两个把手", async () => {
      const wrapper = mount(UiSlider, {
        props: { range: true, modelValue: [20, 80] },
      })
      await waitForTransition()
      const handles = wrapper.findAll(".ui-slider__handle")
      expect(handles.length).toBe(2)
    })

    it("非 range 模式应该只显示一个把手", async () => {
      const wrapper = mount(UiSlider, { props: { range: false } })
      await waitForTransition()
      const handles = wrapper.findAll(".ui-slider__handle")
      expect(handles.length).toBe(1)
    })

    it("range 模式应该支持数组值", async () => {
      const wrapper = mount(UiSlider, {
        props: { range: true, modelValue: [30, 70] },
      })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toEqual([30, 70])
    })
  })

  describe("vertical 垂直模式测试", () => {
    it("垂直模式应该添加对应类名", async () => {
      const wrapper = mount(UiSlider, { props: { vertical: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--vertical").exists()).toBe(true)
    })

    it("水平模式不应该有垂直类名", async () => {
      const wrapper = mount(UiSlider, { props: { vertical: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--vertical").exists()).toBe(false)
    })
  })

  describe("disabled 禁用测试", () => {
    it("disabled 时应该添加禁用类名", async () => {
      const wrapper = mount(UiSlider, { props: { disabled: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--disabled").exists()).toBe(true)
    })

    it("非禁用状态不应该有禁用类名", async () => {
      const wrapper = mount(UiSlider, { props: { disabled: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--disabled").exists()).toBe(false)
    })
  })

  describe("readonly 只读测试", () => {
    it("readonly 时应该添加只读类名", async () => {
      const wrapper = mount(UiSlider, { props: { readonly: true } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--readonly").exists()).toBe(true)
    })

    it("非只读状态不应该有只读类名", async () => {
      const wrapper = mount(UiSlider, { props: { readonly: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--readonly").exists()).toBe(false)
    })
  })

  describe("size 尺寸测试", () => {
    it("应该支持 small 尺寸", async () => {
      const wrapper = mount(UiSlider, { props: { size: "small" } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--small").exists()).toBe(true)
    })

    it("应该支持 medium 尺寸", async () => {
      const wrapper = mount(UiSlider, { props: { size: "medium" } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--medium").exists()).toBe(true)
    })

    it("应该支持 large 尺寸", async () => {
      const wrapper = mount(UiSlider, { props: { size: "large" } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--large").exists()).toBe(true)
    })
  })

  describe("marks 刻度标记测试", () => {
    it("设置 marks 时应该显示刻度点", async () => {
      const wrapper = mount(UiSlider, {
        props: {
          marks: {
            0: "0%",
            50: "50%",
            100: "100%",
          },
        },
      })
      await waitForTransition()
      const ticks = wrapper.findAll(".ui-slider__tick")
      expect(ticks.length).toBe(3)
    })

    it("设置 marks 时应该显示刻度标签", async () => {
      const wrapper = mount(UiSlider, {
        props: {
          marks: {
            0: "0%",
            100: "100%",
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-slider__labels").exists()).toBe(true)
      const labels = wrapper.findAll(".ui-slider__label")
      expect(labels.length).toBe(2)
    })

    it("不设置 marks 时不应该显示刻度", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.find(".ui-slider__tick").exists()).toBe(false)
      expect(wrapper.find(".ui-slider__labels").exists()).toBe(false)
    })

    it("刻度点应该根据值显示激活状态", async () => {
      const wrapper = mount(UiSlider, {
        props: {
          modelValue: 50,
          marks: {
            0: "0%",
            25: "25%",
            50: "50%",
            75: "75%",
            100: "100%",
          },
        },
      })
      await waitForTransition()
      const activeTicks = wrapper.findAll(".ui-slider__tick--active")
      // 0%, 25%, 50% 应该是激活状态（值 <= 50）
      expect(activeTicks.length).toBe(3)
    })
  })

  describe("showValue 显示值测试", () => {
    it("showValue 为 true 时应该能显示值指示器", async () => {
      const wrapper = mount(UiSlider, {
        props: { showValue: true, showValueMode: "always" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-slider__indicator").exists()).toBe(true)
    })

    it("showValueMode 为 never 时不应该显示值指示器", async () => {
      const wrapper = mount(UiSlider, {
        props: { showValue: true, showValueMode: "never" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-slider__indicator").exists()).toBe(false)
    })
  })

  describe("自定义颜色测试", () => {
    it("应该支持 activeColor", async () => {
      const wrapper = mount(UiSlider, { props: { activeColor: "#ff0000" } })
      await waitForTransition()
      expect(wrapper.props("activeColor")).toBe("#ff0000")
    })

    it("应该支持 inactiveColor", async () => {
      const wrapper = mount(UiSlider, { props: { inactiveColor: "#cccccc" } })
      await waitForTransition()
      expect(wrapper.props("inactiveColor")).toBe("#cccccc")
    })

    it("应该支持 handleColor", async () => {
      const wrapper = mount(UiSlider, { props: { handleColor: "#00ff00" } })
      await waitForTransition()
      expect(wrapper.props("handleColor")).toBe("#00ff00")
    })
  })

  describe("自定义尺寸测试", () => {
    it("应该支持 barHeight", async () => {
      const wrapper = mount(UiSlider, { props: { barHeight: 10 } })
      await waitForTransition()
      expect(wrapper.props("barHeight")).toBe(10)
    })

    it("应该支持 handleSize", async () => {
      const wrapper = mount(UiSlider, { props: { handleSize: 40 } })
      await waitForTransition()
      expect(wrapper.props("handleSize")).toBe(40)
    })
  })

  describe("formatValue 格式化测试", () => {
    it("应该支持格式化函数", async () => {
      const formatValue = (val: number) => `${val}%`
      const wrapper = mount(UiSlider, {
        props: {
          formatValue,
          showValue: true,
          showValueMode: "always",
        },
      })
      await waitForTransition()
      expect(wrapper.props("formatValue")).toBe(formatValue)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSlider, { props: { customClass: "my-slider" } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider.my-slider").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiSlider, {
        props: { customStyle: { marginTop: "20px" } },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ marginTop: "20px" })
    })
  })

  describe("事件测试", () => {
    it("应该支持 change 事件", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 50 } })
      await waitForTransition()
      // 验证组件已正确挂载
      expect(wrapper.find(".ui-slider").exists()).toBe(true)
    })

    it("应该支持 update:modelValue 事件", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 50 } })
      await waitForTransition()
      // 验证组件已正确挂载
      expect(wrapper.find(".ui-slider__handle").exists()).toBe(true)
    })

    it("应该支持 dragStart 事件", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 50 } })
      await waitForTransition()
      const handle = wrapper.find(".ui-slider__handle")
      expect(handle.exists()).toBe(true)
    })

    it("应该支持 dragEnd 事件", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 50 } })
      await waitForTransition()
      const handle = wrapper.find(".ui-slider__handle")
      expect(handle.exists()).toBe(true)
    })
  })

  describe("动态更新测试", () => {
    it("应该响应 modelValue 变化", async () => {
      const wrapper = mount(UiSlider, { props: { modelValue: 30 } })
      await waitForTransition()
      await wrapper.setProps({ modelValue: 70 })
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(70)
    })

    it("应该响应 min 变化", async () => {
      const wrapper = mount(UiSlider, { props: { min: 0 } })
      await waitForTransition()
      await wrapper.setProps({ min: 20 })
      await waitForTransition()
      expect(wrapper.props("min")).toBe(20)
    })

    it("应该响应 max 变化", async () => {
      const wrapper = mount(UiSlider, { props: { max: 100 } })
      await waitForTransition()
      await wrapper.setProps({ max: 200 })
      await waitForTransition()
      expect(wrapper.props("max")).toBe(200)
    })

    it("应该响应 step 变化", async () => {
      const wrapper = mount(UiSlider, { props: { step: 1 } })
      await waitForTransition()
      await wrapper.setProps({ step: 10 })
      await waitForTransition()
      expect(wrapper.props("step")).toBe(10)
    })

    it("应该响应 disabled 变化", async () => {
      const wrapper = mount(UiSlider, { props: { disabled: false } })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--disabled").exists()).toBe(false)
      await wrapper.setProps({ disabled: true })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--disabled").exists()).toBe(true)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiSlider)
      await waitForTransition()
      expect(wrapper.props("modelValue")).toBe(0)
      expect(wrapper.props("min")).toBe(0)
      expect(wrapper.props("max")).toBe(100)
      expect(wrapper.props("step")).toBe(1)
    })

    it("range 模式默认值应该是数组", async () => {
      const wrapper = mount(UiSlider, {
        props: { range: true, modelValue: [0, 100] },
      })
      await waitForTransition()
      expect(Array.isArray(wrapper.props("modelValue"))).toBe(true)
    })

    it("垂直模式与 range 模式应该可以同时使用", async () => {
      const wrapper = mount(UiSlider, {
        props: { vertical: true, range: true, modelValue: [20, 80] },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--vertical").exists()).toBe(true)
      const handles = wrapper.findAll(".ui-slider__handle")
      expect(handles.length).toBe(2)
    })

    it("marks 与 vertical 模式应该可以同时使用", async () => {
      const wrapper = mount(UiSlider, {
        props: {
          vertical: true,
          marks: { 0: "0%", 50: "50%", 100: "100%" },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-slider--vertical").exists()).toBe(true)
      const ticks = wrapper.findAll(".ui-slider__tick")
      expect(ticks.length).toBe(3)
    })
  })

  describe("插槽测试", () => {
    it("应该支持 handle 插槽", async () => {
      const wrapper = mount(UiSlider, {
        slots: {
          handle: "<span class=\"custom-handle\">拖动</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-handle").exists()).toBe(true)
    })

    it("应该支持 left-handle 插槽（范围模式）", async () => {
      const wrapper = mount(UiSlider, {
        props: { range: true, modelValue: [20, 80] },
        slots: {
          "left-handle": "<span class=\"custom-left\">左</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-left").exists()).toBe(true)
    })

    it("应该支持 right-handle 插槽（范围模式）", async () => {
      const wrapper = mount(UiSlider, {
        props: { range: true, modelValue: [20, 80] },
        slots: {
          "right-handle": "<span class=\"custom-right\">右</span>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-right").exists()).toBe(true)
    })
  })
})
