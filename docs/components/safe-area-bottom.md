# SafeAreaBottom 底部安全区

底部安全区占位组件，用于适配 iPhone X 等带底部安全区的设备。

## 基础用法

```vue
<template>
  <view class="page">
    <view class="content">页面内容</view>
    <ui-safe-area-bottom />
  </view>
</template>
```

## 自定义背景

通过 `background` 属性设置背景颜色。

```vue
<template>
  <ui-safe-area-bottom background="#ffffff" />
</template>
```

## 获取高度

通过 `height` 事件获取安全区高度。

```vue
<template>
  <ui-safe-area-bottom @height="onHeight" />
</template>

<script setup>
function onHeight(height) {
  console.log("Safe area height:", height)
}
</script>
```

## 应用场景：底部操作栏

```vue
<template>
  <view class="footer-bar">
    <view class="footer-content">
      <ui-button type="primary">立即购买</ui-button>
      <ui-button>加入购物车</ui-button>
    </view>
    <ui-safe-area-bottom background="#fff" />
  </view>
</template>
```

## Props

| 参数         | 说明       | 类型               | 默认值 |
| ------------ | ---------- | ------------------ | ------ |
| background   | 背景颜色   | `string`           | -      |
| custom-class | 自定义类名 | `string`           | -      |
| custom-style | 自定义样式 | `string \| object` | -      |

## Events

| 事件名 | 说明                   | 回调参数         |
| ------ | ---------------------- | ---------------- |
| height | 获取到安全区高度时触发 | `height: number` |
