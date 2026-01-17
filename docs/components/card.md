# Card 卡片

卡片容器组件，用于将信息聚合展示，支持封面图片、标题、描述、自定义内容等多种形式。

## 基础用法

通过 `title` 和 `desc` 属性设置卡片标题和描述信息。

```vue
<ui-card title="卡片标题" desc="这是卡片的描述信息，可以显示一些简短的说明文字。" />
```

## 带封面图片

通过 `thumb` 属性设置封面图片，`thumb-mode` 可设置图片填充模式，`thumb-height` 可自定义图片高度。

```vue
<ui-card
  title="风景图片"
  desc="一张美丽的风景照片"
  thumb="https://example.com/image.jpg"
/>

<!-- 自定义图片高度 -->
<ui-card
  title="自定义高度"
  thumb="https://example.com/image.jpg"
  thumb-height="400rpx"
/>
```

## 阴影模式

通过 `shadow` 属性设置卡片阴影显示模式，支持 `always`（始终显示）、`hover`（悬浮时显示）、`never`（不显示）。

```vue
<ui-card title="始终显示阴影" desc="shadow='always'" shadow="always" />
<ui-card title="悬浮时显示阴影" desc="shadow='hover'" shadow="hover" />
<ui-card title="不显示阴影" desc="shadow='never'" shadow="never" />
```

## 边框模式

通过 `border` 属性显示卡片边框。

```vue
<ui-card
  title="带边框的卡片"
  desc="通过 border 属性添加边框"
  border
  shadow="never"
/>
```

## 可点击卡片

设置 `clickable` 属性使卡片可点击，点击时会触发 `click` 事件。

```vue
<ui-card
  title="可点击的卡片"
  desc="点击卡片触发事件"
  clickable
  @click="onClickCard"
/>
```

## 自定义样式

通过 `radius`、`padding`、`background` 等属性自定义卡片外观样式。

```vue
<!-- 自定义圆角 -->
<ui-card title="自定义圆角" desc="radius=32rpx" radius="32rpx" />

<!-- 自定义内边距 -->
<ui-card title="自定义内边距" desc="padding=40rpx" padding="40rpx" />

<!-- 自定义背景色 -->
<ui-card title="自定义背景色" desc="background=#f0f9ff" background="#f0f9ff" />
```

## 自定义标题样式

通过 `title-color`、`title-size`、`title-weight` 等属性自定义标题样式，通过 `desc-color`、`desc-size` 自定义描述样式。

```vue
<ui-card
  title="主题色标题"
  desc="使用主色调"
  title-color="primary"
  title-size="36rpx"
/>

<ui-card
  title="成功色标题"
  desc="使用成功色"
  title-color="success"
/>
```

## 全宽模式

设置 `full` 属性使卡片占满全宽，无圆角效果。

```vue
<ui-card title="全宽卡片" desc="无圆角" full />
```

## 使用插槽

Card 组件提供多个插槽用于自定义内容。

### 默认插槽

默认插槽用于自定义卡片主体内容。

```vue
<ui-card title="卡片标题">
  <text>这是卡片的正文内容，可以放置任意的自定义内容。</text>
</ui-card>
```

### header 插槽

通过 `header` 插槽完全自定义头部区域。

```vue
<ui-card>
  <template #header>
    <view class="custom-header">
      <ui-avatar src="https://example.com/avatar.jpg" size="80rpx" />
      <view class="custom-header__info">
        <text class="custom-header__name">用户名称</text>
        <text class="custom-header__time">2024-01-01</text>
      </view>
    </view>
  </template>
  <text>卡片正文内容</text>
</ui-card>
```

### extra 插槽

通过 `extra` 插槽在头部右侧添加额外内容。

```vue
<ui-card title="带操作按钮的卡片" desc="右侧有更多操作">
  <template #extra>
    <ui-icon name="ellipsis" size="40rpx" />
  </template>
  <text>卡片内容区域</text>
</ui-card>
```

### cover 插槽

通过 `cover` 插槽完全自定义封面区域。

```vue
<ui-card title="自定义封面">
  <template #cover>
    <view class="custom-cover">
      <ui-icon name="video" size="60rpx" color="#fff" />
      <text class="custom-cover__text">视频封面</text>
    </view>
  </template>
</ui-card>
```

### footer 插槽

通过 `footer` 插槽自定义底部区域。

```vue
<ui-card title="用户名称">
  <text>卡片正文内容</text>
  <template #footer>
    <view class="custom-footer">
      <ui-button size="mini" type="primary">点赞</ui-button>
      <ui-button size="mini">评论</ui-button>
    </view>
  </template>
</ui-card>
```

## 综合示例

商品卡片示例，展示多种功能的组合使用。

```vue
<ui-card
  thumb="https://example.com/product.jpg"
  clickable
  @click="onClickProduct"
>
  <template #header>
    <view class="product-header">
      <view class="product-header__info">
        <text class="product-header__title">Apple iPhone 15 Pro Max</text>
        <text class="product-header__desc">256GB 原色钛金属</text>
      </view>
      <text class="product-header__price">¥9999</text>
    </view>
  </template>
  <template #footer>
    <view class="product-footer">
      <ui-tag type="primary" plain>新品</ui-tag>
      <ui-tag type="success" plain>免运费</ui-tag>
      <ui-button size="mini" type="primary">立即购买</ui-button>
    </view>
  </template>
</ui-card>
```

## API

### Props

| 属性名       | 说明               | 类型                                                                                                          | 默认值       |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------- | ------------ |
| title        | 卡片标题           | `string`                                                                                                      | -            |
| desc         | 卡片描述/副标题    | `string`                                                                                                      | -            |
| thumb        | 封面图片地址       | `string`                                                                                                      | -            |
| thumb-mode   | 封面图片填充模式   | `scaleToFill \| aspectFit \| aspectFill \| widthFix \| heightFix \| top \| bottom \| center \| left \| right` | `aspectFill` |
| thumb-height | 封面图片高度       | `string \| number`                                                                                            | -            |
| border       | 是否显示边框       | `boolean`                                                                                                     | `false`      |
| shadow       | 阴影显示模式       | `always \| hover \| never`                                                                                    | `always`     |
| radius       | 卡片圆角           | `string \| number`                                                                                            | -            |
| padding      | 卡片内边距         | `string \| number`                                                                                            | -            |
| background   | 卡片背景颜色       | `string`                                                                                                      | -            |
| title-color  | 标题颜色           | `string`                                                                                                      | -            |
| title-size   | 标题字体大小       | `string \| number`                                                                                            | -            |
| title-weight | 标题字重           | `string \| number`                                                                                            | -            |
| desc-color   | 描述颜色           | `string`                                                                                                      | -            |
| desc-size    | 描述字体大小       | `string \| number`                                                                                            | -            |
| clickable    | 是否可点击         | `boolean`                                                                                                     | `false`      |
| full         | 是否全宽（无圆角） | `boolean`                                                                                                     | `false`      |
| custom-class | 自定义类名         | `string`                                                                                                      | -            |
| custom-style | 自定义样式         | `string \| CSSProperties`                                                                                     | -            |

### Events

| 事件名      | 说明                               | 回调参数 |
| ----------- | ---------------------------------- | -------- |
| click       | 点击卡片时触发（需设置 clickable） | -        |
| click-thumb | 点击封面图片时触发                 | -        |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 卡片主体内容     |
| cover   | 自定义封面区域   |
| header  | 自定义头部区域   |
| extra   | 头部右侧额外内容 |
| footer  | 自定义底部区域   |

## 主题定制

组件提供以下 CSS 变量，可用于自定义样式：

| 变量名                 | 说明         | 默认值                           |
| ---------------------- | ------------ | -------------------------------- |
| --ui-card-radius       | 卡片圆角     | `var(--ui-radius-lg)`            |
| --ui-card-shadow       | 卡片阴影     | `var(--ui-shadow-sm)`            |
| --ui-card-padding      | 卡片内边距   | `var(--ui-spacing-xl)`           |
| --ui-card-background   | 卡片背景色   | `var(--ui-color-background)`     |
| --ui-card-title-size   | 标题字体大小 | `var(--ui-font-size-md)`         |
| --ui-card-title-color  | 标题颜色     | `var(--ui-color-text-primary)`   |
| --ui-card-desc-size    | 描述字体大小 | `var(--ui-font-size-sm)`         |
| --ui-card-desc-color   | 描述颜色     | `var(--ui-color-text-secondary)` |
| --ui-card-border-color | 边框颜色     | `var(--ui-color-border-light)`   |
