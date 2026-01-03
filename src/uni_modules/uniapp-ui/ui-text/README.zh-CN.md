# UiText 组件

## 介绍

UiText 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-text />
</template>
```

## Props

| 参数             | 说明                                         | 类型             | 默认值     | 可选值 |
| ---------------- | -------------------------------------------- | ---------------- | ---------- | ------ |
| text             | 文本内容                                     | string \| number | ""         | -      |
| size             | 文本大小                                     | string \| number | ""         | -      |
| color            | 文本颜色                                     | string           | ""         | -      |
| weight           | 文本粗细                                     | string \| number | ""         | -      |
| align            | 文本对齐方式，可选值 left、center、right     | string \| number | "left"     | -      |
| rows             | 展示的行数                                   | string \| number | Infinity   | -      |
| overflow         | 文本超出显示方式                             | string           | "ellipsis" | -      |
| decoration       | 文本修饰，可选值 underline、line-through     | string           | ""         | -      |
| lineHeight       | 文本行高                                     | string \| number | ""         | -      |
| cell             | 是否点击拨打电话                             | boolean          | false      | -      |
| decode           | 是否解码                                     | boolean          | false      | -      |
| clickable        | 是否可点击的，点击会有状态变化               | boolean          | false      | -      |
| selectable       | 文本是否可选                                 | boolean          | false      | -      |
| prefix           | 文本前缀                                     | string \| number | ""         | -      |
| prefixSize       | 文本前缀大小                                 | string \| number | ""         | -      |
| prefixColor      | 文本前缀颜色                                 | string           | ""         | -      |
| prefixWeight     | 文本前缀粗细                                 | string \| number | ""         | -      |
| prefixGutter     | 文本前缀与文本的间隔                         | string \| number | ""         | -      |
| prefixDecoration | 文本前缀修饰，可选值 underline、line-through | string           | ""         | -      |
| suffix           | 文本后缀                                     | string \| number | ""         | -      |
| suffixSize       | 文本后缀大小                                 | string \| number | ""         | -      |
| suffixColor      | 文本后缀颜色                                 | string           | ""         | -      |
| suffixWeight     | 文本后缀粗细                                 | string \| number | ""         | -      |
| suffixGutter     | 文本后缀与文本的间隔                         | string \| number | ""         | -      |
| suffixDecoration | 文本后缀修饰，可选值 underline、line-through | string           | ""         | -      |
| customClass      | 自定义类名                                   | string           | ""         | -      |
| customStyle      | 自定义样式                                   | string \| object | ""         | -      |

## Events

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |
| click  | -    | -        |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
