// CODE128/auto.ts
import { A_CHARS, B_CHARS, C_CHARS, A_START_CHAR, B_START_CHAR, C_START_CHAR } from "./constants"

// 匹配A集的最大长度
function matchSetALength(string: string): number {
  const match = string.match(new RegExp(`^${A_CHARS}*`))
  return match ? match[0].length : 0
}

// 匹配B集的最大长度
function matchSetBLength(string: string): number {
  const match = string.match(new RegExp(`^${B_CHARS}*`))
  return match ? match[0].length : 0
}

// 匹配C集的字符串
function matchSetC(string: string): string {
  const match = string.match(new RegExp(`^${C_CHARS}*`))
  return match ? match[0] : ""
}

// 从A/B集中自动选择编码
export function autoSelectFromAB(string: string, isA: boolean): string {
  const ranges = isA ? A_CHARS : B_CHARS
  const untilC = string.match(new RegExp(`^(${ranges}+?)(([0-9]{2}){2,})([^0-9]|$)`))

  if (untilC) {
    return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length))
  }

  const chars = string.match(new RegExp(`^${ranges}+`))![0]

  if (chars.length === string.length) {
    return string
  }

  return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA)
}

// 从C集中自动选择编码
export function autoSelectFromC(string: string): string {
  const cMatch = matchSetC(string)
  const length = cMatch.length

  if (length === string.length) {
    return string
  }

  const remaining = string.substring(length)
  const isA = matchSetALength(remaining) >= matchSetBLength(remaining)

  return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(remaining, isA)
}

// 自动选择最佳编码集并格式化字符串
export function autoSelectModes(string: string): string {
  let newString: string
  const cLength = matchSetC(string).length

  // 如果以足够的数字开头，优先使用C集（更高效）
  if (cLength >= 2) {
    newString = C_START_CHAR + autoSelectFromC(string)
  } else {
    // 否则选择A/B集中匹配更长的
    const isA = matchSetALength(string) > matchSetBLength(string)
    newString = (isA ? A_START_CHAR : B_START_CHAR) + autoSelectFromAB(string, isA)
  }

  // 优化编码：替换A/B切换序列
  return newString.replace(/[\xCD\xCE]([\s\S])[\xCD\xCE]/g, (match, char) => String.fromCharCode(203) + char)
}
