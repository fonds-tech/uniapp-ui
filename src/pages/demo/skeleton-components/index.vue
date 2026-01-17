<template>
  <demo-page>
    <demo-section title="SkeletonAvatar 头像占位">
      <demo-block direction="column">
        <view class="avatar-row">
          <ui-skeleton-avatar />
          <ui-skeleton-avatar size="80rpx" />
          <ui-skeleton-avatar size="120rpx" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像形状">
      <demo-block direction="column">
        <view class="avatar-row">
          <view class="avatar-item">
            <ui-skeleton-avatar round />
            <ui-text size="small" color="secondary">圆形</ui-text>
          </view>
          <view class="avatar-item">
            <ui-skeleton-avatar :round="false" />
            <ui-text size="small" color="secondary">方形</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="SkeletonTitle 标题占位">
      <demo-block direction="column">
        <ui-skeleton-title />
        <view style="height: 16px" />
        <ui-skeleton-title width="60%" />
        <view style="height: 16px" />
        <ui-skeleton-title width="80%" height="32rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="标题圆角">
      <demo-block direction="column">
        <ui-skeleton-title round />
        <view style="height: 16px" />
        <ui-skeleton-title :round="false" />
      </demo-block>
    </demo-section>

    <demo-section title="SkeletonParagraph 段落占位">
      <demo-block direction="column">
        <ui-skeleton-paragraph />
        <view style="height: 16px" />
        <ui-skeleton-paragraph :rows="4" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义段落行宽">
      <demo-block direction="column">
        <ui-skeleton-paragraph :rows="3" :row-width="['100%', '80%', '60%']" />
      </demo-block>
    </demo-section>

    <demo-section title="SkeletonImage 图片占位">
      <demo-block direction="column">
        <view class="image-row">
          <ui-skeleton-image />
          <ui-skeleton-image width="150rpx" height="150rpx" />
          <ui-skeleton-image width="200rpx" height="120rpx" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="图片形状">
      <demo-block direction="column">
        <view class="image-row">
          <view class="image-item">
            <ui-skeleton-image round />
            <ui-text size="small" color="secondary">圆形</ui-text>
          </view>
          <view class="image-item">
            <ui-skeleton-image :round="false" />
            <ui-text size="small" color="secondary">方形</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="组合使用">
      <demo-block direction="column">
        <view class="skeleton-card">
          <ui-skeleton-avatar size="100rpx" />
          <view class="skeleton-content">
            <ui-skeleton-title width="40%" />
            <ui-skeleton-paragraph :rows="2" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="图文列表">
      <demo-block direction="column">
        <view v-for="i in 3" :key="i" class="skeleton-list-item">
          <ui-skeleton-image width="160rpx" height="160rpx" />
          <view class="skeleton-list-content">
            <ui-skeleton-title width="70%" />
            <ui-skeleton-paragraph :rows="2" :row-width="['100%', '60%']" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="带动画效果">
      <demo-block direction="column">
        <ui-skeleton animate>
          <view class="skeleton-card">
            <ui-skeleton-avatar size="100rpx" />
            <view class="skeleton-content">
              <ui-skeleton-title width="50%" />
              <ui-skeleton-paragraph :rows="3" />
            </view>
          </view>
        </ui-skeleton>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Skeleton 子组件" },
})
</script>

<style scoped lang="scss">
.avatar-row {
  gap: 16px;
  display: flex;
  align-items: center;
}

.avatar-item {
  gap: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.image-row {
  gap: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.image-item {
  gap: 8px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.skeleton-card {
  gap: 16px;
  display: flex;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
}

.skeleton-content {
  gap: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.skeleton-list-item {
  gap: 16px;
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.skeleton-list-content {
  gap: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
