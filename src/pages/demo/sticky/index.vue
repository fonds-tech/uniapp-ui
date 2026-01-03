<template>
  <demo-page>
    <demo-section title="基础用法" desc="向下滚动页面，按钮会吸顶" />
    <view class="demo-item">
      <ui-sticky @change="onStickyChange1" @scroll="onStickyScroll">
        <ui-button type="primary" block>基础吸顶</ui-button>
      </ui-sticky>
    </view>

    <demo-section title="吸顶距离" desc="通过 offset-top 属性可以设置吸顶距离" />
    <view class="demo-item">
      <ui-sticky :offset-top="100" @change="onStickyChange2">
        <ui-button type="success" block>吸顶距离 100rpx</ui-button>
      </ui-sticky>
    </view>

    <demo-section title="多级吸顶" desc="为不同的元素设置不同的 offset-top 实现多级吸顶" />
    <view class="demo-item">
      <ui-sticky :offset-top="180">
        <view class="sticky-box sticky-box--warning">
          <text>二级吸顶 (180rpx)</text>
        </view>
      </ui-sticky>
    </view>

    <demo-section title="层级设置" desc="通过 z-index 属性设置吸顶时的层级" />
    <view class="demo-item">
      <ui-sticky :offset-top="260" :z-index="100">
        <view class="sticky-box sticky-box--info">
          <text>自定义层级 z-index: 100</text>
        </view>
      </ui-sticky>
    </view>

    <demo-section title="背景颜色" desc="通过 background 属性可以设置吸顶时的背景色" />
    <view class="demo-item">
      <ui-sticky :offset-top="340" background="#fff">
        <view class="sticky-content">
          <ui-button type="warning" size="small">带背景吸顶</ui-button>
          <text class="sticky-content__text">吸顶时显示白色背景</text>
        </view>
      </ui-sticky>
    </view>

    <demo-section title="禁用状态" desc="通过 disabled 属性可以控制是否开启吸顶" />
    <view class="demo-item">
      <demo-block direction="column" align="stretch" :gap="20">
        <ui-button size="small" @click="stickyDisabled = !stickyDisabled">
          {{ stickyDisabled ? "点击启用吸顶" : "点击禁用吸顶" }}
        </ui-button>
        <ui-sticky :offset-top="420" :disabled="stickyDisabled">
          <view class="sticky-box" :class="stickyDisabled ? 'sticky-box--disabled' : 'sticky-box--danger'">
            <text>{{ stickyDisabled ? "吸顶已禁用" : "正常吸顶效果" }}</text>
          </view>
        </ui-sticky>
      </demo-block>
    </view>

    <demo-section title="事件日志" desc="监听 change 和 scroll 事件进行业务逻辑处理" />
    <view class="demo-item">
      <view class="log-card">
        <view class="log-item">
          <text class="log-label">状态：</text>
          <text class="log-value" :class="{ 'is-active': isStickyFixed }">{{ stickyLog }}</text>
        </view>
        <view class="log-item">
          <text class="log-label">位置：</text>
          <text class="log-value">{{ scrollLog }}</text>
        </view>
      </view>
    </view>

    <demo-section title="自定义样式" desc="通过 custom-style 等属性深度定制吸顶样式" />
    <view class="demo-item">
      <ui-sticky :offset-top="500" custom-class="my-sticky" :custom-style="{ padding: '16rpx', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }">
        <view class="sticky-custom">
          <text>渐变背景吸顶</text>
        </view>
      </ui-sticky>
    </view>

    <!-- Content for scrolling -->
    <demo-section title="内容滚动演示" desc="向下滚动以查看上方元素的吸顶效果" />
    <view class="content-list">
      <view v-for="i in 10" :key="i" class="content-card">
        <view class="card-header">
          <view class="card-dot" :style="{ background: colors[i % colors.length] }"></view>
          <text class="card-title">演示卡片 {{ i }}</text>
        </view>
        <view class="card-body"> 这是一段模拟内容，旨在增加页面高度以便演示粘性布局（Sticky）的各种吸顶效果。 </view>
      </view>
    </view>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Sticky 粘性布局" },
})

const toast = useToast()

// 禁用状态
const stickyDisabled = ref(false)

// 事件日志
const stickyLog = ref("等待吸顶...")
const scrollLog = ref("等待滚动...")
const isStickyFixed = ref(false)

const colors = ["#1989fa", "#07c160", "#ff976a", "#ee0a24", "#7232dd"]

// 事件处理
function onStickyChange1(isFixed: boolean) {
  isStickyFixed.value = isFixed
  stickyLog.value = isFixed ? "已吸顶" : "未吸顶"
}

function onStickyChange2(isFixed: boolean) {
  if (isFixed) {
    toast.success("偏移吸顶生效")
  }
}

function onStickyScroll(data: { scrollTop: number; isFixed: boolean }) {
  scrollLog.value = `scrollTop=${data.scrollTop.toFixed(0)}`
}
</script>

<style lang="scss" scoped>
.demo-item {
  margin-bottom: 30rpx;
}

.sticky-box {
  color: #fff;
  padding: 24rpx;
  font-size: 28rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 12rpx;

  &--warning {
    background: var(--ui-color-warning);
  }

  &--info {
    background: var(--ui-color-info);
  }

  &--danger {
    background: var(--ui-color-danger);
  }

  &--disabled {
    background: #c8c9cc;
    box-shadow: none;
  }
}

.sticky-content {
  gap: 16rpx;
  display: flex;
  padding: 16rpx 24rpx;
  background: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  align-items: center;
  border-radius: 12rpx;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

.log-card {
  border: 1rpx solid var(--ui-color-border-light);
  padding: 24rpx;
  background: #fff;
  border-radius: 12rpx;
}

.log-item {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
  &:last-child {
    margin-bottom: 0;
  }
}

.log-label {
  color: var(--ui-color-text-secondary);
  width: 80rpx;
  font-size: 24rpx;
}

.log-value {
  color: var(--ui-color-text-main);
  font-size: 24rpx;
  font-family: monospace;

  &.is-active {
    color: var(--ui-color-primary);
    font-weight: bold;
  }
}

.sticky-custom {
  color: #fff;
  padding: 12rpx;
  font-size: 28rpx;
  text-align: center;
}

:deep(.my-sticky) {
  overflow: hidden;
  border-radius: 16rpx;
}

.content-list {
  padding-bottom: 100rpx;
}

.content-card {
  border: 1rpx solid var(--ui-color-border-light);
  padding: 24rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;

  .card-header {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
  }

  .card-dot {
    width: 12rpx;
    height: 12rpx;
    margin-right: 16rpx;
    border-radius: 50%;
  }

  .card-title {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
    font-weight: bold;
  }

  .card-body {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
    line-height: 1.6;
  }
}
</style>
