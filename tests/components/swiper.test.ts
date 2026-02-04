/**
 * ui-swiper 组件单元测试
 * 测试轮播图组件的 props、事件和渲染逻辑
 */

import UiSwiper from "@/uni_modules/uniapp-ui/ui-swiper/ui-swiper.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiSwiper 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper").exists()).toBe(true)
    })

    it("应该包含 swiper 列表", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper__list").exists()).toBe(true)
    })

    it("默认应该显示指示器", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper__indicator").exists()).toBe(true)
    })
  })

  describe("list 属性测试", () => {
    it("应该支持数组类型的 list", () => {
      const list = [
        { url: "https://example.com/1.jpg" },
        { url: "https://example.com/2.jpg" },
      ]
      const wrapper = mount(UiSwiper, {
        props: { list },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("list")).toEqual(list)
    })

    it("应该支持字符串类型的 list（逗号分隔）", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: "https://example.com/1.jpg,https://example.com/2.jpg",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("list")).toBe("https://example.com/1.jpg,https://example.com/2.jpg")
    })

    it("应该支持字符串数组作为 list", () => {
      const list = ["https://example.com/1.jpg", "https://example.com/2.jpg"]
      const wrapper = mount(UiSwiper, {
        props: { list },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("list")).toEqual(list)
    })

    it("应支持自定义 fieldKeys 映射", async () => {
      const list = [{ src: "https://example.com/1.jpg", kind: "image" }]
      const wrapper = mount(UiSwiper, {
        props: {
          list,
          fieldKeys: { url: "src", type: "kind" },
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()

      expect(wrapper.props("fieldKeys")).toEqual({ url: "src", type: "kind" })
      expect(wrapper.findAll(".ui-swiper__item").length).toBe(1)
    })
  })

  describe("尺寸属性测试", () => {
    it("应该支持自定义宽度", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          width: "750rpx",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("width")).toBe("750rpx")
    })

    it("应该支持自定义高度", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          height: "400rpx",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("height")).toBe("400rpx")
    })

    it("应该支持自定义圆角", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          radius: "16rpx",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      const swiper = wrapper.find(".ui-swiper")
      expect(swiper.attributes("style")).toContain("border-radius")
    })
  })

  describe("current 属性测试", () => {
    it("默认当前索引应该是 0", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("current")).toBe(0)
    })

    it("应该支持设置初始索引", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
            { url: "https://example.com/3.jpg" },
          ],
          current: 1,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("current")).toBe(1)
    })

    it("current 变化应触发 update:current", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
          current: 0,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()

      await wrapper.setProps({ current: 1 })
      await waitForTransition()

      expect(wrapper.emitted("update:current")).toBeTruthy()
    })
  })

  describe("autoplay 属性测试", () => {
    it("默认应该自动播放", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("autoplay")).toBe(true)
    })

    it("应该支持关闭自动播放", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          autoplay: false,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("autoplay")).toBe(false)
    })
  })

  describe("circular 属性测试", () => {
    it("默认应该循环播放", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("circular")).toBe(true)
    })

    it("应该支持关闭循环播放", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          circular: false,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("circular")).toBe(false)
    })
  })

  describe("interval 属性测试", () => {
    it("默认切换间隔应该是 3000ms", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("interval")).toBe(3000)
    })

    it("应该支持自定义切换间隔", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          interval: 5000,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("interval")).toBe(5000)
    })
  })

  describe("duration 属性测试", () => {
    it("默认动画时长应该是 500ms", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(500)
    })

    it("应该支持自定义动画时长", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          duration: 800,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("duration")).toBe(800)
    })
  })

  describe("vertical 属性测试", () => {
    it("默认应该是水平滚动", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("vertical")).toBe(false)
    })

    it("应该支持垂直滚动", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          vertical: true,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("vertical")).toBe(true)
    })
  })

  describe("disableTouch 属性测试", () => {
    it("默认应该允许触摸操作", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("disableTouch")).toBe(false)
    })

    it("应该支持禁止触摸操作", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          disableTouch: true,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("disableTouch")).toBe(true)
    })
  })

  describe("indicator 属性测试", () => {
    it("默认应该显示指示器", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("indicator")).toBe(true)
      expect(wrapper.find(".ui-swiper__indicator").exists()).toBe(true)
    })

    it("应该支持隐藏指示器", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
          indicator: false,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper__indicator").exists()).toBe(false)
    })
  })

  describe("indicatorType 属性测试", () => {
    it("默认应该是 dot 类型", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("indicatorType")).toBe("dot")
      expect(wrapper.find(".ui-swiper__indicator--dot").exists()).toBe(true)
    })

    it("应该支持 number 类型", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
          indicatorType: "number",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper__indicator--number").exists()).toBe(true)
      expect(wrapper.find(".ui-swiper__indicator__number").text()).toContain("1/2")
    })
  })

  describe("indicatorPosition 属性测试", () => {
    it("默认应该在右下角", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("indicatorPosition")).toBe("bottom-right")
      expect(wrapper.find(".ui-swiper__indicator--bottom-right").exists()).toBe(true)
    })

    it("应该支持其他位置", async () => {
      const positions = ["left", "top-left", "top", "top-right", "bottom-left", "bottom", "right"]
      for (const position of positions) {
        const wrapper = mount(UiSwiper, {
          props: {
            list: [
              { url: "https://example.com/1.jpg" },
              { url: "https://example.com/2.jpg" },
            ],
            indicatorPosition: position as any,
          },
          global: {
            stubs: {
              "ui-image": true,
              swiper: true,
              "swiper-item": true,
            },
          },
        })
        await waitForTransition()
        expect(wrapper.find(`.ui-swiper__indicator--${position}`).exists()).toBe(true)
      }
    })
  })

  describe("gap 属性测试", () => {
    it("应该支持 prevGap 属性", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          prevGap: "20rpx",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("prevGap")).toBe("20rpx")
    })

    it("应该支持 nextGap 属性", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          nextGap: "20rpx",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("nextGap")).toBe("20rpx")
    })
  })

  describe("imageMode 属性测试", () => {
    it("默认应该是 scaleToFill", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("imageMode")).toBe("scaleToFill")
    })

    it("应该支持其他图片模式", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          imageMode: "aspectFit",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("imageMode")).toBe("aspectFit")
    })
  })

  describe("fieldKeys 属性测试", () => {
    it("应该支持自定义字段映射", () => {
      const fieldKeys = { url: "src", type: "mediaType" }
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ src: "https://example.com/1.jpg", mediaType: "image" }],
          fieldKeys,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("fieldKeys")).toEqual(fieldKeys)
    })
  })

  describe("forKey 属性测试", () => {
    it("应该支持自定义循环 key", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { id: 1, url: "https://example.com/1.jpg" },
            { id: 2, url: "https://example.com/2.jpg" },
          ],
          forKey: "id",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("forKey")).toBe("id")
    })
  })

  describe("暴露方法测试", () => {
    it("应该暴露 name 属性", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.vm.name).toBe("ui-swiper")
    })

    it("应该暴露 prev 方法", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.prev).toBe("function")
    })

    it("应该暴露 next 方法", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.next).toBe("function")
    })

    it("应该暴露 swiperTo 方法", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(typeof wrapper.vm.swiperTo).toBe("function")
    })

    it("prev 方法应该触发 change 事件", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
          current: 1,
          circular: false,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      wrapper.vm.prev()
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("next 方法应该触发 change 事件", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
          current: 0,
          circular: false,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      wrapper.vm.next()
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
    })

    it("swiperTo 方法应该触发 change 事件", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
            { url: "https://example.com/3.jpg" },
          ],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      wrapper.vm.swiperTo(2)
      await waitForTransition()
      expect(wrapper.emitted("change")).toBeTruthy()
      expect(wrapper.emitted("change")![0]).toEqual([2])
    })
  })

  describe("插槽测试", () => {
    it("应该支持 indicator 插槽", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [
            { url: "https://example.com/1.jpg" },
            { url: "https://example.com/2.jpg" },
          ],
        },
        slots: {
          indicator: "<div class=\"custom-indicator\">自定义指示器</div>",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-indicator").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          customClass: "my-swiper",
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper.my-swiper").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const customStyle = { margin: "20rpx" }
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
          customStyle,
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual(customStyle)
    })
  })

  describe("边界情况测试", () => {
    it("list 为空数组时应该正常处理", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper").exists()).toBe(true)
    })

    it("list 只有一项时应该正常处理", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper").exists()).toBe(true)
    })

    it("视频类型应该正常处理", async () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/video.mp4", type: "video" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
            video: true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-swiper").exists()).toBe(true)
    })
  })

  describe("easingFunction 属性测试", () => {
    it("默认应该是 default", () => {
      const wrapper = mount(UiSwiper, {
        props: {
          list: [{ url: "https://example.com/1.jpg" }],
        },
        global: {
          stubs: {
            "ui-image": true,
            swiper: true,
            "swiper-item": true,
          },
        },
      })
      expect(wrapper.props("easingFunction")).toBe("default")
    })

    it("应该支持其他缓动函数", () => {
      const functions = ["linear", "easeInCubic", "easeOutCubic", "easeInOutCubic"]
      functions.forEach((func) => {
        const wrapper = mount(UiSwiper, {
          props: {
            list: [{ url: "https://example.com/1.jpg" }],
            easingFunction: func as any,
          },
          global: {
            stubs: {
              "ui-image": true,
              swiper: true,
              "swiper-item": true,
            },
          },
        })
        expect(wrapper.props("easingFunction")).toBe(func)
      })
    })
  })
})
