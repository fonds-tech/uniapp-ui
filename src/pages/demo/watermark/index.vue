<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block title="文字水印">
        <ui-watermark content="Uniapp UI" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">这是一段需要水印保护的内容区域</text>
            <text class="watermark-content__text">水印可以有效防止内容被盗用</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 多行文字 -->
    <demo-section title="多行文字">
      <demo-block title="content 传入数组">
        <ui-watermark :content="['公司名称', '2024-01-01']" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">多行水印适合展示更多信息</text>
            <text class="watermark-content__text">例如公司名称和日期</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 图片水印 -->
    <demo-section title="图片水印">
      <demo-block title="使用 image 属性">
        <ui-watermark
          image="https://fastly.jsdelivr.net/npm/@AuroraUI/assets@1.0.0/logo/logo.png"
          :width="60"
          :height="60"
          :full-page="false"
        >
          <view class="watermark-content">
            <text class="watermark-content__text">使用图片作为水印</text>
            <text class="watermark-content__text">image 优先级高于 content</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 自定义间隔 -->
    <demo-section title="自定义间隔">
      <demo-block title="gapX: 100, gapY: 100">
        <ui-watermark content="大间隔" :gap-x="100" :gap-y="100" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">水印之间的间隔更大</text>
            <text class="watermark-content__text">gapX 控制水平间距，gapY 控制垂直间距</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="gapX: 10, gapY: 10">
        <ui-watermark content="小间隔" :gap-x="10" :gap-y="10" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">水印之间的间隔更小</text>
            <text class="watermark-content__text">水印更加密集</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 旋转角度 -->
    <demo-section title="旋转角度">
      <demo-block title="rotate: -45">
        <ui-watermark content="倾斜45度" :rotate="-45" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">水印旋转角度为 -45 度</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="rotate: 0">
        <ui-watermark content="水平水印" :rotate="0" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">水印旋转角度为 0 度（水平）</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="rotate: 45">
        <ui-watermark content="倾斜45度" :rotate="45" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">水印旋转角度为 45 度</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 透明度 -->
    <demo-section title="透明度">
      <demo-block title="opacity: 0.3">
        <ui-watermark content="较浅" :opacity="0.3" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">透明度 0.3，水印较浅</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="opacity: 0.6">
        <ui-watermark content="适中" :opacity="0.6" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">透明度 0.6，水印适中</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="opacity: 1">
        <ui-watermark content="较深" :opacity="1" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">透明度 1，水印较深</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 字体样式 -->
    <demo-section title="字体样式">
      <demo-block title="fontSize: 20">
        <ui-watermark content="大字体" :font-size="20" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">字体大小为 20px</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="fontColor: rgba(255, 0, 0, 0.15)">
        <ui-watermark content="红色水印" font-color="rgba(255, 0, 0, 0.15)" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">自定义字体颜色为红色</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="fontWeight: bold">
        <ui-watermark content="粗体水印" font-weight="bold" :full-page="false">
          <view class="watermark-content">
            <text class="watermark-content__text">字体粗细为粗体</text>
          </view>
        </ui-watermark>
      </demo-block>
      <demo-block title="组合样式">
        <ui-watermark
          content="组合样式"
          :font-size="18"
          font-color="rgba(0, 128, 0, 0.2)"
          font-weight="bold"
          :full-page="false"
        >
          <view class="watermark-content">
            <text class="watermark-content__text">大字体 + 绿色 + 粗体</text>
          </view>
        </ui-watermark>
      </demo-block>
    </demo-section>

    <!-- 局部水印 -->
    <demo-section title="局部水印">
      <demo-block title="fullPage: false">
        <view class="local-wrapper">
          <ui-watermark content="局部水印" :full-page="false">
            <view class="watermark-content watermark-content--large">
              <text class="watermark-content__text">局部水印只覆盖组件内容区域</text>
              <text class="watermark-content__text">而不是整个页面</text>
              <text class="watermark-content__text">适合需要局部保护的场景</text>
            </view>
          </ui-watermark>
        </view>
      </demo-block>
    </demo-section>

    <!-- 全屏水印 -->
    <demo-section title="全屏水印">
      <demo-block title="fullPage: true（默认）">
        <ui-button type="primary" @click="showFullPage = !showFullPage">
          {{ showFullPage ? '关闭全屏水印' : '开启全屏水印' }}
        </ui-button>
        <ui-watermark v-if="showFullPage" content="全屏水印" :full-page="true" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref } from "vue"

definePage({
  style: { navigationBarTitleText: "Watermark 水印" },
})

const showFullPage = ref(false)
</script>

<style lang="scss" scoped>
.watermark-content {
  gap: 16rpx;
  display: flex;
  padding: 40rpx;
  background: var(--ui-color-background);
  min-height: 200rpx;
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;
  justify-content: center;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 28rpx;
    text-align: center;
  }

  &--large {
    min-height: 400rpx;
  }
}

.local-wrapper {
  padding: 20rpx;
  background: var(--ui-color-background-dark);
  border-radius: var(--ui-radius-lg);
}
</style>
