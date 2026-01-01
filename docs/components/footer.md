# Footer 页脚

固定在页面底部的页脚组件。

## 基础用法

```vue
<template>
  <ui-footer background="#f5f5f5">
    <view class="footer-content">
      <text>页脚内容</text>
    </view>
  </ui-footer>
</template>
```

## 操作按钮

常用于商品详情页等需要底部操作栏的场景。

```vue
<template>
  <ui-footer background="#fff">
    <view class="footer-bar">
      <view class="footer-icons">
        <ui-icon-text name="heart" text="收藏" size="40rpx" />
        <ui-icon-text name="cart" text="购物车" size="40rpx" />
      </view>
      <view class="footer-buttons">
        <ui-button type="warning" size="small">加入购物车</ui-button>
        <ui-button type="primary" size="small">立即购买</ui-button>
      </view>
    </view>
  </ui-footer>
</template>
```

## 版权信息

```vue
<template>
  <ui-footer background="transparent">
    <view class="footer-copyright">
      <text>Copyright © 2024 UniApp UI</text>
      <text>基于 MIT 许可发布</text>
    </view>
  </ui-footer>
</template>
```

## Props

| 参数                   | 说明                 | 类型               | 默认值 |
| ---------------------- | -------------------- | ------------------ | ------ |
| z-index                | 元素层级             | `string \| number` | -      |
| offset                 | 距离底部偏移         | `string \| number` | `0`    |
| background             | 背景颜色             | `string`           | -      |
| safe-area-inset-bottom | 是否开启底部安全区域 | `boolean`          | `true` |
| custom-class           | 自定义类名           | `string`           | -      |
| custom-style           | 自定义样式           | `string \| object` | -      |

## Events

| 事件名 | 说明               | 回调参数                |
| ------ | ------------------ | ----------------------- |
| rect   | 获取元素信息时触发 | `rect: UniApp.NodeInfo` |
| height | 获取元素高度时触发 | `height: number`        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 页脚内容 |
