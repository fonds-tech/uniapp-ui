# UiSidebarItem 组件

## 介绍

UiSidebarItem 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-sidebar-item />
</template>
```

## Props

| 参数              | 说明         | 类型                                                  | 默认值 | 可选值 |
| ----------------- | ------------ | ----------------------------------------------------- | ------ | ------ |
| name              | 标识符       | [Number, String]                                           | -      | -      |
| title             | 标题         | [Number, String]                                           | -      | -      |
| height            | 高度         | [Number, String]                                           | -      | -      |
| disabled          | 是否禁用     | boolean                                               | -      | -      |
| titleColor        | 标题颜色     | string                                                | -      | -      |
| titleSize         | 标题大小     | [Number, String]                                           | -      | -      |
| titleWeight       | 标题粗细     | [Number, String]                                           | -      | -      |
| titleAlign        | 文字对齐方式 | makeStringProp("center")                              | -      | -      |
| activeTitleColor  | 标题激活颜色 | string                                                | -      | -      |
| activeTitleSize   | 标题激活大小 | [Number, String]                                           | -      | -      |
| activeTitleWeight | 标题激活粗细 | [Number, String]                                           | -      | -      |
| background        | 背景颜色     | string                                                | -      | -      |
| activeBackground  | 激活背景颜色 | string                                                | -      | -      |
| customClass       | 自定义类名   | string                                                | -      | -      |
| customStyle       | 自定义样式   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
