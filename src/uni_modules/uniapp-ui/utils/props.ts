import { ref } from "vue"

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
