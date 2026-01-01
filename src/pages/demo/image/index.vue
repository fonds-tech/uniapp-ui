<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/200" width="200rpx" height="200rpx" />
        <ui-image src="https://picsum.photos/201" width="200rpx" height="200rpx" />
        <ui-image src="https://picsum.photos/202" width="200rpx" height="200rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="填充模式">
      <demo-block :cols="3" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="scaleToFill" />
          <text class="image-label">scaleToFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFit" />
          <text class="image-label">aspectFit</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="aspectFill" />
          <text class="image-label">aspectFill</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="widthFix" />
          <text class="image-label">widthFix</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/200/300" width="200rpx" height="200rpx" mode="heightFix" />
          <text class="image-label">heightFix</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/300/200" width="200rpx" height="200rpx" mode="center" />
          <text class="image-label">center</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="圆形图片">
      <demo-block :cols="4" :gap="24">
        <ui-image src="https://picsum.photos/203" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/204" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/205" width="140rpx" height="140rpx" round />
        <ui-image src="https://picsum.photos/206" width="140rpx" height="140rpx" round />
      </demo-block>
    </demo-section>

    <demo-section title="圆角大小">
      <demo-block :cols="4" :gap="24">
        <view class="image-item">
          <ui-image src="https://picsum.photos/207" width="140rpx" height="140rpx" radius="0" />
          <text class="image-label">0</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/208" width="140rpx" height="140rpx" radius="8rpx" />
          <text class="image-label">8rpx</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/209" width="140rpx" height="140rpx" radius="16rpx" />
          <text class="image-label">16rpx</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/210" width="140rpx" height="140rpx" radius="32rpx" />
          <text class="image-label">32rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="正方形图片">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/300/200" width="200rpx" square radius="8rpx" />
        <ui-image src="https://picsum.photos/200/300" width="200rpx" square radius="8rpx" />
        <ui-image src="https://picsum.photos/400/200" width="200rpx" square radius="8rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="加载状态">
      <demo-block :cols="3" :gap="24">
        <view class="image-item">
          <ui-image src="" width="200rpx" height="200rpx" />
          <text class="image-label">加载中</text>
        </view>
        <view class="image-item">
          <ui-image src="https://invalid-url.com/404.jpg" width="200rpx" height="200rpx" />
          <text class="image-label">加载失败</text>
        </view>
        <view class="image-item">
          <ui-image src="https://picsum.photos/211" width="200rpx" height="200rpx" fade />
          <text class="image-label">淡入效果</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义占位">
      <demo-block :cols="2" :gap="24">
        <view class="image-item">
          <ui-image src="" width="200rpx" height="200rpx">
            <template #loading>
              <ui-loading size="48rpx" />
            </template>
          </ui-image>
          <text class="image-label">自定义加载</text>
        </view>
        <view class="image-item">
          <ui-image src="https://invalid-url.com/404.jpg" width="200rpx" height="200rpx">
            <template #error>
              <view class="custom-error">
                <ui-icon name="warning" size="40rpx" color="#999" />
                <text class="custom-error-text">加载失败</text>
              </view>
            </template>
          </ui-image>
          <text class="image-label">自定义错误</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="背景色">
      <demo-block :cols="3" :gap="24">
        <ui-image src="https://picsum.photos/212" width="200rpx" height="200rpx" background="#f5f5f5" radius="8rpx" />
        <ui-image src="https://picsum.photos/213" width="200rpx" height="200rpx" background="#e8f4ff" radius="8rpx" />
        <ui-image src="https://picsum.photos/214" width="200rpx" height="200rpx" background="#fff0f0" radius="8rpx" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Image 图片" },
})
</script>

<style lang="scss" scoped>
.image-item {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.image-label {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
  margin-top: 12rpx;
}

.custom-error {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.custom-error-text {
  color: #999;
  font-size: 22rpx;
}
</style>
