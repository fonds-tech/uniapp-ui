/**
 * useSystemInfo 单元测试
 * 测试系统信息获取
 */

import { useSystemInfo } from "@/uni_modules/uniapp-ui/hooks/useSystemInfo"
import { it, expect, describe } from "vitest"

describe("useSystemInfo", () => {
  it("应返回系统信息对象", () => {
    const info = useSystemInfo()
    expect(info).toHaveProperty("platform")
    expect(info).toHaveProperty("windowHeight")
  })
})
