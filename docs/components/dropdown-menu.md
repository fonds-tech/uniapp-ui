# DropdownMenu 下拉菜单

下拉菜单组件，用于筛选和排序。

## 基础用法

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value1" title="全部商品" :options="options1" />
    <ui-dropdown-item v-model="value2" title="默认排序" :options="options2" />
  </ui-dropdown-menu>
</template>

<script setup>
import { ref } from "vue"

const value1 = ref("")
const value2 = ref("")

const options1 = [
  { label: "全部商品", value: "all" },
  { label: "新款商品", value: "new" },
  { label: "热销商品", value: "hot" },
]

const options2 = [
  { label: "默认排序", value: "default" },
  { label: "价格从低到高", value: "price-asc" },
  { label: "价格从高到低", value: "price-desc" },
]
</script>
```

## 多选模式

通过 `mode="multiple"` 开启多选模式。

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value" title="筛选" mode="multiple" :options="options" />
  </ui-dropdown-menu>
</template>

<script setup>
const value = ref([])
const options = [
  { label: "包邮", value: "free-shipping" },
  { label: "有货", value: "in-stock" },
  { label: "促销", value: "promotion" },
]
</script>
```

## 自定义颜色

通过 `active-title-color` 属性自定义选中颜色。

```vue
<template>
  <ui-dropdown-menu active-title-color="#07c160">
    <ui-dropdown-item v-model="value" title="全部商品" :options="options" />
  </ui-dropdown-menu>
</template>
```

## 向上弹出

通过 `direction="up"` 设置向上弹出。

```vue
<template>
  <ui-dropdown-menu direction="up">
    <ui-dropdown-item v-model="value" title="全部商品" :options="options" />
  </ui-dropdown-menu>
</template>
```

## 禁用状态

通过 `disabled` 属性禁用某个下拉项。

```vue
<template>
  <ui-dropdown-menu>
    <ui-dropdown-item v-model="value1" title="全部商品" :options="options1" />
    <ui-dropdown-item v-model="value2" title="默认排序" :options="options2" disabled />
  </ui-dropdown-menu>
</template>
```
