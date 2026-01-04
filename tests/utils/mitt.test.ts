/**
 * Mitt 事件总线单元测试
 * 测试事件发布订阅、实例隔离、命名空间等功能
 */

import { Mitt } from "@/uni_modules/uniapp-ui/utils/mitt"
import { it, vi, expect, describe } from "vitest"

describe("mitt 事件总线", () => {
  describe("基础功能", () => {
    it("应能订阅和触发事件", () => {
      const mitt = new Mitt()
      const handler = vi.fn()

      mitt.on("test", handler)
      mitt.emit("test", "arg1", "arg2")

      expect(handler).toHaveBeenCalledWith("arg1", "arg2")
      expect(handler).toHaveBeenCalledTimes(1)
    })

    it("应能移除事件监听", () => {
      const mitt = new Mitt()
      const handler = vi.fn()

      mitt.on("test", handler)
      mitt.off("test", handler)
      mitt.emit("test")

      expect(handler).not.toHaveBeenCalled()
    })

    it("应能移除事件的所有监听", () => {
      const mitt = new Mitt()
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      mitt.on("test", handler1)
      mitt.on("test", handler2)
      mitt.off("test")
      mitt.emit("test")

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })

    it("once 应只触发一次", () => {
      const mitt = new Mitt()
      const handler = vi.fn()

      mitt.once("test", handler)
      mitt.emit("test")
      mitt.emit("test")

      expect(handler).toHaveBeenCalledTimes(1)
    })
  })

  describe("实例隔离", () => {
    it("不同实例的事件应相互隔离", () => {
      const mitt1 = new Mitt("instance1")
      const mitt2 = new Mitt("instance2")
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      mitt1.on("event", handler1)
      mitt2.on("event", handler2)

      mitt1.emit("event", "from1")
      mitt2.emit("event", "from2")

      expect(handler1).toHaveBeenCalledWith("from1")
      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledWith("from2")
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it("清除一个实例的事件不应影响其他实例", () => {
      const mitt1 = new Mitt("app")
      const mitt2 = new Mitt("app-v2")
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      mitt1.on("event", handler1)
      mitt2.on("event", handler2)

      mitt1.clear()

      mitt1.emit("event")
      mitt2.emit("event")

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalledTimes(1)
    })
  })

  describe("命名空间", () => {
    it("应正确处理命名空间", () => {
      const mitt = new Mitt("myNamespace")
      const handler = vi.fn()

      mitt.on("event", handler)
      mitt.emit("event", "data")

      expect(handler).toHaveBeenCalledWith("data")
    })

    it("init 方法不应重复拼接命名空间", () => {
      const mitt = new Mitt("ns")
      const handler = vi.fn()

      mitt.init({ event: handler })
      mitt.emit("event", "data")

      expect(handler).toHaveBeenCalledWith("data")
    })
  })

  describe("通配符监听器", () => {
    it("应支持通配符 * 监听所有事件", () => {
      const mitt = new Mitt()
      const wildcardHandler = vi.fn()

      mitt.on("*", wildcardHandler)
      mitt.emit("event1", "data1")
      mitt.emit("event2", "data2")

      expect(wildcardHandler).toHaveBeenCalledTimes(2)
    })
  })

  describe("clear 方法", () => {
    it("应精确清除指定前缀的事件", () => {
      const mitt = new Mitt("app")
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      mitt.on("event1", handler1)
      mitt.on("event2", handler2)

      mitt.clear("event1")

      mitt.emit("event1")
      mitt.emit("event2")

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it("无参数时应清除当前命名空间所有事件", () => {
      const mitt = new Mitt("app")
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      mitt.on("event1", handler1)
      mitt.on("event2", handler2)

      mitt.clear()

      mitt.emit("event1")
      mitt.emit("event2")

      expect(handler1).not.toHaveBeenCalled()
      expect(handler2).not.toHaveBeenCalled()
    })
  })
})
