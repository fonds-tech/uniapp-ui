/**
 * ui-pagination 组件单元测试
 * 测试分页组件的 props、events 和渲染逻辑
 */

import UiPagination from "@/uni_modules/uniapp-ui/ui-pagination/ui-pagination.vue"
import { mount } from "@vue/test-utils"
import { waitForTransition } from "../setup"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("uiPagination 组件", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe("基础渲染", () => {
    it("应该正确渲染默认状态", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-pagination").exists()).toBe(true)
    })

    it("应该支持默认插槽", async () => {
      const wrapper = mount(UiPagination, {
        slots: {
          default: "<div class=\"custom-list\">列表内容</div>",
        },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".custom-list").exists()).toBe(true)
    })
  })

  describe("list 属性测试", () => {
    it("应该支持设置列表数据", async () => {
      const list = [{ id: 1 }, { id: 2 }, { id: 3 }]
      const wrapper = mount(UiPagination, {
        props: { list },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("list")).toEqual(list)
    })

    it("默认应该是空数组", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("list")).toEqual([])
    })
  })

  describe("page 属性测试", () => {
    it("应该支持设置当前页码", async () => {
      const wrapper = mount(UiPagination, {
        props: { page: 2 },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("page")).toBe(2)
    })

    it("默认页码应该是 1", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("page")).toBe(1)
    })
  })

  describe("pageSize 属性测试", () => {
    it("应该支持设置分页大小", async () => {
      const wrapper = mount(UiPagination, {
        props: { pageSize: 20 },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("pageSize")).toBe(20)
    })

    it("默认分页大小应该是 10", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("pageSize")).toBe(10)
    })
  })

  describe("total 属性测试", () => {
    it("应该支持设置总数", async () => {
      const wrapper = mount(UiPagination, {
        props: { total: 100 },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("total")).toBe(100)
    })

    it("默认总数应该是 0", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("total")).toBe(0)
    })
  })

  describe("loading 属性测试", () => {
    it("loading 为 true 时应该显示加载状态", async () => {
      const wrapper = mount(UiPagination, {
        props: { loading: true },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-pagination__loading").exists()).toBe(true)
      expect(wrapper.find(".loading-icon").exists()).toBe(true)
    })

    it("loading 为 false 时不显示加载图标", async () => {
      const wrapper = mount(UiPagination, {
        props: { loading: false, list: [1, 2, 3] },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".loading-icon").exists()).toBe(false)
    })
  })

  describe("emptyText 属性测试", () => {
    it("应该支持自定义空数据提示文字", async () => {
      const wrapper = mount(UiPagination, {
        props: { emptyText: "没有找到数据" },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("emptyText")).toBe("没有找到数据")
    })

    it("默认空数据提示文字应该是 '暂无数据～'", async () => {
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("emptyText")).toBe("暂无数据～")
    })
  })

  describe("空状态测试", () => {
    it("数据为空且已初始化时应该显示空状态", async () => {
      const wrapper = mount(UiPagination, {
        props: { list: [], loading: true },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      // 先加载
      await wrapper.setProps({ loading: false })
      await waitForTransition()
      // 检查空状态
      expect(wrapper.find(".ui-pagination__empty").exists()).toBe(true)
    })

    it("应支持 empty 插槽", async () => {
      const wrapper = mount(UiPagination, {
        props: { list: [], loading: true },
        slots: {
          empty: "<div class=\"custom-empty\">空数据</div>",
        },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      await wrapper.setProps({ loading: false })
      await waitForTransition()

      expect(wrapper.find(".custom-empty").exists()).toBe(true)
    })
  })

  describe("加载文字测试", () => {
    it("加载中应该显示 '正在加载...'", async () => {
      const wrapper = mount(UiPagination, {
        props: { loading: true },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".loading-text").text()).toBe("正在加载...")
    })

    it("加载完成且到达最后一页应该显示 '没有更多了'", async () => {
      const wrapper = mount(UiPagination, {
        props: {
          list: [1, 2, 3, 4, 5],
          total: 5,
          loading: true,
        },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      await wrapper.setProps({ loading: false })
      await waitForTransition()
      expect(wrapper.find(".loading-text").text()).toBe("没有更多了")
    })
  })

  describe("pagination 对象属性测试", () => {
    it("应该支持 pagination 对象模式", async () => {
      const pagination = {
        data: { value: [1, 2, 3] },
        page: { value: 1 },
        total: { value: 10 },
        loading: { value: false },
        pageSize: { value: 10 },
      }
      const wrapper = mount(UiPagination, {
        props: { pagination },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("pagination")).toEqual(pagination)
    })
  })

  describe("自定义样式测试", () => {
    it("应该支持 customClass", async () => {
      const wrapper = mount(UiPagination, {
        props: { customClass: "my-pagination" },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("customClass")).toBe("my-pagination")
    })

    it("应该支持 customStyle", async () => {
      const wrapper = mount(UiPagination, {
        props: { customStyle: { padding: "20rpx" } },
        global: {
          stubs: {
            "ui-empty": true,
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
      const wrapper = mount(UiPagination, {
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-pagination").exists()).toBe(true)
      expect(wrapper.props("page")).toBe(1)
      expect(wrapper.props("pageSize")).toBe(10)
      expect(wrapper.props("total")).toBe(0)
    })

    it("total 为字符串类型时应该正常处理", async () => {
      const wrapper = mount(UiPagination, {
        props: { total: "50" },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("total")).toBe("50")
    })

    it("page 为字符串类型时应该正常处理", async () => {
      const wrapper = mount(UiPagination, {
        props: { page: "3" },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("page")).toBe("3")
    })

    it("pageSize 为字符串类型时应该正常处理", async () => {
      const wrapper = mount(UiPagination, {
        props: { pageSize: "20" },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.props("pageSize")).toBe("20")
    })
  })

  describe("组合场景测试", () => {
    it("有数据时不应该显示空状态", async () => {
      const wrapper = mount(UiPagination, {
        props: {
          list: [1, 2, 3],
          loading: false,
        },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-pagination__empty").exists()).toBe(false)
    })

    it("加载中时不应该显示空状态", async () => {
      const wrapper = mount(UiPagination, {
        props: {
          list: [],
          loading: true,
        },
        global: {
          stubs: {
            "ui-empty": true,
            "ui-loading": true,
          },
        },
      })
      await waitForTransition()
      expect(wrapper.find(".ui-pagination__empty").exists()).toBe(false)
    })
  })
})
