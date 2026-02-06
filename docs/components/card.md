# Card 卡片

用于展示结构化内容的卡片容器，支持标题、描述与缩略图。

## 基础用法

```vue
<template>
  <ui-card title="标题" desc="描述内容" thumb="https://via.placeholder.com/80">
    <view>卡片内容</view>
  </ui-card>
</template>
```

## Props

| 参数            | 说明           | 类型                                          | 默认值       |
| --------------- | -------------- | --------------------------------------------- | ------------ |
| title           | 标题           | `string`                                      | -            |
| desc            | 描述/副标题    | `string`                                      | -            |
| thumb           | 左侧图片       | `string`                                      | -            |
| border          | 是否显示边框   | `boolean`                                     | `true`       |
| shadow          | 阴影大小       | `none \| small \| medium \| large`           | `small`      |
| radius          | 圆角大小       | `string \| number`                             | -            |
| padding         | 内边距         | `string \| number`                             | -            |
| margin          | 外边距         | `string \| number`                             | -            |
| thumb-width     | 图片宽度       | `string \| number`                             | -            |
| thumb-height    | 图片高度       | `string \| number`                             | -            |
| thumb-radius    | 图片圆角       | `string \| number`                             | -            |
| thumb-mode      | 图片裁剪模式   | `string`                                      | `aspectFill` |
| background      | 背景颜色       | `string`                                      | -            |
| title-size      | 标题字体大小   | `string \| number`                             | -            |
| title-color     | 标题颜色       | `string`                                      | -            |
| title-weight    | 标题字重       | `string \| number`                             | -            |
| desc-size       | 描述字体大小   | `string \| number`                             | -            |
| desc-color      | 描述颜色       | `string`                                      | -            |
| desc-weight     | 描述字重       | `string \| number`                             | -            |
| custom-class    | 自定义类名     | `string`                                      | -            |
| custom-style    | 自定义样式     | `string \| object`                             | -            |

## Events

| 事件名       | 说明         | 回调参数 |
| ------------ | ------------ | -------- |
| click        | 点击卡片触发 | -        |
| click-thumb  | 点击图片触发 | -        |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 卡片内容     |
| header  | 头部区域     |
| thumb   | 左侧图片区域 |
| title   | 标题区域     |
| desc    | 描述区域     |
| footer  | 底部区域     |