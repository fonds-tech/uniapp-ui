import { it, vi, expect, describe } from "vitest"

import {
  addDays,
  isToday,
  addYears,
  addMonths,
  isSameDay,
  parseDate,
  formatDate,
  getDaysDiff,
  isDateInRange,
  getDaysInMonth,
  getWeekdayName,
  formatYearMonth,
  getLastDayOfMonth,
  getFirstDayOfMonth,
} from "@/uni_modules/uniapp-ui/utils/date"

describe("日期工具函数", () => {
  it("formatDate 与 formatYearMonth 应格式化正确", () => {
    const date = new Date(2024, 1, 5)
    expect(formatDate(date)).toBe("2024-02-05")
    expect(formatYearMonth(date)).toBe("2024年2月")
  })

  it("parseDate 应支持字符串与 Date", () => {
    const date = new Date(2024, 1, 5)
    expect(parseDate(date)).toBe(date)
    expect(formatDate(parseDate("2024-02-05"))).toBe("2024-02-05")
  })
  it("月份相关计算应正确", () => {
    const date = new Date(2024, 1, 10)
    expect(formatDate(getFirstDayOfMonth(date))).toBe("2024-02-01")
    expect(formatDate(getLastDayOfMonth(date))).toBe("2024-02-29")
    expect(getDaysInMonth(date)).toBe(29)
  })

  it("日期加减应正确", () => {
    const base = new Date(2024, 1, 10)
    expect(formatDate(addMonths(base, 1))).toBe("2024-03-10")
    expect(formatDate(addDays(base, -5))).toBe("2024-02-05")
    expect(formatDate(addYears(base, 1))).toBe("2025-02-10")
  })
  it("日期比较与范围判断应正确", () => {
    const d1 = new Date(2024, 1, 5)
    const d2 = new Date(2024, 1, 6)
    expect(isSameDay(d1, new Date(2024, 1, 5))).toBe(true)
    expect(isDateInRange(d1, new Date(2024, 1, 4), new Date(2024, 1, 6))).toBe(true)
    expect(isDateInRange(d2, new Date(2024, 1, 1), new Date(2024, 1, 5))).toBe(false)
  })

  it("isToday、getDaysDiff 与 getWeekdayName 应正确", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 1, 5))

    expect(isToday("2024-02-05")).toBe(true)
    expect(getDaysDiff(new Date(2024, 1, 5), new Date(2024, 1, 8))).toBe(3)
    expect(getWeekdayName(new Date(2024, 1, 4))).toBe("周日")

    vi.useRealTimers()
  })
})
