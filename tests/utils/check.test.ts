/**
 * utils/check 单元测试
 * 测试常用校验函数
 */

import { it, expect, describe } from "vitest"
import {
  isDef,
  isUrl,
  isDate,
  isArray,
  isEmail,
  isEmpty,
  isEqual,
  isImage,
  isDigits,
  isNumber,
  isObject,
  isString,
  isBoolean,
  isNoEmpty,
  isPhoneNo,
  isPromise,
  isDocument,
  isFunction,
  isHexColor,
  isPercentage,
  isPlainObject,
} from "@/uni_modules/uniapp-ui/utils/check"

describe("utils/check", () => {
  it("基础类型校验应正确", () => {
    expect(isDef(0)).toBe(true)
    expect(isDef("")).toBe(false)
    expect(isString("a")).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isBoolean(false)).toBe(true)
    expect(isArray([])).toBe(true)
    expect(isObject({})).toBe(true)
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject([])).toBe(false)
  })

  it("格式校验应正确", () => {
    expect(isHexColor("#fff")).toBe(true)
    expect(isEmail("test@example.com")).toBe(true)
    expect(isPhoneNo("13812345678")).toBe(true)
    expect(isUrl("https://example.com")).toBe(true)
    expect(isImage("a.png")).toBe(true)
    expect(isDocument("a.pdf")).toBe(true)
    expect(isDigits("123")).toBe(true)
    expect(isPercentage("10%")).toBe(true)
    expect(isNumber("1,000")).toBe(true)
  })

  it("逻辑校验应正确", () => {
    expect(isEqual(1, "1")).toBe(true)
    expect(isDate("2024-05-01")).toBe(true)
    expect(isDate("invalid")).toBe(false)
  })

  it("空值判断应正确", () => {
    expect(isEmpty(" ")).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isNoEmpty([1])).toBe(true)
  })

  it("promise 判断应正确", () => {
    expect(isPromise(Promise.resolve())).toBe(true)
  })
})
