# UiCellGroup 组件

## 介绍

UiCellGroup 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-cell-group />
</template>
```

## Props

| 参数        | 说明       | 类型                                                  | 默认值 | 可选值 |
| ----------- | ---------- | ----------------------------------------------------- | ------ | ------ |
| radius      | 圆角值     | [Number, String]                                           | -      | -      |
| background  | 背景颜色   | string                                                | -      | -      |
| customClass | 自定义类名 | string                                                | -      | -      |
| customStyle | 自定义样式 | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
