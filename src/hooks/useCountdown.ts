import type { Ref } from "vue"
import { ref, computed, onUnmounted } from "vue"

interface UseCountdownOptions {
  /** 初始倒计时秒数 */
  initialSeconds: number
  /** 倒计时结束回调 */
  onFinish?: () => void
  /** 每次计时回调 */
  onTick?: (remaining: number) => void
  /** 是否自动开始，默认 false */
  autoStart?: boolean
}

interface UseCountdownReturn {
  /** 剩余秒数 */
  remaining: Ref<number>
  /** 是否正在倒计时 */
  isRunning: Ref<boolean>
  /** 是否已结束 */
  isFinished: Ref<boolean>
  /** 格式化时间（MM:SS） */
  formatted: Ref<string>
  /** 开始倒计时 */
  start: (seconds?: number) => void
  /** 暂停倒计时 */
  pause: () => void
  /** 恢复倒计时 */
  resume: () => void
  /** 重置倒计时 */
  reset: (seconds?: number) => void
  /** 停止并重置 */
  stop: () => void
}

/**
 * 倒计时 Hook
 * 用于验证码发送、活动倒计时等场景
 * @param options 配置选项
 * @returns 倒计时状态和控制方法
 */
export function useCountdown(options: UseCountdownOptions): UseCountdownReturn {
  const { initialSeconds, onFinish, onTick, autoStart = false } = options

  const remaining = ref(initialSeconds)
  const isRunning = ref(false)
  const isFinished = ref(false)
  let timer: ReturnType<typeof setInterval> | null = null

  // 格式化为 MM:SS
  const formatted = computed(() => {
    const minutes = Math.floor(remaining.value / 60)
    const seconds = remaining.value % 60
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
  })

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const tick = () => {
    if (remaining.value > 0) {
      remaining.value--
      onTick?.(remaining.value)

      if (remaining.value === 0) {
        clearTimer()
        isRunning.value = false
        isFinished.value = true
        onFinish?.()
      }
    }
  }

  const start = (seconds?: number) => {
    if (isRunning.value) return

    if (typeof seconds === "number") {
      remaining.value = seconds
    }

    if (remaining.value <= 0) {
      remaining.value = initialSeconds
    }

    isRunning.value = true
    isFinished.value = false
    clearTimer()
    timer = setInterval(tick, 1000)
  }

  const pause = () => {
    if (!isRunning.value) return
    clearTimer()
    isRunning.value = false
  }

  const resume = () => {
    if (isRunning.value || remaining.value <= 0) return
    isRunning.value = true
    timer = setInterval(tick, 1000)
  }

  const reset = (seconds?: number) => {
    clearTimer()
    remaining.value = seconds ?? initialSeconds
    isRunning.value = false
    isFinished.value = false
  }

  const stop = () => {
    clearTimer()
    remaining.value = initialSeconds
    isRunning.value = false
    isFinished.value = false
  }

  // 自动开始
  if (autoStart) {
    start()
  }

  // 组件卸载时清理定时器
  onUnmounted(() => {
    clearTimer()
  })

  return {
    remaining,
    isRunning,
    isFinished,
    formatted,
    start,
    pause,
    resume,
    reset,
    stop,
  }
}
