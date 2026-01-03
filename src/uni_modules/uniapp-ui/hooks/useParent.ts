import type { InjectionKey, ComponentInternalInstance } from "vue"
import { ref, inject, computed, onUnmounted, getCurrentInstance } from "vue"

type ParentProvide<T> = T & {
  link: (child: ComponentInternalInstance) => void
  unlink: (child: ComponentInternalInstance) => void
  childrens: ComponentInternalInstance[]
}

/**
 * 用于获取父组件提供的数据和方法的自定义钩子函数
 * @param key 父组件提供数据的 InjectionKey
 * @returns 包含父组件提供数据和方法的对象
 */
export function useParent<T>(key: InjectionKey<ParentProvide<T>>) {
  const parent = inject(key, null)
  if (parent) {
    const instance = getCurrentInstance()!
    const { link, unlink, childrens } = parent

    link(instance)
    onUnmounted(() => unlink(instance))

    const index = computed(() => childrens.indexOf(instance))

    return { index, parent }
  }

  return { index: ref(-1), parent: null }
}
