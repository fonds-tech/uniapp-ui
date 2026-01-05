<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="4" :gap="24">
        <ui-avatar src="https://picsum.photos/100" />
        <ui-avatar src="https://picsum.photos/101" />
        <ui-avatar src="https://picsum.photos/102" />
        <ui-avatar src="https://picsum.photos/103" />
      </demo-block>
    </demo-section>

    <demo-section title="头像尺寸">
      <demo-block :gap="24" align="end">
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/104" size="mini" />
          <text class="avatar-label">mini</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/105" size="small" />
          <text class="avatar-label">small</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/106" size="medium" />
          <text class="avatar-label">medium</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/107" size="large" />
          <text class="avatar-label">large</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/108" size="160rpx" />
          <text class="avatar-label">自定义</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像形状">
      <demo-block :cols="4" :gap="24">
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/109" shape="circle" />
          <text class="avatar-label">圆形</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/110" shape="square" />
          <text class="avatar-label">方形</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/111" shape="square" radius="8rpx" />
          <text class="avatar-label">圆角方形</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/112" shape="square" radius="16rpx" />
          <text class="avatar-label">大圆角</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="图标头像">
      <demo-block :cols="4" :gap="24">
        <ui-avatar icon="user" />
        <ui-avatar icon="user" background="#1890ff" icon-color="#fff" />
        <ui-avatar icon="user" background="#52c41a" icon-color="#fff" />
        <ui-avatar icon="user" background="#faad14" icon-color="#fff" />
      </demo-block>
    </demo-section>

    <demo-section title="文字头像">
      <demo-block :cols="4" :gap="24">
        <ui-avatar text="张三" background="#1890ff" text-color="#fff" />
        <ui-avatar text="李四" background="#52c41a" text-color="#fff" />
        <ui-avatar text="王五" background="#faad14" text-color="#fff" />
        <ui-avatar text="U" background="#ff4d4f" text-color="#fff" />
      </demo-block>
    </demo-section>

    <demo-section title="带边框">
      <demo-block :cols="4" :gap="24">
        <ui-avatar src="https://picsum.photos/113" border-color="#1890ff" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/114" border-color="#52c41a" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/115" border-color="#faad14" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/116" border-color="#ff4d4f" border-width="4rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="加载失败">
      <demo-block :cols="4" :gap="24">
        <view class="avatar-item">
          <ui-avatar src="https://invalid-url.com/404.jpg" />
          <text class="avatar-label">默认</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://invalid-url.com/404.jpg">
            <template #error>
              <text class="avatar-error-text">!</text>
            </template>
          </ui-avatar>
          <text class="avatar-label">自定义</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="点击事件">
      <demo-block :cols="4" :gap="24">
        <ui-avatar src="https://picsum.photos/117" @click="handleClick" />
        <text class="demo-text">{{ clickCount > 0 ? `点击了 ${clickCount} 次` : "点击头像" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="组合使用">
      <demo-block :gap="16">
        <view class="user-card">
          <ui-avatar src="https://picsum.photos/118" size="100rpx" border-color="#1890ff" border-width="4rpx" />
          <view class="user-info">
            <text class="user-name">用户名称</text>
            <text class="user-desc">这是一段用户描述信息</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像组">
      <demo-block :gap="16">
        <view class="avatar-group">
          <ui-avatar
            v-for="i in 5"
            :key="i"
            :src="`https://picsum.photos/${120 + i}`"
            size="80rpx"
            border-color="#fff"
            border-width="4rpx"
            class="avatar-group-item"
            :custom-style="{ zIndex: i }"
          />
          <view class="avatar-more">+3</view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Avatar 头像" },
})

const clickCount = ref(0)

function handleClick() {
  clickCount.value++
  uni.showToast({
    title: "点击了头像",
    icon: "none",
  })
}
</script>

<style lang="scss" scoped>
.avatar-item {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.avatar-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.avatar-error-text {
  color: var(--ui-color-danger);
  font-size: 32rpx;
  font-weight: bold;
}

.demo-text {
  color: var(--ui-color-text-main);
  font-size: 28rpx;
}

.user-card {
  gap: 24rpx;
  display: flex;
  padding: 24rpx;
  background: var(--ui-color-background);
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  align-items: center;
  border-radius: var(--ui-radius-lg);
}

.user-info {
  gap: 8rpx;
  display: flex;
  flex-direction: column;
}

.user-name {
  color: var(--ui-color-text-main);
  font-size: 32rpx;
  font-weight: 500;
}

.user-desc {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.avatar-group {
  display: flex;
  align-items: center;
}

.avatar-group-item {
  margin-left: -20rpx;

  &:first-child {
    margin-left: 0;
  }
}

.avatar-more {
  color: var(--ui-color-text-secondary);
  width: 80rpx;
  border: 4rpx solid #fff;
  height: 80rpx;
  display: flex;
  z-index: 6;
  position: relative;
  font-size: 24rpx;
  background: var(--ui-color-background-light);
  align-items: center;
  margin-left: -20rpx;
  border-radius: 50%;
  justify-content: center;
}
</style>
