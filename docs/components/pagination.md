# Pagination 分页

分页组件，用于列表数据的分页加载。

## 基础用法

```vue
<template>
  <ui-pagination :list="list" :page="page" :page-size="pageSize" :total="total" :loading="loading" @load="onLoad" @refresh="onRefresh">
    <template #default="{ data }">
      <view v-for="item in data" :key="item.id" class="list-item">
        <text>{{ item.title }}</text>
      </view>
    </template>
  </ui-pagination>
</template>

<script setup>
import { ref, onMounted } from "vue"

const list = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(35)
const loading = ref(false)

function generateItems(pageNum, size) {
  const start = (pageNum - 1) * size
  return Array.from({ length: Math.min(size, total.value - start) }, (_, i) => ({
    id: start + i + 1,
    title: `列表项 ${start + i + 1}`,
  }))
}

function onLoad(pageNum, size) {
  loading.value = true
  setTimeout(() => {
    const newItems = generateItems(pageNum, size)
    list.value = [...list.value, ...newItems]
    page.value = pageNum
    loading.value = false
  }, 1000)
}

function onRefresh(pageNum, size) {
  loading.value = true
  setTimeout(() => {
    list.value = generateItems(pageNum, size)
    page.value = pageNum
    loading.value = false
  }, 1000)
}

onMounted(() => {
  onLoad(1, pageSize.value)
})
</script>
```

## Props

| 参数         | 说明           | 类型               | 默认值       |
| ------------ | -------------- | ------------------ | ------------ |
| list         | 列表数据       | `array`            | `[]`         |
| page         | 当前页码       | `string \| number` | `1`          |
| page-size    | 每页条数       | `string \| number` | `10`         |
| total        | 总条数         | `string \| number` | `0`          |
| loading      | 是否加载中     | `boolean`          | `false`      |
| empty-text   | 空数据提示文字 | `string`           | `暂无数据～` |
| custom-class | 自定义类名     | `string`           | -            |
| custom-style | 自定义样式     | `string \| object` | -            |

## Events

| 事件名  | 说明           | 回调参数                         |
| ------- | -------------- | -------------------------------- |
| load    | 加载更多时触发 | `page: number, pageSize: number` |
| refresh | 下拉刷新时触发 | `page: number, pageSize: number` |

## Slots

| 名称    | 说明       | 参数              |
| ------- | ---------- | ----------------- |
| default | 列表内容   | `{ data: array }` |
| loading | 加载中内容 | -                 |
| empty   | 空数据内容 | -                 |


<!-- AUTO-PROPS-SUPPLEMENT: ui-pagination -->
## Pagination Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `empty-icon` |

