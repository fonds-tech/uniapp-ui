import UiDatePicker from "@/uni_modules/uniapp-ui/ui-date-picker/ui-date-picker.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiDatePicker 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiDatePicker, {
        props: { show: true },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      // 等待过渡动画完成
      await waitForTransition()
      expect(wrapper.find(".ui-date-picker").exists()).toBe(true)
    })
  })

  describe("show 属性测试", () => {
    it("默认不显示", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("show")).toBe(false)
    })

    it("show 为 true 时应该显示", () => {
      const wrapper = mount(UiDatePicker, {
        props: { show: true },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是空字符串", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应该支持字符串类型的日期值", () => {
      const wrapper = mount(UiDatePicker, {
        props: { modelValue: "2024-01-15" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("2024-01-15")
    })

    it("应该支持 Date 类型的日期值", () => {
      const date = new Date("2024-01-15")
      const wrapper = mount(UiDatePicker, {
        props: { modelValue: date },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(date)
    })

    it("应该支持时间戳类型的日期值", () => {
      const timestamp = 1705276800000
      const wrapper = mount(UiDatePicker, {
        props: { modelValue: timestamp },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(timestamp)
    })
  })

  describe("columns 属性测试", () => {
    it("默认 columns 应该是 year, month, day", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["year", "month", "day"])
    })

    it("应该支持只选择年月", () => {
      const wrapper = mount(UiDatePicker, {
        props: { columns: ["year", "month"] },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["year", "month"])
    })

    it("应该支持选择时分秒", () => {
      const wrapper = mount(UiDatePicker, {
        props: { columns: ["hour", "minute", "second"] },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["hour", "minute", "second"])
    })

    it("应该支持完整日期时间", () => {
      const wrapper = mount(UiDatePicker, {
        props: { columns: ["year", "month", "day", "hour", "minute"] },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(["year", "month", "day", "hour", "minute"])
    })
  })

  describe("minDate 属性测试", () => {
    it("应该支持设置最小日期", () => {
      const minDate = "2020-01-01"
      const wrapper = mount(UiDatePicker, {
        props: { minDate },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("minDate")).toBe(minDate)
    })

    it("应该支持 Date 类型的最小日期", () => {
      const minDate = new Date("2020-01-01")
      const wrapper = mount(UiDatePicker, {
        props: { minDate },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("minDate")).toEqual(minDate)
    })
  })

  describe("maxDate 属性测试", () => {
    it("应该支持设置最大日期", () => {
      const maxDate = "2030-12-31"
      const wrapper = mount(UiDatePicker, {
        props: { maxDate },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("maxDate")).toBe(maxDate)
    })

    it("应该支持 Date 类型的最大日期", () => {
      const maxDate = new Date("2030-12-31")
      const wrapper = mount(UiDatePicker, {
        props: { maxDate },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("maxDate")).toEqual(maxDate)
    })
  })

  describe("format 属性测试", () => {
    it("默认 format 应该是 YYYY-MM-DD HH:mm:ss", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("format")).toBe("YYYY-MM-DD HH:mm:ss")
    })

    it("应该支持自定义格式", () => {
      const wrapper = mount(UiDatePicker, {
        props: { format: "YYYY/MM/DD" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("format")).toBe("YYYY/MM/DD")
    })
  })

  describe("mode 属性测试", () => {
    it("默认 mode 应该是 bottom", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("bottom")
    })

    it("应该支持 center 模式", () => {
      const wrapper = mount(UiDatePicker, {
        props: { mode: "center" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("center")
    })
  })

  describe("borderRadius 属性测试", () => {
    it("默认 borderRadius 应该是 16rpx", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("borderRadius")).toBe("16rpx")
    })

    it("应该支持自定义圆角", () => {
      const wrapper = mount(UiDatePicker, {
        props: { borderRadius: "24rpx" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("borderRadius")).toBe("24rpx")
    })
  })

  describe("closeOnClickOverlay 属性测试", () => {
    it("默认点击遮罩应该关闭", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("应该支持禁用点击遮罩关闭", () => {
      const wrapper = mount(UiDatePicker, {
        props: { closeOnClickOverlay: false },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("closeOnClickOverlay")).toBe(false)
    })
  })

  describe("overlay 属性测试", () => {
    it("默认应该显示遮罩", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("overlay")).toBe(true)
    })

    it("应该支持隐藏遮罩", () => {
      const wrapper = mount(UiDatePicker, {
        props: { overlay: false },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("overlay")).toBe(false)
    })
  })

  describe("duration 属性测试", () => {
    it("默认动画时长应该是 300ms", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(300)
    })

    it("应该支持自定义动画时长", () => {
      const wrapper = mount(UiDatePicker, {
        props: { duration: 500 },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(500)
    })
  })

  describe("showHeader 属性测试", () => {
    it("默认应该显示头部", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("showHeader")).toBe(true)
    })

    it("应该支持隐藏头部", () => {
      const wrapper = mount(UiDatePicker, {
        props: { showHeader: false },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("showHeader")).toBe(false)
    })
  })

  describe("title 属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mount(UiDatePicker, {
        props: { title: "选择日期" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("title")).toBe("选择日期")
    })
  })

  describe("cancelText 属性测试", () => {
    it("默认取消按钮文字应该是 '取消'", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("取消")
    })

    it("应该支持自定义取消按钮文字", () => {
      const wrapper = mount(UiDatePicker, {
        props: { cancelText: "返回" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("返回")
    })
  })

  describe("confirmText 属性测试", () => {
    it("默认确认按钮文字应该是 '确认'", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("confirmText")).toBe("确认")
    })

    it("应该支持自定义确认按钮文字", () => {
      const wrapper = mount(UiDatePicker, {
        props: { confirmText: "选择" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("confirmText")).toBe("选择")
    })
  })

  describe("columnHeight 属性测试", () => {
    it("默认 columnHeight 应该是 88rpx", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("88rpx")
    })

    it("应该支持自定义选项高度", () => {
      const wrapper = mount(UiDatePicker, {
        props: { columnHeight: "100rpx" },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("100rpx")
    })
  })

  describe("visibleColumnNum 属性测试", () => {
    it("默认 visibleColumnNum 应该是 5", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(5)
    })

    it("应该支持自定义可见选项数", () => {
      const wrapper = mount(UiDatePicker, {
        props: { visibleColumnNum: 7 },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(7)
    })
  })

  describe("safeAreaInsetBottom 属性测试", () => {
    it("默认应该有底部安全区", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })

    it("应该支持禁用底部安全区", () => {
      const wrapper = mount(UiDatePicker, {
        props: { safeAreaInsetBottom: false },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("safeAreaInsetBottom")).toBe(false)
    })
  })

  describe("columnFilter 属性测试", () => {
    it("应该支持 columnFilter 函数", () => {
      const columnFilter = vi.fn()
      const wrapper = mount(UiDatePicker, {
        props: { columnFilter },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columnFilter")).toBe(columnFilter)
    })
  })

  describe("columnFormatter 属性测试", () => {
    it("应该支持 columnFormatter 函数", () => {
      const columnFormatter = vi.fn((_type, option) => option)
      const wrapper = mount(UiDatePicker, {
        props: { columnFormatter },
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("columnFormatter")).toBe(columnFormatter)
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", () => {
      const wrapper = mount(UiDatePicker, {
        global: {
          stubs: {
            "ui-popup": true,
            "picker-view": true,
            "picker-view-column": true,
          },
        },
      })
      expect(wrapper.props("show")).toBe(false)
      expect(wrapper.props("modelValue")).toBe("")
      expect(wrapper.props("columns")).toEqual(["year", "month", "day"])
    })
  })
})
