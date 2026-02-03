/**
 * useMitt 单元测试
 * 测试全局事件总线实例
 */

import { useMitt } from "@/uni_modules/uniapp-ui/hooks/useMitt"
import { it, vi, expect, describe } from "vitest"

describe("useMitt", () => {
  it("应返回可用的事件总线实例", () => {
    const mitt = useMitt()
    const handler = vi.fn()

    mitt.on("test", handler)
    mitt.emit("test", 1)

    expect(handler).toHaveBeenCalledWith(1)
  })
})
