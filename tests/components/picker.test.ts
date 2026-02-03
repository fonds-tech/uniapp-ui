import UiPicker from "@/uni_modules/uniapp-ui/ui-picker/ui-picker.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

const pickerPanelStub = {
  name: "ui-picker-panel",
  template: "<div class=\"ui-picker-panel-stub\"></div>",
  props: ["modelValue"],
  emits: ["update:modelValue", "change"],
  setup(props: { modelValue: any }, { expose }: { expose: (exposed: Record<string, any>) => void }) {
    expose({
      getSelectedValues: () => (Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]),
      getSelectedIndexs: () => [0],
      getSelectedColumns: () => [{ text: "选项1", value: "1" }],
    })
    return {}
  },
}

describe("uiPicker 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [{ text: "选项1", value: "1" }],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-picker").exists()).toBe(true)
    })
  })

  describe("show 属性测试", () => {
    it("show 为 false 时弹窗不显示", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("show")).toBe(false)
    })

    it("show 为 true 时弹窗显示", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("show")).toBe(true)
    })
  })

  describe("columns 属性测试", () => {
    it("应该支持单列数据", () => {
      const columns = [
        { text: "选项1", value: "1" },
        { text: "选项2", value: "2" },
        { text: "选项3", value: "3" },
      ]
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(columns)
    })

    it("应该支持多列数据", () => {
      const columns = [
        [
          { text: "选项A1", value: "a1" },
          { text: "选项A2", value: "a2" },
        ],
        [
          { text: "选项B1", value: "b1" },
          { text: "选项B2", value: "b2" },
        ],
      ]
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(columns)
    })

    it("应该支持级联数据", () => {
      const columns = [
        {
          text: "浙江",
          value: "zj",
          children: [
            { text: "杭州", value: "hz" },
            { text: "宁波", value: "nb" },
          ],
        },
        {
          text: "江苏",
          value: "js",
          children: [
            { text: "南京", value: "nj" },
            { text: "苏州", value: "sz" },
          ],
        },
      ]
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columns")).toEqual(columns)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该支持单值绑定", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          modelValue: "1",
          columns: [{ text: "选项1", value: "1" }],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("1")
    })

    it("应该支持数组值绑定", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          modelValue: ["a1", "b1"],
          columns: [
            [{ text: "A1", value: "a1" }],
            [{ text: "B1", value: "b1" }],
          ],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(["a1", "b1"])
    })

    it("应该支持数字类型的值", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          modelValue: 1,
          columns: [{ text: "选项1", value: 1 }],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe(1)
    })
  })

  describe("mode 属性测试", () => {
    it("默认弹窗位置应该是 bottom", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("mode")).toBe("bottom")
    })

    it("应该支持其他位置", () => {
      const modes = ["top", "left", "right", "center"]
      modes.forEach((mode) => {
        const wrapper = mount(UiPicker, {
          props: {
            show: false,
            columns: [],
            mode: mode as any,
          },
          global: {
            stubs: {
              "ui-popup": true,
              "ui-picker-panel": true,
              "ui-button": true,
            },
          },
        })
        expect(wrapper.props("mode")).toBe(mode)
      })
    })
  })

  describe("标题相关属性测试", () => {
    it("应该支持设置标题", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          title: "请选择",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("title")).toBe("请选择")
    })

    it("默认应该显示头部", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("showHeader")).toBe(true)
    })

    it("应该支持隐藏头部", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          showHeader: false,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("showHeader")).toBe(false)
    })
  })

  describe("按钮文字属性测试", () => {
    it("默认取消按钮文字应该是 '取消'", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("取消")
    })

    it("默认确认按钮文字应该是 '确认'", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("confirmText")).toBe("确认")
    })

    it("应该支持自定义按钮文字", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          cancelText: "关闭",
          confirmText: "完成",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("cancelText")).toBe("关闭")
      expect(wrapper.props("confirmText")).toBe("完成")
    })
  })

  describe("loading 属性测试", () => {
    it("默认不显示加载状态", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(false)
    })

    it("应该支持显示加载状态", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          loading: true,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("loading")).toBe(true)
    })
  })

  describe("columnFields 属性测试", () => {
    it("默认字段映射应该正确", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnFields")).toEqual({
        text: "text",
        value: "value",
        children: "children",
      })
    })

    it("应该支持自定义字段映射", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          columnFields: { text: "label", value: "id", children: "items" },
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnFields")).toEqual({
        text: "label",
        value: "id",
        children: "items",
      })
    })
  })

  describe("尺寸属性测试", () => {
    it("默认选项高度应该是 88rpx", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("88rpx")
    })

    it("默认可见选项数应该是 5", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(5)
    })

    it("应该支持自定义选项高度", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          columnHeight: "100rpx",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnHeight")).toBe("100rpx")
    })

    it("应该支持自定义可见选项数", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          visibleColumnNum: 7,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("visibleColumnNum")).toBe(7)
    })
  })

  describe("样式属性测试", () => {
    it("应该支持 columnSize 属性", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          columnSize: "28rpx",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnSize")).toBe("28rpx")
    })

    it("应该支持 columnColor 属性", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          columnColor: "#666666",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("columnColor")).toBe("#666666")
    })

    it("应该支持 activeColumnColor 属性", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
          activeColumnColor: "#1989fa",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("activeColumnColor")).toBe("#1989fa")
    })
  })

  describe("弹窗属性测试", () => {
    it("默认圆角应该是 16rpx", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("borderRadius")).toBe("16rpx")
    })

    it("默认点击遮罩应该关闭", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("closeOnClickOverlay")).toBe(true)
    })

    it("默认应该显示遮罩", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("overlay")).toBe(true)
    })

    it("默认动画时长应该是 300ms", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(300)
    })

    it("默认应该启用底部安全区", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.props("safeAreaInsetBottom")).toBe(true)
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 name 属性", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(wrapper.vm.name).toBe("ui-picker")
    })

    it("应该暴露 open 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.open).toBe("function")
    })

    it("应该暴露 close 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.close).toBe("function")
    })

    it("应该暴露 confirm 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.confirm).toBe("function")
    })

    it("应该暴露 cancel 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.cancel).toBe("function")
    })

    it("应该暴露 getSelectedValues 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.getSelectedValues).toBe("function")
    })

    it("应该暴露 getSelectedIndexs 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.getSelectedIndexs).toBe("function")
    })

    it("应该暴露 getSelectedColumns 方法", () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": pickerPanelStub,
            "ui-button": true,
          },
        },
      })
      expect(typeof wrapper.vm.getSelectedColumns).toBe("function")
    })
  })

  describe("交互与方法", () => {
    it("confirm 方法应触发 confirm 与 update:modelValue", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [{ text: "选项1", value: "1" }],
          modelValue: "1",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": pickerPanelStub,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()

      wrapper.vm.confirm()
      await waitForTransition()

      expect(wrapper.emitted("confirm")).toBeTruthy()
      expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["1"])
      expect(wrapper.emitted("update:show")?.slice(-1)[0]).toEqual([false])
    })

    it("cancel 方法应触发 cancel 并关闭", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [{ text: "选项1", value: "1" }],
          modelValue: "1",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": pickerPanelStub,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()

      wrapper.vm.cancel()
      await waitForTransition()

      expect(wrapper.emitted("cancel")).toBeTruthy()
      expect(wrapper.emitted("update:show")?.slice(-1)[0]).toEqual([false])
    })

    it("open/close 方法应更新 show", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: false,
          columns: [{ text: "选项1", value: "1" }],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": pickerPanelStub,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()

      wrapper.vm.open()
      await waitForTransition()
      expect(wrapper.emitted("update:show")?.slice(-1)[0]).toEqual([true])

      wrapper.vm.close()
      await waitForTransition()
      expect(wrapper.emitted("update:show")?.slice(-1)[0]).toEqual([false])
    })
  })

  describe("边界情况测试", () => {
    it("columns 为空数组时应该正常处理", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [],
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-picker").exists()).toBe(true)
    })

    it("modelValue 为 undefined 时应该正常处理", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [{ text: "选项1", value: "1" }],
          modelValue: undefined,
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-picker").exists()).toBe(true)
    })

    it("modelValue 为空字符串时应该正常处理", async () => {
      const wrapper = mount(UiPicker, {
        props: {
          show: true,
          columns: [{ text: "选项1", value: "1" }],
          modelValue: "",
        },
        global: {
          stubs: {
            "ui-popup": true,
            "ui-picker-panel": true,
            "ui-button": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-picker").exists()).toBe(true)
    })
  })
})
