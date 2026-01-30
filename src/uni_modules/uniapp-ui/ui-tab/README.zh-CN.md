# UiTab 组件

## 介绍

UiTab 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-tab />
</template>
```

## Props

| 参数        | 说明       | 类型                                                  | 默认值 | 可选值 |
| ----------- | ---------- | ----------------------------------------------------- | ------ | ------ |
| title       | 标题       | [Number, String]                                      | -      | -      |
| name        | 标识符     | [Number, String]                                      | -      | -      |
| disabled    | 是否禁用   | boolean                                               | -      | -      |
| customClass | 自定义类名 | string                                                | -      | -      |
| customStyle | 自定义样式 | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数               |
| ------ | ---- | ---------------------- |
| click  | -    | name: number \| string |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
