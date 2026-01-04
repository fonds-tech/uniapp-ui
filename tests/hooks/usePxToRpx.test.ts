/**
 * usePxToRpx 单元测试
 * 测试单位转换功能的正确性
 */

import { usePxToRpx } from "@/uni_modules/uniapp-ui/hooks/usePxToRpx"
import { it, vi, expect, describe, beforeEach } from "vitest"

describe("usePxToRpx 单位转换", () => {
  beforeEach(() => {
    // 模拟 uni.upx2px，假设屏幕宽度为 375px，1rpx = 0.5px
    vi.stubGlobal("uni", {
      upx2px: (rpx: number) => rpx * 0.5,
    })
  })

  describe("空值和无效值处理", () => {
    it("null 应返回 0", () => {
      expect(usePxToRpx(null as any)).toBe(0)
    })

    it("undefined 应返回 0", () => {
      expect(usePxToRpx(undefined as any)).toBe(0)
    })

    it("空字符串应返回 0", () => {
      expect(usePxToRpx("")).toBe(0)
    })

    it("无效字符串应返回 0", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
      expect(usePxToRpx("abc")).toBe(0)
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })

  describe("rpx 单位转换", () => {
    it("应正确转换 rpx 值", () => {
      expect(usePxToRpx("100rpx")).toBe(50) // 100 * 0.5 = 50
    })

    it("应处理带空格的 rpx 值", () => {
      expect(usePxToRpx(" 100rpx ")).toBe(50)
    })

    it("无效 rpx 值应返回 0", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
      expect(usePxToRpx("abcrpx")).toBe(0)
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })

  describe("px 单位处理", () => {
    it("应正确提取 px 值", () => {
      expect(usePxToRpx("100px")).toBe(100)
    })

    it("应处理带空格的 px 值", () => {
      expect(usePxToRpx(" 100px ")).toBe(100)
    })

    it("无效 px 值应返回 0", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {})
      expect(usePxToRpx("abcpx")).toBe(0)
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })

  describe("纯数字处理", () => {
    it("数字应视为 rpx 进行转换", () => {
      expect(usePxToRpx(100)).toBe(50) // 100 * 0.5 = 50
    })

    it("字符串数字应视为 rpx 进行转换", () => {
      expect(usePxToRpx("100")).toBe(50)
    })

    it("0 应返回 0", () => {
      expect(usePxToRpx(0)).toBe(0)
    })

    it("负数应正确处理", () => {
      expect(usePxToRpx(-100)).toBe(-50)
    })
  })
})
