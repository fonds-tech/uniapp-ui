import { it, vi, expect, describe, afterEach } from "vitest"

describe("platform", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it("应导出系统信息字段", async () => {
    const originalUni = (globalThis as any).uni || {}
    vi.stubGlobal("uni", {
      ...originalUni,
      getAccountInfoSync: () => ({
        miniProgram: { appId: "test-app-id" },
      }),
      getSystemInfoSync: () => ({
        osName: "ios",
        platform: "ios",
        uniPlatform: "h5",
      }),
    })

    const platform = await import("@/uni_modules/uniapp-ui/utils/platform")

    expect(platform.osName).toBe("ios")
    expect(platform.platform).toBe("ios")
    expect(platform.uniPlatform).toBe("h5")
  })
})
