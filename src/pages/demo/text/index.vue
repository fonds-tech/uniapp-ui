<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-text text="这是一段普通文本" />
      </demo-block>
    </demo-section>

    <demo-section title="文本大小">
      <demo-block :cols="3" :gap="24">
        <view class="text-item">
          <ui-text text="文本" size="20rpx" />
          <text class="text-label">20rpx</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" size="24rpx" />
          <text class="text-label">24rpx</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" size="28rpx" />
          <text class="text-label">28rpx</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" size="32rpx" />
          <text class="text-label">32rpx</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" size="36rpx" />
          <text class="text-label">36rpx</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" size="40rpx" />
          <text class="text-label">40rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="文本颜色">
      <demo-block :cols="3" :gap="24">
        <view class="text-item">
          <ui-text text="主要文本" color="text-primary" />
        </view>
        <view class="text-item">
          <ui-text text="次要文本" color="text-secondary" />
        </view>
        <view class="text-item">
          <ui-text text="占位文本" color="text-placeholder" />
        </view>
        <view class="text-item">
          <ui-text text="主题色" color="primary" />
        </view>
        <view class="text-item">
          <ui-text text="成功色" color="success" />
        </view>
        <view class="text-item">
          <ui-text text="警告色" color="warning" />
        </view>
        <view class="text-item">
          <ui-text text="危险色" color="danger" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="文本粗细">
      <demo-block :cols="4" :gap="24">
        <view class="text-item">
          <ui-text text="文本" weight="400" />
          <text class="text-label">400</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" weight="500" />
          <text class="text-label">500</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" weight="600" />
          <text class="text-label">600</text>
        </view>
        <view class="text-item">
          <ui-text text="文本" weight="700" />
          <text class="text-label">700</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="文本装饰">
      <demo-block :cols="3" :gap="24">
        <view class="text-item">
          <ui-text text="下划线" decoration="underline" />
        </view>
        <view class="text-item">
          <ui-text text="删除线" decoration="line-through" />
        </view>
        <view class="text-item">
          <ui-text text="上划线" decoration="overline" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="文本行数限制">
      <demo-block direction="column" :gap="24">
        <view class="text-item-row">
          <ui-text :rows="1" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号" />
          <text class="text-label">1 行</text>
        </view>
        <view class="text-item-row">
          <ui-text :rows="2" text="这是一段很长的文本，用于测试文本行数限制功能，当文本超过指定行数时会自动截断并显示省略号，这是第二行的内容，可能会被截断" />
          <text class="text-label">2 行</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="前后缀">
      <demo-block :cols="2" :gap="24">
        <view class="text-item">
          <ui-text text="99.00" prefix="¥" prefix-size="24rpx" prefix-color="danger" size="36rpx" color="danger" weight="600" />
          <text class="text-label">价格前缀</text>
        </view>
        <view class="text-item">
          <ui-text text="128" suffix="元/月" suffix-size="24rpx" suffix-color="text-secondary" size="36rpx" weight="600" />
          <text class="text-label">单位后缀</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="可选择文本">
      <demo-block>
        <ui-text text="长按可以选择复制这段文本" selectable />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Text 文本" },
})
</script>

<style lang="scss" scoped>
.text-item {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 8rpx;
}

.text-item-row {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.text-label {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
  flex-shrink: 0;
}
</style>
