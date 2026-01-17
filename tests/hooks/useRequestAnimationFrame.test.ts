import { useRequestAnimationFrame } from "@/uni_modules/uniapp-ui/hooks/useRequestAnimationFrame"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("useRequestAnimationFrame", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("应在下一帧后执行回调并 resolve", async () => {
    const cb = vi.fn()
    const { promise } = useRequestAnimationFrame(cb)

    await vi.advanceTimersByTimeAsync(34)
    await expect(promise).resolves.toBe(true)
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
