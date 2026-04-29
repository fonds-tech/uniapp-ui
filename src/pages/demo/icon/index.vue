<template>
  <demo-page>
    <demo-section title="基础用法" desc="字体图标 + 图片图标双模式，name 为图片地址自动切换 image 渲染">
      <demo-block :gap="24">
        <ui-icon name="search" size="48rpx" />
        <ui-icon name="heart" size="48rpx" />
        <ui-icon name="star" size="48rpx" />
        <ui-icon name="setting" size="48rpx" />
        <ui-icon name="user" size="48rpx" />
        <ui-icon name="bell" size="48rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="颜色 (color)">
      <demo-block :cols="6" :gap="16">
        <view v-for="c in colors" :key="c.value" class="icon-cell" @click="currentColor = c.value">
          <ui-icon name="heart" size="44rpx" :color="c.value" />
          <text class="icon-cell__label">{{ c.label }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸 (size)">
      <demo-block :cols="5" :gap="16">
        <view v-for="s in sizes" :key="s" class="icon-cell">
          <ui-icon name="star" :size="s" color="#1989fa" />
          <text class="icon-cell__label">{{ s }}rpx</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="粗细 (weight)" desc="iconfont 字体粗细，支持 100-900">
      <demo-block :cols="5" :gap="16">
        <view v-for="w in weights" :key="w" class="icon-cell">
          <ui-icon name="check" size="44rpx" :weight="w" />
          <text class="icon-cell__label">{{ w }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="背景 + 圆角 (background / radius)" desc="徽章型图标常见用法">
      <demo-block :cols="4" :gap="16">
        <view v-for="b in bgIcons" :key="b.name" class="icon-cell">
          <ui-icon :name="b.name" size="40rpx" color="#fff" :background="b.bg" radius="50%" custom-style="padding: 16rpx" />
          <text class="icon-cell__label">{{ b.label }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="hoverClass" desc="按下时附加类名做反馈">
      <demo-block :gap="24">
        <ui-icon name="like" size="60rpx" color="#ee0a24" hover-class="icon-hover" />
        <ui-icon name="star" size="60rpx" color="#ff976a" hover-class="icon-hover" />
        <ui-icon name="heart" size="60rpx" color="#1989fa" hover-class="icon-hover" />
      </demo-block>
      <text class="demo-text">长按图标查看反馈效果</text>
    </demo-section>

    <demo-section title="图片图标 (imageMode)" desc="name 为 http(s):// 或 / 开头时自动切到 image 渲染">
      <demo-block :cols="4" :gap="16">
        <view v-for="m in imageModes" :key="m" class="icon-cell">
          <ui-icon name="https://picsum.photos/100/60?random=1" :width="80" :height="60" :image-mode="m" />
          <text class="icon-cell__label">{{ m }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="点击事件 (@click)">
      <demo-block :gap="24">
        <ui-icon v-for="i in clickIcons" :key="i.name" :name="i.name" size="48rpx" :color="i.color" @click="onTap(i.name)" />
      </demo-block>
      <text v-if="lastClicked" class="demo-text">最近点击: {{ lastClicked }}</text>
    </demo-section>

    <demo-section title="图标库 (点击复制名称)" :extra="`共 ${filteredIcons.length} 个`">
      <view class="search-bar">
        <ui-icon name="search" size="32rpx" color="#86909C" />
        <input v-model="keyword" class="search-bar__input" placeholder="搜索图标名称" placeholder-style="color: #86909C" />
        <view v-if="keyword" class="search-bar__clear" @click="keyword = ''">
          <ui-icon name="close" size="24rpx" color="#86909C" />
        </view>
      </view>
      <demo-block :cols="4" :gap="16" custom-style="margin-top: 16rpx">
        <view v-for="icon in filteredIcons" :key="icon.name" class="icon-card" @click="copyName(icon.name)">
          <ui-icon :name="icon.name" size="44rpx" />
          <text class="icon-card__name">{{ icon.name }}</text>
        </view>
      </demo-block>
      <view v-if="filteredIcons.length === 0" class="empty">
        <ui-icon name="search" size="80rpx" color="#F2F3F5" />
        <text class="empty__text">未找到 "{{ keyword }}"</text>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import iconsData from "@/uni_modules/uniapp-ui/ui-icon/iconfont.json"
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({ style: { navigationBarTitleText: "Icon 图标" } })

const toast = useToast()

const colors = [
  { label: "默认", value: "" },
  { label: "主色", value: "#1989fa" },
  { label: "成功", value: "#07c160" },
  { label: "警告", value: "#ff976a" },
  { label: "危险", value: "#ee0a24" },
  { label: "紫", value: "#7232dd" },
]

const sizes = ["24", "32", "44", "56", "72"]
const weights = [100, 300, 400, 600, 900]

const bgIcons = [
  { name: "user", bg: "#1989fa", label: "蓝" },
  { name: "heart", bg: "#ee0a24", label: "红" },
  { name: "star", bg: "#ff976a", label: "橙" },
  { name: "check", bg: "#07c160", label: "绿" },
]

const imageModes = ["scaleToFill", "aspectFit", "aspectFill", "widthFix"]

const clickIcons = [
  { name: "thumbs-up", color: "#1989fa" },
  { name: "heart", color: "#ee0a24" },
  { name: "star", color: "#ff976a" },
  { name: "share", color: "#07c160" },
]

const currentColor = ref("")
const lastClicked = ref("")
const keyword = ref("")

const icons = iconsData.glyphs.map((item) => ({
  name: item.font_class,
  unicode: item.unicode,
}))

const filteredIcons = computed(() => {
  if (!keyword.value) return icons
  const kw = keyword.value.toLowerCase()
  return icons.filter((icon) => icon.name.toLowerCase().includes(kw))
})

function onTap(name: string) {
  lastClicked.value = name
  toast.text(`点击了 ${name}`)
}

function copyName(name: string) {
  uni.setClipboardData({
    data: name,
    showToast: false,
    success: () => toast.success(`已复制 ${name}`),
  })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  margin-top: 12rpx;
}

.icon-cell {
  gap: 8rpx;
  display: flex;
  align-items: center;
  flex-direction: column;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }
}

.icon-hover {
  opacity: 0.5;
  transform: scale(0.92);
  transition: var(--ui-transition-fast);
}

// === 图标库 ===
.search-bar {
  gap: 12rpx;
  display: flex;
  padding: 16rpx 24rpx;
  background: var(--ui-color-background-page);
  align-items: center;
  border-radius: var(--ui-radius-round);

  &__input {
    flex: 1;
    color: var(--ui-color-text);
    height: 40rpx;
    font-size: 26rpx;
    line-height: 40rpx;
  }

  &__clear {
    width: 40rpx;
    height: 40rpx;
    display: flex;
    background: var(--ui-color-background-disabled);
    align-items: center;
    border-radius: 50%;
    justify-content: center;
  }
}

.icon-card {
  gap: 8rpx;
  border: 1rpx solid var(--ui-color-border-light);
  display: flex;
  padding: 24rpx 8rpx;
  position: relative;
  background: var(--ui-color-background);
  align-items: center;
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__name {
    color: var(--ui-color-text-secondary);
    width: 100%;
    height: 32rpx;
    overflow: hidden;
    font-size: 22rpx;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &:active {
    background: var(--ui-color-background-hover);
  }
}

.empty {
  gap: 24rpx;
  display: flex;
  padding: 100rpx 0;
  align-items: center;
  flex-direction: column;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
  }
}
</style>
