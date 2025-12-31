# UiPagination 组件

## 介绍

UiPagination 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-pagination />
</template>
```

## Props

| 参数        | 说明           | 类型             | 默认值       | 可选值 |
| ----------- | -------------- | ---------------- | ------------ | ------ |
| list        | 列表数据       | array            | () => []     | -      |
| page        | 当前分页       | string \| number | 1            | -      |
| pageSize    | 分页大小       | string \| number | 10           | -      |
| total       | 列表总数       | string \| number | 0            | -      |
| loading     | 是否加载中     | boolean          | false        | -      |
| pagination  | 分页数据       | object           | () => ({})   | -      |
| emptyText   | 空数据提示文字 | string           | "暂无数据～" | -      |
| customClass | 自定义类名     | string           | ""           | -      |
| customStyle | 自定义样式     | string \| object | ""           | -      |

## Events

| 事件名  | 说明 | 回调参数                       |
| ------- | ---- | ------------------------------ |
| load    | -    | page: number, pageSize: number |
| refresh | -    | page: number, pageSize: number |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
