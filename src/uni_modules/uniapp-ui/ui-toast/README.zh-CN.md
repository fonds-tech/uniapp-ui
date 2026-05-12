# Toast 轻提示

轻量级消息提示组件。支持声明式（v-model:show）、命令式（ref）、全局 hook（useToast）三种调用方式。

## 调用方式

### 一、声明式 v-model:show

```vue
<template>
  <ui-toast v-model:show="visible" type="success" content="操作成功" />
  <ui-button @click="visible = true">显示</ui-button>
</template>

<script setup>
import { ref } from "vue"
const visible = ref(false)
</script>
```

### 二、命令式 ref

```vue
<template>
  <ui-toast ref="toastRef" />
  <ui-button @click="toastRef?.show('操作成功')">显示</ui-button>
</template>

<script setup>
import { ref } from "vue"
const toastRef = ref()
</script>
```

### 三、全局 useToast hook

根组件挂载一次 `<ui-toast />` 并 `provideToast(ref)`，业务代码内 `useToast()` 获取控制器。

```ts
import { useToast } from "@/uni_modules/uniapp-ui"
const toast = useToast()
toast.success("提交成功")
toast.fail("提交失败")
toast.loading("加载中...")
toast.hide()
```

## Loading 用法

`loading` 类型**默认不自动关闭**，需手动 `hide()` 或显式传 `duration`。

```ts
toast.loading("加载中...")
await fetchData()
toast.hide()
```

## API

### Props

| 参数         | 说明                                             | 类型                                                       | 默认值      |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| v-model:show | 显示状态                                         | `boolean`                                                  | `false`     |
| type         | 显示类型                                         | `"default" \| "loading" \| "await" \| "success" \| "fail"` | `"default"` |
| content      | 显示内容                                         | `string`                                                   | -           |
| icon         | 自定义图标（图标名或图片 URL）                   | `string`                                                   | -           |
| iconSize     | 图标尺寸                                         | `number \| string`                                         | -           |
| iconPrefix   | 图标前缀                                         | `string`                                                   | `"ui-icon"` |
| mask         | 显示透明蒙层防穿透                               | `boolean`                                                  | `false`     |
| position     | 显示位置                                         | `"top" \| "middle" \| "bottom"`                            | `"middle"`  |
| offset       | 位置偏移（top/bottom 时生效）                    | `number \| string`                                         | -           |
| width        | 容器宽度                                         | `number \| string`                                         | -           |
| background   | 背景色                                           | `string`                                                   | -           |
| duration     | 自动关闭时长（毫秒）；`0` 不关；loading 默认不关 | `number`                                                   | `2000`      |
| lazyRender   | 仅显示时挂载节点                                 | `boolean`                                                  | `true`      |
| customClass  | 自定义类名                                       | `string`                                                   | -           |
| customStyle  | 自定义样式                                       | `string \| CSSProperties`                                  | -           |

### Events

| 事件名      | 说明         | 回调参数        |
| ----------- | ------------ | --------------- |
| update:show | 显示状态变化 | `show: boolean` |
| open        | 打开         | -               |
| opened      | 打开动画结束 | -               |
| close       | 关闭         | -               |
| closed      | 关闭动画结束 | -               |

### 暴露方法

| 方法    | 参数                                 | 说明                         |
| ------- | ------------------------------------ | ---------------------------- |
| show    | `(options?: string \| ToastOptions)` | 显示（字符串作 content）     |
| hide    | -                                    | 关闭                         |
| open    | -                                    | 打开（沿用 props）           |
| close   | -                                    | 关闭                         |
| success | `(options?)`                         | type=success                 |
| fail    | `(options?)`                         | type=fail                    |
| loading | `(options?)`                         | type=loading，默认不自动关闭 |
| await   | `(options?)`                         | type=await                   |
| text    | `(options?)`                         | type=default                 |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |

### useToast 控制器

| 方法    | 参数         | 说明       |
| ------- | ------------ | ---------- |
| show    | `(options)`  | 显示       |
| hide    | -            | 关闭       |
| success | `(options?)` | 成功提示   |
| fail    | `(options?)` | 失败提示   |
| loading | `(options?)` | 加载提示   |
| await   | `(options?)` | 等待提示   |
| text    | `(options?)` | 纯文本提示 |

Instance 未挂载时调用自动入队列，挂载后顺序消费（请求拦截器场景常用）。

### CSS Variables

| 变量名                       | 默认值                                      | 说明             |
| ---------------------------- | ------------------------------------------- | ---------------- |
| `--ui-toast-bg`              | `rgba(0, 0, 0, 0.7)`                        | 主体背景         |
| `--ui-toast-color`           | `var(--ui-color-text-inverse)`              | 文本颜色         |
| `--ui-toast-radius`          | `var(--ui-radius-md)`                       | 圆角             |
| `--ui-toast-padding`         | `var(--ui-spacing-md) var(--ui-spacing-lg)` | 内边距           |
| `--ui-toast-max-width`       | `calc(100% - 160rpx)`                       | 最大宽度         |
| `--ui-toast-icon-size`       | `60rpx`                                     | 图标尺寸         |
| `--ui-toast-icon-bg-size`    | `240rpx`                                    | 图标态容器尺寸   |
| `--ui-toast-icon-bg-padding` | `var(--ui-spacing-lg)`                      | 图标态容器内边距 |
| `--ui-toast-loading-color`   | `var(--ui-color-text-inverse)`              | loading 转圈色   |
| `--ui-toast-loading-track`   | `var(--ui-color-mask-light)`                | loading 轨道色   |

## 注意事项

- `loading` 类型默认不自动关闭，需手动 `hide()`
- `mask=true` 时拦截屏幕点击；默认 `mask=false` 不拦截
- 多次连续 `show()` 会重置定时器，内容立即切换
- 全局 hook 使用前需在根组件 `provideToast(ref)`，根组件卸载时 `unprovideToast()`
