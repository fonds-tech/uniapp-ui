# UiDropdownItem 组件

## 介绍

UiDropdownItem 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-dropdown-item />
</template>
```

## Props

| 参数                | 说明                                               | 类型                                                  | 默认值 | 可选值 |
| ------------------- | -------------------------------------------------- | ----------------------------------------------------- | ------ | ------ |
| modelValue          | 绑定值，多选时为数组                               | string \| number \| array                             | -      | -      |
| mode                | 菜单模式，可选值 single 单选模式 multiple 多选模式 | makeStringProp<DropdownItemMode>("single")            | -      | -      |
| title               | 菜单项标题                                         | [Number, String]                                           | -      | -      |
| options             | 配置项数据                                         | makeArrayProp<DropdownItemOption>()                   | -      | -      |
| disabled            | 是否禁用                                           | boolean                                               | -      | -      |
| minHeight           | 菜单最小高度                                       | makeNumericProp("auto")                               | -      | -      |
| maxHeight           | 菜单最大高度                                       | makeNumericProp("60vh")                               | -      | -      |
| titleColor          | 标题颜色                                           | string                                                | -      | -      |
| titleSize           | 标题大小                                           | [Number, String]                                           | -      | -      |
| titleWeight         | 标题粗细                                           | [Number, String]                                           | -      | -      |
| activeTitleColor    | 激活标题颜色                                       | string                                                | -      | -      |
| activeTitleSize     | 激活标题大小                                       | [Number, String]                                           | -      | -      |
| activeTitleWeight   | 激活标题粗细                                       | [Number, String]                                           | -      | -      |
| icon                | 图标                                               | string                                                | -      | -      |
| iconSize            | 图标大小                                           | [Number, String]                                           | -      | -      |
| iconColor           | 图标颜色                                           | string                                                | -      | -      |
| iconWeight          | 图标粗细                                           | [Number, String]                                           | -      | -      |
| activeIconColor     | 激活图标颜色                                       | string                                                | -      | -      |
| showIcon            | 是否显示图标                                       | truthProp                                             | -      | -      |
| overlay             | 是否显示遮罩层                                     | truthProp                                             | -      | -      |
| duration            | 动画时长，单位毫秒                                 | [Number, String]                                           | -      | -      |
| direction           | 菜单展开方向，可选值up、down                       | String as PropType<DropdownItemDirection>             | -      | -      |
| background          | 选项菜单背景颜色                                   | string                                                | -      | -      |
| borderRadius        | 选项菜单圆角值                                     | [Number, String]                                           | -      | -      |
| optionSize          | 选项文字图标大小                                   | [Number, String]                                           | -      | -      |
| optionColor         | 选项文字图标颜色                                   | string                                                | -      | -      |
| optionWeight        | 选项文字图标粗细                                   | [Number, String]                                           | -      | -      |
| activeOptionSize    | 激活选项文字图标大小                               | [Number, String]                                           | -      | -      |
| activeOptionColor   | 激活选项文字图标颜色                               | string                                                | -      | -      |
| activeOptionWeight  | 激活选项文字图标粗细                               | [Number, String]                                           | -      | -      |
| closeOnClickOverlay | 是否在点击遮罩层后关闭菜单                         | truthProp                                             | -      | -      |
| zIndex              | 弹出层 zIndex                                      | [Number, String]                                           | -      | -      |
| labelField          | option 名称字段                                    | makeStringProp("label")                               | -      | -      |
| valueField          | option 内容字段                                    | makeStringProp("value")                               | -      | -      |
| customClass         | 自定义类名                                         | string                                                | -      | -      |
| customStyle         | 自定义样式                                         | [String, Object] as PropType<string \| CSSProperties> | -      | -      |

## Events

| 事件名 | 说明 | 回调参数                 |
| ------ | ---- | ------------------------ |
| open   | -    | -                        |
| opened | -    | -                        |
| close  | -    | -                        |
| closed | -    | -                        |
| change | -    | value: DropdownItemValue |
| update | -    | value: DropdownItemValue |

## Slots

| 名称    | 说明 |
| ------- | ---- |
| default | -    |
| footer  | -    |
| header  | -    |
