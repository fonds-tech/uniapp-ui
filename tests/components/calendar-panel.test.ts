import UiCalendarPanel from "@/uni_modules/uniapp-ui/ui-calendar-panel/ui-calendar-panel.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { formatDate } from "@/uni_modules/uniapp-ui/utils/date"
import { it, expect, describe } from "vitest"

describe("ui-calendar-panel 日历面板", () => {
  it("应渲染日历日期网格", async () => {
    const wrapper = mount(UiCalendarPanel, {
      props: { showSubtitle: false, showConfirm: false },
      global: {
        stubs: { "ui-icon": true, "ui-button": true },
      },
    })

    await nextTick()

    expect(wrapper.findAll(".ui-calendar__day").length).toBeGreaterThan(0)
  })

  it("点击日期应触发 select 事件 (single 模式)", async () => {
    const today = formatDate(new Date())
    const wrapper = mount(UiCalendarPanel, {
      props: { type: "single", showSubtitle: false, showConfirm: false },
      global: {
        stubs: { "ui-icon": true, "ui-button": true },
      },
    })

    await nextTick()

    const days = wrapper.findAll(".ui-calendar__day")
    const todayCell = days.find((d) => d.text() === String(Number.parseInt(today.split("-")[2], 10)))
    if (todayCell) {
      await todayCell.trigger("click")
      expect(wrapper.emitted("select")).toBeTruthy()
    }
  })

  it("readonly 时点击不应触发 select", async () => {
    const wrapper = mount(UiCalendarPanel, {
      props: { readonly: true, showSubtitle: false, showConfirm: false },
      global: {
        stubs: { "ui-icon": true, "ui-button": true },
      },
    })

    await nextTick()

    const day = wrapper.findAll(".ui-calendar__day")[10]
    if (day) {
      await day.trigger("click")
      expect(wrapper.emitted("select")).toBeFalsy()
    }
  })

  it("closeable 为 true 时点击关闭应触发 close 事件", async () => {
    const wrapper = mount(UiCalendarPanel, {
      props: { closeable: true, showSubtitle: false, showConfirm: false },
      global: {
        stubs: {
          "ui-icon": { template: "<i class=\"ui-icon-stub\" />" },
          "ui-button": true,
        },
      },
    })

    await nextTick()

    await wrapper.find(".ui-calendar__close").trigger("click")
    expect(wrapper.emitted("close")).toBeTruthy()
  })

  it("月份切换应触发 monthChange 事件", async () => {
    const wrapper = mount(UiCalendarPanel, {
      props: { showSubtitle: true, showConfirm: false },
      global: {
        stubs: {
          "ui-icon": { template: "<i class=\"ui-icon-stub\" />" },
          "ui-button": true,
        },
      },
    })

    await nextTick()

    const navs = wrapper.findAll(".ui-calendar__nav")
    await navs[2].trigger("click")
    expect(wrapper.emitted("monthChange")).toBeTruthy()
  })
})
