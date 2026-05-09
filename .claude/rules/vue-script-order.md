---
paths:
  - "src/uni_modules/uniapp-ui/**/*.vue"
  - "src/pages/**/*.vue"
  - "src/components/**/*.vue"
---

# `<script setup>` 块顺序

SFC 三块顺序：`<template>` → `<script setup lang="ts">` → `<script lang="ts">`（如有 options）→ `<style lang="scss" scoped>`。

## 严格 11 段顺序

```
 1. imports                     ← type 最前 → utils → 兄弟组件 inject key → ./index → hooks → vue api 最后
 2. defineOptions / defineProps / defineEmits   ← 三件套永远紧跟 imports，不被任何代码打断
 3. use* 钩子                    ← useParent / useChildren / useSlots / useMitt / useSystemInfo ...
 4. instance                    ← getCurrentInstance()
 5. ref / reactive 响应式状态     ← 同组按变量名长度短→长
 6. computed                    ← 短→长，单行 computed 一组紧排无空行；多行 computed 紧跟其后
 7. watch
 8. 普通函数                     ← 业务方法
 9. 生命周期                     ← onMounted / onUnmounted ...
10. linkChildren                ← 必须在它依赖的 toggle 等函数定义后
11. defineExpose                ← 最末尾
```

## Imports 内部顺序

```ts
import type { CSSProperties } from "vue" // 1. type
import { isNumber } from "../utils/check" // 2. utils
import { formItemKey } from "../ui-form-item" // 3. 兄弟组件 inject key
import { xxxEmits, xxxProps } from "./index" // 4. ./index
import { useUnit, useColor } from "../hooks" // 5. hooks
import { ref, computed, useSlots } from "vue" // 6. vue api 最后
```

## 完整示例

```vue
<script setup lang="ts">
// 1. imports
import type { CSSProperties } from "vue"
import { isEmpty } from "../utils/check"
import { xxxEmits, xxxProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"
import { ref, watch, computed, useSlots, onMounted } from "vue"

// 2. defineOptions / defineProps / defineEmits
defineOptions({ name: "ui-xxx" })
const props = defineProps(xxxProps)
const emits = defineEmits(xxxEmits)

// 3. use*
const slots = useSlots()

// 4. instance（如需要）
const instance = getCurrentInstance()

// 5. ref / reactive（短→长）
const id = ref("")
const list = ref([])
const visible = ref(false)
const submitting = ref(false)

// 6. computed
// 单行组（短→长）
const name = computed(() => props.name)
const total = computed(() => list.value.length)
// 多行组（短→长）
const style = computed(() => {
  const s: CSSProperties = {}
  if (props.color) s.color = useColor(props.color)
  return useStyle(s)
})

// 7. watch
watch(() => props.x, (val) => { ... })

// 8. 普通函数
function fetchData() { ... }
function handleClick() { ... }

// 9. 生命周期
onMounted(() => { ... })

// 10. linkChildren（如有）
linkChildren({ toggle, ... })

// 11. defineExpose
defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-xxx",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
```

## 模块级常量与工具类型

真正必要的模块级常量（数据表 / 正则）和工具类型从 `<script setup>` 提到 `./index.ts` export，避免破坏 setup 块顺序与被 `vue/define-macros-order` 报错。

## ESLint 自动调整

ESLint `--fix` 会按规则微调 import 顺序。如规则与本文档冲突以 ESLint 实际行为为准。
