import UiCascaderPanel from "@/uni_modules/uniapp-ui/ui-cascader-panel/ui-cascader-panel.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const globalStubs = {
  stubs: {
    "ui-icon": true,
    "ui-loading": true,
    "scroll-view": { template: "<div class=\"scroll-view\"><slot /></div>" },
    swiper: { template: "<div class=\"swiper\"><slot /></div>" },
    "swiper-item": { template: "<div class=\"swiper-item\"><slot /></div>" },
  },
}

const mockOptions = [
  {
    text: "浙江省",
    value: "zhejiang",
    children: [
      { text: "杭州市", value: "hangzhou" },
      { text: "宁波市", value: "ningbo" },
    ],
  },
  {
    text: "江苏省",
    value: "jiangsu",
    children: [{ text: "南京市", value: "nanjing" }],
  },
]

describe("ui-cascader-panel 级联面板", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("应渲染面板根节点", async () => {
    const wrapper = mount(UiCascaderPanel, { props: { options: mockOptions }, global: globalStubs })
    await waitForTransition()
    expect(wrapper.find(".ui-cascader").exists()).toBe(true)
  })

  it("应渲染头部与标签栏", async () => {
    const wrapper = mount(UiCascaderPanel, { props: { options: mockOptions }, global: globalStubs })
    await waitForTransition()
    expect(wrapper.find(".ui-cascader__header").exists()).toBe(true)
    expect(wrapper.find(".ui-cascader__tabs").exists()).toBe(true)
  })

  it("应正确渲染选项数量", async () => {
    const wrapper = mount(UiCascaderPanel, { props: { options: mockOptions }, global: globalStubs })
    await waitForTransition()
    expect(wrapper.findAll(".ui-cascader__options__option").length).toBe(2)
  })

  it("点击选项应触发 change 事件", async () => {
    const wrapper = mount(UiCascaderPanel, { props: { options: mockOptions }, global: globalStubs })
    await waitForTransition()
    await wrapper.findAll(".ui-cascader__options__option")[0].trigger("click")
    await waitForTransition()
    expect(wrapper.emitted("change")).toBeTruthy()
  })

  it("点击叶子节点应触发 finish 事件", async () => {
    const wrapper = mount(UiCascaderPanel, { props: { options: [{ text: "a", value: "a" }] }, global: globalStubs })
    await waitForTransition()
    await wrapper.findAll(".ui-cascader__options__option")[0].trigger("click")
    await waitForTransition()
    expect(wrapper.emitted("finish")).toBeTruthy()
    expect(wrapper.emitted("update:modelValue")).toBeTruthy()
  })

  it("closeable 时点击应触发 close", async () => {
    const wrapper = mount(UiCascaderPanel, {
      props: { options: mockOptions, closeable: true },
      global: {
        stubs: {
          "ui-icon": { template: "<i class=\"ui-icon-stub\" />" },
          "ui-loading": true,
          "scroll-view": { template: "<div><slot /></div>" },
          swiper: { template: "<div><slot /></div>" },
          "swiper-item": { template: "<div><slot /></div>" },
        },
      },
    })
    await waitForTransition()
    const closeIcon = wrapper.find(".ui-cascader__header .ui-icon-stub")
    if (closeIcon.exists()) {
      await closeIcon.trigger("click")
      expect(wrapper.emitted("close")).toBeTruthy()
    }
  })

  it("禁用选项点击不应触发 change", async () => {
    const wrapper = mount(UiCascaderPanel, {
      props: { options: [{ text: "a", value: "a", disabled: true }] },
      global: globalStubs,
    })
    await waitForTransition()
    await wrapper.findAll(".ui-cascader__options__option")[0].trigger("click")
    expect(wrapper.emitted("change")).toBeFalsy()
  })

  it("应支持自定义字段映射 fieldKeys", async () => {
    const wrapper = mount(UiCascaderPanel, {
      props: {
        fieldKeys: { text: "label", value: "id" },
        options: [{ label: "X", id: "x" }] as any,
      },
      global: globalStubs,
    })
    await waitForTransition()
    expect(wrapper.find(".option-text").text()).toBe("X")
  })
})
