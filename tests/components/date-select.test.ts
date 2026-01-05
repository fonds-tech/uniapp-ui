import UiDateSelect from "@/uni_modules/uniapp-ui/ui-date-select/ui-date-select.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiDateSelect 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-select").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是空字符串", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应该支持字符串类型的值", () => {
      const wrapper = mount(UiDateSelect, {
        props: { modelValue: "2024-01-15" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("2024-01-15")
    })

    it("应该支持 Date 类型的值", () => {
      const date = new Date("2024-01-15")
      const wrapper = mount(UiDateSelect, {
        props: { modelValue: date },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(date)
    })

    it("应该支持数字时间戳类型的值", () => {
      const timestamp = Date.now()
      const wrapper = mount(UiDateSelect, {
        props: { modelValue: timestamp },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(timestamp)
    })
  })

  describe("columns 属性测试", () => {
    it("默认 columns 应该是 ['year', 'month', 'day']", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["year", "month", "day"])
    })

    it("应该支持自定义列类型", () => {
      const wrapper = mount(UiDateSelect, {
        props: { columns: ["year", "month"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["year", "month"])
    })

    it("应该支持时间列", () => {
      const wrapper = mount(UiDateSelect, {
        props: { columns: ["hour", "minute", "second"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["hour", "minute", "second"])
    })
  })

  describe("format 属性测试", () => {
    it("默认 format 应该是 'YYYY-MM-DD'", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("format")).toBe("YYYY-MM-DD")
    })

    it("应该支持自定义格式", () => {
      const wrapper = mount(UiDateSelect, {
        props: { format: "YYYY/MM/DD" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("format")).toBe("YYYY/MM/DD")
    })
  })

  describe("placeholder 属性测试", () => {
    it("默认 placeholder 应该是 '请选择日期'", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("placeholder")).toBe("请选择日期")
    })

    it("应该支持自定义 placeholder", () => {
      const wrapper = mount(UiDateSelect, {
        props: { placeholder: "请选择出生日期" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("placeholder")).toBe("请选择出生日期")
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(false)
    })

    it("应该支持禁用状态", () => {
      const wrapper = mount(UiDateSelect, {
        props: { disabled: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("disabled")).toBe(true)
    })
  })

  describe("readonly 属性测试", () => {
    it("默认不是只读状态", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("readonly")).toBe(false)
    })

    it("应该支持只读状态", () => {
      const wrapper = mount(UiDateSelect, {
        props: { readonly: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("readonly")).toBe(true)
    })
  })

  describe("mode 属性测试", () => {
    it("默认 mode 应该是 bottom", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("bottom")
    })

    it("应该支持 center 模式", () => {
      const wrapper = mount(UiDateSelect, {
        props: { mode: "center" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("center")
    })
  })

  describe("日期范围属性测试", () => {
    it("应该支持 minDate", () => {
      const wrapper = mount(UiDateSelect, {
        props: { minDate: "2024-01-01" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("minDate")).toBe("2024-01-01")
    })

    it("应该支持 maxDate", () => {
      const wrapper = mount(UiDateSelect, {
        props: { maxDate: "2024-12-31" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("maxDate")).toBe("2024-12-31")
    })
  })

  describe("rightIcon 属性测试", () => {
    it("默认 rightIcon 应该是 right", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("rightIcon")).toBe("right")
    })

    it("应该支持自定义右侧图标", () => {
      const wrapper = mount(UiDateSelect, {
        props: { rightIcon: "calendar" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("rightIcon")).toBe("calendar")
    })
  })

  describe("textAlign 属性测试", () => {
    it("默认 textAlign 应该是 left", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("left")
    })

    it("应该支持 center 对齐", () => {
      const wrapper = mount(UiDateSelect, {
        props: { textAlign: "center" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("center")
    })

    it("应该支持 right 对齐", () => {
      const wrapper = mount(UiDateSelect, {
        props: { textAlign: "right" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("textAlign")).toBe("right")
    })
  })

  describe("title 属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mount(UiDateSelect, {
        props: { title: "选择出生日期" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("title")).toBe("选择出生日期")
    })
  })

  describe("cancelText 属性测试", () => {
    it("默认取消按钮文字应该是 '取消'", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("取消")
    })
  })

  describe("confirmText 属性测试", () => {
    it("默认确认按钮文字应该是 '确认'", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("confirmText")).toBe("确认")
    })
  })

  describe("columnHeight 属性测试", () => {
    it("默认 columnHeight 应该是 88rpx", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("88rpx")
    })
  })

  describe("visibleColumnNum 属性测试", () => {
    it("默认 visibleColumnNum 应该是 5", () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(5)
    })
  })

  describe("displayFormatter 属性测试", () => {
    it("应该支持 displayFormatter 函数", () => {
      const displayFormatter = vi.fn()
      const wrapper = mount(UiDateSelect, {
        props: { displayFormatter },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("displayFormatter")).toBe(displayFormatter)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiDateSelect, {
        props: { customClass: "my-date-select" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-select.my-date-select").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const customStyle = { padding: "20rpx" }
      const wrapper = mount(UiDateSelect, {
        props: { customStyle },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual(customStyle)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiDateSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-select").exists()).toBe(true)
      expect(wrapper.props("placeholder")).toBe("请选择日期")
      expect(wrapper.props("format")).toBe("YYYY-MM-DD")
    })
  })
})
