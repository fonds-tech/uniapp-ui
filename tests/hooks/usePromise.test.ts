/**
 * usePromise 单元测试
 * 测试自定义 Promise 的 then/abort 行为
 */

import { usePromise } from "@/uni_modules/uniapp-ui/hooks/usePromise"
import { it, vi, expect, describe } from "vitest"

describe("usePromise", () => {
  it("then 应正常工作", async () => {
    const { then } = usePromise<number>((resolve) => resolve(1))
    const value = await then((val) => val + 1)
    expect(value).toBe(2)
  })

  it("abort 应触发 catch", async () => {
    const { catch: onCatch, abort } = usePromise((resolve, reject) => {
      // 不主动 resolve
    })

    const spy = vi.fn()
    onCatch(spy)
    abort(new Error("abort"))

    await Promise.resolve()
    expect(spy).toHaveBeenCalled()
  })
})
