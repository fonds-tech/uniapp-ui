---
paths:
  - "src/uni_modules/uniapp-ui/ui-*/**/*.{vue,ts,md}"
  - "src/uni_modules/uniapp-ui/types/components.ts"
---

# 组件架构规范

每个组件目录 `ui-{kebab-case}/` 严格遵守以下文件 + 命名约定。

## 目录结构

```
ui-xxx/
├── ui-xxx.vue          # SFC 主体
├── index.ts            # props / emits / 类型定义
└── README.zh-CN.md     # VitePress 渲染的中文文档
```

命名严格匹配 `pages.config.ts` 的 easycom 规则 `^ui-(.*)` → `@/uni_modules/uniapp-ui/ui-$1/ui-$1.vue`。**目录名 = SFC 文件名 = kebab-case 标签名**。

## SFC 双 `<script>` 块

```vue
<script setup lang="ts">
// 业务逻辑
defineOptions({ name: "ui-xxx" })
const props = defineProps(xxxProps)
const emits = defineEmits(xxxEmits)
// ...
</script>

<script lang="ts">
export default {
  name: "ui-xxx",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>
```

`virtualHost: true` 必备：小程序虚拟节点，否则外层多一层 wrapper 影响布局。MP-TOUTIAO 不支持，用条件编译排除。

## index.ts 导出契约

```ts
import type Xxx from "./ui-xxx.vue"
import type { PropType, CSSProperties, ExtractPropTypes } from "vue"
import { buildDefaultProps } from "../utils/props"

const defaultProps = buildDefaultProps("xxx", {
  type: "primary",
  size: undefined,
  // ...
})

export const xxxProps = {
  type: defaultProps("type", { type: String as PropType<XxxType> }),
  size: defaultProps("size", { type: [Number, String] }),
}

export const xxxEmits = {
  click: () => true,
}

export type XxxType = "primary" | "danger"
export type XxxEmits = typeof xxxEmits
export type XxxProps = ExtractPropTypes<typeof xxxProps>
export type XxxInstance = InstanceType<typeof Xxx>
```

必导出：`xxxProps` / `xxxEmits` / `XxxProps` / `XxxEmits` / `XxxInstance` + 业务字面量联合类型（如 `XxxType`）。

## types/components.ts 同步登记

新增组件后必须同步追加：

```ts
import type { XxxProps } from "../ui-xxx"

export interface Components {
  // ...
  "ui-xxx": Partial<XxxProps>
}
```

不同步 → easycom 模板内类型补全失效。

## 新增组件 checklist

1. `ui-xxx/ui-xxx.vue` + `index.ts` + `README.zh-CN.md`
2. `index.ts` 用 `buildDefaultProps("xxx", {...})` 定义全部默认值
3. SFC 双 `<script>` 块 + `virtualHost: true`
4. `types/components.ts` 注册 `"xxx": Partial<XxxProps>`
5. 必要时 `tests/components/xxx.test.ts` 覆盖 props / events / slots / 边界态
6. demo 页面：`src/pages/demo/xxx/index.vue`（参考 demo-conventions）
7. `pnpm lint && pnpm type-check && pnpm test tests/components/xxx.test.ts` 全绿

## 反向依赖禁令

- `src/uni_modules/uniapp-ui/` **是组件库本体**，只能引用自身的 `../hooks` / `../utils`
- 严禁反向依赖 `src/` 下其他目录（`src/components/` / `src/hooks/` / `src/store/` 等是文档/演示工程）
