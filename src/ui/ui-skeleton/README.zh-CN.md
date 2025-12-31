# UiSkeleton 组件

## 介绍

UiSkeleton 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-skeleton />
</template>
```

## Props

| 参数        | 说明         | 类型                                                  | 默认值 | 可选值 |
| ----------- | ------------ | ----------------------------------------------------- | ------ | ------ |
| animate     | 是否开启动画 | truthProp                                             | -      | -      |
| background  | 背景色       | string                                                | -      | -      |
| customClass | 自定义类名   | string                                                | -      | -      |
| customStyle | 自定义样式   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
