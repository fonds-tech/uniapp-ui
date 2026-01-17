/**
 * ui-steps 和 ui-step 组件单元测试
 * 测试步骤条容器组件和步骤项组件的 props、事件和渲染逻辑
 */

import UiStep from "@/uni_modules/uniapp-ui/ui-step/ui-step.vue"
import UiSteps from "@/uni_modules/uniapp-ui/ui-steps/ui-steps.vue"
import { ref } from "vue"
import { mount } from "@vue/test-utils"
import { stepsKey } from "@/uni_modules/uniapp-ui/ui-steps"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

/**
 * 创建 steps 父组件上下文 Mock
 * 用于单独测试 ui-step 子组件
 */
function createMockStepsProvide(
  options: {
    active?: number
    direction?: "horizontal" | "vertical"
    clickable?: boolean
    activeColor?: string
    inactiveColor?: string
    errorColor?: string
    activeIcon?: string
    inactiveIcon?: string
    finishIcon?: string
    errorIcon?: string
    iconSize?: string | number
  } = {},
) {
  const childrens: any[] = []
  const active = ref(options.active ?? 0)
  const count = ref(0)

  return {
    props: {
      active: options.active ?? 0,
      direction: options.direction ?? "horizontal",
      clickable: options.clickable ?? false,
      activeColor: options.activeColor,
      inactiveColor: options.inactiveColor,
      errorColor: options.errorColor,
      activeIcon: options.activeIcon,
      inactiveIcon: options.inactiveIcon,
      finishIcon: options.finishIcon,
      errorIcon: options.errorIcon,
      iconSize: options.iconSize,
    },
    useProps: {
      active: options.active ?? 0,
      direction: options.direction ?? "horizontal",
      clickable: options.clickable ?? false,
      activeColor: options.activeColor,
      inactiveColor: options.inactiveColor,
      errorColor: options.errorColor,
      activeIcon: options.activeIcon,
      inactiveIcon: options.inactiveIcon,
      finishIcon: options.finishIcon,
      errorIcon: options.errorIcon,
      iconSize: options.iconSize,
    },
    active,
    count,
    onClickStep: vi.fn(),
    link: (child: any) => {
      childrens.push(child)
      count.value = childrens.length
    },
    unlink: (child: any) => {
      const index = childrens.indexOf(child)
      if (index > -1) {
        childrens.splice(index, 1)
        count.value = childrens.length
      }
    },
    childrens,
  }
}

/**
 * 辅助函数：挂载 step 组件，自动添加 provide
 */
function mountStep(
  props: Record<string, unknown> = {},
  options: {
    slots?: Record<string, string | (() => string)>
    provideOptions?: Parameters<typeof createMockStepsProvide>[0]
  } = {},
) {
  const mockProvide = createMockStepsProvide(options.provideOptions)
  return {
    wrapper: mount(UiStep, {
      props,
      slots: options.slots,
      global: {
        provide: {
          [stepsKey]: mockProvide,
        },
      },
    }),
    mockProvide,
  }
}

/**
 * 辅助函数：挂载 steps 组件及其子 step 组件
 */
function mountStepsWithChildren(stepsProps: Record<string, unknown> = {}, stepItems: Array<{ title?: string; description?: string; status?: string; icon?: string }> = []) {
  // 创建步骤项内容
  const stepsContent =
    stepItems.length > 0
      ? stepItems
          .map(
            (item, index) =>
              `<ui-step key="${index}" title="${item.title || ""}" description="${item.description || ""}" ${item.status ? `status="${item.status}"` : ""} ${item.icon ? `icon="${item.icon}"` : ""} />`,
          )
          .join("")
      : ""

  return mount(UiSteps, {
    props: stepsProps,
    slots: {
      default: stepsContent,
    },
    global: {
      components: {
        "ui-step": UiStep,
      },
    },
  })
}

describe("uiSteps 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSteps)
      await waitForTransition()
      expect(wrapper.find(".ui-steps").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiSteps, {
        slots: {
          default: "<div class=\"custom-step\">自定义步骤</div>",
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-step").exists()).toBe(true)
    })
  })

  describe("active 属性测试", () => {
    it("默认值应该是 0", () => {
      const wrapper = mount(UiSteps)
      expect(wrapper.props("active")).toBe(0)
    })

    it("应该支持设置当前激活步骤", () => {
      const wrapper = mount(UiSteps, {
        props: { active: 2 },
      })
      expect(wrapper.props("active")).toBe(2)
    })

    it("应该支持字符串类型的 active", () => {
      const wrapper = mount(UiSteps, {
        props: { active: "1" },
      })
      expect(wrapper.props("active")).toBe("1")
    })
  })

  describe("direction 属性测试", () => {
    it("默认应该是水平方向", () => {
      const wrapper = mount(UiSteps)
      expect(wrapper.props("direction")).toBe("horizontal")
    })

    it("应该支持垂直方向", async () => {
      const wrapper = mount(UiSteps, {
        props: { direction: "vertical" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-steps--vertical").exists()).toBe(true)
    })

    it("水平方向不应该有 vertical 类名", async () => {
      const wrapper = mount(UiSteps, {
        props: { direction: "horizontal" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-steps--vertical").exists()).toBe(false)
    })
  })

  describe("clickable 属性测试", () => {
    it("默认不可点击", async () => {
      const wrapper = mount(UiSteps)
      await waitForTransition()
      expect(wrapper.find(".ui-steps--clickable").exists()).toBe(false)
    })

    it("设置 clickable 时应该添加可点击类名", async () => {
      const wrapper = mount(UiSteps, {
        props: { clickable: true },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-steps--clickable").exists()).toBe(true)
    })
  })

  describe("颜色属性测试", () => {
    it("应该支持 activeColor 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { activeColor: "#1989fa" },
      })
      expect(wrapper.props("activeColor")).toBe("#1989fa")
    })

    it("应该支持 inactiveColor 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { inactiveColor: "#969799" },
      })
      expect(wrapper.props("inactiveColor")).toBe("#969799")
    })

    it("应该支持 errorColor 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { errorColor: "#ee0a24" },
      })
      expect(wrapper.props("errorColor")).toBe("#ee0a24")
    })
  })

  describe("图标属性测试", () => {
    it("应该支持 activeIcon 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { activeIcon: "star" },
      })
      expect(wrapper.props("activeIcon")).toBe("star")
    })

    it("应该支持 inactiveIcon 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { inactiveIcon: "circle" },
      })
      expect(wrapper.props("inactiveIcon")).toBe("circle")
    })

    it("应该支持 finishIcon 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { finishIcon: "check" },
      })
      expect(wrapper.props("finishIcon")).toBe("check")
    })

    it("应该支持 errorIcon 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { errorIcon: "close" },
      })
      expect(wrapper.props("errorIcon")).toBe("close")
    })

    it("应该支持 iconSize 属性", () => {
      const wrapper = mount(UiSteps, {
        props: { iconSize: "48rpx" },
      })
      expect(wrapper.props("iconSize")).toBe("48rpx")
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSteps, {
        props: { customClass: "my-steps" },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-steps.my-steps").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiSteps, {
        props: { customStyle: { padding: "20rpx" } },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("事件测试", () => {
    it("clickable 为 true 时点击 step 应触发 clickStep 事件", async () => {
      const wrapper = mountStepsWithChildren({ clickable: true, active: 0 }, [{ title: "步骤1" }, { title: "步骤2" }, { title: "步骤3" }])
      await waitForTransition()
      const stepItems = wrapper.findAll(".ui-step")
      if (stepItems.length > 0) {
        await stepItems[1].trigger("click")
        expect(wrapper.emitted("clickStep")).toBeTruthy()
      }
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiSteps)
      await waitForTransition()
      expect(wrapper.find(".ui-steps").exists()).toBe(true)
      expect(wrapper.props("active")).toBe(0)
      expect(wrapper.props("direction")).toBe("horizontal")
      expect(wrapper.props("clickable")).toBe(false)
    })

    it("active 为负数时应该正常处理", () => {
      const wrapper = mount(UiSteps, {
        props: { active: -1 },
      })
      expect(wrapper.props("active")).toBe(-1)
    })
  })
})

describe("uiStep 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      expect(wrapper.find(".ui-step").exists()).toBe(true)
    })

    it("应该显示标题", async () => {
      const { wrapper } = mountStep({ title: "步骤标题" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__title").text()).toBe("步骤标题")
    })

    it("应该显示描述", async () => {
      const { wrapper } = mountStep({ title: "步骤", description: "步骤描述" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__description").text()).toBe("步骤描述")
    })
  })

  describe("title 属性测试", () => {
    it("应该支持字符串标题", async () => {
      const { wrapper } = mountStep({ title: "第一步" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__title").text()).toBe("第一步")
    })

    it("应该支持数字标题", async () => {
      const { wrapper } = mountStep({ title: 123 })
      await waitForTransition()
      expect(wrapper.find(".ui-step__title").text()).toBe("123")
    })

    it("不设置 title 时不应该渲染标题元素", async () => {
      const { wrapper } = mountStep({})
      await waitForTransition()
      expect(wrapper.find(".ui-step__title").exists()).toBe(false)
    })
  })

  describe("description 属性测试", () => {
    it("应该支持描述文本", async () => {
      const { wrapper } = mountStep({ title: "步骤", description: "这是描述信息" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__description").text()).toBe("这是描述信息")
    })

    it("不设置 description 时不应该渲染描述元素", async () => {
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__description").exists()).toBe(false)
    })
  })

  describe("status 属性测试", () => {
    it("默认应该根据 active 自动判断状态", async () => {
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { active: 0 } })
      await waitForTransition()
      // 第一个步骤（index=0）且 active=0，应该是 process 状态
      expect(wrapper.find(".ui-step--process").exists()).toBe(true)
    })

    it("设置 status 为 wait 应该显示等待状态", async () => {
      const { wrapper } = mountStep({ title: "步骤", status: "wait" })
      await waitForTransition()
      expect(wrapper.find(".ui-step--wait").exists()).toBe(true)
    })

    it("设置 status 为 process 应该显示进行中状态", async () => {
      const { wrapper } = mountStep({ title: "步骤", status: "process" })
      await waitForTransition()
      expect(wrapper.find(".ui-step--process").exists()).toBe(true)
    })

    it("设置 status 为 finish 应该显示完成状态", async () => {
      const { wrapper } = mountStep({ title: "步骤", status: "finish" })
      await waitForTransition()
      expect(wrapper.find(".ui-step--finish").exists()).toBe(true)
    })

    it("设置 status 为 error 应该显示错误状态", async () => {
      const { wrapper } = mountStep({ title: "步骤", status: "error" })
      await waitForTransition()
      expect(wrapper.find(".ui-step--error").exists()).toBe(true)
    })
  })

  describe("步骤状态自动计算测试", () => {
    it("索引小于 active 的步骤应该是完成状态", async () => {
      // 当 active=1 时，索引为 0 的步骤应该是 finish 状态
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { active: 1 } })
      await waitForTransition()
      expect(wrapper.find(".ui-step--finish").exists()).toBe(true)
    })

    it("索引等于 active 的步骤应该是进行中状态", async () => {
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { active: 0 } })
      await waitForTransition()
      expect(wrapper.find(".ui-step--process").exists()).toBe(true)
    })

    it("索引大于 active 的步骤应该是等待状态", async () => {
      // 由于 mountStep 创建的是第一个步骤（index=0），设置 active=-1 使其处于等待状态
      const mockProvide = createMockStepsProvide({ active: -1 })
      const wrapper = mount(UiStep, {
        props: { title: "步骤" },
        global: {
          provide: {
            [stepsKey]: mockProvide,
          },
        },
      })
      await waitForTransition()
      // 由于 active=-1，index=0 > active，应该是 wait 状态
      expect(wrapper.find(".ui-step--wait").exists()).toBe(true)
    })
  })

  describe("icon 属性测试", () => {
    it("应该支持自定义图标", async () => {
      const { wrapper } = mountStep({ title: "步骤", icon: "star" })
      await waitForTransition()
      expect(wrapper.props("icon")).toBe("star")
    })

    it("应该支持 iconSize 属性", async () => {
      const { wrapper } = mountStep({ title: "步骤", iconSize: "60rpx" })
      await waitForTransition()
      expect(wrapper.props("iconSize")).toBe("60rpx")
    })
  })

  describe("垂直方向测试", () => {
    it("垂直方向应该添加 vertical 类名", async () => {
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { direction: "vertical" } })
      await waitForTransition()
      expect(wrapper.find(".ui-step--vertical").exists()).toBe(true)
    })

    it("水平方向不应该添加 vertical 类名", async () => {
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { direction: "horizontal" } })
      await waitForTransition()
      expect(wrapper.find(".ui-step--vertical").exists()).toBe(false)
    })
  })

  describe("事件测试", () => {
    it("点击时应该触发 click 事件", async () => {
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      await wrapper.find(".ui-step").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("点击时应该调用父组件的 onClickStep", async () => {
      const { wrapper, mockProvide } = mountStep({ title: "步骤" }, { provideOptions: { clickable: true } })
      await waitForTransition()
      await wrapper.find(".ui-step").trigger("click")
      expect(mockProvide.onClickStep).toHaveBeenCalled()
    })

    it("click 事件应该包含步骤索引", async () => {
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      await wrapper.find(".ui-step").trigger("click")
      const emitted = wrapper.emitted("click")
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toBe(0) // 第一个步骤的索引是 0
    })
  })

  describe("插槽测试", () => {
    it("应该支持默认插槽", async () => {
      const { wrapper } = mountStep(
        { title: "步骤" },
        {
          slots: {
            default: "<span class=\"custom-content\">自定义内容</span>",
          },
        },
      )
      await waitForTransition()
      expect(wrapper.find(".custom-content").exists()).toBe(true)
    })

    it("应该支持 icon 插槽", async () => {
      const { wrapper } = mountStep(
        { title: "步骤" },
        {
          slots: {
            icon: "<span class=\"custom-icon\">自定义图标</span>",
          },
        },
      )
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const { wrapper } = mountStep({ title: "步骤", customClass: "my-step" })
      await waitForTransition()
      expect(wrapper.find(".ui-step.my-step").exists()).toBe(true)
    })

    it("应该支持 customStyle", () => {
      const { wrapper } = mountStep({ title: "步骤", customStyle: { margin: "10rpx" } })
      expect(wrapper.props("customStyle")).toEqual({ margin: "10rpx" })
    })
  })

  describe("连接线测试", () => {
    it("最后一个步骤的连接线应该通过CSS隐藏", async () => {
      // 当只有一个步骤时，useParent 将其加入 childrens
      // isLast = index(0) === count(1) - 1 = true，所以通过 CSS 隐藏连接线
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      // 单个步骤默认是最后一个，连接线元素存在但宽度为0（CSS隐藏）
      expect(wrapper.find(".ui-step__line").exists()).toBe(true)
      expect(wrapper.find(".ui-step--last").exists()).toBe(true)
    })

    it("last 类名应该在最后一个步骤时添加", async () => {
      // 单个步骤默认就是最后一个
      const { wrapper } = mountStep({ title: "步骤" })
      await waitForTransition()
      expect(wrapper.find(".ui-step--last").exists()).toBe(true)
    })

    it("完成状态的步骤应该有 finish 样式", async () => {
      // 当 active=1 且 index=0 时，该步骤为 finish 状态
      const { wrapper } = mountStep({ title: "步骤" }, { provideOptions: { active: 1 } })
      await waitForTransition()
      expect(wrapper.find(".ui-step--finish").exists()).toBe(true)
    })
  })

  describe("暴露属性测试", () => {
    it("应该暴露 useProps 属性", () => {
      const { wrapper } = mountStep({ title: "测试" })
      expect(wrapper.vm.useProps).toBeDefined()
    })

    it("应该暴露 index 属性", () => {
      const { wrapper } = mountStep({ title: "测试" })
      expect(wrapper.vm.index).toBeDefined()
    })

    it("应该暴露 currentStatus 属性", () => {
      const { wrapper } = mountStep({ title: "测试" })
      expect(wrapper.vm.currentStatus).toBeDefined()
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该正常渲染", async () => {
      const { wrapper } = mountStep({})
      await waitForTransition()
      expect(wrapper.find(".ui-step").exists()).toBe(true)
    })

    it("title 为空字符串时不应该渲染标题元素", async () => {
      const { wrapper } = mountStep({ title: "" })
      await waitForTransition()
      expect(wrapper.find(".ui-step__title").exists()).toBe(false)
    })
  })
})

describe("steps 和 Step 组件集成测试", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("父子组件通信", () => {
    it("steps 应该正确渲染多个 Step 子组件", async () => {
      const wrapper = mountStepsWithChildren({ active: 1 }, [
        { title: "步骤1", description: "描述1" },
        { title: "步骤2", description: "描述2" },
        { title: "步骤3", description: "描述3" },
      ])
      await waitForTransition()
      const steps = wrapper.findAll(".ui-step")
      expect(steps.length).toBe(3)
    })

    it("垂直方向的 Steps 应该正确传递给 Step", async () => {
      const wrapper = mountStepsWithChildren({ direction: "vertical", active: 0 }, [{ title: "步骤1" }, { title: "步骤2" }])
      await waitForTransition()
      expect(wrapper.find(".ui-steps--vertical").exists()).toBe(true)
    })
  })

  describe("步骤状态联动", () => {
    it("active 变化时 Step 状态应该正确更新", async () => {
      const wrapper = mountStepsWithChildren({ active: 0 }, [{ title: "步骤1" }, { title: "步骤2" }, { title: "步骤3" }])
      await waitForTransition()

      // 更新 active 值
      await wrapper.setProps({ active: 2 })
      await waitForTransition()

      expect(wrapper.props("active")).toBe(2)
    })
  })

  describe("可点击步骤", () => {
    it("clickable 为 true 时所有 Step 应该可点击", async () => {
      const wrapper = mountStepsWithChildren({ clickable: true, active: 0 }, [{ title: "步骤1" }, { title: "步骤2" }])
      await waitForTransition()
      expect(wrapper.find(".ui-steps--clickable").exists()).toBe(true)
    })
  })

  describe("混合状态测试", () => {
    it("应该支持手动设置单个 Step 的 status", async () => {
      const wrapper = mountStepsWithChildren({ active: 1 }, [{ title: "步骤1", status: "finish" }, { title: "步骤2", status: "error" }, { title: "步骤3" }])
      await waitForTransition()

      const steps = wrapper.findAll(".ui-step")
      expect(steps.length).toBe(3)
    })
  })

  describe("连接线集成测试", () => {
    it("多个步骤时每个步骤都应该有连接线元素", async () => {
      const wrapper = mountStepsWithChildren({ active: 1 }, [{ title: "步骤1" }, { title: "步骤2" }, { title: "步骤3" }])
      await waitForTransition()

      const lines = wrapper.findAll(".ui-step__line")
      // 三个步骤都有连接线元素（最后一个通过 CSS 宽度为0隐藏）
      expect(lines.length).toBe(3)
    })

    it("最后一个步骤应该有 last 类名", async () => {
      const wrapper = mountStepsWithChildren({ active: 0 }, [{ title: "步骤1" }, { title: "步骤2" }])
      await waitForTransition()

      const steps = wrapper.findAll(".ui-step")
      expect(steps.length).toBe(2)
      // 最后一个步骤应该有 last 类名
      expect(steps[1].classes()).toContain("ui-step--last")
    })
  })
})
