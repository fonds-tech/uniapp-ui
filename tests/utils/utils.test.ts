/**
 * 工具函数单元测试
 * 测试 debounce、throttling、getLinkExtension 等函数
 */

import { debounce, throttling, getLinkExtension } from "@/uni_modules/uniapp-ui/utils/utils"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("工具函数", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe("debounce 防抖函数", () => {
    it("应在等待时间后执行函数", () => {
      const func = vi.fn()
      const debouncedFunc = debounce(func, 100)

      debouncedFunc()
      expect(func).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("多次快速调用应只执行最后一次", () => {
      const func = vi.fn()
      const debouncedFunc = debounce(func, 100)

      debouncedFunc()
      debouncedFunc()
      debouncedFunc()

      vi.advanceTimersByTime(100)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("immediate 模式应立即执行第一次", () => {
      const func = vi.fn()
      const debouncedFunc = debounce(func, 100, true)

      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(1)

      debouncedFunc()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("不同 debounce 实例应相互独立", () => {
      const func1 = vi.fn()
      const func2 = vi.fn()
      const debouncedFunc1 = debounce(func1, 100)
      const debouncedFunc2 = debounce(func2, 100)

      debouncedFunc1()
      debouncedFunc2()

      vi.advanceTimersByTime(100)

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledTimes(1)
    })

    it("应正确传递参数", () => {
      const func = vi.fn()
      const debouncedFunc = debounce(func, 100)

      debouncedFunc("arg1", "arg2")
      vi.advanceTimersByTime(100)

      expect(func).toHaveBeenCalledWith("arg1", "arg2")
    })
  })

  describe("throttling 节流函数", () => {
    it("immediate 模式应立即执行", () => {
      const func = vi.fn()
      const throttledFunc = throttling(func, 100, true)

      throttledFunc()
      expect(func).toHaveBeenCalledTimes(1)

      throttledFunc()
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("非 immediate 模式应延迟执行", () => {
      const func = vi.fn()
      const throttledFunc = throttling(func, 100, false)

      throttledFunc()
      expect(func).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it("不同 throttling 实例应相互独立", () => {
      const func1 = vi.fn()
      const func2 = vi.fn()
      const throttledFunc1 = throttling(func1, 100, true)
      const throttledFunc2 = throttling(func2, 100, true)

      throttledFunc1()
      throttledFunc2()

      expect(func1).toHaveBeenCalledTimes(1)
      expect(func2).toHaveBeenCalledTimes(1)
    })

    it("应正确传递参数", () => {
      const func = vi.fn()
      const throttledFunc = throttling(func, 100, true)

      throttledFunc("arg1", "arg2")
      expect(func).toHaveBeenCalledWith("arg1", "arg2")
    })
  })

  describe("getLinkExtension 获取链接扩展名", () => {
    it("应正确获取常见扩展名", () => {
      expect(getLinkExtension("https://example.com/image.png")).toBe("png")
      expect(getLinkExtension("https://example.com/file.jpg")).toBe("jpg")
      expect(getLinkExtension("https://example.com/doc.pdf")).toBe("pdf")
    })

    it("应返回小写扩展名", () => {
      expect(getLinkExtension("https://example.com/image.PNG")).toBe("png")
      expect(getLinkExtension("https://example.com/file.JPG")).toBe("jpg")
    })

    it("无扩展名时应返回空字符串", () => {
      expect(getLinkExtension("https://example.com/noextension")).toBe("")
      expect(getLinkExtension("https://example")).toBe("")
    })

    it("应忽略查询参数", () => {
      expect(getLinkExtension("https://example.com/image.png?v=1")).toBe("png")
      expect(getLinkExtension("https://example.com/file.jpg?a=1&b=2")).toBe("jpg")
    })

    it("应忽略锚点", () => {
      expect(getLinkExtension("https://example.com/image.png#section")).toBe("png")
    })

    it("空值应返回空字符串", () => {
      expect(getLinkExtension("")).toBe("")
      expect(getLinkExtension(null as any)).toBe("")
      expect(getLinkExtension(undefined as any)).toBe("")
    })

    it("非字符串输入应返回空字符串", () => {
      expect(getLinkExtension(123 as any)).toBe("")
      expect(getLinkExtension({} as any)).toBe("")
    })

    it("应处理路径中包含点的情况", () => {
      expect(getLinkExtension("https://example.com/path.to/file.png")).toBe("png")
      expect(getLinkExtension("https://example.com/v1.0.0/file.js")).toBe("js")
    })
  })
})
