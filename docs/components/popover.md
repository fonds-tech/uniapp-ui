# Popover 气泡弹框

气泡弹框组件，用于展示操作菜单、提示信息等内容，支持多种弹出位置和主题风格。

## 基础用法

通过 `v-model:show` 控制气泡的显示与隐藏，`actions` 属性设置菜单选项。

```vue
<template>
  <ui-popover v-model:show="show" :actions="actions">
    <ui-button type="primary">点击弹出</ui-button>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [
  { text: "选项一" },
  { text: "选项二" },
  { text: "选项三" }
]
</script>
```

## 深色风格

通过 `theme` 属性设置主题风格，支持 `light`（浅色）和 `dark`（深色）两种。

```vue
<ui-popover v-model:show="show" :actions="actions" theme="dark">
  <ui-button type="primary">深色风格</ui-button>
</ui-popover>
```

## 弹出位置

通过 `placement` 属性设置气泡弹出的位置，支持 12 种位置：

- `top`、`top-start`、`top-end`：上方弹出
- `bottom`、`bottom-start`、`bottom-end`：下方弹出
- `left`、`left-start`、`left-end`：左侧弹出
- `right`、`right-start`、`right-end`：右侧弹出

```vue
<ui-popover v-model:show="show1" :actions="actions" placement="top">
  <ui-button>上方</ui-button>
</ui-popover>

<ui-popover v-model:show="show2" :actions="actions" placement="bottom-start">
  <ui-button>下左</ui-button>
</ui-popover>

<ui-popover v-model:show="show3" :actions="actions" placement="right">
  <ui-button>右侧</ui-button>
</ui-popover>
```

## 带图标的选项

通过在 `actions` 选项中设置 `icon` 属性，可以为选项添加图标。

```vue
<template>
  <ui-popover v-model:show="show" :actions="actions">
    <ui-button type="primary">带图标选项</ui-button>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [
  { text: "添加", icon: "add-circle" },
  { text: "编辑", icon: "edit" },
  { text: "删除", icon: "delete", color: "var(--ui-color-danger)" }
]
</script>
```

## 禁用选项

通过在 `actions` 选项中设置 `disabled` 属性，可以禁用该选项。

```vue
<template>
  <ui-popover v-model:show="show" :actions="actions">
    <ui-button type="primary">禁用选项</ui-button>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [
  { text: "选项一" },
  { text: "选项二", disabled: true },
  { text: "选项三" }
]
</script>
```

## 自定义内容

通过 `content` 插槽可以自定义气泡内容，替代默认的菜单选项。

```vue
<template>
  <ui-popover v-model:show="show">
    <ui-button type="primary">自定义内容</ui-button>
    <template #content>
      <view class="custom-content">
        <view class="title">提示信息</view>
        <view class="desc">这是自定义的气泡内容，可以放置任意元素。</view>
        <ui-button size="small" type="primary" @click="show = false">知道了</ui-button>
      </view>
    </template>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"
const show = ref(false)
</script>

<style scoped>
.custom-content {
  padding: 24rpx;
  min-width: 300rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
}
.desc {
  font-size: 28rpx;
  margin-bottom: 24rpx;
}
</style>
```

## 隐藏箭头

设置 `show-arrow` 为 `false` 可以隐藏气泡箭头。

```vue
<ui-popover v-model:show="show" :actions="actions" :show-arrow="false">
  <ui-button type="primary">隐藏箭头</ui-button>
</ui-popover>
```

## 选项事件

通过 `select` 事件可以监听选项的点击操作。

```vue
<template>
  <ui-popover v-model:show="show" :actions="actions" @select="onSelect">
    <ui-button type="primary">点击选项</ui-button>
  </ui-popover>
  <text>{{ selectedText }}</text>
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [
  { text: "选项一" },
  { text: "选项二" },
  { text: "选项三" }
]
const selectedText = ref("请点击选项")

function onSelect(action, index) {
  selectedText.value = `选中了: ${action.text} (索引: ${index})`
}
</script>
```

## 显示遮罩层

设置 `overlay` 为 `true` 可以显示遮罩层，通过 `overlay-opacity` 可以设置遮罩层透明度。

```vue
<ui-popover v-model:show="show" :actions="actions" overlay :overlay-opacity="0.5">
  <ui-button type="primary">显示遮罩</ui-button>
</ui-popover>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:show | 是否显示气泡 | `boolean` | `false` |
| actions | 选项列表 | `PopoverAction[]` | `[]` |
| placement | 弹出位置 | `PopoverPlacement` | `bottom` |
| theme | 主题风格 | `light \| dark` | `light` |
| trigger | 触发方式 | `click \| manual` | `click` |
| offset | 偏移量 [水平, 垂直] | `number[]` | `[]` |
| show-arrow | 是否显示箭头 | `boolean` | `true` |
| close-on-click-action | 点击选项后是否关闭 | `boolean` | `true` |
| close-on-click-outside | 点击外部区域是否关闭 | `boolean` | `true` |
| overlay | 是否显示遮罩层 | `boolean` | `false` |
| overlay-opacity | 遮罩层透明度 | `number` | `0` |
| duration | 动画时长（毫秒） | `number` | `300` |
| z-index | 元素层级 | `number` | - |
| border-radius | 圆角大小 | `string \| number` | `12rpx` |
| icon-size | 选项图标大小 | `string \| number` | `32rpx` |
| icon-color | 选项图标颜色 | `string` | - |
| text-size | 选项文字大小 | `string \| number` | - |
| text-color | 选项文字颜色 | `string` | - |
| custom-class | 自定义类名 | `string` | - |
| custom-style | 自定义样式 | `string \| object` | - |

### PopoverPlacement 可选值

| 值 | 说明 |
| --- | --- |
| top | 顶部居中 |
| top-start | 顶部左对齐 |
| top-end | 顶部右对齐 |
| bottom | 底部居中 |
| bottom-start | 底部左对齐 |
| bottom-end | 底部右对齐 |
| left | 左侧居中 |
| left-start | 左侧顶部对齐 |
| left-end | 左侧底部对齐 |
| right | 右侧居中 |
| right-start | 右侧顶部对齐 |
| right-end | 右侧底部对齐 |

### PopoverAction 数据结构

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | `string` |
| icon | 选项图标 | `string` |
| color | 选项颜色（同时作用于图标和文字） | `string` |
| disabled | 是否禁用 | `boolean` |
| className | 自定义类名 | `string` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:show | 显示状态变更时触发 | `show: boolean` |
| open | 打开气泡时触发 | - |
| opened | 打开动画结束时触发 | - |
| close | 关闭气泡时触发 | - |
| closed | 关闭动画结束时触发 | - |
| select | 点击选项时触发 | `action: PopoverAction, index: number` |
| click-overlay | 点击遮罩层时触发 | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发气泡显示的元素 |
| content | 自定义气泡内容，会覆盖 actions 选项 |

## 方法

通过 ref 可以获取到 Popover 实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开气泡 | - |
| close | 关闭气泡 | - |

```vue
<template>
  <ui-popover ref="popoverRef" :actions="actions" trigger="manual">
    <ui-button @click="popoverRef?.open()">手动控制</ui-button>
  </ui-popover>
</template>

<script setup>
import { ref } from "vue"

const popoverRef = ref(null)
const actions = [{ text: "选项一" }, { text: "选项二" }]
</script>
```

## 类型定义

```typescript
// 选项数据类型
interface PopoverAction {
  text: string
  icon?: string
  color?: string
  disabled?: boolean
  className?: string
}

// 弹出位置类型
type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

// 主题类型
type PopoverTheme = "light" | "dark"

// 触发方式类型
type PopoverTrigger = "click" | "manual"
```
