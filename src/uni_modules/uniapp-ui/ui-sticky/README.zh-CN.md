# Sticky 吸顶

滚动到指定位置时元素吸附在顶部。基于 IntersectionObserver 实现，跨端支持 H5 / 小程序 / App。

## 基础用法

```vue
<template>
  <ui-sticky>
    <view class="header">滚动到顶部时我会吸附</view>
  </ui-sticky>
</template>
```

## 设置偏移

```vue
<!-- 离顶部 100rpx -->
<ui-sticky offset-top="100rpx">
  <view class="bar">分类</view>
</ui-sticky>
```

> 如果使用自定义 navbar，需把 navbar 高度加到 `offset-top`。组件本身不假设 navbar 存在。

## 多级吸顶

不同元素设置不同 `offset-top` 即可堆叠。

```vue
<ui-sticky offset-top="0">
  <view class="tabs">主分类</view>
</ui-sticky>
<ui-sticky offset-top="80rpx">
  <view class="sub-tabs">子分类</view>
</ui-sticky>
```

## 监听吸顶状态

```vue
<ui-sticky @change="onChange">
  <view>...</view>
</ui-sticky>

<script setup>
function onChange(sticky) {
  console.log("是否吸顶", sticky)
}
</script>
```

## 禁用

```vue
<ui-sticky :disabled="true">...</ui-sticky>
```

## 外部触发重新测量

内容尺寸变化时（如折叠面板展开）手动调用 `resize()`：

```vue
<ui-sticky ref="stickyRef">...</ui-sticky>

<script setup>
const stickyRef = ref()
function onContentExpand() {
  stickyRef.value?.resize()
}
</script>
```

## API

### Props

| 参数         | 说明                                                           | 类型                      | 默认值  |
| ------------ | -------------------------------------------------------------- | ------------------------- | ------- |
| offset-top   | 吸顶时距 navbar 下方的距离（系统 navbar 高度自动加，无需手动） | `number \| string`        | `0`     |
| z-index      | 吸顶层级                                                       | `number \| string`        | -       |
| disabled     | 禁用吸顶                                                       | `boolean`                 | `false` |
| background   | 吸顶时背景色                                                   | `string`                  | -       |
| custom-class | 容器类名                                                       | `string`                  | -       |
| custom-style | 容器样式                                                       | `string \| CSSProperties` | -       |

### Events

| 事件名 | 说明                                               | 回调参数                                  |
| ------ | -------------------------------------------------- | ----------------------------------------- |
| change | 吸顶状态切换                                       | `sticky: boolean`                         |
| scroll | 吸顶切换瞬间触发；`scrollTop` 始终为 0（保留兼容） | `{ scrollTop: number, isFixed: boolean }` |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 吸顶内容 |

### 暴露方法

| 方法    | 说明                       |
| ------- | -------------------------- |
| resize  | 外部尺寸变化时重新测量观察 |
| isFixed | 当前是否处于吸顶状态       |

## 注意事项

- **navbar 适配**：内部通过 `useSystemInfo().windowTop` 自动获取顶部 navbar 高度（H5 原生 44 / 小程序动态 / `navigationStyle: "custom"` 时为 0），用户无需关心
- 跨端实现基于 `uni.createIntersectionObserver`，依赖 viewport 相对偏移；元素被 transform/overflow 父容器裁剪时观察可能不触发
- 内容尺寸变化（如内部折叠展开）需主动调用 `resize()` 重测
