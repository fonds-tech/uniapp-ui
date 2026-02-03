/**
 * useTransition 单元测试
 * 测试过渡状态与类名更新
 */

import { useTransition } from "@/uni_modules/uniapp-ui/hooks/useTransition"
import { it, vi, expect, describe, afterEach, beforeEach } from "vitest"

describe("useTransition", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("enter 应初始化并更新类名", async () => {
    const transition = useTransition()
    transition.init({ name: "fade", duration: 50 })

    transition.enter()
    expect(transition.inited.value).toBe(true)
    expect(transition.visible.value).toBe(true)
    expect(transition.classs.value).toContain("ui-fade-enter")

    await vi.runAllTimersAsync()
    expect(transition.classs.value).toContain("ui-fade-enter-to")
  })

  it("leave 应结束并隐藏", async () => {
    const transition = useTransition()
    transition.init({ name: "fade", duration: 50 })

    transition.enter()
    await vi.runAllTimersAsync()

    const leavePromise = transition.leave()
    await vi.runAllTimersAsync()
    await leavePromise
    await vi.runAllTimersAsync()

    expect(transition.status.value).toBe("leave")
    expect(transition.visible.value).toBe(false)
  })
})
