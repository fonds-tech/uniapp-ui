<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-card title="卡片标题">
        <text class="card-content">这是卡片的内容区域，可以放置任意内容。</text>
      </ui-card>
    </demo-section>

    <demo-section title="带描述">
      <ui-card title="卡片标题" desc="这是卡片的描述信息">
        <text class="card-content">卡片内容区域</text>
      </ui-card>
    </demo-section>

    <demo-section title="带图片">
      <ui-card title="卡片标题" desc="卡片描述信息" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        <text class="card-content">带有左侧缩略图的卡片</text>
      </ui-card>
      <ui-card
        title="自定义图片尺寸"
        desc="调整缩略图大小和圆角"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        thumb-width="120rpx"
        thumb-height="120rpx"
        thumb-radius="16rpx"
      >
        <text class="card-content">自定义缩略图样式</text>
      </ui-card>
    </demo-section>

    <demo-section title="阴影大小">
      <ui-card title="无阴影" shadow="none" :border="false">
        <text class="card-content">shadow="none"</text>
      </ui-card>
      <ui-card title="小阴影" shadow="small" :border="false">
        <text class="card-content">shadow="small"（默认）</text>
      </ui-card>
      <ui-card title="中等阴影" shadow="medium" :border="false">
        <text class="card-content">shadow="medium"</text>
      </ui-card>
      <ui-card title="大阴影" shadow="large" :border="false">
        <text class="card-content">shadow="large"</text>
      </ui-card>
    </demo-section>

    <demo-section title="边框样式">
      <ui-card title="显示边框" :border="true" shadow="none">
        <text class="card-content">border="true"（默认）</text>
      </ui-card>
      <ui-card title="隐藏边框" :border="false" shadow="small">
        <text class="card-content">border="false"</text>
      </ui-card>
    </demo-section>

    <demo-section title="圆角大小">
      <ui-card title="小圆角" radius="8rpx">
        <text class="card-content">radius="8rpx"</text>
      </ui-card>
      <ui-card title="中等圆角" radius="16rpx">
        <text class="card-content">radius="16rpx"</text>
      </ui-card>
      <ui-card title="大圆角" radius="32rpx">
        <text class="card-content">radius="32rpx"</text>
      </ui-card>
    </demo-section>

    <demo-section title="自定义内边距">
      <ui-card title="无内边距" padding="0">
        <view class="padding-demo">padding="0"</view>
      </ui-card>
      <ui-card title="小内边距" padding="16rpx">
        <text class="card-content">padding="16rpx"</text>
      </ui-card>
      <ui-card title="大内边距" padding="40rpx">
        <text class="card-content">padding="40rpx"</text>
      </ui-card>
    </demo-section>

    <demo-section title="自定义样式">
      <ui-card title="自定义背景" background="#f0f9ff">
        <text class="card-content">浅蓝色背景</text>
      </ui-card>
      <ui-card title="标题样式" title-size="36rpx" title-color="#1989fa" title-weight="700" desc="自定义描述" desc-size="26rpx" desc-color="#07c160">
        <text class="card-content">自定义标题和描述样式</text>
      </ui-card>
    </demo-section>

    <demo-section title="插槽使用">
      <ui-card>
        <template #header>
          <view class="custom-header">
            <ui-icon name="star-fill" color="#ffc107" size="40rpx" />
            <text class="custom-header-title">自定义头部</text>
            <ui-tag type="primary" size="mini">热门</ui-tag>
          </view>
        </template>
        <text class="card-content">使用 header 插槽自定义头部内容</text>
      </ui-card>

      <ui-card title="底部插槽">
        <text class="card-content">卡片主要内容区域</text>
        <template #footer>
          <view class="custom-footer">
            <ui-button type="default" size="small">取消</ui-button>
            <ui-button type="primary" size="small">确认</ui-button>
          </view>
        </template>
      </ui-card>

      <ui-card title="缩略图插槽" desc="自定义左侧图标">
        <template #thumb>
          <view class="custom-thumb">
            <ui-icon name="image" size="60rpx" color="#1989fa" />
          </view>
        </template>
        <text class="card-content">使用 thumb 插槽替换缩略图</text>
      </ui-card>
    </demo-section>

    <demo-section title="点击事件">
      <ui-card title="可点击卡片" desc="点击整个卡片触发事件" @click="onCardClick">
        <text class="card-content">点击卡片试试</text>
      </ui-card>
      <ui-card title="点击缩略图" desc="点击图片触发独立事件" thumb="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" @click="onCardClick" @click-thumb="onThumbClick">
        <text class="card-content">点击图片和卡片触发不同事件</text>
      </ui-card>
      <text class="event-log">{{ eventLog }}</text>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Card 卡片" },
})

const eventLog = ref("点击卡片或图片查看事件")

function onCardClick() {
  eventLog.value = `卡片被点击，时间: ${new Date().toLocaleTimeString()}`
  uni.showToast({ title: "卡片被点击", icon: "none" })
}

function onThumbClick() {
  eventLog.value = `缩略图被点击，时间: ${new Date().toLocaleTimeString()}`
  uni.showToast({ title: "缩略图被点击", icon: "none" })
}
</script>

<style lang="scss" scoped>
.card-content {
  color: var(--ui-color-text-secondary);
  font-size: 28rpx;
  line-height: 1.5;
}

.padding-demo {
  color: var(--ui-color-text-secondary);
  padding: 24rpx;
  font-size: 28rpx;
  background: var(--ui-color-background-page);
}

.custom-header {
  gap: 12rpx;
  display: flex;
  padding: var(--ui-spacing-md);
  align-items: center;

  &-title {
    flex: 1;
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: 500;
  }
}

.custom-footer {
  gap: 16rpx;
  display: flex;
  padding: var(--ui-spacing-md);
  border-top: 1rpx solid var(--ui-color-border-light);
  justify-content: flex-end;
}

.custom-thumb {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  border-radius: var(--ui-radius-sm);
  justify-content: center;
  background-color: var(--ui-color-background-page);
}

.event-log {
  color: var(--ui-color-text-tertiary);
  font-size: 24rpx;
}
</style>
