# Popup 弹出层

弹出层容器组件，用于展示弹窗、菜单等。

## 基础用法

```vue
<template>
  <ui-button @click="show = true">打开弹窗</ui-button>
  <ui-popup v-model:show="show">
    <view class="content">弹窗内容</view>
  </ui-popup>
</template>

<script setup>
import { ref } from "vue"
const show = ref(false)
</script>
```

## 弹出位置

通过 `position` 设置弹出位置。

```vue
<ui-popup v-model:show="show" position="top">顶部弹出</ui-popup>
<ui-popup v-model:show="show" position="bottom">底部弹出</ui-popup>
<ui-popup v-model:show="show" position="left">左侧弹出</ui-popup>
<ui-popup v-model:show="show" position="right">右侧弹出</ui-popup>
<ui-popup v-model:show="show" position="center">居中弹出</ui-popup>
```

## 关闭图标

设置 `closeable` 显示关闭图标。

```vue
<ui-popup v-model:show="show" closeable>内容</ui-popup>
<ui-popup v-model:show="show" closeable close-icon-position="top-left">内容</ui-popup>
```

## 圆角弹窗

设置 `round` 显示圆角弹窗。

```vue
<ui-popup v-model:show="show" position="bottom" round>内容</ui-popup>
```

## API

### Props

| 属性名                 | 说明               | 类型                                       | 默认值      |
| ---------------------- | ------------------ | ------------------------------------------ | ----------- |
| v-model:show           | 是否显示           | `boolean`                                  | `false`     |
| position               | 弹出位置           | `top \| bottom \| left \| right \| center` | `center`    |
| round                  | 是否圆角           | `boolean`                                  | `false`     |
| closeable              | 是否显示关闭图标   | `boolean`                                  | `false`     |
| close-icon             | 关闭图标名称       | `string`                                   | `cross`     |
| close-icon-position    | 关闭图标位置       | `top-left \| top-right`                    | `top-right` |
| overlay                | 是否显示遮罩层     | `boolean`                                  | `true`      |
| close-on-click-overlay | 点击遮罩是否关闭   | `boolean`                                  | `true`      |
| duration               | 动画时长(ms)       | `number`                                   | `300`       |
| z-index                | 层级               | `number`                                   | -           |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean`                                  | `false`     |

### Events

| 事件名        | 说明               | 回调参数 |
| ------------- | ------------------ | -------- |
| open          | 打开弹窗时触发     | -        |
| close         | 关闭弹窗时触发     | -        |
| opened        | 打开动画结束时触发 | -        |
| closed        | 关闭动画结束时触发 | -        |
| click-overlay | 点击遮罩层时触发   | -        |
