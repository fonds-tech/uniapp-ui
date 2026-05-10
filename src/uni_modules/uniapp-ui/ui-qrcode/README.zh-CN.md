# UiQrcode 组件

## 介绍

UiQrcode 二维码 / 条形码生成组件。基于 Canvas 离屏绘制后输出 tempFilePath，渲染成 `<image>` 显示。

## 代码演示

```vue
<template>
  <ui-qrcode value="https://example.com" />
  <ui-qrcode value="ABC123456" type="barcode" />
  <ui-qrcode value="https://example.com" :icon="logoUrl" icon-size="60rpx" />
</template>
```

## Props

| 参数          | 说明                                          | 类型             | 默认值      | 可选值                |
| ------------- | --------------------------------------------- | ---------------- | ----------- | --------------------- |
| show          | 显示成品图                                    | boolean          | true        | -                     |
| size          | 二维码尺寸                                    | number \| string | "200rpx"    | -                     |
| value         | 编码内容                                      | number \| string | -           | -                     |
| background    | 背景色 (canvas hex/rgba)                      | string           | "#ffffff"   | -                     |
| foreground    | 前景色 (canvas hex/rgba)                      | string           | "#000000"   | -                     |
| pdground      | 定位角点颜色 (qrcode 专用)                    | string           | "#000000"   | -                     |
| icon          | 中心 logo 图片 url                            | string           | -           | -                     |
| iconSize      | 中心 logo 尺寸                                | number \| string | "60rpx"     | -                     |
| lv            | 容错级别 (0=L 7%, 1=M 15%, 2=Q 25%, 3=H 30%)  | number           | 3           | 0 / 1 / 2 / 3         |
| auto          | props 变化自动重生成                          | boolean          | true        | -                     |
| loadingText   | 生成中提示文案                                | string           | "生成中..." | -                     |
| type          | 类型                                          | string           | "qrcode"    | qrcode / barcode      |
| barcodeWidth  | 条形码宽度 (type=barcode)                     | number \| string | "600rpx"    | -                     |
| barcodeHeight | 条形码高度 (type=barcode)                     | number \| string | "200rpx"    | -                     |
| customClass   | 自定义类名                                    | string           | -           | -                     |
| customStyle   | 自定义样式                                    | string \| object | -           | -                     |

## Events

| 事件名  | 说明     | 回调参数                     |
| ------- | -------- | ---------------------------- |
| click   | 点击     | -                            |
| success | 生成成功 | tempFilePath: string         |
| error   | 生成失败 | err: unknown                 |

## 实例方法

| 方法名    | 说明           | 参数 |
| --------- | -------------- | ---- |
| makeCode  | 手动重新生成   | -    |
| saveCode  | 保存到相册     | -    |

## 注意事项

- canvas 不接受 CSS var，`background` / `foreground` / `pdground` 必须传 hex 或 rgba 字面量
- `auto=true` 时 props 任何变化自动重绘；高频更新场景建议 `auto=false` 手动调 `makeCode()`
- 离屏 canvas 用 `position: fixed; top:-99999rpx` 移出可视区，绘制后通过 `canvasToTempFilePath` 转图片渲染
- 200ms `setTimeout` 延迟用于 canvas 跨端 ready，初次绘制有约 200ms 延迟感
