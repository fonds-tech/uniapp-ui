# List 列表

虚拟滚动列表组件，适用于长列表加载。

## 基础用法

```vue
<template>
  <ui-list :loading="loading" :finished="finished" @load="onLoad">
    <template #default="{ visibleData }">
      <view v-for="index in getRange(visibleData)" :key="index">
        列表项 {{ index }}
      </view>
    </template>
  </ui-list>
</template>

<script setup>
import { ref } from "vue"
const loading = ref(false)
const finished = ref(false)

function onLoad() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

function getRange({ start, end }) {
  return Array.from({ length: end - start }, (_, i) => i + start)
}
</script>
```

## Props

| 参数             | 说明                                   | 类型               | 默认值      |
| ---------------- | -------------------------------------- | ------------------ | ----------- |
| item-height      | 列表项高度（px）                       | `string \| number` | `50`        |
| buffer-size      | 缓冲区大小                             | `string \| number` | `5`         |
| loading          | 是否加载中                             | `boolean`          | `false`     |
| finished         | 是否加载完成                           | `boolean`          | `false`     |
| finished-text    | 加载完成文案                           | `string`           | `没有更多了` |
| loading-text     | 加载中文案                             | `string`           | `加载中...` |
| error-text       | 加载失败文案                           | `string`           | `加载失败，点击重试` |
| error            | 是否加载失败                           | `boolean`          | `false`     |
| offset           | 距离底部触发 load 的距离（px）        | `string \| number` | `300`       |
| immediate-check  | 初始化时是否立即检查                   | `boolean`          | `true`      |
| custom-class     | 自定义类名                             | `string`           | -           |
| custom-style     | 自定义样式                             | `string \| object` | -           |

## Events

| 事件名            | 说明                          | 回调参数 |
| ----------------- | ----------------------------- | -------- |
| load              | 触发加载时回调                | -        |
| update:loading    | 更新 loading 状态             | `value: boolean` |
| update:error      | 更新 error 状态               | `value: boolean` |

## Slots

| 名称       | 说明                                                     |
| ---------- | -------------------------------------------------------- |
| default    | 列表内容（作用域：visible-data, start-index, end-index）  |
| loading    | 加载中状态内容                                            |
| finished   | 加载完成状态内容                                          |
| error      | 加载失败状态内容                                          |

<!-- AUTO-METHODS-SUPPLEMENT: ui-list -->
## List Methods/Expose 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 方法/字段 |
| --- |
| `set-total-count` |
| `scroll-to` |
| `scroll-to-index` |

