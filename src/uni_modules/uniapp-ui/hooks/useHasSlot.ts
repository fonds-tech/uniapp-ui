import { computed, useSlots } from "vue"

/**
 * 跨端检测具名 slot 是否真有内容（H5 / MP 小程序 / App 通用）
 *
 * 不能用 `!!slots.xxx` —— MP 编译期 slot 函数静态注册，函数引用永远 truthy，
 * 即使父组件用 `<template v-if="false" #x>` 也无法卸载。
 *
 * 必须调 slot 函数拿 VNode 数组，过滤 Comment / Fragment / Static 等占位节点：
 * - 真实节点（HTML 标签 / 组件）：`typeof type` 为 `"string"` / `"object"` / `"function"`
 * - Text VNode（纯文本 slot）：`type` 为 Symbol，`children` 为字符串
 * - Fragment（v-for 包裹）：`type` 为 Symbol，`children` 为数组，递归
 * - Comment / Static 占位：`type` 为 Symbol，`children` 既非数组也非字符串
 *
 * @param name slot 名（默认 slot 传 "default"）
 * @returns ComputedRef<boolean>
 *
 * @example
 * const hasFooter = useHasSlot("footer")
 * // template: <view v-if="hasFooter">...</view>
 */
export function useHasSlot(name: string) {
  const slots = useSlots()
  return computed(() => {
    const fn = slots[name]
    if (typeof fn !== "function") return false
    const check = (nodes: any): boolean =>
      Array.isArray(nodes) &&
      nodes.some((n) => {
        if (typeof n.type !== "symbol") return true
        if (typeof n.children === "string") return n.children.trim() !== ""
        return Array.isArray(n.children) && check(n.children)
      })
    return check(fn())
  })
}
