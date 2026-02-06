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

## 应用场景：自定义导航栏

```vue
<template>
  <view class="custom-navbar">
    <ui-safe-area-top background="#1989fa" />
    <view class="navbar-content">
      <ui-icon name="arrow-left" color="#fff" />
      <text class="navbar-title">页面标题</text>
    </view>
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

<!-- AUTO-SLOTS-SUPPLEMENT: ui-safe-area-top -->
## SafeAreaTop Slots 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 插槽名 |
| --- |
| `default` |

