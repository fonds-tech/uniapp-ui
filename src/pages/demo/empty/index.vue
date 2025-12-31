<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block empty-block">
        <ui-empty />
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="demo-section">
      <text class="section-title">自定义图标</text>
      <view class="demo-block empty-block">
        <ui-empty icon="search" text="暂无搜索结果" />
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="demo-section">
      <text class="section-title">自定义样式</text>
      <view class="demo-block empty-block">
        <ui-empty icon="wifi-off" text="网络异常" icon-size="120rpx" icon-color="#999" text-color="#666" />
      </view>
    </view>

    <!-- 自定义插槽 -->
    <view class="demo-section">
      <text class="section-title">底部插槽</text>
      <view class="demo-block empty-block">
        <ui-empty icon="cart" text="购物车是空的">
          <template #footer>
            <ui-button type="primary" size="small">去购物</ui-button>
          </template>
        </ui-empty>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Empty 空状态" },
})

// Empty demo page
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.empty-block {
  padding: 40rpx 0;
}
</style>
