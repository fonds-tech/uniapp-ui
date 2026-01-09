---
name: type-check
description: 代码修改后执行 TypeScript 类型检查。在生成或编辑 .ts/.vue 文件后自动应用。
---

# TypeScript 类型检查规范

在完成 TypeScript 或 Vue 文件的修改后，**必须**执行类型检查以确保类型安全。

---

## 执行命令

```bash
pnpm run type-check
```

---

## 执行时机

| 操作类型       | 是否执行                        |
| -------------- | ------------------------------- |
| 新建 .ts 文件  | ✅ 是                           |
| 新建 .vue 文件 | ✅ 是                           |
| 编辑 .ts 文件  | ✅ 是                           |
| 编辑 .vue 文件 | ✅ 是                           |
| 修改类型定义   | ✅ 是                           |
| 批量修改       | ✅ 是（所有修改完成后执行一次） |
| 仅读取/查看    | ❌ 否                           |
| 仅修改样式     | ❌ 否                           |

---

## 执行顺序

类型检查应在格式化之后执行：

```bash
# 1. 先格式化
pnpm run format && pnpm run lint:fix

# 2. 再类型检查
pnpm run type-check
```

---

## 常见类型错误及修复

### 1. 隐式 any 类型

```typescript
// ❌ 错误
const handleClick = (e) => { ... }

// ✅ 修复
const handleClick = (e: Event) => { ... }
```

### 2. 缺少类型导入

```typescript
// ❌ 错误
const style: CSSProperties = {}

// ✅ 修复
import type { CSSProperties } from "vue"
const style: CSSProperties = {}
```

### 3. Props 类型不匹配

```typescript
// ❌ 错误：使用 enum
enum Size { Small, Medium, Large }

// ✅ 修复：使用 type 联合类型
type Size = "small" | "medium" | "large"
```

### 4. 可选属性访问

```typescript
// ❌ 错误
props.items.length

// ✅ 修复
props.items?.length ?? 0
```

---

## 类型检查失败处理

1. **阅读错误信息**：定位具体文件和行号
2. **分析原因**：类型不匹配、缺少类型、隐式 any 等
3. **修复问题**：按照上述常见错误模式修复
4. **重新检查**：再次运行 `pnpm run type-check`

---

## 忽略规则（谨慎使用）

仅在确实无法修复时使用：

```typescript
// @ts-ignore - 说明忽略原因
// @ts-expect-error - 预期错误，用于测试
```

**禁止**无说明的 `@ts-ignore`。

---

## 与 auto-format 的关系

| 技能        | 职责                  | 执行顺序  |
| ----------- | --------------------- | --------- |
| auto-format | 代码格式化、lint 修复 | 1️⃣ 先执行 |
| type-check  | TypeScript 类型检查   | 2️⃣ 后执行 |

两者互补，共同保证代码质量。
