# PullRefresh 下拉刷新

用于提供下拉刷新的交互操作，常用于列表数据的刷新场景。

## 基础用法

通过 `v-model` 绑定加载状态，下拉刷新时会触发 `refresh` 事件，在事件回调中完成数据请求后，将 `v-model` 设置为 `false` 即可结束刷新。

```vue
<template>
  <ui-pull-refresh v-model="loading" @refresh="onRefresh">
    <view class="list">
      <view v-for="item in list" :key="item" class="list-item">
        {{ item }}
      </view>
    </view>
  </ui-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const list = ref(['项目 1', '项目 2', '项目 3', '项目 4', '项目 5'])

function onRefresh() {
  // 模拟异步请求
  setTimeout(() => {
    list.value = list.value.map((_, i) => `项目 ${i + 1} (已刷新)`)
    loading.value = false
  }, 1500)
}
</script>
```

## 成功提示

通过 `success-text` 可以设置刷新成功后的提示文案，通过 `success-duration` 可以设置提示展示时长。

```vue
<template>
  <ui-pull-refresh
    v-model="loading"
    success-text="刷新成功"
    :success-duration="1000"
    @refresh="onRefresh"
  >
    <view class="list">
      <view v-for="item in list" :key="item" class="list-item">
        {{ item }}
      </view>
    </view>
  </ui-pull-refresh>
</template>
```

## 自定义提示文案

通过 `pulling-text`、`loosing-text`、`loading-text` 和 `success-text` 可以分别设置下拉过程中各状态的提示文案。

```vue
<template>
  <ui-pull-refresh
    v-model="loading"
    pulling-text="继续下拉..."
    loosing-text="松开刷新"
    loading-text="正在刷新数据..."
    success-text="数据已更新"
    @refresh="onRefresh"
  >
    <view class="list">
      <!-- 列表内容 -->
    </view>
  </ui-pull-refresh>
</template>
```

## 自定义插槽

通过插槽可以完全自定义下拉刷新各个状态的显示内容。`pulling` 和 `loosing` 插槽会传入当前下拉距离 `distance` 参数，可用于实现动态效果。

```vue
<template>
  <ui-pull-refresh v-model="loading" @refresh="onRefresh">
    <!-- 下拉过程中（未达阈值） -->
    <template #pulling="{ distance }">
      <view class="custom-tip">
        <view
          class="custom-icon"
          :style="{ transform: `rotate(${Math.min(distance * 2, 180)}deg)` }"
        >
          ↓
        </view>
        <text>下拉距离: {{ Math.round(distance) }}px</text>
      </view>
    </template>

    <!-- 下拉过程中（已达阈值） -->
    <template #loosing>
      <view class="custom-tip">
        <view class="custom-icon" style="transform: rotate(180deg)">↓</view>
        <text>释放刷新</text>
      </view>
    </template>

    <!-- 加载中 -->
    <template #loading>
      <view class="custom-tip">
        <ui-loading size="32rpx" color="primary" />
        <text>努力加载中...</text>
      </view>
    </template>

    <!-- 刷新成功 -->
    <template #success>
      <view class="custom-tip custom-tip--success">
        <text>加载成功</text>
      </view>
    </template>

    <!-- 列表内容 -->
    <view class="list">
      <view v-for="item in list" :key="item" class="list-item">
        {{ item }}
      </view>
    </view>
  </ui-pull-refresh>
</template>

<style lang="scss" scoped>
.custom-tip {
  gap: 16rpx;
  display: flex;
  font-size: 26rpx;
  align-items: center;
  justify-content: center;

  &--success {
    color: var(--ui-color-success);
  }
}

.custom-icon {
  font-size: 32rpx;
  transition: transform 0.3s;
}
</style>
```

## 禁用状态

通过 `disabled` 属性可以禁用下拉刷新功能。

```vue
<template>
  <ui-pull-refresh v-model="loading" disabled @refresh="onRefresh">
    <view class="list">
      <!-- 列表内容 -->
    </view>
  </ui-pull-refresh>
</template>
```

## 自定义触发距离

通过 `pull-distance` 属性可以设置触发刷新的下拉距离阈值，默认等于 `head-height`（顶部内容高度）。

```vue
<template>
  <ui-pull-refresh
    v-model="loading"
    :head-height="60"
    :pull-distance="80"
    @refresh="onRefresh"
  >
    <view class="list">
      <!-- 列表内容 -->
    </view>
  </ui-pull-refresh>
</template>
```

## Props

| 参数               | 说明                              | 类型               | 默认值                |
| ------------------ | --------------------------------- | ------------------ | --------------------- |
| v-model            | 是否处于加载中状态                | `boolean`          | `false`               |
| pulling-text       | 下拉过程中（未达阈值）的提示文案  | `string`           | `下拉即可刷新...`     |
| loosing-text       | 下拉过程中（已达阈值）的提示文案  | `string`           | `释放即可刷新...`     |
| loading-text       | 加载过程中的提示文案              | `string`           | `加载中...`           |
| success-text       | 刷新成功的提示文案                | `string`           | `刷新成功`            |
| success-duration   | 刷新成功提示展示时长（毫秒）      | `number \| string` | `500`                 |
| head-height        | 顶部内容高度（单位 px）           | `number \| string` | `50`                  |
| pull-distance      | 触发刷新的下拉距离阈值（单位 px） | `number \| string` | 与 `head-height` 相同 |
| animation-duration | 动画持续时间（毫秒）              | `number \| string` | `300`                 |
| disabled           | 是否禁用下拉刷新                  | `boolean`          | `false`               |
| custom-class       | 自定义类名                        | `string`           | -                     |
| custom-style       | 自定义样式                        | `string \| object` | -                     |

## Events

| 事件名            | 说明               | 回调参数                    |
| ----------------- | ------------------ | --------------------------- |
| refresh           | 下拉刷新触发时     | -                           |
| change            | 状态变化时触发     | `status: PullRefreshStatus` |
| update:modelValue | 加载状态变化时触发 | `value: boolean`            |

### PullRefreshStatus 类型说明

| 值        | 说明                   |
| --------- | ---------------------- |
| `normal`  | 正常状态               |
| `pulling` | 下拉中（未达触发阈值） |
| `loosing` | 下拉中（已达触发阈值） |
| `loading` | 加载中                 |
| `success` | 刷新成功               |

## Slots

| 名称    | 说明                             | 参数                   |
| ------- | -------------------------------- | ---------------------- |
| default | 自定义内容                       | -                      |
| normal  | 正常状态时的提示内容             | -                      |
| pulling | 下拉过程中（未达阈值）的提示内容 | `{ distance: number }` |
| loosing | 下拉过程中（已达阈值）的提示内容 | `{ distance: number }` |
| loading | 加载过程中的提示内容             | -                      |
| success | 刷新成功的提示内容               | -                      |

## 注意事项

1. **页面滚动**：组件需要在页面顶部时才能触发下拉刷新。如果页面有滚动偏移，下拉时会先滚动页面而非触发刷新。

2. **阻尼效果**：下拉时存在阻尼效果，实际下拉距离会小于手指移动距离，最大下拉距离为 `head-height` 的 2 倍。

3. **异步操作**：在 `refresh` 事件回调中进行异步操作（如数据请求），完成后需手动将 `v-model` 设置为 `false` 以结束加载状态。

4. **跨平台兼容**：组件在 H5 和小程序平台上均可正常使用，内部已处理平台差异。
