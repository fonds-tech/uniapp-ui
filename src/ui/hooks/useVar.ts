/**
 * 使用 CSS 变量
 * @param name CSS 变量名称
 * @returns CSS 变量字符串
 */
export function useVar(name: string): string {
  return `var(--ui-${name})`
}
