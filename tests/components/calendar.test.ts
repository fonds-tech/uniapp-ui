/**
 * ui-calendar 组件单元测试
 * 测试日历组件的基础渲染、事件和格式化逻辑
 */

import UiCalendar from "@/uni_modules/uniapp-ui/ui-calendar/ui-calendar.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { formatDate } from "@/uni_modules/uniapp-ui/utils/date"
import { it, expect, describe } from "vitest"

describe("ui-calendar 日历组件", () => {
  const baseStubs = {
    "ui-icon": true,
    "ui-button": true,
  }

  it("应正确渲染基础结构", () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
      },
      global: {
        stubs: baseStubs,
      },
    })

    expect(wrapper.find(".ui-calendar").exists()).toBe(true)
    expect(wrapper.findAll(".ui-calendar__weekday").length).toBe(7)
  })

  it("点击日期应触发 select 事件", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
      },
      global: {
        stubs: baseStubs,
      },
    })

    const days = wrapper.findAll(".ui-calendar__day")
    expect(days.length).toBeGreaterThan(0)

    await days[0].trigger("click")

    const emitted = wrapper.emitted("select")
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]?.[0]).toHaveProperty("dateStr")
  })

  it("弹层模式点击关闭应触发 update:show", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: true,
        show: true,
        closeable: true,
        showConfirm: false,
      },
      global: {
        stubs: {
          ...baseStubs,
          "ui-popup": {
            template: "<div class=\"ui-popup\"><slot /></div>",
          },
        },
      },
    })

    const close = wrapper.find(".ui-calendar__close")
    expect(close.exists()).toBe(true)

    await close.trigger("click")
    expect(wrapper.emitted("update:show")?.[0]).toEqual([false])
  })

  it("formatter 应注入自定义 className", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
        formatter: (day) => ({
          ...day,
          className: "custom-day",
        }),
      },
      global: {
        stubs: baseStubs,
      },
    })

    await nextTick()

    expect(wrapper.find(".custom-day").exists()).toBe(true)
  })

  it("readonly 模式下点击不应触发 select", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
        readonly: true,
      },
      global: {
        stubs: baseStubs,
      },
    })

    const days = wrapper.findAll(".ui-calendar__day")
    await days[0].trigger("click")

    expect(wrapper.emitted("select")).toBeFalsy()
  })

  it("range 模式超出 maxRange 应触发 overRange", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        type: "range",
        maxRange: 3,
        rangePrompt: "超出范围",
        showConfirm: false,
        showSubtitle: false,
      },
      global: {
        stubs: baseStubs,
      },
    })

    const days = wrapper.findAll(".ui-calendar__day")
    await days[0].trigger("click")
    await days[10].trigger("click")

    expect(wrapper.emitted("overRange")).toBeTruthy()
    expect((uni as any).showToast).toHaveBeenCalled()
  })

  it("showConfirm 为 true 且未选择时应显示禁用文案", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: true,
        confirmDisabledText: "请选择日期",
        showSubtitle: false,
      },
      global: {
        stubs: {
          "ui-icon": true,
          "ui-button": {
            name: "ui-button",
            props: ["disabled"],
            template: "<button class=\"ui-button-stub\"><slot /></button>",
          },
        },
      },
    })

    await nextTick()

    expect(wrapper.find(".ui-button-stub").text()).toContain("请选择日期")
  })

  it("markedDates 应渲染标记点", async () => {
    const today = formatDate(new Date())
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
        markedDates: [today],
      },
      global: {
        stubs: baseStubs,
      },
    })

    await nextTick()

    expect(wrapper.find(".ui-calendar__day-dot").exists()).toBe(true)
  })

  it("showMark 为 true 时应显示水印", async () => {
    const wrapper = mount(UiCalendar, {
      props: {
        poppable: false,
        showConfirm: false,
        showSubtitle: false,
        showMark: true,
      },
      global: {
        stubs: baseStubs,
      },
    })

    await nextTick()

    expect(wrapper.find(".ui-calendar__mark").exists()).toBe(true)
  })
})
