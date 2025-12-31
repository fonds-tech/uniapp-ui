# TextHighlight 文本高亮

文本高亮组件，用于搜索关键词高亮等场景。

## 基础用法

```vue
<template>
  <ui-text-highlight text="Vue.js 是一款用于构建用户界面的渐进式 JavaScript 框架" match="Vue.js" />
</template>
```

## 多个匹配

会高亮所有匹配的文本。

```vue
<template>
  <ui-text-highlight text="Vue 3 相比 Vue 2 带来了更好的性能和更小的体积" match="Vue" />
</template>
```

## 自定义高亮颜色

通过 `highlight-color` 属性自定义高亮颜色。

```vue
<template>
  <ui-text-highlight text="TypeScript 是 JavaScript 的超集" match="TypeScript" highlight-color="#07c160" />
  <ui-text-highlight text="React 和 Vue 都是流行的前端框架" match="React" highlight-color="#1989fa" />
</template>
```

## 自定义文本样式

通过 `color` 和 `font-size` 属性自定义文本样式。

```vue
<template>
  <ui-text-highlight text="UniApp 支持多端发布，一套代码多处运行" match="UniApp" color="#666" font-size="32rpx" />
</template>
```

## 搜索场景

```vue
<template>
  <ui-input v-model="keyword" placeholder="输入关键词搜索" />
  <ui-text-highlight :text="searchText" :match="keyword" />
</template>

<script setup>
import { ref } from "vue"
const keyword = ref("")
const searchText = "UniApp UI 是一个基于 Vue 3 的跨端 UI 组件库"
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 文本内容 | `string` | - |
| match | 匹配文本内容 | `string` | - |
| color | 文本颜色 | `string` | - |
| text-row | 文本行数 | `string \| number` | `2` |
| font-size | 文本大小 | `string \| number` | - |
| font-weight | 文本粗细 | `string \| number` | - |
| line-height | 文本行高 | `string \| number` | - |
| highlight-color | 文本高亮颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击文本时触发 | `value: string \| number` |
| click-match | 点击高亮文本时触发 | `value: string \| number` |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| match | 手动触发匹配 | - |
