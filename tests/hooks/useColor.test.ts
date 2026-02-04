/**
 * useColor 单元测试
 * 测试内置颜色映射与原值返回
 */

import { useColor } from "@/uni_modules/uniapp-ui/hooks/useColor"
import { it, expect, describe } from "vitest"

describe("useColor", () => {
  it("应正确映射内置颜色", () => {
    expect(useColor("primary")).toBe("var(--ui-color-primary)")
    expect(useColor("text-main")).toBe("var(--ui-color-text)")
  })

  it("非内置颜色应原样返回", () => {
    expect(useColor("#ff0000")).toBe("#ff0000")
    expect(useColor("rgb(255,0,0)")).toBe("rgb(255,0,0)")
  })

  it("空值应返回空字符串", () => {
    expect(useColor("")).toBe("")
  })
})
