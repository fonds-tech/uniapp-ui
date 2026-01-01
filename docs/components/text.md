# Text 文本

文本显示组件，支持多种尺寸、颜色、装饰效果等功能。

## 基础用法

```vue
<template>
  <ui-text text="这是一段普通文本" />
</template>
```

## 文本大小

通过 `size` 属性设置文本大小。

```vue
<template>
  <ui-text text="特小文本 20rpx" size="20rpx" />
  <ui-text text="小号文本 24rpx" size="24rpx" />
  <ui-text text="中号文本 28rpx" size="28rpx" />
  <ui-text text="大号文本 32rpx" size="32rpx" />
  <ui-text text="特大文本 36rpx" size="36rpx" />
</template>
```

## 文本颜色

通过 `color` 属性设置文本颜色，支持预设颜色和自定义值。

```vue
<template>
  <ui-text text="默认文本" color="text-main" />
  <ui-text text="次要文本" color="text-secondary" />
  <ui-text text="占位文本" color="text-placeholder" />
  <ui-text text="主题色文本" color="primary" />
  <ui-text text="成功色文本" color="success" />
  <ui-text text="警告色文本" color="warning" />
  <ui-text text="危险色文本" color="danger" />
</template>
```

## 文本粗细

通过 `weight` 属性设置文本粗细。

```vue
<template>
  <ui-text text="正常粗细 400" weight="400" />
  <ui-text text="中等粗细 500" weight="500" />
  <ui-text text="粗体文本 600" weight="600" />
  <ui-text text="特粗文本 700" weight="700" />
</template>
```

## 文本行数限制

通过 `rows` 属性限制文本显示行数，超出部分会显示省略号。

```vue
<template>
  <ui-text :rows="1" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号" />
  <ui-text :rows="2" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号" />
</template>
```

## 文本装饰

通过 `decoration` 属性设置文本装饰线。

```vue
<template>
  <ui-text text="下划线文本" decoration="underline" />
  <ui-text text="删除线文本" decoration="line-through" />
  <ui-text text="上划线文本" decoration="overline" />
</template>
```

## 可选择文本

通过 `selectable` 属性允许长按选择文本。

```vue
<template>
  <ui-text text="长按可以选择复制这段文本" selectable />
</template>
```

## Props

| 参数         | 说明                   | 类型                                    | 默认值  |
| ------------ | ---------------------- | --------------------------------------- | ------- |
| text         | 文本内容               | `string \| number`                      | -       |
| size         | 文本大小               | `string \| number`                      | -       |
| color        | 文本颜色               | `string`                                | -       |
| weight       | 文本粗细               | `string \| number`                      | -       |
| align        | 对齐方式               | `left \| center \| right`               | `left`  |
| rows         | 显示行数，0 表示不限制 | `number`                                | `0`     |
| decoration   | 文本装饰               | `underline \| line-through \| overline` | -       |
| line-height  | 行高                   | `string \| number`                      | -       |
| decode       | 是否解码               | `boolean`                               | `false` |
| clickable    | 是否可点击             | `boolean`                               | `false` |
| selectable   | 是否可选择             | `boolean`                               | `false` |
| custom-class | 自定义类名             | `string`                                | -       |
| custom-style | 自定义样式             | `string \| object`                      | -       |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| click  | 点击文本时触发 | -        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 文本内容 |
