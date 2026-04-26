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
          <ui-avatar src="https://picsum.photos/104" size="48rpx" />
          <text class="avatar-label">48rpx</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/105" size="64rpx" />
          <text class="avatar-label">64rpx</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/106" size="80rpx" />
          <text class="avatar-label">80rpx</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/107" size="120rpx" />
          <text class="avatar-label">120rpx</text>
        </view>
        <view class="avatar-item">
          <ui-avatar src="https://picsum.photos/108" size="160rpx" />
          <text class="avatar-label">160rpx</text>
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
        <ui-avatar icon="user-o" />
        <ui-avatar icon="user-o" background="primary" icon-color="text-inverse" />
        <ui-avatar icon="user-o" background="success" icon-color="text-inverse" />
        <ui-avatar icon="user-o" background="warning" icon-color="text-inverse" />
      </demo-block>
    </demo-section>

    <demo-section title="文字头像">
      <demo-block :cols="4" :gap="24">
        <ui-avatar text="张三" background="primary" text-color="text-inverse" />
        <ui-avatar text="李四" background="success" text-color="text-inverse" />
        <ui-avatar text="王五" background="warning" text-color="text-inverse" />
        <ui-avatar text="U" background="danger" text-color="text-inverse" />
      </demo-block>
    </demo-section>

    <demo-section title="带边框">
      <demo-block :cols="4" :gap="24">
        <ui-avatar src="https://picsum.photos/113" border-color="primary" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/114" border-color="success" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/115" border-color="warning" border-width="4rpx" />
        <ui-avatar src="https://picsum.photos/116" border-color="danger" border-width="4rpx" />
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
          <ui-avatar src="https://picsum.photos/118" size="100rpx" border-color="primary" border-width="4rpx" />
          <view class="user-info">
            <text class="user-name">用户名称</text>
            <text class="user-desc">这是一段用户描述信息</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="头像组">
      <demo-block :gap="16">
        <ui-avatar-group size="80rpx" gap="-20rpx" border-color="text-inverse" border-width="4rpx" :max="5">
          <ui-avatar v-for="i in 8" :key="i" :src="`https://picsum.photos/${120 + i}`" />
        </ui-avatar-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

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
  gap: var(--ui-spacing-xs);
  display: flex;
  align-items: center;
  flex-direction: column;
}

.avatar-label {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.avatar-error-text {
  color: var(--ui-color-danger);
  font-size: var(--ui-font-size-md);
  font-weight: var(--ui-font-weight-bold);
}

.demo-text {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-sm);
}

.user-card {
  gap: var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-sm);
  align-items: center;
  border-radius: var(--ui-radius-lg);
}

.user-info {
  gap: var(--ui-spacing-xs);
  display: flex;
  flex-direction: column;
}

.user-name {
  color: var(--ui-color-text);
  font-size: var(--ui-font-size-md);
  font-weight: var(--ui-font-weight-medium);
}

.user-desc {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}
</style>
