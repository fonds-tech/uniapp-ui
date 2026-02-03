/**
 * 插件入口单元测试
 * 测试 install 行为与全局 mixin
 */

import ui from "@/uni_modules/uniapp-ui"
import { globalMitt } from "@/uni_modules/uniapp-ui/utils/mitt"
import { it, vi, expect, describe, afterEach } from "vitest"
import { resetGlobalProps, resolveGlobalProps } from "@/uni_modules/uniapp-ui/utils/props"

describe("uniapp-ui 插件入口", () => {
  afterEach(() => {
    resetGlobalProps()
    globalMitt.setNamespace("routeA")
    globalMitt.clear()
    globalMitt.setNamespace("routeB")
    globalMitt.clear()
    globalMitt.setNamespace("global")
    globalMitt.clear()
  })

  it("install 应初始化全局 props 并注册 mixin", () => {
    const app = { mixin: vi.fn() } as any

    ui.install(app, {
      components: {
        button: { type: "danger" },
      },
    })

    const resolved = resolveGlobalProps("button", { type: "primary" })
    expect(resolved.type).toBe("danger")
    expect(app.mixin).toHaveBeenCalled()
  })

  it("mixin 应切换命名空间并响应滚动事件", () => {
    const app = { mixin: vi.fn() } as any
    ui.install(app)

    const mixin = app.mixin.mock.calls[0][0]
    const ctx = { $mpType: "page", $scope: { route: "mp" }, route: "routeA" }

    mixin.beforeCreate.call(ctx)

    const handler = vi.fn()
    globalMitt.on("scroll:pages/index/index", handler)

    mixin.onPageScroll.call(ctx, { scrollTop: 10 })
    expect(handler).toHaveBeenCalled()

    mixin.onShow.call({ $mpType: "page", $scope: { route: "mp2" }, route: "routeB" })
    globalMitt.emit("scroll:pages/index/index", { scrollTop: 20 })
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
