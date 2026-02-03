/**
 * useNotify 单元测试
 * 测试通知控制器的队列与快捷方法
 */

import { ref } from "vue"
import { useNotify } from "@/uni_modules/uniapp-ui/hooks/useNotify"
import { provideNotify } from "@/uni_modules/uniapp-ui/ui-notify"
import { it, vi, expect, describe } from "vitest"

describe("useNotify", () => {
  it("实例未注册时应入队并在注册后执行", () => {
    const notify = useNotify()
    notify.show("内容")

    const instance = {
      show: vi.fn(),
      close: vi.fn(),
    }
    provideNotify(ref(instance as any))

    expect(instance.show).toHaveBeenCalledWith({ content: "内容" })
  })

  it("快捷方法应携带 type", () => {
    const instance = {
      show: vi.fn(),
      close: vi.fn(),
    }
    provideNotify(ref(instance as any))

    const notify = useNotify()
    notify.success("成功")
    notify.warning({ content: "警告" })

    expect(instance.show).toHaveBeenCalledWith({ content: "成功", type: "success" })
    expect(instance.show).toHaveBeenCalledWith({ content: "警告", type: "warning" })
  })
})
