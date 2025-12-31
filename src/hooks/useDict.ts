export function useSexDict(sex: string) {
  const dict = { "1": "男", "2": "女", default: "未知" }
  return dict[sex] || dict.default
}

export function useIsDict(is: string) {
  const dict = { "1": "是", "2": "否" }
  return dict[is]
}
