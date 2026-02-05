import type { ComputedRef, InjectionKey, ComponentInternalInstance } from "vue"
import { ref, inject, computed, onUnmounted, getCurrentInstance } from "vue"

/** 父组件 provide 的基础类型（由 useChildren 自动添加） */
export type ParentProvide<T> = T & {
  link: (child: ComponentInternalInstance) => void
  unlink: (child: ComponentInternalInstance) => void
  childrens: ComponentInternalInstance[]
}

/** useParent 的返回类型 */
export interface UseParentReturn<T> {
  index: ComputedRef<number>
  parent: ParentProvide<T> | null
}

/**
 * 用于获取父组件提供的数据和方法的自定义钩子函数
 * @param key 父组件提供数据的 InjectionKey（useChildren 会自动添加 link/unlink/childrens）
 * @returns 包含父组件提供数据和方法的对象
 *
 * @example
 * const { parent, index } = useParent(FORM_KEY)
 * if (parent) {
 *   // 安全地使用 parent
 *   parent.validate()
 * }
 */
export function useParent<T>(key: InjectionKey<T>): UseParentReturn<T> {
  // inject 获取的实际类型是 ParentProvide<T>，因为 useChildren 会添加 link/unlink/childrens
  const parent = inject(key, null) as ParentProvide<T> | null

  if (parent) {
    // 获取当前组件实例，添加空值检查
    const instance = getCurrentInstance()

    if (!instance) {
      console.warn("[useParent] 必须在 setup() 函数内部调用")
      return {
        index: ref(-1) as unknown as ComputedRef<number>,
        parent: null,
      }
    }

    const { link, unlink, childrens } = parent

    link(instance)
    onUnmounted(() => unlink(instance))

    const index = computed(() => childrens.indexOf(instance))

    return { index, parent }
  }

  return {
    index: ref(-1) as unknown as ComputedRef<number>,
    parent: null,
  }
}
