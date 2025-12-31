import { ref } from "vue"
import { merge } from "../utils/utils"
import { isObject } from "../utils/check"
import { usePromise } from "./usePromise"

export type TransitionName = "fade" | "zoom-in" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right"

type Handler = (...args: any[]) => void
interface Options {
  name?: string
  duration?: number | string
  enterTimingFunction?: string
  leaveTimingFunction?: string
}

export function useTransition() {
  const options = ref<Options>({ name: "fade", duration: 300, enterTimingFunction: "ease-out", leaveTimingFunction: "ease-in" })
  const events = new Map()
  const inited = ref(false)
  const styles = ref<any>({})
  const classs = ref("")
  const status = ref("")
  const visible = ref(false)
  const enterPromise = ref(null)
  const transitionEnded = ref(false)
  const enterLifeCyclePromise = ref<any>(null)
  const leaveLifeCyclePromise = ref<any>(null)

  const on = (name: string, handler: Handler) => {
    const handlers = events.get(name)
    if (handlers) {
      handlers.push(handler)
    } else {
      events.set(name, [handler])
    }
  }

  const emit = (name: string, ...args: any[]) => {
    let handlers = events.get(name)
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === "function") handler(...args)
      })
    }

    handlers = events.get("*")
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === "function") handler(name, ...args)
      })
    }
  }

  const init = (initOptions: Options = {}) => {
    if (isObject(initOptions)) {
      options.value = merge(options.value, initOptions)
    }
  }

  const enter = () => {
    // 中止之前的Promise
    abortPromise()
    // 创建新的进入过渡Promise
    enterPromise.value = usePromise(async (resolve) => {
      try {
        // 获取过渡类名
        const names = classNames(options.value.name)
        // 设置状态为进入
        status.value = "enter"
        // 触发进入前事件
        emit("before-enter")
        // 设置进入时的过渡函数
        styles.value.transitionDuration = `${options.value.duration}ms`
        // 设置进入时的过渡函数
        styles.value.transitionTimingFunction = options.value.enterTimingFunction
        // 请求动画帧
        enterLifeCyclePromise.value = useRequestAnimationFrame()
        await enterLifeCyclePromise.value
        // 触发进入事件
        emit("enter")
        // 设置进入类名
        classs.value = names.enter
        // 再次请求动画帧
        enterLifeCyclePromise.value = useRequestAnimationFrame()
        await enterLifeCyclePromise.value
        // 标记组件已初始化
        inited.value = true
        // 设置组件可见
        visible.value = true
        // 第三次请求动画帧
        enterLifeCyclePromise.value = useRequestAnimationFrame()
        await enterLifeCyclePromise.value
        // 清除Promise
        enterLifeCyclePromise.value = null
        // 重置过渡结束标志
        transitionEnded.value = false
        // 设置进入完成类名
        classs.value = names["enter-to"]
        // 解析Promise
        resolve()
      } catch (error) {
        // 错误处理
      }
    })
  }
  const leave = async () => {
    // 如果没有进入过渡Promise，直接结束过渡
    if (!enterPromise.value) {
      transitionEnded.value = false
      return end()
    }
    try {
      // 等待进入过渡完成
      await enterPromise.value
      // 获取过渡类名
      const names = classNames(options.value.name)
      // 设置状态为离开
      status.value = "leave"
      // 触发离开前事件
      emit("before-leave")
      // 设置离开时的过渡函数
      styles.value.transitionTimingFunction = options.value.leaveTimingFunction
      // 请求动画帧
      leaveLifeCyclePromise.value = useRequestAnimationFrame()
      await leaveLifeCyclePromise.value
      // 触发离开事件
      emit("leave")
      // 设置离开类名
      classs.value = names.leave
      // 再次请求动画帧
      leaveLifeCyclePromise.value = useRequestAnimationFrame()
      await leaveLifeCyclePromise.value
      // 重置过渡结束标志
      transitionEnded.value = false
      // 设置离开完成类名
      classs.value = names["leave-to"]
      // 等待过渡持续时间
      leaveLifeCyclePromise.value = setPromise(+options.value.duration)
      await leaveLifeCyclePromise.value
      // 清除Promise
      leaveLifeCyclePromise.value = null
      // 触发过渡结束处理
      end()
      // 清除进入过渡Promise
      enterPromise.value = null
    } catch (error) {
      // 错误处理
    }
  }
  const end = () => {
    // 如果已经处理过过渡结束，则直接返回
    if (transitionEnded.value) return

    // 标记过渡已结束
    transitionEnded.value = true

    // 根据当前状态触发相应的事件
    if (status.value === "leave") {
      emit("after-leave")
      visible.value = false
    } else if (status.value === "enter") {
      emit("after-enter")
      visible.value = true
    }
  }

  const classNames = (name: string) => {
    return {
      enter: `ui-${name}-enter ui-${name}-enter-active`,
      "enter-to": `ui-${name}-enter-to ui-${name}-enter-active`,
      leave: `ui-${name}-leave ui-${name}-leave-active`,
      "leave-to": `ui-${name}-leave-to ui-${name}-leave-active`,
    }
  }

  const setPromise = (duration: number) => {
    return usePromise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve()
      }, duration)
    })
  }

  const abortPromise = () => {
    try {
      enterPromise.value?.abort()
      enterLifeCyclePromise.value?.abort()
      leaveLifeCyclePromise.value?.abort()
      enterPromise.value = null
      enterLifeCyclePromise.value = null
      leaveLifeCyclePromise.value = null
    } catch (error) {
      console.log(error)
    }
  }

  const useRequestAnimationFrame = (cb = () => {}) => {
    return usePromise((resolve) => {
      const timer = setInterval(() => {
        clearInterval(timer)
        resolve(true)
        cb()
      }, 1000 / 30)
    })
  }

  return { on, init, enter, leave, end, inited, styles, classs, visible }
}
