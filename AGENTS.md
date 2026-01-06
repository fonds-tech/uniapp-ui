# AGENTS.md

## 项目概述

UniApp UI 是一个基于 Vue 3 + UniApp 的跨端 UI 组件库，支持 H5、小程序、App 多端适配。项目使用 TypeScript 开发，包含 80+ 精心设计的 UI 组件。

## 构建命令

### 开发与构建

```bash
# H5 开发（默认）
pnpm dev

# 微信小程序开发
pnpm dev:mp-weixin

# App 开发
pnpm dev:app

# 带环境变量：test / prod
pnpm dev:test

# H5 构建（默认）
pnpm build

# 微信小程序构建
pnpm build:mp-weixin

# App 构建
pnpm build:app
```

### 代码质量检查

```bash
# ESLint 检查（必须通过）
pnpm lint

# 自动修复
pnpm lint:fix

# TypeScript 类型检查（必须通过）
pnpm type-check

# Prettier 格式化
pnpm format
```

### 测试命令

```bash
# 运行所有测试
pnpm test

# 监听模式
pnpm test:watch

# 测试 UI 模式
pnpm test:ui

# 测试覆盖率
pnpm test:coverage

# 运行单个测试文件
pnpm test tests/components/button.test.ts
```

## 代码风格规范

### 1. 导入顺序

```typescript
// 1. Vue 相关 API
import { ref, computed, watch } from "vue"

// 2. 第三方库
import { mount } from "@vue/test-utils"

// 3. 类型定义
import type { CSSProperties } from "vue"

// 4. 内部模块（相对路径）
import { buttonProps } from "./props"

// 5. 工具函数（@/utils）
import { isDef } from "@/utils/is"
```

### 2. 命名约定

- **组件名**: `ui-` 前缀 kebab-case，如 `ui-button`
- **文件名**: kebab-case，如 `ui-button/`
- **变量名**: camelCase，如 `buttonSize`
- **常量名**: SCREAMING_SNAKE_CASE，如 `BUTTON_TYPES`
- **类型名**: PascalCase，如 `ButtonType`

### 3. TypeScript 规范

```typescript
// 优先使用 type
export type ButtonType = "primary" | "success" | "warning"

// 函数类型注解
export function useDebouncedValue<T>(value: Ref<T>, delay = 300): Ref<T> {
  // 实现
}

// Props 定义
export const [buttonProps, useButtonProps] = createProps("button", {
  type: makeStringProp<ButtonType>("primary"),
})

// 事件定义
export const buttonEmits = {
  click: (event: MouseEvent) => event,
}
```

### 4. Vue 组件规范

```vue
<template>
  <button class="ui-button" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed, ref } from "vue"

defineOptions({ name: "ui-button" })

const props = defineProps(buttonProps)
const emits = defineEmits(buttonEmits)

const loading = ref(false)

const buttonStyle = computed(
  (): CSSProperties => ({
    width: useUnit(props.width),
  }),
)

示例：

```
