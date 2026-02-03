/**
 * useGlobalZIndex 单元测试
 * 测试全局 z-index 递增
 */

import { useGlobalZIndex } from "@/uni_modules/uniapp-ui/hooks/useGlobalZIndex"
import { it, expect, describe } from "vitest"

describe("useGlobalZIndex", () => {
  it("应返回递增的 z-index", () => {
    const first = useGlobalZIndex()
    const second = useGlobalZIndex()
    expect(second).toBe(first + 1)
  })
})
