# Tabs 标签页

选项卡切换组件，用于在不同内容区域间切换。

## 基础用法

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
    <ui-tab title="标签三" />
  </ui-tabs>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)
</script>
```

## 通过名称匹配

通过 `name` 属性设置标签名称，用于匹配选中项。

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" name="a" />
    <ui-tab title="标签二" name="b" />
    <ui-tab title="标签三" name="c" />
  </ui-tabs>
</template>

<script setup>
const active = ref("a")
</script>
```

## 禁用标签

通过 `disabled` 属性禁用某个标签。

```vue
<template>
  <ui-tabs v-model="active">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" disabled />
    <ui-tab title="标签三" />
  </ui-tabs>
</template>
```

## 滑动标签

通过 `scrollable` 属性开启滑动模式，适用于标签较多的情况。

```vue
<template>
  <ui-tabs v-model="active" scrollable>
    <ui-tab v-for="i in 8" :key="i" :title="`标签 ${i}`" />
  </ui-tabs>
</template>
```

## 自定义样式

通过 `active-color` 属性自定义选中颜色。

```vue
<template>
  <ui-tabs v-model="active" active-color="#07c160">
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
  </ui-tabs>
</template>
```

## 底部边框

通过 `border-bottom` 属性显示底部边框。

```vue
<template>
  <ui-tabs v-model="active" border-bottom>
    <ui-tab title="标签一" />
    <ui-tab title="标签二" />
  </ui-tabs>
</template>
```

## Tabs Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中标签的索引 | `string \| number` | `0` |
| height | 标签栏高度 | `string \| number` | - |
| scrollable | 是否可滚动 | `boolean` | `true` |
| active-size | 选中标签字体大小 | `string \| number` | - |
| active-color | 选中标签颜色 | `string` | - |
| active-weight | 选中标签字重 | `string \| number` | - |
| inactive-size | 未选中标签字体大小 | `string \| number` | - |
| inactive-color | 未选中标签颜色 | `string` | - |
| inactive-weight | 未选中标签字重 | `string \| number` | - |
| line-color | 下划线颜色 | `string` | - |
| line-width | 下划线宽度 | `string \| number` | `40rpx` |
| line-height | 下划线高度 | `string \| number` | - |
| line-radius | 下划线圆角 | `string \| number` | - |
| show-line | 是否显示下划线 | `boolean` | `true` |
| tab-width | 标签宽度 | `string \| number` | - |
| background | 背景颜色 | `string` | - |
| duration | 切换动画时长(ms) | `string \| number` | `300` |
| border-bottom | 是否显示底部边框 | `boolean` | `false` |
| z-index | 层级 | `string \| number` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | `name: string \| number` |
| click-tab | 点击标签时触发 | `name: string \| number` |

## Tab Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标签标题 | `string` | - |
| name | 标签名称，用于匹配选中项 | `string \| number` | 当前索引 |
| disabled | 是否禁用标签 | `boolean` | `false` |
| dot | 是否显示圆点徽标 | `boolean` | `false` |
| badge | 徽标内容 | `string \| number` | - |

## Tabs Slots

| 名称 | 说明 |
| --- | --- |
| default | 标签页内容 |
