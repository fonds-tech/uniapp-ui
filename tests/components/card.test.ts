/**
 * ui-card 组件单元测试
 * 测试卡片组件的 props、events、slots 和渲染逻辑
 */

import UiCard from "@/uni_modules/uniapp-ui/ui-card/ui-card.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-card 卡片组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认卡片组件", () => {
      const wrapper = mount(UiCard)

      expect(wrapper.find(".ui-card").exists()).toBe(true)
    })

    it("应正确渲染带标题的卡片", () => {
      const wrapper = mount(UiCard, {
        props: { title: "卡片标题" },
      })

      expect(wrapper.find(".ui-card__title").exists()).toBe(true)
      expect(wrapper.text()).toContain("卡片标题")
    })

    it("应正确渲染带描述的卡片", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", desc: "卡片描述信息" },
      })

      expect(wrapper.find(".ui-card__desc").exists()).toBe(true)
      expect(wrapper.text()).toContain("卡片描述信息")
    })

    it("应正确渲染头部区域（有标题或描述时）", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-card__header").exists()).toBe(true)
    })

    it("无标题和描述时不应渲染头部区域", () => {
      const wrapper = mount(UiCard)

      expect(wrapper.find(".ui-card__header").exists()).toBe(false)
    })
  })

  describe("封面图片", () => {
    it("应正确渲染封面图片", () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg" },
      })

      expect(wrapper.find(".ui-card__cover").exists()).toBe(true)
      expect(wrapper.find(".ui-card__thumb").exists()).toBe(true)
    })

    it("无封面图片时不应渲染封面区域", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-card__cover").exists()).toBe(false)
      expect(wrapper.find(".ui-card__thumb").exists()).toBe(false)
    })

    it("应正确设置封面图片地址", () => {
      const imageUrl = "https://example.com/test.jpg"
      const wrapper = mount(UiCard, {
        props: { thumb: imageUrl },
      })

      expect(wrapper.find(".ui-card__thumb").attributes("src")).toBe(imageUrl)
    })

    it("应支持自定义封面图片填充模式", () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg", thumbMode: "aspectFit" },
      })

      expect(wrapper.find(".ui-card__thumb").attributes("mode")).toBe("aspectFit")
    })

    it("封面图片填充模式默认为 aspectFill", () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg" },
      })

      expect(wrapper.find(".ui-card__thumb").attributes("mode")).toBe("aspectFill")
    })

    it("应支持自定义封面图片高度", () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg", thumbHeight: 200 },
      })

      expect(wrapper.props("thumbHeight")).toBe(200)
    })
  })

  describe("阴影模式", () => {
    it("shadow 为 always 时应添加阴影类名", () => {
      const wrapper = mount(UiCard, {
        props: { shadow: "always" },
      })

      expect(wrapper.classes()).toContain("ui-card--shadow")
    })

    it("shadow 为 hover 时应添加悬停阴影类名", () => {
      const wrapper = mount(UiCard, {
        props: { shadow: "hover" },
      })

      expect(wrapper.classes()).toContain("ui-card--shadow-hover")
    })

    it("shadow 为 never 时不应添加阴影类名", () => {
      const wrapper = mount(UiCard, {
        props: { shadow: "never" },
      })

      expect(wrapper.classes()).not.toContain("ui-card--shadow")
      expect(wrapper.classes()).not.toContain("ui-card--shadow-hover")
    })

    it("shadow 默认为 always", () => {
      const wrapper = mount(UiCard)

      expect(wrapper.classes()).toContain("ui-card--shadow")
    })
  })

  describe("边框", () => {
    it("border 为 true 时应添加边框类名", () => {
      const wrapper = mount(UiCard, {
        props: { border: true },
      })

      expect(wrapper.classes()).toContain("ui-card--border")
    })

    it("border 为 false 时不应添加边框类名", () => {
      const wrapper = mount(UiCard, {
        props: { border: false },
      })

      expect(wrapper.classes()).not.toContain("ui-card--border")
    })

    it("默认不显示边框", () => {
      const wrapper = mount(UiCard)

      expect(wrapper.classes()).not.toContain("ui-card--border")
    })
  })

  describe("可点击状态", () => {
    it("clickable 为 true 时应添加可点击类名", () => {
      const wrapper = mount(UiCard, {
        props: { clickable: true },
      })

      expect(wrapper.classes()).toContain("ui-card--clickable")
    })

    it("clickable 为 false 时不应添加可点击类名", () => {
      const wrapper = mount(UiCard, {
        props: { clickable: false },
      })

      expect(wrapper.classes()).not.toContain("ui-card--clickable")
    })

    it("clickable 为 true 时应有悬停效果类", () => {
      const wrapper = mount(UiCard, {
        props: { clickable: true },
      })

      expect(wrapper.attributes("hover-class")).toBe("ui-card--active")
    })

    it("clickable 为 false 时不应有悬停效果类", () => {
      const wrapper = mount(UiCard, {
        props: { clickable: false },
      })

      expect(wrapper.attributes("hover-class")).toBe("")
    })
  })

  describe("全宽模式", () => {
    it("full 为 true 时应添加全宽类名", () => {
      const wrapper = mount(UiCard, {
        props: { full: true },
      })

      expect(wrapper.classes()).toContain("ui-card--full")
    })

    it("full 为 false 时不应添加全宽类名", () => {
      const wrapper = mount(UiCard, {
        props: { full: false },
      })

      expect(wrapper.classes()).not.toContain("ui-card--full")
    })
  })

  describe("标题样式", () => {
    it("应支持自定义标题颜色", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", titleColor: "#ff0000" },
      })

      expect(wrapper.props("titleColor")).toBe("#ff0000")
    })

    it("应支持自定义标题大小", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", titleSize: 18 },
      })

      expect(wrapper.props("titleSize")).toBe(18)
    })

    it("应支持自定义标题字重", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", titleWeight: 700 },
      })

      expect(wrapper.props("titleWeight")).toBe(700)
    })
  })

  describe("描述样式", () => {
    it("应支持自定义描述颜色", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", desc: "描述", descColor: "#666666" },
      })

      expect(wrapper.props("descColor")).toBe("#666666")
    })

    it("应支持自定义描述大小", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", desc: "描述", descSize: 12 },
      })

      expect(wrapper.props("descSize")).toBe(12)
    })
  })

  describe("布局样式", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiCard, {
        props: { radius: 16 },
      })

      expect(wrapper.props("radius")).toBe(16)
    })

    it("应支持自定义内边距", () => {
      const wrapper = mount(UiCard, {
        props: { padding: 20 },
      })

      expect(wrapper.props("padding")).toBe(20)
    })

    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiCard, {
        props: { background: "#f5f5f5" },
      })

      expect(wrapper.props("background")).toBe("#f5f5f5")
    })
  })

  describe("事件处理", () => {
    it("clickable 为 true 时点击卡片应触发 click 事件", async () => {
      const wrapper = mount(UiCard, {
        props: { clickable: true },
      })

      await wrapper.find(".ui-card").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })

    it("clickable 为 false 时点击卡片不应触发 click 事件", async () => {
      const wrapper = mount(UiCard, {
        props: { clickable: false },
      })

      await wrapper.find(".ui-card").trigger("click")

      expect(wrapper.emitted("click")).toBeFalsy()
    })

    it("点击封面图片应触发 clickThumb 事件", async () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg" },
      })

      await wrapper.find(".ui-card__cover").trigger("click")

      expect(wrapper.emitted("clickThumb")).toBeTruthy()
      expect(wrapper.emitted("clickThumb")?.length).toBe(1)
    })

    it("点击封面图片不应冒泡触发卡片 click 事件", async () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg", clickable: true },
      })

      await wrapper.find(".ui-card__cover").trigger("click")

      // clickThumb 应该触发
      expect(wrapper.emitted("clickThumb")).toBeTruthy()
      // click 事件不应该被触发（因为 .stop 修饰符）
      expect(wrapper.emitted("click")).toBeFalsy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiCard, {
        props: { customClass: "my-card" },
      })

      expect(wrapper.classes()).toContain("my-card")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiCard, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-card").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 cover 插槽自定义封面", () => {
      const wrapper = mount(UiCard, {
        slots: {
          cover: "<div class='custom-cover'>自定义封面</div>",
        },
      })

      expect(wrapper.find(".custom-cover").exists()).toBe(true)
      expect(wrapper.text()).toContain("自定义封面")
    })

    it("使用 cover 插槽时不应渲染默认封面", () => {
      const wrapper = mount(UiCard, {
        props: { thumb: "https://example.com/image.jpg" },
        slots: {
          cover: "<div class='custom-cover'>自定义封面</div>",
        },
      })

      expect(wrapper.find(".custom-cover").exists()).toBe(true)
      // 默认封面不应渲染（插槽内容优先）
      expect(wrapper.find(".ui-card__cover").exists()).toBe(false)
    })

    it("应支持 header 插槽自定义头部", () => {
      const wrapper = mount(UiCard, {
        slots: {
          header: "<div class='custom-header'>自定义头部</div>",
        },
      })

      expect(wrapper.find(".custom-header").exists()).toBe(true)
      expect(wrapper.text()).toContain("自定义头部")
    })

    it("使用 header 插槽时不应渲染默认头部", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题", desc: "描述" },
        slots: {
          header: "<div class='custom-header'>自定义头部</div>",
        },
      })

      expect(wrapper.find(".custom-header").exists()).toBe(true)
      // 默认头部不应渲染（插槽内容优先）
      expect(wrapper.find(".ui-card__header").exists()).toBe(false)
    })

    it("应支持 extra 插槽在头部添加额外内容", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题" },
        slots: {
          extra: "<span class='extra-content'>更多</span>",
        },
      })

      expect(wrapper.find(".extra-content").exists()).toBe(true)
      expect(wrapper.text()).toContain("更多")
    })

    it("有 extra 插槽时应显示头部区域", () => {
      const wrapper = mount(UiCard, {
        slots: {
          extra: "<span class='extra-content'>更多</span>",
        },
      })

      expect(wrapper.find(".ui-card__header").exists()).toBe(true)
    })

    it("应支持默认插槽作为卡片内容", () => {
      const wrapper = mount(UiCard, {
        slots: {
          default: "<p class='card-content'>卡片内容</p>",
        },
      })

      expect(wrapper.find(".ui-card__body").exists()).toBe(true)
      expect(wrapper.find(".card-content").exists()).toBe(true)
      expect(wrapper.text()).toContain("卡片内容")
    })

    it("无默认插槽时不应渲染内容区域", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-card__body").exists()).toBe(false)
    })

    it("应支持 footer 插槽自定义底部", () => {
      const wrapper = mount(UiCard, {
        slots: {
          footer: "<div class='custom-footer'>自定义底部</div>",
        },
      })

      expect(wrapper.find(".custom-footer").exists()).toBe(true)
      expect(wrapper.text()).toContain("自定义底部")
    })
  })

  describe("边界情况", () => {
    it("无标题时不应渲染标题元素", () => {
      const wrapper = mount(UiCard, {
        props: { desc: "描述" },
      })

      expect(wrapper.find(".ui-card__title").exists()).toBe(false)
    })

    it("无描述时不应渲染描述元素", () => {
      const wrapper = mount(UiCard, {
        props: { title: "标题" },
      })

      expect(wrapper.find(".ui-card__desc").exists()).toBe(false)
    })

    it("同时显示封面、标题、描述和内容", () => {
      const wrapper = mount(UiCard, {
        props: {
          thumb: "https://example.com/image.jpg",
          title: "卡片标题",
          desc: "卡片描述",
        },
        slots: {
          default: "<p>卡片内容</p>",
        },
      })

      expect(wrapper.find(".ui-card__cover").exists()).toBe(true)
      expect(wrapper.find(".ui-card__header").exists()).toBe(true)
      expect(wrapper.find(".ui-card__title").exists()).toBe(true)
      expect(wrapper.find(".ui-card__desc").exists()).toBe(true)
      expect(wrapper.find(".ui-card__body").exists()).toBe(true)
    })

    it("空卡片应正常渲染", () => {
      const wrapper = mount(UiCard)

      expect(wrapper.find(".ui-card").exists()).toBe(true)
      expect(wrapper.find(".ui-card__cover").exists()).toBe(false)
      expect(wrapper.find(".ui-card__header").exists()).toBe(false)
      expect(wrapper.find(".ui-card__body").exists()).toBe(false)
    })

    it("多个类名组合正确", () => {
      const wrapper = mount(UiCard, {
        props: {
          border: true,
          clickable: true,
          full: true,
          shadow: "always",
          customClass: "my-card",
        },
      })

      expect(wrapper.classes()).toContain("ui-card")
      expect(wrapper.classes()).toContain("ui-card--border")
      expect(wrapper.classes()).toContain("ui-card--clickable")
      expect(wrapper.classes()).toContain("ui-card--full")
      expect(wrapper.classes()).toContain("ui-card--shadow")
      expect(wrapper.classes()).toContain("my-card")
    })
  })
})
