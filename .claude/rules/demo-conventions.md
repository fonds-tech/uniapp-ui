---
paths:
  - "src/pages/demo/**/*.vue"
---

# Demo 页面规范

每个组件配 `src/pages/demo/{kebab-name}/index.vue` demo 页。

## 容器三件套

`demo-page` / `demo-section` / `demo-block` 是文档/演示工程提供的布局容器。**不要用裸 view 自己写 padding/border/title 排版。**

```vue
<template>
  <demo-page>
    <demo-section title="基础用法" desc="组件最小用法说明">
      <demo-block direction="column" :gap="12">
        <ui-xxx />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block :cols="4" :gap="12">
        <ui-xxx color="primary" />
        <ui-xxx color="success" />
        <ui-xxx color="warning" />
        <ui-xxx color="danger" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>
```

## definePage

```ts
definePage({
  style: { navigationBarTitleText: "Xxx 组件" },
})
```

涉及自定义 navbar 等需要关闭原生导航栏：

```ts
definePage({
  style: { navigationStyle: "custom", navigationBarTitleText: "Navbar 导航栏" },
})
```

## 用真实组件，不要重写视觉

❌ 不要在 demo 用 `<view class="my-button">` 模拟组件外观
✅ 用真实 `<ui-button>` 实例 + 不同 props 切换

## 单实例 + 切换按钮（针对复杂组件）

参考 `pages/demo/footer/` `pages/demo/header/` `pages/demo/navbar/` 模式：

- 单一组件实例固定渲染
- 下方多个 `demo-section` 用按钮组切换 props（场景切换 / 颜色 / 尺寸 / 状态）
- 用户能即时看到 props 变化对真实组件的影响

```vue
<ui-navbar :title="currentScene.title" :show-back="currentScene.showBack" :background="background" />

<demo-section title="场景切换">
  <demo-block :cols="3" :gap="12">
    <ui-button v-for="(s, i) in scenes" :key="s.key" size="small" :type="current === i ? 'primary' : 'default'" @click="current = i">
      {{ s.label }}
    </ui-button>
  </demo-block>
</demo-section>

<demo-section title="背景色">
  <demo-block :cols="4" :gap="12">
    <ui-button size="small" :type="background === '' ? 'primary' : 'default'" @click="background = ''">默认</ui-button>
    <ui-button size="small" :type="background === 'primary' ? 'primary' : 'default'" @click="background = 'primary'">主色</ui-button>
    ...
  </demo-block>
</demo-section>
```

## sub-label 用切换按钮替代

旧模式：每个 `demo-block` 内放多个组件实例 + 文字标签描述。
新模式：标签换成可点击切换按钮，用户主动切换。

## 综合业务场景 section

复杂组件最后加一节"综合场景"：模拟真实业务场景（电商搜索栏 / 购物车结算栏 / 评论输入栏 / 订单步骤等）。展示组件在实际项目中的样子。

## 事件回显

提供 `事件回显` section 把组件 emit 的事件实时打印到屏幕，用户可验证事件触发：

```vue
<demo-section title="事件处理">
  <demo-block direction="column" align="start" :gap="8">
    <text class="demo-text">{{ eventLog }}</text>
    <ui-xxx @change="onChange" @click="onClick" />
  </demo-block>
</demo-section>
```

## 实例方法演示

如果组件 `defineExpose` 了方法（`resize` / `reset` / `validate` 等），加 `实例方法` section：

```vue
<demo-section title="实例方法 (resize)">
  <demo-block :gap="12">
    <ui-button size="small" @click="onResize">手动触发 resize()</ui-button>
  </demo-block>
</demo-section>
```

## 页面级 SCSS

仅写 demo 自身的辅助样式（demo-text / 切换按钮容器等）。**不要用 hex 硬编码颜色**，走 token：

```scss
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
```

## 死代码清理

- 删未引用的样式
- 删未触发的事件函数
- 删未使用的 import

每次审计 demo 时一并扫一遍。

## 禁忌

- ❌ `:deep()` / `>>>` 样式穿透
- ❌ `!important`
- ❌ 引用其他 UI 框架（Element / Vant 等）作"对比"
- ❌ 在 demo 写业务逻辑（API 调用 / 路由跳转，除非组件本身演示需要）
