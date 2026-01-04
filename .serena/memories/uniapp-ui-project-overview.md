# UniApp-UI 项目概览

## 项目基本信息

- **项目类型**: Vue 3 + UniApp 跨端 UI 组件库
- **技术栈**: Vue 3 Composition API, TypeScript, SCSS
- **包管理器**: pnpm
- **支持平台**: H5、微信小程序、支付宝小程序、App

## 目录结构

```
src/uni_modules/uniapp-ui/
├── index.ts              # 组件库入口
├── types/                # 类型定义
│   ├── component.ts      # 组件默认值配置
│   ├── config.ts         # 全局配置
│   └── index.ts          # 类型导出
├── hooks/                # 组合式函数
│   ├── useChildren.ts    # 父组件管理子组件
│   ├── useParent.ts      # 子组件获取父组件
│   ├── useRect.ts        # 获取元素尺寸
│   └── usePxToRpx.ts     # px 转 rpx
├── utils/                # 工具函数
│   ├── utils.ts          # 通用工具
│   ├── mitt.ts           # 事件总线
│   └── check.ts          # 校验函数
├── styles/               # 全局样式
└── ui-*/                 # 各组件目录（70+个）
```

## 组件分类

### 基础组件
- ui-button, ui-icon, ui-text, ui-image, ui-tag, ui-badge

### 表单组件
- ui-input, ui-textarea, ui-checkbox, ui-radio, ui-switch
- ui-form, ui-form-item, ui-picker, ui-date-picker
- ui-slider, ui-rate, ui-stepper, ui-search

### 布局导航组件
- ui-popup, ui-navbar, ui-tabbar, ui-tabs
- ui-grid, ui-row, ui-col, ui-cell, ui-list

### 反馈展示组件
- ui-toast, ui-loading, ui-notify, ui-modal, ui-dialog
- ui-skeleton, ui-empty, ui-progress, ui-swiper

### 特殊功能组件
- ui-qrcode, ui-poster, ui-signature, ui-calendar
- ui-count-down, ui-waterfall, ui-virtual-list

## 核心设计模式

### 父子组件通信
使用 `useChildren` 和 `useParent` Hooks 实现基于 provide/inject 的通信：
- 父组件通过 `useChildren` 收集并管理子组件实例
- 子组件通过 `useParent` 获取父组件实例

### 主题系统
使用 CSS 变量实现主题定制：
- `--ui-color-primary`: 主色
- `--ui-color-success`: 成功色
- `--ui-font-size-*`: 字体尺寸
- `--ui-spacing-*`: 间距

### 事件总线
使用 Mitt 类实现跨组件通信（注意：存在全局状态共享问题）

## 已知问题

详见 `COMPONENT_ISSUES_REPORT.md`，主要问题包括：
1. Mitt 全局状态共享
2. debounce 模块级变量
3. 定时器内存泄漏
4. TypeScript any 类型滥用
5. 可访问性属性缺失

## 开发命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发模式
pnpm build          # 构建
pnpm lint           # 代码检查
pnpm test           # 运行测试
```

## 注意事项

1. 修改组件时需考虑多平台兼容性
2. 使用条件编译处理平台差异 (`#ifdef MP-WEIXIN` 等)
3. 定时器和事件监听需在组件卸载时清理
4. 父子组件通信时需检查 parent 是否为 null
