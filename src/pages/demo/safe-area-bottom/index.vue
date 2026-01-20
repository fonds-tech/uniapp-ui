<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <view class="safe-area-demo">
          <view class="content-box">
            <ui-text color="#fff">底部安全区域高度：{{ height }}px</ui-text>
            <ui-text color="#fff" size="small">适用于底部固定按钮场景</ui-text>
          </view>
          <ui-safe-area-bottom background="#07c160" @height="onHeight" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景色">
      <demo-block direction="column">
        <view class="color-demos">
          <view class="color-demo-item">
            <view class="color-label" style="background: #ff6b6b">珊瑚红</view>
            <ui-safe-area-bottom background="#ff6b6b" />
          </view>
          <view class="color-demo-item">
            <view class="color-label" style="background: #4ecdc4">薄荷绿</view>
            <ui-safe-area-bottom background="#4ecdc4" />
          </view>
          <view class="color-demo-item">
            <view class="color-label" style="background: #7232dd">神秘紫</view>
            <ui-safe-area-bottom background="#7232dd" />
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="实际应用场景">
      <demo-block direction="column">
        <ui-text bold>底部操作栏</ui-text>
        <view class="mock-footer">
          <view class="footer-content">
            <ui-button type="primary" size="small">立即购买</ui-button>
            <ui-button size="small">加入购物车</ui-button>
          </view>
          <ui-safe-area-bottom background="#fff" />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "SafeAreaBottom 底部安全区" },
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
  background: #07c160;
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

.mock-footer {
  border: 1px solid #eee;
  overflow: hidden;
  background: #fff;
  margin-top: 8px;
  border-radius: 8px;

  .footer-content {
    gap: 12px;
    display: flex;
    padding: 12px 16px;
    justify-content: flex-end;
  }
}
</style>
