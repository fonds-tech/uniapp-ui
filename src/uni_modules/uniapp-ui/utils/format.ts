import { isNumber } from "./check"

function trimExtraChar(value: string, char: string, regExp: RegExp) {
  const index = value.indexOf(char)
  if (index === -1) return value
  if (char === "-" && index !== 0) return value.slice(0, index)
  return value.slice(0, index + 1) + value.slice(index).replace(regExp, "")
}

/**
 * 格式化数字字符串，去除多余的字符。
 * @param value - 需要格式化的值。
 * @param allowDot - 是否允许小数点，默认为 true。
 * @param allowMinus - 是否允许负号，默认为 true。
 */
export function formatNumber(value: string, allowDot = true, allowMinus = true) {
  value = allowDot ? trimExtraChar(value, ".", /\./g) : value.split(".")[0]
  value = allowMinus ? trimExtraChar(value, "-", /-/g) : value.replace(/-/, "")
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g
  return value.replace(regExp, "")
}

/**
 * 格式化数字函数
 * @param {number} digit - 输入的数字
 * @param {object} options - 选项对象
 * @param {number} [options.decimalPlaces] - 小数位数，默认为2
 * @param {string} [options.thousandsSep] - 千位分隔符，默认为空
 * @param {boolean} [options.trimZero] - 是否去除后面多余的零，默认为true
 * @returns {string} 返回格式化后的金额字符串
 */
export function formatDigit(digit: number = 0, options: { decimalPlaces?: number; thousandsSep?: string; trimZero?: boolean } = {}): string | number {
  if (!isNumber(digit)) return digit
  const { decimalPlaces = 2, thousandsSep = "", trimZero = true } = options
  const amountStr = String(digit)
  const [integerPart, decimalPart = ""] = amountStr.split(".")

  let formattedInteger = integerPart
  if (thousandsSep) {
    formattedInteger = formattedInteger.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep)
  }

  let decimalPortion = ""
  if (decimalPlaces > 0) {
    const formattedDecimal = decimalPart.padEnd(decimalPlaces, "0").slice(0, decimalPlaces)
    if (trimZero) {
      const trimmed = formattedDecimal.replace(/0+$/, "")
      decimalPortion = trimmed ? `.${trimmed}` : ""
    } else {
      decimalPortion = `.${formattedDecimal}`
    }
  }

  return decimalPortion ? formattedInteger + decimalPortion : formattedInteger
}
