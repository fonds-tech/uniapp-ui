import type { InjectionKey, ComponentPublicInstance, ComponentInternalInstance } from "vue"
import { provide, reactive, onMounted } from "vue"

/**
 * 用于管理子组件的数据和方法的自定义钩子函数
 * @param key 提供数据的 InjectionKey
 * @returns 包含子组件数据和方法的对象
 */
export function useChildren<Child extends ComponentInternalInstance, ProvideValue = never>(key: InjectionKey<ProvideValue>) {
  const childrens: ComponentInternalInstance[] = reactive([])
  const publicChildrens: ComponentPublicInstance[] = reactive([])

  const linkChildren = (value?: any) => {
    const link = (child: ComponentInternalInstance) => {
      if (child.proxy) {
        childrens.push(child as Child)
        publicChildrens.push(child.proxy)
      }
    }

    const unlink = (child: ComponentInternalInstance) => {
      const index = childrens.indexOf(child)
      publicChildrens.splice(index, 1)
      childrens.splice(index, 1)
    }

    // #ifdef MP-TOUTIAO
    onMounted(() => {
      provide(key, Object.assign({ link, unlink, childrens }, value))
    })
    // #endif
    // #ifndef MP-TOUTIAO
    provide(key, Object.assign({ link, unlink, childrens }, value))
    // #endif
  }

  return { childrens, linkChildren }
}
