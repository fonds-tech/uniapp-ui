# Resize 尺寸监听

用于监听元素尺寸变化的组件，当内容区域大小发生变化时触发事件。

## 基础用法

```vue
<template>
  <ui-resize @resize="onResize">
    <view>监听此区域的尺寸变化</view>
  </ui-resize>
</template>

<script setup>
function onResize(info) {
  console.log('宽度:', info.width)
  console.log('高度:', info.height)
}
</script>
```

## 设置初始尺寸

通过 `width` 和 `height` 属性设置初始尺寸。

```vue
<template>
  <ui-resize width="100%" height="200rpx" @resize="onResize">
    <view>固定高度区域</view>
  </ui-resize>
</template>
```

## 禁用监听

通过 `disabled` 属性禁用尺寸监听。

```vue
<template>
  <ui-resize disabled>
    <view>不监听尺寸变化</view>
  </ui-resize>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 初始宽度 | `string \| number` | - |
| height | 初始高度 | `string \| number` | - |
| disabled | 是否禁用监听 | `boolean` | `false` |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| resize | 尺寸变化时触发 | `{ width: number, height: number }` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，放置需要监听尺寸的内容 |
