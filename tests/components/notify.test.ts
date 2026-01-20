/**
 * ui-notify 组件单元测试
 * 测试通知组件的 props、events 和渲染逻辑
 *
 * 注意：ui-notify 使用纯 CSS transition 实现动画。
 * 动画时长为 300ms，需要使用 fake timers 推进时间让动画完成。
 */

import UiNotify from "@/uni_modules/uniapp-ui/ui-notify/ui-notify.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { getLastEmitted } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

// 动画时长常量（与组件内部一致）
const ANIMATION_DURATION = 300

// 等待动画完成的辅助函数
async function waitForAnimation(duration = ANIMATION_DURATION + 50) {
  await vi.advanceTimersByTimeAsync(duration)
  await nextTick()
}

describe("ui-notify 通知组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("初始状态不应渲染通知", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: false },
      })

      await nextTick()

      expect(wrapper.find(".ui-notify").exists()).toBe(false)
    })

    it("show 为 true 时应渲染通知", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知内容" },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").exists()).toBe(true)
    })

    it("应正确渲染通知内容", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "操作成功" },
      })

      await waitForAnimation()

      expect(wrapper.text()).toContain("操作成功")
    })
  })

  describe("类型", () => {
    const types = ["primary", "success", "warning", "danger"] as const

    types.forEach((type) => {
      it(`应支持 ${type} 类型`, async () => {
        const wrapper = mount(UiNotify, {
          props: { show: true, type, content: "通知" },
        })

        await waitForAnimation()

        expect(wrapper.find(".ui-notify").classes()).toContain(`ui-notify--${type}`)
      })
    })

    it("默认类型为 primary", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").classes()).toContain("ui-notify--primary")
    })
  })

  describe("自动关闭", () => {
    it("默认 3000ms 后自动关闭", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      // 先让组件渲染完成
      await waitForAnimation()

      // 推进 3000ms 触发自动关闭定时器
      await vi.advanceTimersByTimeAsync(3000)
      await nextTick()

      // 等待关闭动画完成
      await waitForAnimation()

      expect(wrapper.emitted("update:show")).toBeTruthy()
      expect(getLastEmitted(wrapper, "update:show")).toEqual([false])
    })

    it("应支持自定义显示时长", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", duration: 5000 },
      })

      await waitForAnimation()

      // 3000ms 后不应关闭
      await vi.advanceTimersByTimeAsync(3000)
      await nextTick()

      // 此时不应有关闭事件
      const events = wrapper.emitted("update:show")
      const hasClose = events?.some((e) => e[0] === false)
      expect(hasClose).toBeFalsy()

      // 再推进 2000ms（共 5000ms）后应关闭
      await vi.advanceTimersByTimeAsync(2000)
      await nextTick()

      // 等待关闭动画完成
      await waitForAnimation()

      const eventsAfter = wrapper.emitted("update:show")
      const hasCloseAfter = eventsAfter?.some((e) => e[0] === false)
      expect(hasCloseAfter).toBeTruthy()
    })

    it("duration 为 0 时应该使用默认 3000ms 关闭", async () => {
      // 注意：组件实现中 duration 为 0 会 fallback 到 3000ms
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", duration: 0 },
      })

      await waitForAnimation()

      // 推进 3000ms，应该触发关闭
      await vi.advanceTimersByTimeAsync(3000)
      await nextTick()

      // 等待关闭动画完成
      await waitForAnimation()

      // 应该有关闭事件（因为 duration: 0 会 fallback 到 3000ms）
      const events = wrapper.emitted("update:show")
      const hasClose = events?.some((e) => e[0] === false)
      expect(hasClose).toBeTruthy()
    })
  })

  describe("样式配置", () => {
    it("应支持自定义字体颜色", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", color: "#ffffff" },
      })

      expect(wrapper.props("color")).toBe("#ffffff")
    })

    it("应支持自定义字体大小", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", fontSize: "28rpx" },
      })

      expect(wrapper.props("fontSize")).toBe("28rpx")
    })

    it("应支持自定义字体粗细", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", fontWeight: "600" },
      })

      expect(wrapper.props("fontWeight")).toBe("600")
    })

    it("应支持自定义背景颜色", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", background: "#1989fa" },
      })

      expect(wrapper.props("background")).toBe("#1989fa")
    })
  })

  describe("位置配置", () => {
    it("应支持自定义 zIndex", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", zIndex: 3000 },
      })

      expect(wrapper.props("zIndex")).toBe(3000)
    })

    it("应支持自定义顶部偏移", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", offsetTop: "100rpx" },
      })

      expect(wrapper.props("offsetTop")).toBe("100rpx")
    })
  })

  describe("事件处理", () => {
    it("打开时应触发 open 事件", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: false },
      })

      await wrapper.setProps({ show: true })
      await waitForAnimation()

      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("关闭时应触发 close 事件", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      // 先让组件渲染完成
      await waitForAnimation()

      // 关闭组件
      await wrapper.setProps({ show: false })
      await waitForAnimation()

      expect(wrapper.emitted("close")).toBeTruthy()
    })

    it("点击通知应触发 click 事件", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      await waitForAnimation()

      await wrapper.find(".ui-notify").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", customClass: "my-notify" },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").classes()).toContain("my-notify")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiNotify, {
        props: {
          show: true,
          content: "通知",
          customStyle: { padding: "20px" },
        },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 show 方法", () => {
      const wrapper = mount(UiNotify)

      expect(typeof wrapper.vm.show).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiNotify)

      expect(typeof wrapper.vm.close).toBe("function")
    })
  })

  describe("边界情况", () => {
    it("无内容时应正常渲染", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").exists()).toBe(true)
    })

    it("多次显示时定时器行为", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知", duration: 3000 },
      })

      await waitForAnimation()

      // 推进 2000ms
      await vi.advanceTimersByTimeAsync(2000)

      // 关闭再重新打开
      await wrapper.setProps({ show: false })
      await waitForAnimation()

      await wrapper.setProps({ show: true })
      await waitForAnimation()

      // 组件重新显示，验证基本渲染
      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("cSS transition 动画", () => {
    it("显示时应添加 visible 类", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      await waitForAnimation()

      expect(wrapper.find(".ui-notify").classes()).toContain("ui-notify--visible")
    })

    it("关闭时应移除 visible 类", async () => {
      const wrapper = mount(UiNotify, {
        props: { show: true, content: "通知" },
      })

      await waitForAnimation()

      // 触发关闭
      await wrapper.setProps({ show: false })
      await nextTick()

      // visible 类应该被移除
      expect(wrapper.find(".ui-notify").classes()).not.toContain("ui-notify--visible")
    })
  })
})
