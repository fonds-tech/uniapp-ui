/**
 * ui-cascader 组件单元测试
 * 测试级联选择器组件的 props、events 和渲染逻辑
 * 注意：组件依赖 useTransition hook，内部使用 setInterval 模拟 requestAnimationFrame
 * 因此需要使用 vi.useFakeTimers() 和 waitForTransition() 来推进时间
 */

import UiCascader from "@/uni_modules/uniapp-ui/ui-cascader/ui-cascader.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiCascader 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const mockOptions = [
    {
      text: "浙江省",
      value: "zhejiang",
      children: [
        {
          text: "杭州市",
          value: "hangzhou",
          children: [
            { text: "西湖区", value: "xihu" },
            { text: "余杭区", value: "yuhang" },
          ],
        },
        {
          text: "宁波市",
          value: "ningbo",
          children: [
            { text: "海曙区", value: "haishu" },
            { text: "江北区", value: "jiangbei" },
          ],
        },
      ],
    },
    {
      text: "江苏省",
      value: "jiangsu",
      children: [
        {
          text: "南京市",
          value: "nanjing",
          children: [
            { text: "玄武区", value: "xuanwu" },
            { text: "秦淮区", value: "qinhuai" },
          ],
        },
      ],
    },
  ]

  // 通用的 stubs 配置
  // 使用带 slot 的 stub 确保子内容能够渲染
  const globalStubs = {
    stubs: {
      "ui-icon": true,
      "ui-loading": true,
      "scroll-view": {
        name: "scroll-view-stub",
        template: "<div class=\"scroll-view\"><slot /></div>",
      },
      swiper: {
        name: "swiper-stub",
        template: "<div class=\"swiper\"><slot /></div>",
      },
      "swiper-item": {
        name: "swiper-item-stub",
        template: "<div class=\"swiper-item\"><slot /></div>",
      },
    },
  }

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader").exists()).toBe(true)
    })

    it("应该包含头部区域", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader__header").exists()).toBe(true)
    })

    it("应该包含标签区域", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader__tabs").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("应该支持设置初始值", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, modelValue: "xihu" },
        global: globalStubs,
      })
      expect(wrapper.props("modelValue")).toBe("xihu")
    })
  })

  describe("title 属性测试", () => {
    it("应该支持设置标题", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, title: "请选择地区" },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader__header__title").text()).toBe("请选择地区")
    })
  })

  describe("options 属性测试", () => {
    it("默认 options 应该是空数组", () => {
      const wrapper = mount(UiCascader, {
        global: globalStubs,
      })
      expect(wrapper.props("options")).toEqual([])
    })

    it("应该支持设置选项数据", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("options")).toEqual(mockOptions)
    })
  })

  describe("placeholder 属性测试", () => {
    it("默认 placeholder 应该是 '请选择'", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("placeholder")).toBe("请选择")
    })

    it("应该支持自定义 placeholder", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, placeholder: "请选择地区" },
        global: globalStubs,
      })
      expect(wrapper.props("placeholder")).toBe("请选择地区")
    })
  })

  describe("color 属性测试", () => {
    it("默认 color 应该是 #323233", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("color")).toBe("#323233")
    })

    it("应该支持自定义颜色", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, color: "#666666" },
        global: globalStubs,
      })
      expect(wrapper.props("color")).toBe("#666666")
    })
  })

  describe("activeColor 属性测试", () => {
    it("应该支持设置激活颜色", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, activeColor: "#1989fa" },
        global: globalStubs,
      })
      expect(wrapper.props("activeColor")).toBe("#1989fa")
    })
  })

  describe("swipeable 属性测试", () => {
    it("默认应该可以滑动切换", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("swipeable")).toBe(true)
    })

    it("应该支持禁用滑动", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, swipeable: false },
        global: globalStubs,
      })
      expect(wrapper.props("swipeable")).toBe(false)
    })
  })

  describe("closeable 属性测试", () => {
    it("默认应该可关闭", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("closeable")).toBe(true)
    })

    it("应该支持隐藏关闭按钮", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, closeable: false },
        global: globalStubs,
      })
      expect(wrapper.props("closeable")).toBe(false)
    })
  })

  describe("showHeader 属性测试", () => {
    it("默认应该显示头部", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.props("showHeader")).toBe(true)
      expect(wrapper.find(".ui-cascader__header").exists()).toBe(true)
    })

    it("应该支持隐藏头部", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, showHeader: false },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.props("showHeader")).toBe(false)
      expect(wrapper.find(".ui-cascader__header").exists()).toBe(false)
    })
  })

  describe("关闭图标属性测试", () => {
    it("默认 closeIcon 应该是 cross", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("closeIcon")).toBe("cross")
    })

    it("默认 closeIconSize 应该是 32rpx", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("closeIconSize")).toBe("32rpx")
    })

    it("默认 closeIconColor 应该是 #333333", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("closeIconColor")).toBe("#333333")
    })
  })

  describe("fieldKeys 属性测试", () => {
    it("默认 fieldKeys 应该是空对象", () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        global: globalStubs,
      })
      expect(wrapper.props("fieldKeys")).toEqual({})
    })

    it("应该支持自定义字段名", () => {
      const customOptions = [
        {
          name: "浙江省",
          id: "zhejiang",
          items: [],
          text: "",
          value: "",
        },
      ]
      const fieldKeys = { text: "name", value: "id", children: "items" }
      const wrapper = mount(UiCascader, {
        props: { options: customOptions, fieldKeys },
        global: globalStubs,
      })
      expect(wrapper.props("fieldKeys")).toEqual(fieldKeys)
    })
  })

  describe("beforeChange 属性测试", () => {
    it("应该支持 beforeChange 回调", () => {
      const beforeChange = vi.fn()
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, beforeChange },
        global: globalStubs,
      })
      expect(wrapper.props("beforeChange")).toBe(beforeChange)
    })
  })

  describe("插槽测试", () => {
    it("应该支持 title 插槽", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        slots: {
          title: "<span class=\"custom-title\">自定义标题</span>",
        },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".custom-title").exists()).toBe(true)
    })

    it("应该支持 close 插槽", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions },
        slots: {
          close: "<span class=\"custom-close\">X</span>",
        },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".custom-close").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: mockOptions, customClass: "my-cascader" },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader.my-cascader").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiCascader, {
        // 使用有效的 CSS 值，避免 rpx 单位在测试环境中不被识别
        props: { options: mockOptions, customStyle: { padding: "10px" } },
        global: globalStubs,
      })
      await waitForTransition()
      const cascader = wrapper.find(".ui-cascader")
      expect(cascader.exists()).toBe(true)
      // 检查 props 是否正确传递
      expect(wrapper.props("customStyle")).toEqual({ padding: "10px" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiCascader, {
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader").exists()).toBe(true)
      expect(wrapper.props("options")).toEqual([])
      expect(wrapper.props("placeholder")).toBe("请选择")
    })

    it("空选项时应该正常渲染", async () => {
      const wrapper = mount(UiCascader, {
        props: { options: [] },
        global: globalStubs,
      })
      await waitForTransition()
      expect(wrapper.find(".ui-cascader").exists()).toBe(true)
    })
  })
})
