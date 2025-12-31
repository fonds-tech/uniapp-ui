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
