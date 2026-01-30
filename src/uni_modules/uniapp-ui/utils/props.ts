import type { PropType } from "vue"
import { ref } from "vue"

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
 * 说明：项目已移除"全局 props 默认值注入/合并"能力，因此也不存在需要在此处兼容的历史逻辑。
 *
 * @param _name 组件名称（现已不使用）
 * @param props props 配置对象
 * @returns 原样返回 props
 */
export function buildProps<T extends Record<string, any>>(_name: string, props: T): T {
  return props
}

// ==================== 全局 Props 配置 ====================

/**
 * 全局 Props 配置存储（响应式）
 */
const globalPropsConfig = ref<Record<string, Record<string, any>>>({})

/**
 * 设置单个组件的全局 Props
 * @param name 组件名称
 * @param props 组件的 props 配置对象
 *
 * @example
 * ```typescript
 * setGlobalProps('button', {
 *   type: 'primary',
 *   size: 'large'
 * })
 * ```
 */
export function setGlobalProps(name: string, props: Record<string, any>) {
  globalPropsConfig.value[name] = props
}

/**
 * 解析全局组件 Props（自动合并默认值）
 * @param name 组件名称
 * @param defaults 组件默认值
 * @returns 合并后的配置对象（全局配置 > 默认值）
 *
 * @example
 * ```typescript
 * const buttonDefaults = { type: 'primary', size: 'normal' }
 * const defaultProps = resolveGlobalProps('button', buttonDefaults)
 *
 * export const buttonProps = {
 *   type: {
 *     type: String,
 *     default: defaultProps.type  // 'large' (如果全局配置了) 或 'primary'
 *   }
 * }
 * ```
 */
export function resolveGlobalProps<T extends Record<string, any>>(name: string, defaults: T): T {
  const global = globalPropsConfig.value[name] || {}
  return { ...defaults, ...global }
}

/**
 * 初始化全局 Props 配置（通常在 app.use 时调用）
 * @param config 配置对象
 *
 * @example
 * ```typescript
 * initGlobalProps({
 *   button: { size: 'large', type: 'primary' },
 *   input: { clearable: true }
 * })
 * ```
 */
export function initGlobalProps(config: Record<string, Record<string, any>>) {
  globalPropsConfig.value = { ...globalPropsConfig.value, ...config }
}

/**
 * 合并单个组件的全局配置
 * @param name 组件名称
 * @param props 要合并的配置
 *
 * @example
 * ```typescript
 * mergeGlobalProps('button', { size: 'small' })
 * ```
 */
export function mergeGlobalProps(name: string, props: Record<string, any>) {
  globalPropsConfig.value[name] = {
    ...globalPropsConfig.value[name],
    ...props,
  }
}

/**
 * 获取原始全局配置（不合并默认值）
 * @param name 组件名称
 * @returns 全局配置对象
 */
export function getRawGlobalProps(name: string): Record<string, any> {
  return globalPropsConfig.value[name] || {}
}

/**
 * 重置全局配置
 */
export function resetGlobalProps() {
  globalPropsConfig.value = {}
}

/**
 * 创建组件 Props 默认值辅助函数
 * @param componentName 组件名称
 * @param defaultValues 组件默认值对象
 * @returns withDefault 辅助函数
 *
 * @example
 * ```typescript
 * const withDefault = createDefaultsHelper("button", {
 *   type: "primary",
 *   size: "normal",
 *   color: undefined,
 * })
 *
 * export const buttonProps = {
 *   type: withDefault("type", { type: String as PropType<ButtonType> }),
 *   size: withDefault("size", { type: String as PropType<ButtonSize> }),
 *   color: withDefault("color", { type: String }),
 * }
 * ```
 */
export function buildDefaultProps<const T extends Record<string, any>>(componentName: string, defaultValues: T) {
  const resolved = resolveGlobalProps(componentName, defaultValues)

  return function withDefault<K extends keyof T, P extends object>(key: K, propDef: P): P & { default: T[K] } {
    return { ...propDef, default: resolved[key] }
  }
}
