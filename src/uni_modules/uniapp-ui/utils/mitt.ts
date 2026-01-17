type Handler = (...args: any[]) => void

/**
 * 轻量级事件发布/订阅系统
 * 每个实例拥有独立的事件存储，避免多实例间的事件干扰
 */
export class Mitt {
  /** 实例级事件存储，确保各实例隔离 */
  private events = new Map<string, Handler[]>()
  private namespace: string

  constructor(name: string = "global") {
    this.namespace = name
  }

  /**
   * 生成带命名空间名称
   * @param name 事件名称
   */
  private name(name: string) {
    return `${this.namespace}.${name}`
  }

  /**
   * 初始化事件
   * @param list 事件列表
   */
  init(list: { [key: string]: Handler }) {
    if (list) {
      for (const key in list) {
        // 直接使用 key，on 方法内部会添加命名空间
        this.on(key, list[key])
      }
    }
  }

  // 设置命名空间
  setNamespace(name: string) {
    this.namespace = name
  }

  /**
   * 监听事件
   * @param name 事件名称
   * @param handler 事件处理函数
   */
  on(name: string, handler: Handler) {
    const eventName = this.name(name)
    const handlers = this.events.get(eventName)
    if (handlers) {
      handlers.push(handler)
    } else {
      this.events.set(eventName, [handler])
    }
  }

  /**
   * 监听事件，但仅触发一次，在第一次触发之后移除该监听器
   * @param name 事件名称
   * @param handler 事件处理函数
   */
  once(name: string, handler: Handler) {
    const eventName = this.name(name)
    const wrappedHandler = (...args: any[]) => {
      handler(...args)
      const handlers = this.events.get(eventName)
      handlers?.splice(handlers.indexOf(wrappedHandler) >>> 0, 1)
    }
    const handlers = this.events.get(eventName)
    if (handlers) {
      handlers.push(wrappedHandler)
    } else {
      this.events.set(eventName, [wrappedHandler])
    }
  }

  /**
   * 移除事件监听
   * @param name 事件名称
   * @param handler 事件处理函数，如果不传，则移除该事件名称的所有处理函数
   */
  off(name: string, handler?: Handler) {
    const eventName = this.name(name)
    const handlers = this.events.get(eventName)
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      } else {
        // 直接删除键以释放内存
        this.events.delete(eventName)
      }
    }
  }

  /**
   * 触发事件
   * @param name 事件名称
   * @param args 事件参数
   */
  emit(name: string, ...args: any[]) {
    const eventName = this.name(name)
    let handlers = this.events.get(eventName)
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === "function") handler(...args)
      })
    }

    // 支持通配符监听器（带命名空间）
    handlers = this.events.get(this.name("*"))
    if (handlers) {
      handlers.slice()?.forEach((handler: Handler) => {
        if (typeof handler === "function") handler(eventName, ...args)
      })
    }
  }

  /**
   * 清空事件
   * @param name 可选，指定事件名称前缀。不传则清空当前命名空间下所有事件
   */
  clear(name: string = "") {
    const prefix = name ? this.name(name) : `${this.namespace}.`
    for (const key of Array.from(this.events.keys())) {
      // 使用精确前缀匹配，避免误删其他命名空间的事件
      if (key.startsWith(prefix)) {
        this.events.delete(key)
      }
    }
  }
}

// 全局单例实例，用于跨组件通信
export const globalMitt = new Mitt()

export default Mitt
