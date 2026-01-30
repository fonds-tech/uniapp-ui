---
name: uniapp-ui-standards
description: uniapp-ui 组件库开发规范。在生成、编辑、审查或重构 Vue 组件、Props 定义或 SCSS 样式时自动应用。
---

# uniapp-ui 开发规范

本技能定义了 uniapp-ui 组件库的代码风格标准。

---

## 1. Vue 组件结构规范

### 1.1 文件结构顺序

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 1. 类型导入
// 2. 工具/hooks 导入
// 3. props/emits 定义导入
// 4. defineOptions
// 5. defineProps / defineEmits
// 6. useXxxProps 处理
// 7. 响应式变量 (ref/reactive)
// 8. 计算属性 (computed)
// 9. watch
// 10. 方法定义
// 11. 生命周期
// 12. defineExpose
</script>

<script lang="ts">
// 小程序组件配置（必须）
export default {
  name: "ui-xxx",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
/* 样式 */
</style>
```

### 1.2 导入顺序规范

```typescript
// ✅ 正确顺序
import type { CSSProperties } from "vue"          // 1. Vue 类型
import type { XxxType } from "./types"            // 2. 本地类型
import { ref, computed, watch } from "vue"        // 3. Vue 核心
import { useUnit, useColor, useStyle } from "../hooks"  // 4. Hooks
import { xxxProps, xxxEmits, useXxxProps } from "./index"  // 5. 组件定义
```

---

## 2. Props 定义规范

### 2.1 Props 文件结构 (`index.ts`)

```typescript
import type XxxComponent from "./ui-xxx.vue"
import type { PropType, ExtractPropTypes } from "vue"
import { createProps } from "../hooks"
import { styleProp, truthProp, [Number, String], makeStringProp, makeNumericProp } from "../utils/props"

// 类型定义（使用 type 而非 enum）
export type XxxSize = "mini" | "small" | "normal" | "medium" | "large"
export type XxxType = "primary" | "success" | "warning" | "danger" | "info" | "default"

// Props 定义（使用 createProps）
export const [xxxProps, useXxxProps] = createProps("xxx", {
  /**
   * 中文注释说明
   */
  size: makeStringProp<XxxSize>("normal"),
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 自定义样式
   */
  customStyle: styleProp,
})

// Emits 定义
export const xxxEmits = {
  click: (event: any) => true,
  change: (value: unknown) => true,
}

// 类型导出
export type XxxEmits = typeof xxxEmits
export type XxxProps = ExtractPropTypes<typeof xxxProps>
export type XxxInstance = InstanceType<typeof XxxComponent>
```

### 2.2 Props 工具函数

| 工具函数              | 用途               | 示例                                   |
| --------------------- | ------------------ | -------------------------------------- |
| `Boolean`             | 布尔值，默认 false | `disabled: Boolean`                    |
| `truthProp`           | 布尔值，默认 true  | `show: truthProp`                      |
| `[Number, String]`    | 数字或字符串       | `width: [Number, String]`              |
| `makeStringProp<T>()` | 字符串带默认值     | `size: makeStringProp<Size>("normal")` |
| `makeNumericProp()`   | 数字带默认值       | `throttle: makeNumericProp(200)`       |
| `makeNumberProp()`    | 纯数字带默认值     | `delay: makeNumberProp(0)`             |
| `styleProp`           | 样式属性           | `customStyle: styleProp`               |

---

## 3. 样式规范

### 3.1 BEM 命名规范

```scss
.ui-xxx {                    // Block
  &__element { }             // Element
  &--modifier { }            // Modifier

  // 组合使用
  &__content {
    &--active { }
  }
}
```

### 3.2 CSS 变量使用

```scss
.ui-xxx {
  // 尺寸
  height: var(--ui-size-normal);
  font-size: var(--ui-font-size-md);
  border-radius: var(--ui-radius-md);

  // 间距
  padding: var(--ui-spacing-sm);
  margin: var(--ui-spacing-md);

  // 颜色
  color: var(--ui-color-text-primary);
  background: var(--ui-color-primary);
  border-color: var(--ui-color-border);

  // 过渡
  transition: opacity var(--ui-transition-fast) var(--ui-transition-timing);

  // 状态
  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }
}
```

### 3.3 常用 CSS 变量速查

| 类别     | 变量                                                    | 说明     |
| -------- | ------------------------------------------------------- | -------- |
| **尺寸** | `--ui-size-{mini/small/normal/medium/large}`            | 组件高度 |
| **字号** | `--ui-font-size-{xs/sm/md/lg/xl}`                       | 字体大小 |
| **间距** | `--ui-spacing-{xs/sm/md/lg/xl}`                         | 间距     |
| **圆角** | `--ui-radius-{sm/md/lg/round}`                          | 圆角     |
| **颜色** | `--ui-color-{primary/success/warning/danger/info}`      | 主题色   |
| **文本** | `--ui-color-text-{main/secondary/placeholder/disabled}` | 文本色   |
| **边框** | `--ui-color-border{/-light/-dark}`                      | 边框色   |
| **背景** | `--ui-color-background{/-light/-dark}`                  | 背景色   |

---

## 4. Hooks 使用规范

### 4.1 常用 Hooks

```typescript
import {
  useUnit,      // 单位转换：useUnit(props.width) -> '100rpx'
  useColor,     // 颜色处理：useColor('primary') -> 'var(--ui-color-primary)'
  useStyle,     // 样式对象转字符串
  useParent,    // 获取父组件实例
  useChildren,  // 管理子组件
} from "../hooks"
```

### 4.2 样式计算模式

```typescript
const rootStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.width = useUnit(useProps.width)
  styles.height = useUnit(useProps.height)
  styles.color = useColor(useProps.color)
  styles.background = useColor(useProps.background)
  styles.borderRadius = useUnit(useProps.radius)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})
```

### 4.3 类名计算模式

```typescript
const rootClass = computed(() => {
  const classList: string[] = []
  classList.push(`ui-xxx--${useProps.type}`)
  classList.push(`ui-xxx--${useProps.size}`)
  if (useProps.disabled) classList.push("ui-xxx--disabled")
  if (useProps.loading) classList.push("ui-xxx--loading")
  return classList
})
```

---

## 5. TypeScript 规范

### 5.1 类型定义

```typescript
// ✅ 使用 type 而非 interface（除非需要扩展）
type ButtonSize = "small" | "medium" | "large"

// ✅ 使用联合类型而非 enum
type Status = "pending" | "success" | "error"

// ✅ CSSProperties 类型
import type { CSSProperties } from "vue"
const style: CSSProperties = {}
```

### 5.2 避免 any

```typescript
// ❌ 避免
const data: any = {}

// ✅ 使用 unknown 或具体类型
const data: unknown = {}
const event: Event = e
```

---

## 6. 注释规范

### 6.1 Props 注释

```typescript
export const [xxxProps, useXxxProps] = createProps("xxx", {
  /**
   * 按钮类型
   */
  type: makeStringProp<ButtonType>("primary"),
})
```

### 6.2 复杂逻辑注释

```typescript
// 检测 slot 是否有内容
const hasSlotContent = computed(() => !!slots.default)

// 创建节流函数实例
const throttledEmit = computed(() => createThrottle(+useProps.throttle))
```

---

## 7. 模板规范

### 7.1 属性绑定顺序

```vue
<view
  class="ui-xxx"
  :class="[rootClass, customClass]"
  :style="[rootStyle]"
  @click="handleClick"
>
```

### 7.2 条件渲染

```vue
<!-- ✅ 使用 v-if/v-else-if/v-else -->
<view v-if="isLoading" class="ui-xxx__loading">
  <ui-loading />
</view>
<view v-else-if="icon" class="ui-xxx__icon">
  <ui-icon :name="icon" />
</view>
<view v-else class="ui-xxx__content">
  <slot />
</view>
```

---

## 8. 检查清单

生成或审查代码时，确保以下要点：

- [ ] 使用 `<script setup lang="ts">`
- [ ] 使用 `defineOptions({ name: "ui-xxx" })`
- [ ] Props 使用 `createProps` 和工具函数
- [ ] 导入顺序正确（类型 → Vue → Hooks → 组件定义）
- [ ] 样式使用 CSS 变量，遵循 BEM 命名
- [ ] 使用 `useUnit`、`useColor`、`useStyle` 处理样式
- [ ] 复杂逻辑有中文注释
- [ ] 小程序配置 options 完整
- [ ] 无未说明的 `any` 类型
