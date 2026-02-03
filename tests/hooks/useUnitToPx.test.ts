/**
 * useUnitToPx 单元测试
 * 测试单位转 px
 */

import { useUnitToPx } from "@/uni_modules/uniapp-ui/hooks/useUnitToPx"
import { it, expect, describe } from "vitest"

describe("useUnitToPx", () => {
  it("应支持 rpx/px/数字", () => {
    expect(useUnitToPx("10rpx")).toBe(5)
    expect(useUnitToPx("10px")).toBe(10)
    expect(useUnitToPx(10)).toBe(5)
  })

  it("非法值应抛出错误", () => {
    expect(() => useUnitToPx("abc")).toThrow("不是有效值")
  })
})
