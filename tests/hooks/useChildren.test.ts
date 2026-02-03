/**
 * useChildren 单元测试
 * 测试父子组件关联与索引计算
 */

import type { InjectionKey } from "vue"
import { mount } from "@vue/test-utils"
import { useParent } from "@/uni_modules/uniapp-ui/hooks/useParent"
import { useChildren } from "@/uni_modules/uniapp-ui/hooks/useChildren"
import { it, expect, describe } from "vitest"
import { nextTick, defineComponent } from "vue"

describe("useChildren", () => {
  const testKey: InjectionKey<any> = Symbol("test-key")

  const Child = defineComponent({
    name: "TestChild",
    setup() {
      const { parent, index } = useParent(testKey)
      return { parent, index }
    },
    template: "<div class=\"test-child\"></div>",
  })

  const Parent = defineComponent({
    name: "TestParent",
    components: { Child },
    setup() {
      const { childrens, linkChildren } = useChildren(testKey)
      linkChildren({ name: "parent" })
      return { childrens }
    },
    template: "<div><Child /><Child /></div>",
  })

  it("应正确收集子组件并计算索引", async () => {
    const wrapper = mount(Parent)
    await nextTick()

    const children = wrapper.findAllComponents(Child)
    expect(children.length).toBe(2)
    expect(wrapper.vm.childrens.length).toBe(2)
    expect(children[0].vm.index).toBe(0)
    expect(children[1].vm.index).toBe(1)
    expect(children[0].vm.parent).toBeTruthy()
  })
})
