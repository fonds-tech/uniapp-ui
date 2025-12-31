# Sidebar 侧边栏

侧边导航组件，用于分类内容切换。

## 基础用法

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>

<script setup>
import { ref } from "vue"
const active = ref(0)
</script>
```

## 徽标提示

通过 `dot` 属性显示圆点提示，`badge` 属性显示徽标数字。

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" dot />
    <ui-sidebar-item title="标签二" badge="5" />
    <ui-sidebar-item title="标签三" badge="20" />
  </ui-sidebar>
</template>
```

## 禁用选项

通过 `disabled` 属性禁用某个选项。

```vue
<template>
  <ui-sidebar v-model="active">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" disabled />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>
```

## 切换事件

通过 `change` 事件监听选项切换。

```vue
<template>
  <ui-sidebar v-model="active" @change="onChange">
    <ui-sidebar-item title="标签一" />
    <ui-sidebar-item title="标签二" />
    <ui-sidebar-item title="标签三" />
  </ui-sidebar>
</template>

<script setup>
function onChange(index) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>
```

## Sidebar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中项索引 | `string \| number` | `0` |
| width | 宽度 | `string \| number` | - |
| height | 高度 | `string \| number` | - |
| duration | 切换动画时长(ms) | `string \| number` | `300` |
| background | 背景颜色 | `string` | - |
| line-color | 激活线条颜色 | `string` | - |
| line-width | 激活线条宽度 | `string \| number` | - |
| line-height | 激活线条高度 | `string \| number` | `40rpx` |
| line-radius | 激活线条圆角 | `string \| number` | - |
| show-line | 是否显示线条 | `boolean` | `true` |
| auto-scroll | 是否自动滚动 | `boolean` | `true` |
| z-index | 层级 | `string \| number` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Sidebar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换选项时触发 | `name: string \| number` |
| click-item | 点击选项时触发 | `name: string \| number, index: number` |

## SidebarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| name | 标识符，用于匹配选中项 | `string \| number` | 当前索引 |
| disabled | 是否禁用 | `boolean` | `false` |
| dot | 是否显示圆点徽标 | `boolean` | `false` |
| badge | 徽标内容 | `string \| number` | - |
