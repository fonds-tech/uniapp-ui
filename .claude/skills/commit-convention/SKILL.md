---
name: commit-convention
description: Git 提交信息规范。在创建 commit 时自动应用。
user_invocable: true
---

# Git 提交规范

规范化 Git 提交信息，便于生成变更日志和代码审查。

---

## 提交格式

```
<type>(<scope>): <subject>

[body]

[footer]
```

---

## Type 类型

| 类型       | 说明                     | 示例                               |
| ---------- | ------------------------ | ---------------------------------- |
| `feat`     | 新功能                   | feat(ui-button): 新增 loading 状态 |
| `fix`      | Bug 修复                 | fix(ui-input): 修复小程序聚焦问题  |
| `docs`     | 文档更新                 | docs: 更新 README 安装说明         |
| `style`    | 代码格式（不影响逻辑）   | style: 格式化代码                  |
| `refactor` | 重构（非新功能、非修复） | refactor(hooks): 优化 useRect 实现 |
| `perf`     | 性能优化                 | perf(ui-list): 优化虚拟列表渲染    |
| `test`     | 测试相关                 | test(ui-button): 添加单元测试      |
| `chore`    | 构建/工具/依赖           | chore: 升级 vite 到 5.x            |
| `revert`   | 回滚提交                 | revert: 回滚 feat(ui-button)       |

---

## Scope 作用域

| 作用域   | 说明       |
| -------- | ---------- |
| `ui-xxx` | 具体组件名 |
| `hooks`  | 组合式函数 |
| `utils`  | 工具函数   |
| `styles` | 全局样式   |
| `types`  | 类型定义   |
| `docs`   | 文档       |
| `build`  | 构建配置   |
| `deps`   | 依赖更新   |

---

## Subject 规范

- 使用中文描述
- 不超过 50 个字符
- 不以句号结尾
- 使用动词开头：新增、修复、优化、移除、更新、重构

---

## 示例

### 新功能

```
feat(ui-avatar): 新增头像组件，支持图片和文字模式
```

### Bug 修复

```
fix(ui-popup): 修复 iOS 下遮罩层穿透问题

问题原因：touchmove 事件未阻止默认行为
解决方案：添加 @touchmove.prevent 修饰符
```

### 重构

```
refactor(hooks): 重构 useChildren/useParent 通信机制

- 使用 provide/inject 替代事件总线
- 移除不必要的响应式包装
- 优化类型推导
```

### 多个变更

```
feat(ui-form): 表单组件功能增强

- 新增异步校验支持
- 新增 scroll-to-error 属性
- 优化错误信息展示样式

BREAKING CHANGE: validate 方法现在返回 Promise
```

---

## 破坏性变更

如果有破坏性变更，必须在 footer 中说明：

```
feat(ui-button): 重构按钮组件 API

BREAKING CHANGE:
- `type` 属性重命名为 `variant`
- 移除 `ghost` 属性，使用 `variant="text"` 替代
```

---

## 关联 Issue

```
fix(ui-input): 修复 maxlength 在小程序端不生效

Closes #123
```

---

## 检查清单

提交前确保：

- [ ] type 类型正确
- [ ] scope 明确具体
- [ ] subject 简洁清晰
- [ ] 破坏性变更已说明
- [ ] 关联的 Issue 已标注
