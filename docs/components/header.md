# Header 页头

固定在页面顶部的头部组件。

## 基础用法

```vue
<template>
  <ui-header background="#1989fa">
    <view class="header-content">
      <text class="header-title">页头标题</text>
    </view>
  </ui-header>
</template>
```

## 自定义背景

通过 `background` 属性自定义背景色，支持渐变。

```vue
<template>
  <ui-header background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    <view class="header-content">
      <text class="header-title">渐变背景</text>
    </view>
  </ui-header>
</template>
```

## 带操作按钮

```vue
<template>
  <ui-header background="#07c160">
    <view class="header-bar">
      <ui-icon name="arrow-left" color="#fff" size="40rpx" />
      <text class="header-title">标题</text>
      <ui-icon name="more" color="#fff" size="40rpx" />
    </view>
  </ui-header>
</template>
```

## Props

| 参数                | 说明                 | 类型               | 默认值  |
| ------------------- | -------------------- | ------------------ | ------- |
| z-index             | 元素层级             | `string \| number` | -       |
| offset              | 距离顶部偏移         | `string \| number` | `0`     |
| background          | 背景颜色             | `string`           | -       |
| safe-area-inset-top | 是否开启顶部安全区域 | `boolean`          | `false` |
| custom-class        | 自定义类名           | `string`           | -       |
| custom-style        | 自定义样式           | `string \| object` | -       |

## Events

| 事件名 | 说明               | 回调参数                |
| ------ | ------------------ | ----------------------- |
| rect   | 获取元素信息时触发 | `rect: UniApp.NodeInfo` |
| height | 获取元素高度时触发 | `height: number`        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 页头内容 |
