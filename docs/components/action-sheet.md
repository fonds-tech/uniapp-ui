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
