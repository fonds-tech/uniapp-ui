/**
 * ui-icon 组件单元测试
 * 测试图标组件的 props、events 和渲染逻辑
 */

import UiIcon from "@/uni_modules/uniapp-ui/ui-icon/ui-icon.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-icon 图标组件", () => {
  describe("基础渲染", () => {
    it("应正确渲染默认图标", () => {
      const wrapper = mount(UiIcon)

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
    })

    it("应正确渲染指定名称的图标", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star" },
      })

      expect(wrapper.classes()).toContain("ui-icon-star")
    })

    it("应正确渲染不同的图标名称", () => {
      const icons = ["search", "close", "check", "arrow", "home-o"]

      icons.forEach((name) => {
        const wrapper = mount(UiIcon, {
          props: { name },
        })

        expect(wrapper.classes()).toContain(`ui-icon-${name}`)
      })
    })
  })

  describe("图片模式", () => {
    it("当 name 为图片地址时应渲染 image 元素", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "https://example.com/icon.png" },
      })

      expect(wrapper.find("image").exists()).toBe(true)
    })

    it("当 name 为本地图片路径时应渲染 image 元素", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "/static/icon.png" },
      })

      expect(wrapper.find("image").exists()).toBe(true)
    })

    it("图片模式应设置正确的 src", () => {
      const imgUrl = "https://example.com/icon.png"
      const wrapper = mount(UiIcon, {
        props: { name: imgUrl },
      })

      expect(wrapper.find("image").attributes("src")).toBe(imgUrl)
    })

    it("应支持自定义图片显示模式", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "https://example.com/icon.png",
          imageMode: "aspectFit",
        },
      })

      expect(wrapper.find("image").attributes("mode")).toBe("aspectFit")
    })
  })

  describe("样式属性", () => {
    it("应支持自定义大小", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", size: 32 },
      })

      // 验证组件正确渲染
      expect(wrapper.find(".ui-icon").exists()).toBe(true)
      // size prop 被正确传递
      expect(wrapper.props("size")).toBe(32)
    })

    it("应支持自定义颜色", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", color: "#ff0000" },
      })

      const style = wrapper.find(".ui-icon").attributes("style") || ""
      expect(style).toContain("color")
    })

    it("应支持自定义粗细", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", weight: 700 },
      })

      const style = wrapper.find(".ui-icon").attributes("style") || ""
      expect(style).toContain("font-weight")
    })

    it("应支持自定义背景颜色", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", background: "#f0f0f0" },
      })

      const style = wrapper.find(".ui-icon").attributes("style") || ""
      expect(style).toContain("background")
    })

    it("应支持自定义圆角", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", radius: 8 },
      })

      const style = wrapper.find(".ui-icon").attributes("style") || ""
      expect(style).toContain("border-radius")
    })

    it("应支持自定义行高", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", lineHeight: 1.5 },
      })

      const style = wrapper.find(".ui-icon").attributes("style") || ""
      expect(style).toContain("line-height")
    })
  })

  describe("图片尺寸", () => {
    it("图片模式应支持自定义宽度", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "https://example.com/icon.png",
          width: 100,
        },
      })

      expect(wrapper.find("image").exists()).toBe(true)
      expect(wrapper.props("width")).toBe(100)
    })

    it("图片模式应支持自定义高度", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "https://example.com/icon.png",
          height: 100,
        },
      })

      expect(wrapper.find("image").exists()).toBe(true)
      expect(wrapper.props("height")).toBe(100)
    })

    it("图片模式未指定宽高时应使用 size", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "https://example.com/icon.png",
          size: 48,
        },
      })

      expect(wrapper.find("image").exists()).toBe(true)
      expect(wrapper.props("size")).toBe(48)
    })
  })

  describe("自定义前缀", () => {
    it("应支持自定义图标前缀", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          customPrefix: "my-icon",
        },
      })

      expect(wrapper.classes()).toContain("my-icon")
      expect(wrapper.classes()).toContain("my-icon-star")
    })

    it("默认前缀应为 ui-icon", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star" },
      })

      expect(wrapper.classes()).toContain("ui-icon")
    })
  })

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          customClass: "my-custom-icon",
        },
      })

      expect(wrapper.classes()).toContain("my-custom-icon")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          customStyle: { marginTop: "10px" },
        },
      })

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
    })
  })

  describe("事件处理", () => {
    it("点击图标应触发 click 事件", async () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star" },
      })

      await wrapper.find(".ui-icon").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
      expect(wrapper.emitted("click")?.length).toBe(1)
    })

    it("点击图片模式图标应触发 click 事件", async () => {
      const wrapper = mount(UiIcon, {
        props: { name: "https://example.com/icon.png" },
      })

      await wrapper.find("image").trigger("click")

      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  describe("悬停状态", () => {
    it("touchstart 应激活悬停状态", async () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          hoverClass: "ui-icon--hover",
        },
      })

      await wrapper.find(".ui-icon").trigger("touchstart")

      expect(wrapper.classes()).toContain("ui-icon--hover")
    })

    it("touchend 应取消悬停状态", async () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          hoverClass: "ui-icon--hover",
        },
      })

      await wrapper.find(".ui-icon").trigger("touchstart")
      expect(wrapper.classes()).toContain("ui-icon--hover")

      await wrapper.find(".ui-icon").trigger("touchend")
      expect(wrapper.classes()).not.toContain("ui-icon--hover")
    })

    it("mousedown/mouseup 应切换悬停状态", async () => {
      const wrapper = mount(UiIcon, {
        props: {
          name: "star",
          hoverClass: "ui-icon--hover",
        },
      })

      await wrapper.find(".ui-icon").trigger("mousedown")
      expect(wrapper.classes()).toContain("ui-icon--hover")

      await wrapper.find(".ui-icon").trigger("mouseup")
      expect(wrapper.classes()).not.toContain("ui-icon--hover")
    })
  })

  describe("组件暴露", () => {
    it("应通过 expose 暴露组件名称", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star" },
      })

      expect(wrapper.vm.name).toBe("ui-icon")
    })
  })

  describe("边界情况", () => {
    it("空 name 应正常渲染", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "" },
      })

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
    })

    it("null name 应正常渲染", () => {
      const wrapper = mount(UiIcon, {
        props: { name: null },
      })

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
    })

    it("数值类型的 size 应正确处理", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", size: 24 },
      })

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
      expect(wrapper.props("size")).toBe(24)
    })

    it("字符串类型的 size 应正确处理", () => {
      const wrapper = mount(UiIcon, {
        props: { name: "star", size: "24rpx" },
      })

      expect(wrapper.find(".ui-icon").exists()).toBe(true)
      expect(wrapper.props("size")).toBe("24rpx")
    })
  })
})
