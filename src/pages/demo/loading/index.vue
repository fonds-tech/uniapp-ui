<template>
  <demo-page>
    <demo-section title="加载类型" desc="circular 圆环动画，spinner 菊花条">
      <demo-block :cols="2" :gap="32">
        <view class="loading-item">
          <ui-loading type="circular" />
          <text class="loading-label">circular</text>
        </view>
        <view class="loading-item">
          <ui-loading type="spinner" />
          <text class="loading-label">spinner</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色" desc="支持语义色名和任意 CSS 颜色">
      <demo-block :cols="4" :gap="32">
        <view class="loading-item">
          <ui-loading color="primary" />
          <text class="loading-label">primary</text>
        </view>
        <view class="loading-item">
          <ui-loading color="success" />
          <text class="loading-label">success</text>
        </view>
        <view class="loading-item">
          <ui-loading color="warning" />
          <text class="loading-label">warning</text>
        </view>
        <view class="loading-item">
          <ui-loading color="danger" />
          <text class="loading-label">danger</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义大小" desc="size 接受任意单位">
      <demo-block :cols="4" :gap="32">
        <view class="loading-item">
          <ui-loading size="24rpx" />
          <text class="loading-label">24rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="36rpx" />
          <text class="loading-label">36rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="48rpx" />
          <text class="loading-label">48rpx</text>
        </view>
        <view class="loading-item">
          <ui-loading size="64rpx" />
          <text class="loading-label">64rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="加载文案" desc="水平/垂直两种布局">
      <demo-block :cols="2" :gap="32">
        <ui-loading text="加载中..." />
        <ui-loading text="请稍候..." vertical />
      </demo-block>
    </demo-section>

    <demo-section title="文本样式" desc="textColor / textSize / textWeight 独立配置">
      <demo-block :cols="2" :gap="32">
        <ui-loading color="primary" text="主色文案" text-color="primary" :text-weight="600" />
        <ui-loading size="40rpx" text="加大字号" text-size="32rpx" text-gap="20rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标" desc="icon slot 替换默认旋转图标">
      <demo-block :cols="2" :gap="32">
        <ui-loading text="加载中">
          <template #icon>
            <ui-icon name="refresh" size="32rpx" color="primary" />
          </template>
        </ui-loading>
        <ui-loading vertical>
          <template #icon>
            <ui-icon name="loading" size="40rpx" color="success" />
          </template>
          自定义内容
        </ui-loading>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Loading 加载" },
})
</script>

<style lang="scss" scoped>
.loading-item {
  gap: 16rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.loading-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
