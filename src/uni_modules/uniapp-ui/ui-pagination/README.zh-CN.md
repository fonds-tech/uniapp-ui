# UiPagination 组件

## 介绍

UiPagination 列表分页加载外壳。封装触底加载、下拉刷新、加载中、没有更多、空状态。

## 代码演示

```vue
<template>
  <ui-pagination :list="list" :page="page" :page-size="pageSize" :total="total" :loading="loading" @load="onLoad" @refresh="onRefresh">
    <view v-for="item in list" :key="item.id">{{ item.title }}</view>
  </ui-pagination>
</template>
```

## Props

| 参数        | 说明                          | 类型             | 默认值       | 可选值 |
| ----------- | ----------------------------- | ---------------- | ------------ | ------ |
| list        | 列表数据                      | array            | []           | -      |
| page        | 当前页                        | string \| number | 1            | -      |
| pageSize    | 每页条数                      | string \| number | 10           | -      |
| total       | 数据总条数                    | string \| number | 0            | -      |
| loading     | 是否加载中                    | boolean          | false        | -      |
| emptyIcon   | 空数据图标                    | string           | ""           | -      |
| emptyText   | 空数据文案                    | string           | "暂无数据～" | -      |
| customClass | 自定义类名                    | string           | ""           | -      |
| customStyle | 自定义样式                    | string \| object | ""           | -      |

## Events

| 事件名  | 说明         | 回调参数                       |
| ------- | ------------ | ------------------------------ |
| load    | 触底加载更多 | page: number, pageSize: number |
| refresh | 下拉刷新     | page: number, pageSize: number |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 列表渲染区   |
| empty   | 自定义空状态 |

## CSS 变量

| 变量名                         | 默认值                        | 说明           |
| ------------------------------ | ----------------------------- | -------------- |
| --ui-pagination-loading-color  | var(--ui-color-text-tertiary) | 加载文字颜色   |
| --ui-pagination-loading-gap    | 12rpx                         | 图标与文字间距 |
| --ui-pagination-loading-margin | var(--ui-spacing-md)          | 加载行外边距   |
