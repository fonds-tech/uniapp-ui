<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block>
        <ui-button type="primary" @click="showCenter = true">居中弹出</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置">
      <demo-block>
        <ui-button @click="showTop = true">顶部弹出</ui-button>
        <ui-button @click="showBottom = true">底部弹出</ui-button>
        <ui-button @click="showLeft = true">左侧弹出</ui-button>
        <ui-button @click="showRight = true">右侧弹出</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="关闭图标">
      <demo-block>
        <ui-button type="primary" @click="showClose = true">显示关闭图标</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="圆角弹窗">
      <demo-block>
        <ui-button type="primary" @click="showRound = true">圆角弹窗</ui-button>
      </demo-block>
    </demo-section>

    <!-- Popup Components -->
    <ui-popup v-model:show="showCenter" position="center">
      <view class="popup-content center-content">
        <text>居中弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showTop" position="top">
      <view class="popup-content top-content">
        <text>顶部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showBottom" position="bottom">
      <view class="popup-content bottom-content">
        <text>底部弹出内容</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showLeft" position="left">
      <view class="popup-content left-content">
        <text>左侧弹出</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRight" position="right">
      <view class="popup-content right-content">
        <text>右侧弹出</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showClose" position="bottom" closeable>
      <view class="popup-content bottom-content">
        <text>带关闭图标的弹窗</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="showRound" position="bottom" round>
      <view class="popup-content bottom-content">
        <text>圆角弹窗内容</text>
      </view>
    </ui-popup>
  </demo-page>
</template>

<script setup lang="ts">
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Popup 弹出层" },
})

const showCenter = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showClose = ref(false)
const showRound = ref(false)
</script>

<style lang="scss" scoped>
.popup-content {
  display: flex;
  padding: 48rpx;
  background: #fff;
  align-items: center;
  justify-content: center;
}

.center-content {
  width: 500rpx;
  height: 300rpx;
  border-radius: 16rpx;
}

.top-content,
.bottom-content {
  width: 100%;
  min-height: 400rpx;
}

.left-content,
.right-content {
  width: 50vw;
  height: 100vh;
}
</style>
