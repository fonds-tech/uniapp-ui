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
