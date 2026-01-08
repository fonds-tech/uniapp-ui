---
name: test-generator
description: 根据组件 Props/Emits 自动生成测试用例模板。当用户要求为组件编写测试时应用。
user_invocable: true
---

# 测试用例生成器

根据组件的 Props 和 Emits 定义自动生成 Vitest 测试用例模板。

---

## 使用方式

用户输入示例：
- "为 ui-button 生成测试用例"
- "给 button 组件写测试"
- "/test-generator ui-button"

---

## 生成文件结构

```
tests/components/
└── {name}.test.ts
```

---

## 测试模板

```typescript
/**
 * ui-{name} 组件单元测试
 * 测试组件的 props、events、slots 和渲染逻辑
 */

import Ui{Name} from "@/uni_modules/uniapp-ui/ui-{name}/ui-{name}.vue"
import { mount } from "@vue/test-utils"
import { it, expect, describe } from "vitest"

describe("ui-{name} 组件", () => {
  // ===================== 基础渲染 =====================

  describe("基础渲染", () => {
    it("应正确渲染组件", () => {
      const wrapper = mount(Ui{Name})
      expect(wrapper.find(".ui-{name}").exists()).toBe(true)
    })
  })

  // ===================== Props 测试 =====================

  describe("尺寸", () => {
    const sizes = ["mini", "small", "normal", "medium", "large"] as const

    sizes.forEach((size) => {
      it(`应支持 ${size} 尺寸`, () => {
        const wrapper = mount(Ui{Name}, {
          props: { size },
        })
        expect(wrapper.classes()).toContain(`ui-{name}--${size}`)
      })
    })
  })

  describe("禁用状态", () => {
    it("disabled 为 true 时应添加禁用类名", () => {
      const wrapper = mount(Ui{Name}, {
        props: { disabled: true },
      })
      expect(wrapper.classes()).toContain("ui-{name}--disabled")
    })

    it("禁用状态下点击不应触发事件", async () => {
      const wrapper = mount(Ui{Name}, {
        props: { disabled: true },
      })
      await wrapper.find(".ui-{name}").trigger("click")
      expect(wrapper.emitted("click")).toBeFalsy()
    })
  })

  // ===================== Events 测试 =====================

  describe("事件处理", () => {
    it("点击应触发 click 事件", async () => {
      const wrapper = mount(Ui{Name})
      await wrapper.find(".ui-{name}").trigger("click")
      expect(wrapper.emitted("click")).toBeTruthy()
    })
  })

  // ===================== Slots 测试 =====================

  describe("插槽", () => {
    it("默认插槽应正确渲染", () => {
      const wrapper = mount(Ui{Name}, {
        slots: { default: "插槽内容" },
      })
      expect(wrapper.text()).toContain("插槽内容")
    })
  })

  // ===================== 自定义样式 =====================

  describe("自定义样式", () => {
    it("应支持自定义类名", () => {
      const wrapper = mount(Ui{Name}, {
        props: { customClass: "my-class" },
      })
      expect(wrapper.classes()).toContain("my-class")
    })

    it("应支持自定义样式对象", () => {
      const wrapper = mount(Ui{Name}, {
        props: { customStyle: { color: "red" } },
      })
      expect(wrapper.find(".ui-{name}").exists()).toBe(true)
    })
  })
})
```

---

## 测试类型说明

### 1. Props 测试

为每个 Prop 生成测试用例：

| Prop 类型 | 测试内容 |
|-----------|----------|
| `Boolean` | 验证 true/false 行为 |
| `String` (枚举) | 遍历所有可选值 |
| `Number` | 验证数值计算 |
| `styleProp` | 验证样式应用 |

### 2. Emits 测试

为每个 Emit 生成测试用例：

```typescript
it("{eventName} 事件应正确触发", async () => {
  const wrapper = mount(Component)
  // 触发条件
  expect(wrapper.emitted("{eventName}")).toBeTruthy()
})
```

### 3. Slots 测试

```typescript
it("{slotName} 插槽应正确渲染", () => {
  const wrapper = mount(Component, {
    slots: { {slotName}: "<div>内容</div>" },
  })
  expect(wrapper.find(".xxx").exists()).toBe(true)
})
```

---

## 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定组件测试
pnpm test {name}

# 生成覆盖率报告
pnpm test:coverage

# 监听模式
pnpm test:watch
```

---

## 测试覆盖要求

| 类型 | 最低覆盖率 |
|------|------------|
| Props | 100% |
| Emits | 100% |
| 核心逻辑 | 80%+ |
| 边界条件 | 关键路径 |

---

## 检查清单

生成测试后确保：

- [ ] 所有 Props 都有对应测试
- [ ] 所有 Emits 都有触发测试
- [ ] 禁用状态有专门测试
- [ ] 快照测试已生成
- [ ] 测试可以通过 `pnpm test`
