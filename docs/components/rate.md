# Rate 评分

用于评分操作的组件。

## 基础用法

```vue
<template>
  <ui-rate v-model="value" />
</template>

<script setup>
import { ref } from "vue"
const value = ref(3)
</script>
```

## 自定义图标

通过 `icon` 和 `void-icon` 属性自定义选中和未选中状态的图标。

```vue
<template>
  <ui-rate v-model="value" icon="heart-fill" void-icon="heart" color="#ee0a24" />
</template>
```

## 半星

通过 `allow-half` 属性允许选择半星。

```vue
<template>
  <ui-rate v-model="value" allow-half />
</template>
```

## 自定义数量

通过 `count` 属性设置评分总数。

```vue
<template>
  <ui-rate v-model="value" :count="6" />
</template>
```

## 自定义颜色

通过 `color` 和 `void-color` 属性自定义颜色。

```vue
<template>
  <ui-rate v-model="value" color="#07c160" void-color="#e8e8e8" />
</template>
```

## 自定义大小

通过 `size` 属性设置评分图标大小。

```vue
<template>
  <ui-rate v-model="value" size="40rpx" />
  <ui-rate v-model="value" size="56rpx" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用评分。

```vue
<template>
  <ui-rate v-model="value" disabled />
</template>
```

## 只读状态

通过 `readonly` 属性设置为只读状态。

```vue
<template>
  <ui-rate v-model="value" readonly allow-half />
</template>
```

## 可滑动选择

通过 `touchable` 属性允许滑动选择评分。

```vue
<template>
  <ui-rate v-model="value" touchable />
</template>
```

## Props

| 参数           | 说明                       | 类型               | 默认值    |
| -------------- | -------------------------- | ------------------ | --------- |
| v-model        | 当前分值                   | `number`           | `0`       |
| icon           | 选中时的图标名称           | `string`           | `star`    |
| void-icon      | 未选中时的图标名称         | `string`           | `star-o`  |
| count          | 图标总数                   | `number`           | `5`       |
| size           | 图标大小                   | `string \| number` | -         |
| color          | 选中时的颜色               | `string`           | `primary` |
| void-color     | 未选中时的颜色             | `string`           | `#c8c9cc` |
| gutter         | 图标间距                   | `string \| number` | `8rpx`    |
| readonly       | 是否为只读状态             | `boolean`          | `false`   |
| touchable      | 是否可通过滑动手势选择评分 | `boolean`          | `true`    |
| disabled       | 是否禁用                   | `boolean`          | `false`   |
| disabled-color | 禁用时的颜色               | `string`           | `#c8c9cc` |
| allow-half     | 是否允许半星               | `boolean`          | `false`   |
| icon-weight    | 图标粗细                   | `string \| number` | -         |
| custom-class   | 自定义类名                 | `string`           | -         |
| custom-style   | 自定义样式                 | `string \| object` | -         |

## Events

| 事件名 | 说明               | 回调参数        |
| ------ | ------------------ | --------------- |
| change | 当前分值变化时触发 | `value: number` |
