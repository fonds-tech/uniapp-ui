import { merge } from "../utils/utils"
import { isObject } from "../utils/check"
import { usePromise } from "./usePromise"
import { ref, nextTick } from "vue"

export type TransitionName = "fade" | "zoom-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right"

type Handler = (...args: any[]) => void
interface Options {
  name?: string
  duration?: number | string
  enterTimingFunction?: string
  leaveTimingFunction?: string
}

/**
 * 过渡动画状态机钩子
 * 提供进入/离开动画的状态管理和生命周期事件
 */
export function useTransition() {
  // 配置选项
  const options = ref<Options>({
    name: "fade",
    duration: 300,
    enterTimingFunction: "ease-out",
    leaveTimingFunction: "ease-in",
  })

  // 事件管理
  const events = new Map<string, Handler[]>()

  // 状态管理
  const inited = ref(false) // 是否已初始化渲染
  const styles = ref<Record<string, string>>({}) // 动态样式
  const classs = ref("") // 当前动画类名
  const status = ref<"" | "enter" | "leave">("") // 当前状态
  const visible = ref(false) // 是否可见
  const transitionEnded = ref(false) // 过渡是否已结束

  // Promise 管理（用于中断控制）
  const enterPromise = ref<ReturnType<typeof usePromise> | null>(null)
  const lifeCyclePromise = ref<ReturnType<typeof usePromise> | null>(null)
  const fallbackTimer = ref<ReturnType<typeof setTimeout> | null>(null)

  /**
   * 注册事件监听器
   */
  const on = (name: string, handler: Handler) => {
    const handlers = events.get(name)
    if (handlers) {
      handlers.push(handler)
    } else {
      events.set(name, [handler])
    }
  }

  /**
   * 触发事件
   */
  const emit = (name: string, ...args: any[]) => {
    const handlers = events.get(name)
    if (handlers) {
      handlers.slice().forEach((handler) => {
        if (typeof handler === "function") handler(...args)
      })
    }

    // 通配符监听器
    const wildcardHandlers = events.get("*")
    if (wildcardHandlers) {
      wildcardHandlers.slice().forEach((handler) => {
        if (typeof handler === "function") handler(name, ...args)
      })
    }
  }

  /**
   * 初始化配置
   */
  const init = (initOptions: Options = {}) => {
    if (isObject(initOptions)) {
      // 过滤掉 undefined 值，避免覆盖默认配置
      const filtered: Options = {}
      for (const key in initOptions) {
        const value = initOptions[key as keyof Options]
        if (value !== undefined) {
          ;(filtered as Record<string, unknown>)[key] = value
        }
      }
      options.value = merge(options.value, filtered)
    }
  }

  /**
   * 请求下一帧渲染
   * 使用 nextTick + setTimeout(0) 确保浏览器完成当前帧渲染
   */
  const requestNextFrame = () => {
    return usePromise<void>((resolve) => {
      nextTick(() => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, 0)
      })
    })
  }

  /**
   * 生成动画类名
   */
  const classNames = (name: string) => {
    return {
      enter: `ui-${name}-enter ui-${name}-enter-active`,
      "enter-to": `ui-${name}-enter-to ui-${name}-enter-active`,
      leave: `ui-${name}-leave ui-${name}-leave-active`,
      "leave-to": `ui-${name}-leave-to ui-${name}-leave-active`,
    }
  }

  /**
   * 中止所有进行中的 Promise 和定时器
   */
  const abortPromise = () => {
    try {
      enterPromise.value?.abort()
      lifeCyclePromise.value?.abort()
      enterPromise.value = null
      lifeCyclePromise.value = null

      // 清除降级定时器
      if (fallbackTimer.value) {
        clearTimeout(fallbackTimer.value)
        fallbackTimer.value = null
      }
    } catch (error) {
      // 忽略中止错误
    }
  }

  /**
   * 进入过渡
   * 支持从任何状态（包括离开中）切换到进入状态
   */
  const enter = () => {
    // 中止之前的过渡（包括正在进行的离开动画）
    abortPromise()

    // 重置过渡结束标志
    transitionEnded.value = false

    enterPromise.value = usePromise(async (resolve) => {
      try {
        const names = classNames(options.value.name!)
        status.value = "enter"

        // 触发进入前事件
        emit("before-enter")

        // 设置过渡样式
        styles.value = {
          transitionDuration: `${options.value.duration}ms`,
          transitionTimingFunction: options.value.enterTimingFunction!,
        }

        // 设置初始状态类名
        classs.value = names.enter

        // 标记已初始化并显示
        inited.value = true
        visible.value = true

        // 触发进入事件
        emit("enter")

        // 等待一帧确保初始状态渲染
        lifeCyclePromise.value = requestNextFrame()
        await lifeCyclePromise.value

        // 切换到结束状态类名，触发 CSS transition
        classs.value = names["enter-to"]

        lifeCyclePromise.value = null
        resolve()
      } catch (error) {
        // 被 abort 时忽略
      }
    })
  }

  /**
   * 离开过渡
   */
  const leave = async () => {
    // 中止之前的过渡
    abortPromise()

    // 重置过渡结束标志
    transitionEnded.value = false

    // 如果尚未显示，直接结束
    if (!visible.value) {
      return end()
    }

    try {
      const names = classNames(options.value.name!)
      status.value = "leave"

      // 触发离开前事件
      emit("before-leave")

      // 设置离开时的过渡函数
      styles.value = {
        ...styles.value,
        transitionTimingFunction: options.value.leaveTimingFunction!,
      }

      // 触发离开事件
      emit("leave")

      // 设置离开初始类名
      classs.value = names.leave

      // 等待一帧确保初始状态渲染
      lifeCyclePromise.value = requestNextFrame()
      await lifeCyclePromise.value

      // 切换到离开结束状态
      classs.value = names["leave-to"]

      // 设置降级定时器：如果 transitionend 事件未触发，使用超时兜底
      const duration = Number(options.value.duration) || 300
      fallbackTimer.value = setTimeout(() => {
        fallbackTimer.value = null
        end()
      }, duration + 50)

      lifeCyclePromise.value = null
    } catch (error) {
      // 被 abort 时忽略
    }
  }

  /**
   * 过渡结束处理
   * 由 transitionend 事件或降级定时器触发
   */
  const end = () => {
    // 防止重复处理
    if (transitionEnded.value) return

    transitionEnded.value = true

    // 清除降级定时器（如果是由 transitionend 触发）
    if (fallbackTimer.value) {
      clearTimeout(fallbackTimer.value)
      fallbackTimer.value = null
    }

    // 根据当前状态触发相应事件
    if (status.value === "leave") {
      emit("after-leave")
      visible.value = false
    } else if (status.value === "enter") {
      emit("after-enter")
      visible.value = true
    }
  }

  return {
    on,
    init,
    enter,
    leave,
    end,
    inited,
    styles,
    classs,
    visible,
    status, // 导出 status 供组件使用
  }
}
