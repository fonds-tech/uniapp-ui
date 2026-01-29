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
 * @deprecated 已废弃：直接导出 props 定义对象即可，不再需要任何包装。
 *
 * 说明：项目已移除“全局 props 默认值注入/合并”能力，因此也不存在需要在此处兼容的历史逻辑。
 *
 * @param _name 组件名称（现已不使用）
 * @param props props 配置对象
 * @returns 原样返回 props
 */
export function buildProps<T extends Record<string, any>>(_name: string, props: T): T {
  return props
}
