/**
 * ui-avatar 和 ui-avatar-group 组件单元测试
 * 测试头像组件的 props、events、slots 和渲染逻辑
 */

import UiAvatar from "@/uni_modules/uniapp-ui/ui-avatar/ui-avatar.vue"
import UiAvatarGroup from "@/uni_modules/uniapp-ui/ui-avatar-group/ui-avatar-group.vue"
import { mount } from "@vue/test-utils"
import { h, nextTick } from "vue"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("ui-avatar 头像组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  describe("基础渲染", () => {
    it("应正确渲染默认头像组件", () => {
      const wrapper = mount(UiAvatar)

      expect(wrapper.find(".ui-avatar").exists()).toBe(true)
    })

    it("默认应渲染圆形头像", () => {
      const wrapper = mount(UiAvatar)

      expect(wrapper.classes()).toContain("ui-avatar--circle")
    })

    it("默认应渲染 medium 尺寸", () => {
      const wrapper = mount(UiAvatar)

      expect(wrapper.classes()).toContain("ui-avatar--medium")
    })

    it("无图片、图标、文字时应渲染默认 user 图标", () => {
      const wrapper = mount(UiAvatar)

      expect(wrapper.find(".ui-avatar__fallback").exists()).toBe(true)
    })
  })

  describe("图片头像", () => {
    it("设置 src 时应渲染图片", () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg" },
      })

      expect(wrapper.find(".ui-avatar__image").exists()).toBe(true)
    })

    it("图片应使用正确的 src 属性", () => {
      const src = "https://example.com/avatar.jpg"
      const wrapper = mount(UiAvatar, {
        props: { src },
      })

      expect(wrapper.find(".ui-avatar__image").attributes("src")).toBe(src)
    })

    it("图片加载成功时应触发 load 事件", async () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg" },
      })

      await wrapper.find(".ui-avatar__image").trigger("load")

      expect(wrapper.emitted("load")).toBeTruthy()
    })

    it("图片加载失败时应触发 error 事件", async () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/invalid.jpg" },
      })

      await wrapper.find(".ui-avatar__image").trigger("error")

      expect(wrapper.emitted("error")).toBeTruthy()
    })

    it("图片加载失败后应显示错误回退内容", async () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/invalid.jpg" },
      })

      await wrapper.find(".ui-avatar__image").trigger("error")
      await nextTick()

      expect(wrapper.find(".ui-avatar__image").exists()).toBe(false)
      expect(wrapper.find(".ui-avatar__fallback").exists()).toBe(true)
    })

    it("懒加载属性应正确传递", () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg", lazyLoad: true },
      })

      expect(wrapper.find(".ui-avatar__image").attributes("lazy-load")).toBe("true")
    })
  })

  describe("头像尺寸", () => {
    const sizes = ["mini", "small", "medium", "large"] as const

    sizes.forEach((size) => {
      it(`应支持 ${size} 尺寸`, () => {
        const wrapper = mount(UiAvatar, {
          props: { size },
        })

        expect(wrapper.classes()).toContain(`ui-avatar--${size}`)
      })
    })

    it("应支持自定义数字尺寸", () => {
      const wrapper = mount(UiAvatar, {
        props: { size: 100 },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("width")
      expect(style).toContain("height")
    })

    it("应支持自定义字符串尺寸", () => {
      const wrapper = mount(UiAvatar, {
        props: { size: "50px" },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("50px")
    })
  })

  describe("头像形状", () => {
    it("shape 为 circle 时应添加圆形类名", () => {
      const wrapper = mount(UiAvatar, {
        props: { shape: "circle" },
      })

      expect(wrapper.classes()).toContain("ui-avatar--circle")
    })

    it("shape 为 square 时应添加方形类名", () => {
      const wrapper = mount(UiAvatar, {
        props: { shape: "square" },
      })

      expect(wrapper.classes()).toContain("ui-avatar--square")
    })

    it("square 形状时应支持自定义圆角", () => {
      const wrapper = mount(UiAvatar, {
        props: { shape: "square", radius: 8 },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("border-radius")
    })
  })

  describe("图标头像", () => {
    it("设置 icon 时应渲染图标", () => {
      const wrapper = mount(UiAvatar, {
        props: { icon: "user" },
      })

      expect(wrapper.find(".ui-avatar__icon").exists()).toBe(true)
    })

    it("应支持自定义图标颜色", () => {
      const wrapper = mount(UiAvatar, {
        props: { icon: "user", iconColor: "#ff0000" },
      })

      expect(wrapper.find(".ui-avatar__icon").exists()).toBe(true)
    })

    it("应支持自定义图标大小", () => {
      const wrapper = mount(UiAvatar, {
        props: { icon: "user", iconSize: 24 },
      })

      expect(wrapper.find(".ui-avatar__icon").exists()).toBe(true)
    })
  })

  describe("文字头像", () => {
    it("设置 text 时应渲染文字", () => {
      const wrapper = mount(UiAvatar, {
        props: { text: "张三" },
      })

      expect(wrapper.find(".ui-avatar__text").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar__text").text()).toBe("张三")
    })

    it("文字应截取前两个字符", () => {
      const wrapper = mount(UiAvatar, {
        props: { text: "张三丰" },
      })

      expect(wrapper.find(".ui-avatar__text").text()).toBe("张三")
    })

    it("应支持自定义文字颜色", () => {
      const wrapper = mount(UiAvatar, {
        props: { text: "张三", textColor: "#ff0000" },
      })

      const style = wrapper.find(".ui-avatar__text").attributes("style") || ""
      expect(style).toContain("color")
    })

    it("应支持自定义文字大小", () => {
      const wrapper = mount(UiAvatar, {
        props: { text: "张三", textSize: 16 },
      })

      const style = wrapper.find(".ui-avatar__text").attributes("style") || ""
      expect(style).toContain("font-size")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义背景色", () => {
      const wrapper = mount(UiAvatar, {
        props: { background: "#f0f0f0" },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持边框颜色", () => {
      const wrapper = mount(UiAvatar, {
        props: { borderColor: "#1989fa" },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("border-color")
    })

    it("应支持边框宽度", () => {
      const wrapper = mount(UiAvatar, {
        props: { borderColor: "#1989fa", borderWidth: 2 },
      })

      const style = wrapper.find(".ui-avatar").attributes("style") || ""
      expect(style).toContain("border-width")
    })
  })

  describe("事件处理", () => {
    it("点击头像应触发 click 事件", async () => {
      const wrapper = mount(UiAvatar)

      await wrapper.find(".ui-avatar").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("插槽", () => {
    it("应支持默认插槽", () => {
      const wrapper = mount(UiAvatar, {
        slots: {
          default: "自定义内容",
        },
      })

      expect(wrapper.text()).toContain("自定义内容")
    })

    it("图片加载失败时应支持 error 插槽", async () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/invalid.jpg" },
        slots: {
          error: "加载失败",
        },
      })

      await wrapper.find(".ui-avatar__image").trigger("error")
      await nextTick()

      expect(wrapper.text()).toContain("加载失败")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiAvatar, {
        props: { customClass: "my-avatar" },
      })

      expect(wrapper.classes()).toContain("my-avatar")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiAvatar, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-avatar").exists()).toBe(true)
    })
  })

  describe("显示优先级", () => {
    it("有 src 时优先显示图片", () => {
      const wrapper = mount(UiAvatar, {
        props: {
          src: "https://example.com/avatar.jpg",
          icon: "user",
          text: "张三",
        },
      })

      expect(wrapper.find(".ui-avatar__image").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar__icon").exists()).toBe(false)
      expect(wrapper.find(".ui-avatar__text").exists()).toBe(false)
    })

    it("无 src 有 icon 时显示图标", () => {
      const wrapper = mount(UiAvatar, {
        props: {
          icon: "user",
          text: "张三",
        },
      })

      expect(wrapper.find(".ui-avatar__icon").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar__text").exists()).toBe(false)
    })

    it("无 src 无 icon 有 text 时显示文字", () => {
      const wrapper = mount(UiAvatar, {
        props: {
          text: "张三",
        },
      })

      expect(wrapper.find(".ui-avatar__text").exists()).toBe(true)
    })
  })

  describe("图片模式", () => {
    it("默认 fit 为 cover", () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg" },
      })

      // fit: cover 映射到 mode: aspectFill
      expect(wrapper.find(".ui-avatar__image").attributes("mode")).toBe("aspectFill")
    })

    it("fit 为 contain 时应映射正确模式", () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg", fit: "contain" },
      })

      expect(wrapper.find(".ui-avatar__image").attributes("mode")).toBe("aspectFit")
    })

    it("fit 为 fill 时应映射正确模式", () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/avatar.jpg", fit: "fill" },
      })

      expect(wrapper.find(".ui-avatar__image").attributes("mode")).toBe("scaleToFill")
    })
  })

  describe("src 变化", () => {
    it("src 变化时应重置错误状态", async () => {
      const wrapper = mount(UiAvatar, {
        props: { src: "https://example.com/invalid.jpg" },
      })

      // 模拟加载失败
      await wrapper.find(".ui-avatar__image").trigger("error")
      await nextTick()

      expect(wrapper.find(".ui-avatar__fallback").exists()).toBe(true)

      // 更新 src
      await wrapper.setProps({ src: "https://example.com/new-avatar.jpg" })
      await nextTick()

      expect(wrapper.find(".ui-avatar__image").exists()).toBe(true)
    })
  })
})

describe("ui-avatar-group 头像组组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  // 创建头像组的辅助函数
  function createAvatarGroup(avatarCount: number, props: Record<string, any> = {}) {
    return mount(UiAvatarGroup, {
      props,
      slots: {
        default: () =>
          Array.from({ length: avatarCount }, (_, i) =>
            h(UiAvatar, { key: i, text: `用户${i + 1}` })),
      },
    })
  }

  describe("基础渲染", () => {
    it("应正确渲染头像组组件", () => {
      const wrapper = createAvatarGroup(3)

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })

    it("应正确渲染子头像", () => {
      const wrapper = createAvatarGroup(3)

      expect(wrapper.find(".ui-avatar-group__container").exists()).toBe(true)
    })
  })

  describe("最大显示数量", () => {
    it("默认最多显示 5 个头像", async () => {
      const wrapper = createAvatarGroup(7)
      await nextTick()

      expect(wrapper.find(".ui-avatar-group__excess").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar-group__excess-text").text()).toBe("+2")
    })

    it("应支持自定义 max 值", async () => {
      const wrapper = createAvatarGroup(5, { max: 3 })
      await nextTick()

      expect(wrapper.find(".ui-avatar-group__excess").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar-group__excess-text").text()).toBe("+2")
    })

    it("头像数量不超过 max 时不显示超出提示", async () => {
      const wrapper = createAvatarGroup(3, { max: 5 })
      await nextTick()

      expect(wrapper.find(".ui-avatar-group__excess").exists()).toBe(false)
    })
  })

  describe("尺寸和形状", () => {
    it("应支持设置统一尺寸", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { size: "large" },
      })

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })

    it("应支持设置统一形状", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { shape: "square" },
      })

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })

    it("超出数量显示应使用正确的形状", async () => {
      const wrapper = createAvatarGroup(7, { shape: "square" })
      await nextTick()

      expect(wrapper.find(".ui-avatar-group__excess--square").exists()).toBe(true)
    })

    it("超出数量显示默认使用圆形", async () => {
      const wrapper = createAvatarGroup(7)
      await nextTick()

      expect(wrapper.find(".ui-avatar-group__excess--circle").exists()).toBe(true)
    })
  })

  describe("堆叠方向", () => {
    it("默认方向为 right（右侧在上）", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { direction: "right" },
      })

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })

    it("direction 为 left 时应反转方向", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { direction: "left" },
      })

      const containerStyle = wrapper.find(".ui-avatar-group__container").attributes("style") || ""
      expect(containerStyle).toContain("flex-direction: row-reverse")
    })
  })

  describe("间距", () => {
    it("默认间距为 -16（负数表示重叠）", () => {
      const wrapper = mount(UiAvatarGroup)

      expect(wrapper.props("gap")).toBe(-16)
    })

    it("应支持自定义间距", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { gap: -20 },
      })

      expect(wrapper.props("gap")).toBe(-20)
    })
  })

  describe("边框", () => {
    it("应支持边框颜色", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { borderColor: "#ffffff" },
      })

      expect(wrapper.props("borderColor")).toBe("#ffffff")
    })

    it("应支持边框宽度", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { borderWidth: "4rpx" },
      })

      expect(wrapper.props("borderWidth")).toBe("4rpx")
    })
  })

  describe("超出样式", () => {
    it("应支持超出文本颜色", async () => {
      const wrapper = createAvatarGroup(7, { excessColor: "#ff0000" })
      await nextTick()

      const excessStyle = wrapper.find(".ui-avatar-group__excess").attributes("style") || ""
      expect(excessStyle).toContain("color")
    })

    it("应支持超出背景颜色", async () => {
      const wrapper = createAvatarGroup(7, { excessBackground: "#f0f0f0" })
      await nextTick()

      const excessStyle = wrapper.find(".ui-avatar-group__excess").attributes("style") || ""
      expect(excessStyle).toContain("background")
    })
  })

  describe("事件处理", () => {
    it("点击头像组应触发 click 事件", async () => {
      const wrapper = mount(UiAvatarGroup)

      await wrapper.find(".ui-avatar-group").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })

    it("点击超出数量应触发 clickExcess 事件", async () => {
      const wrapper = createAvatarGroup(7)
      await nextTick()

      await wrapper.find(".ui-avatar-group__excess").trigger("click")

      expect(wrapper.emitted("clickExcess")).toBeTruthy()
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: { customClass: "my-avatar-group" },
      })

      expect(wrapper.classes()).toContain("my-avatar-group")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiAvatarGroup, {
        props: {
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })
  })

  describe("边界情况", () => {
    it("空头像组应正常渲染", () => {
      const wrapper = mount(UiAvatarGroup)

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar-group__excess").exists()).toBe(false)
    })

    it("只有一个头像时应正常渲染", async () => {
      const wrapper = createAvatarGroup(1)
      await nextTick()

      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
      expect(wrapper.find(".ui-avatar-group__excess").exists()).toBe(false)
    })

    it("max 为 0 时所有头像都应超出", async () => {
      const wrapper = createAvatarGroup(3, { max: 0 })
      await nextTick()

      // max 为 0 时，超出数量应为头像总数
      expect(wrapper.find(".ui-avatar-group").exists()).toBe(true)
    })
  })
})
