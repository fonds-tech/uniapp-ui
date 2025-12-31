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
  <ui-text text="主要文本" color="text-primary" />
  <ui-text text="次要文本" color="text-secondary" />
  <ui-text text="占位文本" color="text-placeholder" />
  <ui-text text="主题色文本" color="primary" />
  <ui-text text="成功色文本" color="success" />
  <ui-text text="警告色文本" color="warning" />
  <ui-text text="错误色文本" color="error" />
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

## 前后缀

通过 `prefix` 和 `suffix` 属性设置文本前后缀。

```vue
<template>
  <ui-text text="99.00" prefix="¥" prefix-size="24rpx" prefix-color="error" />
  <ui-text text="128" suffix="元/月" suffix-size="24rpx" suffix-color="text-secondary" />
  <ui-text text="1000" prefix="¥" suffix=".00" color="error" size="40rpx" weight="600" />
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
