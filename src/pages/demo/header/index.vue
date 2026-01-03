<template>
  <view class="demo-header-page">
    <!-- 场景1: 筛选栏 -->
    <ui-header v-if="currentDemo === 0" background="#fff">
      <view class="filter-bar">
        <view
          v-for="(item, index) in filterOptions"
          :key="item.key"
          class="filter-item"
          :class="{ active: activeFilter === index }"
          @click="activeFilter = index"
        >
          <text>{{ item.label }}</text>
          <ui-icon v-if="item.sortable" :name="item.asc ? 'arrow-up' : 'arrow-down'" size="24rpx" />
        </view>
      </view>
    </ui-header>

    <!-- 场景2: 分类 Tabs -->
    <ui-header v-else-if="currentDemo === 1" background="#fff">
      <scroll-view scroll-x class="tabs-scroll">
        <view class="tabs-bar">
          <view
            v-for="(tab, index) in categoryTabs"
            :key="tab"
            class="tab-item"
            :class="{ active: activeTab === index }"
            @click="activeTab = index"
          >
            <text>{{ tab }}</text>
            <view v-if="activeTab === index" class="tab-line" />
          </view>
        </view>
      </scroll-view>
    </ui-header>

    <!-- 场景3: 搜索栏 -->
    <ui-header v-else-if="currentDemo === 2" background="#fff">
      <view class="search-bar">
        <view class="search-input">
          <ui-icon name="search" size="32rpx" color="#999" />
          <input placeholder="搜索商品、店铺" disabled />
        </view>
        <view class="search-action">
          <ui-icon name="scan" size="40rpx" color="#333" />
        </view>
      </view>
    </ui-header>

    <!-- 场景4: 公告栏 -->
    <ui-header v-if="currentDemo === 3 && showNotice" background="#FFF7E6">
      <view class="notice-bar">
        <ui-icon name="volume-2" size="32rpx" color="#FA8C16" />
        <text class="notice-text">双11活动火热进行中，全场满300减50！</text>
        <ui-icon name="x" size="32rpx" color="#999" @click="showNotice = false" />
      </view>
    </ui-header>
    <!-- 公告关闭后的占位提示 -->
    <view v-if="currentDemo === 3 && !showNotice" class="notice-closed-tip">
      <text>公告已关闭</text>
      <text class="reopen" @click="showNotice = true">重新显示</text>
    </view>

    <!-- 场景5: 迷你播放器 -->
    <ui-header v-else-if="currentDemo === 4" background="#fff">
      <view class="mini-player">
        <image class="player-cover" src="https://picsum.photos/80/80?random=1" mode="aspectFill" />
        <view class="player-info">
          <text class="player-title">晴天 - 周杰伦</text>
          <text class="player-subtitle">正在播放</text>
        </view>
        <view class="player-controls">
          <ui-icon name="skip-back" size="40rpx" color="#333" />
          <view class="play-btn" @click="isPlaying = !isPlaying">
            <ui-icon :name="isPlaying ? 'pause' : 'play'" size="36rpx" color="#fff" />
          </view>
          <ui-icon name="skip-forward" size="40rpx" color="#333" />
        </view>
      </view>
    </ui-header>

    <!-- 场景6: 步骤进度条 -->
    <ui-header v-else-if="currentDemo === 5" background="#fff">
      <view class="steps-bar">
        <view v-for="(step, index) in steps" :key="step" class="step-item">
          <view class="step-dot" :class="{ active: index <= currentStep, done: index < currentStep }">
            <ui-icon v-if="index < currentStep" name="check" size="24rpx" color="#fff" />
            <text v-else>{{ index + 1 }}</text>
          </view>
          <text class="step-label" :class="{ active: index <= currentStep }">{{ step }}</text>
          <view v-if="index < steps.length - 1" class="step-line" :class="{ active: index < currentStep }" />
        </view>
      </view>
    </ui-header>

    <!-- 页面内容 -->
    <view class="page-body">
      <!-- 场景切换列表 -->
      <view class="demo-list">
        <view class="demo-list-title">切换场景</view>
        <view
          v-for="(demo, index) in demos"
          :key="index"
          class="demo-item"
          :class="{ active: currentDemo === index }"
          @click="switchDemo(index)"
        >
          <view class="demo-item-icon" :style="{ background: demo.color }">
            <ui-icon :name="demo.icon" color="#fff" size="32rpx" />
          </view>
          <view class="demo-item-info">
            <text class="demo-item-title">{{ demo.title }}</text>
            <text class="demo-item-desc">{{ demo.desc }}</text>
          </view>
          <ui-icon v-if="currentDemo === index" name="check" color="#07c160" size="36rpx" />
        </view>
      </view>

      <!-- 模拟列表内容 -->
      <view class="content-list">
        <view class="content-list-title">页面内容区域</view>
        <view v-for="i in 20" :key="i" class="content-item">
          <view class="content-item-img" />
          <view class="content-item-info">
            <text class="content-item-title">列表项 {{ i }}</text>
            <text class="content-item-desc">Header 组件自动计算高度并生成占位元素</text>
          </view>
        </view>
      </view>

      <!-- 步骤控制（仅在步骤进度场景显示） -->
      <view v-if="currentDemo === 5" class="step-controls">
        <ui-button size="small" :disabled="currentStep === 0" @click="currentStep--">上一步</ui-button>
        <ui-button size="small" type="primary" :disabled="currentStep === 2" @click="currentStep++">
          下一步
        </ui-button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "Header 页头",
  },
})

const currentDemo = ref(0)
const activeFilter = ref(0)
const activeTab = ref(0)
const showNotice = ref(true)
const isPlaying = ref(false)
const currentStep = ref(1)

const demos = [
  { title: "筛选栏", desc: "列表页排序筛选", icon: "sliders-horizontal", color: "#1989fa" },
  { title: "分类 Tabs", desc: "横向滚动分类标签", icon: "layout-list", color: "#07c160" },
  { title: "搜索栏", desc: "固定搜索输入框", icon: "search", color: "#ff976a" },
  { title: "公告栏", desc: "可关闭的通知条", icon: "bell", color: "#fa8c16" },
  { title: "迷你播放器", desc: "音乐播放控制条", icon: "music", color: "#722ed1" },
  { title: "步骤进度", desc: "表单流程进度条", icon: "git-commit", color: "#eb2f96" },
]

const filterOptions = [
  { key: "default", label: "综合", sortable: false },
  { key: "sales", label: "销量", sortable: true, asc: false },
  { key: "price", label: "价格", sortable: true, asc: true },
  { key: "new", label: "新品", sortable: false },
]

const categoryTabs = ["全部", "手机数码", "电脑办公", "家用电器", "服饰鞋包", "美妆护肤", "食品生鲜", "母婴玩具"]

const steps = ["填写信息", "确认订单", "支付完成"]

function switchDemo(index: number) {
  currentDemo.value = index
  // 重置相关状态
  if (index === 3) showNotice.value = true
  if (index === 5) currentStep.value = 1
}
</script>

<style lang="scss" scoped>
.demo-header-page {
  background: #f5f6fa;
  min-height: 100vh;
}

// 筛选栏样式
.filter-bar {
  display: flex;
  padding: 20rpx 32rpx;
  border-bottom: 1rpx solid #eee;
}

.filter-item {
  color: #666;
  display: flex;
  font-size: 28rpx;
  align-items: center;
  margin-right: 48rpx;

  &.active {
    color: #1989fa;
    font-weight: 500;
  }
}

// 分类 Tabs 样式
.tabs-scroll {
  white-space: nowrap;
}

.tabs-bar {
  display: inline-flex;
  padding: 0 24rpx;
}

.tab-item {
  color: #666;
  padding: 24rpx 28rpx;
  position: relative;
  font-size: 28rpx;

  &.active {
    color: #1989fa;
    font-weight: 600;
  }
}

.tab-line {
  left: 50%;
  width: 40rpx;
  bottom: 8rpx;
  height: 6rpx;
  position: absolute;
  transform: translateX(-50%);
  background: #1989fa;
  border-radius: 3rpx;
}

// 搜索栏样式
.search-bar {
  gap: 24rpx;
  display: flex;
  padding: 16rpx 32rpx;
  align-items: center;
}

.search-input {
  gap: 16rpx;
  flex: 1;
  height: 72rpx;
  display: flex;
  padding: 0 24rpx;
  background: #f5f5f5;
  align-items: center;
  border-radius: 36rpx;

  input {
    flex: 1;
    font-size: 28rpx;
  }
}

.search-action {
  padding: 8rpx;
}

// 公告栏样式
.notice-bar {
  gap: 16rpx;
  display: flex;
  padding: 20rpx 32rpx;
  align-items: center;
}

.notice-text {
  flex: 1;
  color: #fa8c16;
  font-size: 26rpx;
}

.notice-closed-tip {
  gap: 16rpx;
  color: #999;
  display: flex;
  padding: 24rpx;
  font-size: 26rpx;
  background: #fff;
  align-items: center;
  justify-content: center;

  .reopen {
    color: #1989fa;
  }
}

// 迷你播放器样式
.mini-player {
  gap: 20rpx;
  display: flex;
  padding: 16rpx 32rpx;
  align-items: center;
  border-bottom: 1rpx solid #eee;
}

.player-cover {
  width: 80rpx;
  height: 80rpx;
  border-radius: 12rpx;
}

.player-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.player-title {
  color: #333;
  font-size: 28rpx;
  font-weight: 500;
}

.player-subtitle {
  color: #999;
  font-size: 22rpx;
  margin-top: 4rpx;
}

.player-controls {
  gap: 24rpx;
  display: flex;
  align-items: center;
}

.play-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  background: #1989fa;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}

// 步骤进度条样式
.steps-bar {
  display: flex;
  padding: 32rpx;
  align-items: flex-start;
}

.step-item {
  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
}

.step-dot {
  color: #999;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  z-index: 1;
  font-size: 24rpx;
  background: #e8e8e8;
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &.active {
    color: #fff;
    background: #1989fa;
  }

  &.done {
    background: #07c160;
  }
}

.step-label {
  color: #999;
  font-size: 24rpx;
  margin-top: 12rpx;

  &.active {
    color: #333;
    font-weight: 500;
  }
}

.step-line {
  top: 24rpx;
  left: calc(50% + 30rpx);
  width: calc(100% - 60rpx);
  height: 4rpx;
  position: absolute;
  background: #e8e8e8;

  &.active {
    background: #07c160;
  }
}

// 页面内容
.page-body {
  padding: 24rpx;
}

.demo-list {
  overflow: hidden;
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 24rpx;
}

.demo-list-title {
  color: #999;
  padding: 24rpx 28rpx 16rpx;
  font-size: 26rpx;
}

.demo-item {
  display: flex;
  padding: 24rpx 28rpx;
  align-items: center;

  &:active {
    background: #f9f9f9;
  }

  &.active {
    background: #f0f9ff;
  }
}

.demo-item-icon {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  margin-right: 20rpx;
  border-radius: 14rpx;
  justify-content: center;
}

.demo-item-info {
  flex: 1;
}

.demo-item-title {
  color: #333;
  display: block;
  font-size: 28rpx;
  font-weight: 500;
}

.demo-item-desc {
  color: #999;
  display: block;
  font-size: 24rpx;
  margin-top: 4rpx;
}

// 模拟列表
.content-list {
  overflow: hidden;
  background: #fff;
  border-radius: 20rpx;
}

.content-list-title {
  color: #999;
  padding: 24rpx 28rpx 16rpx;
  font-size: 26rpx;
}

.content-item {
  display: flex;
  padding: 20rpx 28rpx;
  align-items: center;
  border-bottom: 1rpx solid #f5f5f5;

  &:last-child {
    border-bottom: none;
  }
}

.content-item-img {
  width: 80rpx;
  height: 80rpx;
  background: linear-gradient(135deg, #e8e8e8, #f5f5f5);
  margin-right: 20rpx;
  border-radius: 12rpx;
}

.content-item-info {
  flex: 1;
}

.content-item-title {
  color: #333;
  display: block;
  font-size: 28rpx;
}

.content-item-desc {
  color: #999;
  display: block;
  font-size: 24rpx;
  margin-top: 4rpx;
}

// 步骤控制按钮
.step-controls {
  gap: 24rpx;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 24rpx 32rpx;
  position: fixed;
  background: #fff;
  box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.05);
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
}
</style>
