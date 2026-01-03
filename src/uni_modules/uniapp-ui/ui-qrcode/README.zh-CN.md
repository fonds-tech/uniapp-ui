# UiQrcode 组件

## 介绍

UiQrcode 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-qrcode />
</template>
```

## Props

| 参数          | 说明                                                  | 类型             | 默认值      | 可选值 |
| ------------- | ----------------------------------------------------- | ---------------- | ----------- | ------ |
| show          | 是否显示                                              | boolean          | true        | -      |
| size          | 二维码大小                                            | number \| string | "200rpx"    | -      |
| value         | 二维码内容                                            | string \| number | ""          | -      |
| background    | 背景色                                                | string           | "#ffffff"   | -      |
| foreground    | 前景色                                                | string           | "#000000"   | -      |
| pdground      | 定位角点颜色                                          | string           | "#000000"   | -      |
| icon          | 二维码图标                                            | string           | ""          | -      |
| iconSize      | 二维码图标大小                                        | number \| string | "60rpx"     | -      |
| lv            | 容错级别                                              | number           | 3           | -      |
| auto          | 自动生成                                              | boolean          | true        | -      |
| loadingText   | 生成中文本                                            | string           | "生成中..." | -      |
| customClass   | 自定义类名                                            | string           | ""          | -      |
| customStyle   | 自定义样式                                            | string \| object | ""          | -      |
| type          | 类型：qrcode-二维码 barcode-条形码                    | string           | "qrcode"    | -      |
| barcodeHeight | 条形码高度（仅当type为barcode时生效）                 | number \| string | "200rpx"    | -      |
| barcodeWidth  | 条形码宽度（仅当type为barcode时生效，默认使用size值） | number \| string | "600rpx"    | -      |

## Events

| 事件名  | 说明 | 回调参数    |
| ------- | ---- | ----------- |
| click   | -    | -           |
| error   | -    | err: any    |
| success | -    | res: string |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
