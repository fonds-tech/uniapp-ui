import type { PropType } from "vue"
import { getGlobalProps } from "./component"

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const,
}

export function makeRequiredProp<T>(type: T) {
  return {
    type,
    required: true as const,
  }
}

export function makeArrayProp<T>() {
  return {
    type: Array as PropType<T[]>,
    default: () => [],
  }
}

export function makeNumberProp<T>(defaultVal: T) {
  return {
    type: Number,
    default: defaultVal,
  }
}

export function makeNumericProp<T>(defaultVal: T) {
  return {
    type: numericProp,
    default: defaultVal,
  }
}

export function makeStringProp<T>(defaultVal: T) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultVal,
  }
}

export function makeObjectProp<T>() {
  return {
    type: Object as PropType<T>,
    default: () => ({}) as T,
  }
}

export function makeFunctionProp<T extends (...args: any[]) => any>(defaultVal?: T) {
  return {
    type: Function as PropType<T>,
    default: defaultVal,
  }
}

export const styleProp = {
  type: [String, Object] as PropType<string | import("vue").CSSProperties>,
  default: "",
}

/**
 * 构建带全局默认值的 props 定义
 * 优先级: 用户传入值 > 全局配置 > 组件默认值
 *
 * @param name 组件名称(不带 ui- 前缀)
 * @param props props 配置对象
 * @returns props 定义对象,支持全局配置
 */
export function buildProps<T extends Record<string, any>>(name: string, props: T): T {
  const result = {} as T

  Object.keys(props).forEach((key) => {
    const config = props[key]

    // 标准化配置：将简写形式转换为对象形式
    // Boolean → { type: Boolean }
    // [Number, String] → { type: [Number, String] }
    const normalized =
      typeof config === "function" || Array.isArray(config) ? { type: config } : config

    // 非对象配置，直接使用
    if (!normalized || typeof normalized !== "object") {
      result[key as keyof T] = config as T[keyof T]
      return
    }

    // 统一包装 default 以支持全局配置
    // Vue 的 Boolean casting 发生在属性解析阶段，与 default 是否为函数无关
    const originalDefault = normalized.default
    result[key as keyof T] = {
      ...normalized,
      default: () => {
        const globalConfig = getGlobalProps(name)
        const globalValue = globalConfig[key]

        // 优先使用全局配置
        if (globalValue !== undefined) {
          return globalValue
        }

        // 其次使用组件默认值
        return typeof originalDefault === "function" ? originalDefault() : originalDefault
      },
    } as T[keyof T]
  })

  return result
}
