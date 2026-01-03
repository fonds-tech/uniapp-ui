# Header 页头

固定在页面顶部的头部组件，自动计算高度并生成占位元素，避免内容被遮挡。

## 基础用法

```vue
<template>
  <ui-header background="#1989fa">
    <view class="header-content">
      <text class="header-title">页头标题</text>
    </view>
  </ui-header>
</template>
```

## 应用场景

Header 组件适用于多种业务场景，以下是常见的使用方式。

### 电商搜索栏

包含定位、搜索框、扫码和消息图标，适用于电商首页顶部导航。

```vue
<template>
  <ui-header background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
    <view class="shop-header">
      <view class="shop-header__location">
        <ui-icon name="location" size="28rpx" color="#fff" />
        <text class="shop-header__city">杭州</text>
        <ui-icon name="down" size="20rpx" color="#fff" />
      </view>
      <view class="shop-header__search">
        <ui-icon name="search" size="28rpx" color="#999" />
        <text class="shop-header__placeholder">搜索商品</text>
      </view>
      <view class="shop-header__actions">
        <ui-icon name="scan" size="40rpx" color="#fff" />
        <ui-icon name="bell" size="40rpx" color="#fff" />
      </view>
    </view>
  </ui-header>
</template>

<style>
.shop-header {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  gap: 16rpx;
}
.shop-header__location {
  display: flex;
  align-items: center;
  gap: 4rpx;
}
.shop-header__city {
  font-size: 24rpx;
  color: #fff;
}
.shop-header__search {
  flex: 1;
  height: 56rpx;
  background: #fff;
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  gap: 8rpx;
}
.shop-header__placeholder {
  font-size: 24rpx;
  color: #999;
}
.shop-header__actions {
  display: flex;
  gap: 20rpx;
}
</style>
```

### 筛选排序栏

商品列表页常用的综合、销量、价格排序筛选，支持升降序切换。

```vue
<template>
  <ui-header background="#fff">
    <view class="filter-header">
      <view
        v-for="(item, index) in filterTabs"
        :key="item.key"
        class="filter-header__item"
        :class="{ active: activeFilter === index }"
        @click="onFilterClick(index)"
      >
        <text>{{ item.label }}</text>
        <ui-icon v-if="item.sortable" :name="item.asc ? 'up' : 'down'" size="20rpx" />
      </view>
    </view>
  </ui-header>
</template>

<script setup>
const activeFilter = ref(0)
const filterTabs = [
  { key: 'default', label: '综合', sortable: false },
  { key: 'sales', label: '销量', sortable: true, asc: false },
  { key: 'price', label: '价格', sortable: true, asc: true },
  { key: 'new', label: '新品', sortable: false },
]

function onFilterClick(index) {
  activeFilter.value = index
  if (filterTabs[index].sortable) {
    filterTabs[index].asc = !filterTabs[index].asc
  }
}
</script>

<style>
.filter-header {
  display: flex;
  padding: 20rpx 24rpx;
}
.filter-header__item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
  font-size: 26rpx;
  color: #666;
}
.filter-header__item.active {
  color: #1989fa;
  font-weight: 600;
}
</style>
```

### 分类导航

横向滚动的分类标签，带选中态指示器，适用于分类页或列表页。

```vue
<template>
  <ui-header background="#fff">
    <scroll-view scroll-x class="category-tabs">
      <view class="category-tabs__inner">
        <view
          v-for="(tab, index) in tabs"
          :key="tab"
          class="category-tabs__item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          <text>{{ tab }}</text>
          <view v-if="activeTab === index" class="category-tabs__line" />
        </view>
      </view>
    </scroll-view>
  </ui-header>
</template>

<script setup>
const activeTab = ref(0)
const tabs = ['推荐', '手机', '电脑', '家电', '服饰', '美妆', '食品']
</script>

<style>
.category-tabs {
  white-space: nowrap;
}
.category-tabs__inner {
  display: inline-flex;
  padding: 0 16rpx;
}
.category-tabs__item {
  padding: 24rpx 28rpx;
  position: relative;
  font-size: 26rpx;
  color: #666;
}
.category-tabs__item.active {
  color: #1989fa;
  font-weight: 600;
}
.category-tabs__line {
  position: absolute;
  bottom: 12rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 32rpx;
  height: 6rpx;
  background: #1989fa;
  border-radius: 3rpx;
}
</style>
```

### 迷你播放器

音乐/视频类应用的悬浮播放控制条，显示封面、信息和控制按钮。

```vue
<template>
  <ui-header background="#fff">
    <view class="player-header">
      <image class="player-header__cover" src="/static/cover.jpg" mode="aspectFill" />
      <view class="player-header__info">
        <text class="player-header__title">歌曲名称 - 歌手</text>
        <text class="player-header__sub">正在播放</text>
      </view>
      <view class="player-header__controls">
        <ui-icon name="step-backward" size="36rpx" color="#333" />
        <view class="player-header__play" @click="isPlaying = !isPlaying">
          <ui-icon :name="isPlaying ? 'pause' : 'caret-right'" size="28rpx" color="#fff" />
        </view>
        <ui-icon name="step-forward" size="36rpx" color="#333" />
      </view>
    </view>
  </ui-header>
</template>

<style>
.player-header {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  gap: 16rpx;
}
.player-header__cover {
  width: 72rpx;
  height: 72rpx;
  border-radius: 12rpx;
}
.player-header__info {
  flex: 1;
}
.player-header__title {
  display: block;
  font-size: 26rpx;
  font-weight: 500;
  color: #333;
}
.player-header__sub {
  font-size: 22rpx;
  color: #999;
}
.player-header__controls {
  display: flex;
  align-items: center;
  gap: 20rpx;
}
.player-header__play {
  width: 56rpx;
  height: 56rpx;
  background: #1989fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### 步骤进度

订单流程、表单向导等场景的步骤进度指示器，支持已完成状态。

```vue
<template>
  <ui-header background="#fff">
    <view class="steps-header">
      <view v-for="(step, index) in steps" :key="step" class="steps-header__item">
        <view class="steps-header__dot" :class="{ active: index <= currentStep, done: index < currentStep }">
          <ui-icon v-if="index < currentStep" name="check" size="20rpx" color="#fff" />
          <text v-else>{{ index + 1 }}</text>
        </view>
        <text class="steps-header__label" :class="{ active: index <= currentStep }">{{ step }}</text>
        <view v-if="index < steps.length - 1" class="steps-header__line" :class="{ active: index < currentStep }" />
      </view>
    </view>
  </ui-header>
</template>

<script setup>
const currentStep = ref(1)
const steps = ['填写信息', '确认订单', '支付完成']
</script>

<style>
.steps-header {
  display: flex;
  padding: 28rpx 24rpx;
}
.steps-header__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.steps-header__dot {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #999;
  z-index: 2;
}
.steps-header__dot.active {
  background: #1989fa;
  color: #fff;
}
.steps-header__dot.done {
  background: #07c160;
}
.steps-header__label {
  margin-top: 12rpx;
  font-size: 22rpx;
  color: #999;
}
.steps-header__label.active {
  color: #333;
}
.steps-header__line {
  position: absolute;
  top: 20rpx;
  left: 50%;
  width: 100%;
  height: 4rpx;
  background: #e8e8e8;
  z-index: 1;
}
.steps-header__line.active {
  background: #07c160;
}
</style>
```

### 公告通知栏

顶部的活动公告或系统通知，支持关闭按钮。

```vue
<template>
  <ui-header v-if="showNotice" background="#fffbe6">
    <view class="notice-header">
      <ui-icon name="sound" size="32rpx" color="#fa8c16" />
      <text class="notice-header__text">双11活动进行中，全场满300减50</text>
      <ui-icon name="close" size="28rpx" color="#999" @click="showNotice = false" />
    </view>
  </ui-header>
</template>

<script setup>
const showNotice = ref(true)
</script>

<style>
.notice-header {
  display: flex;
  align-items: center;
  padding: 20rpx 24rpx;
  gap: 12rpx;
}
.notice-header__text {
  flex: 1;
  font-size: 26rpx;
  color: #d46b08;
}
</style>
```

## Props

| 参数                | 说明                 | 类型               | 默认值  |
| ------------------- | -------------------- | ------------------ | ------- |
| z-index             | 元素层级             | `string \| number` | -       |
| offset              | 距离顶部偏移         | `string \| number` | `0`     |
| background          | 背景颜色             | `string`           | -       |
| safe-area-inset-top | 是否开启顶部安全区域 | `boolean`          | `false` |
| custom-class        | 自定义类名           | `string`           | -       |
| custom-style        | 自定义样式           | `string \| object` | -       |

## Events

| 事件名 | 说明               | 回调参数                |
| ------ | ------------------ | ----------------------- |
| rect   | 获取元素信息时触发 | `rect: UniApp.NodeInfo` |
| height | 获取元素高度时触发 | `height: number`        |

## Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 页头内容 |
