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
