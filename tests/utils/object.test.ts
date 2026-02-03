/**
 * utils/object 单元测试
 * 测试深度合并逻辑
 */

import { merge } from "@/uni_modules/uniapp-ui/utils/object"
import { it, expect, describe } from "vitest"

describe("utils/object", () => {
  it("应深度合并对象", () => {
    const target = { a: 1, b: { c: 2 } }
    merge(target, { b: { d: 3 }, e: 4 })

    expect(target).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
  })

  it("应按索引合并数组", () => {
    const target = { a: [{ b: 2 }, { d: 4 }] }
    merge(target, { a: [{ c: 3 }, { e: 5 }] })

    expect(target).toEqual({ a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] })
  })

  it("源值为 undefined 时不覆盖", () => {
    const target = { a: 1 }
    merge(target, { a: undefined })

    expect(target).toEqual({ a: 1 })
  })
})
