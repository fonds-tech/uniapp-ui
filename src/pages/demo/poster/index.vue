<template>
  <view class="demo-page">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="section-title">海报生成</text>
      <text class="section-desc">使用 Canvas 生成分享海报</text>
    </view>

    <view class="demo-section">
      <text class="section-title">操作</text>
      <view class="demo-block button-row">
        <ui-button type="primary" :loading="loading" @click="generatePoster">生成海报</ui-button>
        <ui-button :disabled="!posterUrl" @click="savePoster">保存到相册</ui-button>
      </view>
    </view>

    <!-- 预览区域 -->
    <view class="demo-section">
      <text class="section-title">预览</text>
      <view class="demo-block preview-area">
        <image v-if="posterUrl" :src="posterUrl" mode="aspectFit" class="poster-preview" />
        <view v-else class="poster-placeholder">
          <ui-icon name="image" size="80rpx" color="#ccc" />
          <text class="placeholder-text">点击上方按钮生成海报</text>
        </view>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="demo-section">
      <text class="section-title">使用说明</text>
      <view class="demo-block">
        <text class="tip-text">1. Poster 组件基于 Canvas 绘制</text>
        <text class="tip-text">2. 支持绘制图片、文字、矩形、线条</text>
        <text class="tip-text">3. 支持网络图片和 Base64 图片</text>
        <text class="tip-text">4. 生成后可保存到相册分享</text>
      </view>
    </view>

    <!-- 隐藏的海报组件 -->
    <ui-poster ref="posterRef" :width="700" :height="900" @ready="onPosterReady" />
  </view>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "Poster 海报" },
})

const posterRef = ref()
const posterUrl = ref("")
const loading = ref(false)
const isReady = ref(false)

function onPosterReady() {
  isReady.value = true
}

function generatePoster() {
  if (!isReady.value) {
    uni.showToast({ title: "海报组件初始化中", icon: "none" })
    return
  }

  loading.value = true

  const posterData = [
    // 背景
    {
      type: "rect",
      style: {
        left: 0,
        top: 0,
        width: 700,
        height: 900,
        backgroundColor: "#ffffff",
      },
    },
    // 顶部渐变背景
    {
      type: "rect",
      style: {
        left: 0,
        top: 0,
        width: 700,
        height: 300,
        backgroundColor: "#ff4757",
        gradientColor: "#ff6b81",
        gradientType: 1,
      },
    },
    // 标题
    {
      type: "text",
      text: "UniApp UI",
      style: {
        left: 350,
        top: 120,
        fontSize: 48,
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold",
      },
    },
    // 副标题
    {
      type: "text",
      text: "跨端 UI 组件库",
      style: {
        left: 350,
        top: 180,
        fontSize: 28,
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
      },
    },
    // 内容区域背景
    {
      type: "rect",
      style: {
        left: 30,
        top: 330,
        width: 640,
        height: 400,
        backgroundColor: "#f8f9fa",
        borderRadius: 16,
      },
    },
    // 特点1
    {
      type: "text",
      text: "• 80+ 高质量组件",
      style: {
        left: 60,
        top: 380,
        fontSize: 28,
        color: "#333333",
      },
    },
    // 特点2
    {
      type: "text",
      text: "• 支持 Vue 3 + TypeScript",
      style: {
        left: 60,
        top: 440,
        fontSize: 28,
        color: "#333333",
      },
    },
    // 特点3
    {
      type: "text",
      text: "• 多端适配 (H5/小程序/App)",
      style: {
        left: 60,
        top: 500,
        fontSize: 28,
        color: "#333333",
      },
    },
    // 特点4
    {
      type: "text",
      text: "• 完善的文档和示例",
      style: {
        left: 60,
        top: 560,
        fontSize: 28,
        color: "#333333",
      },
    },
    // 特点5
    {
      type: "text",
      text: "• 支持深色模式",
      style: {
        left: 60,
        top: 620,
        fontSize: 28,
        color: "#333333",
      },
    },
    // 底部文字
    {
      type: "text",
      text: "扫码了解更多",
      style: {
        left: 350,
        top: 800,
        fontSize: 24,
        color: "#999999",
        textAlign: "center",
      },
    },
  ]

  posterRef.value?.draw(posterData, (url: string) => {
    loading.value = false
    if (url) {
      posterUrl.value = url
      uni.showToast({ title: "生成成功", icon: "success" })
    } else {
      uni.showToast({ title: "生成失败", icon: "none" })
    }
  })
}

function savePoster() {
  if (!posterUrl.value) return
  posterRef.value?.save(posterUrl.value)
}
</script>

<style lang="scss">
@use "../styles/demo.scss" as *;

.section-desc {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 8rpx;
}

.button-row {
  gap: 20rpx;
  display: flex;
}

.preview-area {
  display: flex;
  background: var(--ui-color-background-light);
  min-height: 500rpx;
  align-items: center;
  border-radius: 12rpx;
  justify-content: center;
}

.poster-preview {
  width: 100%;
  max-height: 600rpx;
}

.poster-placeholder {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.placeholder-text {
  color: #ccc;
  font-size: 26rpx;
  margin-top: 20rpx;
}

.tip-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 26rpx;
  line-height: 1.8;
}
</style>
