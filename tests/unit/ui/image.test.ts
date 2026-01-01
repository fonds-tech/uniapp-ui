/**
 * ui-image 组件单元测试
 * 测试图片组件的 props、events、slots 和渲染逻辑
 */

import UiImage from "@/ui/ui-image/ui-image.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-image 图片组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认图片组件", () => {
      const wrapper = mount(UiImage)

      expect(wrapper.find(".ui-image").exists()).toBe(true)
    })

    it("应正确渲染带 src 的图片组件", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      expect(wrapper.find("image").exists()).toBe(true)
      expect(wrapper.find("image").attributes("src")).toBe("https://example.com/image.jpg")
    })

    it("无 src 时应显示加载占位符", () => {
      const wrapper = mount(UiImage, {
        props: { src: "" },
      })

      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(true)
      expect(wrapper.find(".ui-image__icon--loading").exists()).toBe(true)
    })
  })

  describe("加载状态", () => {
    it("加载中应显示加载占位符", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      // 初始状态为加载中
      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(true)
    })

    it("加载成功后应隐藏占位符", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      // 触发加载成功事件
      await wrapper.find("image").trigger("load")

      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(false)
    })

    it("加载失败应显示错误占位符", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      // 触发加载失败事件
      await wrapper.find("image").trigger("error")

      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(true)
      expect(wrapper.find(".ui-image__icon--error").exists()).toBe(true)
    })
  })

  describe("尺寸属性", () => {
    it("应支持自定义宽度", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", width: 200 },
      })

      expect(wrapper.props("width")).toBe(200)
    })

    it("应支持自定义高度", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", height: 200 },
      })

      expect(wrapper.props("height")).toBe(200)
    })

    it("应支持字符串类型的尺寸", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", width: "200rpx", height: "200rpx" },
      })

      expect(wrapper.props("width")).toBe("200rpx")
      expect(wrapper.props("height")).toBe("200rpx")
    })
  })

  describe("显示模式", () => {
    it("默认 mode 应为 scaleToFill", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      expect(wrapper.find("image").attributes("mode")).toBe("scaleToFill")
    })

    const modes = ["aspectFit", "aspectFill", "widthFix", "heightFix", "top", "bottom", "center", "left", "right"] as const

    modes.forEach((mode) => {
      it(`应支持 ${mode} 模式`, () => {
        const wrapper = mount(UiImage, {
          props: { src: "https://example.com/image.jpg", mode },
        })

        expect(wrapper.find("image").attributes("mode")).toBe(mode)
      })
    })
  })

  describe("形状样式", () => {
    it("round 为 true 时应添加圆形类名", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", round: true },
      })

      expect(wrapper.classes()).toContain("ui-image--round")
    })

    it("block 为 true 时应添加块级类名", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", block: true },
      })

      expect(wrapper.classes()).toContain("ui-image--block")
    })

    it("square 为 true 时应添加正方形类名", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", square: true },
      })

      expect(wrapper.classes()).toContain("ui-image--square")
    })
  })

  describe("圆角样式", () => {
    it("应支持自定义圆角", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", radius: 8 },
      })

      const style = wrapper.find(".ui-image").attributes("style") || ""
      expect(style).toContain("border-radius")
    })

    it("应支持字符串类型的圆角", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", radius: "16rpx" },
      })

      expect(wrapper.props("radius")).toBe("16rpx")
    })
  })

  describe("背景颜色", () => {
    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", background: "#f0f0f0" },
      })

      const style = wrapper.find(".ui-image").attributes("style") || ""
      expect(style).toContain("background")
    })
  })

  describe("图片属性", () => {
    it("默认 lazyLoad 应为 true", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      expect(wrapper.find("image").attributes("lazy-load")).toBe("true")
    })

    it("lazyLoad 为 false 时应禁用懒加载", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", lazyLoad: false },
      })

      expect(wrapper.find("image").attributes("lazy-load")).toBe("false")
    })

    it("默认 fade 应为 true", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      // 需要触发加载成功才能看到 fade 类名
      expect(wrapper.props("fade")).toBe(true)
    })

    it("fade 为 true 时应添加渐变动画类名", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", fade: true },
      })

      // 触发加载成功
      await wrapper.find("image").trigger("load")

      expect(wrapper.find(".ui-image__image--fade").exists()).toBe(true)
    })

    it("webp 为 true 时应启用 webp", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", webp: true },
      })

      expect(wrapper.find("image").attributes("webp")).toBe("true")
    })

    it("默认 draggable 应为 true", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      expect(wrapper.find("image").attributes("draggable")).toBe("true")
    })

    it("showMenuByLongpress 应正确设置", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", showMenuByLongpress: true },
      })

      expect(wrapper.find("image").attributes("show-menu-by-longpress")).toBe("true")
    })
  })

  describe("事件处理", () => {
    it("点击图片应触发 click 事件", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      await wrapper.find(".ui-image").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })

    it("图片加载成功应触发 load 事件", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      await wrapper.find("image").trigger("load")

      expect(wrapper.emitted("load")).toBeTruthy()
      expect(wrapper.emitted("load")?.length).toBe(1)
    })

    it("图片加载失败应触发 error 事件", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
      })

      await wrapper.find("image").trigger("error")

      expect(wrapper.emitted("error")).toBeTruthy()
      expect(wrapper.emitted("error")?.length).toBe(1)
    })
  })

  describe("src 变化", () => {
    it("src 变化时应重置加载状态", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image1.jpg" },
      })

      // 触发加载成功
      await wrapper.find("image").trigger("load")
      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(false)

      // 更改 src
      await wrapper.setProps({ src: "https://example.com/image2.jpg" })

      // 应该重新显示加载占位符
      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(true)
    })

    it("src 变化时应重置错误状态", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image1.jpg" },
      })

      // 触发加载失败
      await wrapper.find("image").trigger("error")
      expect(wrapper.find(".ui-image__icon--error").exists()).toBe(true)

      // 更改 src
      await wrapper.setProps({ src: "https://example.com/image2.jpg" })

      // 应该显示加载占位符而不是错误占位符
      expect(wrapper.find(".ui-image__icon--loading").exists()).toBe(true)
      expect(wrapper.find(".ui-image__icon--error").exists()).toBe(false)
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg", customClass: "my-image" },
      })

      expect(wrapper.classes()).toContain("my-image")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiImage, {
        props: {
          src: "https://example.com/image.jpg",
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-image").exists()).toBe(true)
    })
  })

  describe("插槽", () => {
    it("应支持 loading 插槽", () => {
      const wrapper = mount(UiImage, {
        props: { src: "" },
        slots: {
          loading: "<span class='custom-loading'>加载中...</span>",
        },
      })

      expect(wrapper.find(".custom-loading").exists()).toBe(true)
    })

    it("应支持 error 插槽", async () => {
      const wrapper = mount(UiImage, {
        props: { src: "https://example.com/image.jpg" },
        slots: {
          error: "<span class='custom-error'>加载失败</span>",
        },
      })

      // 触发加载失败
      await wrapper.find("image").trigger("error")

      expect(wrapper.find(".custom-error").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空 src 应显示加载占位符", () => {
      const wrapper = mount(UiImage, {
        props: { src: "" },
      })

      expect(wrapper.find(".ui-image__placeholder").exists()).toBe(true)
    })

    it("多个样式类名应正确组合", () => {
      const wrapper = mount(UiImage, {
        props: {
          src: "https://example.com/image.jpg",
          round: true,
          block: true,
          square: true,
        },
      })

      expect(wrapper.classes()).toContain("ui-image--round")
      expect(wrapper.classes()).toContain("ui-image--block")
      expect(wrapper.classes()).toContain("ui-image--square")
    })
  })
})
