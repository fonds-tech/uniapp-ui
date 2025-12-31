import type { Ref } from "vue"
import { ref, watch } from "vue"

/**
 * 节流值 Hook
 * 用于限制值的更新频率
 * @param value 需要节流的响应式值
 * @param delay 节流间隔（毫秒），默认 300ms
 * @returns 节流后的响应式值
 */
export function useThrottledValue<T>(value: Ref<T>, delay = 300): Ref<T> {
  const throttledValue = ref(value.value) as Ref<T>
  let lastUpdateTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(value, (newValue) => {
    const now = Date.now()
    const remaining = delay - (now - lastUpdateTime)

    if (remaining <= 0) {
      // 超过节流时间，立即更新
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      throttledValue.value = newValue
      lastUpdateTime = now
    } else if (!timer) {
      // 未到节流时间，设置定时器在剩余时间后更新
      timer = setTimeout(() => {
        throttledValue.value = value.value
        lastUpdateTime = Date.now()
        timer = null
      }, remaining)
    }
  })

  return throttledValue
}

/**
 * 节流函数 Hook
 * 用于创建节流函数，限制函数的调用频率
 * @param fn 需要节流的函数
 * @param delay 节流间隔（毫秒），默认 300ms
 * @param options 配置选项
 * @param options.leading 是否在节流开始时立即执行，默认 true
 * @param options.trailing 是否在节流结束后执行最后一次调用，默认 true
 * @returns 包含节流函数和取消方法的对象
 */
export function useThrottledFn<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
  options: { leading?: boolean; trailing?: boolean } = {},
): {
  run: (...args: Parameters<T>) => void
  cancel: () => void
} {
  const { leading = true, trailing = true } = options
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastCallTime = 0

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    lastArgs = null
    lastCallTime = 0
  }

  const invokeTrailing = () => {
    if (trailing && lastArgs) {
      fn(...lastArgs)
      lastArgs = null
      lastCallTime = Date.now()
      timer = setTimeout(invokeTrailing, delay)
    } else {
      timer = null
    }
  }

  const run = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = delay - (now - lastCallTime)

    lastArgs = args

    if (remaining <= 0 || remaining > delay) {
      // 首次调用或超过节流时间
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (leading || lastCallTime !== 0) {
        fn(...args)
        lastArgs = null
      }
      lastCallTime = now
      if (!timer && trailing) {
        timer = setTimeout(invokeTrailing, delay)
      }
    } else if (!timer && trailing) {
      // 设置尾部调用
      timer = setTimeout(invokeTrailing, remaining)
    }
  }

  return { run, cancel }
}
