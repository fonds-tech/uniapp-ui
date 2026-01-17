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

| 参数                   | 说明                                        | 类型                                             | 默认值    |
| ---------------------- | ------------------------------------------- | ------------------------------------------------ | --------- |
| v-model                | 当前选中标签的名称或索引                    | `string \| number`                               | `0`       |
| fixed                  | 是否固定定位                                | `boolean`                                        | `true`    |
| border                 | 是否显示边框                                | `boolean`                                        | `false`   |
| placeholder            | 固定定位时是否生成占位元素                  | `boolean`                                        | `true`    |
| z-index                | 层级                                        | `string \| number`                               | -         |
| height                 | 高度                                        | `string \| number`                               | `100rpx`  |
| background             | 背景颜色                                    | `string`                                         | `#ffffff` |
| active-color           | 选中标签颜色                                | `string`                                         | -         |
| inactive-color         | 未选中标签颜色                              | `string`                                         | -         |
| route                  | 是否开启路由模式                            | `boolean`                                        | `false`   |
| safe-area-inset-bottom | 是否开启底部安全区                          | `boolean`                                        | `true`    |
| before-change          | 切换前的回调，返回 false 或 reject 阻止切换 | `(name: string \| number) => boolean \| Promise` | -         |
| custom-class           | 自定义类名                                  | `string`                                         | -         |
| custom-style           | 自定义样式                                  | `string \| object`                               | -         |

## Tabbar Events

| 事件名 | 说明           | 回调参数                 |
| ------ | -------------- | ------------------------ |
| change | 切换标签时触发 | `name: string \| number` |
| rect   | 获取尺寸时触发 | `rect: UniApp.NodeInfo`  |
| height | 高度变化时触发 | `height: number`         |

## Tabbar Methods

通过 ref 获取组件实例后调用。

| 方法名 | 说明                     | 参数 | 返回值 |
| ------ | ------------------------ | ---- | ------ |
| resize | 重新计算 tabbar 高度尺寸 | -    | -      |

## TabbarItem Props

| 参数           | 说明                                                            | 类型               | 默认值      |
| -------------- | --------------------------------------------------------------- | ------------------ | ----------- |
| name           | 标签名称，用于匹配选中项                                        | `string \| number` | 当前索引    |
| text           | 标签文字                                                        | `string`           | -           |
| icon           | 图标名称或图片链接                                              | `string`           | -           |
| active-icon    | 激活时的图标                                                    | `string`           | -           |
| icon-size      | 图标大小                                                        | `string \| number` | `48rpx`     |
| icon-weight    | 图标粗细                                                        | `string \| number` | -           |
| icon-prefix    | 图标类名前缀                                                    | `string`           | -           |
| dot            | 是否显示圆点徽标                                                | `boolean`          | `false`     |
| badge          | 徽标内容                                                        | `string \| number` | -           |
| disabled       | 是否禁用                                                        | `boolean`          | `false`     |
| active-color   | 选中颜色（优先级高于父组件）                                    | `string`           | -           |
| inactive-color | 未选中颜色（优先级高于父组件）                                  | `string`           | -           |
| route          | 跳转路由                                                        | `string`           | -           |
| route-params   | 跳转参数                                                        | `object`           | `{}`        |
| route-type     | 跳转类型，可选 `switchTab` `navigateTo` `redirectTo` `reLaunch` | `string`           | `switchTab` |
| custom-class   | 自定义类名                                                      | `string`           | -           |
| custom-style   | 自定义样式                                                      | `string \| object` | -           |

## TabbarItem Events

| 事件名 | 说明       | 回调参数                 |
| ------ | ---------- | ------------------------ |
| click  | 点击时触发 | `name: string \| number` |

## TabbarItem Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| default | 自定义文字内容             |
| icon    | 自定义图标                 |
| extra   | 额外内容（如自定义徽标等） |
