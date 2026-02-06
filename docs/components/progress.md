# Progress 进度条

进度条组件，用于展示任务或操作的进度。

## 基础用法

```vue
<template>
  <ui-progress :percentage="50" />
</template>
```

## 线条粗细

通过 `stroke-width` 属性设置进度条粗细。

```vue
<template>
  <ui-progress :percentage="50" stroke-width="12rpx" />
  <ui-progress :percentage="50" stroke-width="24rpx" />
</template>
```

## 置灰

通过 `inactive` 属性设置置灰状态。

```vue
<template>
  <ui-progress :percentage="50" inactive />
</template>
```

## 不同颜色

通过 `color` 属性设置进度条颜色。

```vue
<template>
  <ui-progress :percentage="30" color="primary" />
  <ui-progress :percentage="50" color="success" />
  <ui-progress :percentage="70" color="warning" />
  <ui-progress :percentage="90" color="danger" />
</template>
```

## 渐变色

通过传入数组设置渐变色。

```vue
<template>
  <ui-progress :percentage="50" :color="['#3b82f6', '#8b5cf6']" />
</template>
```

## 显示百分比

通过 `show-text` 属性显示百分比文字，`text-inside` 属性在进度条内部显示。

```vue
<template>
  <ui-progress :percentage="50" show-text />
  <ui-progress :percentage="50" show-text text-inside />
</template>
```

## 动态演示

```vue
<template>
  <ui-progress :percentage="percentage" show-text />
  <ui-button size="small" @click="decrease">减少</ui-button>
  <ui-button size="small" type="primary" @click="increase">增加</ui-button>
</template>

<script setup>
import { ref } from "vue"

const percentage = ref(50)

function increase() {
  percentage.value = Math.min(100, percentage.value + 10)
}

function decrease() {
  percentage.value = Math.max(0, percentage.value - 10)
}
</script>
```

## Props

| 参数         | 说明             | 类型                 | 默认值  |
| ------------ | ---------------- | -------------------- | ------- |
| percentage   | 进度百分比       | `string \| number`   | `0`     |
| color        | 进度条颜色       | `string \| string[]` | -       |
| background   | 进度条背景色     | `string`             | -       |
| text         | 进度文本内容     | `string`             | -       |
| show-text    | 是否显示进度文本 | `boolean`            | `true`  |
| text-color   | 进度文本颜色     | `string`             | -       |
| text-size    | 进度文本大小     | `string \| number`   | -       |
| text-weight  | 进度文本粗细     | `string \| number`   | -       |
| height       | 进度条高度       | `string \| number`   | `24rpx` |
| custom-class | 自定义类名       | `string`             | -       |
| custom-style | 自定义样式       | `string \| object`   | -       |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| finish | 进度达到100%时触发 | -        |


<!-- AUTO-PROPS-SUPPLEMENT: ui-progress -->
## Progress Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `track-color` |
| `text-position` |

