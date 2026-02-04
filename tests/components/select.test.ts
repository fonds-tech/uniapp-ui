import UiSelect from "@/uni_modules/uniapp-ui/ui-select/ui-select.vue"
import { mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiSelect 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const mockColumns = [
    { text: "选项一", value: "1" },
    { text: "选项二", value: "2" },
    { text: "选项三", value: "3" },
  ]

  const pickerStub = {
    name: "ui-picker",
    template: "<div class=\"ui-picker-stub\"></div>",
    props: ["show", "modelValue"],
    emits: ["update:show", "update:modelValue", "change", "cancel", "confirm", "open", "opened", "close", "closed"],
    methods: {
      confirm() {
        this.$emit("confirm", { values: ["1"], indexs: [0], columns: [] })
      },
      cancel() {
        this.$emit("cancel", { values: [], indexs: [] })
      },
      getSelectedValues() {
        return ["1"]
      },
      getSelectedIndexs() {
        return [0]
      },
      getSelectedColumns() {
        return [{ text: "选项一", value: "1" }]
      },
    },
  }

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-select").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是 undefined", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBeUndefined()
    })

    it("应该支持字符串类型的值", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, modelValue: "1" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("1")
    })

    it("应该支持数字类型的值", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, modelValue: 1 },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(1)
    })

    it("应该支持数组类型的值", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, modelValue: ["1", "2"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(["1", "2"])
    })
  })

  describe("multiple 属性测试", () => {
    it("默认不是多选模式", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("multiple")).toBe(false)
    })

    it("应该支持多选模式", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, multiple: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("multiple")).toBe(true)
    })
  })

  describe("columns 属性测试", () => {
    it("默认 columns 应该是空数组", () => {
      const wrapper = mount(UiSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual([])
    })

    it("应该支持设置选项数据", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(mockColumns)
    })
  })

  describe("columnsFields 属性测试", () => {
    it("默认字段映射应该包含 text, value, children", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      expect(wrapper.props("columnsFields")).toEqual({
        text: "text",
        value: "value",
        children: "children",
      })
    })

    it("应该支持自定义字段映射", () => {
      const customFields = { text: "label", value: "id", children: "items" }
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, columnsFields: customFields },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("columnsFields")).toEqual(customFields)
    })
  })

  describe("mode 属性测试", () => {
    it("默认 mode 应该是 bottom", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("bottom")
    })

    it("应该支持 center 模式", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, mode: "center" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("center")
    })
  })

  describe("placeholder 属性测试", () => {
    it("默认 placeholder 应该是 '请选择'", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("placeholder")).toBe("请选择")
    })

    it("应该支持自定义 placeholder", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, placeholder: "请选择选项" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("placeholder")).toBe("请选择选项")
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用状态", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, disabled: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("readonly 属性测试", () => {
    it("默认不是只读状态", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("readonly")).toBe(false)
    })

    it("应该支持只读状态", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, readonly: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("readonly")).toBe(true)
    })
  })

  describe("loading 属性测试", () => {
    it("默认不加载", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(false)
    })

    it("应该支持加载状态", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, loading: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(true)
    })
  })

  describe("displaySeparator 属性测试", () => {
    it("默认分隔符应该是 '/'", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("displaySeparator")).toBe("/")
    })

    it("应该支持自定义分隔符", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, displaySeparator: "-" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("displaySeparator")).toBe("-")
    })
  })

  describe("displayFormatter 属性测试", () => {
    it("应该支持 displayFormatter 函数", () => {
      const displayFormatter = vi.fn()
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, displayFormatter },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("displayFormatter")).toBe(displayFormatter)
    })
  })

  describe("rightIcon 属性测试", () => {
    it("默认 rightIcon 应该是 arrow", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("rightIcon")).toBe("arrow")
    })

    it("应该支持自定义右侧图标", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, rightIcon: "arrow-down" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("rightIcon")).toBe("arrow-down")
    })
  })

  describe("textAlign 属性测试", () => {
    it("默认 textAlign 应该是 left", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("left")
    })

    it("应该支持 center 对齐", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, textAlign: "center" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("center")
    })

    it("应该支持 right 对齐", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, textAlign: "right" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("right")
    })
  })

  describe("title 属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, title: "请选择选项" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("title")).toBe("请选择选项")
    })
  })

  describe("cancelText 属性测试", () => {
    it("默认取消按钮文字应该是 '取消'", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("取消")
    })
  })

  describe("confirmText 属性测试", () => {
    it("默认确认按钮文字应该是 '确认'", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("confirmText")).toBe("确认")
    })
  })

  describe("columnHeight 属性测试", () => {
    it("默认 columnHeight 应该是 88rpx", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("88rpx")
    })
  })

  describe("visibleColumnNum 属性测试", () => {
    it("默认 visibleColumnNum 应该是 5", () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(5)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, customClass: "my-select" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-select.my-select").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const customStyle = { padding: "20rpx" }
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns, customStyle },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      await waitForTransition()
      // 验证 props 正确传入
      expect(wrapper.props("customStyle")).toEqual(customStyle)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-select").exists()).toBe(true)
      expect(wrapper.props("columns")).toEqual([])
      expect(wrapper.props("placeholder")).toBe("请选择")
    })

    it("空选项时应该正常渲染", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: [] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-select").exists()).toBe(true)
    })
  })

  describe("交互与事件", () => {
    it("点击触发区应打开并触发 click 事件", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()

      await wrapper.find(".ui-select__trigger").trigger("click")
      await nextTick()

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.findComponent({ name: "ui-picker" }).props("show")).toBe(true)
    })

    it("picker update:model-value 应同步 update:modelValue", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()

      wrapper.findComponent({ name: "ui-picker" }).vm.$emit("update:model-value", ["1"])
      await nextTick()

      expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["1"])
    })

    it("confirm/cancel 事件应透传", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()

      const picker = wrapper.findComponent({ name: "ui-picker" })
      picker.vm.$emit("confirm", { values: ["1"], indexs: [0], columns: [] })
      picker.vm.$emit("cancel", { values: [], indexs: [] })
      await nextTick()

      expect(wrapper.emitted("confirm")).toBeTruthy()
      expect(wrapper.emitted("cancel")).toBeTruthy()
    })

    it("open/close 方法应控制显示状态", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()

      wrapper.vm.open()
      await nextTick()
      expect(wrapper.findComponent({ name: "ui-picker" }).props("show")).toBe(true)

      wrapper.vm.close()
      await nextTick()
      expect(wrapper.findComponent({ name: "ui-picker" }).props("show")).toBe(false)
    })

    it("getSelectedValues/Indexs/Columns 应返回 picker 结果", async () => {
      const wrapper = mount(UiSelect, {
        props: { columns: mockColumns },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-picker": pickerStub,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.vm.getSelectedValues()).toEqual(["1"])
      expect(wrapper.vm.getSelectedIndexs()).toEqual([0])
      expect(wrapper.vm.getSelectedColumns()).toEqual([{ text: "选项一", value: "1" }])
    })
  })
})
