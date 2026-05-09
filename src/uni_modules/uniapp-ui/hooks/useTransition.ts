import { merge } from "../utils/utils"
import { isObject } from "../utils/check"
import { usePromise } from "./usePromise"
import { ref } from "vue"

// 单帧时长 (60fps ≈ 16ms)。多次 await 串联后浏览器有机会 paint 中间状态，
// 避免 Vue patch 把 enter / enter-to class 合并跳过 transition。
const FRAME = 16

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
   * 等待浏览器 paint 一帧，可被 abort
   */
  const pause = (ms: number = FRAME) => {
    return usePromise<void>((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve()
      }, ms)
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
   * 中止所有进行中的 Promise
   */
  const abortPromise = () => {
    try {
      enterPromise.value?.abort()
      lifeCyclePromise.value?.abort()
      enterPromise.value = null
      lifeCyclePromise.value = null
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
        emit("before-enter")

        // 多帧间隔确保浏览器分别 paint：起始 class → 元素插入 → enter-to
        lifeCyclePromise.value = pause()
        await lifeCyclePromise.value

        classs.value = names.enter
        styles.value = {
          transitionDuration: `${options.value.duration}ms`,
          transitionTimingFunction: options.value.enterTimingFunction!,
        }
        emit("enter")

        lifeCyclePromise.value = pause()
        await lifeCyclePromise.value

        inited.value = true
        visible.value = true

        lifeCyclePromise.value = pause()
        await lifeCyclePromise.value

        classs.value = names["enter-to"]
        lifeCyclePromise.value = null
        resolve()

        // 异步等 CSS transition 完成，再触发 after-enter；status 校验避免 leave 抢占后误触发
        const duration = Number(options.value.duration) || 300
        lifeCyclePromise.value = pause(duration)
        await lifeCyclePromise.value
        lifeCyclePromise.value = null
        if (status.value === "enter") end()
      } catch (error) {
        // 被 abort 时忽略
      }
    })
  }

  /**
   * 离开过渡。等待 enter 完成后再启动，避免半途中断引发跳变
   */
  const leave = async () => {
    if (!enterPromise.value) {
      transitionEnded.value = false
      return end()
    }
    try {
      // 等 enter 完整结束（含三段 pause + class 切换），再启动 leave
      await enterPromise.value
      if (!visible.value) return end()

      const names = classNames(options.value.name!)
      status.value = "leave"
      emit("before-leave")

      lifeCyclePromise.value = pause()
      await lifeCyclePromise.value

      // 设置离开时的过渡函数
      styles.value = {
        ...styles.value,
        transitionTimingFunction: options.value.leaveTimingFunction!,
      }
      classs.value = names.leave
      emit("leave")

      lifeCyclePromise.value = pause()
      await lifeCyclePromise.value

      transitionEnded.value = false
      classs.value = names["leave-to"]

      // 等 transition CSS 完成时长，再触发 end，避免提前 display:none 中断动画
      const duration = Number(options.value.duration) || 300
      lifeCyclePromise.value = pause(duration)
      await lifeCyclePromise.value

      lifeCyclePromise.value = null
      end()
      enterPromise.value = null
    } catch (error) {
      // 被 abort 时忽略
    }
  }

  /**
   * 过渡结束处理
   * 由 transitionend 事件或 hook 内部超时触发；
   * 模板里 `@transitionend` 直接绑此函数时，事件会冒泡——子节点（如 ui-button hover/active）的 transition 也会触发，
   * 必须过滤 target===currentTarget，否则 leave 中途被子组件 transitionend 提前 end()，元素立刻 display:none。
   */
  const end = (e?: Event) => {
    if (e && e.target !== e.currentTarget) return
    if (transitionEnded.value) return

    transitionEnded.value = true

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
