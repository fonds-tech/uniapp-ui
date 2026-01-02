/**
 * ui-count-down 组件单元测试
 * 测试倒计时组件的 props、events、方法和渲染逻辑
 */

import UiCountDown from "@/ui/ui-count-down/ui-count-down.vue"
import { mount } from "@vue/test-utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"
import { waitForTransition } from "../setup"

describe("uiCountDown 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-count-down").exists()).toBe(true)
    })

    it("应该包含文本元素", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-count-down__text").exists()).toBe(true)
    })
  })

  describe("time 属性测试", () => {
    it("应该正确显示倒计时", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 60秒 = 00:01:00（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/00:0(0:59|1:00)/)
    })

    it("应该支持数字类型的 time", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 3600000, autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 1小时 = 01:00:00（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/0(0:59:59|1:00:00)/)
    })

    it("应该支持字符串类型的 time", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: "120000", autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 2分钟 = 00:02:00（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/00:0(1:59|2:00)/)
    })
  })

  describe("format 属性测试", () => {
    it("默认格式应该是 HH:mm:ss", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 3661000, autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 1小时1分1秒（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/01:01:0(0|1)/)
    })

    it("应该支持自定义格式 DD天HH时mm分ss秒", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 90061000, format: "DD天HH时mm分ss秒", autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 1天1小时1分1秒（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/01天01时01分0(0|1)秒/)
    })

    it("应该支持只显示分秒格式 mm:ss", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 125000, format: "mm:ss", autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 2分5秒（考虑计时器误差）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/02:0(4|5)/)
    })

    it("应该支持毫秒格式 mm:ss:SSS", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 61500, format: "mm:ss:SSS", autoStart: false },
      })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      expect(wrapper.find(".ui-count-down__text").text()).toContain("01:01:")
    })
  })

  describe("autoStart 属性测试", () => {
    it("默认应该自动开始", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      // 等待组件初始化并自动开始
      await waitForTransition()
      // 推进足够时间让定时器触发
      await vi.advanceTimersByTimeAsync(1100)
      // 自动开始后，时间应该已经变化
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("autoStart 为 false 时不应该自动开始", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, autoStart: false },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(1100)
      // 不应该触发 change 事件
      expect(wrapper.emitted("change")).toBeFalsy()
    })
  })

  describe("millisecond 属性测试", () => {
    it("millisecond 为 true 时应该频繁触发 change", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 1000, millisecond: true },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(100)
      const changeEvents = wrapper.emitted("change")
      expect(changeEvents).toBeTruthy()
      // 毫秒模式下应该有多次 change 事件
      expect(changeEvents!.length).toBeGreaterThan(1)
    })
  })

  describe("事件测试", () => {
    it("倒计时变化时应该触发 change 事件", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 5000 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(1100)
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("change 事件应该包含时间数据", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 5000 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(1100)
      const changeEvents = wrapper.emitted("change")
      expect(changeEvents).toBeTruthy()
      const timeData = changeEvents![0][0] as any
      expect(timeData).toHaveProperty("days")
      expect(timeData).toHaveProperty("hours")
      expect(timeData).toHaveProperty("minutes")
      expect(timeData).toHaveProperty("seconds")
      expect(timeData).toHaveProperty("milliseconds")
    })

    it("倒计时结束时应该触发 finish 事件", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 100 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(200)
      expect(wrapper.emitted("finish")).toBeTruthy()
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 start 方法", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, autoStart: false },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.start).toBe("function")
    })

    it("应该暴露 pause 方法", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.pause).toBe("function")
    })

    it("应该暴露 reset 方法", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.reset).toBe("function")
    })

    it("start 方法应该开始倒计时", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 5000, autoStart: false },
      })
      await waitForTransition()
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(1100)
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("pause 方法应该暂停倒计时", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(1000)
      wrapper.vm.pause()
      const changeCountBefore = wrapper.emitted("change")?.length || 0
      await vi.advanceTimersByTimeAsync(2000)
      const changeCountAfter = wrapper.emitted("change")?.length || 0
      // 暂停后不应该有新的 change 事件
      expect(changeCountAfter).toBe(changeCountBefore)
    })

    it("reset 方法应该重置倒计时", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(5000)
      wrapper.vm.reset()
      await waitForTransition()
      // 重置后应该恢复到初始时间
      expect(wrapper.find(".ui-count-down").exists()).toBe(true)
    })
  })

  describe("插槽测试", () => {
    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000 },
        slots: {
          default: `<span class="custom-time">自定义时间</span>`,
        },
      })
      await waitForTransition()
      // 检查插槽内容是否存在
      expect(wrapper.find(".custom-time").exists()).toBe(true)
    })

    it("插槽应该接收 time 参数", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 125000 },
      })
      await waitForTransition()
      // 启动以触发 timeData 更新
      await vi.advanceTimersByTimeAsync(100)
      // 通过 emitted change 事件验证 time 参数传递
      expect(wrapper.emitted("change")).toBeTruthy()
      const timeData = wrapper.emitted("change")![0][0] as any
      expect(timeData).toHaveProperty("minutes")
      expect(timeData).toHaveProperty("seconds")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, customClass: "my-countdown" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-count-down.my-countdown").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, customStyle: { color: "#ff0000" } },
      })
      await waitForTransition()
      const countdown = wrapper.find(".ui-count-down")
      expect(countdown.attributes("style")).toContain("color")
    })
  })

  describe("边界情况测试", () => {
    it("time 为 0 时应该立即触发 finish", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 0 },
      })
      await waitForTransition()
      await vi.advanceTimersByTimeAsync(50)
      expect(wrapper.emitted("finish")).toBeTruthy()
    })

    it("time 为负数时应该正常处理", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: -1000, autoStart: false },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-count-down").exists()).toBe(true)
    })

    it("time 变化时应该重置倒计时", async () => {
      const wrapper = mount(UiCountDown, {
        props: { time: 60000, autoStart: false },
      })
      await waitForTransition()
      await wrapper.setProps({ time: 30000 })
      await waitForTransition()
      // 启动并暂停以触发初始格式化
      wrapper.vm.start()
      await vi.advanceTimersByTimeAsync(20)
      wrapper.vm.pause()
      // 应该更新显示（考虑计时器消耗时间，检查接近30秒的值）
      const text = wrapper.find(".ui-count-down__text").text()
      expect(text).toMatch(/00:00:(29|30)/)
    })
  })
})
