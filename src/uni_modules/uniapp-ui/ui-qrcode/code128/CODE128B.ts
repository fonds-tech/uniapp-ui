// CODE128/CODE128B.ts
import type { Code128Options } from "./CODE128"
import CODE128 from "./CODE128"
import { B_CHARS, B_START_CHAR } from "./constants"

export default class CODE128B extends CODE128 {
  constructor(string: string, options: Code128Options = {}) {
    super(B_START_CHAR + string, options)
  }

  valid(): boolean {
    return new RegExp(`^${B_CHARS}+$`).test(this.data)
  }
}
