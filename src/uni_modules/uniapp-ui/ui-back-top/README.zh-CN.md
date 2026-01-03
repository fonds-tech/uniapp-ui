# ui-back-top 返回顶部组件

## 介绍

ui-back-top 是一个返回顶部的组件，当页面滚动到一定高度时会显示，点击后可以快速返回页面顶部。

## 代码演示

```vue
<template>
  <ui-back-top
    offset="300rpx"
    right="20rpx"
    bottom="100rpx"
    :z-index="100"
    duration="300"
    background="#007aff"
    border-radius="50%"
    @click="handleBackTop"
  />
</template>

<script setup lang="ts">
function handleBackTop() {
  console.log("Back to top clicked")
}
</script>
```

## Props

| 参数        | 说明                               | 类型               | 默认值   | 可选值 |
| ----------- | ---------------------------------- | ------------------ | -------- | ------ |
| right       | 距离页面右侧的距离                 | `string \| number` | -        | -      |
| bottom      | 距离页面底部的距离                 | `string \| number` | -        | -      |
| offset      | 滚动高度达到此参数值时才显示组件   | `string \| number` | `200rpx` | -      |
| duration    | 返回顶部过程中的过渡时间，单位毫秒 | `string \| number` | `200`    | -      |
| background  | 背景颜色                           | `string`           | -        | -      |
| radius      | 圆角大小                           | `string \| number` | -        | -      |
| zIndex      | 元素层级                           | `string \| number` | -        | -      |
| customClass | 自定义类名                         | `string`           | -        | -      |
| customStyle | 自定义样式                         | `string \| object` | -        | -      |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击按钮时触发 | -        |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 自定义按钮显示内容 |
