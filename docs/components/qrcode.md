# QRCode 二维码

二维码和条形码生成组件。

## 基础用法

```vue
<template>
  <ui-qrcode value="https://example.com" />
</template>
```

## 自定义大小

通过 `size` 属性设置二维码尺寸。

```vue
<template>
  <ui-qrcode value="https://example.com" size="300rpx" />
</template>
```

## 自定义颜色

通过 `foreground` 属性设置二维码颜色。

```vue
<template>
  <ui-qrcode value="https://example.com" size="160rpx" foreground="#1989fa" />
  <ui-qrcode value="https://example.com" size="160rpx" foreground="#07c160" />
  <ui-qrcode value="https://example.com" size="160rpx" foreground="#ee0a24" />
</template>
```

## 带Logo

通过 `icon` 和 `icon-size` 属性添加中心Logo。

```vue
<template>
  <ui-qrcode value="https://example.com" size="250rpx" icon="https://picsum.photos/60" icon-size="60rpx" />
</template>
```

## 条形码

通过 `type="barcode"` 生成条形码。

```vue
<template>
  <ui-qrcode type="barcode" value="1234567890" barcode-width="500rpx" barcode-height="120rpx" />
</template>
```

## 动态生成

```vue
<template>
  <ui-input v-model="inputValue" placeholder="输入内容生成二维码" />
  <ui-qrcode :value="inputValue || 'Hello World'" size="200rpx" />
</template>

<script setup>
import { ref } from "vue"
const inputValue = ref("")
</script>
```

## Props

| 参数           | 说明              | 类型                | 默认值      |
| -------------- | ----------------- | ------------------- | ----------- |
| show           | 是否显示          | `boolean`           | `true`      |
| value          | 二维码/条形码内容 | `string \| number`  | -           |
| size           | 二维码大小        | `string \| number`  | `200rpx`    |
| type           | 类型              | `qrcode \| barcode` | `qrcode`    |
| background     | 背景色            | `string`            | `#ffffff`   |
| foreground     | 前景色            | `string`            | `#000000`   |
| pdground       | 定位角点颜色      | `string`            | `#000000`   |
| icon           | 二维码中心图标    | `string`            | -           |
| icon-size      | 图标大小          | `string \| number`  | `60rpx`     |
| lv             | 容错级别 (1-4)    | `number`            | `3`         |
| auto           | 是否自动生成      | `boolean`           | `true`      |
| loading-text   | 生成中文本        | `string`            | `生成中...` |
| barcode-width  | 条形码宽度        | `string \| number`  | `600rpx`    |
| barcode-height | 条形码高度        | `string \| number`  | `200rpx`    |
| custom-class   | 自定义类名        | `string`            | -           |
| custom-style   | 自定义样式        | `string \| object`  | -           |

## Events

| 事件名  | 说明           | 回调参数      |
| ------- | -------------- | ------------- |
| click   | 点击时触发     | -             |
| success | 生成成功时触发 | `res: string` |
| error   | 生成失败时触发 | `err: any`    |

## Methods

| 方法名   | 说明             | 参数 |
| -------- | ---------------- | ---- |
| makeCode | 手动生成二维码   | -    |
| saveCode | 保存二维码到相册 | -    |
