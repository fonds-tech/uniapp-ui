<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-skeleton>
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
              <ui-skeleton-paragraph :rows="2" />
            </view>
          </view>
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="显示图片">
      <demo-block direction="column">
        <ui-skeleton>
          <ui-skeleton-image />
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="关闭动画">
      <demo-block direction="column">
        <ui-skeleton :animate="false">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column">
        <ui-skeleton background="#e0e0e0">
          <ui-skeleton-title />
          <ui-skeleton-paragraph />
        </ui-skeleton>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Skeleton 骨架屏" },
})
</script>

<style lang="scss" scoped>
.skeleton-row {
  gap: 20rpx;
  display: flex;
}

.skeleton-content {
  flex: 1;
}
</style>
