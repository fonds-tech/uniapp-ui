# UiPoster 组件

## 介绍

UiPoster 基于 Canvas 绘制分享海报。声明式描述 (text / image / rect / line) 渲染成图片并保存到相册。组件本身位于屏幕外（fixed -9999px），导出后由调用方决定如何展示。

## 代码演示

```vue
<template>
  <ui-button :loading="loading" @click="generate">生成海报</ui-button>
  <ui-button :disabled="!url" @click="save">保存到相册</ui-button>
  <image v-if="url" :src="url" mode="aspectFit" />
  <ui-poster ref="posterRef" :width="700" :height="900" @ready="ready = true" />
</template>

<script setup lang="ts">
import type { PosterDrawItem, PosterInstance } from "@/uni_modules/uniapp-ui/ui-poster"

const posterRef = ref<PosterInstance>()
const url = ref("")
const ready = ref(false)
const loading = ref(false)

const items: PosterDrawItem[] = [
  { type: "rect", style: { left: 0, top: 0, width: 700, height: 900, backgroundColor: "#ffffff" } },
  { type: "text", text: "标题", style: { left: 350, top: 100, fontSize: 48, color: "#333", textAlign: "center" } },
]

async function generate() {
  if (!ready.value) return
  loading.value = true
  try {
    url.value = await posterRef.value!.draw(items)
  } finally {
    loading.value = false
  }
}

async function save() {
  if (url.value) await posterRef.value!.save(url.value)
}
</script>
```

## Props

| 参数   | 说明                          | 类型             | 默认值 |
| ------ | ----------------------------- | ---------------- | ------ |
| width  | 海报宽度 (rpx)                | number \| string | 700    |
| height | 海报高度 (rpx)                | number \| string | 1100   |
| pixel  | 像素比 (越高越清晰，体积越大) | number \| string | 3      |

## Events

| 事件名 | 说明                       | 回调参数 |
| ------ | -------------------------- | -------- |
| ready  | canvas 上下文初始化完成    | -        |

## 实例方法

| 方法名 | 说明                      | 参数                       | 返回值              |
| ------ | ------------------------- | -------------------------- | ------------------- |
| draw   | 绘制并导出 tempFilePath   | items: PosterDrawItem[]    | Promise\<string\>   |
| save   | 保存图片到相册 (H5 预览)  | file: string               | Promise\<void\>     |

## DrawItem 类型

### text 文本

```ts
{ type: "text", text: "文字内容", frontText?: "前缀", style: PosterTextStyle }
```

| 字段        | 说明                                   | 默认值      |
| ----------- | -------------------------------------- | ----------- |
| left, top   | 起点坐标 (rpx)                         | -           |
| fontSize    | 字号 (rpx)                             | -           |
| color       | 文字颜色                               | -           |
| baseLine    | 基线: normal / top / middle / bottom   | normal      |
| textAlign   | 对齐: left / center / right            | left        |
| width       | 文本框宽度，超出换行 (rpx)             | 600         |
| rows        | 最大行数，-1 不限                      | 1           |
| lineHeight  | 行高 (rpx)，0 走 fontSize              | 0           |
| fontWeight  | 字重                                   | normal      |
| fontStyle   | 字形                                   | normal      |
| fontFamily  | 字体                                   | sans-serif  |
| opacity     | 透明度                                 | 1           |
| lineThrough | 删除线                                 | false       |
| frontSize   | 前缀字号 (与 frontText 配合)           | -           |
| spacing     | 前缀与正文间距                         | 0           |

### image 图片

```ts
{ type: "image", src: "url|local|base64", imgType: 1 | 2 | 3, style: PosterImageStyle }
```

`imgType`: `1` 本地路径 / `2` 网络图片 / `3` base64 (App / 微信小程序 / H5)

| 字段                          | 说明                                  |
| ----------------------------- | ------------------------------------- |
| left, top                     | 起点坐标 (rpx)                        |
| width, height                 | 尺寸 (rpx)                            |
| borderRadius                  | 圆角，单值或 `[tl, tr, br, bl]`       |
| borderWidth, borderColor      | 描边                                  |

### rect 矩形

```ts
{ type: "rect", style: PosterRectStyle }
```

| 字段                         | 说明                                                |
| ---------------------------- | --------------------------------------------------- |
| left, top, width, height     | 位置和尺寸 (rpx)                                    |
| backgroundColor              | 填充色                                              |
| gradientColor, gradientType  | 渐变终止色 + 方向 (1 横 / 2 纵)，与 bg 配合        |
| borderRadius                 | 圆角                                                |
| borderWidth, borderColor     | 描边                                                |
| opacity                      | 透明度                                              |
| globalCompositeOperation     | canvas 合成模式                                     |
| shadow                       | { offsetX, offsetY, blur, color }                  |

### line 线条

```ts
{ type: "line", style: PosterLineStyle }
```

| 字段                                      | 说明              |
| ----------------------------------------- | ----------------- |
| left, top, endLeft, endTop                | 起止坐标 (rpx)    |
| color                                     | 颜色              |
| width                                     | 线宽 (rpx)，默认 1 |
| lineDash                                  | 虚线段长度数组    |

## 平台差异

| 平台         | 图片来源       | 保存方式               |
| ------------ | -------------- | ---------------------- |
| H5           | 网络 / base64  | previewImage (长按保存) |
| 微信小程序   | 本地 / 网络 / base64 | saveImageToPhotosAlbum |
| 支付宝小程序 | 本地 / 网络    | toTempFilePath          |
| App          | 本地 / 网络 / base64 | 系统相册 (需权限)     |
| 抖音 / 百度  | 本地 / 网络    | -                       |

## 注意事项

- 同页面**多实例不会互相干扰**：每个实例 `canvasId` 唯一
- 像素比 `pixel=3` 高清但导出体积大；如对清晰度要求不高用 `2`
- `draw()` 异步等待网络图下载和 base64 转换，整体耗时 ≥ 200ms
- canvas 元素隐藏在 `top:-9999px`，调用方负责将 `draw` 返回的 url 渲染到 `<image>` 展示
