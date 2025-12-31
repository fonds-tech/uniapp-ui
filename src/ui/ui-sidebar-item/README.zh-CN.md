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
| name              | 标识符       | numericProp                                           | -      | -      |
| title             | 标题         | numericProp                                           | -      | -      |
| height            | 高度         | numericProp                                           | -      | -      |
| disabled          | 是否禁用     | boolean                                               | -      | -      |
| titleColor        | 标题颜色     | string                                                | -      | -      |
| titleSize         | 标题大小     | numericProp                                           | -      | -      |
| titleWeight       | 标题粗细     | numericProp                                           | -      | -      |
| titleAlign        | 文字对齐方式 | makeStringProp("center")                              | -      | -      |
| activeTitleColor  | 标题激活颜色 | string                                                | -      | -      |
| activeTitleSize   | 标题激活大小 | numericProp                                           | -      | -      |
| activeTitleWeight | 标题激活粗细 | numericProp                                           | -      | -      |
| background        | 背景颜色     | string                                                | -      | -      |
| activeBackground  | 激活背景颜色 | string                                                | -      | -      |
| customClass       | 自定义类名   | string                                                | -      | -      |
| customStyle       | 自定义样式   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
