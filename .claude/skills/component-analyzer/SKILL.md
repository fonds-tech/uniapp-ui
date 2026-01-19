---
name: component-analyzer
description: 按照最佳实践从多维度分析组件实现，包括变量、UI、功能性、完整性、性能等方面，提供改进优化建议。
user_invocable: true
---

# 组件分析器

按照 uniapp-ui 最佳实践，从多个维度全面分析组件实现质量，识别潜在问题并提供优化建议。

---

## 使用方式

用户输入示例：

- "分析 ui-button 组件"
- "检查 button 组件的实现质量"
- "/component-analyzer ui-popup"

---

## 分析维度

### 1. 变量与状态分析

#### 1.1 Props 定义检查

| 检查项             | 标准                                                        | 问题级别 |
| ------------------ | ----------------------------------------------------------- | -------- |
| 使用 `createProps` | 必须使用 `createProps` 创建 props                           | 错误     |
| 类型定义           | 使用 `type` 而非 `enum` 定义联合类型                        | 警告     |
| 默认值             | 使用正确的工具函数 (`makeStringProp`, `makeNumericProp` 等) | 错误     |
| 注释               | 每个 prop 需有中文注释说明                                  | 警告     |
| 命名               | 遵循 camelCase，语义明确                                    | 警告     |

```typescript
// ✅ 正确示例
export const [buttonProps, useButtonProps] = createProps("button", {
  /**
   * 按钮类型
   */
  type: makeStringProp<ButtonType>("default"),
  /**
   * 是否禁用
   */
  disabled: Boolean,
})

// ❌ 问题示例
export const buttonProps = {
  type: { type: String, default: "default" },  // 未使用 createProps
  disabled: { type: Boolean },                  // 缺少注释
}
```

#### 1.2 Props 默认值设计规范

**核心原则：默认值应代表最通用、最中性的使用场景，而非强制特定风格。**

##### 组件分类与默认值策略

| 组件类型     | 特征                 | 颜色类默认值                   | 示例组件                |
| ------------ | -------------------- | ------------------------------ | ----------------------- |
| 强主题组件   | 组件本身承载主题语义 | 可用 `"primary"` / `"default"` | button, tag, badge      |
| 中性容器组件 | 承载内容，不强调自身 | 必须为空 `""`                  | notice-bar, card, cell  |
| 表单输入组件 | 收集用户输入         | 必须为空 `""`                  | input, textarea, picker |
| 反馈提示组件 | 临时性提示信息       | 必须为空 `""`                  | toast, dialog, popup    |

##### 检查规则

| 检查项     | 标准                                                  | 问题级别 |
| ---------- | ----------------------------------------------------- | -------- |
| 颜色默认值 | 中性组件的 `color`/`iconColor` 等不应默认 `"primary"` | 警告     |
| CSS 硬编码 | 样式中不应硬编码 `var(--ui-color-primary)` 作为默认色 | 警告     |
| 继承性     | 子元素颜色应继承父元素或由 props 控制                 | 建议     |
| 一致性     | 同一组件内相关属性默认值风格统一                      | 警告     |

```typescript
// ❌ 错误：中性组件使用主题色作为默认值
export const [noticeBarProps, useNoticeBarProps] = createProps("noticeBar", {
  iconColor: makeStringProp("primary"),      // 通知栏图标不应默认主题色
  rightIconColor: makeStringProp("primary"), // 同上
})

// ❌ 错误：CSS 中硬编码主题色
.ui-notice-bar__text {
  color: var(--ui-color-primary);  // 应由 props.color 控制或使用文本色
}

// ✅ 正确：中性组件使用空默认值，由用户或 CSS 变量控制
export const [noticeBarProps, useNoticeBarProps] = createProps("noticeBar", {
  color: makeStringProp(""),      // 空值，CSS 中使用 --ui-color-text-primary
  iconColor: makeStringProp(""),  // 空值，继承文字颜色或使用文本色
})

// ✅ 正确：强主题组件可以有主题默认值
export const [buttonProps, useButtonProps] = createProps("button", {
  type: makeStringProp<ButtonType>("primary"),  // 按钮默认主题色合理
})

// ✅ 正确：CSS 使用中性文本色
.ui-notice-bar__text {
  color: var(--ui-color-text-primary);  // 中性文本色
}
```

##### 决策流程

```
设计 Props 默认值时：
1. 判断组件类型 → 强主题 or 中性？
2. 若为中性组件：
   - 颜色类 props 默认值 = ""
   - CSS 默认色 = 文本色 (--ui-color-text-primary)
   - 通过 props 覆盖实现自定义
3. 若为强主题组件：
   - 可设置 type/color 默认值
   - 提供 "default" 类型作为中性选项
```

#### 1.3 响应式状态检查

| 检查项          | 标准                              | 问题级别 |
| --------------- | --------------------------------- | -------- |
| ref vs reactive | 简单值用 `ref`，对象用 `reactive` | 建议     |
| 命名规范        | 布尔值以 `is/has/show` 开头       | 建议     |
| 初始值          | 必须有明确初始值                  | 错误     |
| 不必要状态      | 可计算的值不应存为状态            | 警告     |

#### 1.3 计算属性检查

| 检查项   | 标准                    | 问题级别 |
| -------- | ----------------------- | -------- |
| 无副作用 | computed 内不应修改状态 | 错误     |
| 缓存利用 | 相同逻辑不应重复计算    | 警告     |
| 返回类型 | 有明确的返回类型        | 建议     |

---

### 2. UI 与模板分析

#### 2.1 模板结构检查

| 检查项   | 标准                                     | 问题级别 |
| -------- | ---------------------------------------- | -------- |
| 根元素   | 使用 `view` 而非 `div`                   | 错误     |
| 类名绑定 | `:class="[rootClass, customClass]"` 格式 | 警告     |
| 样式绑定 | `:style="[rootStyle]"` 格式              | 警告     |
| 事件绑定 | 使用 `@click` 而非 `v-on:click`          | 建议     |
| 条件渲染 | 合理使用 `v-if` / `v-show`               | 警告     |

```vue
<!-- ✅ 正确示例 -->
<view
  class="ui-button"
  :class="[rootClass, customClass]"
  :style="[rootStyle]"
  @click="handleClick"
>
  <slot />
</view>

<!-- ❌ 问题示例 -->
<div class="ui-button" :class="rootClass" @click="handleClick">
```

#### 2.2 样式规范检查

| 检查项   | 标准                                     | 问题级别 |
| -------- | ---------------------------------------- | -------- |
| BEM 命名 | `.ui-xxx__element--modifier`             | 错误     |
| CSS 变量 | 使用 `var(--ui-xxx)` 而非硬编码          | 警告     |
| 尺寸变量 | 使用 `--ui-size-xxx`, `--ui-spacing-xxx` | 警告     |
| 颜色变量 | 使用 `--ui-color-xxx`                    | 警告     |
| 禁用样式 | 有 `--disabled` 修饰符样式               | 建议     |

```scss
// ✅ 正确示例
.ui-button {
  height: var(--ui-size-normal);
  padding: 0 var(--ui-spacing-md);
  color: var(--ui-color-text-primary);

  &--disabled {
    opacity: var(--ui-opacity-disabled);
  }
}

// ❌ 问题示例
.ui-button {
  height: 40px;           // 硬编码尺寸
  padding: 0 16px;        // 硬编码间距
  color: #333;            // 硬编码颜色
}
```

#### 2.3 插槽设计检查

| 检查项     | 标准                         | 问题级别 |
| ---------- | ---------------------------- | -------- |
| 默认插槽   | 主内容区提供默认插槽         | 建议     |
| 具名插槽   | 复杂组件提供具名插槽扩展点   | 建议     |
| 作用域插槽 | 需要暴露数据时使用作用域插槽 | 建议     |

---

### 3. 功能性分析

#### 3.1 事件处理检查

| 检查项     | 标准                         | 问题级别 |
| ---------- | ---------------------------- | -------- |
| Emits 定义 | 所有事件在 `xxxEmits` 中定义 | 错误     |
| 事件验证   | emit 函数有类型验证          | 建议     |
| 禁用状态   | 禁用时不触发事件             | 错误     |
| 事件命名   | 使用 kebab-case              | 警告     |

```typescript
// ✅ 正确示例
export const buttonEmits = {
  click: (event: Event) => true,
  change: (value: string) => typeof value === 'string',
}

// 组件中
const handleClick = (event: Event) => {
  if (useProps.disabled || useProps.loading) return
  emit("click", event)
}
```

#### 3.2 Hooks 使用检查

| 检查项                | 标准                         | 问题级别 |
| --------------------- | ---------------------------- | -------- |
| useUnit               | 尺寸值使用 `useUnit` 转换    | 警告     |
| useColor              | 颜色值使用 `useColor` 处理   | 警告     |
| useStyle              | 样式对象使用 `useStyle` 转换 | 警告     |
| useParent/useChildren | 父子组件通信使用专用 hooks   | 建议     |

```typescript
// ✅ 正确示例
const rootStyle = computed(() => {
  const styles: CSSProperties = {}
  styles.width = useUnit(useProps.width)
  styles.color = useColor(useProps.color)
  return useStyle({ ...styles, ...useStyle(useProps.customStyle) })
})
```

#### 3.3 生命周期检查

| 检查项   | 标准                              | 问题级别 |
| -------- | --------------------------------- | -------- |
| 清理逻辑 | `onUnmounted` 中清理定时器/监听器 | 错误     |
| 异步操作 | 避免 `onMounted` 中的阻塞操作     | 警告     |
| 依赖关系 | 生命周期顺序正确                  | 建议     |

---

### 4. 完整性分析

#### 4.1 Props 完整性

| 检查项      | 标准               |
| ----------- | ------------------ |
| customStyle | 自定义样式属性     |
| customClass | 自定义类名属性     |
| disabled    | 禁用状态（如适用） |
| loading     | 加载状态（如适用） |

#### 4.2 类型导出完整性

```typescript
// 必须导出的类型
export type XxxProps = ExtractPropTypes<typeof xxxProps>
export type XxxEmits = typeof xxxEmits
export type XxxInstance = InstanceType<typeof XxxComponent>
```

#### 4.3 小程序配置完整性

```typescript
// 必须的配置
export default {
  name: "ui-xxx",
  options: {
    virtualHost: true,
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
```

---

### 5. 性能分析

#### 5.1 渲染性能

| 检查项   | 标准                                   | 问题级别 |
| -------- | -------------------------------------- | -------- |
| 列表渲染 | `v-for` 必须有 `:key`                  | 错误     |
| 计算缓存 | 复杂计算使用 `computed`                | 警告     |
| 条件渲染 | 频繁切换用 `v-show`，偶尔切换用 `v-if` | 建议     |
| 事件节流 | 高频事件使用节流/防抖                  | 建议     |

#### 5.2 响应式优化

| 检查项     | 标准                          | 问题级别 |
| ---------- | ----------------------------- | -------- |
| 大对象     | 避免将大对象设为响应式        | 警告     |
| shallowRef | 非深层响应时使用 `shallowRef` | 建议     |
| watch 清理 | 及时清理不需要的 watcher      | 警告     |

---

### 6. 跨平台兼容性

| 检查项   | 标准                               | 问题级别 |
| -------- | ---------------------------------- | -------- |
| Web API  | 不直接使用 `document`, `window` 等 | 错误     |
| 条件编译 | 平台特定代码使用 `#ifdef`          | 警告     |
| 通用标签 | 使用 `view`, `text` 等通用标签     | 错误     |
| CSS 兼容 | 避免小程序不支持的 CSS 属性        | 警告     |

---

### 7. TypeScript 质量

| 检查项   | 标准                        | 问题级别 |
| -------- | --------------------------- | -------- |
| 类型覆盖 | 避免 `any` 类型             | 警告     |
| 类型导入 | 使用 `import type` 导入类型 | 建议     |
| 泛型使用 | 合理使用泛型增强类型安全    | 建议     |

---

### 8. 边界情况与防御性编程

#### 8.1 Props 边界处理

| 检查项   | 标准                                        | 问题级别 |
| -------- | ------------------------------------------- | -------- |
| 空值处理 | 数组/对象类 props 需处理 `undefined`/`null` | 错误     |
| 类型守卫 | 使用前验证 props 类型                       | 警告     |
| 默认降级 | 异常值有合理的降级处理                      | 警告     |
| 边界值   | 数值类 props 处理极端值（0、负数、超大值）  | 建议     |

```typescript
// ❌ 错误：未处理空值
const list = computed(() => {
  return useProps.items.map(item => item.name)  // items 为 undefined 时崩溃
})

// ✅ 正确：防御性处理
const list = computed(() => {
  if (!useProps.items || !Array.isArray(useProps.items)) return []
  return useProps.items.map(item => item?.name ?? '')
})

// ❌ 错误：未处理边界值
const progress = computed(() => useProps.value / useProps.max * 100)  // max=0 时 Infinity

// ✅ 正确：边界值保护
const progress = computed(() => {
  const max = Number(useProps.max) || 100
  const value = Math.max(0, Math.min(Number(useProps.value) || 0, max))
  return max > 0 ? (value / max) * 100 : 0
})
```

#### 8.2 运行时保护

| 检查项   | 标准                              | 问题级别 |
| -------- | --------------------------------- | -------- |
| 可选链   | 访问嵌套属性使用 `?.`             | 警告     |
| 空值合并 | 使用 `??` 而非 `\|\|` 处理假值    | 建议     |
| 异步错误 | async 函数有 try-catch 或错误处理 | 警告     |

---

### 9. API 设计一致性

#### 9.1 命名一致性

| 检查项      | 标准                 | 问题级别 |
| ----------- | -------------------- | -------- |
| Props 命名  | 同类功能使用统一命名 | 警告     |
| Events 命名 | 同类事件使用统一命名 | 警告     |
| Slots 命名  | 同类插槽使用统一命名 | 建议     |

##### 组件库统一命名规范

| 功能       | 统一命名            | 避免使用                            |
| ---------- | ------------------- | ----------------------------------- |
| 自定义样式 | `customStyle`       | `style`, `styles`, `cssStyle`       |
| 自定义类名 | `customClass`       | `class`, `className`, `cssClass`    |
| 禁用状态   | `disabled`          | `disable`, `isDisabled`             |
| 加载状态   | `loading`           | `isLoading`, `showLoading`          |
| 尺寸       | `size`              | `sizes`, `sizeType`                 |
| 类型       | `type`              | `types`, `mode`（除非语义不同）     |
| 颜色       | `color`             | `textColor`（除非有多个颜色）       |
| 图标       | `icon`              | `iconName`, `iconType`              |
| 图标颜色   | `iconColor`         | `iconTextColor`                     |
| 点击事件   | `click`             | `onClick`, `tap`                    |
| 值变化     | `change`            | `onChange`, `input`（除非语义不同） |
| 更新值     | `update:modelValue` | `update:value`                      |

```typescript
// ❌ 不一致的命名
// 组件 A
iconTextColor: makeStringProp("")
// 组件 B
iconColor: makeStringProp("")

// ✅ 统一命名
// 所有组件
iconColor: makeStringProp("")
```

#### 9.2 行为一致性

| 检查项   | 标准                      | 问题级别 |
| -------- | ------------------------- | -------- |
| 禁用行为 | disabled 时不触发任何事件 | 错误     |
| 加载行为 | loading 时不触发点击事件  | 错误     |
| 尺寸映射 | size 值对应相同的视觉尺寸 | 警告     |
| 类型映射 | type 值对应相同的颜色语义 | 警告     |

---

### 10. 可访问性 (Accessibility)

> 注：小程序对无障碍支持有限，以下规范主要针对 H5 平台

| 检查项    | 标准                                     | 问题级别 |
| --------- | ---------------------------------------- | -------- |
| 语义化    | 使用语义化标签或 role 属性               | 建议     |
| aria 标签 | 交互元素有 aria-label 或 aria-labelledby | 建议     |
| 状态反馈  | 禁用/加载状态有 aria-disabled/aria-busy  | 建议     |
| 焦点管理  | 可交互组件支持键盘焦点                   | 建议     |

```vue
<!-- ✅ H5 平台增强可访问性 -->
<!-- #ifdef H5 -->
<button
  role="button"
  :aria-disabled="useProps.disabled"
  :aria-busy="useProps.loading"
  :aria-label="useProps.ariaLabel"
>
<!-- #endif -->
<!-- #ifndef H5 -->
<view>
<!-- #endif -->
```

---

### 11. 代码可维护性

#### 11.1 函数拆分

| 检查项   | 标准                       | 问题级别 |
| -------- | -------------------------- | -------- |
| 单一职责 | 每个函数只做一件事         | 警告     |
| 函数长度 | 单个函数不超过 50 行       | 建议     |
| 嵌套层级 | 避免超过 3 层嵌套          | 警告     |
| 复杂度   | 复杂逻辑拆分为多个辅助函数 | 建议     |

```typescript
// ❌ 过于复杂的 computed
const rootStyle = computed(() => {
  const style: any = {}
  // ... 50+ 行逻辑
  if (useProps.type === 'primary') {
    if (useProps.plain) {
      if (useProps.disabled) {
        // 深层嵌套...
      }
    }
  }
  return useStyle(style)
})

// ✅ 拆分为多个函数
const getTypeStyle = (type: string, plain: boolean) => { /* ... */ }
const getStateStyle = (disabled: boolean, loading: boolean) => { /* ... */ }

const rootStyle = computed(() => {
  return useStyle({
    ...getTypeStyle(useProps.type, useProps.plain),
    ...getStateStyle(useProps.disabled, useProps.loading),
    ...useStyle(useProps.customStyle),
  })
})
```

#### 11.2 关注点分离

| 检查项   | 标准                      | 问题级别 |
| -------- | ------------------------- | -------- |
| 样式逻辑 | 样式计算与业务逻辑分离    | 建议     |
| 工具函数 | 可复用逻辑提取到 utils    | 建议     |
| 常量提取 | 魔法数字/字符串提取为常量 | 警告     |

```typescript
// ❌ 魔法数字
if (list.length > 5) { /* ... */ }
await delay(300)

// ✅ 提取常量
const MAX_VISIBLE_ITEMS = 5
const ANIMATION_DURATION = 300

if (list.length > MAX_VISIBLE_ITEMS) { /* ... */ }
await delay(ANIMATION_DURATION)
```

---

## 分析报告格式

```markdown
# {ComponentName} 组件分析报告

## 总体评分

| 维度 | 评分 | 状态 |
|------|------|------|
| 变量与状态 | 85/100 | 良好 |
| UI 与模板 | 90/100 | 优秀 |
| 功能性 | 80/100 | 良好 |
| 完整性 | 95/100 | 优秀 |
| 性能 | 75/100 | 待优化 |
| 跨平台兼容 | 100/100 | 优秀 |
| TypeScript | 88/100 | 良好 |
| 边界处理 | 70/100 | 待优化 |
| API 一致性 | 90/100 | 优秀 |
| 可访问性 | 60/100 | 待优化 |
| 可维护性 | 85/100 | 良好 |
| **综合评分** | **83/100** | **良好** |

## 问题清单

### 错误 (必须修复)

1. **[Props]** 第 15 行：未使用 `createProps` 创建 props
   - 当前：`export const xxxProps = { ... }`
   - 建议：`export const [xxxProps, useXxxProps] = createProps("xxx", { ... })`

### 警告 (建议修复)

1. **[样式]** 第 45 行：硬编码颜色值
   - 当前：`color: #333;`
   - 建议：`color: var(--ui-color-text-primary);`

### 建议 (可选优化)

1. **[性能]** 第 30 行：高频事件未使用节流
   - 建议：添加 `throttle` 属性或使用 `createThrottle`

## 优化建议

### 优先级高

1. 修复 props 定义方式，确保与组件库规范一致
2. 补充缺失的 disabled 状态处理

### 优先级中

1. 将硬编码值替换为 CSS 变量
2. 添加必要的类型注释

### 优先级低

1. 考虑添加更多插槽扩展点
2. 优化计算属性的命名
```

---

## 检查清单

分析完成后确保已检查：

- [ ] Props 定义规范（createProps、工具函数、注释）
- [ ] Props 默认值设计（组件类型判断、颜色默认值、CSS 硬编码）
- [ ] 响应式状态设计（ref/reactive 选择、命名）
- [ ] 模板结构（根元素、类名/样式绑定）
- [ ] 样式规范（BEM、CSS 变量）
- [ ] 事件处理（emits 定义、禁用状态）
- [ ] Hooks 使用（useUnit、useColor、useStyle）
- [ ] 类型完整性（Props/Emits/Instance 类型导出）
- [ ] 小程序配置（options 完整）
- [ ] 性能考量（v-for key、计算缓存）
- [ ] 跨平台兼容（无 Web API 直接调用）
- [ ] TypeScript 质量（无 any、类型导入）
- [ ] 边界情况（空值处理、类型守卫、边界值）
- [ ] API 一致性（命名统一、行为一致）
- [ ] 可访问性（aria 属性、语义化标签）
- [ ] 代码可维护性（函数拆分、常量提取）

---

## 严重程度说明

| 级别 | 说明                           | 处理方式   |
| ---- | ------------------------------ | ---------- |
| 错误 | 违反核心规范，可能导致功能异常 | 必须修复   |
| 警告 | 不符合最佳实践，影响代码质量   | 建议修复   |
| 建议 | 可优化项，提升代码质量         | 视情况处理 |
