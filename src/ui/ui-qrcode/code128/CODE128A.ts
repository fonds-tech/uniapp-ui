// CODE128/CODE128A.ts
import type { Code128Options } from "./CODE128"
import CODE128 from "./CODE128"
import { A_CHARS, A_START_CHAR } from "./constants"

export default class CODE128A extends CODE128 {
  constructor(string: string, options: Code128Options = {}) {
    super(A_START_CHAR + string, options)
  }

  valid(): boolean {
    return new RegExp(`^${A_CHARS}+$`).test(this.data)
  }
}
