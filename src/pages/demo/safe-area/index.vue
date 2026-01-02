<template>
  <demo-page>
    <demo-section title="顶部安全区域">
      <demo-block direction="column">
        <view class="safe-area-demo">
          <ui-safe-area-top background="#1989fa" @height="onTopHeight" />
          <view class="content-box top">
            <ui-text color="#fff">顶部安全区域高度：{{ topHeight }}px</ui-text>
            <ui-text color="#fff" size="small">适用于自定义导航栏场景</ui-text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="底部安全区域">
      <demo-block direction="column">
        <view class="safe-area-demo">
          <view class="content-box bottom">
            <ui-text color="#fff">底部安全区域高度：{{ bottomHeight }}px</ui-text>
            <ui-text color="#fff" size="small">适用于底部固定按钮场景</ui-text>
          </view>
          <ui-safe-area-bottom background="#07c160" @height="onBottomHeight" />
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
        <view class="use-case">
          <ui-text bold>场景一：自定义导航栏</ui-text>
          <view class="mock-navbar">
            <ui-safe-area-top background="#1989fa" />
            <view class="navbar-content">
              <ui-icon name="arrow-left" color="#fff" size="20" />
              <ui-text color="#fff" bold>页面标题</ui-text>
              <view style="width: 20px" />
            </view>
          </view>
        </view>
        <view class="use-case">
          <ui-text bold>场景二：底部操作栏</ui-text>
          <view class="mock-footer">
            <view class="footer-content">
              <ui-button type="primary" size="small">立即购买</ui-button>
              <ui-button size="small">加入购物车</ui-button>
            </view>
            <ui-safe-area-bottom background="#fff" />
          </view>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "SafeArea 安全区域" },
})

const topHeight = ref(0)
const bottomHeight = ref(0)

function onTopHeight(height: number) {
  topHeight.value = height
}

function onBottomHeight(height: number) {
  bottomHeight.value = height
}
</script>

<style scoped lang="scss">
.safe-area-demo {
  border-radius: 8px;
  overflow: hidden;
}

.content-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.top {
    background: #1989fa;
  }

  &.bottom {
    background: #07c160;
  }
}

.color-demos {
  display: flex;
  gap: 12px;
}

.color-demo-item {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
}

.color-label {
  padding: 12px;
  color: #fff;
  text-align: center;
  font-size: 12px;
}

.use-case {
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.mock-navbar {
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
  background: #1989fa;

  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
  }
}

.mock-footer {
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #eee;

  .footer-content {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    justify-content: flex-end;
  }
}
</style>
