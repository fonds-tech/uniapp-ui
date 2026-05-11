# Tabbar 标签栏

底部导航栏。配合 `ui-tabbar-item` 子项使用。支持固定底部 / 占位防遮挡 / 安全区适配 / 路由模式 / 切换拦截。

## 基础用法

```vue
<ui-tabbar v-model="active">
  <ui-tabbar-item icon="home" text="首页" />
  <ui-tabbar-item icon="search" text="搜索" />
  <ui-tabbar-item icon="user" text="我的" />
</ui-tabbar>
```

## 内嵌使用（非固定）

```vue
<ui-tabbar v-model="active" :fixed="false" :safe-area-inset-bottom="false">
  ...
</ui-tabbar>
```

> demo / 卡片内嵌场景必须 `fixed=false`，否则会固定到屏幕底部。

## 路由模式

```vue
<ui-tabbar v-model="active" route>
  <ui-tabbar-item icon="home" text="首页" route="/pages/home/index" />
  <ui-tabbar-item icon="user" text="我的" route="/pages/user/index" />
</ui-tabbar>
```

子项点击触发 `uni[routeType]` 跳转。

## 切换拦截 beforeChange

```vue
<ui-tabbar v-model="active" :before-change="onBefore" />

<script setup>
async function onBefore(name) {
  return await confirm("确定切换?")  // false / Promise<false> 阻止
}
</script>
```

## API

### Props

| 参数                   | 说明                             | 类型                                 | 默认值   |
| ---------------------- | -------------------------------- | ------------------------------------ | -------- |
| v-model                | 当前选中 name / index            | `number \| string`                   | `0`      |
| fixed                  | 固定到屏幕底部                   | `boolean`                            | `true`   |
| placeholder            | fixed 时生成同高占位元素         | `boolean`                            | `true`   |
| border                 | 顶部分隔线                       | `boolean`                            | `false`  |
| height                 | 高度                             | `number \| string`                   | `100rpx` |
| background             | 背景色                           | `string`                             | -        |
| z-index                | 元素层级                         | `number \| string`                   | -        |
| active-color           | 激活色（向 ui-tabbar-item 继承） | `string`                             | -        |
| inactive-color         | 未激活色                         | `string`                             | -        |
| safe-area-inset-bottom | 适配底部安全区                   | `boolean`                            | `true`   |
| route                  | 路由模式                         | `boolean`                            | `false`  |
| before-change          | 切换前拦截                       | `(name) => boolean \| Promise<bool>` | -        |
| custom-class           | 自定义类名                       | `string`                             | -        |
| custom-style           | 自定义样式                       | `string \| CSSProperties`            | -        |

### Events

| 事件名            | 说明                 | 回调参数                  |
| ----------------- | -------------------- | ------------------------- |
| update:modelValue | v-model              | `value: number \| string` |
| change            | 选中变化             | `name: number \| string`  |
| rect              | 容器尺寸（含安全区） | `rect: UniApp.NodeInfo`   |
| height            | 高度变化             | `height: number`          |

### Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 放 ui-tabbar-item 子项 |

### 暴露方法

| 方法   | 说明         |
| ------ | ------------ |
| resize | 重新测量尺寸 |
