import { isArray, isPlainObject } from "./check"

/**
 * 可合并的值类型
 */
type MergeableValue = Record<string, unknown> | unknown[]

/**
 * 深度合并多个对象或数组到目标（会修改目标）
 * @description 仿照 lodash.merge 实现，将从第二个参数开始的所有对象/数组深度合并到第一个参数中
 *
 * 特性：
 * - 递归合并普通对象和数组
 * - 数组按索引进行递归合并，而非简单替换
 * - 如果源属性值为 undefined 且目标值存在，则跳过
 * - 其他类型直接覆盖
 * - 从左到右依次合并，后面的源会覆盖前面的
 *
 * @param target - 目标对象或数组，合并结果会直接修改此目标
 * @param sources - 需要合并的源对象/数组列表
 * @returns 返回修改后的目标
 *
 * @example
 * ```ts
 * // 对象合并
 * const target = { a: 1, b: { c: 2 } };
 * merge(target, { b: { d: 3 }, e: 4 });
 * // target → { a: 1, b: { c: 2, d: 3 }, e: 4 }
 *
 * // 数组按索引合并
 * const obj = { a: [{ b: 2 }, { d: 4 }] };
 * merge(obj, { a: [{ c: 3 }, { e: 5 }] });
 * // obj → { a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] }
 *
 * // 直接合并数组
 * const arr = [{ a: 1 }, { b: 2 }];
 * merge(arr, [{ c: 3 }, { d: 4 }]);
 * // arr → [{ a: 1, c: 3 }, { b: 2, d: 4 }]
 * ```
 */
export function merge<T extends MergeableValue>(target: T, ...sources: Array<MergeableValue | undefined | null>): T {
  // 判断是否为可合并类型（普通对象或数组）
  const isMergeable = (val: unknown): val is MergeableValue => isPlainObject(val) || isArray(val)

  // 内部递归合并
  const baseMerge = (t: MergeableValue, s: MergeableValue): void => {
    const keys = isArray(s) ? s.map((_, i) => String(i)) : Object.keys(s)

    for (const key of keys) {
      const srcVal = isArray(s) ? s[Number(key)] : (s as Record<string, unknown>)[key]
      const tgtVal = isArray(t) ? t[Number(key)] : (t as Record<string, unknown>)[key]
      const hasKey = isArray(t) ? Number(key) < t.length : key in t

      // 源值为 undefined 且目标值已存在，跳过
      if (srcVal === undefined && hasKey) continue

      if (isMergeable(srcVal)) {
        const mergeTarget = isMergeable(tgtVal) ? tgtVal : isArray(srcVal) ? [] : ({} as Record<string, unknown>)

        // 设置值并递归
        if (isArray(t)) {
          t[Number(key)] = mergeTarget
        } else {
          ;(t as Record<string, unknown>)[key] = mergeTarget
        }
        baseMerge(mergeTarget, srcVal)
      } else {
        // 直接赋值
        if (isArray(t)) {
          t[Number(key)] = srcVal
        } else {
          ;(t as Record<string, unknown>)[key] = srcVal
        }
      }
    }
  }

  // 遍历所有源对象进行合并
  for (const source of sources) {
    if (source != null) {
      baseMerge(target, source)
    }
  }

  return target
}
