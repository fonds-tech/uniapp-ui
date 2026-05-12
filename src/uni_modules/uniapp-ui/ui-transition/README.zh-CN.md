# Transition 过渡动画

基础动画容器，包裹任意内容自动加进入 / 离开过渡。10 种内置动画。

## 基础用法

```vue
<ui-transition :show="visible" name="fade">
  <view class="box">内容</view>
</ui-transition>
```

## 内置动画 name

| 名称          | 效果            |
| ------------- | --------------- |
| `fade`        | 淡入淡出        |
| `zoom-in`     | 缩放            |
| `fade-up`     | 自下向上 + 淡入 |
| `fade-down`   | 自上向下 + 淡入 |
| `fade-left`   | 自右向左 + 淡入 |
| `fade-right`  | 自左向右 + 淡入 |
| `slide-up`    | 自下向上滑动    |
| `slide-down`  | 自上向下滑动    |
| `slide-left`  | 自右向左滑动    |
| `slide-right` | 自左向右滑动    |

## 自定义时长 / 缓动

```vue
<ui-transition :show="visible" name="zoom-in" :duration="600" enter-timing-function="cubic-bezier(0.5,1.5,0.5,1)" leave-timing-function="ease-in">
  <view>弹性进入</view>
</ui-transition>
```

## 命令式调用

```vue
<ui-transition ref="trRef" :show="false">
  <view>内容</view>
</ui-transition>

<script setup>
const trRef = ref()
trRef.value.enter()  // 触发进入
trRef.value.leave()  // 触发离开
</script>
```

## API

### Props

| 参数                | 说明             | 类型                      | 默认值       |
| ------------------- | ---------------- | ------------------------- | ------------ |
| show                | 显示状态         | `boolean`                 | `false`      |
| name                | 动画名           | `TransitionName`          | `"fade"`     |
| duration            | 动画时长（毫秒） | `number`                  | `300`        |
| enterTimingFunction | 进入缓动         | `string`                  | `"ease-out"` |
| leaveTimingFunction | 离开缓动         | `string`                  | `"ease-in"`  |
| lazyRender          | 显示时才挂载节点 | `boolean`                 | `true`       |
| zIndex              | 元素层级         | `number \| string`        | -            |
| customClass         | 自定义类名       | `string`                  | -            |
| customStyle         | 自定义样式       | `string \| CSSProperties` | -            |

### Events

| 事件名      | 说明         | 回调参数        |
| ----------- | ------------ | --------------- |
| update:show | 显示状态变化 | `show: boolean` |
| beforeEnter | 进入动画前   | -               |
| enter       | 进入动画开始 | -               |
| afterEnter  | 进入动画结束 | -               |
| beforeLeave | 离开动画前   | -               |
| leave       | 离开动画开始 | -               |
| afterLeave  | 离开动画结束 | -               |
| click       | 点击容器     | -               |

### 暴露方法

| 方法  | 说明     |
| ----- | -------- |
| enter | 触发进入 |
| leave | 触发离开 |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 过渡内容 |

## 注意事项

- `lazyRender=true`（默认）首次显示前不挂载 DOM；用于弹窗等可懒加载场景
- MP 端 `transitionend` 不可靠，内部有 fallback 定时器
- 用 `display: block` / `none` 切换可见性，配合 CSS transition 实现
- 嵌套多层 transition 时各层 `duration` 独立计时
