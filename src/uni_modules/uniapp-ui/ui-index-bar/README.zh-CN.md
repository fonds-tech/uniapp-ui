# UiIndexBar 组件

## 介绍

UiIndexBar 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-index-bar />
</template>
```

## Props

| 参数        | 说明         | 类型                                    | 默认值   | 可选值 |
| ----------- | ------------ | --------------------------------------- | -------- | ------ |
| indexs      | 索引字符列表 | Array as PropType<(string \| number)[]> | () => [] | -      |
| zIndex      | 元素层级     | string \| number                        | "1"      | -      |
| sticky      | 是否自动吸顶 | boolean                                 | true     | -      |
| customClass | 自定义类名   | string                                  | ""       | -      |
| customStyle | 自定义样式   | string \| object                        | ""       | -      |

## Events

| 事件名 | 说明 | 回调参数                |
| ------ | ---- | ----------------------- |
| select | -    | index: number \| string |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
