/**
 * ui-empty 组件单元测试
 * 测试空状态组件的 props、slots 和渲染逻辑
 */

import UiEmpty from "@/ui/ui-empty/ui-empty.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-empty 空状态组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认空状态组件", () => {
      const wrapper = mount(UiEmpty)

      expect(wrapper.find(".ui-empty").exists()).toBe(true)
    })

    it("应显示默认文本", () => {
      const wrapper = mount(UiEmpty)

      expect(wrapper.text()).toContain("暂无数据~")
    })

    it("应正确渲染默认图标", () => {
      const wrapper = mount(UiEmpty)

      expect(wrapper.find(".ui-empty__icon").exists()).toBe(true)
    })
  })

  describe("显示控制", () => {
    it("show 为 true 时应显示组件", () => {
      const wrapper = mount(UiEmpty, {
        props: { show: true },
      })

      expect(wrapper.find(".ui-empty").exists()).toBe(true)
    })

    it("show 为 false 时不应显示组件", () => {
      const wrapper = mount(UiEmpty, {
        props: { show: false },
      })

      expect(wrapper.find(".ui-empty").exists()).toBe(false)
    })
  })

  describe("文本属性", () => {
    it("应正确渲染自定义文本", () => {
      const wrapper = mount(UiEmpty, {
        props: { text: "没有找到内容" },
      })

      expect(wrapper.text()).toContain("没有找到内容")
    })

    it("应支持空文本", () => {
      const wrapper = mount(UiEmpty, {
        props: { text: "" },
      })

      expect(wrapper.find(".ui-empty__text").exists()).toBe(true)
    })

    it("应支持自定义文本大小", () => {
      const wrapper = mount(UiEmpty, {
        props: { textSize: 16 },
      })

      expect(wrapper.props("textSize")).toBe(16)
    })

    it("应支持自定义文本颜色", () => {
      const wrapper = mount(UiEmpty, {
        props: { textColor: "#999999" },
      })

      expect(wrapper.props("textColor")).toBe("#999999")
    })

    it("应支持自定义文本粗细", () => {
      const wrapper = mount(UiEmpty, {
        props: { textWeight: 500 },
      })

      expect(wrapper.props("textWeight")).toBe(500)
    })
  })

  describe("图标属性", () => {
    it("应正确渲染自定义图标", () => {
      const wrapper = mount(UiEmpty, {
        props: { icon: "https://example.com/empty.png" },
      })

      expect(wrapper.find(".ui-empty__icon").attributes("src")).toBe("https://example.com/empty.png")
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiEmpty, {
        props: { iconSize: 200 },
      })

      expect(wrapper.props("iconSize")).toBe(200)
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiEmpty, {
        props: { iconColor: "#cccccc" },
      })

      expect(wrapper.props("iconColor")).toBe("#cccccc")
    })

    it("应支持自定义图标粗细", () => {
      const wrapper = mount(UiEmpty, {
        props: { iconWeight: 400 },
      })

      expect(wrapper.props("iconWeight")).toBe(400)
    })

    it("应支持自定义图标宽度", () => {
      const wrapper = mount(UiEmpty, {
        props: { iconWidth: 300 },
      })

      expect(wrapper.props("iconWidth")).toBe(300)
    })

    it("应支持自定义图标高度", () => {
      const wrapper = mount(UiEmpty, {
        props: { iconHeight: 200 },
      })

      expect(wrapper.props("iconHeight")).toBe(200)
    })
  })

  describe("布局属性", () => {
    it("应支持自定义外边距", () => {
      const wrapper = mount(UiEmpty, {
        props: { margin: 20 },
      })

      expect(wrapper.props("margin")).toBe(20)
    })

    it("应支持自定义内边距", () => {
      const wrapper = mount(UiEmpty, {
        props: { padding: 30 },
      })

      expect(wrapper.props("padding")).toBe(30)
    })

    it("应支持字符串类型的边距", () => {
      const wrapper = mount(UiEmpty, {
        props: { margin: "20rpx", padding: "30rpx" },
      })

      expect(wrapper.props("margin")).toBe("20rpx")
      expect(wrapper.props("padding")).toBe("30rpx")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiEmpty, {
        props: { customClass: "my-empty" },
      })

      expect(wrapper.classes()).toContain("my-empty")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiEmpty, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-empty").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiEmpty, {
        slots: {
          default: "<button class='custom-btn'>重新加载</button>",
        },
      })

      expect(wrapper.find(".custom-btn").exists()).toBe(true)
    })

    it("应支持 icon 插槽", () => {
      const wrapper = mount(UiEmpty, {
        slots: {
          icon: "<span class='custom-icon'>📭</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })

    it("应支持 text 插槽", () => {
      const wrapper = mount(UiEmpty, {
        slots: {
          text: "<span class='custom-text'>自定义提示文本</span>",
        },
      })

      expect(wrapper.find(".custom-text").exists()).toBe(true)
    })

    it("icon 插槽应覆盖默认图标", () => {
      const wrapper = mount(UiEmpty, {
        props: { icon: "https://example.com/empty.png" },
        slots: {
          icon: "<span class='custom-icon'>自定义图标</span>",
        },
      })

      expect(wrapper.find(".custom-icon").exists()).toBe(true)
      // 默认图标应被覆盖
      expect(wrapper.find(".ui-empty__icon").exists()).toBe(false)
    })

    it("text 插槽应覆盖默认文本", () => {
      const wrapper = mount(UiEmpty, {
        props: { text: "默认文本" },
        slots: {
          text: "<span class='custom-text'>插槽文本</span>",
        },
      })

      expect(wrapper.find(".custom-text").exists()).toBe(true)
      expect(wrapper.text()).not.toContain("默认文本")
    })
  })

  describe("边界情况", () => {
    it("多个属性应正确组合", () => {
      const wrapper = mount(UiEmpty, {
        props: {
          text: "暂无数据",
          textSize: 14,
          iconSize: 150,
          margin: 20,
          customClass: "my-empty",
        },
      })

      expect(wrapper.find(".ui-empty").exists()).toBe(true)
      expect(wrapper.classes()).toContain("my-empty")
      expect(wrapper.text()).toContain("暂无数据")
    })

    it("默认插槽内容应在 slot 容器中", () => {
      const wrapper = mount(UiEmpty, {
        slots: {
          default: "<button>操作按钮</button>",
        },
      })

      expect(wrapper.find(".ui-empty__slot").exists()).toBe(true)
      expect(wrapper.find(".ui-empty__slot button").exists()).toBe(true)
    })
  })
})
