/**
 * useDialog 单元测试
 * 测试全局 Dialog 控制器的队列与调用逻辑
 */

import { ref } from "vue"
import { it, vi, expect, describe, beforeEach } from "vitest"

describe("useDialog", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unmock("@/uni_modules/uniapp-ui/hooks/useDialog")
  })

  it("实例未注册时应入队并在注册后执行", async () => {
    const { useDialog } = await import("@/uni_modules/uniapp-ui/hooks/useDialog")
    const { provideDialog } = await import("@/uni_modules/uniapp-ui/ui-dialog")

    const dialog = useDialog()
    const result = await dialog.show({ title: "测试" })
    expect(result).toBe(false)

    const instance = {
      open: vi.fn(),
      close: vi.fn(),
      show: vi.fn(),
      confirm: vi.fn(),
      alert: vi.fn(),
    }
    provideDialog(ref(instance as any))

    expect(instance.open).toHaveBeenCalledWith({ title: "测试" })
  })

  it("实例存在时应直接调用实例方法", async () => {
    const { useDialog } = await import("@/uni_modules/uniapp-ui/hooks/useDialog")
    const { provideDialog } = await import("@/uni_modules/uniapp-ui/ui-dialog")

    const instance = {
      open: vi.fn(),
      close: vi.fn(),
      show: vi.fn().mockResolvedValue(true),
      confirm: vi.fn().mockResolvedValue(true),
      alert: vi.fn().mockResolvedValue(undefined),
    }
    provideDialog(ref(instance as any))

    const dialog = useDialog()
    await dialog.confirm("确认")
    await dialog.alert({ title: "提示" })
    await dialog.show({ title: "展示" })
    dialog.close()

    expect(instance.confirm).toHaveBeenCalledWith("确认")
    expect(instance.alert).toHaveBeenCalledWith({ title: "提示" })
    expect(instance.show).toHaveBeenCalledWith({ title: "展示" })
    expect(instance.close).toHaveBeenCalled()
  })
})
