# Swiper 轮播

### 介绍

用于循环播放一组图片或内容。

### 引入

```js
import { UiSwiper } from "ui-ui"

// 注册组件
app.component("ui-swiper", UiSwiper)
```

## 代码演示

### 基础用法

通过 `list` 属性设置轮播内容,`autoplay` 属性设置自动轮播的间隔。

```html
<ui-swiper :list="images" :autoplay="3000" />
```

```js
export default {
  setup() {
    const images = [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg",
    ]
    return { images }
  },
}
```

### 自定义大小

通过 `width` 和 `height` 属性设置轮播容器的大小。

```html
<ui-swiper :list="images" width="300px" height="200px" />
```

### 监听切换事件

通过 `change` 事件可以监听到轮播图的切换。

```html
<ui-swiper :list="images" @change="onChange" />
```

```js
export default {
  setup() {
    const onChange = (index) => {
      console.log("当前轮播索引:", index)
    }
    return { onChange }
  },
}
```

### 自定义指示器

通过 `indicator` 插槽可以自定义指示器的样式。

```html
<ui-swiper :list="images">
  <template #indicator="{ current, total }">
    <div class="custom-indicator">{{ current + 1 }}/{{ total }}</div>
  </template>
</ui-swiper>

<style>
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
</style>
```

## API

### Props

| 参数               | 说明                    | 类型               | 默认值           | 可选值                                                                                            |
| ------------------ | ----------------------- | ------------------ | ---------------- | ------------------------------------------------------------------------------------------------- |
| list               | 轮播数据列表            | _array \| string_  | `[]`             | -                                                                                                 |
| width              | 轮播容器宽度            | _number \| string_ | -                | -                                                                                                 |
| height             | 轮播容器高度            | _number \| string_ | -                | -                                                                                                 |
| radius             | 轮播容器圆角            | _number \| string_ | -                | -                                                                                                 |
| current            | 当前所在滑块的 index    | _number_           | `0`              | -                                                                                                 |
| circular           | 是否开启循环播放        | _boolean_          | `true`           | -                                                                                                 |
| interval           | 自动切换时间间隔 (ms)   | _number_           | `3000`           | -                                                                                                 |
| duration           | 滑动动画时长 (ms)       | _number_           | `500`            | -                                                                                                 |
| vertical           | 是否为纵向滚动          | _boolean_          | `false`          | -                                                                                                 |
| autoplay           | 是否自动切换            | _boolean_          | `true`           | -                                                                                                 |
| disable-touch      | 是否禁止用户 touch 操作 | _boolean_          | `false`          | -                                                                                                 |
| indicator          | 是否显示指示器          | _boolean_          | `true`           | -                                                                                                 |
| indicator-type     | 指示器类型              | _string_           | `'dot'`          | `'dot'` `'number'`                                                                                |
| indicator-position | 指示器位置              | _string_           | `'bottom-right'` | `'left'` `'top-left'` `'top'` `'top-right'` `'right'` `'bottom-left'` `'bottom'` `'bottom-right'` |
| prev-gap           | 前边距                  | _number \| string_ | -                | -                                                                                                 |
| next-gap           | 后边距                  | _number \| string_ | -                | -                                                                                                 |
| easing-function    | 指定切换缓动动画类型    | _string_           | `'default'`      | `'default'` `'linear'` `'easeInCubic'` `'easeOutCubic'` `'easeInOutCubic'`                        |
| image-mode         | 图片模式                | _string_           | `'scaleToFill'`  | 参考 [uni-app 文档](https://uniapp.dcloud.net.cn/component/image.html#image)                      |
| field-keys         | 数据字段映射            | _object_           | -                | -                                                                                                 |
| custom-class       | 自定义类名              | _string_           | -                | -                                                                                                 |
| custom-style       | 自定义样式              | _string \| object_ | -                | -                                                                                                 |

### Events

| 事件名          | 说明               | 回调参数                 |
| --------------- | ------------------ | ------------------------ |
| change          | 轮播切换时触发     | index: 当前轮播的索引    |
| transition      | 过渡动画发生时触发 | { x: number, y: number } |
| animationfinish | 动画结束时触发     | index: 当前轮播的索引    |

### Slots

| 名称      | 说明         | 参数                             |
| --------- | ------------ | -------------------------------- |
| indicator | 自定义指示器 | { index: number, total: number } |

### 方法

通过 ref 可以获取到 Swiper 实例并调用实例方法。

| 方法名   | 说明           | 参数          | 返回值 |
| -------- | -------------- | ------------- | ------ |
| prev     | 切换到上一张   | -             | -      |
| next     | 切换到下一张   | -             | -      |
| swiperTo | 切换到指定索引 | index: number | -      |
