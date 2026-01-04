# CLAUDE.md - uniapp-ui 项目 AI 协作指南

> 本文件为 Claude Code 和 AI 助手提供项目上下文和协作规范。

## 项目概述

**uniapp-ui** 是一个基于 Vue 3 + UniApp 的跨平台 UI 组件库，支持 H5、微信小程序、支付宝小程序、App 等 12+ 平台。

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.4.21 | 核心框架（Composition API） |
| TypeScript | 5.9.3 | 类型系统 |
| UniApp | 3.0 | 跨平台框架 |
| Vite | 5.2.8 | 构建工具 |
| SCSS | - | 样式预处理 |
| Vitest | 2.1.8 | 单元测试 |
| pnpm | 10.10.0 | 包管理器 |

### 项目结构

```
src/uni_modules/uniapp-ui/
├── index.ts              # 库入口
├── types/                # 类型定义
│   ├── component.ts      # 组件默认值
│   ├── config.ts         # 全局配置类型
│   └── index.ts          # 类型导出
├── hooks/                # 组合式函数（24 个）
├── utils/                # 工具函数（10 个模块）
├── styles/               # 全局样式
└── ui-*/                 # 组件目录（70+ 组件）
```

---

## 🤖 AI 团队配置

本项目配置了 5 个专业化 AI Agent，位于 `.claude/agents/` 目录。

### 团队成员

| Agent | 文件 | 职责 |
|-------|------|------|
| **UI 库架构师** | `ui-library-architect.md` | 架构设计、API 标准、技术路线图 |
| **Vue 组件开发者** | `vue-uniapp-component-developer.md` | 组件开发、样式主题、交互逻辑 |
| **Hooks 工具专家** | `hooks-utility-specialist.md` | 组合式函数、工具函数开发 |
| **测试专家** | `component-testing-specialist.md` | 单元测试、覆盖率、测试工具 |
| **跨平台兼容专家** | `cross-platform-compatibility-expert.md` | 平台兼容、条件编译、性能优化 |

### 协作矩阵

```
┌─────────────────────────────────────────────────────────────┐
│                    UI 库架构师                                │
│              (架构决策 & 技术标准)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Vue 组件开发者 │ │ Hooks 专家   │ │ 跨平台专家    │
│  (核心开发)    │ │ (通用逻辑)   │ │ (平台适配)    │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
              ┌───────────────────────┐
              │      测试专家          │
              │   (质量保障 & 验证)    │
              └───────────────────────┘
```

### 任务分配指南

根据任务类型自动选择合适的 Agent：

| 任务类型 | 推荐 Agent |
|----------|-----------|
| 新组件开发 | vue-uniapp-component-developer |
| 组件 Bug 修复 | vue-uniapp-component-developer |
| Hook 开发/优化 | hooks-utility-specialist |
| 工具函数开发 | hooks-utility-specialist |
| 编写测试用例 | component-testing-specialist |
| 测试覆盖率提升 | component-testing-specialist |
| 平台兼容问题 | cross-platform-compatibility-expert |
| 条件编译实现 | cross-platform-compatibility-expert |
| 架构设计 | ui-library-architect |
| API 设计评审 | ui-library-architect |
| 性能优化 | ui-library-architect + cross-platform-compatibility-expert |

---

## 开发规范

### 组件开发规范

```vue
<template>
  <view :class="rootClass" :style="rootStyle">
    <!-- 组件内容 -->
  </view>
</template>

<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import type { CSSProperties } from 'vue'

// 类型定义
interface Props {
  size?: 'small' | 'medium' | 'large'
  type?: 'primary' | 'success' | 'warning' | 'error'
}

interface Emits {
  (e: 'change', value: unknown): void
  (e: 'click', event: Event): void
}

// Props 带默认值
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  type: 'primary'
})

// Emits 定义
const emit = defineEmits<Emits>()

// 计算属性
const rootClass = computed(() => [
  'ui-component',
  `ui-component--${props.size}`,
  `ui-component--${props.type}`
])

const rootStyle = computed<CSSProperties>(() => ({}))

// 清理副作用
onUnmounted(() => {
  // 清理定时器、事件监听等
})
</script>

<style lang="scss" scoped>
.ui-component {
  // 使用 CSS 变量
  color: var(--ui-color-primary);
  font-size: var(--ui-font-size-md);
  
  &--large {
    font-size: var(--ui-font-size-lg);
  }
}
</style>
```

### 父子组件通信模式

```typescript
// 父组件
import { useChildren } from '../hooks/useChildren'
const { children, addChild, removeChild } = useChildren('UI_COMPONENT_KEY')

// 子组件
import { useParent } from '../hooks/useParent'
const { parent } = useParent('UI_COMPONENT_KEY')
```

### 条件编译

```vue
<!-- 平台特定模板 -->
<!-- #ifdef H5 -->
<div class="web-only">Web 内容</div>
<!-- #endif -->

<!-- #ifdef MP-WEIXIN -->
<view class="mp-only">小程序内容</view>
<!-- #endif -->

<script setup lang="ts">
// 平台特定代码
// #ifdef H5
import { webOnlyApi } from 'web-library'
// #endif
</script>

<style lang="scss">
/* 平台特定样式 */
/* #ifdef H5 */
.web-specific { /* ... */ }
/* #endif */
</style>
```

### 主题变量

```scss
:root {
  // 颜色
  --ui-color-primary: #1890ff;
  --ui-color-success: #52c41a;
  --ui-color-warning: #faad14;
  --ui-color-error: #ff4d4f;
  
  // 字体
  --ui-font-size-sm: 12px;
  --ui-font-size-md: 14px;
  --ui-font-size-lg: 16px;
  
  // 间距
  --ui-spacing-xs: 4px;
  --ui-spacing-sm: 8px;
  --ui-spacing-md: 12px;
  --ui-spacing-lg: 16px;
}
```

---

## 常用命令

```bash
# 开发
pnpm dev              # H5 开发服务器
pnpm dev:mp-weixin    # 微信小程序开发

# 构建
pnpm build            # H5 生产构建
pnpm build:mp-weixin  # 微信小程序构建

# 质量检查
pnpm lint             # ESLint 检查
pnpm type-check       # TypeScript 类型检查
pnpm test             # 运行测试
pnpm test:coverage    # 测试覆盖率报告

# 文档
pnpm docs:dev         # 文档开发服务器
```

---

## 质量门控

### 代码质量
- [ ] TypeScript 严格模式通过
- [ ] 无未经说明的 `any` 类型
- [ ] 公共 API 有完整文档
- [ ] 复杂逻辑有中文注释

### 性能
- [ ] 组件渲染 < 16ms
- [ ] 单组件 gzip 后 < 5KB
- [ ] 无内存泄漏
- [ ] 跨平台性能验证

### 兼容性
- [ ] H5 验证通过
- [ ] 微信小程序验证通过
- [ ] App 平台验证通过

### 测试
- [ ] 单元测试覆盖关键路径
- [ ] 测试总执行时间 < 60 秒

---

## 现有 Hooks 列表

| Hook | 用途 |
|------|------|
| useChildren | 父组件管理子组件 |
| useParent | 子组件访问父组件 |
| useRect | 获取元素尺寸 |
| useRects | 批量获取元素尺寸 |
| useToast | Toast 通知 |
| useTransition | CSS 过渡管理 |
| useGlobalZIndex | z-index 管理 |
| useUnit | 单位转换 |
| usePxToRpx | px 转 rpx |
| useUnitToPx | 单位转 px |
| useColor | 颜色处理 |
| useStyle | 样式对象生成 |
| useVar | CSS 变量访问 |
| useMitt | 事件总线 |
| useCalendar | 日历计算 |
| useLockScroll | 滚动锁定 |
| usePromise | Promise 工具 |
| useRequestAnimationFrame | 动画帧处理 |
| useSystemInfo | 系统信息 |
| useCurrentRouter | 路由状态 |
| useGlobalProps | 全局 Props 注入 |
| useRgb | RGB 颜色工具 |
| useUnitToRpx | 单位转 rpx |

---

## 组件分类

### 基础组件
ui-button, ui-icon, ui-text, ui-image, ui-tag, ui-badge

### 表单组件
ui-input, ui-textarea, ui-checkbox, ui-radio, ui-switch, ui-form, ui-form-item, ui-picker, ui-date-picker, ui-slider, ui-rate, ui-stepper, ui-search, ui-upload

### 布局组件
ui-row, ui-col, ui-cell, ui-cell-group, ui-grid

### 导航组件
ui-navbar, ui-tabbar, ui-tabs, ui-sidebar, ui-pagination

### 反馈组件
ui-popup, ui-toast, ui-loading, ui-notify, ui-modal, ui-dialog, ui-action-sheet, ui-overlay

### 展示组件
ui-skeleton, ui-empty, ui-progress, ui-swiper, ui-notice-bar, ui-countdown, ui-number-roll

### 特殊组件
ui-qrcode, ui-poster, ui-calendar, ui-keyboard

---

## 注意事项

1. **内存管理**：组件卸载时必须清理定时器和事件监听
2. **类型安全**：避免使用 `any`，使用严格的 TypeScript 类型
3. **跨平台**：使用条件编译处理平台差异
4. **主题化**：所有颜色、字体、间距使用 CSS 变量
5. **命名规范**：组件使用 `ui-*` 前缀，类名使用 BEM 规范
6. **中文注释**：关键逻辑必须有中文注释说明

---

*此文件由 `/universal:initx` 命令自动生成，最后更新：2026-01-04*
