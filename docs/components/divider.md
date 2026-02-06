# Divider 分割线

用于分隔内容区域的分割线组件，对应 `ui-divider`。

## 基础用法

```vue
<template>
  <ui-divider>分割线</ui-divider>
</template>
```

## Props

| 参数             | 说明                               | 类型                                      | 默认值   |
| ---------------- | ---------------------------------- | ----------------------------------------- | -------- |
| type             | 分割线类型                         | `solid \| dashed \| dotted`               | `solid`  |
| direction        | 分割线方向                         | `horizontal \| vertical`                  | `horizontal` |
| content-position | 内容位置                           | `left \| center \| right`                | `center` |
| border-color     | 边框颜色                           | `string`                                  | -        |
| margin           | 外边距                             | `string \| number`                         | -        |
| length           | 线条长度                           | `string \| number`                         | -        |
| thickness        | 线条粗细（优先级高于 hairline）     | `string \| number`                         | -        |
| dashed           | 是否虚线（优先级高于 type）         | `boolean`                                 | `false`  |
| hairline         | 是否使用 0.5px 细线                | `boolean`                                 | `false`  |
| custom-class     | 自定义类名                         | `string`                                  | `""`    |
| custom-style     | 自定义样式                         | `string \| object`                         | `""`    |

## Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 分割线内容（水平） |

## Events

`Divider` 当前版本无事件。

## Methods

`Divider` 当前版本无额外公开方法。
