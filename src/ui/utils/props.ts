import type { PropType } from "vue"

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
 * 构建组件 props 定义
 *
 * @deprecated 此函数现在仅作为直接传递使用，全局配置功能已迁移到 useGlobalProps hook
 *
 * 新的推荐方式:
 * ```ts
 * // index.ts - 定义 props（不需要 buildProps 包装）
 * export const switchProps = {
 *   size: makeNumericProp(''),
 *   disabled: Boolean,
 * }
 *
 * // component.vue - 使用 useGlobalProps 合并全局配置
 * import { switchProps } from './index'
 * import { useGlobalProps } from '../hooks'
 *
 * const rawProps = defineProps(switchProps)
 * const props = useGlobalProps('switch', rawProps, switchProps)
 * ```
 *
 * @param _name 组件名称（现已不使用）
 * @param props props 配置对象
 * @returns 原样返回 props
 */
export function buildProps<T extends Record<string, any>>(_name: string, props: T): T {
  return props
}
