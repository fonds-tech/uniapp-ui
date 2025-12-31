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
