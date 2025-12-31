import type { Ref } from "vue"
import { ref, watch } from "vue"

/**
 * 防抖值 Hook
 * 用于延迟更新值，避免频繁触发（如搜索输入）
 * @param value 需要防抖的响应式值
 * @param delay 延迟时间（毫秒），默认 300ms
 * @returns 防抖后的响应式值
 */
export function useDebouncedValue<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(value, (newValue) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue
}

/**
 * 防抖函数 Hook
 * 用于创建防抖函数，避免函数被频繁调用
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒），默认 300ms
 * @returns 包含防抖函数和取消方法的对象
 */
export function useDebouncedFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
): {
  run: (...args: Parameters<T>) => void
  cancel: () => void
  flush: (...args: Parameters<T>) => void
} {
  let timer: ReturnType<typeof setTimeout> | null = null
  let pendingArgs: Parameters<T> | null = null

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    pendingArgs = null
  }

  const run = (...args: Parameters<T>) => {
    cancel()
    pendingArgs = args
    timer = setTimeout(() => {
      fn(...args)
      pendingArgs = null
    }, delay)
  }

  // 立即执行（如果有待执行的调用）
  const flush = (...args: Parameters<T>) => {
    cancel()
    fn(...(pendingArgs ?? args))
  }

  return { run, cancel, flush }
}
