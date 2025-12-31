# Radio 单选框

用于在一组选项中进行单选操作。

## 基础用法

搭配 `ui-radio-group` 和 `ui-radio` 使用。

```vue
<template>
  <ui-radio-group v-model="value">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>

<script setup>
import { ref } from "vue"
const value = ref("1")
</script>
```

## 水平排列

默认情况下单选框组为水平排列。

```vue
<template>
  <ui-radio-group v-model="value">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
    <ui-radio name="3" label="选项三" />
  </ui-radio-group>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用单选框组。

```vue
<template>
  <ui-radio-group v-model="value" disabled>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 圆形样式

通过 `round` 属性设置圆形图标样式。

```vue
<template>
  <ui-radio-group v-model="value" round>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 圆点样式

通过 `shape="dot"` 设置圆点样式图标。

```vue
<template>
  <ui-radio-group v-model="value" shape="dot" round>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 自定义颜色

通过 `checked-icon-color` 自定义选中颜色。

```vue
<template>
  <ui-radio-group v-model="value" checked-icon-color="#07c160">
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```

## 左侧文本

通过 `label-left` 属性将文本显示在左侧。

```vue
<template>
  <ui-radio-group v-model="value" label-left>
    <ui-radio name="1" label="选项一" />
    <ui-radio name="2" label="选项二" />
  </ui-radio-group>
</template>
```
