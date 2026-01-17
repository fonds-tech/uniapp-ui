import { ref } from "vue"
import { it, vi, expect, describe, beforeEach } from "vitest"

describe("useToast", () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it("实例未注册时应入队并在注册后执行", async () => {
    const { useToast } = await import("@/uni_modules/uniapp-ui/hooks/useToast")
    const { provideToast } = await import("@/uni_modules/uniapp-ui/ui-toast")

    const toast = useToast()
    toast.show("hello")
    toast.hide()

    const instance = {
      show: vi.fn(),
      hide: vi.fn(),
      success: vi.fn(),
      fail: vi.fn(),
      loading: vi.fn(),
      await: vi.fn(),
      text: vi.fn(),
    }
    provideToast(ref(instance as any))
    expect(instance.show).toHaveBeenCalledWith("hello")
    expect(instance.hide).toHaveBeenCalledTimes(1)
  })

  it("实例存在时应直接调用对应方法", async () => {
    const { useToast } = await import("@/uni_modules/uniapp-ui/hooks/useToast")
    const { provideToast } = await import("@/uni_modules/uniapp-ui/ui-toast")

    const instance = {
      show: vi.fn(),
      hide: vi.fn(),
      success: vi.fn(),
      fail: vi.fn(),
      loading: vi.fn(),
      await: vi.fn(),
      text: vi.fn(),
    }
    provideToast(ref(instance as any))
    const toast = useToast()

    toast.success("ok")
    toast.fail("bad")
    toast.loading("loading")
    toast.await("wait")
    toast.text("text")

    expect(instance.success).toHaveBeenCalledWith("ok")
    expect(instance.fail).toHaveBeenCalledWith("bad")
    expect(instance.loading).toHaveBeenCalledWith("loading")
    expect(instance.await).toHaveBeenCalledWith("wait")
    expect(instance.text).toHaveBeenCalledWith("text")
  })
})
