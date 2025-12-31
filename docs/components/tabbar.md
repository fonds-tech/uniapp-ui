# Tabbar 标签栏

底部标签栏组件，用于在不同页面间切换。

## 基础用法

```vue
<template>
  <ui-tabbar v-model="active">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
    <ui-tabbar-item icon="heart" text="收藏" />
    <ui-tabbar-item icon="person" text="我的" />
  </ui-tabbar>
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
  <ui-tabbar v-model="active">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" dot />
    <ui-tabbar-item icon="message" text="消息" badge="5" />
    <ui-tabbar-item icon="person" text="我的" badge="99+" />
  </ui-tabbar>
</template>
```

## 自定义颜色

通过 `active-color` 和 `inactive-color` 自定义颜色。

```vue
<template>
  <ui-tabbar v-model="active" active-color="#07c160" inactive-color="#969799">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
    <ui-tabbar-item icon="heart" text="收藏" />
    <ui-tabbar-item icon="person" text="我的" />
  </ui-tabbar>
</template>
```

## 切换事件

通过 `change` 事件监听标签切换。

```vue
<template>
  <ui-tabbar v-model="active" @change="onChange">
    <ui-tabbar-item icon="home" text="首页" />
    <ui-tabbar-item icon="search" text="搜索" />
  </ui-tabbar>
</template>

<script setup>
function onChange(index) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>
```

## Tabbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前选中标签的索引 | `string \| number` | `0` |
| fixed | 是否固定定位 | `boolean` | `false` |
| border | 是否显示边框 | `boolean` | `true` |
| z-index | 层级 | `string \| number` | - |
| height | 高度 | `string \| number` | `100rpx` |
| background | 背景颜色 | `string` | `#ffffff` |
| active-color | 选中标签颜色 | `string` | - |
| inactive-color | 未选中标签颜色 | `string` | - |
| route | 是否开启路由模式 | `boolean` | `false` |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean` | `true` |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

## Tabbar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换标签时触发 | `name: string \| number` |

## TabbarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 标签名称，用于匹配选中项 | `string \| number` | 当前索引 |
| icon | 图标名称 | `string` | - |
| icon-prefix | 图标类名前缀 | `string` | - |
| text | 标签文字 | `string` | - |
| dot | 是否显示圆点徽标 | `boolean` | `false` |
| badge | 徽标内容 | `string \| number` | - |
| url | 跳转链接 | `string` | - |

## TabbarItem Slots

| 名称 | 说明 |
| --- | --- |
| icon | 自定义图标 |
