# UiRadioGroup 组件

## 介绍

UiRadioGroup 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-radio-group />
</template>
```

## Props

| 参数              | 说明               | 类型             | 默认值    | 可选值 |
| ----------------- | ------------------ | ---------------- | --------- | ------ |
| modelValue        | 绑定值             | string \| number | ""        | -      |
| max               | 最大可选数量       | number \| string | Infinity  | -      |
| gap               | 复选框之间的间距   | number \| string | 0         | -      |
| disabled          | 是否禁用           | boolean          | false     | -      |
| vertical          | 是否垂直布局       | boolean          | false     | -      |
| icon              | 图标名称           | string           | ""        | -      |
| shape             | 形状，icon 或 dot  | string           | "icon"    | -      |
| round             | 是否圆形图标       | boolean          | true      | -      |
| checkedColor      | 选中的颜色         | string           | ""        | -      |
| iconSize          | 图标大小           | number \| string | "28rpx"   | -      |
| iconColor         | 图标颜色           | string           | "#BFBFBF" | -      |
| iconWeight        | 图标粗细           | number \| string | ""        | -      |
| iconRadius        | 图标圆角值         | number \| string | ""        | -      |
| labelSize         | 标签文本大小       | number \| string | ""        | -      |
| labelColor        | 标签文本颜色       | string           | ""        | -      |
| labelWeight       | 标签文本粗细       | number \| string | ""        | -      |
| labelGap          | 标签与图标的间距   | string \| number | ""        | -      |
| labelLeft         | 标签是否在图标左侧 | boolean          | false     | -      |
| labelDisabled     | 是否禁用标签点击   | boolean          | -         | -      |
| checkedIconColor  | 选中的图标颜色     | string           | "primary" | -      |
| checkedLabelColor | 选中的标签颜色     | string           | ""        | -      |
| customClass       | 自定义类名         | string           | ""        | -      |
| customStyle       | 自定义样式         | string \| object | ""        | -      |

## Events

| 事件名 | 说明 | 回调参数                |
| ------ | ---- | ----------------------- |
| click  | -    | -                       |
| change | -    | value: string \| number |
| update | -    | value: string \| number |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
