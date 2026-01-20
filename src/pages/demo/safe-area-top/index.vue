<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="safe-area-demo">
          <ui-safe-area-top background="#1989fa" @height="onHeight" />
          <view class="content-box">
            <ui-text color="#fff">顶部安全区域高度：{{ height }}px</ui-text>
            <ui-text color="#fff" size="small">适用于自定义导航栏场景</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column">
        <view class="color-demos">
          <view class="color-demo-item">
            <ui-safe-area-top background="#ff6b6b" />
            <view class="color-label" style="background: #ff6b6b">珊瑚红</view>
          </view>
          <view class="color-demo-item">
            <ui-safe-area-top background="#4ecdc4" />
            <view class="color-label" style="background: #4ecdc4">薄荷绿</view>
          </view>
          <view class="color-demo-item">
            <ui-safe-area-top background="#7232dd" />
            <view class="color-label" style="background: #7232dd">神秘紫</view>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="实际应用场景">
      <demo-block direction="column">
        <ui-text bold>自定义导航栏</ui-text>
        <view class="mock-navbar">
          <ui-safe-area-top background="#1989fa" />
          <view class="navbar-content">
            <ui-icon name="arrow-left" color="#fff" size="20" />
            <ui-text color="#fff" bold>页面标题</ui-text>
            <view style="width: 20px" />
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "SafeAreaTop 顶部安全区" },
})

const height = ref(0)

function onHeight(h: number) {
  height.value = h
}
</script>

<style scoped lang="scss">
.safe-area-demo {
  overflow: hidden;
  border-radius: 8px;
}

.content-box {
  gap: 4px;
  display: flex;
  padding: 16px;
  background: #1989fa;
  flex-direction: column;
}

.color-demos {
  gap: 12px;
  display: flex;
}

.color-demo-item {
  flex: 1;
  overflow: hidden;
  border-radius: 8px;
}

.color-label {
  color: #fff;
  padding: 12px;
  font-size: 12px;
  text-align: center;
}

.mock-navbar {
  overflow: hidden;
  background: #1989fa;
  margin-top: 8px;
  border-radius: 8px;

  .navbar-content {
    display: flex;
    padding: 12px 16px;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
