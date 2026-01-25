# Arc 弧形

## 介绍

创建一个可以固定定位的弧形背景效果。常用于为页面添加独特的视觉元素,提升用户界面的美观度。通过调整其属性,可以轻松控制弧形的高度、颜色和位置,使其能够适应各种设计需求。

## 代码演示

```vue
<template>
  <ui-arc
    height="150rpx"
    :percent="130"
    background="#3498db"
    top="0"
    left="0"
    :fixed="true"
    z-index="10"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
function handleClick() {
  console.log("Arc clicked")
}
</script>
```

## Props

| 参数        | 说明           | 类型             | 默认值   | 可选值           |
| ----------- | -------------- | ---------------- | -------- | ---------------- |
| top         | 顶部位置       | string \| number | -        | -                |
| left        | 左边位置       | string \| number | -        | -                |
| fixed       | 是否固定定位   | boolean          | `false`  | -                |
| height      | 弧形高度       | string \| number | `130rpx` | -                |
| curvature   | 曲率（50-500） | string \| number | `120`    | -                |
| direction   | 弧形方向       | string           | `bottom` | `top` / `bottom` |
| background  | 背景色         | string           | -        | -                |
| zIndex      | 元素层级       | string \| number | -        | -                |
| customClass | 自定义类名     | string           | -        | -                |
| customStyle | 自定义样式     | string \| object | -        | -                |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击弧形时触发 | -        |
