# Sticky 粘性布局

粘性布局组件，使元素在滚动时固定在指定位置。

## 基础用法

向下滚动页面时，组件会固定在顶部。

```vue
<template>
  <ui-sticky>
    <ui-button type="primary" block>基础用法</ui-button>
  </ui-sticky>
</template>
```

## 吸顶距离

通过 `offset-top` 属性设置距离顶部的偏移量。

```vue
<template>
  <ui-sticky offset-top="100rpx">
    <ui-button type="success" block>吸顶距离 100rpx</ui-button>
  </ui-sticky>
</template>
```

## 自定义背景

通过 `background` 属性设置吸顶时的背景颜色。

```vue
<template>
  <ui-sticky background="#fff">
    <view class="content">吸顶内容</view>
  </ui-sticky>
</template>
```

## 子组件中使用

在子组件中使用时，需要在页面的 `onPageScroll` 中传递 `scrollTop`。

```vue
<!-- 页面组件 -->
<template>
  <my-component :scroll-top="scrollTop" />
</template>

<script setup>
import { ref } from "vue"

const scrollTop = ref(0)

onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})
</script>
```

```vue
<!-- 子组件 my-component.vue -->
<template>
  <ui-sticky :scroll-top="scrollTop">
    <view>子组件中的吸顶内容</view>
  </ui-sticky>
</template>

<script setup>
defineProps({
  scrollTop: Number,
})
</script>
```

## 禁用粘性

通过 `disabled` 属性禁用粘性效果。

```vue
<template>
  <ui-sticky :disabled="isDisabled">
    <ui-button type="primary" block>可控制禁用</ui-button>
  </ui-sticky>
</template>

<script setup>
import { ref } from "vue"
const isDisabled = ref(false)
</script>
```

## 监听滚动状态

通过 `scroll` 事件获取滚动信息。

```vue
<template>
  <ui-sticky @scroll="onScroll" @change="onChange">
    <ui-button type="primary" block>监听状态</ui-button>
  </ui-sticky>
</template>

<script setup>
function onScroll({ scrollTop, isFixed }) {
  console.log("scrollTop:", scrollTop, "isFixed:", isFixed)
}

function onChange(isFixed) {
  console.log("吸顶状态:", isFixed ? "已吸顶" : "未吸顶")
}
</script>
```

## Props

| 参数         | 说明                               | 类型               | 默认值  |
| ------------ | ---------------------------------- | ------------------ | ------- |
| offset-top   | 吸顶时距离顶部的距离               | `string \| number` | `0`     |
| scroll-top   | 外部传入的滚动距离，用于子组件场景 | `string \| number` | -       |
| disabled     | 是否禁用粘性效果                   | `boolean`          | `false` |
| z-index      | 层级                               | `string \| number` | `99`    |
| background   | 背景颜色                           | `string`           | -       |
| custom-class | 自定义类名                         | `string`           | -       |
| custom-style | 自定义样式                         | `string \| object` | -       |

## Events

| 事件名 | 说明               | 回调参数                                  |
| ------ | ------------------ | ----------------------------------------- |
| change | 吸顶状态变化时触发 | `isFixed: boolean`                        |
| scroll | 滚动时触发         | `{ scrollTop: number, isFixed: boolean }` |

## Methods

通过 ref 调用组件方法：

| 方法名  | 说明             | 参数 |
| ------- | ---------------- | ---- |
| resize  | 重新计算组件位置 | -    |
| isFixed | 获取当前吸顶状态 | -    |

## Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 需要吸顶的内容 |

## 注意事项

1. **页面组件中使用**：直接使用即可，组件会自动监听页面滚动。

2. **子组件中使用**：由于 `onPageScroll` 只在页面组件中生效，需要在页面中监听滚动并通过 `scroll-top` 属性传递给组件。

3. **scroll-view 中使用**：在 `scroll-view` 中使用时，需要监听 `@scroll` 事件并传递 `scrollTop`：

```vue
<template>
  <scroll-view scroll-y @scroll="onScroll">
    <ui-sticky :scroll-top="scrollTop">
      <view>吸顶内容</view>
    </ui-sticky>
  </scroll-view>
</template>

<script setup>
import { ref } from "vue"

const scrollTop = ref(0)

function onScroll(e) {
  scrollTop.value = e.detail.scrollTop
}
</script>
```
