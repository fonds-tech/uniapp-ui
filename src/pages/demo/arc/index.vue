<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="arc-demo">
        <ui-arc background="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义高度">
      <demo-block class="arc-demo">
        <ui-arc height="200rpx" background="#07c160" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义圆弧弧度">
      <demo-block class="arc-demo">
        <ui-arc height="150rpx" :percent="80" background="#1989fa" />
      </demo-block>
    </demo-section>

    <demo-section title="渐变背景">
      <demo-block class="arc-demo">
        <ui-arc height="180rpx" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" />
      </demo-block>
    </demo-section>

    <demo-section title="组合使用">
      <demo-block class="arc-combined">
        <ui-arc height="200rpx" :fixed="false" background="#ee0a24">
          <view class="arc-content">
            <text class="arc-title">圆弧装饰</text>
            <text class="arc-desc">可用于页面顶部装饰</text>
          </view>
        </ui-arc>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Arc 圆弧进度" },
})
</script>

<style lang="scss" scoped>
.arc-demo {
  height: 300rpx;
  overflow: hidden;
  position: relative;
  border-radius: 12rpx;
}

.arc-combined {
  overflow: hidden;
  border-radius: 12rpx;
}

.arc-content {
  display: flex;
  text-align: center;
  padding-top: 40rpx;
  flex-direction: column;
}

.arc-title {
  color: #fff;
  font-size: 36rpx;
  font-weight: 600;
}

.arc-desc {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
  margin-top: 12rpx;
}
</style>
