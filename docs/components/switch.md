# Switch 开关

开关选择器组件，用于在打开和关闭状态之间进行切换。

## 基础用法

```vue
<template>
  <ui-switch v-model="checked" />
</template>

<script setup>
import { ref } from "vue"
const checked = ref(false)
</script>
```

## 禁用状态

通过 `disabled` 属性禁用开关。

```vue
<ui-switch v-model="checked" disabled />
```

## 加载状态

通过 `loading` 属性设置加载状态，加载状态下开关不可点击。

```vue
<ui-switch v-model="checked" loading />
```

## 自定义大小

通过 `size` 属性设置开关大小。

```vue
<ui-switch v-model="checked" size="40rpx" />
<ui-switch v-model="checked" size="48rpx" />
<ui-switch v-model="checked" size="56rpx" />
```

## 自定义颜色

通过 `active-color` 和 `inactive-color` 属性设置开关的颜色。

```vue
<ui-switch v-model="checked" active-color="#ee0a24" />
<ui-switch v-model="checked" active-color="#07c160" />
<ui-switch v-model="checked" inactive-color="#dcdee0" />
```

## 显示文字

通过 `active-text` 和 `inactive-text` 属性设置开关打开和关闭时显示的文字。

```vue
<ui-switch v-model="checked" active-text="开" inactive-text="关" />
<ui-switch v-model="checked" active-text="ON" inactive-text="OFF" />
```

## 自定义值

通过 `active-value` 和 `inactive-value` 属性设置开关打开和关闭时对应的值。

```vue
<template>
  <ui-switch v-model="status" active-value="1" inactive-value="0" />
  <text>当前值: {{ status }}</text>
</template>

<script setup>
import { ref } from "vue"
const status = ref("0")
</script>
```

## 异步控制

通过 `before-change` 属性可以在切换前进行校验或异步操作。

```vue
<template>
  <ui-switch v-model="checked" :loading="loading" :before-change="beforeChange" />
</template>

<script setup>
import { ref } from "vue"

const checked = ref(false)
const loading = ref(false)

function beforeChange(value, next) {
  loading.value = true
  // 模拟异步请求
  setTimeout(() => {
    loading.value = false
    // 调用 next() 确认切换，调用 next(false) 可取消切换
    next()
  }, 1000)
}
</script>
```

## 自定义节点

通过 `node` 插槽可以自定义开关按钮的内容。

```vue
<ui-switch v-model="checked">
  <template #node="{ checked }">
    <ui-icon :name="checked ? 'check' : 'close'" size="24rpx" />
  </template>
</ui-switch>
```

## Props

| 参数               | 说明                 | 类型                          | 默认值  |
| ------------------ | -------------------- | ----------------------------- | ------- |
| v-model            | 开关状态             | `boolean \| string \| number` | `false` |
| size               | 开关大小             | `string \| number`            | `48rpx` |
| gutter             | 圆点与背景的间距     | `string \| number`            | `4rpx`  |
| loading            | 是否为加载状态       | `boolean`                     | `false` |
| disabled           | 是否为禁用状态       | `boolean`                     | `false` |
| active-value       | 打开时对应的值       | `boolean \| string \| number` | `true`  |
| inactive-value     | 关闭时对应的值       | `boolean \| string \| number` | `false` |
| active-color       | 打开时的背景色       | `string`                      | -       |
| inactive-color     | 关闭时的背景色       | `string`                      | -       |
| active-text        | 打开时显示的文字     | `string`                      | -       |
| inactive-text      | 关闭时显示的文字     | `string`                      | -       |
| loading-icon-size  | 加载图标大小         | `string \| number`            | -       |
| loading-icon-color | 加载图标颜色         | `string`                      | -       |
| before-change      | 状态变化前的回调函数 | `(value, next) => void`       | -       |
| custom-class       | 自定义类名           | `string`                      | -       |
| custom-style       | 自定义样式           | `string \| object`            | -       |

## Events

| 事件名 | 说明           | 回调参数                             |
| ------ | -------------- | ------------------------------------ |
| change | 状态变化时触发 | `value: boolean \| string \| number` |

## Slots

| 名称 | 说明               | 参数                   |
| ---- | ------------------ | ---------------------- |
| node | 自定义开关按钮内容 | `{ checked: boolean }` |
