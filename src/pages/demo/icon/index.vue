<template>
  <demo-page class="bg-[#F7F8FA] min-h-screen flex flex-col">
    <!-- 图标搜索 (固定在顶部) -->
    <view class="flex-shrink-0 bg-[#F7F8FA] mb-[16rpx]">
      <view class="bg-white rounded-full flex items-center px-[32rpx] py-[24rpx] shadow-sm border border-[#F0F0F2]">
        <ui-icon name="search" size="36rpx" class="text-[#86909C] mr-[16rpx]" />
        <input v-model="keyword" class="flex-1 text-[28rpx] text-[#1D1D1F] h-[40rpx] leading-[40rpx]" placeholder="搜索图标名称" placeholder-style="color: #86909C" />
        <view v-if="keyword" class="w-[48rpx] h-[48rpx] flex items-center justify-center bg-[#F2F3F5] rounded-full" @click="keyword = ''">
          <ui-icon name="close" size="24rpx" class="text-[#86909C]" />
        </view>
      </view>
    </view>

    <!-- 图标列表 (可滚动区域) -->
    <scroll-view class="flex-1" scroll-y enhanced :show-scrollbar="false">
      <view class="">
        <demo-block :cols="4" :gap="16">
          <view v-for="icon in filteredIcons" :key="icon.name" class="icon-card group active:scale-95 transition-all" @click="copyIconName(icon.name)">
            <view class="icon-content">
              <view class="icon-wrapper">
                <ui-icon :name="icon.name" size="44rpx" class="text-[#1D1D1F] group-active:text-[#2979FF] transition-colors" />
              </view>
              <text class="icon-name text-[#4E5969]">{{ icon.name }}</text>
            </view>
          </view>
        </demo-block>

        <!-- 空状态 -->
        <view v-if="filteredIcons.length === 0" class="flex flex-col items-center justify-center py-[100rpx]">
          <ui-icon name="search" size="80rpx" class="text-[#F2F3F5] mb-[24rpx]" />
          <text class="text-[#86909C] text-[28rpx]">未找到包含 "{{ keyword }}" 的图标</text>
        </view>
      </view>
    </scroll-view>

    <ui-toast ref="toast"></ui-toast>
  </demo-page>
</template>

<script setup lang="ts">
import type { ToastInstance } from "@/uni_modules/uniapp-ui/ui-toast"
import iconsData from "@/uni_modules/uniapp-ui/ui-icon/icons.json"
import { ref, computed } from "vue"
import { DemoPage, DemoBlock } from "../components"

definePage({ style: { navigationBarTitleText: "Icon 图标" } })

const toast = ref<ToastInstance>()

// 搜索关键词
const keyword = ref("")

// 图标列表
const icons = ref<{ name: string; unicode: string }[]>(iconsData)

// 过滤后的图标列表
const filteredIcons = computed(() => {
  if (!keyword.value) return icons.value
  const kw = keyword.value.toLowerCase()
  return icons.value.filter((icon) => icon.name.toLowerCase().includes(kw))
})

// 复制图标名称
function copyIconName(name: string) {
  uni.setClipboardData({
    data: name,
    showToast: false,
    success: () => {
      toast.value?.success("已复制")
    },
  })
}
</script>

<style lang="scss" scoped>
.icon-card {
  border: 1rpx solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  border-radius: 16rpx;
  background-color: #ffffff;

  /* 正方形：使用 padding-bottom 撑开高度 */
  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  /* 内容容器：整体居中 */
  .icon-content {
    top: 50%;
    left: 50%;
    width: 100%;
    display: flex;
    padding: 0 8rpx;
    position: absolute;
    transform: translate(-50%, -50%);
    align-items: center;
    flex-direction: column;
  }

  /* 图标区域：固定高度 */
  .icon-wrapper {
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 文字区域：固定高度，确保图标位置一致 */
  .icon-name {
    height: 34rpx;
    font-size: 24rpx;
    margin-top: 8rpx;
    text-align: center;
  }
}
</style>
