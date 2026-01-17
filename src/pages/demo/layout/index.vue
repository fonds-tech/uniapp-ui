<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">span: 8</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="不同比例">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="4">
            <view class="grid-item dark">span: 4</view>
          </ui-col>
          <ui-col :span="20">
            <view class="grid-item light">span: 20</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6">
            <view class="grid-item dark">span: 6</view>
          </ui-col>
          <ui-col :span="18">
            <view class="grid-item light">span: 18</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="12">
            <view class="grid-item dark">span: 12</view>
          </ui-col>
          <ui-col :span="12">
            <view class="grid-item light">span: 12</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="统一间距">
      <demo-block direction="column">
        <ui-row gap="20rpx">
          <ui-col :span="8">
            <view class="grid-item dark">1</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">2</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">3</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">4</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">5</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">6</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="分别设置间距">
      <demo-block direction="column">
        <ui-row col-gap="30rpx" row-gap="10rpx">
          <ui-col :span="8">
            <view class="grid-item dark">1</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">2</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">3</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">4</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">5</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light">6</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="列偏移">
      <demo-block direction="column">
        <ui-row>
          <ui-col :span="8">
            <view class="grid-item dark">span: 8</view>
          </ui-col>
          <ui-col :span="8" :offset="8">
            <view class="grid-item dark">offset: 8</view>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
          <ui-col :span="6" :offset="6">
            <view class="grid-item dark">offset: 6</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="水平对齐">
      <demo-block direction="column">
        <view class="align-label">justify: center</view>
        <ui-row justify="center">
          <ui-col :span="6">
            <view class="grid-item dark">居中</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">居中</view>
          </ui-col>
        </ui-row>
        <view class="align-label">justify: end</view>
        <ui-row justify="end">
          <ui-col :span="6">
            <view class="grid-item dark">右对齐</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">右对齐</view>
          </ui-col>
        </ui-row>
        <view class="align-label">justify: between</view>
        <ui-row justify="between">
          <ui-col :span="6">
            <view class="grid-item dark">两端</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">两端</view>
          </ui-col>
        </ui-row>
        <view class="align-label">justify: around</view>
        <ui-row justify="around">
          <ui-col :span="6">
            <view class="grid-item dark">环绕</view>
          </ui-col>
          <ui-col :span="6">
            <view class="grid-item light">环绕</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>

    <demo-section title="垂直对齐">
      <demo-block direction="column">
        <view class="align-label">align: start</view>
        <ui-row align="start" class="row-height">
          <ui-col :span="8">
            <view class="grid-item dark">顶部</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light h80">高80</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">顶部</view>
          </ui-col>
        </ui-row>
        <view class="align-label">align: center</view>
        <ui-row align="center" class="row-height">
          <ui-col :span="8">
            <view class="grid-item dark">居中</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light h80">高80</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">居中</view>
          </ui-col>
        </ui-row>
        <view class="align-label">align: end</view>
        <ui-row align="end" class="row-height">
          <ui-col :span="8">
            <view class="grid-item dark">底部</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item light h80">高80</view>
          </ui-col>
          <ui-col :span="8">
            <view class="grid-item dark">底部</view>
          </ui-col>
        </ui-row>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Layout 布局" },
})
</script>

<style lang="scss" scoped>
.grid-item {
  height: 64rpx;
  display: flex;
  font-size: 24rpx;
  transition: all 0.3s;
  align-items: center;
  font-weight: 500;
  border-radius: 8rpx;
  justify-content: center;

  &.dark {
    color: #fff;
    background: var(--ui-color-primary);
    box-shadow: 0 4rpx 12rpx rgba(25, 137, 250, 0.4);
  }

  &.light {
    color: var(--ui-color-primary);
    background: rgba(25, 137, 250, 0.15);
  }

  &.h80 {
    height: 80rpx;
  }
}

.align-label {
  color: #666;
  font-size: 24rpx;
  margin-top: 24rpx;
  margin-bottom: 12rpx;

  &:first-child {
    margin-top: 0;
  }
}

.row-height {
  min-height: 80rpx;
}

:deep(.ui-row + .ui-row) {
  margin-top: 20rpx;
}
</style>
