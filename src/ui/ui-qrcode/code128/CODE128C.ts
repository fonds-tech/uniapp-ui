// CODE128/CODE128C.ts
import type { Code128Options } from "./CODE128"
import CODE128 from "./CODE128"
import { C_CHARS, C_START_CHAR } from "./constants"

export default class CODE128C extends CODE128 {
  constructor(string: string, options: Code128Options = {}) {
    super(C_START_CHAR + string, options)
  }

  valid(): boolean {
    return new RegExp(`^${C_CHARS}+$`).test(this.data)
  }
}
