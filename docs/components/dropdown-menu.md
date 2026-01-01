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

## DropdownMenu Props

| 参数                   | 说明             | 类型               | 默认值       |
| ---------------------- | ---------------- | ------------------ | ------------ |
| height                 | 菜单高度         | `string \| number` | -            |
| direction              | 菜单展开方向     | `up \| down`       | `down`       |
| title-color            | 标题颜色         | `string`           | -            |
| title-size             | 标题大小         | `string \| number` | -            |
| active-title-color     | 选中标题颜色     | `string`           | -            |
| icon                   | 图标名称         | `string`           | `arrow-down` |
| icon-size              | 图标大小         | `string \| number` | -            |
| icon-color             | 图标颜色         | `string`           | -            |
| show-icon              | 是否显示图标     | `boolean`          | `true`       |
| overlay                | 是否显示遮罩层   | `boolean`          | `true`       |
| duration               | 动画时长(ms)     | `string \| number` | `300`        |
| z-index                | 层级             | `string \| number` | -            |
| border-radius          | 选项菜单圆角     | `string \| number` | -            |
| close-on-click-overlay | 点击遮罩是否关闭 | `boolean`          | `true`       |
| label-field            | 选项名称字段     | `string`           | `label`      |
| value-field            | 选项值字段       | `string`           | `value`      |
| background             | 背景颜色         | `string`           | -            |
| custom-class           | 自定义类名       | `string`           | -            |
| custom-style           | 自定义样式       | `string \| object` | -            |

## DropdownItem Props

| 参数     | 说明       | 类型                 | 默认值   |
| -------- | ---------- | -------------------- | -------- |
| v-model  | 当前选中值 | `any`                | -        |
| title    | 标题       | `string`             | -        |
| options  | 选项数组   | `array`              | `[]`     |
| mode     | 选择模式   | `single \| multiple` | `single` |
| disabled | 是否禁用   | `boolean`            | `false`  |

## DropdownItem Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| change | 选中值变化时触发 | `value`  |
| open   | 打开菜单时触发   | -        |
| close  | 关闭菜单时触发   | -        |

## DropdownItem Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义菜单内容 |
| title   | 自定义标题     |
