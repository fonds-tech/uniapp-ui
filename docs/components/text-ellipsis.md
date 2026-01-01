# TextEllipsis 文本省略

文本省略组件，支持展开/收起功能。

## 基础用法

默认显示 2 行，超出部分省略。

```vue
<template>
  <ui-text-ellipsis :text="longText" />
</template>
```

## 自定义行数

通过 `rows` 属性设置显示行数。

```vue
<template>
  <ui-text-ellipsis :text="longText" :rows="1" />
  <ui-text-ellipsis :text="longText" :rows="3" />
</template>
```

## 自定义展开收起文案

通过 `expand-text` 和 `collapse-text` 属性自定义展开收起按钮文字。

```vue
<template>
  <ui-text-ellipsis :text="longText" expand-text="查看更多" collapse-text="收起内容" expand-text-color="#1989fa" collapse-text-color="#999" />
</template>
```

## 自定义省略号

通过 `dots` 属性自定义省略号内容。

```vue
<template>
  <ui-text-ellipsis :text="longText" dots="……" />
</template>
```

## 自定义样式

通过 `color` 和 `line-height` 属性自定义文本样式。

```vue
<template>
  <ui-text-ellipsis :text="longText" color="#666" line-height="1.8" />
</template>
```

## Props

| 参数                | 说明                                   | 类型               | 默认值 |
| ------------------- | -------------------------------------- | ------------------ | ------ |
| text                | 文本内容                               | `string`           | -      |
| rows                | 展示的行数                             | `string \| number` | `2`    |
| dots                | 省略号的文本内容                       | `string`           | `...`  |
| color               | 文字颜色                               | `string`           | -      |
| weight              | 文字粗细                               | `string \| number` | -      |
| line-height         | 文字行高                               | `string \| number` | -      |
| offset              | 字数偏移，当操作按钮显示不准确时可调整 | `string \| number` | -      |
| expand-text         | 展开操作的文案                         | `string`           | `展开` |
| expand-text-color   | 展开操作的文案颜色                     | `string`           | -      |
| collapse-text       | 收起操作的文案                         | `string`           | `收起` |
| collapse-text-color | 收起操作的文案颜色                     | `string`           | -      |
| custom-class        | 自定义类名                             | `string`           | -      |
| custom-style        | 自定义样式                             | `string \| object` | -      |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击文本时触发 | -        |
