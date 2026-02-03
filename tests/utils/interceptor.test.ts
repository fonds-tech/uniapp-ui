/**
 * utils/interceptor 单元测试
 * 测试拦截器调用流程
 */

import { callInterceptor } from "@/uni_modules/uniapp-ui/utils/interceptor"
import { it, vi, expect, describe } from "vitest"

describe("utils/interceptor", () => {
  it("同步返回 true 应触发 done", () => {
    const done = vi.fn()
    callInterceptor(
      () => true,
      {
        done,
      },
    )
    expect(done).toHaveBeenCalled()
  })

  it("同步返回 false 应触发 canceled", () => {
    const canceled = vi.fn()
    callInterceptor(
      () => false,
      {
        done: vi.fn(),
        canceled,
      },
    )
    expect(canceled).toHaveBeenCalled()
  })

  it("promise resolve true 应触发 done", async () => {
    const done = vi.fn()
    callInterceptor(
      () => Promise.resolve(true),
      {
        done,
      },
    )

    await Promise.resolve()
    expect(done).toHaveBeenCalled()
  })

  it("promise resolve false 应触发 canceled", async () => {
    const canceled = vi.fn()
    callInterceptor(
      () => Promise.resolve(false),
      {
        done: vi.fn(),
        canceled,
      },
    )

    await Promise.resolve()
    expect(canceled).toHaveBeenCalled()
  })

  it("promise reject 应触发 error", async () => {
    const error = vi.fn()
    callInterceptor(
      () => Promise.reject(new Error("fail")),
      {
        done: vi.fn(),
        error,
      },
    )

    await Promise.resolve()
    expect(error).toHaveBeenCalled()
  })

  it("无拦截器应直接调用 done", () => {
    const done = vi.fn()
    callInterceptor(undefined, { done })
    expect(done).toHaveBeenCalled()
  })
})
