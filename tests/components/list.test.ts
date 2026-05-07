/**
 * ui-list 组件单元测试
 * 测试列表组件的 props、events 与状态切换
 */

import UiList from "@/uni_modules/uniapp-ui/ui-list/ui-list.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-list 列表组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认列表组件", async () => {
      const wrapper = mount(UiList)
      await waitForTransition()
      expect(wrapper.find(".ui-list").exists()).toBe(true)
    })

    it("应支持默认插槽渲染列表项", async () => {
      const wrapper = mount(UiList, {
        slots: { default: "<view class='item'>A</view><view class='item'>B</view>" },
      })
      await waitForTransition()
      expect(wrapper.findAll(".item").length).toBe(2)
    })
  })

  describe("加载状态", () => {
    it("loading=true 时应显示加载文案", async () => {
      const wrapper = mount(UiList, {
        props: { loading: true, immediateCheck: false, loadingText: "加载中..." },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-list__loading-text").text()).toBe("加载中...")
    })

    it("finished=true 时应显示底线文案", async () => {
      const wrapper = mount(UiList, {
        props: { finished: true, immediateCheck: false, finishedText: "到底了" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-list__finished-text").text()).toBe("到底了")
    })

    it("error=true 时应显示错误文案", async () => {
      const wrapper = mount(UiList, {
        props: { error: true, immediateCheck: false, errorText: "失败" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-list__error-text").text()).toBe("失败")
    })

    it("无任何状态时不应渲染占位区", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: false },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-list__placeholder").exists()).toBe(false)
    })
  })

  describe("load 事件", () => {
    it("immediateCheck=true 时挂载后应触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: true },
      })
      await waitForTransition()
      expect(wrapper.emitted("load")).toBeTruthy()
      expect(wrapper.emitted("update:loading")?.[0]).toEqual([true])
    })

    it("immediateCheck=false 时挂载后不应触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: false },
      })
      await waitForTransition()
      expect(wrapper.emitted("load")).toBeFalsy()
    })

    it("loading=true 时不应再次触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { loading: true, immediateCheck: true },
      })
      await waitForTransition()
      expect(wrapper.emitted("load")).toBeFalsy()
    })

    it("finished=true 时不应触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { finished: true, immediateCheck: true },
      })
      await waitForTransition()
      expect(wrapper.emitted("load")).toBeFalsy()
    })

    it("loading 由 true 转 false 后应再次检查触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { loading: true, immediateCheck: false },
      })
      await waitForTransition()
      expect(wrapper.emitted("load")).toBeFalsy()

      await wrapper.setProps({ loading: false })
      await waitForTransition()

      expect(wrapper.emitted("load")).toBeTruthy()
    })
  })

  describe("错误重试", () => {
    it("点击错误占位应清除 error 并触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { error: true, immediateCheck: false },
      })
      await waitForTransition()

      await wrapper.find(".ui-list__error").trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("update:error")?.[0]).toEqual([false])
    })
  })

  describe("自定义占位插槽", () => {
    it("应支持 loading 插槽", async () => {
      const wrapper = mount(UiList, {
        props: { loading: true, immediateCheck: false },
        slots: { loading: "<view class='custom-loading'>自定义加载</view>" },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-loading").exists()).toBe(true)
    })

    it("应支持 finished 插槽", async () => {
      const wrapper = mount(UiList, {
        props: { finished: true, immediateCheck: false },
        slots: { finished: "<view class='custom-finished'>自定义底线</view>" },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-finished").exists()).toBe(true)
    })

    it("应支持 error 插槽", async () => {
      const wrapper = mount(UiList, {
        props: { error: true, immediateCheck: false },
        slots: { error: "<view class='custom-error'>自定义错误</view>" },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-error").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 check 方法", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: false },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.check).toBe("function")
    })

    it("应暴露 scrollTo 方法", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: false },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.scrollTo).toBe("function")
    })

    it("check 方法应触发 load", async () => {
      const wrapper = mount(UiList, {
        props: { immediateCheck: false },
      })
      await waitForTransition()

      wrapper.vm.check()
      await waitForTransition()

      expect(wrapper.emitted("load")).toBeTruthy()
    })
  })
})
