---
name: component-generator
description: 快速生成新组件的完整脚手架。当用户要求创建新组件时自动应用。
user_invocable: true
---

# 组件脚手架生成器

根据组件名称自动生成符合 uniapp-ui 规范的完整组件结构。

---

## 使用方式

用户输入示例：

- "创建一个 ui-avatar 组件"
- "新建 avatar 组件"
- "/component-generator avatar"

---

## 生成文件结构

```
src/uni_modules/uniapp-ui/ui-{name}/
├── index.ts          # Props/Emits 定义
└── ui-{name}.vue     # 组件模板
```

---

## 生成模板

### 1. index.ts 模板

```typescript
import type {Name} from "./ui-{name}.vue"
import type { ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"
import { styleProp, truthProp, [Number, String], makeStringProp, makeNumericProp } from "../utils/props"

// ===================== 类型定义 =====================

export type {Name}Size = "mini" | "small" | "normal" | "medium" | "large"

// ===================== Props 定义 =====================

const defaultProps = buildDefaultProps("{name}", {
  size: "normal",
  disabled: false,
  customClass: "",
  customStyle: "",
})

export const {name}Props = {
  /**
   * 尺寸
   */
  size: defaultProps("size", { type: String as PropType<{Name}Size> }),
  /**
   * 是否禁用
   */
  disabled: defaultProps("disabled", { type: Boolean }),
  /**
   * 自定义类名
   */
  customClass: defaultProps("customClass", { type: String }),
  /**
   * 自定义样式
   */
  customStyle: defaultProps("customStyle", { type: [String, Object] as PropType<string | CSSProperties> }),
}

// ===================== Emits 定义 =====================

export const {name}Emits = {
  click: (event: any) => true,
}

// ===================== 类型导出 =====================

export type {Name}Emits = typeof {name}Emits
export type {Name}Props = ExtractPropTypes<typeof {name}Props>
export type {Name}Instance = InstanceType<typeof {Name}>
```

### 2. ui-{name}.vue 模板

```vue
<template>
  <view class="ui-{name}" :class="[rootClass, customClass]" :style="[rootStyle]" @click="handleClick">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed } from "vue"
import { useUnit, useStyle } from "../hooks"
import { {name}Props, {name}Emits, use{Name}Props } from "./index"

// ===================== 组件配置 =====================

defineOptions({ name: "ui-{name}" })

// ===================== Props & Emits =====================

const props = defineProps({name}Props)
const emit = defineEmits({name}Emits)
const useProps = use{Name}Props(props)

// ===================== 计算属性 =====================

const rootClass = computed(() => {
  const classList: string[] = []
  classList.push(`ui-{name}--${useProps.size}`)
  if (useProps.disabled) classList.push("ui-{name}--disabled")
  return classList
})

const rootStyle = computed(() => {
  const styles: CSSProperties = {}
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})

// ===================== 事件处理 =====================

function handleClick(event: any) {
  if (useProps.disabled) return
  emit("click", event)
}
</script>

<script lang="ts">
export default {
  name: "ui-{name}",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-{name} {
  display: flex;
  align-items: center;
  justify-content: center;

  // 尺寸变体
  &--mini {
    height: var(--ui-size-mini);
    font-size: var(--ui-font-size-xs);
  }
  &--small {
    height: var(--ui-size-small);
    font-size: var(--ui-font-size-sm);
  }
  &--normal {
    height: var(--ui-size-normal);
    font-size: var(--ui-font-size-md);
  }
  &--medium {
    height: var(--ui-size-medium);
    font-size: var(--ui-font-size-md);
  }
  &--large {
    height: var(--ui-size-large);
    font-size: var(--ui-font-size-lg);
  }

  // 禁用状态
  &--disabled {
    opacity: var(--ui-opacity-disabled);
    pointer-events: none;
  }
}
</style>
```

---

## 生成后操作

1. **注册导出**：在 `src/uni_modules/uniapp-ui/index.ts` 中添加导出
2. **创建 Demo**（可选）：在 `src/pages/` 下创建演示页面
3. **执行格式化**：运行 `pnpm run format && pnpm run lint:fix`

---

## 命名转换规则

| 输入        | kebab-case  | PascalCase | camelCase  |
| ----------- | ----------- | ---------- | ---------- |
| avatar      | avatar      | Avatar     | avatar     |
| date-picker | date-picker | DatePicker | datePicker |
| number-roll | number-roll | NumberRoll | numberRoll |

---

## 检查清单

生成组件后确保：

- [ ] index.ts 中 Props 注释完整
- [ ] vue 文件包含 `defineOptions({ name: "ui-xxx" })`
- [ ] 小程序 options 配置完整
- [ ] 样式使用 CSS 变量
- [ ] 已在主入口 index.ts 中导出
