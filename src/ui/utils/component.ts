/**
 * 组件默认值管理器
 */

const globalProps = reactive<Record<string, any>>({})

/**
 * 设置组件全局默认值
 * @param name 组件名称（不带 ui- 前缀）
 * @param defaults 默认值配置
 */
export function setGlobalProps(name: string, defaults: any) {
  globalProps[name] = { ...globalProps[name], ...defaults }
}

/**
 * 获取组件全局默认值
 * @param name 组件名称（不带 ui- 前缀）
 */
export function getGlobalProps(name: string) {
  return globalProps[name] || {}
}

/**
 * 初始化组件全局默认值配置
 * @param config 组件配置对象
 */
export function initGlobalProps(config: Record<string, any>) {
  Object.assign(globalProps, config)
}
