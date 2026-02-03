/**
 * useRect/useRects 单元测试
 * 测试元素位置信息获取
 */

import { useRect } from "@/uni_modules/uniapp-ui/hooks/useRect"
import { useRects } from "@/uni_modules/uniapp-ui/hooks/useRects"
import { it, expect, describe } from "vitest"

describe("useRect / useRects", () => {
  it("useRect 应返回单个节点信息", async () => {
    const rect = await useRect(".test", {} as any)
    expect(rect).toHaveProperty("width")
    expect(rect).toHaveProperty("height")
  })

  it("useRects 应返回多个节点信息", async () => {
    const rects = await useRects(".test", {} as any)
    expect(Array.isArray(rects)).toBe(true)
    expect(rects.length).toBeGreaterThan(1)
  })
})
