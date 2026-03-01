# ui-date-range-picker 组件实施计划（2026-03-01）

## 目标
- 新增 `ui-date-range-picker` 组件（纯弹窗区间选择器，支持 `v-model:show`）
- 保持现有 `ui-date-range-select` 兼容，不破坏旧用法
- 补齐 demo、文档与导航入口，保证可演示可查阅

## 边界
- 本次不重构 `ui-date-range-select` 内部实现逻辑
- 本次不新增复杂快捷区间（近7天/近30天）

## 任务清单
- [x] 创建 `ui-date-range-picker` 目录与基础文件（`index.ts`、`ui-date-range-picker.vue`、`README.zh-CN.md`）
- [x] 组件实现：复用 `ui-date-range-select` 能力并提供 `show/modelValue` 双向绑定
- [x] 接入类型系统（`types/components.ts`、`global.d.ts`）
- [x] 新增 demo 页面并接入路由与导航入口
- [x] 新增 docs 页面并接入 VitePress 侧边栏与组件列表
- [x] 运行 lint 与相关测试并修复问题
