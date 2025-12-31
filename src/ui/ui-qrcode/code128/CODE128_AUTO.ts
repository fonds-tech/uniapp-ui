// CODE128/CODE128_AUTO.ts
import type { Code128Options } from "./CODE128"
import CODE128 from "./CODE128"
import { autoSelectModes } from "./auto"

export default class CODE128AUTO extends CODE128 {
  constructor(data: string, options: Code128Options = {}) {
    // 验证数据是否在允许范围内
    // eslint-disable-next-line no-control-regex
    if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
      super(autoSelectModes(data), options)
    } else {
      super(data, options)
    }
  }
}
