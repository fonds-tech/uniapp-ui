# UiImage 组件

## 介绍

UiImage 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-image />
</template>
```

## Props

| 参数                | 说明                                                                                      | 类型             | 默认值                                              | 可选值 |
| ------------------- | ----------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------------- | ------ |
| src                 | 图片资源地址                                                                              | string           | ""                                                  | -      |
| mode                | 图片裁剪、缩放的模式                                                                      | string           | "scaleToFill"                                       | -      |
| width               | 图片宽度                                                                                  | string \| number | ""                                                  | -      |
| height              | 图片高度                                                                                  | string \| number | ""                                                  | -      |
| radius              | 图片圆角                                                                                  | string \| number | ""                                                  | -      |
| block               | 是否显示块级元素                                                                          | boolean          | false                                               | -      |
| round               | 是否显示为圆形                                                                            | boolean          | false                                               | -      |
| square              | 是否显示为正方形，会自动根据宽度计算高度                                                  | boolean          | false                                               | -      |
| lazyLoad            | 图片懒加载。只针对page与scroll-view下的image有效                                          | boolean          | true                                                | -      |
| fade                | 图片显示动画效果                                                                          | boolean          | true                                                | -      |
| webp                | 在系统不支持webp的情况下是否单独启用webp。默认false，只支持网络资源。webp支持详见下面说明 | boolean          | false                                               | -      |
| showMenuByLongpress | 开启长按图片显示识别小程序码菜单                                                          | boolean          | false                                               | -      |
| draggable           | 是否能拖动图片                                                                            | boolean          | true                                                | -      |
| background          | 背景颜色                                                                                  | string           | ""                                                  | -      |
| srcParams           | 链接参数                                                                                  | object           | () => ({ "x-oss-process": "image/format,webp" })    | -      |
| srcParamsUrls       | 指定生效srcParams的url列表                                                                | array            | () => ["ilike-images.oss-cn-hangzhou.aliyuncs.com"] | -      |
| customClass         | 自定义类名                                                                                | string           | ""                                                  | -      |
| customStyle         | 自定义样式                                                                                | string \| object | ""                                                  | -      |

## Events

| 事件名 | 说明 | 回调参数   |
| ------ | ---- | ---------- |
| load   | -    | evnet: any |
| error  | -    | evnet: any |
| click  | -    | evnet: any |
