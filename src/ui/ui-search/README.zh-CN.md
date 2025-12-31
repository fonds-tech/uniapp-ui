# UiSearch 组件

## 介绍

UiSearch 组件，属性与事件以源码注释为准。

## 代码演示

```vue
<template>
  <ui-search />
</template>
```

## Props

| 参数         | 说明                               | 类型             | 默认值             | 可选值              |
| ------------ | ---------------------------------- | ---------------- | ------------------ | ------------------- |
| modelValue   | 绑定值                             | string           | ""                 | -                   |
| background   | 背景颜色                           | string           | ""                 | -                   |
| placeholder  | 占位文字                           | string           | "请输入搜索关键词" | -                   |
| disabled     | 是否启用输入框                     | boolean          | false              | -                   |
| clearabled   | 是否启用清除控件                   | boolean          | true               | -                   |
| maxlength    | 输入框最大能输入的长度             | number           | -1                 | -                   |
| height       | 输入框高度                         | string \| number | "68rpx"            | -                   |
| margin       | 外边距                             | string \| number | ""                 | -                   |
| round        | 是否圆形搜索框                     | boolean          | false              | -                   |
| color        | 颜色                               | string           | ""                 | -                   |
| focus        | 是否自动获得焦点                   | boolean          | false              | -                   |
| border       | 边框                               | string           | ""                 | -                   |
| radius       | 圆角值                             | string \| number | ""                 | -                   |
| fontSize     | 搜索框字体大小                     | string \| number | ""                 | -                   |
| icon         | 搜索图标                           | string           | "search"           | -                   |
| iconSize     | 搜索图标大小                       | string \| number | "32rpx"            | -                   |
| iconColor    | 搜索图标颜色                       | string           | ""                 | -                   |
| iconWeight   | 搜索图标大小                       | string           | ""                 | -                   |
| action       | 是否显示右侧控件(右侧的"搜索"按钮) | boolean          | true               | -                   |
| actionText   | 右侧控件文字                       | string           | "搜索"             | -                   |
| actionSize   | 右侧控件文字大小                   | string \| number | ""                 | -                   |
| actionColor  | 右侧控件文字颜色                   | string           | "#333"             | -                   |
| actionWeight | 右侧控件文字大小                   | string           | ""                 | -                   |
| inputAlign   | 输入框内容水平对齐方式             | string           | "left"             | left, center, right |
| inputStyle   | 自定义输入框样式，对象形式         | string \| object | ""                 | -                   |
| customClass  | 自定义类名                         | string           | ""                 | -                   |
| customStyle  | 自定义样式                         | string \| object | ""                 | -                   |

## Events

| 事件名 | 说明 | 回调参数      |
| ------ | ---- | ------------- |
| blur   | -    | event: any    |
| focus  | -    | event: any    |
| click  | -    | event: any    |
| cancel | -    | -             |
| clear  | -    | event: any    |
| action | -    | event: any    |
| search | -    | value: string |
| change | -    | value: string |
| update | -    | value: string |

## Slots

| 名称   | 说明 |
| ------ | ---- |
| action | -    |
| clear  | -    |
| icon   | -    |

## Methods

| 方法名 | 说明 | 参数 |
| ------ | ---- | ---- |
| name   | -    | -    |
