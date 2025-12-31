# Header 头部组件

## 介绍

页面顶部的头部组件。它可以包含各种内容,如标题、导航按钮等,并且会自动处理滚动时的固定定位。这个组件特别适用于需要固定头部的页面布局,如应用的主页面或长列表页面。

## 代码演示

```vue
<template>
  <ui-header :offset="20" background="#ffffff" z-index="100">
    <view>Header Content</view>
  </ui-header>
</template>

<script setup>
// 组件使用示例
</script>
```

## Props

| 参数        | 说明         | 类型             | 默认值 | 可选值 |
| ----------- | ------------ | ---------------- | ------ | ------ |
| offset      | 顶部偏移量   | string \| number | 0      | -      |
| background  | 背景颜色     | string           | -      | -      |
| zIndex      | z-index 层级 | string \| number | -      | -      |
| customStyle | 自定义样式   | string \| object | -      | -      |

## Events

| 事件名 | 说明                   | 回调参数              |
| ------ | ---------------------- | --------------------- |
| rect   | 组件尺寸信息变化时触发 | rect: UniApp.NodeInfo |
| height | 组件高度变化时触发     | height: number        |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义头部内容 |

## 注意事项

1. 组件内部使用了`position: fixed`来实现固定定位,请确保在使用时不会与页面其他元素产生冲突。

2. 组件会自动创建一个占位元素来防止内容被遮挡,高度与实际header内容高度相同。

3. 如果需要自定义样式,可以通过`customStyle`属性传入,它会被合并到默认样式中。

4. 组件使用了`ui-resize`来监听尺寸变化,确保在内容变化时能够正确更新高度。
