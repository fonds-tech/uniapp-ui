# Poster 海报

Canvas 海报生成组件，用于生成分享图片、营销海报等。

## 基础用法

```vue
<template>
  <ui-poster ref="posterRef" :width="700" :height="1100" @ready="onReady" />
  <ui-button type="primary" @click="generatePoster">生成海报</ui-button>
</template>

<script setup>
import { ref } from "vue"

const posterRef = ref()

function onReady() {
  console.log("海报组件准备就绪")
}

function generatePoster() {
  const data = [
    // 背景
    {
      type: "rect",
      style: {
        left: 0,
        top: 0,
        width: 700,
        height: 1100,
        backgroundColor: "#ffffff",
      },
    },
    // 图片
    {
      type: "image",
      src: "/static/images/product.jpg",
      imgType: 1, // 1-本地图片 2-网络图片 3-base64
      style: {
        left: 50,
        top: 50,
        width: 600,
        height: 600,
        borderRadius: 16,
      },
    },
    // 文字
    {
      type: "text",
      text: "商品标题",
      style: {
        left: 50,
        top: 700,
        fontSize: 32,
        color: "#333333",
        fontWeight: "bold",
      },
    },
    // 价格
    {
      type: "text",
      text: "¥99.00",
      style: {
        left: 50,
        top: 760,
        fontSize: 48,
        color: "#ee0a24",
        fontWeight: "bold",
      },
    },
  ]

  posterRef.value.draw(data, (filePath) => {
    if (filePath) {
      // 预览或保存
      uni.previewImage({ urls: [filePath] })
    }
  })
}
</script>
```

## 绘制圆角矩形

```vue
<script setup>
const rectData = [
  {
    type: "rect",
    style: {
      left: 50,
      top: 50,
      width: 200,
      height: 200,
      backgroundColor: "#1989fa",
      borderRadius: 16, // 统一圆角
      // borderRadius: [16, 16, 0, 0], // 分别设置四个角
    },
  },
]
</script>
```

## 绘制网络图片

```vue
<script setup>
const imageData = [
  {
    type: "image",
    src: "https://example.com/image.jpg",
    imgType: 2, // 网络图片
    style: {
      left: 50,
      top: 50,
      width: 300,
      height: 300,
      borderRadius: 150, // 圆形
    },
  },
]
</script>
```

## 绘制多行文字

```vue
<script setup>
const textData = [
  {
    type: "text",
    text: "这是一段很长很长的文字，需要自动换行显示，超出部分会显示省略号...",
    style: {
      left: 50,
      top: 50,
      fontSize: 28,
      color: "#333",
      width: 600, // 文字宽度
      rows: 2, // 最大行数
      lineHeight: 40, // 行高
    },
  },
]
</script>
```

## 绘制线条

```vue
<script setup>
const lineData = [
  {
    type: "line",
    style: {
      left: 50,
      top: 100,
      endLeft: 650,
      endTop: 100,
      color: "#eeeeee",
      width: 2,
      lineDash: [10, 5], // 虚线
    },
  },
]
</script>
```

## Props

| 参数   | 说明                     | 类型               | 默认值 |
| ------ | ------------------------ | ------------------ | ------ |
| width  | 海报宽度(rpx)            | `number \| string` | `700`  |
| height | 海报高度(rpx)            | `number \| string` | `1100` |
| pixel  | 像素比，值越大清晰度越高 | `number \| string` | `3`    |

## Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| ready  | 组件准备就绪时触发 | -        |

## Methods

| 方法名 | 说明           | 参数                                                                |
| ------ | -------------- | ------------------------------------------------------------------- |
| draw   | 绘制海报       | `(data: DrawItem[], callback: (filePath: string \| false) => void)` |
| save   | 保存海报到相册 | `(filePath: string)`                                                |

## DrawItem 绘制数据

### rect 矩形

| 参数                  | 说明                   | 类型                                |
| --------------------- | ---------------------- | ----------------------------------- |
| type                  | 类型                   | `'rect'`                            |
| style.left            | 左边距                 | `number`                            |
| style.top             | 上边距                 | `number`                            |
| style.width           | 宽度                   | `number`                            |
| style.height          | 高度                   | `number`                            |
| style.backgroundColor | 背景色                 | `string`                            |
| style.gradientColor   | 渐变色                 | `string`                            |
| style.gradientType    | 渐变类型 1-对角 2-水平 | `number`                            |
| style.borderRadius    | 圆角                   | `number \| number[]`                |
| style.borderWidth     | 边框宽度               | `number`                            |
| style.borderColor     | 边框颜色               | `string`                            |
| style.opacity         | 透明度                 | `number`                            |
| style.shadow          | 阴影                   | `{ offsetX, offsetY, blur, color }` |

### image 图片

| 参数               | 说明                            | 类型                 |
| ------------------ | ------------------------------- | -------------------- |
| type               | 类型                            | `'image'`            |
| src                | 图片地址                        | `string`             |
| imgType            | 图片类型 1-本地 2-网络 3-base64 | `number`             |
| style.left         | 左边距                          | `number`             |
| style.top          | 上边距                          | `number`             |
| style.width        | 宽度                            | `number`             |
| style.height       | 高度                            | `number`             |
| style.borderRadius | 圆角                            | `number \| number[]` |
| style.borderWidth  | 边框宽度                        | `number`             |
| style.borderColor  | 边框颜色                        | `string`             |

### text 文字

| 参数              | 说明         | 类型                                        |
| ----------------- | ------------ | ------------------------------------------- |
| type              | 类型         | `'text'`                                    |
| text              | 文字内容     | `string`                                    |
| style.left        | 左边距       | `number`                                    |
| style.top         | 上边距       | `number`                                    |
| style.fontSize    | 字体大小     | `number`                                    |
| style.color       | 字体颜色     | `string`                                    |
| style.fontWeight  | 字体粗细     | `string`                                    |
| style.fontStyle   | 字体样式     | `string`                                    |
| style.fontFamily  | 字体         | `string`                                    |
| style.textAlign   | 文字对齐     | `'left' \| 'center' \| 'right'`             |
| style.baseLine    | 基线对齐     | `'top' \| 'middle' \| 'bottom' \| 'normal'` |
| style.width       | 文字区域宽度 | `number`                                    |
| style.rows        | 最大行数     | `number`                                    |
| style.lineHeight  | 行高         | `number`                                    |
| style.lineThrough | 是否删除线   | `boolean`                                   |
| style.opacity     | 透明度       | `number`                                    |

### line 线条

| 参数           | 说明       | 类型       |
| -------------- | ---------- | ---------- |
| type           | 类型       | `'line'`   |
| style.left     | 起点左边距 | `number`   |
| style.top      | 起点上边距 | `number`   |
| style.endLeft  | 终点左边距 | `number`   |
| style.endTop   | 终点上边距 | `number`   |
| style.color    | 线条颜色   | `string`   |
| style.width    | 线条宽度   | `number`   |
| style.lineDash | 虚线间隔   | `number[]` |
