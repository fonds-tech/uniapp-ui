# UiDropdownMenu 组件

## 介绍

UiDropdownMenu 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-dropdown-menu />
</template>
```

## Props

| 参数                | 说明                         | 类型                                                  | 默认值 | 可选值 |
| ------------------- | ---------------------------- | ----------------------------------------------------- | ------ | ------ |
| height              | 菜单高度                     | [Number, String]                                           | -      | -      |
| titleColor          | 标题颜色                     | string                                                | -      | -      |
| titleSize           | 标题大小                     | [Number, String]                                           | -      | -      |
| titleWeight         | 标题粗细                     | [Number, String]                                           | -      | -      |
| activeTitleColor    | 激活标题颜色                 | string                                                | -      | -      |
| activeTitleSize     | 激活标题大小                 | [Number, String]                                           | -      | -      |
| activeTitleWeight   | 激活标题粗细                 | [Number, String]                                           | -      | -      |
| icon                | 图标                         | makeStringProp("arrow-down")                          | -      | -      |
| iconSize            | 图标大小                     | [Number, String]                                           | -      | -      |
| iconColor           | 图标颜色                     | string                                                | -      | -      |
| iconWeight          | 图标粗细                     | [Number, String]                                           | -      | -      |
| activeIconColor     | 激活图标颜色                 | string                                                | -      | -      |
| showIcon            | 是否显示图标                 | truthProp                                             | -      | -      |
| zIndex              | 元素层级                     | [Number, String]                                           | -      | -      |
| overlay             | 是否显示遮罩层               | truthProp                                             | -      | -      |
| duration            | 动画时长，单位毫秒           | makeNumericProp(300)                                  | -      | -      |
| direction           | 菜单展开方向，可选值up、down | makeStringProp<DropdownMenuDirection>("down")         | -      | -      |
| borderRadius        | 选项菜单圆角值               | [Number, String]                                           | -      | -      |
| optionSize          | 选项文字图标大小             | [Number, String]                                           | -      | -      |
| optionColor         | 选项文字图标颜色             | string                                                | -      | -      |
| optionWeight        | 选项文字图标粗细             | [Number, String]                                           | -      | -      |
| activeOptionSize    | 激活选项文字图标大小         | [Number, String]                                           | -      | -      |
| activeOptionColor   | 激活选项文字图标颜色         | string                                                | -      | -      |
| activeOptionWeight  | 激活选项文字图标粗细         | [Number, String]                                           | -      | -      |
| background          | 背景颜色                     | string                                                | -      | -      |
| closeOnClickOverlay | 是否在点击遮罩层后关闭菜单   | truthProp                                             | -      | -      |
| labelField          | option 名称字段              | makeStringProp("label")                               | -      | -      |
| valueField          | option 内容字段              | makeStringProp("value")                               | -      | -      |
| customClass         | 自定义类名                   | string                                                | -      | -      |
| customStyle         | 自定义样式                   | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
