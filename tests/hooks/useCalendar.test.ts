/**
 * useCalendar 单元测试
 * 测试日历逻辑的选择模式与日期计算
 */

import { useCalendar } from "@/uni_modules/uniapp-ui/hooks/useCalendar"
import { it, expect, describe } from "vitest"

describe("useCalendar", () => {
  it("firstDayOfWeek 应正确调整周标题", () => {
    const { weeks } = useCalendar({ firstDayOfWeek: 1 })
    expect(weeks.value[0]).toBe("一")
    expect(weeks.value[6]).toBe("日")
  })

  it("single 模式选择日期应更新 selectedDate", () => {
    const { selectedDate, selectDate } = useCalendar({
      mode: "single",
      defaultDate: new Date(2024, 4, 15),
    })

    selectDate("2024-05-20")
    expect(selectedDate.value).toBe("2024-05-20")
  })

  it("multiple 模式应支持增删选择", () => {
    const { selectedDates, selectDate } = useCalendar({
      mode: "multiple",
      defaultSelectedDates: ["2024-05-01"],
    })

    selectDate("2024-05-02")
    expect(selectedDates.value).toContain("2024-05-01")
    expect(selectedDates.value).toContain("2024-05-02")

    selectDate("2024-05-01")
    expect(selectedDates.value).not.toContain("2024-05-01")
  })

  it("range 模式应生成起止日期", () => {
    const { selectedRange, selectDate } = useCalendar({ mode: "range" })

    selectDate("2024-05-10")
    expect(selectedRange.value.start).toBe("2024-05-10")
    expect(selectedRange.value.end).toBe("")

    selectDate("2024-05-08")
    expect(selectedRange.value.start).toBe("2024-05-08")
    expect(selectedRange.value.end).toBe("2024-05-10")
  })

  it("updateMarkedDates 应更新标记状态", () => {
    const { isMarked, updateMarkedDates } = useCalendar({
      markedDates: ["2024-05-01"],
    })

    expect(isMarked("2024-05-01")).toBe(true)
    updateMarkedDates(["2024-05-02"])
    expect(isMarked("2024-05-01")).toBe(false)
    expect(isMarked("2024-05-02")).toBe(true)
  })

  it("minDate/maxDate 应影响禁用状态", () => {
    const { isDisabled } = useCalendar({
      minDate: new Date(2024, 4, 10),
      maxDate: new Date(2024, 4, 20),
    })

    expect(isDisabled("2024-05-09")).toBe(true)
    expect(isDisabled("2024-05-15")).toBe(false)
    expect(isDisabled("2024-05-21")).toBe(true)
  })
})
