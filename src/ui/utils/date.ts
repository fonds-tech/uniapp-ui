/**
 * 格式化日期为 YYYY-MM-DD
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

/**
 * 格式化为年月 "2025年11月"
 * @param date 日期对象
 * @returns 格式化后的年月字符串
 */
export function formatYearMonth(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}

/**
 * 解析日期字符串或 Date 为 Date 对象
 * @param date 日期字符串或 Date 对象
 * @returns Date 对象
 */
export function parseDate(date?: string | Date): Date {
  if (!date) return new Date()
  if (date instanceof Date) return date
  return new Date(date)
}

/**
 * 获取月份第一天
 * @param date 日期对象
 * @returns 该月第一天的 Date 对象
 */
export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * 获取月份最后一天
 * @param date 日期对象
 * @returns 该月最后一天的 Date 对象
 */
export function getLastDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * 获取月份天数
 * @param date 日期对象
 * @returns 该月的天数
 */
export function getDaysInMonth(date: Date): number {
  return getLastDayOfMonth(date).getDate()
}

/**
 * 添加月份
 * @param date 日期对象
 * @param months 要添加的月份数(可以为负数)
 * @returns 新的 Date 对象
 */
export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + months)
  return newDate
}

/**
 * 添加天数
 * @param date 日期对象
 * @param days 要添加的天数(可以为负数)
 * @returns 新的 Date 对象
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

/**
 * 添加年份
 * @param date 日期对象
 * @param years 要添加的年份数(可以为负数)
 * @returns 新的 Date 对象
 */
export function addYears(date: Date, years: number): Date {
  const newDate = new Date(date)
  newDate.setFullYear(newDate.getFullYear() + years)
  return newDate
}

/**
 * 比较日期(只比较年月日)
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 是否是同一天
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  return formatDate(date1) === formatDate(date2)
}

/**
 * 判断日期是否在范围内
 * @param date 要判断的日期
 * @param min 最小日期(可选)
 * @param max 最大日期(可选)
 * @returns 是否在范围内
 */
export function isDateInRange(date: Date, min?: Date, max?: Date): boolean {
  const dateStr = formatDate(date)
  if (min && dateStr < formatDate(min)) return false
  if (max && dateStr > formatDate(max)) return false
  return true
}

/**
 * 判断是否是今天
 * @param date 日期对象或字符串
 * @returns 是否是今天
 */
export function isToday(date: Date | string): boolean {
  const today = formatDate(new Date())
  const targetDate = typeof date === "string" ? date : formatDate(date)
  return targetDate === today
}

/**
 * 获取两个日期之间的天数差
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 天数差(可能为负数)
 */
export function getDaysDiff(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round((date2.getTime() - date1.getTime()) / oneDay)
}

/**
 * 获取星期几的中文名称
 * @param date 日期对象
 * @returns 星期几的中文名称
 */
export function getWeekdayName(date: Date): string {
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  return weekdays[date.getDay()]
}
