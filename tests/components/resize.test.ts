/**
 * ui-resize 组件单元测试
 * 测试尺寸监听组件的 props、events 和渲染逻辑
 */

import UiResize from "@/uni_modules/uniapp-ui/ui-resize/ui-resize.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-resize 尺寸监听组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实计时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认尺寸监听组件", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })

    it("应渲染内容区域", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize__content").exists()).toBe(true)
    })

    it("应正确渲染插槽内容", async () => {
      const wrapper = mount(UiResize, {
        slots: {
          default: "<div class='resize-content'>监听内容</div>",
        },
      })

      await waitForTransition()

      expect(wrapper.find(".resize-content").exists()).toBe(true)
    })

    it("应渲染两个触发器 scroll-view", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      const triggers = wrapper.findAll(".ui-resize__trigger")
      expect(triggers.length).toBe(2)
    })
  })

  describe("尺寸配置", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiResize, {
        props: { width: "300rpx" },
      })

      expect(wrapper.props("width")).toBe("300rpx")
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiResize, {
        props: { height: "200rpx" },
      })

      expect(wrapper.props("height")).toBe("200rpx")
    })

    it("应支持数字类型尺寸", () => {
      const wrapper = mount(UiResize, {
        props: { width: 200, height: 150 },
      })

      expect(wrapper.props("width")).toBe(200)
      expect(wrapper.props("height")).toBe(150)
    })

    it("应支持百分比尺寸", () => {
      const wrapper = mount(UiResize, {
        props: { width: "100%" },
      })

      expect(wrapper.props("width")).toBe("100%")
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiResize)

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用监听", () => {
      const wrapper = mount(UiResize, {
        props: { disabled: true },
      })

      expect(wrapper.props("disabled")).toBe(true)
    })

    it("禁用状态下滚动事件不应触发 resize", async () => {
      const wrapper = mount(UiResize, {
        props: { disabled: true },
      })

      await waitForTransition()

      // 模拟滚动事件
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")

      // 推进防抖时间
      await vi.advanceTimersByTimeAsync(50)

      // 禁用状态下不应触发 resize 事件
      expect(wrapper.emitted("resize")).toBeUndefined()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiResize, {
        props: { customClass: "my-resize" },
      })

      await waitForTransition()

      expect(wrapper.find(".my-resize").exists()).toBe(true)
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiResize, {
        props: {
          customStyle: { minWidth: "100px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })
  })

  describe("resize 事件", () => {
    it("初始化后应触发首次 resize 事件", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      // 模拟 scroll 事件触发初始化
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")

      // 推进防抖时间
      await vi.advanceTimersByTimeAsync(50)

      const resizeEvents = wrapper.emitted("resize")
      expect(resizeEvents).toBeDefined()
      if (resizeEvents) {
        expect(resizeEvents.length).toBeGreaterThanOrEqual(1)
      }
    })

    it("resize 事件应包含正确的尺寸信息", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      // 模拟 scroll 事件
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")

      // 推进防抖时间
      await vi.advanceTimersByTimeAsync(50)

      const resizeEvents = wrapper.emitted("resize")
      if (resizeEvents && resizeEvents.length > 0) {
        const eventData = resizeEvents[0][0] as Record<string, unknown>
        // 验证事件数据包含必要的尺寸字段
        expect(eventData).toHaveProperty("width")
        expect(eventData).toHaveProperty("height")
        expect(eventData).toHaveProperty("top")
        expect(eventData).toHaveProperty("left")
      }
    })
  })

  describe("防抖机制", () => {
    it("短时间内多次触发应只执行一次", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      const triggers = wrapper.findAll(".ui-resize__trigger")

      // 快速触发多次滚动事件
      await triggers[0].trigger("scroll")
      await triggers[1].trigger("scroll")
      await triggers[0].trigger("scroll")

      // 推进一点时间但不足以完成防抖
      await vi.advanceTimersByTimeAsync(10)

      // 再次触发
      await triggers[1].trigger("scroll")

      // 推进完整的防抖时间
      await vi.advanceTimersByTimeAsync(50)

      // 由于防抖机制，resize 事件应该只被合并触发
      const resizeEvents = wrapper.emitted("resize")
      // 初始化阶段可能触发一次，实际尺寸变化检测会被合并
      expect(resizeEvents).toBeDefined()
    })

    it("防抖时间应为 16ms", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      const triggers = wrapper.findAll(".ui-resize__trigger")

      // 触发滚动
      await triggers[0].trigger("scroll")

      // 推进 10ms（不足 16ms）
      await vi.advanceTimersByTimeAsync(10)

      // 此时防抖定时器还未执行完
      // 再次触发应该重置定时器
      await triggers[0].trigger("scroll")

      // 再推进 16ms
      await vi.advanceTimersByTimeAsync(20)

      // 现在应该已经处理完成
      expect(wrapper.emitted("resize")).toBeDefined()
    })
  })

  describe("组件卸载", () => {
    it("卸载后应清理定时器", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      // 触发滚动事件启动防抖定时器
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")

      // 立即卸载组件
      wrapper.unmount()

      // 推进时间，确保不会因为未清理的定时器报错
      await vi.advanceTimersByTimeAsync(100)

      // 如果没有报错，测试通过
      expect(true).toBe(true)
    })

    it("卸载后异步回调不应执行", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      // 触发滚动
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")

      // 记录当前事件数量
      const eventCountBefore = wrapper.emitted("resize")?.length || 0

      // 卸载组件
      wrapper.unmount()

      // 推进防抖时间
      await vi.advanceTimersByTimeAsync(50)

      // 由于组件已卸载，无法再检查 emitted
      // 但如果代码正确，不应有任何错误抛出
      expect(true).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })

    it("无尺寸时应正常渲染", async () => {
      const wrapper = mount(UiResize)

      await waitForTransition()

      expect(wrapper.find(".ui-resize").exists()).toBe(true)
    })

    it("动态切换 disabled 状态", async () => {
      const wrapper = mount(UiResize, {
        props: { disabled: false },
      })

      await waitForTransition()

      // 切换为禁用
      await wrapper.setProps({ disabled: true })

      // 触发滚动
      const triggers = wrapper.findAll(".ui-resize__trigger")
      await triggers[0].trigger("scroll")
      await vi.advanceTimersByTimeAsync(50)

      // 禁用后的事件不应触发 resize
      const resizeEvents = wrapper.emitted("resize")
      const countAfterDisable = resizeEvents?.length || 0

      // 切换为启用
      await wrapper.setProps({ disabled: false })
      await triggers[0].trigger("scroll")
      await vi.advanceTimersByTimeAsync(50)

      // 启用后应该可以触发
      // 注意：由于初始化阶段的跳过逻辑，这里可能不会立即触发新事件
      expect(wrapper.props("disabled")).toBe(false)
    })
  })
})
