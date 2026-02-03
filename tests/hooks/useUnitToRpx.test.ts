/**
 * useUnitToRpx 单元测试
 * 测试单位转 rpx
 */

import { useUnitToRpx } from "@/uni_modules/uniapp-ui/hooks/useUnitToRpx"
import { it, expect, describe } from "vitest"

describe("useUnitToRpx", () => {
  it("应支持 rpx/px/数字", () => {
    expect(useUnitToRpx("10rpx")).toBe(10)
    expect(useUnitToRpx("10px")).toBe(20)
    expect(useUnitToRpx(10)).toBe(20)
  })

  it("非法值应抛出错误", () => {
    expect(() => useUnitToRpx("abc")).toThrow("不是有效值")
  })
})
