/**
 * utils/format 单元测试
 * 测试数字格式化函数
 */

import { it, expect, describe } from "vitest"
import { formatDigit, formatNumber } from "@/uni_modules/uniapp-ui/utils/format"

describe("utils/format", () => {
  it("formatNumber 应移除多余字符", () => {
    expect(formatNumber("12.3.4")).toBe("12.34")
    expect(formatNumber("-12.3", false)).toBe("-12")
    expect(formatNumber("-12", true, false)).toBe("12")
  })

  it("formatDigit 应支持千分位与小数位", () => {
    expect(formatDigit(1234.5, { decimalPlaces: 2, thousandsSep: "," })).toBe("1,234.5")
    expect(formatDigit(1234.5, { decimalPlaces: 2, thousandsSep: ",", trimZero: false })).toBe("1,234.50")
  })

  it("非法值应原样返回", () => {
    expect(formatDigit("abc" as any)).toBe("abc")
  })
})
