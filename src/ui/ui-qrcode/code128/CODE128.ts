// CODE128/CODE128.ts
import Barcode from "./Barcode"
import { BARS, FNC1, STOP, SWAP, SET_A, SET_B, SHIFT, MODULO, SET_BY_CODE } from "./constants"

export interface Code128Options {
  ean128?: boolean | string
  text?: string
  [key: string]: any
}

export default class CODE128 extends Barcode {
  protected bytes: number[]

  constructor(data: string, options: Code128Options = {}) {
    super(data.substring(1), options)
    this.bytes = data.split("").map((char) => char.charCodeAt(0))
  }

  valid(): boolean {
    // 验证数据是否在允许的ASCII范围内
    // eslint-disable-next-line no-control-regex
    return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
  }

  encode(): { text: string; data: string } {
    const bytes = [...this.bytes] // 复制字节数组
    const startIndex = bytes.shift()! - 105 // 获取起始码索引
    const startSet = SET_BY_CODE[startIndex]

    if (startSet === undefined) {
      throw new RangeError("编码必须以起始字符开始")
    }

    // 处理EAN-128格式
    if (this.shouldEncodeAsEan128()) {
      bytes.unshift(FNC1)
    }

    const encodingResult = CODE128.next(bytes, 1, startSet)

    return {
      text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text,
      data: CODE128.getBar(startIndex) + encodingResult.result + CODE128.getBar((encodingResult.checksum + startIndex) % MODULO) + CODE128.getBar(STOP),
    }
  }

  // 判断是否需要编码为EAN-128格式
  protected shouldEncodeAsEan128(): boolean {
    let isEAN128 = this.options.ean128 || false
    if (typeof isEAN128 === "string") {
      isEAN128 = isEAN128.toLowerCase() === "true"
    }
    return isEAN128
  }

  // 根据索引获取条码模式
  static getBar(index: number): string {
    return BARS[index] || ""
  }

  // 根据编码集修正索引值
  static correctIndex(bytes: number[], set: number): number {
    if (set === SET_A) {
      const charCode = bytes.shift()!
      return charCode < 32 ? charCode + 64 : charCode - 32
    } else if (set === SET_B) {
      return bytes.shift()! - 32
    } else {
      // CODE128C 每两个数字编码为一个值
      return (bytes.shift()! - 48) * 10 + (bytes.shift()! - 48)
    }
  }

  // 递归编码处理
  static next(bytes: number[], pos: number, set: number): { result: string; checksum: number } {
    if (bytes.length === 0) {
      return { result: "", checksum: 0 }
    }

    let nextCode: { result: string; checksum: number }
    let index: number

    // 处理特殊字符（200及以上）
    if (bytes[0] >= 200) {
      index = bytes.shift()! - 105
      const nextSet = SWAP[index]

      if (nextSet !== undefined) {
        // 切换到其他编码集
        nextCode = CODE128.next(bytes, pos + 1, nextSet)
      } else {
        // 处理SHIFT字符（在A/B集之间临时切换）
        if ((set === SET_A || set === SET_B) && index === SHIFT) {
          bytes[0] = set === SET_A ? (bytes[0] > 95 ? bytes[0] - 96 : bytes[0]) : bytes[0] < 32 ? bytes[0] + 96 : bytes[0]
        }
        nextCode = CODE128.next(bytes, pos + 1, set)
      }
    } else {
      // 正常编码处理
      index = CODE128.correctIndex(bytes, set)
      nextCode = CODE128.next(bytes, pos + 1, set)
    }

    // 计算编码结果和校验和
    const enc = CODE128.getBar(index)
    const weight = index * pos

    return {
      result: enc + nextCode.result,
      checksum: weight + nextCode.checksum,
    }
  }
}
