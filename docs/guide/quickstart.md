# 快速开始

本节将介绍如何在项目中安装和使用 UniApp UI。

## 安装

### npm 安装

```bash
# 使用 pnpm（推荐）
pnpm add uniapp-ui

# 使用 npm
npm install uniapp-ui

# 使用 yarn
yarn add uniapp-ui
```

### 直接引入

将 `src/ui` 目录复制到你的项目中即可使用。

## 配置

### 1. 配置 easycom

在 `pages.json` 或 `pages.config.ts` 中配置 easycom 自动导入：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^ui-(.*)": "@/ui/ui-$1/ui-$1.vue"
    }
  }
}
```

### 2. 安装插件

在 `main.ts` 中安装 UI 插件：

```typescript
import { createSSRApp } from 'vue'
import ui from '@/ui'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  // 安装 UI 组件库
  app.use(ui, {
    // 可选配置
    components: {
      // 全局组件默认属性
      button: {
        type: 'primary',
      },
    },
  })

  return { app }
}
```

### 3. 引入样式

在 `App.vue` 中引入全局样式：

```vue
<style lang="scss">
@import '@/ui/styles/index.scss';
</style>
```

## 使用组件

配置完成后，可以直接在模板中使用组件：

```vue
<template>
  <view>
    <ui-button type="primary">按钮</ui-button>
    <ui-input v-model="value" placeholder="请输入" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## TypeScript 支持

组件库提供完整的 TypeScript 类型定义。在 `tsconfig.json` 中添加类型声明：

```json
{
  "compilerOptions": {
    "types": ["@/ui/global.d.ts"]
  }
}
```

## 使用 Hooks

组件库提供了丰富的 Hooks 工具函数：

```typescript
import { useToast, useDialog, useLoading } from '@/ui'

// 使用 Toast
const { showToast } = useToast()
showToast({ message: '操作成功' })

// 使用 Dialog
const { showDialog } = useDialog()
showDialog({
  title: '提示',
  message: '确定要删除吗？',
})

// 使用 Loading
const { showLoading, hideLoading } = useLoading()
showLoading({ message: '加载中...' })
```

## 下一步

- 查看 [组件列表](/components/) 了解所有可用组件
- 了解 [主题定制](/guide/theme) 自定义组件样式
- 查看 [在线演示](/demo/) 体验组件效果
