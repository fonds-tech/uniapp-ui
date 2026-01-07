/**
 * ui-checkbox-group 组件单元测试
 * 测试复选框组组件的 props、events 和渲染逻辑
 */

import UiCheckbox from "@/uni_modules/uniapp-ui/ui-checkbox/ui-checkbox.vue"
import UiCheckboxGroup from "@/uni_modules/uniapp-ui/ui-checkbox-group/ui-checkbox-group.vue"
import { h } from "vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-checkbox-group 复选框组组件", () => {
  // 启用 fake timers
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认复选框组组件", async () => {
      const wrapper = mount(UiCheckboxGroup)
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox-group").exists()).toBe(true)
    })

    it("应正确渲染带插槽内容", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        slots: { default: "<div class='test-checkbox'>复选框</div>" },
      })
      await waitForTransition()

      expect(wrapper.find(".test-checkbox").exists()).toBe(true)
    })
  })

  describe("绑定值", () => {
    it("默认 modelValue 应为空数组", () => {
      const wrapper = mount(UiCheckboxGroup)

      expect(wrapper.props("modelValue")).toEqual([])
    })

    it("应支持初始选中值", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"] },
      })

      expect(wrapper.props("modelValue")).toEqual(["a", "b"])
    })

    it("修改 modelValue 应触发 change 事件", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"] },
      })
      await waitForTransition()

      await wrapper.setProps({ modelValue: ["a", "b"] })
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("最大选择数量", () => {
    it("默认 max 应为 Infinity", () => {
      const wrapper = mount(UiCheckboxGroup)

      expect(wrapper.props("max")).toBe(Infinity)
    })

    it("应支持设置最大选择数量", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { max: 2 },
      })

      expect(wrapper.props("max")).toBe(2)
    })
  })

  describe("布局方向", () => {
    it("默认应为水平布局", async () => {
      const wrapper = mount(UiCheckboxGroup)
      await waitForTransition()

      expect(wrapper.classes()).not.toContain("ui-checkbox-group--vertical")
    })

    it("vertical 为 true 时应添加垂直类名", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { vertical: true },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("ui-checkbox-group--vertical")
    })
  })

  describe("禁用状态", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiCheckboxGroup)

      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应支持禁用整个组", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { disabled: true },
      })

      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("间距配置", () => {
    it("应支持设置复选框间距", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { gap: "20rpx" },
      })

      expect(wrapper.props("gap")).toBe("20rpx")
    })

    it("应支持数值类型间距", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { gap: 20 },
      })

      expect(wrapper.props("gap")).toBe(20)
    })
  })

  describe("图标配置", () => {
    it("应支持设置图标名称", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { icon: "success" },
      })

      expect(wrapper.props("icon")).toBe("success")
    })

    it("应支持设置形状", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { shape: "icon" },
      })

      expect(wrapper.props("shape")).toBe("icon")
    })

    it("应支持设置圆形图标", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { round: true },
      })

      expect(wrapper.props("round")).toBe(true)
    })

    it("应支持设置图标大小", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { iconSize: "40rpx" },
      })

      expect(wrapper.props("iconSize")).toBe("40rpx")
    })

    it("应支持设置图标颜色", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { iconColor: "#999" },
      })

      expect(wrapper.props("iconColor")).toBe("#999")
    })

    it("应支持设置选中图标颜色", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { checkedIconColor: "#1989fa" },
      })

      expect(wrapper.props("checkedIconColor")).toBe("#1989fa")
    })
  })

  describe("标签配置", () => {
    it("应支持设置标签大小", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelSize: "28rpx" },
      })

      expect(wrapper.props("labelSize")).toBe("28rpx")
    })

    it("应支持设置标签颜色", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelColor: "#333" },
      })

      expect(wrapper.props("labelColor")).toBe("#333")
    })

    it("应支持设置标签粗细", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelWeight: 600 },
      })

      expect(wrapper.props("labelWeight")).toBe(600)
    })

    it("应支持设置标签间距", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelGap: "16rpx" },
      })

      expect(wrapper.props("labelGap")).toBe("16rpx")
    })

    it("应支持标签在左侧", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelLeft: true },
      })

      expect(wrapper.props("labelLeft")).toBe(true)
    })

    it("应支持禁用标签点击", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { labelDisabled: true },
      })

      expect(wrapper.props("labelDisabled")).toBe(true)
    })

    it("应支持选中时的标签颜色", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { checkedLabelColor: "#1989fa" },
      })

      expect(wrapper.props("checkedLabelColor")).toBe("#1989fa")
    })
  })

  describe("选中颜色", () => {
    it("应支持设置选中颜色", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { checkedColor: "#ff6600" },
      })

      expect(wrapper.props("checkedColor")).toBe("#ff6600")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { customClass: "my-checkbox-group" },
      })
      await waitForTransition()

      expect(wrapper.classes()).toContain("my-checkbox-group")
    })

    it("应支持自定义样式对象", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox-group").exists()).toBe(true)
    })
  })

  describe("暴露的方法", () => {
    it("应暴露 toggleAll 方法", async () => {
      const wrapper = mount(UiCheckboxGroup)
      await waitForTransition()

      expect(typeof wrapper.vm.toggleAll).toBe("function")
    })
  })

  describe("与 ui-checkbox 配合使用", () => {
    it("应正确渲染嵌套的复选框", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: {
          components: { UiCheckbox },
        },
      })
      await waitForTransition()

      expect(wrapper.findAllComponents(UiCheckbox).length).toBe(2)
    })
  })

  describe("边界情况", () => {
    it("无子复选框时应正常渲染", async () => {
      const wrapper = mount(UiCheckboxGroup)
      await waitForTransition()

      expect(wrapper.find(".ui-checkbox-group").exists()).toBe(true)
    })

    it("空数组值应正常处理", () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
      })

      expect(wrapper.props("modelValue")).toEqual([])
    })
  })

  describe("子 checkbox 交互", () => {
    it("点击子 checkbox 应触发 group 的 change 事件", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: {
          components: { UiCheckbox },
        },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("勾选所有子 checkbox 后应触发 change 事件", async () => {
      const modelValue: string[] = []
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: {
          components: { UiCheckbox },
        },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)

      await checkboxes[0].trigger("click")
      await waitForTransition()

      await checkboxes[1].trigger("click")
      await waitForTransition()

      const changeEvents = wrapper.emitted("change")
      expect(changeEvents).toBeTruthy()
      expect(changeEvents!.length).toBeGreaterThanOrEqual(2)
    })

    it("取消勾选子 checkbox 应触发 change 事件", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: {
          components: { UiCheckbox },
        },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("deep watch 数组变化", () => {
    it("数组内容变化应触发 change 事件", async () => {
      const modelValue = ["a"]
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue },
      })
      await waitForTransition()

      modelValue.push("b")
      await wrapper.setProps({ modelValue: [...modelValue] })
      await waitForTransition()

      expect(wrapper.emitted("change")).toBeTruthy()
    })
  })

  describe("max 限制交互行为", () => {
    it("达到 max 后点击未选中选项应被阻止", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"], max: 2 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      // 点击第三个未选中的选项
      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[2].trigger("click")
      await waitForTransition()

      // update:modelValue 不应包含 "c"
      const updateEvents = wrapper.emitted("update:modelValue")
      if (updateEvents) {
        const lastPayload = updateEvents[updateEvents.length - 1][0] as string[]
        expect(lastPayload).not.toContain("c")
      }
    })

    it("未达到 max 时点击未选中选项应正常添加", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"], max: 2 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[1].trigger("click")
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      expect(lastPayload).toContain("b")
    })
  })

  describe("min 限制交互行为", () => {
    it("达到 min 后点击已选中选项应被阻止", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"], min: 1 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      // 点击已选中的选项尝试取消
      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      // 不应触发 update:modelValue 移除 "a"
      const updateEvents = wrapper.emitted("update:modelValue")
      if (updateEvents) {
        const lastPayload = updateEvents[updateEvents.length - 1][0] as string[]
        expect(lastPayload).toContain("a")
      }
    })

    it("超过 min 时点击已选中选项应正常移除", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"], min: 1 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      expect(lastPayload).not.toContain("a")
      expect(lastPayload).toContain("b")
    })
  })

  describe("toggleAll 方法行为", () => {
    it("toggleAll(true) 应全选所有选项", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      wrapper.vm.toggleAll(true)
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      expect(lastPayload).toContain("a")
      expect(lastPayload).toContain("b")
      expect(lastPayload).toContain("c")
    })

    it("toggleAll(true) 应受 max 限制", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [], max: 2 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      wrapper.vm.toggleAll(true)
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      // 只能选中前两个
      expect(lastPayload.length).toBe(2)
    })

    it("toggleAll(false) 应取消全选", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b", "c"] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      wrapper.vm.toggleAll(false)
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      expect(lastPayload.length).toBe(0)
    })

    it("toggleAll(false) 应受 min 限制", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b", "c"], min: 2 },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      wrapper.vm.toggleAll(false)
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      // 应保留前两个
      expect(lastPayload.length).toBe(2)
    })

    it("toggleAll() 无参数应切换状态", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      // 切换：未选中的变选中
      wrapper.vm.toggleAll()
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
    })
  })

  describe("change 事件 payload 校验", () => {
    it("点击选中应返回包含该值的数组", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      expect(updateEvents![0][0]).toEqual(["a"])
    })

    it("点击取消应返回不包含该值的数组", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      expect(updateEvents![0][0]).toEqual(["b"])
    })

    it("连续点击多个选项应累加到数组", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      const checkboxes = wrapper.findAllComponents(UiCheckbox)
      await checkboxes[0].trigger("click")
      await waitForTransition()
      await checkboxes[1].trigger("click")
      await waitForTransition()

      const updateEvents = wrapper.emitted("update:modelValue")
      expect(updateEvents).toBeTruthy()
      expect(updateEvents!.length).toBe(2)
      const lastPayload = updateEvents![updateEvents!.length - 1][0] as string[]
      expect(lastPayload).toContain("a")
      expect(lastPayload).toContain("b")
      expect(lastPayload.length).toBe(2)
    })
  })

  describe("expose 方法测试", () => {
    it("getCheckedCount 应返回当前选中数量", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"] },
        slots: {
          default: () => [h(UiCheckbox, { name: "a", label: "选项A" }), h(UiCheckbox, { name: "b", label: "选项B" }), h(UiCheckbox, { name: "c", label: "选项C" })],
        },
        global: { components: { UiCheckbox } },
      })
      await waitForTransition()

      expect(wrapper.vm.getCheckedCount()).toBe(2)
    })

    it("getCheckedCount 空选中时返回 0", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
      })
      await waitForTransition()

      expect(wrapper.vm.getCheckedCount()).toBe(0)
    })

    it("isAtMinimum 达到最小值时返回 true", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"], min: 1 },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMinimum()).toBe(true)
    })

    it("isAtMinimum 超过最小值时返回 false", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"], min: 1 },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMinimum()).toBe(false)
    })

    it("isAtMinimum 无 min 限制时应返回 true（0 <= 0）", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: [] },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMinimum()).toBe(true)
    })

    it("isAtMaximum 达到最大值时返回 true", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b"], max: 2 },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMaximum()).toBe(true)
    })

    it("isAtMaximum 未达到最大值时返回 false", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a"], max: 2 },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMaximum()).toBe(false)
    })

    it("isAtMaximum 无 max 限制时应返回 false", async () => {
      const wrapper = mount(UiCheckboxGroup, {
        props: { modelValue: ["a", "b", "c"] },
      })
      await waitForTransition()

      expect(wrapper.vm.isAtMaximum()).toBe(false)
    })
  })
})
