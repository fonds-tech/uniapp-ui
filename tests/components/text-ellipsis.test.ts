/**
 * ui-text-ellipsis 组件单元测试
 * 测试文本折叠组件的渲染与展开收起逻辑
 */

import UiTextEllipsis from "@/uni_modules/uniapp-ui/ui-text-ellipsis/ui-text-ellipsis.vue"
import { mount } from "@vue/test-utils"
import { useRects } from "@/uni_modules/uniapp-ui/hooks"
import { nextTick } from "vue"
import { it, vi, expect, describe, beforeEach } from "vitest"

vi.mock("@/uni_modules/uniapp-ui/hooks", async () => {
  const actual = await vi.importActual<typeof import("@/uni_modules/uniapp-ui/hooks")>("@/uni_modules/uniapp-ui/hooks")
  return {
    ...actual,
    useRects: vi.fn(),
  }
})

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0))

describe("ui-text-ellipsis 文本省略组件", () => {
  const mockedUseRects = vi.mocked(useRects)

  beforeEach(() => {
    mockedUseRects.mockReset()
  })

  it("应正确渲染文本内容", async () => {
    mockedUseRects.mockResolvedValue([{ height: 20 } as any])

    const wrapper = mount(UiTextEllipsis, {
      props: {
        content: "这是一段文本",
        showAction: true,
      },
    })

    await nextTick()
    await flushPromises()

    expect(wrapper.find(".ui-text-ellipsis__content").text()).toContain("这是一段文本")
    expect(wrapper.find(".ui-text-ellipsis__footer").exists()).toBe(false)
  })

  it("溢出时应显示操作并支持展开收起", async () => {
    mockedUseRects.mockImplementation(async (selector: string) => {
      if (selector.includes("measure")) return [{ height: 80 } as any]
      return [{ height: 40 } as any]
    })

    const wrapper = mount(UiTextEllipsis, {
      props: {
        content: "这是一段超长文本，用于测试展开与收起",
        expandText: "展开",
        collapseText: "收起",
      },
    })

    await nextTick()
    await flushPromises()

    const action = wrapper.find(".ui-text-ellipsis__action")
    expect(action.exists()).toBe(true)
    expect(action.text()).toBe("展开")

    await action.trigger("click")
    await nextTick()

    expect(wrapper.emitted("change")?.[0]).toEqual([true])
    expect(wrapper.find(".ui-text-ellipsis__action").text()).toBe("收起")
  })

  it("showAction 为 false 时不应显示操作区", async () => {
    mockedUseRects.mockImplementation(async (selector: string) => {
      if (selector.includes("measure")) return [{ height: 80 } as any]
      return [{ height: 40 } as any]
    })

    const wrapper = mount(UiTextEllipsis, {
      props: {
        content: "文本内容",
        showAction: false,
      },
    })

    await nextTick()
    await flushPromises()

    expect(wrapper.find(".ui-text-ellipsis__footer").exists()).toBe(false)
  })

  it("应暴露 expand/collapse/toggle 方法并触发 change", async () => {
    mockedUseRects.mockResolvedValue([{ height: 20 } as any])

    const wrapper = mount(UiTextEllipsis, {
      props: {
        content: "文本内容",
      },
    })

    wrapper.vm.expand()
    await nextTick()
    expect(wrapper.emitted("change")?.[0]).toEqual([true])

    wrapper.vm.collapse()
    await nextTick()
    expect(wrapper.emitted("change")?.[1]).toEqual([false])

    wrapper.vm.toggle()
    await nextTick()
    expect(wrapper.emitted("change")?.[2]).toEqual([true])
  })

  it("点击根元素应触发 click 事件", async () => {
    mockedUseRects.mockResolvedValue([{ height: 20 } as any])

    const wrapper = mount(UiTextEllipsis, {
      props: {
        content: "文本内容",
      },
    })

    await wrapper.trigger("click")

    expect(wrapper.emitted("click")).toBeTruthy()
  })
})
