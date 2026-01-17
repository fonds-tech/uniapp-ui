import { useVar } from "@/uni_modules/uniapp-ui/hooks/useVar"
import { it, expect, describe } from "vitest"

describe("useVar", () => {
  it("应返回符合规范的 CSS 变量字符串", () => {
    expect(useVar("color-primary")).toBe("var(--ui-color-primary)")
  })
})
