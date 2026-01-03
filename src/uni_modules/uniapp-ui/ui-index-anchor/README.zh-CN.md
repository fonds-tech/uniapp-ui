# UiIndexAnchor 组件

## 介绍

UiIndexAnchor 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-index-anchor />
</template>
```

## Props

| 参数             | 说明                       | 类型             | 默认值 | 可选值 |
| ---------------- | -------------------------- | ---------------- | ------ | ------ |
| name             | 索引名称，作为匹配的标识符 | string \| number | ""     | -      |
| text             | 索引字符                   | string \| number | ""     | -      |
| color            | 字符颜色                   | string           | ""     | -      |
| height           | 高度                       | string \| number | ""     | -      |
| fontSize         | 字符大小                   | string \| number | ""     | -      |
| fontWeight       | 字符粗细                   | string \| number | ""     | -      |
| background       | 背景颜色                   | string           | ""     | -      |
| stickyColor      | 吸顶时字符颜色             | string           | ""     | -      |
| stickyFontSize   | 吸顶时字符大小             | string \| number | ""     | -      |
| stickyFontWeight | 吸顶时字符粗细             | string \| number | ""     | -      |
| stickyBackground | 吸顶时背景颜色             | string           | ""     | -      |
| customClass      | 自定义类名                 | string           | ""     | -      |
| customStyle      | 自定义样式                 | string \| object | ""     | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| blur   | -    | -        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
