# ActionSheet 动作面板

底部弹出式操作菜单，用于提供多个操作选项。

## 基础用法

```vue
<template>
  <ui-button type="primary" @click="show = true">基础用法</ui-button>
  <ui-action-sheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<script setup>
import { ref } from "vue"

const show = ref(false)
const actions = [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }]

function onSelect(action, index) {
  uni.showToast({ title: action.name, icon: "none" })
}
</script>
```

## 展示取消按钮

通过 `cancel-text` 属性设置取消按钮文字。

```vue
<template>
  <ui-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" @cancel="onCancel" />
</template>
```

## 展示描述信息

通过 `description` 属性设置描述信息。

```vue
<template>
  <ui-action-sheet v-model:show="show" :actions="actions" description="这是一段描述信息" cancel-text="取消" />
</template>
```

## 选项状态

支持设置选项的颜色、禁用和加载状态。

```vue
<script setup>
const actions = [
  { name: "着色选项", color: "#ee0a24" },
  { name: "禁用选项", disabled: true },
  { name: "加载选项", loading: true },
]
</script>
```

## 自定义标题

通过 `title` 属性设置标题。

```vue
<template>
  <ui-action-sheet v-model:show="show" :actions="actions" title="标题" cancel-text="取消" />
</template>
```

## Props

| 参数                   | 说明               | 类型                  | 默认值  |
| ---------------------- | ------------------ | --------------------- | ------- |
| v-model:show           | 是否显示           | `boolean`             | `false` |
| actions                | 操作项列表         | `ActionSheetAction[]` | `[]`    |
| title                  | 标题               | `string`              | -       |
| description            | 描述信息           | `string`              | -       |
| cancel-text            | 取消按钮文字       | `string`              | `取消`  |
| close-on-click-action  | 点击选项后是否关闭 | `boolean`             | `true`  |
| close-on-click-overlay | 点击遮罩是否关闭   | `boolean`             | `true`  |
| overlay                | 是否显示遮罩层     | `boolean`             | `true`  |
| duration               | 动画时长(ms)       | `string \| number`    | `300`   |
| z-index                | 层级               | `string \| number`    | -       |
| border-radius          | 圆角大小           | `string \| number`    | -       |
| safe-area-inset-bottom | 是否开启底部安全区 | `boolean`             | `true`  |
| before-close           | 关闭前的回调函数   | `function`            | -       |
| custom-class           | 自定义类名         | `string`              | -       |
| custom-style           | 自定义样式         | `string \| object`    | -       |

## ActionSheetAction 数据结构

| 参数        | 说明           | 类型      |
| ----------- | -------------- | --------- |
| title       | 选项标题       | `string`  |
| description | 选项描述       | `string`  |
| color       | 选项颜色       | `string`  |
| loading     | 是否为加载状态 | `boolean` |
| disabled    | 是否为禁用状态 | `boolean` |

## Events

| 事件名 | 说明               | 回调参数                        |
| ------ | ------------------ | ------------------------------- |
| select | 点击选项时触发     | `action: object, index: number` |
| cancel | 点击取消按钮时触发 | -                               |
| open   | 打开时触发         | -                               |
| opened | 打开动画结束时触发 | -                               |
| close  | 关闭时触发         | -                               |
| closed | 关闭动画结束时触发 | -                               |

## Slots

| 名称        | 说明           |
| ----------- | -------------- |
| default     | 自定义面板内容 |
| description | 自定义描述     |
| cancel      | 自定义取消按钮 |


<!-- AUTO-PROPS-SUPPLEMENT: ui-action-sheet -->
## ActionSheet Props 补充（源码新增）

以下参数已在最新源码中支持，本文档补充如下：

| 参数 |
| --- |
| `show` |
| `height` |
| `max-height` |
| `title-size` |
| `title-color` |
| `title-weight` |
| `description-size` |
| `description-color` |
| `description-weight` |
| `show-cancel` |
| `cancel-text-size` |
| `cancel-text-color` |
| `cancel-text-weight` |
| `cancel-background` |
| `action-title-style` |
| `action-description-style` |
| `overlay-style` |
| `lazy-render` |

<!-- AUTO-SLOTS-SUPPLEMENT: ui-action-sheet -->
## ActionSheet Slots 补充（源码新增）

以下能力已在最新源码中提供，补充如下：

| 插槽名 |
| --- |
| `header` |

