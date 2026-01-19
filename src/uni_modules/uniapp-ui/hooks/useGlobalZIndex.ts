let globalZIndex = 999

/**
 * 获取全局z-index
 * @returns 全局z-index
 */
export function useGlobalZIndex() {
  return ++globalZIndex
}
