# Sticky 粘性布局

粘性布局组件，使元素在滚动时固定在指定位置。

## 基础用法

向下滚动页面时，组件会固定在顶部。

```vue
<template>
  <ui-sticky>
    <ui-button type="primary" block>基础用法</ui-button>
  </ui-sticky>
</template>
```

## 吸顶距离

通过 `offset-top` 属性设置距离顶部的偏移量。

```vue
<template>
  <ui-sticky :offset-top="100">
    <ui-button type="success" block>吸顶距离 100rpx</ui-button>
  </ui-sticky>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top | 吸顶时距离顶部的距离 | `string \| number` | `0` |
| z-index | 层级 | `string \| number` | - |
| background | 背景颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 吸顶状态变化时触发 | `sticky: boolean` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要吸顶的内容 |
