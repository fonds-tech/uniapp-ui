# Stepper 步进器

用于对数量进行增减操作。

## 基础用法

```vue
<template>
  <ui-stepper v-model="value" />
</template>

<script setup>
import { ref } from "vue"
const value = ref(1)
</script>
```

## 步长设置

通过 `step` 属性设置每次点击增减的数量。

```vue
<template>
  <ui-stepper v-model="value" :step="2" />
</template>
```

## 限制范围

通过 `min` 和 `max` 属性限制允许的数值范围。

```vue
<template>
  <ui-stepper v-model="value" :min="5" :max="10" />
</template>
```

## 禁用状态

通过 `disabled` 属性禁用步进器。

```vue
<template>
  <ui-stepper v-model="value" disabled />
</template>
```

## 禁用输入

通过 `disabled-input` 属性禁用输入框，用户只能通过按钮操作。

```vue
<template>
  <ui-stepper v-model="value" disabled-input />
</template>
```

## 小数位数

通过 `decimal-length` 属性设置允许的小数位数。

```vue
<template>
  <ui-stepper v-model="value" :step="0.1" :decimal-length="1" />
</template>
```

## 圆角风格

通过 `theme="round"` 设置圆角风格的步进器。

```vue
<template>
  <ui-stepper v-model="value" theme="round" />
</template>
```

## 长按快速加减

通过 `long-press` 属性启用长按快速加减功能。

```vue
<template>
  <ui-stepper v-model="value" long-press />
</template>
```

## 自定义尺寸

通过 `height` 和 `input-width` 属性自定义步进器尺寸。

```vue
<template>
  <ui-stepper v-model="value" height="64rpx" input-width="80rpx" />
</template>
```
