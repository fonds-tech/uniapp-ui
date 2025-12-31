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
