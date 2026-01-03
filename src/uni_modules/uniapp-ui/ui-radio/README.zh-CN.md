# UiRadio 组件

## 介绍

UiRadio 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-radio />
</template>
```

## Props

| 参数              | 说明                                 | 类型             | 默认值    | 可选值 |
| ----------------- | ------------------------------------ | ---------------- | --------- | ------ |
| name              | 标识符，通常为一个唯一的字符串或数字 | number \| string | ""        | -      |
| label             | 标签文本内容                         | number \| string | ""        | -      |
| disabled          | 是否禁用                             | boolean          | false     | -      |
| icon              | 图标名称                             | string           | "check"   | -      |
| shape             | 形状，icon 或 dot                    | string           | "dot"     | -      |
| round             | 是否圆形图标                         | boolean          | true      | -      |
| checkedColor      | 选中的颜色                           | string           | ""        | -      |
| iconSize          | 图标大小                             | number \| string | ""        | -      |
| iconColor         | 图标颜色                             | string           | ""        | -      |
| iconWeight        | 图标粗细                             | number \| string | ""        | -      |
| iconRadius        | 图标圆角值                           | number \| string | ""        | -      |
| labelSize         | 标签文本大小                         | number \| string | ""        | -      |
| labelColor        | 标签文本颜色                         | string           | ""        | -      |
| labelWeight       | 标签文本粗细                         | number \| string | ""        | -      |
| labelGap          | 标签文本与图标的间距                 | string \| number | ""        | -      |
| labelLeft         | 标签文本是否在图标左侧               | boolean          | false     | -      |
| labelDisabled     | 是否禁用标签文本点击                 | boolean          | -         | -      |
| checkedIconColor  | 选中时的图标颜色                     | string           | "primary" | -      |
| checkedLabelColor | 选中时的标签文本颜色                 | string           | ""        | -      |
| customClass       | 自定义类名                           | string           | ""        | -      |
| customStyle       | 自定义样式                           | string \| object | ""        | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| icon    | -    |
