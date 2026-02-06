# Grid 栅格宫格

用于展示宫格布局，支持图标与文字。

## 基础用法

```vue
<template>
  <ui-grid :column-num="4">
    <ui-grid-item text="首页" icon="home" />
    <ui-grid-item text="搜索" icon="search" />
    <ui-grid-item text="收藏" icon="heart" />
    <ui-grid-item text="我的" icon="person" />
  </ui-grid>
</template>
```

## Grid Props

| 参数         | 说明           | 类型                          | 默认值   |
| ------------ | -------------- | ----------------------------- | -------- |
| column-num   | 列数           | `number`                      | `4`      |
| border       | 是否显示边框   | `boolean`                     | `true`   |
| center       | 是否居中内容   | `boolean`                     | `true`   |
| square       | 是否正方形格子 | `boolean`                     | `false`  |
| gutter       | 格子间距       | `string \| number`             | `0`      |
| clickable    | 是否可点击     | `boolean`                     | `false`  |
| direction    | 内容排列方向   | `horizontal \| vertical`       | `vertical` |
| custom-class | 自定义类名     | `string`                      | `""`    |
| custom-style | 自定义样式     | `string \| object`             | `""`    |

## Grid Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | GridItem 内容  |

## GridItem Props

| 参数         | 说明           | 类型               | 默认值 |
| ------------ | -------------- | ------------------ | ------ |
| text         | 文字           | `string`           | `""` |
| icon         | 图标名称       | `string`           | `""` |
| icon-color   | 图标颜色       | `string`           | `""` |
| icon-size    | 图标大小       | `string \| number` | `""` |
| dot          | 是否显示小红点 | `boolean`          | `false` |
| badge        | 徽标内容       | `string \| number` | `""` |
| custom-class | 自定义类名     | `string`           | `""` |
| custom-style | 自定义样式     | `string \| object` | `""` |

## GridItem Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| click  | 点击时触发 | `event`  |

## GridItem Slots

| 名称    | 说明       |
| ------- | ---------- |
| icon    | 图标区域   |
| text    | 文字区域   |
| default | 自定义内容 |