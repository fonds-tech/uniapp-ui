# TextEllipsis 文本省略

文本省略组件，用于长文本的折叠与展开。

## 基础用法

```vue
<template>
  <ui-text-ellipsis :content="longText" />
</template>

<script setup>
const longText = '慢慢来，比较快。人生是一场马拉松，不是百米冲刺。保持节奏，稳步前行，你会发现，那些看似遥不可及的目标，终将在不经意间到达。'
</script>
```

## 展开/收起

默认超出指定行数时显示"展开"按钮，点击可展开全部内容。

```vue
<template>
  <ui-text-ellipsis :content="longText" :rows="2" @change="onChange" />
</template>

<script setup>
function onChange(expanded) {
  console.log('展开状态:', expanded)
}
</script>
```

## 自定义行数

通过 `rows` 属性设置折叠时显示的行数。

```vue
<template>
  <ui-text-ellipsis :content="longText" :rows="1" />
  <ui-text-ellipsis :content="longText" :rows="2" />
  <ui-text-ellipsis :content="longText" :rows="4" />
</template>
```

## 自定义操作文案

通过 `expand-text` 和 `collapse-text` 属性自定义操作按钮文案。

```vue
<template>
  <ui-text-ellipsis
    :content="longText"
    expand-text="查看更多"
    collapse-text="收起内容"
  />
</template>
```

## 自定义样式

通过 `color`、`font-size`、`action-color` 属性自定义样式。

```vue
<template>
  <ui-text-ellipsis
    :content="longText"
    color="#1989fa"
    font-size="28rpx"
    action-color="#ee0a24"
  />
</template>
```

## 隐藏操作按钮

通过 `show-action` 属性控制是否显示操作按钮。

```vue
<template>
  <ui-text-ellipsis :content="longText" :show-action="false" />
</template>
```

## 通过 ref 控制

通过 ref 获取组件实例，调用 `toggle`、`expand`、`collapse` 方法控制展开收起。

```vue
<template>
  <ui-text-ellipsis ref="textEllipsisRef" :content="longText" :show-action="false" />
  <ui-button @click="textEllipsisRef?.expand()">展开</ui-button>
  <ui-button @click="textEllipsisRef?.collapse()">收起</ui-button>
  <ui-button @click="textEllipsisRef?.toggle()">切换</ui-button>
</template>

<script setup>
import { ref } from 'vue'

const textEllipsisRef = ref(null)
</script>
```

## Props

| 属性           | 说明             | 类型               | 默认值      |
| -------------- | ---------------- | ------------------ | ----------- |
| content        | 文本内容         | `string`           | `''`        |
| rows           | 展示的行数       | `number \| string` | `3`         |
| expand-text    | 展开操作的文案   | `string`           | `'展开'`    |
| collapse-text  | 收起操作的文案   | `string`           | `'收起'`    |
| dots           | 省略号的文本     | `string`           | `'...'`     |
| color          | 文本颜色         | `string`           | -           |
| font-size      | 文本大小         | `string \| number` | -           |
| line-height    | 行高             | `string \| number` | -           |
| action-color   | 操作按钮颜色     | `string`           | `primary`   |
| gradient-color | 渐变遮罩颜色     | `string`           | `'#ffffff'` |
| show-action    | 是否显示操作按钮 | `boolean`          | `true`      |
| custom-class   | 自定义类名       | `string`           | -           |
| custom-style   | 自定义样式       | `string \| object` | -           |

## Events

| 事件名 | 说明                    | 回调参数            |
| ------ | ----------------------- | ------------------- |
| change | 展开/收起状态变化时触发 | `expanded: boolean` |
| click  | 点击文本时触发          | `event: Event`      |

## Methods

通过 ref 可以获取到组件实例并调用实例方法。

| 方法名   | 说明              | 参数 | 返回值 |
| -------- | ----------------- | ---- | ------ |
| toggle   | 切换展开/收起状态 | -    | -      |
| expand   | 展开文本          | -    | -      |
| collapse | 收起文本          | -    | -      |
