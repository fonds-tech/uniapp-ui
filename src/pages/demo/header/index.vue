<template>
  <view class="demo-header">
    <!-- 上半部分：预览区 -->
    <view class="preview-area">
      <view class="preview-box">
        <!-- 模拟状态栏 -->
        <view class="status-bar">
          <text class="status-bar__time">9:41</text>
          <view class="status-bar__icons">
            <ui-icon name="wifi" size="28rpx" color="#000" />
          </view>
        </view>

        <!-- 场景1: 电商搜索栏 -->
        <view v-if="currentScene === 0" class="preview-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
          <view class="header-shop">
            <view class="header-shop__location">
              <ui-icon name="location" size="28rpx" color="#fff" />
              <text class="header-shop__city">杭州</text>
              <ui-icon name="down" size="20rpx" color="#fff" />
            </view>
            <view class="header-shop__search">
              <ui-icon name="search" size="28rpx" color="#999" />
              <text class="header-shop__placeholder">搜索商品</text>
            </view>
            <view class="header-shop__actions">
              <ui-icon name="scan" size="40rpx" color="#fff" />
              <ui-icon name="bell" size="40rpx" color="#fff" />
            </view>
          </view>
        </view>

        <!-- 场景2: 筛选排序栏 -->
        <view v-else-if="currentScene === 1" class="preview-header" style="background: #fff">
          <view class="header-filter">
            <view v-for="(item, index) in filterTabs" :key="item.key" class="header-filter__item" :class="{ active: activeFilter === index }" @click="activeFilter = index">
              <text>{{ item.label }}</text>
              <ui-icon v-if="item.sortable" :name="item.asc ? 'up' : 'down'" size="20rpx" />
            </view>
          </view>
        </view>

        <!-- 场景3: 分类Tabs -->
        <view v-else-if="currentScene === 2" class="preview-header" style="background: #fff">
          <scroll-view scroll-x class="header-tabs">
            <view class="header-tabs__inner">
              <view v-for="(tab, index) in categoryTabs" :key="tab" class="header-tabs__item" :class="{ active: activeTab === index }" @click="activeTab = index">
                <text>{{ tab }}</text>
                <view v-if="activeTab === index" class="header-tabs__line" />
              </view>
            </view>
          </scroll-view>
        </view>

        <!-- 场景4: 迷你播放器 -->
        <view v-else-if="currentScene === 3" class="preview-header" style="background: #fff">
          <view class="header-player">
            <image class="header-player__cover" src="https://picsum.photos/80/80?random=1" mode="aspectFill" />
            <view class="header-player__info">
              <text class="header-player__title">晴天 - 周杰伦</text>
              <text class="header-player__sub">正在播放</text>
            </view>
            <view class="header-player__controls">
              <ui-icon name="step-backward" size="36rpx" color="#333" />
              <view class="header-player__play" @click="isPlaying = !isPlaying">
                <ui-icon :name="isPlaying ? 'pause' : 'caret-right'" size="28rpx" color="#fff" />
              </view>
              <ui-icon name="step-forward" size="36rpx" color="#333" />
            </view>
          </view>
        </view>

        <!-- 场景5: 步骤进度 -->
        <view v-else-if="currentScene === 4" class="preview-header" style="background: #fff">
          <view class="header-steps">
            <view v-for="(step, index) in steps" :key="step" class="header-steps__item">
              <view class="header-steps__dot" :class="{ active: index <= currentStep, done: index < currentStep }">
                <ui-icon v-if="index < currentStep" name="check" size="20rpx" color="#fff" />
                <text v-else>{{ index + 1 }}</text>
              </view>
              <text class="header-steps__label" :class="{ active: index <= currentStep }">{{ step }}</text>
              <view v-if="index < steps.length - 1" class="header-steps__line" :class="{ active: index < currentStep }" />
            </view>
          </view>
        </view>

        <!-- 场景6: 公告栏 -->
        <view v-else-if="currentScene === 5" class="preview-header" style="background: #fffbe6">
          <view class="header-notice">
            <ui-icon name="sound" size="32rpx" color="#fa8c16" />
            <text class="header-notice__text">双11活动进行中，全场满300减50</text>
            <ui-icon name="close" size="28rpx" color="#999" />
          </view>
        </view>

        <!-- 模拟内容区 -->
        <view class="preview-content">
          <view class="preview-content__placeholder">
            <text>页面内容区域</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 下半部分：场景列表 -->
    <scroll-view scroll-y class="scene-list">
      <view class="scene-list__header">
        <text class="scene-list__title">选择场景</text>
        <text class="scene-list__subtitle">点击切换上方预览效果</text>
      </view>

      <view class="scene-list__grid">
        <view v-for="(scene, index) in scenes" :key="scene.title" class="scene-item" :class="{ active: currentScene === index }" @click="currentScene = index">
          <view class="scene-item__icon" :style="{ background: scene.color }">
            <ui-icon :name="scene.icon" size="36rpx" color="#fff" />
          </view>
          <text class="scene-item__title">{{ scene.title }}</text>
        </view>
      </view>

      <view class="scene-info">
        <text class="scene-info__title">{{ scenes[currentScene].title }}</text>
        <text class="scene-info__desc">{{ scenes[currentScene].desc }}</text>
        <view class="scene-info__props">
          <text class="scene-info__label">常用属性：</text>
          <view class="scene-info__tags">
            <text v-for="prop in scenes[currentScene].props" :key="prop" class="scene-info__tag">{{ prop }}</text>
          </view>
        </view>
      </view>

      <!-- 步骤场景的操作按钮 -->
      <view v-if="currentScene === 4" class="scene-actions">
        <ui-button size="small" :disabled="currentStep === 0" @click="currentStep--">上一步</ui-button>
        <ui-button size="small" type="primary" :disabled="currentStep === 2" @click="currentStep++">下一步</ui-button>
      </view>

      <!-- 尺寸监听展示 -->
      <view class="size-monitor">
        <view class="size-monitor__header">
          <text class="size-monitor__title">尺寸监听</text>
          <text class="size-monitor__subtitle">@height / @rect 事件实时数据</text>
        </view>
        <view class="size-monitor__content">
          <view class="size-monitor__item">
            <text class="size-monitor__label">高度 (height)</text>
            <view class="size-monitor__value">
              <text class="size-monitor__number">{{ headerHeight }}</text>
              <text class="size-monitor__unit">px</text>
            </view>
          </view>
          <view class="size-monitor__item">
            <text class="size-monitor__label">宽度 (width)</text>
            <view class="size-monitor__value">
              <text class="size-monitor__number">{{ headerRect.width || 0 }}</text>
              <text class="size-monitor__unit">px</text>
            </view>
          </view>
          <view class="size-monitor__item">
            <text class="size-monitor__label">顶部位置 (top)</text>
            <view class="size-monitor__value">
              <text class="size-monitor__number">{{ headerRect.top || 0 }}</text>
              <text class="size-monitor__unit">px</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: {
    navigationBarTitleText: "Header 页头",
  },
})

const currentScene = ref(0)

// 尺寸监听
const headerHeight = ref(0)
const headerRect = ref<UniApp.NodeInfo>({})

function onHeaderHeight(height: number) {
  headerHeight.value = Math.round(height)
}

function onHeaderRect(rect: UniApp.NodeInfo) {
  headerRect.value = {
    ...rect,
    width: Math.round(rect.width || 0),
    top: Math.round(rect.top || 0),
  }
}

// 场景配置
const scenes = [
  {
    title: "电商搜索栏",
    desc: "包含定位、搜索框、扫码和消息图标，适用于电商首页顶部导航。",
    icon: "search",
    color: "#667eea",
    props: ["background", "safe-area-inset-top"],
  },
  {
    title: "筛选排序栏",
    desc: "商品列表页常用的综合、销量、价格排序筛选，支持升降序切换。",
    icon: "filter",
    color: "#f5576c",
    props: ["background", "z-index"],
  },
  {
    title: "分类导航",
    desc: "横向滚动的分类标签，带选中态指示器，适用于分类页或列表页。",
    icon: "layout",
    color: "#4facfe",
    props: ["background", "custom-style"],
  },
  {
    title: "迷你播放器",
    desc: "音乐/视频类应用的悬浮播放控制条，显示封面、信息和控制按钮。",
    icon: "sound",
    color: "#43e97b",
    props: ["background", "offset"],
  },
  {
    title: "步骤进度",
    desc: "订单流程、表单向导等场景的步骤进度指示器，支持已完成状态。",
    icon: "branches",
    color: "#fa709a",
    props: ["background", "custom-class"],
  },
  {
    title: "公告通知栏",
    desc: "顶部的活动公告或系统通知，支持关闭按钮和跑马灯效果。",
    icon: "bell",
    color: "#fa8c16",
    props: ["background", "z-index"],
  },
]

// 场景2: 筛选
const activeFilter = ref(0)
const filterTabs = [
  { key: "default", label: "综合", sortable: false },
  { key: "sales", label: "销量", sortable: true, asc: false },
  { key: "price", label: "价格", sortable: true, asc: true },
  { key: "new", label: "新品", sortable: false },
]

// 场景3: 分类
const activeTab = ref(0)
const categoryTabs = ["推荐", "手机", "电脑", "家电", "服饰", "美妆", "食品"]

// 场景4: 播放器
const isPlaying = ref(true)

// 场景5: 步骤
const currentStep = ref(1)
const steps = ["填写信息", "确认订单", "支付完成"]
</script>

<style lang="scss" scoped>
.demo-header {
  height: 100vh;
  display: flex;
  background: #f5f7fa;
  flex-direction: column;
}

// 上半部分：预览区
.preview-area {
  padding: 24rpx;
  background: linear-gradient(180deg, #e8ecf3 0%, #f5f7fa 100%);
  flex-shrink: 0;
}

.preview-box {
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.12);
  border-radius: 32rpx;
}

.status-bar {
  display: flex;
  padding: 16rpx 32rpx;
  background: #f8f8f8;
  align-items: center;
  justify-content: space-between;

  &__time {
    color: #000;
    font-size: 26rpx;
    font-weight: 600;
  }

  &__icons {
    gap: 8rpx;
    display: flex;
  }
}

.preview-header {
  transition: all 0.3s ease;
}

.preview-content {
  height: 300rpx;
  background: #f8f9fa;

  &__placeholder {
    color: #ccc;
    height: 100%;
    display: flex;
    font-size: 28rpx;
    align-items: center;
    justify-content: center;
  }
}

// 下半部分：场景列表
.scene-list {
  flex: 1;
  overflow-x: hidden;

  &__header {
    padding: 24rpx 24rpx 0;
    margin-bottom: 24rpx;
  }

  &__title {
    color: #1a1a1a;
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 8rpx;
  }

  &__subtitle {
    color: #999;
    font-size: 24rpx;
  }

  &__grid {
    gap: 20rpx;
    display: grid;
    padding: 0 24rpx;
    margin-bottom: 32rpx;
    grid-template-columns: repeat(3, 1fr);
  }
}

.scene-item {
  border: 2rpx solid transparent;
  display: flex;
  padding: 24rpx 16rpx;
  background: #fff;
  transition: all 0.2s;
  align-items: center;
  border-radius: 20rpx;
  flex-direction: column;

  &.active {
    background: #f0f9ff;
    border-color: #1989fa;
  }

  &__icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-radius: 20rpx;
    margin-bottom: 12rpx;
    justify-content: center;
  }

  &__title {
    color: #666;
    font-size: 22rpx;
    text-align: center;
  }
}

.scene-info {
  margin: 0 24rpx 24rpx;
  padding: 28rpx;
  background: #fff;
  border-radius: 20rpx;

  &__title {
    color: #333;
    display: block;
    font-size: 30rpx;
    font-weight: 600;
    margin-bottom: 12rpx;
  }

  &__desc {
    color: #666;
    display: block;
    font-size: 26rpx;
    line-height: 1.6;
    margin-bottom: 20rpx;
  }

  &__label {
    color: #999;
    font-size: 24rpx;
    margin-right: 12rpx;
  }

  &__props {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__tags {
    gap: 12rpx;
    display: flex;
    flex-wrap: wrap;
  }

  &__tag {
    color: #1989fa;
    padding: 6rpx 16rpx;
    font-size: 22rpx;
    background: #e6f4ff;
    border-radius: 8rpx;
  }
}

.scene-actions {
  gap: 24rpx;
  display: flex;
  padding: 0 24rpx 48rpx;
  justify-content: center;
}

// Header 场景样式
.header-shop {
  gap: 16rpx;
  display: flex;
  padding: 20rpx 24rpx;
  align-items: center;

  &__location {
    gap: 4rpx;
    display: flex;
    align-items: center;
  }

  &__city {
    color: #fff;
    font-size: 24rpx;
  }

  &__search {
    gap: 8rpx;
    flex: 1;
    height: 56rpx;
    display: flex;
    padding: 0 20rpx;
    background: #fff;
    align-items: center;
    border-radius: 28rpx;
  }

  &__placeholder {
    color: #999;
    font-size: 24rpx;
  }

  &__actions {
    gap: 20rpx;
    display: flex;
  }
}

.header-filter {
  display: flex;
  padding: 20rpx 24rpx;

  &__item {
    gap: 4rpx;
    flex: 1;
    color: #666;
    display: flex;
    font-size: 26rpx;
    align-items: center;
    justify-content: center;

    &.active {
      color: #1989fa;
      font-weight: 600;
    }
  }
}

.header-tabs {
  white-space: nowrap;

  &__inner {
    display: inline-flex;
    padding: 0 16rpx;
  }

  &__item {
    color: #666;
    padding: 24rpx 28rpx;
    position: relative;
    font-size: 26rpx;

    &.active {
      color: #1989fa;
      font-weight: 600;
    }
  }

  &__line {
    left: 50%;
    width: 32rpx;
    bottom: 12rpx;
    height: 6rpx;
    position: absolute;
    transform: translateX(-50%);
    background: #1989fa;
    border-radius: 3rpx;
  }
}

.header-player {
  gap: 16rpx;
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;

  &__cover {
    width: 72rpx;
    height: 72rpx;
    border-radius: 12rpx;
  }

  &__info {
    flex: 1;
  }

  &__title {
    color: #333;
    display: block;
    font-size: 26rpx;
    font-weight: 500;
  }

  &__sub {
    color: #999;
    font-size: 22rpx;
  }

  &__controls {
    gap: 20rpx;
    display: flex;
    align-items: center;
  }

  &__play {
    width: 56rpx;
    height: 56rpx;
    display: flex;
    background: #1989fa;
    align-items: center;
    border-radius: 50%;
    justify-content: center;
  }
}

.header-steps {
  display: flex;
  padding: 28rpx 24rpx;

  &__item {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
  }

  &__dot {
    color: #999;
    width: 40rpx;
    height: 40rpx;
    display: flex;
    z-index: 2;
    font-size: 22rpx;
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

  &__label {
    color: #999;
    font-size: 22rpx;
    margin-top: 12rpx;

    &.active {
      color: #333;
    }
  }

  &__line {
    top: 20rpx;
    left: 50%;
    width: 100%;
    height: 4rpx;
    z-index: 1;
    position: absolute;
    background: #e8e8e8;

    &.active {
      background: #07c160;
    }
  }
}

.header-notice {
  gap: 12rpx;
  display: flex;
  padding: 20rpx 24rpx;
  align-items: center;

  &__text {
    flex: 1;
    color: #d46b08;
    font-size: 26rpx;
  }
}
</style>
