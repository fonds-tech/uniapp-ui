# UiResize 组件

## 介绍

UiResize 子元素尺寸监听组件。基于双 scroll-view 滚动溢出检测原理（兼容小程序无 ResizeObserver 场景），子元素尺寸变化时触发 `resize` 事件。

## 代码演示

```vue
<template>
  <ui-resize @resize="onResize">
    <view :style="{ width: w + 'px', height: '100px' }">动态盒子</view>
  </ui-resize>
</template>

<script setup>
const w = ref(200)
function onResize(rect) {
  console.log(rect.width, rect.height)
}
</script>
```

## Props

| 参数                 | 说明                                  | 类型             | 默认值 |
| -------------------- | ------------------------------------- | ---------------- | ------ |
| width                | 初始宽度 (传值后锁宽，否则跟随子元素) | string \| number | -      |
| height               | 初始高度 (传值后锁高，否则跟随子元素) | string \| number | -      |
| disabled             | 禁用尺寸监听                          | boolean          | false  |
| customClass          | 自定义类名 (外层)                     | string           | -      |
| customContainerClass | 自定义类名 (内层 content 容器)        | string           | -      |
| customStyle          | 自定义样式                            | string \| object | -      |

## Events

| 事件名 | 说明           | 回调参数         |
| ------ | -------------- | ---------------- |
| resize | 子元素尺寸变化 | rect: ResizeRect |

```typescript
interface ResizeRect {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
}
```

## 实例方法

| 方法名  | 说明         | 参数 |
| ------- | ------------ | ---- |
| refresh | 手动重新测量 | -    |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 被监听内容 |

## 工作原理

利用两个不可见 scroll-view 互相补偿的滚动位置变化触发 `@scroll` 事件，间接感知子元素尺寸变化。原生 `ResizeObserver` 在小程序端不可用，此方案为跨端通用兜底。
