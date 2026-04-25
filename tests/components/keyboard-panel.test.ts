import UiKeyboardPanel from "@/uni_modules/uniapp-ui/ui-keyboard-panel/ui-keyboard-panel.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const stubs = {
  stubs: {
    "ui-icon": true,
    "ui-button": {
      props: ["textColor", "textSize", "textWeight"],
      template: "<button class=\"ui-button-stub\"><slot /></button>",
    },
  },
}

describe("ui-keyboard-panel 键盘面板", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("应渲染数字键盘", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number" }, global: stubs })
    await nextTick()
    expect(wrapper.find(".ui-keyboard").exists()).toBe(true)
    expect(wrapper.findAll(".ui-keyboard__keys__key").length).toBeGreaterThan(0)
  })

  it("点击数字键应触发 input/change/update:modelValue", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number" }, global: stubs })
    await nextTick()
    const keys = wrapper.findAll(".ui-keyboard__keys__key")
    await keys[0].trigger("click")
    expect(wrapper.emitted("input")).toBeTruthy()
    expect(wrapper.emitted("change")).toBeTruthy()
    expect(wrapper.emitted("update:modelValue")).toBeTruthy()
  })

  it("show-dot 时应显示小数点键", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number", showDot: true }, global: stubs })
    await nextTick()
    const dotKey = wrapper.findAll(".ui-keyboard__keys__key").find((k) => k.text() === ".")
    expect(dotKey).toBeTruthy()
  })

  it("达到 maxlength 时输入键应禁用", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number", maxlength: 1, modelValue: "1" }, global: stubs })
    await nextTick()
    const numericKeys = wrapper.findAll(".ui-keyboard__keys__key").filter((k) => /^\d$/.test(k.text()))
    expect(numericKeys.every((k) => k.classes("is-disabled"))).toBe(true)
  })

  it("number 模式 showDot=false 时第 10 个键应为 close 类型", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number", showDot: false }, global: stubs })
    await nextTick()
    const keys = wrapper.findAll(".ui-keyboard__keys__key")
    expect(keys[9].findComponent({ name: "ui-icon" }).exists()).toBe(true)
  })

  it("点击取消按钮应触发 cancel 事件", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number" }, global: stubs })
    await nextTick()
    await wrapper.findAll(".ui-button-stub")[0].trigger("click")
    expect(wrapper.emitted("cancel")).toBeTruthy()
  })

  it("点击确认按钮应触发 confirm 事件", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number" }, global: stubs })
    await nextTick()
    const buttons = wrapper.findAll(".ui-button-stub")
    await buttons[buttons.length - 1].trigger("click")
    expect(wrapper.emitted("confirm")).toBeTruthy()
  })

  it("clear 方法应清空输入值", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "number", modelValue: "123" }, global: stubs })
    await nextTick()
    ;(wrapper.vm as any).clear()
    expect(wrapper.emitted("change")?.at(-1)).toEqual([""])
    expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([""])
  })

  it("car 模式应渲染车牌键盘", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "car" }, global: stubs })
    await nextTick()
    expect(wrapper.find(".ui-keyboard__keys--car").exists()).toBe(true)
  })

  it("card 模式应渲染身份证键盘", async () => {
    const wrapper = mount(UiKeyboardPanel, { props: { mode: "card" }, global: stubs })
    await nextTick()
    expect(wrapper.find(".ui-keyboard__keys--card").exists()).toBe(true)
    const xKey = wrapper.findAll(".ui-keyboard__keys__key").find((k) => k.text() === "X")
    expect(xKey).toBeTruthy()
  })
})
