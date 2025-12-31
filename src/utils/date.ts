import type { Dayjs, ConfigType } from "dayjs"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/zh-cn"

// 配置 dayjs
dayjs.extend(relativeTime)
dayjs.locale("zh-cn")

// ==================== 类型定义 ====================
export type DateInput = ConfigType

// ==================== 格式化 ====================

/**
 * 格式化日期
 * @param date - 需格式化的时间
 * @param format - 时间格式，默认为 "YYYY-MM-DD"
 * @example formatDate(new Date()) // "2024-01-15"
 * @example formatDate('2024-01-15', 'YYYY年MM月DD日') // "2024年01月15日"
 */
export function formatDate(date: DateInput, format: string = "YYYY-MM-DD"): string {
  return dayjs(date).format(format)
}

/**
 * 格式化日期时间
 * @param date - 需格式化的时间
 * @param format - 时间格式，默认为 "YYYY-MM-DD HH:mm:ss"
 * @example formatDateTime(new Date()) // "2024-01-15 14:30:00"
 */
export function formatDateTime(date: DateInput, format: string = "YYYY-MM-DD HH:mm:ss"): string {
  return dayjs(date).format(format)
}

/**
 * 格式化时间（仅时间部分）
 * @param date - 需格式化的时间
 * @param format - 时间格式，默认为 "HH:mm:ss"
 * @example formatTime(new Date()) // "14:30:00"
 */
export function formatTime(date: DateInput, format: string = "HH:mm:ss"): string {
  return dayjs(date).format(format)
}

// ==================== 相对时间 ====================

/**
 * 获取相对时间描述
 * @param date - 日期
 * @example getRelativeTime('2024-01-14') // "1天前"
 * @example getRelativeTime(Date.now() - 3600000) // "1小时前"
 */
export function getRelativeTime(date: DateInput): string {
  return dayjs(date).fromNow()
}

/**
 * 智能时间显示（类似微信聊天时间）
 * - 今天：显示 HH:mm
 * - 昨天：显示 昨天 HH:mm
 * - 本周：显示 周几 HH:mm
 * - 今年：显示 MM-DD HH:mm
 * - 更早：显示 YYYY-MM-DD HH:mm
 */
export function getSmartTime(date: DateInput): string {
  const target = dayjs(date)
  const now = dayjs()

  if (target.isSame(now, "day")) {
    return target.format("HH:mm")
  }

  if (target.isSame(now.subtract(1, "day"), "day")) {
    return `昨天 ${target.format("HH:mm")}`
  }

  if (target.isSame(now, "week")) {
    const weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    return `${weekDays[target.day()]} ${target.format("HH:mm")}`
  }

  if (target.isSame(now, "year")) {
    return target.format("MM-DD HH:mm")
  }

  return target.format("YYYY-MM-DD HH:mm")
}

// ==================== 日期比较 ====================

/**
 * 判断是否为今天
 */
export function isToday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), "day")
}

/**
 * 判断是否为昨天
 */
export function isYesterday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, "day"), "day")
}

/**
 * 判断是否为本周
 */
export function isThisWeek(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), "week")
}

/**
 * 判断是否为本月
 */
export function isThisMonth(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), "month")
}

/**
 * 判断是否为本年
 */
export function isThisYear(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), "year")
}

/**
 * 判断日期是否在某个范围内
 * @param date - 要判断的日期
 * @param start - 开始日期
 * @param end - 结束日期
 */
export function isBetween(date: DateInput, start: DateInput, end: DateInput): boolean {
  const target = dayjs(date)
  return target.isAfter(dayjs(start)) && target.isBefore(dayjs(end))
}

// ==================== 日期计算 ====================

/**
 * 获取两个日期之间的天数差
 */
export function getDaysDiff(start: DateInput, end: DateInput): number {
  return dayjs(end).diff(dayjs(start), "day")
}

/**
 * 获取两个日期之间的小时差
 */
export function getHoursDiff(start: DateInput, end: DateInput): number {
  return dayjs(end).diff(dayjs(start), "hour")
}

/**
 * 获取两个日期之间的分钟差
 */
export function getMinutesDiff(start: DateInput, end: DateInput): number {
  return dayjs(end).diff(dayjs(start), "minute")
}

/**
 * 添加天数
 */
export function addDays(date: DateInput, days: number): Dayjs {
  return dayjs(date).add(days, "day")
}

/**
 * 减少天数
 */
export function subtractDays(date: DateInput, days: number): Dayjs {
  return dayjs(date).subtract(days, "day")
}

// ==================== 获取特定日期 ====================

/**
 * 获取今天的开始时间（00:00:00）
 */
export function getStartOfDay(date: DateInput = new Date()): Dayjs {
  return dayjs(date).startOf("day")
}

/**
 * 获取今天的结束时间（23:59:59）
 */
export function getEndOfDay(date: DateInput = new Date()): Dayjs {
  return dayjs(date).endOf("day")
}

/**
 * 获取本周的开始时间
 */
export function getStartOfWeek(date: DateInput = new Date()): Dayjs {
  return dayjs(date).startOf("week")
}

/**
 * 获取本周的结束时间
 */
export function getEndOfWeek(date: DateInput = new Date()): Dayjs {
  return dayjs(date).endOf("week")
}

/**
 * 获取本月的开始时间
 */
export function getStartOfMonth(date: DateInput = new Date()): Dayjs {
  return dayjs(date).startOf("month")
}

/**
 * 获取本月的结束时间
 */
export function getEndOfMonth(date: DateInput = new Date()): Dayjs {
  return dayjs(date).endOf("month")
}

// ==================== 工具函数 ====================

/**
 * 获取当前时间戳（毫秒）
 */
export function getTimestamp(): number {
  return Date.now()
}

/**
 * 获取当前时间戳（秒）
 */
export function getUnixTimestamp(): number {
  return dayjs().unix()
}

/**
 * 时间戳转日期
 * @param timestamp - 时间戳（支持秒和毫秒）
 */
export function timestampToDate(timestamp: number): Date {
  // 自动判断秒还是毫秒
  const ts = timestamp.toString().length === 10 ? timestamp * 1000 : timestamp
  return new Date(ts)
}

/**
 * 判断是否为有效日期
 */
export function isValidDate(date: DateInput): boolean {
  return dayjs(date).isValid()
}

/**
 * 获取年龄
 * @param birthday - 生日
 */
export function getAge(birthday: DateInput): number {
  return dayjs().diff(dayjs(birthday), "year")
}

/**
 * 获取倒计时信息
 * @param targetDate - 目标日期
 * @returns 返回剩余的天、时、分、秒，如果已过期则返回 null
 */
export function getCountdown(targetDate: DateInput): { days: number; hours: number; minutes: number; seconds: number } | null {
  const target = dayjs(targetDate)
  const now = dayjs()

  if (target.isBefore(now)) {
    return null
  }

  const totalSeconds = target.diff(now, "second")
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}
