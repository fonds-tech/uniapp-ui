# Tabs 标签页

选项卡切换组件，用于在不同内容区域间切换。

## 基础用法

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
    <ui-tab title="标签三" />
  </ui-tabs>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)
</script>
```

## 通过名称匹配

通过 `name` 属性设置标签名称，用于匹配选中项。

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" name="a" />
    <ui-tab title="标签二" name="b" />
    <ui-tab title="标签三" name="c" />
  </ui-tabs>
</template>

<script setup>
const active = ref("a")
</script>
```

## 禁用标签

通过 `disabled` 属性禁用某个标签。

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" disabled />
    <ui-tab title="标签三" />
  </ui-tabs>
</template>
```

## 滑动标签

通过 `scrollable` 属性开启滑动模式，适用于标签较多的情况。

```vue
<template>
  <ui-tabs v-model="active" scrollable>
    <ui-tab v-for="i in 8" :key="i" :title="`标签 ${i}`" />
  </ui-tabs>
</template>
```

## 自定义样式

通过 `active-color` 属性自定义选中颜色。

```vue
<template>
  <ui-tabs v-model="active" active-color="#07c160">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
  </ui-tabs>
</template>
```

## 底部边框

通过 `border-bottom` 属性显示底部边框。

```vue
<template>
  <ui-tabs v-model="active" border-bottom>
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
  </ui-tabs>
</template>
```
