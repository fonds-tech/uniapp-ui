# SafeArea 安全区域

适配 iPhone 等设备的安全区域，自动处理刘海屏、底部指示条等区域的占位。

## 基础用法

### 顶部安全区域

用于处理刘海屏顶部的安全区域。

```vue
<template>
  <ui-safe-area-top />
  <view>页面内容</view>
</template>
```

### 底部安全区域

用于处理底部指示条的安全区域。

```vue
<template>
  <view>页面内容</view>
  <ui-safe-area-bottom />
</template>
```

## 自定义背景色

```vue
<template>
  <ui-safe-area-top background="primary" />
  <view>页面内容</view>
  <ui-safe-area-bottom background="#f5f5f5" />
</template>
```

## 获取安全区域高度

通过 `height` 事件获取安全区域的高度。

```vue
<template>
  <ui-safe-area-bottom @height="onHeight" />
</template>

<script setup>
function onHeight(height) {
  console.log('底部安全区域高度:', height)
}
</script>
```

## SafeAreaTop Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| background | 背景色，支持主题色名称或自定义颜色值 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## SafeAreaTop Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| height | 获取安全区域高度时触发 | `height: number` |

## SafeAreaBottom Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| background | 背景色，支持主题色名称或自定义颜色值 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## SafeAreaBottom Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| height | 获取安全区域高度时触发 | `height: number` |
