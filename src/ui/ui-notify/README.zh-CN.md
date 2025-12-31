# UiNotify 组件

## 介绍

UiNotify 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-notify />
</template>
```

## Props

| 参数        | 说明             | 类型                           | 默认值    | 可选值                           |
| ----------- | ---------------- | ------------------------------ | --------- | -------------------------------- |
| show        | 是否显示         | boolean                        | false     | -                                |
| type        | 自定义类名       | String as PropType<NotifyType> | "primary" | primary, success, warning, error |
| content     | 展示内容         | string                         | ""        | -                                |
| duration    | 展示时长，单位ms | string \| number               | "3000"    | -                                |
| color       | 字体颜色         | string                         | ""        | -                                |
| fontSize    | 字体大小         | string \| number               | ""        | -                                |
| fontWeight  | 字体粗细         | string                         | ""        | -                                |
| background  | 背景色           | string                         | ""        | -                                |
| zIndex      | 元素层级         | string \| number               | "2000"    | -                                |
| offsetTop   | 距离顶部偏移     | string \| number               | ""        | -                                |
| customClass | 自定义类名       | string                         | ""        | -                                |
| customStyle | 自定义样式       | string \| object               | ""        | -                                |

## Events

| 事件名 | 说明 | 回调参数       |
| ------ | ---- | -------------- |
| open   | -    | -              |
| opened | -    | -              |
| close  | -    | -              |
| closed | -    | -              |
| click  | -    | -              |
| update | -    | value: boolean |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
