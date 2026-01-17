<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-skeleton gap="24rpx">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="显示头像">
      <demo-block direction="column">
        <ui-skeleton>
          <view class="skeleton-row">
            <ui-skeleton-avatar />
            <view class="skeleton-content">
              <ui-skeleton-title />
              <ui-skeleton-paragraph :row="2" />
            </view>
          </view>
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="头像形状">
      <demo-block direction="column">
        <ui-skeleton>
          <view class="skeleton-row">
            <ui-skeleton-avatar shape="round" />
            <ui-skeleton-avatar shape="square" />
          </view>
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="显示图片">
      <demo-block direction="column">
        <ui-skeleton gap="24rpx">
          <ui-skeleton-image />
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="自定义段落">
      <demo-block direction="column">
        <ui-skeleton>
          <ui-skeleton-paragraph :row="4" :row-width="['100%', '80%', '60%', '40%']" />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="关闭动画">
      <demo-block direction="column">
        <ui-skeleton :animate="false" gap="24rpx">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="图文列表">
      <demo-block direction="column">
        <ui-skeleton>
          <view v-for="i in 3" :key="i" class="skeleton-list-item">
            <ui-skeleton-image width="160rpx" height="160rpx" />
            <view class="skeleton-content">
              <ui-skeleton-title width="70%" />
              <ui-skeleton-paragraph :row="2" :row-width="['100%', '60%']" />
            </view>
          </view>
        </ui-skeleton>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Skeleton 骨架屏" },
})
</script>

<style lang="scss" scoped>
.skeleton-row {
  gap: 20rpx;
  display: flex;
  align-items: center;
}

.skeleton-content {
  gap: 16rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.skeleton-list-item {
  gap: 20rpx;
  display: flex;
  padding: 16rpx 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}
</style>
