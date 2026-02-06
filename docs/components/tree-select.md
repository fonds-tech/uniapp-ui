# TreeSelect 树形选择

用于多级分类选择的树形选择器。

## 基础用法

```vue
<template>
  <ui-tree-select :items="items" v-model:mainActiveIndex="activeIndex" v-model:activeId="activeId" />
</template>

<script setup>
import { ref } from "vue"

const activeIndex = ref(0)
const activeId = ref([])
const items = ref([
  { text: "分类 1", children: [{ id: 1, text: "选项 1" }] },
  { text: "分类 2", children: [{ id: 2, text: "选项 2" }] },
])
</script>
```

## Props

| 参数               | 说明                         | 类型                              | 默认值 |
| ------------------ | ---------------------------- | --------------------------------- | ------ |
| items              | 分类数据数组                 | `TreeSelectItem[]`                | `[]`   |
| main-active-index  | 左侧选中项索引               | `string \| number`                 | `0`    |
| active-id          | 右侧选中项 id（支持数组多选） | `number \| string \| (number \| string)[]` | - |
| max                | 右侧最多选中个数             | `string \| number`                 | `Infinity` |
| height             | 组件高度                     | `string \| number`                 | `600rpx` |
| selected-icon      | 选中图标                     | `string`                          | `check` |
| custom-class       | 自定义类名                   | `string`                          | -      |
| custom-style       | 自定义样式                   | `string \| object`                 | -      |

## Events

| 事件名                 | 说明                 | 回调参数 |
| ---------------------- | -------------------- | -------- |
| update:mainActiveIndex | 更新左侧索引         | `index: string \| number` |
| update:activeId        | 更新右侧选中项       | `id: ActiveIdType` |
| click-nav              | 点击左侧导航触发     | `index: number` |
| click-item             | 点击右侧选项触发     | `item: TreeSelectChild` |

## Slots

| 名称      | 说明                                             |
| --------- | ------------------------------------------------ |
| nav-text  | 左侧导航项文本（作用域：item, index, active）    |
| content   | 右侧内容区域                                     |
| item      | 右侧选项（作用域：item, active）                 |

## TreeSelectItem

| 参数      | 说明       | 类型                |
| --------- | ---------- | ------------------- |
| text      | 分类文本   | `string`            |
| disabled  | 是否禁用   | `boolean`           |
| children  | 子项列表   | `TreeSelectChild[]` |

## TreeSelectChild

| 参数     | 说明       | 类型               |
| -------- | ---------- | ------------------ |
| id       | 唯一标识   | `string \| number` |
| text     | 子项文本   | `string`           |
| disabled | 是否禁用   | `boolean`          |