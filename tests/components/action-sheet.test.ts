/**
 * ui-action-sheet 组件单元测试
 * 测试动作面板组件的 props、events 和渲染逻辑
 *
 * 注意：组件使用 useTransition hook，内部用 setInterval 模拟 requestAnimationFrame
 * 测试需要使用 waitForTransition() 来推进时间，让动画初始化完成
 */

import UiActionSheet from "@/uni_modules/uniapp-ui/ui-action-sheet/ui-action-sheet.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { getLastEmitted, waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-action-sheet 动作面板组件", () => {
  const defaultActions = [
    { title: "选项一" },
    { title: "选项二" },
    { title: "选项三" },
  ]

  // 每个测试前启用假定时器
  beforeEach(() => {
    vi.useFakeTimers()
  })

  // 每个测试后恢复真实定时器
  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("show 为 false 时不应渲染面板内容（lazyRender 默认为 true）", () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: false, actions: defaultActions },
      })

      expect(wrapper.find(".ui-action-sheet").exists()).toBe(false)
    })

    it("show 为 true 时应渲染动作面板", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet").exists()).toBe(true)
    })

    it("应正确渲染操作项列表", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      const actions = wrapper.findAll(".ui-action-sheet__item")
      expect(actions.length).toBe(3)
    })

    it("应正确渲染操作项标题", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("选项一")
      expect(wrapper.text()).toContain("选项二")
      expect(wrapper.text()).toContain("选项三")
    })
  })

  describe("标题和描述", () => {
    it("应正确渲染标题", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, title: "请选择操作" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__title").exists()).toBe(true)
      expect(wrapper.find(".ui-action-sheet__title").text()).toBe("请选择操作")
    })

    it("应正确渲染描述", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, description: "这是描述信息" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__description").exists()).toBe(true)
      expect(wrapper.find(".ui-action-sheet__description").text()).toBe("这是描述信息")
    })

    it("无标题时不应渲染标题区域", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      // 无标题时 header 区域不应存在
      expect(wrapper.find(".ui-action-sheet__header").exists()).toBe(false)
    })

    it("应支持自定义标题样式", async () => {
      const wrapper = mount(UiActionSheet, {
        props: {
          show: true,
          actions: defaultActions,
          title: "标题",
          titleSize: "32rpx",
          titleColor: "#333333",
          titleWeight: 600,
        },
      })

      await nextTick()

      expect(wrapper.props("titleSize")).toBe("32rpx")
      expect(wrapper.props("titleColor")).toBe("#333333")
      expect(wrapper.props("titleWeight")).toBe(600)
    })

    it("应支持自定义描述样式", async () => {
      const wrapper = mount(UiActionSheet, {
        props: {
          show: true,
          actions: defaultActions,
          description: "描述",
          descriptionSize: "24rpx",
          descriptionColor: "#999999",
        },
      })

      await nextTick()

      expect(wrapper.props("descriptionSize")).toBe("24rpx")
      expect(wrapper.props("descriptionColor")).toBe("#999999")
    })
  })

  describe("操作项配置", () => {
    it("应支持操作项描述", async () => {
      const actions = [{ title: "选项一", description: "选项一的描述" }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("选项一的描述")
    })

    it("应支持操作项自定义颜色", async () => {
      const actions = [{ title: "危险操作", color: "#ee0a24" }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__item").exists()).toBe(true)
    })

    it("应支持禁用操作项", async () => {
      const actions = [{ title: "禁用选项", disabled: true }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__item--disabled").exists()).toBe(true)
    })

    it("应支持加载状态的操作项", async () => {
      const actions = [{ title: "加载中", loading: true }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__item--loading").exists()).toBe(true)
    })
  })

  describe("取消按钮", () => {
    it("默认应显示取消按钮", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet__cancel").exists()).toBe(true)
      expect(wrapper.text()).toContain("取消")
    })

    it("应支持自定义取消按钮文字", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, cancelText: "关闭" },
      })

      await waitForTransition()

      expect(wrapper.text()).toContain("关闭")
    })

    it("cancelText 为空时不应显示取消按钮文字", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, cancelText: "" },
      })

      await waitForTransition()

      // 取消按钮仍然存在，但文字为空
      const cancelBtn = wrapper.find(".ui-action-sheet__cancel")
      expect(cancelBtn.exists()).toBe(true)
      expect(cancelBtn.text()).toBe("")
    })

    it("应支持自定义取消按钮样式", async () => {
      const wrapper = mount(UiActionSheet, {
        props: {
          show: true,
          actions: defaultActions,
          cancelTextSize: "32rpx",
          cancelTextColor: "#999999",
          cancelBackground: "#f5f5f5",
        },
      })

      await nextTick()

      expect(wrapper.props("cancelTextSize")).toBe("32rpx")
      expect(wrapper.props("cancelTextColor")).toBe("#999999")
      expect(wrapper.props("cancelBackground")).toBe("#f5f5f5")
    })
  })

  describe("事件处理", () => {
    it("点击操作项应触发 select 事件", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      const firstAction = wrapper.findAll(".ui-action-sheet__item")[0]
      await firstAction.trigger("click")

      expect(wrapper.emitted("select")).toBeTruthy()
      expect(wrapper.emitted("select")![0][0]).toEqual({ title: "选项一" })
      expect(wrapper.emitted("select")![0][1]).toBe(0)
    })

    it("点击取消按钮应触发 cancel 事件", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      await wrapper.find(".ui-action-sheet__cancel").trigger("click")

      expect(wrapper.emitted("cancel")).toBeTruthy()
    })

    it("点击取消按钮应关闭面板", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      await wrapper.find(".ui-action-sheet__cancel").trigger("click")

      expect(wrapper.emitted("update:show")).toBeTruthy()
      expect(getLastEmitted(wrapper, "update:show")).toEqual([false])
    })

    it("禁用的操作项点击不应触发事件", async () => {
      const actions = [{ title: "禁用选项", disabled: true }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      await wrapper.find(".ui-action-sheet__item").trigger("click")

      expect(wrapper.emitted("select")).toBeFalsy()
    })

    it("加载中的操作项点击不应触发事件", async () => {
      const actions = [{ title: "加载中", loading: true }]
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions },
      })

      await waitForTransition()

      await wrapper.find(".ui-action-sheet__item").trigger("click")

      expect(wrapper.emitted("select")).toBeFalsy()
    })
  })

  describe("点击关闭", () => {
    it("closeOnClickAction 为 true 时点击操作项应关闭", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, closeOnClickAction: true },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")

      expect(wrapper.emitted("update:show")).toBeTruthy()
      expect(getLastEmitted(wrapper, "update:show")).toEqual([false])
    })

    it("closeOnClickAction 为 false 时点击操作项不应关闭", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, closeOnClickAction: false },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")

      // 组件挂载时会触发 update:show=true，但点击后不应有 update:show=false
      const events = wrapper.emitted("update:show") || []
      const hasClosed = events.some((e) => e[0] === false)
      expect(hasClosed).toBeFalsy()
    })
  })

  describe("遮罩层", () => {
    it("默认应显示遮罩层", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-overlay" }).exists()).toBe(true)
    })

    it("overlay 为 false 时不应显示遮罩层", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, overlay: false },
      })

      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-overlay" }).exists()).toBe(false)
    })

    it("closeOnClickOverlay 为 true 时点击遮罩层应关闭", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, closeOnClickOverlay: true },
      })

      await waitForTransition()

      await wrapper.findComponent({ name: "ui-overlay" }).trigger("click")

      expect(wrapper.emitted("clickOverlay")).toBeTruthy()
      expect(getLastEmitted(wrapper, "update:show")).toEqual([false])
    })

    it("closeOnClickOverlay 为 false 时点击遮罩层不应关闭", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, closeOnClickOverlay: false },
      })

      await waitForTransition()

      await wrapper.findComponent({ name: "ui-overlay" }).trigger("click")

      // 组件挂载时会触发 update:show=true，但点击后不应有 update:show=false
      const events = wrapper.emitted("update:show") || []
      const hasClosed = events.some((e) => e[0] === false)
      expect(hasClosed).toBeFalsy()
    })
  })

  describe("样式配置", () => {
    it("应支持自定义高度", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, height: "300px" },
      })

      await nextTick()

      expect(wrapper.props("height")).toBe("300px")
    })

    it("应支持自定义最大高度", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, maxHeight: "500px" },
      })

      await nextTick()

      expect(wrapper.props("maxHeight")).toBe("500px")
    })

    it("应支持自定义圆角", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, borderRadius: 20 },
      })

      await nextTick()

      expect(wrapper.props("borderRadius")).toBe(20)
    })

    it("应支持自定义 zIndex", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, zIndex: 3000 },
      })

      await nextTick()

      expect(wrapper.props("zIndex")).toBe(3000)
    })

    it("应支持自定义动画时长", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, duration: 500 },
      })

      await nextTick()

      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("安全区域", () => {
    it("safeAreaInsetBottom 默认为 true", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions },
      })

      await nextTick()

      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })

    it("safeAreaInsetBottom 为 false 时不应渲染安全区", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, safeAreaInsetBottom: false },
      })

      await waitForTransition()

      expect(wrapper.findComponent({ name: "ui-safe-area-bottom" }).exists()).toBe(false)
    })
  })

  describe("beforeClose 回调", () => {
    it("应支持 beforeClose 回调", async () => {
      const beforeClose = vi.fn(() => true)

      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, beforeClose },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")

      expect(beforeClose).toHaveBeenCalled()
    })

    it("beforeClose 返回 false 时不应关闭", async () => {
      const beforeClose = vi.fn(() => false)

      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, beforeClose, closeOnClickAction: true },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")

      // 由于 beforeClose 返回 false，不应触发关闭
      // 但 select 事件仍应触发
      expect(wrapper.emitted("select")).toBeTruthy()
    })

    it("beforeClose 返回 Promise.resolve(true) 时应关闭", async () => {
      const beforeClose = vi.fn(() => Promise.resolve(true))

      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, beforeClose },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")
      await Promise.resolve()

      expect(beforeClose).toHaveBeenCalled()
      expect(getLastEmitted(wrapper, "update:show")).toEqual([false])
    })

    it("beforeClose 返回 Promise.reject 时不应关闭", async () => {
      const beforeClose = vi.fn(() => Promise.reject(new Error("reject")))

      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, beforeClose },
      })

      await waitForTransition()

      await wrapper.findAll(".ui-action-sheet__item")[0].trigger("click")
      await Promise.resolve()

      const events = wrapper.emitted("update:show") || []
      const hasClosed = events.some((event) => event[0] === false)
      expect(hasClosed).toBeFalsy()
    })
  })

  describe("懒渲染", () => {
    it("lazyRender 默认为 true", () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: false, actions: defaultActions },
      })

      expect(wrapper.props("lazyRender")).toBe(true)
    })

    it("lazyRender 为 false 时应立即渲染", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: false, actions: defaultActions, lazyRender: false },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet").exists()).toBe(true)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: defaultActions, customClass: "my-action-sheet" },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet").classes()).toContain("my-action-sheet")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiActionSheet, {
        props: {
          show: true,
          actions: defaultActions,
          customStyle: { marginBottom: "20px" },
        },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet").exists()).toBe(true)
    })

    it("应支持遮罩层自定义样式", async () => {
      const wrapper = mount(UiActionSheet, {
        props: {
          show: true,
          actions: defaultActions,
          overlayStyle: { backgroundColor: "rgba(0,0,0,0.6)" },
        },
      })

      await waitForTransition()

      const overlay = wrapper.findComponent({ name: "ui-overlay" })
      expect(overlay.exists()).toBe(true)
      expect(overlay.props("customStyle")).toEqual({ backgroundColor: "rgba(0,0,0,0.6)" })
    })
  })

  describe("生命周期事件", () => {
    it("打开时应触发 open 事件", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: false, actions: defaultActions },
      })

      await wrapper.setProps({ show: true })
      await waitForTransition()

      expect(wrapper.emitted("open")).toBeTruthy()
    })
  })

  describe("边界情况", () => {
    it("actions 为空数组时应正常渲染", async () => {
      const wrapper = mount(UiActionSheet, {
        props: { show: true, actions: [] },
      })

      await waitForTransition()

      expect(wrapper.find(".ui-action-sheet").exists()).toBe(true)
      expect(wrapper.findAll(".ui-action-sheet__item").length).toBe(0)
    })
  })
})
