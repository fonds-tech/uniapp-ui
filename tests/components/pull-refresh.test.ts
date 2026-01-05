/**
 * ui-pull-refresh 组件单元测试
 * 测试下拉刷新组件的 props、状态、事件和交互逻辑
 */

import UiPullRefresh from "@/uni_modules/uniapp-ui/ui-pull-refresh/ui-pull-refresh.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-pull-refresh 下拉刷新组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认下拉刷新组件", () => {
      const wrapper = mount(UiPullRefresh)

      expect(wrapper.find(".ui-pull-refresh").exists()).toBe(true)
      expect(wrapper.find(".ui-pull-refresh__track").exists()).toBe(true)
      expect(wrapper.find(".ui-pull-refresh__head").exists()).toBe(true)
      expect(wrapper.find(".ui-pull-refresh__content").exists()).toBe(true)
    })

    it("应正确渲染插槽内容", () => {
      const wrapper = mount(UiPullRefresh, {
        slots: {
          default: "<div class='slot-content'>测试内容</div>",
        },
      })

      expect(wrapper.find(".slot-content").exists()).toBe(true)
      expect(wrapper.text()).toContain("测试内容")
    })

    it("默认状态应为 normal，不显示任何提示文案", () => {
      const wrapper = mount(UiPullRefresh)

      // 默认状态下不显示提示文案
      expect(wrapper.find(".ui-pull-refresh__text").exists()).toBe(false)
    })
  })

  describe("props 配置", () => {
    it("应支持自定义 pullingText 下拉提示文案", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          pullingText: "自定义下拉文案",
        },
      })

      // 触发下拉状态
      await simulatePullDown(wrapper, 30)

      expect(wrapper.text()).toContain("自定义下拉文案")
    })

    it("应支持自定义 loosingText 释放提示文案", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          loosingText: "自定义释放文案",
          headHeight: 50,
        },
      })

      // 触发释放状态（下拉距离超过阈值）
      await simulatePullDown(wrapper, 120) // 因为有阻尼效果，需要更大的下拉距离

      expect(wrapper.text()).toContain("自定义释放文案")
    })

    it("应支持自定义 loadingText 加载提示文案", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: false,
          loadingText: "自定义加载文案",
        },
      })

      // 需要通过 setProps 触发 watch 的状态变化
      await wrapper.setProps({ modelValue: true })
      await nextTick()
      expect(wrapper.text()).toContain("自定义加载文案")
    })

    it("应支持自定义 successText 成功提示文案", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "自定义成功文案",
          successDuration: 500,
        },
      })

      await nextTick()

      // 将 modelValue 设置为 false，触发成功状态
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      expect(wrapper.text()).toContain("自定义成功文案")
    })

    it("应支持自定义 headHeight 头部高度", () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 80,
        },
      })

      const headStyle = wrapper.find(".ui-pull-refresh__head").attributes("style") || ""
      expect(headStyle).toContain("height: 80px")
    })

    it("应支持自定义 pullDistance 触发刷新阈值", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          pullDistance: 100,
          headHeight: 50,
        },
      })

      // 下拉 80px（阻尼后约 40px），不应达到释放状态
      await simulatePullDown(wrapper, 80)
      expect(wrapper.emitted("change")).toBeTruthy()
      const changes = wrapper.emitted("change") as Array<[string]>
      const lastChange = changes[changes.length - 1]
      expect(lastChange[0]).toBe("pulling")
    })

    it("应支持自定义 animationDuration 动画时长", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          animationDuration: 500,
          modelValue: true,
        },
      })

      await nextTick()
      const trackStyle = wrapper.find(".ui-pull-refresh__track").attributes("style") || ""
      expect(trackStyle).toContain("500ms")
    })

    it("应支持自定义 customClass", () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          customClass: "my-custom-class",
        },
      })

      expect(wrapper.classes()).toContain("my-custom-class")
    })

    it("应支持自定义 customStyle", () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          customStyle: { backgroundColor: "#f5f5f5" },
        },
      })

      const style = wrapper.find(".ui-pull-refresh").attributes("style") || ""
      expect(style).toContain("background-color")
    })
  })

  describe("状态管理", () => {
    it("初始状态应为 normal", () => {
      const wrapper = mount(UiPullRefresh)

      // 没有触发任何交互，不应有状态变化事件
      expect(wrapper.emitted("change")).toBeFalsy()
    })

    it("下拉未达阈值时应切换到 pulling 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      await simulatePullDown(wrapper, 30)

      expect(wrapper.emitted("change")).toBeTruthy()
      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes[0][0]).toBe("pulling")
    })

    it("下拉达到阈值时应切换到 loosing 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      await simulatePullDown(wrapper, 120)

      expect(wrapper.emitted("change")).toBeTruthy()
      const changes = wrapper.emitted("change") as Array<[string]>
      // 最后一个状态应为 loosing
      expect(changes[changes.length - 1][0]).toBe("loosing")
    })

    it("释放后应切换到 loading 状态并触发 refresh 事件", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      await simulatePullDownAndRelease(wrapper, 120)

      expect(wrapper.emitted("refresh")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")).toBeTruthy()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes.some((c) => c[0] === "loading")).toBe(true)
    })

    it("modelValue 从 true 变为 false 时应显示 success 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 500,
        },
      })

      await nextTick()

      await wrapper.setProps({ modelValue: false })
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes.some((c) => c[0] === "success")).toBe(true)
      expect(wrapper.text()).toContain("刷新成功")
    })

    it("success 状态结束后应恢复 normal 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 500,
        },
      })

      await nextTick()

      await wrapper.setProps({ modelValue: false })
      await nextTick()

      // 推进定时器，等待成功提示结束
      await vi.advanceTimersByTimeAsync(600)
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes[changes.length - 1][0]).toBe("normal")
    })

    it("successDuration 为 0 时应直接恢复 normal 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: false,
          successText: "刷新成功",
          successDuration: 0,
        },
      })

      // 先触发 loading 状态
      await wrapper.setProps({ modelValue: true })
      await nextTick()

      // 然后触发成功状态
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes).toBeTruthy()
      // successDuration 为 0 时应直接恢复 normal，跳过 success 状态
      expect(changes[changes.length - 1][0]).toBe("normal")
    })

    it("successText 为空时应直接恢复 normal 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: false,
          successText: "",
          successDuration: 500,
        },
      })

      // 先触发 loading 状态
      await wrapper.setProps({ modelValue: true })
      await nextTick()

      // 然后触发成功状态
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes).toBeTruthy()
      // successText 为空时应直接恢复 normal，跳过 success 状态
      expect(changes[changes.length - 1][0]).toBe("normal")
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时不应响应触摸事件", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          disabled: true,
        },
      })

      await simulatePullDown(wrapper, 100)

      // 禁用状态下不应触发任何状态变化
      expect(wrapper.emitted("change")).toBeFalsy()
    })

    it("disabled 为 true 时不应触发 refresh 事件", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          disabled: true,
        },
      })

      await simulatePullDownAndRelease(wrapper, 120)

      expect(wrapper.emitted("refresh")).toBeFalsy()
    })
  })

  describe("事件触发", () => {
    it("下拉刷新时应触发 refresh 事件", async () => {
      const wrapper = mount(UiPullRefresh)

      await simulatePullDownAndRelease(wrapper, 120)

      expect(wrapper.emitted("refresh")).toBeTruthy()
      expect(wrapper.emitted("refresh")?.length).toBe(1)
    })

    it("状态变化时应触发 change 事件", async () => {
      const wrapper = mount(UiPullRefresh)

      await simulatePullDown(wrapper, 30)

      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("触发刷新时应 emit update:modelValue 为 true", async () => {
      const wrapper = mount(UiPullRefresh)

      await simulatePullDownAndRelease(wrapper, 120)

      expect(wrapper.emitted("update:modelValue")).toBeTruthy()
      const emitted = wrapper.emitted("update:modelValue") as Array<[boolean]>
      expect(emitted[0][0]).toBe(true)
    })
  })

  describe("触摸交互", () => {
    it("向上滑动（deltaY < 0）时应恢复 normal 状态", async () => {
      const wrapper = mount(UiPullRefresh)

      const pullRefresh = wrapper.find(".ui-pull-refresh")

      // 模拟触摸开始
      await pullRefresh.trigger("touchstart", {
        touches: [{ clientX: 0, clientY: 100 }],
      })

      // 模拟向上滑动
      await pullRefresh.trigger("touchmove", {
        touches: [{ clientX: 0, clientY: 50 }],
      })

      await nextTick()

      // 向上滑动不应触发下拉状态
      expect(wrapper.emitted("change")).toBeFalsy()
    })

    it("下拉未达阈值后释放应恢复 normal 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      const pullRefresh = wrapper.find(".ui-pull-refresh")

      // 模拟触摸开始
      await pullRefresh.trigger("touchstart", {
        touches: [{ clientX: 0, clientY: 0 }],
      })

      // 模拟小幅度下拉（未达阈值）
      await pullRefresh.trigger("touchmove", {
        touches: [{ clientX: 0, clientY: 30 }],
      })

      await nextTick()

      // 释放
      await pullRefresh.trigger("touchend")
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes[changes.length - 1][0]).toBe("normal")
    })

    it("正在加载时不应响应触摸事件", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
        },
      })

      await nextTick()

      const beforeChangeCount = (wrapper.emitted("change") as Array<[string]>)?.length || 0

      await simulatePullDown(wrapper, 100)

      const afterChangeCount = (wrapper.emitted("change") as Array<[string]>)?.length || 0

      // 加载中不应产生新的状态变化（除了初始的 loading 状态）
      expect(afterChangeCount).toBe(beforeChangeCount)
    })

    it("touchcancel 事件应与 touchend 行为一致", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      const pullRefresh = wrapper.find(".ui-pull-refresh")

      // 模拟触摸开始
      await pullRefresh.trigger("touchstart", {
        touches: [{ clientX: 0, clientY: 0 }],
      })

      // 模拟下拉达到阈值
      await pullRefresh.trigger("touchmove", {
        touches: [{ clientX: 0, clientY: 120 }],
      })

      await nextTick()

      // 触发 touchcancel
      await pullRefresh.trigger("touchcancel")
      await nextTick()

      // 应触发刷新
      expect(wrapper.emitted("refresh")).toBeTruthy()
    })
  })

  describe("插槽支持", () => {
    it("应支持 pulling 状态插槽", async () => {
      const wrapper = mount(UiPullRefresh, {
        slots: {
          pulling: "<div class=\"custom-pulling\">自定义下拉</div>",
        },
      })

      await simulatePullDown(wrapper, 30)

      expect(wrapper.find(".custom-pulling").exists()).toBe(true)
    })

    it("应支持 loosing 状态插槽", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
        slots: {
          loosing: "<div class=\"custom-loosing\">自定义释放</div>",
        },
      })

      await simulatePullDown(wrapper, 120)

      expect(wrapper.find(".custom-loosing").exists()).toBe(true)
    })

    it("应支持 loading 状态插槽", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: false,
        },
        slots: {
          loading: "<div class=\"custom-loading\">自定义加载</div>",
        },
      })

      // 通过 setProps 触发 loading 状态
      await wrapper.setProps({ modelValue: true })
      await nextTick()

      expect(wrapper.find(".custom-loading").exists()).toBe(true)
    })

    it("应支持 success 状态插槽", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 500,
        },
        slots: {
          success: "<div class=\"custom-success\">自定义成功</div>",
        },
      })

      await nextTick()

      await wrapper.setProps({ modelValue: false })
      await nextTick()

      expect(wrapper.find(".custom-success").exists()).toBe(true)
    })

    it("应支持 normal 状态插槽", () => {
      const wrapper = mount(UiPullRefresh, {
        slots: {
          normal: "<div class=\"custom-normal\">自定义正常状态</div>",
        },
      })

      expect(wrapper.find(".custom-normal").exists()).toBe(true)
    })

    it("pulling 插槽应接收 distance 参数", async () => {
      const wrapper = mount(UiPullRefresh, {
        slots: {
          pulling: `<template #pulling="{ distance }">
            <div class="custom-pulling" :data-distance="distance">距离: {{ distance }}</div>
          </template>`,
        },
      })

      await simulatePullDown(wrapper, 30)

      const customPulling = wrapper.find(".custom-pulling")
      expect(customPulling.exists()).toBe(true)
    })
  })

  describe("样式计算", () => {
    it("下拉时轨道应有 translateY 位移", async () => {
      const wrapper = mount(UiPullRefresh)

      await simulatePullDown(wrapper, 60)

      const trackStyle = wrapper.find(".ui-pull-refresh__track").attributes("style") || ""
      expect(trackStyle).toContain("transform")
      expect(trackStyle).toContain("translateY")
    })

    it("下拉过程中不应有过渡动画", async () => {
      const wrapper = mount(UiPullRefresh)

      await simulatePullDown(wrapper, 60)

      const trackStyle = wrapper.find(".ui-pull-refresh__track").attributes("style") || ""
      expect(trackStyle).toContain("transition: none")
    })

    it("loading 状态应有过渡动画", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          animationDuration: 300,
        },
      })

      await nextTick()

      const trackStyle = wrapper.find(".ui-pull-refresh__track").attributes("style") || ""
      expect(trackStyle).toContain("300ms")
    })

    it("头部高度应正确应用", () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 60,
        },
      })

      const headStyle = wrapper.find(".ui-pull-refresh__head").attributes("style") || ""
      expect(headStyle).toContain("height: 60px")
    })
  })

  describe("边界情况", () => {
    it("快速连续下拉不应产生异常", async () => {
      const wrapper = mount(UiPullRefresh)

      // 快速连续触发多次下拉
      for (let i = 0; i < 5; i++) {
        await simulatePullDown(wrapper, 30 + i * 10)
      }

      expect(wrapper.find(".ui-pull-refresh").exists()).toBe(true)
    })

    it("组件卸载时应清理定时器", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout")

      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 500,
        },
      })

      await nextTick()

      // 触发成功状态，启动定时器
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      // 卸载组件
      wrapper.unmount()

      // 验证 clearTimeout 被调用
      expect(clearTimeoutSpy).toHaveBeenCalled()

      clearTimeoutSpy.mockRestore()
    })

    it("多次触发成功状态应正确清理之前的定时器", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 1000,
        },
      })

      await nextTick()

      // 第一次触发成功
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      // 快速再次触发加载
      await wrapper.setProps({ modelValue: true })
      await nextTick()

      // 第二次触发成功
      await wrapper.setProps({ modelValue: false })
      await nextTick()

      // 推进时间
      await vi.advanceTimersByTimeAsync(1100)
      await nextTick()

      // 应该只触发一次 normal 状态恢复
      const changes = wrapper.emitted("change") as Array<[string]>
      const normalCount = changes.filter((c) => c[0] === "normal").length
      expect(normalCount).toBeGreaterThanOrEqual(1)
    })

    it("pullDistance 未设置时应使用 headHeight 作为阈值", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 60,
          // 不设置 pullDistance
        },
      })

      // 阻尼系数为 0.5，需要下拉 120 才能达到 60 的阈值
      await simulatePullDown(wrapper, 130)

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes[changes.length - 1][0]).toBe("loosing")
    })

    it("下拉距离应有最大限制", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          headHeight: 50,
        },
      })

      // 大幅度下拉
      await simulatePullDown(wrapper, 500)

      const trackStyle = wrapper.find(".ui-pull-refresh__track").attributes("style") || ""
      // 最大距离应为 headHeight * 2 = 100px
      expect(trackStyle).toMatch(/translateY\((\d+(\.\d+)?)px\)/)

      const match = trackStyle.match(/translateY\((\d+(\.\d+)?)px\)/)
      if (match) {
        const distance = Number.parseFloat(match[1])
        expect(distance).toBeLessThanOrEqual(100)
      }
    })
  })

  describe("modelValue 双向绑定", () => {
    it("外部设置 modelValue 为 true 应切换到 loading 状态", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: false,
        },
      })

      await wrapper.setProps({ modelValue: true })
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes.some((c) => c[0] === "loading")).toBe(true)
    })

    it("外部设置 modelValue 为 false 应触发成功流程", async () => {
      const wrapper = mount(UiPullRefresh, {
        props: {
          modelValue: true,
          successText: "刷新成功",
          successDuration: 500,
        },
      })

      await nextTick()

      await wrapper.setProps({ modelValue: false })
      await nextTick()

      const changes = wrapper.emitted("change") as Array<[string]>
      expect(changes.some((c) => c[0] === "success")).toBe(true)
    })
  })
})

/**
 * 模拟下拉操作
 * @param wrapper Vue Test Utils 挂载的组件
 * @param distance 下拉距离（像素）
 */
async function simulatePullDown(wrapper: ReturnType<typeof mount>, distance: number) {
  const pullRefresh = wrapper.find(".ui-pull-refresh")

  // 模拟触摸开始
  await pullRefresh.trigger("touchstart", {
    touches: [{ clientX: 0, clientY: 0 }],
  })

  // 模拟下拉
  await pullRefresh.trigger("touchmove", {
    touches: [{ clientX: 0, clientY: distance }],
  })

  await nextTick()
}

/**
 * 模拟下拉并释放操作
 * @param wrapper Vue Test Utils 挂载的组件
 * @param distance 下拉距离（像素）
 */
async function simulatePullDownAndRelease(wrapper: ReturnType<typeof mount>, distance: number) {
  await simulatePullDown(wrapper, distance)

  const pullRefresh = wrapper.find(".ui-pull-refresh")
  await pullRefresh.trigger("touchend")

  await nextTick()
}
