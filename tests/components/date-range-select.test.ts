import UiDateRangeSelect from "@/uni_modules/uniapp-ui/ui-date-range-select/ui-date-range-select.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiDateRangeSelect 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select").exists()).toBe(true)
    })

    it("应该渲染开始和结束两个触发区域", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select__start").exists()).toBe(true)
      expect(wrapper.find(".ui-date-range-select__end").exists()).toBe(true)
    })

    it("应该渲染分隔符", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select__separator").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是空数组", () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual([])
    })

    it("应该支持日期区间数组", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { modelValue: ["2024-01-01", "2024-01-31"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(["2024-01-01", "2024-01-31"])
    })
  })

  describe("placeholder 属性测试", () => {
    it("默认 startPlaceholder 应该是 '开始日期'", () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("startPlaceholder")).toBe("开始日期")
    })

    it("默认 endPlaceholder 应该是 '结束日期'", () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("endPlaceholder")).toBe("结束日期")
    })

    it("应该支持自定义开始占位文案", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { startPlaceholder: "入住日期" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("startPlaceholder")).toBe("入住日期")
    })

    it("应该支持自定义结束占位文案", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { endPlaceholder: "退房日期" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("endPlaceholder")).toBe("退房日期")
    })
  })

  describe("separator 属性测试", () => {
    it("默认 separator 应该是 '至'", () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("separator")).toBe("至")
    })

    it("应该支持自定义分隔符", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { separator: "→" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("separator")).toBe("→")
    })
  })

  describe("columns 属性测试", () => {
    it("默认 columns 应该是 ['year', 'month', 'day']", () => {
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
  })

  describe("format 属性测试", () => {
    it("默认 format 应该是 'YYYY-MM-DD'", () => {
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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

  describe("disabled 属性测试", () => {
    it("默认不禁用", () => {
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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

  describe("title 属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { title: "选择日期范围" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("title")).toBe("选择日期范围")
    })
  })

  describe("cancelText 属性测试", () => {
    it("默认取消按钮文字应该是 '取消'", () => {
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
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
      const wrapper = mount(UiDateRangeSelect, {
        props: { customClass: "my-date-range-select" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select.my-date-range-select").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const customStyle = { padding: "20rpx" }
      const wrapper = mount(UiDateRangeSelect, {
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

    it("应该支持 separatorColor", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { separatorColor: "#ff0000" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("separatorColor")).toBe("#ff0000")
    })
  })

  describe("autoSwitchToEnd 属性测试", () => {
    it("默认 autoSwitchToEnd 应该是 true", () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("autoSwitchToEnd")).toBe(true)
    })

    it("应该支持关闭自动切换", () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { autoSwitchToEnd: false },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      expect(wrapper.props("autoSwitchToEnd")).toBe(false)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select").exists()).toBe(true)
      expect(wrapper.props("startPlaceholder")).toBe("开始日期")
      expect(wrapper.props("endPlaceholder")).toBe("结束日期")
      expect(wrapper.props("separator")).toBe("至")
      expect(wrapper.props("format")).toBe("YYYY-MM-DD")
    })

    it("空数组时应该正常渲染", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { modelValue: [] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select").exists()).toBe(true)
    })

    it("只有开始日期时应该正常渲染", async () => {
      const wrapper = mount(UiDateRangeSelect, {
        props: { modelValue: ["2024-01-01", ""] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-date-picker": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-date-range-select").exists()).toBe(true)
    })
  })
})
