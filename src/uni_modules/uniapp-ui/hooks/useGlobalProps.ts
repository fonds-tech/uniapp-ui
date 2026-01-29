import type { ExtractPropTypes } from "vue"
import { getGlobalProps } from "../utils/component"
import { getCurrentInstance } from "vue"

/**
 * Extract default values from Vue props definition
 * Only extracts primitive defaults (string, number, boolean)
 */
function extractDefaults(propsConfig: Record<string, any>): Record<string, any> {
  const defaults: Record<string, any> = {}

  for (const [key, config] of Object.entries(propsConfig)) {
    if (!config) continue

    // Skip array type shorthand like [Number, String]
    if (Array.isArray(config)) continue

    // Skip simple type like Boolean, String
    if (typeof config === "function") continue

    // Handle object config with default
    if (typeof config === "object" && "default" in config) {
      const defaultVal = config.default
      // Only extract primitive defaults
      const resolved = typeof defaultVal === "function" ? defaultVal() : defaultVal
      if (typeof resolved !== "object" || resolved === null) {
        defaults[key] = resolved
      }
    }
  }

  return defaults
}

/**
 * Merge component props with global config using Proxy
 *
 * Priority: User passed value > Global config > Original default
 *
 * @param name - Component name (without 'ui-' prefix)
 * @param props - Props object from defineProps
 * @param propsConfig - Props definition from index.ts
 */
export function useGlobalProps<T extends Record<string, any>>(name: string, props: T, propsConfig: Record<string, any>): T {
  const defaults = extractDefaults(propsConfig)
  const instance = getCurrentInstance()

  return new Proxy(props, {
    get(target, key: string) {
      if (typeof key !== "string") return Reflect.get(target, key)

      const currentValue = target[key]

      // Skip non-primitive values (objects, arrays, functions)
      if (typeof currentValue === "object" && currentValue !== null) {
        return currentValue
      }
      if (typeof currentValue === "function") {
        return currentValue
      }

      const globalConfig = getGlobalProps(name)
      const vnodeProps = instance?.vnode?.props as Record<string, unknown> | null | undefined
      const hasUserProp = vnodeProps ? Object.prototype.hasOwnProperty.call(vnodeProps, key) : null

      if (hasUserProp === false) {
        const globalValue = globalConfig[key]
        if (globalValue !== undefined) {
          return globalValue
        }
      }

      if (hasUserProp === true) {
        return currentValue
      }

      const defaultValue = defaults[key]

      // 如果 prop 有提取到的默认值，检查当前值是否等于默认值
      if (key in defaults) {
        // 只有当前值等于默认值时，才应用全局配置
        // 这表示用户没有显式传递该 prop
        if (currentValue === defaultValue) {
          const globalValue = globalConfig[key]
          if (globalValue !== undefined) {
            return globalValue
          }
        }
        return currentValue
      }

      // 对于没有默认值的 props（如 numericProp、String 等）
      // 如果当前值为 undefined，则尝试使用全局配置
      if (currentValue === undefined) {
        const globalValue = globalConfig[key]
        if (globalValue !== undefined) {
          return globalValue
        }
      }

      return currentValue
    },
  }) as T
}

/**
 * Create component props with built-in global config support
 *
 * This factory function binds component name and props config together,
 * so in the vue file you only need to call useProps(rawProps)
 *
 * @param name - Component name (without 'ui-' prefix)
 * @param propsConfig - Props definition object
 *
 * @example
 * ```ts
 * // index.ts
 * export const [switchProps, useSwitchProps] = createProps('switch', {
 *   size: makeNumericProp(''),
 *   disabled: Boolean,
 *   beforeChange: { type: Function },
 * })
 *
 * // component.vue
 * import { switchProps, useSwitchProps } from './index'
 *
 * const props = useSwitchProps(defineProps(switchProps))
 * ```
 */
export function createProps<T extends Record<string, any>>(name: string, propsConfig: T): [T, (rawProps: ExtractPropTypes<T>) => ExtractPropTypes<T>] {
  const useProps = (rawProps: ExtractPropTypes<T>): ExtractPropTypes<T> => {
    return useGlobalProps(name, rawProps as Record<string, any>, propsConfig) as ExtractPropTypes<T>
  }

  return [propsConfig, useProps]
}
