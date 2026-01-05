<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法" desc="设置 title 和 desc 属性展示卡片标题和描述">
      <ui-card title="卡片标题" desc="这是卡片的描述信息，可以显示一些简短的说明文字。" />
    </demo-section>

    <!-- 带封面图片 -->
    <demo-section title="带封面图片" desc="设置 thumb 属性展示封面图片">
      <ui-card title="风景图片" desc="一张美丽的风景照片" thumb="https://picsum.photos/800/400?random=1" />
    </demo-section>

    <!-- 阴影模式 -->
    <demo-section title="阴影模式" desc="通过 shadow 属性设置卡片阴影">
      <ui-card title="始终显示阴影" desc="shadow='always'" shadow="always" />
      <ui-card title="悬浮时显示阴影" desc="shadow='hover'" shadow="hover" />
      <ui-card title="不显示阴影" desc="shadow='never'" shadow="never" />
    </demo-section>

    <!-- 边框模式 -->
    <demo-section title="边框模式" desc="设置 border 属性显示卡片边框">
      <ui-card title="带边框的卡片" desc="通过 border 属性添加边框" border shadow="never" />
    </demo-section>

    <!-- 自定义样式 -->
    <demo-section title="自定义样式" desc="通过 radius、padding、background 等属性自定义样式">
      <ui-card title="自定义圆角" desc="radius=32rpx" radius="32rpx" />
      <ui-card title="自定义内边距" desc="padding=40rpx" padding="40rpx" />
      <ui-card title="自定义背景色" desc="background=#f0f9ff" background="#f0f9ff" />
    </demo-section>

    <!-- 自定义标题样式 -->
    <demo-section title="自定义标题样式" desc="通过 titleColor、titleSize 等属性自定义标题">
      <ui-card title="主题色标题" desc="使用主色调" title-color="primary" title-size="36rpx" />
      <ui-card title="成功色标题" desc="使用成功色" title-color="success" />
    </demo-section>

    <!-- 可点击卡片 -->
    <demo-section title="可点击卡片" desc="设置 clickable 属性使卡片可点击">
      <ui-card title="可点击的卡片" desc="点击卡片触发事件" clickable @click="onClickCard" />
    </demo-section>

    <!-- 使用插槽 -->
    <demo-section title="使用插槽" desc="通过插槽自定义卡片内容">
      <ui-card>
        <template #header>
          <view class="custom-header">
            <ui-avatar src="https://picsum.photos/100/100?random=10" size="80rpx" />
            <view class="custom-header__info">
              <text class="custom-header__name">用户名称</text>
              <text class="custom-header__time">2024-01-01</text>
            </view>
          </view>
        </template>
        <text>这是卡片的正文内容，可以放置任意的自定义内容。支持多行文本显示，自动换行。</text>
        <template #footer>
          <view class="custom-footer">
            <ui-button size="mini" type="primary">点赞</ui-button>
            <ui-button size="mini">评论</ui-button>
          </view>
        </template>
      </ui-card>
    </demo-section>

    <!-- 封面插槽 -->
    <demo-section title="封面插槽" desc="通过 cover 插槽自定义封面区域">
      <ui-card title="自定义封面">
        <template #cover>
          <view class="custom-cover">
            <ui-icon name="video" size="60rpx" color="#fff" />
            <text class="custom-cover__text">视频封面</text>
          </view>
        </template>
      </ui-card>
    </demo-section>

    <!-- 额外内容插槽 -->
    <demo-section title="额外内容插槽" desc="通过 extra 插槽在头部右侧添加额外内容">
      <ui-card title="带操作按钮的卡片" desc="右侧有更多操作">
        <template #extra>
          <ui-icon name="ellipsis" size="40rpx" />
        </template>
        <text>卡片内容区域</text>
      </ui-card>
    </demo-section>

    <!-- 综合示例 -->
    <demo-section title="综合示例" desc="商品卡片示例">
      <ui-card thumb="https://picsum.photos/800/400?random=5" clickable @click="onClickProduct">
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
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Card 卡片" },
})

function onClickCard() {
  uni.showToast({
    title: "点击了卡片",
    icon: "none",
  })
}

function onClickProduct() {
  uni.showToast({
    title: "查看商品详情",
    icon: "none",
  })
}
</script>

<style lang="scss" scoped>
.custom-header {
  display: flex;
  padding: 24rpx;
  align-items: center;

  &__info {
    flex: 1;
    display: flex;
    margin-left: 20rpx;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text-main);
    font-size: 28rpx;
    font-weight: 600;
  }

  &__time {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    margin-top: 4rpx;
  }
}

.custom-footer {
  gap: 16rpx;
  display: flex;
}

.custom-cover {
  width: 100%;
  height: 300rpx;
  display: flex;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: #fff;
    font-size: 28rpx;
    margin-top: 16rpx;
  }
}

.product-header {
  display: flex;
  padding: 24rpx;
  align-items: flex-start;
  justify-content: space-between;

  &__info {
    flex: 1;
    display: flex;
    min-width: 0;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text-main);
    font-size: 30rpx;
    font-weight: 600;
    line-height: 1.4;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    margin-top: 8rpx;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 36rpx;
    font-weight: 700;
    margin-left: 16rpx;
  }
}

.product-footer {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;

  :deep(.ui-button) {
    margin-left: auto;
  }
}
</style>
