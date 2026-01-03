import type { ComponentInternalInstance } from "vue"

/**
 * 获取多元素位置信息
 * @param selector 元素的选择器
 * @param instance 调用组件实例
 * @returns Promise<UniApp.NodeInfo[]>
 */
export function useRects(selector: string, instance: ComponentInternalInstance): Promise<UniApp.NodeInfo[]> {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(instance)
      .selectAll(selector)
      .boundingClientRect((rect) => resolve(rect as UniApp.NodeInfo[]))
      .exec()
  })
}
