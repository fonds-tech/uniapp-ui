// Barcode.ts
export default abstract class Barcode {
  protected data: string
  protected options: any
  protected text: string

  constructor(data: string, options: any = {}) {
    this.data = data
    this.options = options
    this.text = options.text || data
  }

  abstract valid(): boolean
  abstract encode(): { text: string; data: string }
}
