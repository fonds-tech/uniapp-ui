/**
 * 获取当前路由信息
 * @returns 当前路由对象
 */
export function useCurrentRouter() {
  const routes = getCurrentPages()
  return routes[routes.length - 1]
}
