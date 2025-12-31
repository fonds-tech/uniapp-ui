<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-block sidebar-wrap">
        <ui-sidebar v-model="active1">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </view>
    </view>

    <!-- 徽标提示 -->
    <view class="demo-section">
      <text class="section-title">徽标提示</text>
      <view class="demo-block sidebar-wrap">
        <ui-sidebar v-model="active2">
          <ui-sidebar-item title="标签一" dot />
          <ui-sidebar-item title="标签二" badge="5" />
          <ui-sidebar-item title="标签三" badge="20" />
        </ui-sidebar>
      </view>
    </view>

    <!-- 禁用选项 -->
    <view class="demo-section">
      <text class="section-title">禁用选项</text>
      <view class="demo-block sidebar-wrap">
        <ui-sidebar v-model="active3">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" disabled />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </view>
    </view>

    <!-- 切换事件 -->
    <view class="demo-section">
      <text class="section-title">切换事件</text>
      <view class="demo-block sidebar-wrap">
        <ui-sidebar v-model="active4" @change="onChange">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Sidebar 侧边栏" },
})

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)

function onChange(index: number) {
  uni.showToast({ title: `切换到第 ${index + 1} 项`, icon: "none" })
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.sidebar-wrap {
  height: 300rpx;
  overflow: hidden;
  border-radius: 12rpx;
}
</style>
