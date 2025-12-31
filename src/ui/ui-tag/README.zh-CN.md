# UiTag 组件

## 介绍

UiTag 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-tag />
</template>
```

## Props

| 参数         | 说明             | 类型             | 默认值    | 可选值                                 |
| ------------ | ---------------- | ---------------- | --------- | -------------------------------------- |
| show         | 是否显示         | boolean          | true      | -                                      |
| type         | 主题类型         | string           | "primary" | primary, success, warning, danger, info |
| text         | 标签的文字内容   | string           | ""        | -                                      |
| textSize     | 标签的文字大小   | string \| number | ""        | -                                      |
| textColor    | 标签的文字颜色   | string           | ""        | -                                      |
| textWeight   | 标签的文字粗细   | string \| number | ""        | -                                      |
| icon         | 图标名称         | string           | ""        | -                                      |
| iconSize     | 图标大小         | string \| number | ""        | -                                      |
| iconColor    | 图标颜色         | string           | ""        | -                                      |
| iconWeight   | 图标粗细         | string \| number | ""        | -                                      |
| round        | 是否圆形的       | boolean          | false     | -                                      |
| plain        | 是否镂空的       | boolean          | false     | -                                      |
| closeable    | 是否为可关闭标签 | boolean          | false     | -                                      |
| height       | 高度             | string \| number | ""        | -                                      |
| padding      | 内边距           | string           | ""        | -                                      |
| background   | 背景颜色         | string           | ""        | -                                      |
| borderColor  | 边框颜色         | string           | ""        | -                                      |
| borderWidth  | 边框大小         | string \| number | ""        | -                                      |
| borderRadius | 圆角大小         | string \| number | ""        | -                                      |
| customClass  | 自定义类名       | string           | ""        | -                                      |
| customStyle  | 自定义样式       | string \| object | ""        | -                                      |

## Events

| 事件名 | 说明 | 回调参数      |
| ------ | ---- | ------------- |
| click  | -    | -             |
| close  | -    | -             |
| update | -    | show: boolean |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| close   | -    |
| default | -    |
| icon    | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
