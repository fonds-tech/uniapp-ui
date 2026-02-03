/**
 * utils/props 单元测试
 * 测试全局 Props 配置逻辑
 */

import { it, expect, describe, beforeEach } from "vitest"
import { setGlobalProps, initGlobalProps, mergeGlobalProps, resetGlobalProps, buildDefaultProps, getRawGlobalProps, resolveGlobalProps } from "@/uni_modules/uniapp-ui/utils/props"

describe("utils/props", () => {
  beforeEach(() => {
    resetGlobalProps()
  })

  it("setGlobalProps/resolveGlobalProps 应正确合并", () => {
    setGlobalProps("button", { size: "large" })
    const resolved = resolveGlobalProps("button", { size: "small", type: "primary" })

    expect(resolved).toEqual({ size: "large", type: "primary" })
  })

  it("mergeGlobalProps 应合并并覆盖", () => {
    setGlobalProps("button", { size: "large" })
    mergeGlobalProps("button", { size: "small", type: "primary" })

    expect(getRawGlobalProps("button")).toEqual({ size: "small", type: "primary" })
  })

  it("initGlobalProps 应支持批量初始化", () => {
    initGlobalProps({ button: { size: "large" } })
    expect(getRawGlobalProps("button")).toEqual({ size: "large" })
  })

  it("buildDefaultProps 应应用全局默认值", () => {
    setGlobalProps("button", { size: "large" })
    const withDefault = buildDefaultProps("button", { size: "small", type: "primary" })

    const sizeProp = withDefault("size", { type: String })
    const typeProp = withDefault("type", { type: String })

    expect(sizeProp.default).toBe("large")
    expect(typeProp.default).toBe("primary")
  })
})
