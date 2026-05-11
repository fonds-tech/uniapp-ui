# Switch 开关

布尔状态切换控件。支持自定义值 / 文字 / 颜色 / 尺寸 / 异步控制。

## 基础用法

```vue
<template>
  <ui-switch v-model="checked" />
</template>

<script setup>
const checked = ref(false)
</script>
```

## 自定义颜色 / 尺寸

```vue
<ui-switch v-model="v" size="60rpx" active-color="success" inactive-color="border-light" />
```

## 自定义值

```vue
<ui-switch v-model="v" active-value="1" inactive-value="0" />
```

## 内嵌文字

```vue
<ui-switch v-model="v" size="56rpx" active-text="开" inactive-text="关" />
```

## 加载状态

```vue
<ui-switch v-model="v" loading />
```

## 自定义节点 slot

```vue
<ui-switch v-model="v">
  <template #node="{ checked }">
    <ui-icon :name="checked ? 'check' : 'close'" size="20rpx" />
  </template>
</ui-switch>
```

## 异步控制

```vue
<ui-switch v-model="v" :before-change="onBefore" :loading="loading" />

<script setup>
function onBefore(val, next) {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    next()  // 调用 next() 执行切换；不调则中止
  }, 1000)
}
</script>
```

`next` 接收可选参数改写切换值：`next("override")`。

## API

### Props

| 参数               | 说明                                | 类型                          | 默认值  |
| ------------------ | ----------------------------------- | ----------------------------- | ------- |
| v-model            | 开关状态                            | `number \| string \| boolean` | `false` |
| size               | 开关高度（width = 2 × size）        | `number \| string`            | `40rpx` |
| gutter             | 圆点与背景间距                      | `number \| string`            | `4rpx`  |
| loading            | 加载状态                            | `boolean`                     | `false` |
| disabled           | 禁用                                | `boolean`                     | `false` |
| active-value       | 打开时的值                          | `number \| string \| boolean` | `true`  |
| inactive-value     | 关闭时的值                          | `number \| string \| boolean` | `false` |
| active-color       | 打开背景色                          | `string`                      | -       |
| inactive-color     | 关闭背景色                          | `string`                      | -       |
| active-text        | 打开内嵌文字                        | `string`                      | -       |
| inactive-text      | 关闭内嵌文字                        | `string`                      | -       |
| text-size          | 文字大小                            | `number \| string`            | -       |
| text-color         | 文字颜色                            | `string`                      | -       |
| text-weight        | 文字粗细                            | `number \| string`            | -       |
| loading-icon-size  | 加载图标尺寸                        | `number \| string`            | -       |
| loading-icon-color | 加载图标颜色                        | `string`                      | -       |
| before-change      | 切换前拦截：`(value, next) => void` | `Function`                    | -       |
| custom-class       | 自定义类名                          | `string`                      | -       |
| custom-style       | 自定义样式                          | `string \| CSSProperties`     | -       |

### Events

| 事件名            | 说明     | 回调参数                             |
| ----------------- | -------- | ------------------------------------ |
| update:modelValue | v-model  | `value: number \| string \| boolean` |
| change            | 切换完成 | `value`                              |

### Slots

| 名称 | 说明           | 参数                   |
| ---- | -------------- | ---------------------- |
| node | 自定义圆点节点 | `{ checked: boolean }` |

### CSS 变量

| 名称                       | 说明               |
| -------------------------- | ------------------ |
| --ui-switch-size           | 高度（width = 2x） |
| --ui-switch-gutter         | 圆点与背景间距     |
| --ui-switch-color-active   | 激活背景色         |
| --ui-switch-color-inactive | 未激活背景色       |
| --ui-switch-node-color     | 圆点颜色           |
| --ui-switch-text-color     | 文字颜色           |
| --ui-switch-text-size      | 文字大小           |
