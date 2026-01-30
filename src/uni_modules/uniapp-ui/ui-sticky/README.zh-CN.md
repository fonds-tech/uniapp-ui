# UiSticky 组件

## 介绍

UiSticky 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-sticky />
</template>
```

## Props

| 参数        | 说明               | 类型                                                  | 默认值 | 可选值 |
| ----------- | ------------------ | ----------------------------------------------------- | ------ | ------ |
| zIndex      | 元素层级           | [Number, String]                                      | -      | -      |
| offsetTop   | 吸顶时距离顶部距离 | makeNumericProp(0)                                    | -      | -      |
| background  | 背景色             | string                                                | -      | -      |
| customClass | 自定义类名         | string                                                | -      | -      |
| customStyle | 自定义样式         | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数        |
| ------ | ---- | --------------- |
| change | -    | sticky: boolean |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
