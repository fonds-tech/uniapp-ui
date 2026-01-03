import { isEmpty, isObject, isString } from "../utils/check"

/**
 * 根据指定的类型将样式转换为对象或字符串
 * @param style 样式对象或字符串
 * @param type 目标类型 "object" | "string"
 * @returns 转换后的样式
 */
export function useStyle(style: any, type: string = "object"): any {
  if (isEmpty(style) || (isObject(style) && type === "object") || (isString(style) && type === "string")) {
    if (isObject(style)) {
      for (const key in style) {
        if (isEmpty(style[key]) && style[key] !== 0) delete style[key]
      }
    }
    return style
  }

  if (type === "object") {
    style = style.trim()
    const styleArray = style.split(";")
    const styleObject: any = {}
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(":")
        // 确保属性名和属性值都存在
        if (item[0] && item[1]) {
          styleObject[item[0].trim()] = item[1].trim()
        }
      }
    }
    return styleObject
  }

  let string = ""
  for (const key in style) {
    const newKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
    string += `${newKey}:${style[key]};`
  }
  return string.trim()
}
