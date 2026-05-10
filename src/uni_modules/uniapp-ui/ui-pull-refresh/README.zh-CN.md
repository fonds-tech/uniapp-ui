# UiPullRefresh 组件

## 介绍

UiPullRefresh 下拉刷新组件。在页面顶部下拉触发刷新，配合异步任务完成后将 `v-model` 置 `false` 收起。

> ⚠️ 仅在**页面级滚动**到顶部时可触发，嵌套在 `scroll-view` 内部不可用。如需在 scroll-view 内做下拉刷新，请使用平台原生方案。

## 代码演示

```vue
<template>
  <ui-pull-refresh v-model="loading" @refresh="onRefresh">
    <view v-for="item in list" :key="item">{{ item }}</view>
  </ui-pull-refresh>
</template>

<script setup>
const loading = ref(false)
const list = ref(["A", "B", "C"])

function onRefresh() {
  setTimeout(() => {
    list.value = list.value.map((x) => `${x} (refreshed)`)
    loading.value = false
  }, 1000)
}
</script>
```

## Props

| 参数               | 说明                                          | 类型             | 默认值          |
| ------------------ | --------------------------------------------- | ---------------- | --------------- |
| modelValue         | 加载中状态 (v-model)                          | boolean          | false           |
| pullingText        | 下拉中提示文案                                | string           | "下拉即可刷新..." |
| loosingText        | 释放可刷新提示文案                            | string           | "释放即可刷新..." |
| loadingText        | 加载中提示文案                                | string           | "加载中..."     |
| successText        | 刷新成功提示文案 (空字符串关闭成功提示)       | string           | "刷新成功"      |
| successDuration    | 成功提示展示时长 (ms)                         | number           | 500             |
| headHeight         | 头部高度 (px)，未传走 SCSS 默认 50            | string \| number | -               |
| disabled           | 禁用下拉刷新                                  | boolean          | false           |
| pullDistance       | 触发刷新阈值 (px)，未传等于 headHeight        | string \| number | -               |
| animationDuration  | 头部展开/收起动画时长 (ms)                    | number           | 300             |
| customClass        | 自定义类名                                    | string           | -               |
| customStyle        | 自定义样式                                    | string \| object | -               |

## Events

| 事件名             | 说明                       | 回调参数                         |
| ------------------ | -------------------------- | -------------------------------- |
| update:modelValue  | modelValue 双向绑定         | value: boolean                   |
| refresh            | 达到阈值释放后触发         | -                                |
| change             | 状态变化                   | status: PullRefreshStatus        |

## Slots

| 名称    | 说明           | 作用域参数              |
| ------- | -------------- | ----------------------- |
| default | 列表内容       | -                       |
| normal  | 静止态头部     | -                       |
| pulling | 下拉中头部     | { distance: number }    |
| loosing | 释放可刷新头部 | { distance: number }    |
| loading | 加载中头部     | -                       |
| success | 刷新成功头部   | -                       |

## 类型定义

```typescript
type PullRefreshStatus = "normal" | "pulling" | "loosing" | "loading" | "success"
```

## 注意事项

- 阻尼系数固定 `0.5`：手指拉 100px → 头部展开 50px
- 释放后若未达 `pullDistance` 阈值，回到 normal 不触发 refresh
- 父组件**异步任务结束后必须将 `modelValue` 置 `false`**，否则一直处于 loading
- 头部 `transform: translateY(-100%)` 隐藏在视区外，下拉时 track 整体下移露出
