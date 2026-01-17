import { useCurrentRouter } from "@/uni_modules/uniapp-ui/hooks/useCurrentRouter"
import { it, vi, expect, describe, afterEach } from "vitest"

describe("useCurrentRouter", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("应返回最后一个页面实例", () => {
    const pages = [{ route: "/pages/a" }, { route: "/pages/b" }]
    vi.stubGlobal("getCurrentPages", () => pages)

    expect(useCurrentRouter()).toBe(pages[1])
  })
})
