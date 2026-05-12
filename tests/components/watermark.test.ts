import UiWatermark from "@/uni_modules/uniapp-ui/ui-watermark/ui-watermark.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-watermark 水印", () => {
  it("应正确渲染根节点 + 水印层 + slot", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: "test", fullPage: false },
      slots: { default: "<text>受保护内容</text>" },
    })
    expect(wrapper.find(".ui-watermark").exists()).toBe(true)
    expect(wrapper.find(".ui-watermark__layer").exists()).toBe(true)
    expect(wrapper.html()).toContain("受保护内容")
  })

  it("content 数组应支持多行", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: ["行1", "行2"], fullPage: false },
    })
    expect(wrapper.find(".ui-watermark").exists()).toBe(true)
  })

  it("默认 fullPage=true 时水印层应 fixed 全屏", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: "test" },
    })
    const style = wrapper.find(".ui-watermark__layer").attributes("style") || ""
    expect(style).toContain("position: fixed")
  })

  it("fullPage=false 时水印层应 absolute 局部", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: "test", fullPage: false },
    })
    const style = wrapper.find(".ui-watermark__layer").attributes("style") || ""
    expect(style).toContain("position: absolute")
  })

  it("应暴露 regenerate 方法", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: "test", fullPage: false },
    })
    expect(typeof wrapper.vm.regenerate).toBe("function")
  })

  it("应支持自定义 zIndex / opacity", () => {
    const wrapper = mount(UiWatermark, {
      props: { content: "test", fullPage: false, zIndex: 200, opacity: 0.5 },
    })
    const style = wrapper.find(".ui-watermark__layer").attributes("style") || ""
    expect(style).toContain("z-index: 200")
    expect(style).toContain("opacity: 0.5")
  })
})
