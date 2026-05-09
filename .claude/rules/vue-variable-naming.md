---
paths:
  - "src/uni_modules/uniapp-ui/**/*.{vue,ts}"
  - "src/pages/**/*.{vue,ts}"
---

# 变量命名与排序

## 命名 / 类型 / 路径基线

| 类别        | 规则                                        | 示例                          |
| ----------- | ------------------------------------------- | ----------------------------- |
| 组件        | `ui-` 前缀 + kebab-case                     | `ui-button` `ui-color-picker` |
| 类型        | `PascalCase`                                | `ButtonType` `XxxProps`       |
| 常量        | `SCREAMING_SNAKE_CASE`                      | `MAX_RETRY` `STATUS_MAP`      |
| 变量 / 函数 | `camelCase`                                 | `userName` `fetchData`        |
| 路径别名    | `@/*` → `src/*` / `@img/*` → `src/static/*` | -                             |

TS 类型优先 `type` 而非 `interface`（除非要 declaration merge）。

## 同组按变量名长度短→长排序

同一分组（ref 组 / computed 组 / function 组）内**按名字长度短→长**，长度相同按字母序。

```ts
// ✅ ref 组
const id = ref("")              // 2
const list = ref([])            // 4
const detail = ref({})          // 6
const submitting = ref(false)   // 10

// ✅ computed 组
const name = computed(() => ...)        // 4
const total = computed(() => ...)       // 5
const isEditable = computed(() => ...)  // 10
```

分组独立排序，不跨组混排。

## 命名前缀约定

| 类型               | 前缀 / 规则                          | 示例                                             |
| ------------------ | ------------------------------------ | ------------------------------------------------ |
| 响应式状态（名词） | 名词                                 | `detail` `loading` `visible`                     |
| 布尔 ref           | `is*` / `show*` / `has*` / `should*` | `isEdit` `showPopup` `hasFilter` `shouldRefresh` |
| 弹窗暂存值         | `pending*`                           | `pendingIds` `pendingValues`                     |
| 当前选中           | `current*`                           | `currentTab` `currentIds`                        |
| 布尔 computed      | `is*` / `show*` / `has*`             | `isEditable` `showFooter` `hasActiveFilter`      |
| 数据获取           | `fetch*`（async）                    | `fetchDetail` `fetchOptions`                     |
| 事件处理           | `handle*` / `on*`                    | `handleSubmit` `onClickBack`                     |
| 纯函数转换         | `normalize*` / `format*` / `get*`    | `normalizeList` `formatPrice` `getStatusInfo`    |
| 映射表常量         | `*_MAP`（全大写下划线）              | `STATUS_MAP` `APPLY_TYPE_MAP`                    |
| 选项数组           | `*Options`                           | `typeOptions` `statusOptions`                    |
| 组件引用           | `*Ref`                               | `formRef` `listRef`                              |

## 组件内 computed 命名约定

| 类型       | 命名                          | 示例                         |
| ---------- | ----------------------------- | ---------------------------- |
| 根节点样式 | `rootStyle` / `style`         | -                            |
| 根节点类名 | `classNames`                  | -                            |
| 子部位样式 | `xxxStyle`                    | `headerStyle` / `titleStyle` |
| 类名集合   | `xxxClassList` / `classNames` | -                            |

## 函数命名补充

- `fetch*`：查询类 API（GET 语义），只读，不含写入
- `handle*`：事件处理入口，可调用 fetch\* 或写入 API
- 写入类中间函数（被 `handle*` 调用）：动词开头，如 `saveFollow()` / `submitApprove()` / `validateForm()`
- 导航回调：`on*`，如 `onGradient()` / `onClickBack()`

## 注释规范

- 每个 ref / computed / function 上方一行简短注释**说作用**（"是干嘛"，不写"这是 computed/ref" 等废话）
- 命名能自解释的省略
- SCSS 几何 trick / 公式 / 跨端坑 / 隐藏约束 必须注释
- **禁引用其他 UI 框架名**（Element / Vant / Ant / wot-design 等）
- 禁区块分隔注释（`// ===== xxx =====` / `// --- xxx ---`）

## 模块级常量

非必要不提取常量：单次使用的字面量直接 inline（视需要加注释说明含义/单位）。仅当**多次复用**、或**大型数据表/映射**时才抽常量。

抽出的常量放 `./index.ts` export，不放 `<script setup>` 内（避免破坏块顺序）。
