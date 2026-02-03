/**
 * useRgb 单元测试
 * 测试颜色解析逻辑
 */

import { useRgb } from "@/uni_modules/uniapp-ui/hooks/useRgb"
import { it, vi, expect, describe } from "vitest"

describe("useRgb", () => {
  it("应解析十六进制颜色", () => {
    expect(useRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 })
    expect(useRgb("#0f0")).toEqual({ r: 0, g: 255, b: 0 })
  })

  it("应解析 rgb/rgba 颜色", () => {
    expect(useRgb("rgb(0, 0, 255)")).toEqual({ r: 0, g: 0, b: 255 })
    expect(useRgb("rgba(255, 0, 0, 0.5)")).toEqual({ r: 255, g: 0, b: 0 })
  })

  it("应解析颜色关键字", () => {
    expect(useRgb("red")).toEqual({ r: 255, g: 0, b: 0 })
  })

  it("非法颜色应返回 null 并警告", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    expect(useRgb("invalid-color")).toBeNull()
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
