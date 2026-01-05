/**
 * ui-swipe-cell 组件单元测试
 * 测试滑动单元格组件的 props、events、slots 和交互逻辑
 */

import UiSwipeCell from "@/uni_modules/uniapp-ui/ui-swipe-cell/ui-swipe-cell.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe, vi, beforeEach, afterEach } from "vitest"
import { nextTick } from "vue"

describe("ui-swipe-cell 滑动单元格组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认滑动单元格组件", () => {
      const wrapper = mount(UiSwipeCell)

      expect(wrapper.find(".ui-swipe-cell").exists()).toBe(true)
      expect(wrapper.find(".ui-swipe-cell__wrapper").exists()).toBe(true)
      expect(wrapper.find(".ui-swipe-cell__left").exists()).toBe(true)
      expect(wrapper.find(".ui-swipe-cell__right").exists()).toBe(true)
    })

    it("应正确渲染默认插槽内容", () => {
      const wrapper = mount(UiSwipeCell, {
        slots: {
          default: "<div class='content'>主内容</div>",
        },
      })

      expect(wrapper.find(".content").exists()).toBe(true)
      expect(wrapper.text()).toContain("主内容")
    })

    it("应正确渲染左侧插槽内容", () => {
      const wrapper = mount(UiSwipeCell, {
        slots: {
          left: "<div class='left-action'>收藏</div>",
        },
      })

      expect(wrapper.find(".left-action").exists()).toBe(true)
      expect(wrapper.text()).toContain("收藏")
    })

    it("应正确渲染右侧插槽内容", () => {
      const wrapper = mount(UiSwipeCell, {
        slots: {
          right: "<div class='right-action'>删除</div>",
        },
      })

      expect(wrapper.find(".right-action").exists()).toBe(true)
      expect(wrapper.text()).toContain("删除")
    })

    it("应同时支持左右两侧插槽", () => {
      const wrapper = mount(UiSwipeCell, {
        slots: {
          left: "<div class='left-btn'>收藏</div>",
          right: "<div class='right-btn'>删除</div>",
          default: "<div class='main-content'>内容</div>",
        },
      })

      expect(wrapper.find(".left-btn").exists()).toBe(true)
      expect(wrapper.find(".right-btn").exists()).toBe(true)
      expect(wrapper.find(".main-content").exists()).toBe(true)
    })
  })

  describe("Props 属性", () => {
    it("应支持 name 属性标识", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell-1" },
      })

      expect(wrapper.props("name")).toBe("cell-1")
    })

    it("应支持数字类型的 name", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: 123 },
      })

      expect(wrapper.props("name")).toBe(123)
    })

    it("应支持 leftWidth 属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { leftWidth: 100 },
      })

      expect(wrapper.props("leftWidth")).toBe(100)
    })

    it("应支持 rightWidth 属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      expect(wrapper.props("rightWidth")).toBe(80)
    })

    it("应支持 threshold 阈值属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { threshold: 0.5 },
      })

      expect(wrapper.props("threshold")).toBe(0.5)
    })

    it("应支持 stopPropagation 属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { stopPropagation: false },
      })

      expect(wrapper.props("stopPropagation")).toBe(false)
    })

    it("应支持 customClass 属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { customClass: "my-swipe-cell" },
      })

      expect(wrapper.classes()).toContain("my-swipe-cell")
    })

    it("应支持 customStyle 属性", () => {
      const wrapper = mount(UiSwipeCell, {
        props: {
          customStyle: { background: "#f5f5f5" },
        },
      })

      expect(wrapper.props("customStyle")).toEqual({ background: "#f5f5f5" })
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时不应响应触摸事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { disabled: true, rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 模拟触摸开始
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 模拟触摸移动（向左滑动）
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100, clientY: 50 }],
      })

      // 模拟触摸结束
      await wrapper.trigger("touchend")

      await nextTick()

      // 禁用状态下不应有偏移
      const wrapperEl = wrapper.find(".ui-swipe-cell__wrapper")
      expect(wrapperEl.attributes("style")).toContain("translateX(0px)")
    })

    it("disabled 变化时应正确响应", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { disabled: false, rightWidth: 80 },
      })

      expect(wrapper.props("disabled")).toBe(false)

      await wrapper.setProps({ disabled: true })
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("触摸交互", () => {
    it("触摸开始时应初始化状态", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 触摸开始不应触发任何事件
      expect(wrapper.emitted("open")).toBeFalsy()
      expect(wrapper.emitted("close")).toBeFalsy()
    })

    it("向左滑动时应显示右侧内容", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 模拟触摸开始
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 模拟向左滑动
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100, clientY: 50 }],
      })

      await wrapper.trigger("touchend")
      await nextTick()

      // 应触发 open 事件
      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("向右滑动时应显示左侧内容", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { leftWidth: 80 },
        slots: {
          left: "<div class='collect'>收藏</div>",
        },
      })

      // 模拟触摸开始
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 100, clientY: 50 }],
      })

      // 模拟向右滑动
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      await wrapper.trigger("touchend")
      await nextTick()

      // 应触发 open 事件
      expect(wrapper.emitted("open")).toBeTruthy()
    })

    it("touchcancel 应等同于 touchend", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100, clientY: 50 }],
      })

      // 使用 touchcancel 代替 touchend
      await wrapper.trigger("touchcancel")
      await nextTick()

      // 应正常处理
      expect(wrapper.find(".ui-swipe-cell").exists()).toBe(true)
    })

    it("滑动距离小于阈值时应关闭", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80, threshold: 0.3 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 模拟触摸开始
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 模拟小幅滑动（不足阈值）
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 190, clientY: 50 }],
      })

      await wrapper.trigger("touchend")
      await nextTick()

      // 滑动距离不足，不应打开
      expect(wrapper.emitted("open")).toBeFalsy()
    })

    it("垂直滚动时不应水平滑动", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      // 模拟触摸开始
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 模拟垂直滚动（Y 方向移动更大）
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 195, clientY: 100 }],
      })

      await wrapper.trigger("touchend")
      await nextTick()

      // 不应触发 open 事件
      expect(wrapper.emitted("open")).toBeFalsy()
    })
  })

  describe("事件触发", () => {
    it("打开时应触发 open 事件并携带正确参数", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "test-cell", rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 模拟滑动打开
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100, clientY: 50 }],
      })
      await wrapper.trigger("touchend")
      await nextTick()

      const openEvents = wrapper.emitted("open")
      expect(openEvents).toBeTruthy()
      expect(openEvents![0][0]).toEqual({
        name: "test-cell",
        position: "right",
      })
    })

    it("向右滑动打开时 position 应为 left", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "test-cell", leftWidth: 80 },
        slots: {
          left: "<div class='collect'>收藏</div>",
        },
      })

      // 模拟向右滑动
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 100, clientY: 50 }],
      })
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 200, clientY: 50 }],
      })
      await wrapper.trigger("touchend")
      await nextTick()

      const openEvents = wrapper.emitted("open")
      expect(openEvents).toBeTruthy()
      expect(openEvents![0][0]).toEqual({
        name: "test-cell",
        position: "left",
      })
    })

    it("点击内容区域应触发 click 事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        slots: {
          default: "<div class='content'>内容</div>",
        },
      })

      await wrapper.find(".ui-swipe-cell__wrapper").trigger("click")

      const clickEvents = wrapper.emitted("click")
      expect(clickEvents).toBeTruthy()
      expect(clickEvents![0][0]).toBe("cell")
    })

    it("点击左侧区域应触发 click 事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { leftWidth: 80 },
        slots: {
          left: "<div class='collect'>收藏</div>",
        },
      })

      await wrapper.find(".ui-swipe-cell__left").trigger("click")

      const clickEvents = wrapper.emitted("click")
      expect(clickEvents).toBeTruthy()
      expect(clickEvents![0][0]).toBe("left")
    })

    it("点击右侧区域应触发 click 事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      await wrapper.find(".ui-swipe-cell__right").trigger("click")

      const clickEvents = wrapper.emitted("click")
      expect(clickEvents).toBeTruthy()
      expect(clickEvents![0][0]).toBe("right")
    })
  })

  describe("暴露方法", () => {
    it("应暴露 open 方法", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应暴露 close 方法", () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("调用 open('right') 应打开右侧", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell", rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      await wrapper.vm.open("right")
      await nextTick()

      const openEvents = wrapper.emitted("open")
      expect(openEvents).toBeTruthy()
      expect(openEvents![0][0].position).toBe("right")
    })

    it("调用 open('left') 应打开左侧", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell", leftWidth: 80 },
        slots: {
          left: "<div class='collect'>收藏</div>",
        },
      })

      await wrapper.vm.open("left")
      await nextTick()

      const openEvents = wrapper.emitted("open")
      expect(openEvents).toBeTruthy()
      expect(openEvents![0][0].position).toBe("left")
    })

    it("调用 close 应关闭滑动单元格", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell", rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 再关闭
      await wrapper.vm.close()
      await nextTick()

      const closeEvents = wrapper.emitted("close")
      expect(closeEvents).toBeTruthy()
      expect(closeEvents![0][0].position).toBe("right")
    })
  })

  describe("beforeClose 回调", () => {
    it("beforeClose 返回 false 应阻止关闭", async () => {
      const beforeClose = vi.fn().mockReturnValue(false)
      const wrapper = mount(UiSwipeCell, {
        props: {
          name: "cell",
          rightWidth: 80,
          beforeClose,
        },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 尝试关闭
      await wrapper.vm.close()
      await nextTick()

      // beforeClose 应被调用
      expect(beforeClose).toHaveBeenCalled()

      // 不应触发 close 事件（因为被阻止）
      expect(wrapper.emitted("close")).toBeFalsy()
    })

    it("beforeClose 返回 true 应允许关闭", async () => {
      const beforeClose = vi.fn().mockReturnValue(true)
      const wrapper = mount(UiSwipeCell, {
        props: {
          name: "cell",
          rightWidth: 80,
          beforeClose,
        },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 关闭
      await wrapper.vm.close()
      await nextTick()

      // beforeClose 应被调用
      expect(beforeClose).toHaveBeenCalled()

      // 应触发 close 事件
      const closeEvents = wrapper.emitted("close")
      expect(closeEvents).toBeTruthy()
    })

    it("beforeClose 返回 Promise 应正确处理", async () => {
      const beforeClose = vi.fn().mockResolvedValue(true)
      const wrapper = mount(UiSwipeCell, {
        props: {
          name: "cell",
          rightWidth: 80,
          beforeClose,
        },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 关闭
      await wrapper.vm.close()
      await nextTick()

      // beforeClose 应被调用
      expect(beforeClose).toHaveBeenCalled()

      // 应触发 close 事件
      const closeEvents = wrapper.emitted("close")
      expect(closeEvents).toBeTruthy()
    })

    it("beforeClose 应接收正确的参数", async () => {
      const beforeClose = vi.fn().mockReturnValue(true)
      const wrapper = mount(UiSwipeCell, {
        props: {
          name: "cell",
          rightWidth: 80,
          beforeClose,
        },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 关闭
      await wrapper.vm.close()
      await nextTick()

      // 验证参数
      expect(beforeClose).toHaveBeenCalledWith({
        position: "right",
        close: expect.any(Function),
      })
    })
  })

  describe("点击自动关闭", () => {
    it("打开状态下点击内容区域应自动关闭", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell", rightWidth: 80 },
        slots: {
          default: "<div class='content'>内容</div>",
          right: "<div class='delete'>删除</div>",
        },
      })

      // 先打开
      await wrapper.vm.open("right")
      await nextTick()

      // 点击内容区域
      await wrapper.find(".ui-swipe-cell__wrapper").trigger("click")
      await nextTick()

      // 应触发 close 事件
      const closeEvents = wrapper.emitted("close")
      expect(closeEvents).toBeTruthy()
    })
  })

  describe("样式过渡", () => {
    it("拖动时过渡时间应为 0s", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      // 开始触摸
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })

      // 触摸移动中
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 150, clientY: 50 }],
      })

      const wrapperEl = wrapper.find(".ui-swipe-cell__wrapper")
      expect(wrapperEl.attributes("style")).toContain("0s")
    })

    it("拖动结束后过渡时间应为 0.3s", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      // 完整的触摸流程
      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 150, clientY: 50 }],
      })
      await wrapper.trigger("touchend")
      await nextTick()

      const wrapperEl = wrapper.find(".ui-swipe-cell__wrapper")
      expect(wrapperEl.attributes("style")).toContain("0.3s")
    })
  })

  describe("边界情况", () => {
    it("无 name 属性时事件参数应为空字符串", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      await wrapper.vm.open("right")
      await nextTick()

      const openEvents = wrapper.emitted("open")
      expect(openEvents).toBeTruthy()
      expect(openEvents![0][0].name).toBe("")
    })

    it("open 方法传入空字符串不应执行打开", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      await wrapper.vm.open("")
      await nextTick()

      expect(wrapper.emitted("open")).toBeFalsy()
    })

    it("未打开状态下调用 close 不应触发事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { rightWidth: 80 },
      })

      await wrapper.vm.close()
      await nextTick()

      expect(wrapper.emitted("close")).toBeFalsy()
    })

    it("leftWidth 和 rightWidth 都为 0 时不应有滑动效果", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { leftWidth: 0, rightWidth: 0 },
      })

      await wrapper.trigger("touchstart", {
        touches: [{ clientX: 200, clientY: 50 }],
      })
      await wrapper.trigger("touchmove", {
        touches: [{ clientX: 100, clientY: 50 }],
      })
      await wrapper.trigger("touchend")
      await nextTick()

      // 偏移应为 0
      const wrapperEl = wrapper.find(".ui-swipe-cell__wrapper")
      expect(wrapperEl.attributes("style")).toContain("translateX(0px)")
    })

    it("重复打开同一位置不应重复触发 open 事件", async () => {
      const wrapper = mount(UiSwipeCell, {
        props: { name: "cell", rightWidth: 80 },
        slots: {
          right: "<div class='delete'>删除</div>",
        },
      })

      // 第一次打开
      await wrapper.vm.open("right")
      await nextTick()

      // 第二次打开同一位置
      await wrapper.vm.open("right")
      await nextTick()

      // 只应触发一次
      const openEvents = wrapper.emitted("open")
      expect(openEvents?.length).toBe(1)
    })
  })
})
