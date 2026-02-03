/**
 * useLockScroll 单元测试
 * 测试页面滚动锁定与释放
 */

import { mount } from "@vue/test-utils"
import { useLockScroll } from "@/uni_modules/uniapp-ui/hooks/useLockScroll"
import { it, expect, describe } from "vitest"
import { ref, nextTick, defineComponent } from "vue"

describe("useLockScroll", () => {
  it("应根据状态添加/移除锁定类", async () => {
    const Comp = defineComponent({
      setup() {
        const locked = ref(false)
        useLockScroll(() => locked.value)
        return { locked }
      },
      template: "<div></div>",
    })

    const wrapper = mount(Comp)

    expect(document.body.classList.contains("ui-overflow-hidden")).toBe(false)

    wrapper.vm.locked = true
    await nextTick()

    expect(document.body.classList.contains("ui-overflow-hidden")).toBe(true)

    wrapper.vm.locked = false
    await nextTick()

    expect(document.body.classList.contains("ui-overflow-hidden")).toBe(false)

    wrapper.unmount()
  })

  it("卸载时应释放锁定", async () => {
    const Comp = defineComponent({
      setup() {
        const locked = ref(true)
        useLockScroll(() => locked.value)
        return { locked }
      },
      template: "<div></div>",
    })

    const wrapper = mount(Comp)
    await nextTick()

    expect(document.body.classList.contains("ui-overflow-hidden")).toBe(true)

    wrapper.unmount()
    expect(document.body.classList.contains("ui-overflow-hidden")).toBe(false)
  })
})
