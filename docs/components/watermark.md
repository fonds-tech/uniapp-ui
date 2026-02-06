# Watermark 水印

用于在页面或容器中添加水印。

## 基础用法

```vue
<template>
  <ui-watermark content="UniApp UI">
    <view style="height: 200rpx">内容区域</view>
  </ui-watermark>
</template>
```

## Props

| 参数         | 说明                                   | 类型                           | 默认值 |
| ------------ | -------------------------------------- | ------------------------------ | ------ |
| content      | 水印文字内容（支持多行）               | `string \| string[]`           | `""` |
| image        | 水印图片 URL（优先级高于文字）         | `string`                       | `""` |
| width        | 单个水印宽度（px）                     | `string \| number`             | `120` |
| height       | 单个水印高度（px）                     | `string \| number`             | `64`  |
| rotate       | 旋转角度                               | `number`                       | `-22` |
| z-index      | 层级                                   | `number`                       | `100` |
| full-page    | 是否覆盖整个页面                       | `boolean`                      | `true` |
| gap-x        | 水平间距（px）                         | `string \| number`             | `24`  |
| gap-y        | 垂直间距（px）                         | `string \| number`             | `48`  |
| font-size    | 字体大小（px）                         | `string \| number`             | `14`  |
| font-color   | 字体颜色                               | `string`                       | `rgba(0, 0, 0, 0.15)` |
| font-family  | 字体                                   | `string`                       | `PingFang SC, Microsoft YaHei, sans-serif` |
| font-weight  | 字体粗细                               | `normal \| light \| bold \| number` | `normal` |
| opacity      | 透明度                                 | `number`                       | `1`   |
| custom-class | 自定义类名                             | `string`                       | `""` |
| custom-style | 自定义样式                             | `string \| object`             | `""` |

## Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 内容区域   |

<!-- AUTO-METHODS-SUPPLEMENT: ui-watermark -->
## Watermark Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `regenerate` |

