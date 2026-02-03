/**
 * useUnit 单元测试
 * 测试单位转换逻辑
 */

import { useUnit } from "@/uni_modules/uniapp-ui/hooks/useUnit"
import { it, expect, describe } from "vitest"

describe("useUnit", () => {
  it("应处理 rpx/px/数字转换", () => {
    expect(useUnit(10, "rpx")).toBe("10rpx")
    expect(useUnit(10, "px")).toBe("5px")
    expect(useUnit("10rpx", "px")).toBe("5px")
    expect(useUnit("10px", "rpx")).toBe("20rpx")
  })

  it("非法值应返回原字符串", () => {
    expect(useUnit("10rpx abc", "px")).toBe("10rpx abc")
  })
})
