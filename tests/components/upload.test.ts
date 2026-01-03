import UiUpload from "@/uni_modules/uniapp-ui/ui-upload/ui-upload.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiUpload 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload").exists()).toBe(true)
    })

    it("应该包含上传触发区域", async () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload__trigger").exists()).toBe(true)
    })
  })

  describe("modelValue 属性测试", () => {
    it("默认值应该是空字符串", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("")
    })

    it("应该支持字符串类型的 modelValue", () => {
      const wrapper = mount(UiUpload, {
        props: { modelValue: "https://example.com/image.jpg" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("https://example.com/image.jpg")
    })

    it("应该支持数组类型的 modelValue", () => {
      const urls = ["https://example.com/1.jpg", "https://example.com/2.jpg"]
      const wrapper = mount(UiUpload, {
        props: { modelValue: urls },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toEqual(urls)
    })
  })

  describe("尺寸属性测试", () => {
    it("默认宽度应该是 160rpx", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("width")).toBe("160rpx")
    })

    it("默认高度应该是 160rpx", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("height")).toBe("160rpx")
    })

    it("应该支持自定义宽度", () => {
      const wrapper = mount(UiUpload, {
        props: { width: "200rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("width")).toBe("200rpx")
    })

    it("应该支持自定义高度", () => {
      const wrapper = mount(UiUpload, {
        props: { height: "200rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("height")).toBe("200rpx")
    })
  })

  describe("accept 属性测试", () => {
    it("默认 accept 应该是空字符串", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("accept")).toBe("")
    })

    it("应该支持 image 类型", () => {
      const wrapper = mount(UiUpload, {
        props: { accept: "image" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("accept")).toBe("image")
    })

    it("应该支持 video 类型", () => {
      const wrapper = mount(UiUpload, {
        props: { accept: "video" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("accept")).toBe("video")
    })

    it("应该支持 file 类型", () => {
      const wrapper = mount(UiUpload, {
        props: { accept: "file" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("accept")).toBe("file")
    })
  })

  describe("capture 属性测试", () => {
    it("默认 capture 应该包含 album 和 camera", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("capture")).toEqual(["album", "camera"])
    })

    it("应该支持自定义 capture", () => {
      const wrapper = mount(UiUpload, {
        props: { capture: ["camera"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("capture")).toEqual(["camera"])
    })
  })

  describe("camera 属性测试", () => {
    it("应该支持 back 相机", () => {
      const wrapper = mount(UiUpload, {
        props: { camera: "back" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("camera")).toBe("back")
    })

    it("应该支持 front 相机", () => {
      const wrapper = mount(UiUpload, {
        props: { camera: "front" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("camera")).toBe("front")
    })
  })

  describe("multiple 属性测试", () => {
    it("默认不是多选模式", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("multiple")).toBe(false)
    })

    it("应该支持多选模式", () => {
      const wrapper = mount(UiUpload, {
        props: { multiple: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("multiple")).toBe(true)
    })
  })

  describe("deletable 属性测试", () => {
    it("默认应该可删除", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("deletable")).toBe(true)
    })

    it("应该支持禁用删除", () => {
      const wrapper = mount(UiUpload, {
        props: { deletable: false },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("deletable")).toBe(false)
    })
  })

  describe("disabled 属性测试", () => {
    it("默认不禁用", async () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload--disabled").exists()).toBe(false)
    })

    it("禁用时应该添加禁用样式", async () => {
      const wrapper = mount(UiUpload, {
        props: { disabled: true },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload--disabled").exists()).toBe(true)
    })
  })

  describe("maxSize 属性测试", () => {
    it("默认 maxSize 应该是 Infinity", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxSize")).toBe(Infinity)
    })

    it("应该支持数字类型的 maxSize", () => {
      const wrapper = mount(UiUpload, {
        props: { maxSize: 5242880 },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxSize")).toBe(5242880)
    })
  })

  describe("maxCount 属性测试", () => {
    it("默认 maxCount 应该是 Infinity", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxCount")).toBe(Infinity)
    })

    it("应该支持设置最大上传数量", () => {
      const wrapper = mount(UiUpload, {
        props: { maxCount: 5 },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxCount")).toBe(5)
    })
  })

  describe("maxDuration 属性测试", () => {
    it("默认 maxDuration 应该是 60 秒", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxDuration")).toBe(60)
    })

    it("应该支持自定义最大拍摄时长", () => {
      const wrapper = mount(UiUpload, {
        props: { maxDuration: 30 },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("maxDuration")).toBe(30)
    })
  })

  describe("sizeType 属性测试", () => {
    it("默认 sizeType 应该包含 original 和 compressed", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("sizeType")).toEqual(["original", "compressed"])
    })

    it("应该支持自定义 sizeType", () => {
      const wrapper = mount(UiUpload, {
        props: { sizeType: ["compressed"] },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("sizeType")).toEqual(["compressed"])
    })
  })

  describe("previewGap 属性测试", () => {
    it("默认预览间隔应该是 20rpx", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("previewGap")).toBe("20rpx")
    })

    it("应该支持自定义预览间隔", () => {
      const wrapper = mount(UiUpload, {
        props: { previewGap: "30rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("previewGap")).toBe("30rpx")
    })
  })

  describe("imageMode 属性测试", () => {
    it("默认 imageMode 应该是 aspectFill", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("imageMode")).toBe("aspectFill")
    })

    it("应该支持自定义 imageMode", () => {
      const wrapper = mount(UiUpload, {
        props: { imageMode: "aspectFit" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("imageMode")).toBe("aspectFit")
    })
  })

  describe("预览区图标属性测试", () => {
    it("默认 previewIconSize 应该是 60rpx", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("previewIconSize")).toBe("60rpx")
    })

    it("默认 previewIconColor 应该是 #cccccc", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("previewIconColor")).toBe("#cccccc")
    })

    it("应该支持自定义预览图标大小", () => {
      const wrapper = mount(UiUpload, {
        props: { previewIconSize: "80rpx" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("previewIconSize")).toBe("80rpx")
    })
  })

  describe("上传区域图标属性测试", () => {
    it("默认 icon 应该是 photograph", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("icon")).toBe("photograph")
    })

    it("默认 iconSize 应该是 56rpx", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("iconSize")).toBe("56rpx")
    })

    it("默认 iconColor 应该是 #cccccc", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("iconColor")).toBe("#cccccc")
    })

    it("应该支持自定义图标", () => {
      const wrapper = mount(UiUpload, {
        props: { icon: "plus" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("icon")).toBe("plus")
    })
  })

  describe("回调函数属性测试", () => {
    it("应该支持 beforeRead 回调", () => {
      const beforeRead = vi.fn()
      const wrapper = mount(UiUpload, {
        props: { beforeRead },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("beforeRead")).toBe(beforeRead)
    })

    it("应该支持 afterRead 回调", () => {
      const afterRead = vi.fn()
      const wrapper = mount(UiUpload, {
        props: { afterRead },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("afterRead")).toBe(afterRead)
    })

    it("应该支持 beforeRemove 回调", () => {
      const beforeRemove = vi.fn()
      const wrapper = mount(UiUpload, {
        props: { beforeRemove },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("beforeRemove")).toBe(beforeRemove)
    })
  })

  describe("background 属性测试", () => {
    it("默认 background 应该是空字符串", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("background")).toBe("")
    })

    it("应该支持自定义背景颜色", () => {
      const wrapper = mount(UiUpload, {
        props: { background: "#f5f5f5" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("background")).toBe("#f5f5f5")
    })
  })

  describe("compressed 属性测试", () => {
    it("默认应该压缩视频", () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("compressed")).toBe(true)
    })

    it("应该支持禁用压缩", () => {
      const wrapper = mount(UiUpload, {
        props: { compressed: false },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("compressed")).toBe(false)
    })
  })

  describe("插槽测试", () => {
    it("应该支持 icon 插槽", async () => {
      const wrapper = mount(UiUpload, {
        slots: {
          icon: "<span class=\"custom-icon\">+</span>",
        },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-icon").exists()).toBe(true)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiUpload, {
        props: { customClass: "my-upload" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload.my-upload").exists()).toBe(true)
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiUpload, {
        props: { customStyle: { padding: "20rpx" } },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customStyle")).toEqual({ padding: "20rpx" })
    })
  })

  describe("边界情况测试", () => {
    it("不设置任何 props 时应该使用默认值", async () => {
      const wrapper = mount(UiUpload, {
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-upload").exists()).toBe(true)
      expect(wrapper.props("modelValue")).toBe("")
      expect(wrapper.props("deletable")).toBe(true)
    })

    it("modelValue 为逗号分隔字符串时应该正常处理", () => {
      const wrapper = mount(UiUpload, {
        props: { modelValue: "https://example.com/1.jpg,https://example.com/2.jpg" },
        global: {
          stubs: {
            "ui-icon": true,
            "ui-image": true,
            "ui-loading": true,
          },
        },
      })
      expect(wrapper.props("modelValue")).toBe("https://example.com/1.jpg,https://example.com/2.jpg")
    })
  })
})
