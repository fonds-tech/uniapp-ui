<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-cell title="选择颜色" :value="color1 || '请选择'" is-link @click="show1 = true" />
      <ui-color-picker v-model="color1" v-model:show="show1" title="选择颜色" />
    </demo-section>

    <demo-section title="自定义预设颜色">
      <ui-cell title="品牌色" is-link @click="show2 = true">
        <view class="value-box">
          <text v-if="color2" class="value-text">{{ color2 }}</text>
          <view v-if="color2" class="color-preview" :style="{ backgroundColor: color2 }"></view>
          <text v-else class="placeholder">请选择</text>
        </view>
      </ui-cell>
      <ui-color-picker v-model="color2" v-model:show="show2" title="选择品牌色" :preset-colors="brandColors" :columns="5" />
    </demo-section>

    <demo-section title="隐藏输入框">
      <ui-cell title="主题色" is-link @click="show3 = true">
        <view class="value-box">
          <text v-if="color3" class="value-text">{{ color3 }}</text>
          <view v-if="color3" class="color-preview" :style="{ backgroundColor: color3 }"></view>
          <text v-else class="placeholder">请选择</text>
        </view>
      </ui-cell>
      <ui-color-picker v-model="color3" v-model:show="show3" title="选择主题色" :show-input="false" />
    </demo-section>

    <demo-section title="隐藏预设色板">
      <ui-cell title="自定义颜色" is-link @click="show4 = true">
        <view class="value-box">
          <text v-if="color4" class="value-text">{{ color4 }}</text>
          <view v-if="color4" class="color-preview" :style="{ backgroundColor: color4 }"></view>
          <text v-else class="placeholder">请选择</text>
        </view>
      </ui-cell>
      <ui-color-picker v-model="color4" v-model:show="show4" title="自定义颜色" :show-presets="false" />
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "ColorPicker 颜色选择器" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

const color1 = ref("")
const color2 = ref("#1DA1F2")
const color3 = ref("#6366F1")
const color4 = ref("#10B981")

// 品牌色预设
const brandColors = [
  "#1DA1F2", // Twitter
  "#4267B2", // Facebook
  "#E4405F", // Instagram
  "#FF0000", // YouTube
  "#0A66C2", // LinkedIn
  "#25D366", // WhatsApp
  "#FF4500", // Reddit
  "#1DB954", // Spotify
  "#5865F2", // Discord
  "#000000", // TikTok
]
</script>

<style lang="scss" scoped>
.value-box {
  gap: 12rpx;
  display: flex;
  align-items: center;
}

.value-text {
  color: #666;
  font-size: 28rpx;
}

.color-preview {
  width: 32rpx;
  border: 2rpx solid rgba(0, 0, 0, 0.1);
  height: 32rpx;
  border-radius: 8rpx;
}

.placeholder {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-sm);
}
</style>
