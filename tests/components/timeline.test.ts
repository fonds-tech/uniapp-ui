/**
 * ui-timeline 与 ui-timeline-item 组件单元测试
 * 测试时间轴容器与节点的渲染、布局与事件
 */

import UiTimeline from "@/uni_modules/uniapp-ui/ui-timeline/ui-timeline.vue"
import UiTimelineItem from "@/uni_modules/uniapp-ui/ui-timeline-item/ui-timeline-item.vue"
import { h } from "vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-timeline 时间轴组件", () => {
  it("应正确渲染默认模式", () => {
    const wrapper = mount(UiTimeline, {
      props: { mode: "left" },
      slots: {
        default: h(UiTimelineItem, { title: "节点1" }),
      },
    })

    expect(wrapper.find(".ui-timeline").exists()).toBe(true)
    expect(wrapper.find(".ui-timeline--left").exists()).toBe(true)
  })

  it("reverse 为 true 时应添加反转类名", () => {
    const wrapper = mount(UiTimeline, {
      props: { reverse: true },
      slots: {
        default: h(UiTimelineItem, { title: "节点1" }),
      },
    })

    expect(wrapper.find(".ui-timeline--reverse").exists()).toBe(true)
  })

  it("alternate 模式下应交替布局", () => {
    const wrapper = mount(UiTimeline, {
      props: { mode: "alternate" },
      slots: {
        default: [h(UiTimelineItem, { title: "节点1" }), h(UiTimelineItem, { title: "节点2" })],
      },
    })

    const items = wrapper.findAll(".ui-timeline-item")
    expect(items.length).toBe(2)
    expect(items[0].classes()).toContain("ui-timeline-item--left")
    expect(items[1].classes()).toContain("ui-timeline-item--right")
  })

  it("节点类型与空心状态应生效", () => {
    const wrapper = mount(UiTimeline, {
      slots: {
        default: h(UiTimelineItem, { title: "节点1", type: "success", hollow: true }),
      },
    })

    const item = wrapper.find(".ui-timeline-item")
    expect(item.classes()).toContain("ui-timeline-item--success")
    expect(item.classes()).toContain("ui-timeline-item--hollow")
    expect(item.classes()).toContain("ui-timeline-item--first")
    expect(item.classes()).toContain("ui-timeline-item--last")
  })

  it("点击节点应触发 clickItem 事件", async () => {
    const wrapper = mount(UiTimeline, {
      slots: {
        default: [h(UiTimelineItem, { title: "节点1" }), h(UiTimelineItem, { title: "节点2" })],
      },
    })

    const items = wrapper.findAllComponents(UiTimelineItem)
    await items[1].trigger("click")

    expect(wrapper.emitted("clickItem")?.[0]).toEqual([1])
    expect(items[1].emitted("click")?.[0]).toEqual([1])
  })

  it("应支持自定义类名与样式", () => {
    const wrapper = mount(UiTimeline, {
      props: {
        customClass: "my-timeline",
        customStyle: { marginTop: "10px" },
      },
      slots: {
        default: h(UiTimelineItem, { title: "节点1" }),
      },
    })

    expect(wrapper.classes()).toContain("my-timeline")
    expect(wrapper.attributes("style")).toContain("margin-top")
  })

  it("lineStyle 为 dashed 时应渲染虚线", () => {
    const wrapper = mount(UiTimeline, {
      props: {
        lineStyle: "dashed",
        lineColor: "#ff0000",
      },
      slots: {
        default: [h(UiTimelineItem, { title: "节点1" }), h(UiTimelineItem, { title: "节点2" })],
      },
    })

    const line = wrapper.find(".ui-timeline-item__line--after")
    expect(line.attributes("style")).toContain("border-left-style: dashed")
    expect(line.attributes("style")).toContain("border-left-color")
  })
})
