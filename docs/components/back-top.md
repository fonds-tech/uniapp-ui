# BackTop 返回顶部

返回顶部按钮组件，当页面滚动到一定距离时显示。

## 基础用法

向下滚动页面时，右下角会出现返回顶部按钮。

```vue
<template>
  <view>
    <!-- 页面内容 -->
    <view v-for="i in 30" :key="i" class="content-item"> 内容 {{ i }} </view>

    <!-- 返回顶部按钮 -->
    <ui-back-top />
  </view>
</template>
```
