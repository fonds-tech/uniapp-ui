<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <text class="demo-text">上方内容</text>
        <ui-line />
        <text class="demo-text">下方内容</text>
      </demo-block>
    </demo-section>

    <demo-section title="虚线">
      <demo-block direction="column">
        <text class="demo-text">上方内容</text>
        <ui-line type="dashed" />
        <text class="demo-text">下方内容</text>
      </demo-block>
    </demo-section>

    <demo-section title="点线">
      <demo-block direction="column">
        <text class="demo-text">上方内容</text>
        <ui-line type="dotted" />
        <text class="demo-text">下方内容</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column">
        <ui-line color="#ee0a24" />
        <ui-line color="#07c160" margin="20rpx 0" />
        <ui-line color="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义粗细">
      <demo-block direction="column">
        <ui-line thickness="4rpx" />
        <ui-line thickness="8rpx" margin="20rpx 0" />
        <ui-line thickness="12rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="垂直线条">
      <demo-block align="center">
        <text class="demo-text inline">左边</text>
        <ui-line vertical length="40rpx" margin="0 20rpx" />
        <text class="demo-text inline">中间</text>
        <ui-line vertical length="40rpx" margin="0 20rpx" />
        <text class="demo-text inline">右边</text>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Line 分割线" },
})
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-main);
  display: block;
  padding: 16rpx 0;
  font-size: 28rpx;

  &.inline {
    display: inline;
    padding: 0;
  }
}
</style>
