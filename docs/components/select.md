# Select 选择器

下拉选择器组件，支持单列、多列和级联选择。

## 基础用法

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="请选择城市" />
</template>

<script setup>
import { ref } from "vue"

const value = ref("")
const cities = [
  { text: "北京", value: "beijing" },
  { text: "上海", value: "shanghai" },
  { text: "广州", value: "guangzhou" },
  { text: "深圳", value: "shenzhen" },
]
</script>
```

## 多列选择

通过传入多维数组实现多列选择。

```vue
<template>
  <ui-select v-model="value" :columns="timeColumns" placeholder="请选择时间" />
</template>

<script setup>
const timeColumns = [
  [
    { text: "上午", value: "am" },
    { text: "下午", value: "pm" },
  ],
  [
    { text: "9:00", value: "9" },
    { text: "10:00", value: "10" },
  ],
]
</script>
```

## 级联选择

通过 `children` 属性实现级联选择。

```vue
<template>
  <ui-select v-model="value" :columns="areaColumns" placeholder="请选择地区" />
</template>

<script setup>
const areaColumns = [
  {
    text: "浙江",
    value: "zhejiang",
    children: [
      { text: "杭州", value: "hangzhou" },
      { text: "宁波", value: "ningbo" },
    ],
  },
]
</script>
```

## 禁用状态

通过 `disabled` 属性禁用选择器。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="禁用状态" disabled />
</template>
```

## 只读状态

通过 `readonly` 属性设置为只读状态。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="只读状态" readonly />
</template>
```

## 自定义分隔符

通过 `display-separator` 属性自定义显示值的分隔符。

```vue
<template>
  <ui-select v-model="value" :columns="areaColumns" placeholder="请选择" display-separator=" - " />
</template>
```

## 带标题

通过 `title` 属性设置弹出层标题。

```vue
<template>
  <ui-select v-model="value" :columns="cities" placeholder="请选择城市" title="选择城市" />
</template>
```
