/** @type {import("prettier").Config} */
export default {
  semi: false, // 语句末尾不加分号
  tabWidth: 2, // 缩进占用两个空格
  useTabs: false, // 不使用制表符缩进，使用空格
  printWidth: 180, // 单行代码字符数限制，超过该字符数自动换行
  singleQuote: false, // 使用双引号而不是单引号
  endOfLine: "auto", // 结尾换行符自动识别
  arrowParens: "always", // 箭头函数参数始终包含括号
  trailingComma: "all", // 尽可能使用尾随逗号 (包括函数参数)
  bracketSpacing: true, // 对象字面量的大括号间有空格
}
