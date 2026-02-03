/**
 * useStyle 单元测试
 * 测试样式对象与字符串互转
 */

import { useStyle } from "@/uni_modules/uniapp-ui/hooks/useStyle"
import { it, expect, describe } from "vitest"

describe("useStyle", () => {
  it("对象转字符串应输出 kebab-case", () => {
    const result = useStyle({ fontSize: "12px", marginTop: "8px" }, "string")
    expect(result).toContain("font-size:12px")
    expect(result).toContain("margin-top:8px")
  })

  it("字符串转对象应解析 key/value", () => {
    const result = useStyle("color: red; font-size: 12px;", "object")
    expect(result).toEqual({ color: "red", "font-size": "12px" })
  })

  it("空值字段应被清理", () => {
    const result = useStyle({ color: "", padding: 0 })
    expect(result).toEqual({ padding: 0 })
  })
})
