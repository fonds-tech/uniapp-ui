# SafeAreaTop 顶部安全区

顶部安全区占位组件，用于适配刘海屏等异形屏幕。

## 基础用法

```vue
<template>
  <ui-safe-area-top />
</template>
```

## 自定义背景

通过 `background` 属性设置背景颜色。

```vue
<template>
  <ui-safe-area-top background="#1989fa" />
</template>
```

## 获取高度

通过 `height` 事件获取安全区高度。

```vue
<template>
  <ui-safe-area-top @height="onHeight" />
</template>

<script setup>
function onHeight(height) {
  console.log("Safe area height:", height)
}
</script>
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
