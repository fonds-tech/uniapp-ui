<template>
  <demo-page custom-class="navbar-demo-page">
    <ui-navbar title="Navbar 导航栏" background="#ffffff" is-back @back="onBack" />

    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" />
      </demo-block>
    </demo-section>

    <demo-section title="返回按钮">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back />
      </demo-block>
    </demo-section>

    <demo-section title="返回文字">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back back-text="返回" />
      </demo-block>
    </demo-section>

    <!-- 新增：返回按钮样式 -->
    <demo-section title="返回按钮样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义返回按钮图标、大小、颜色</text>
        <ui-navbar
          title="自定义返回按钮"
          :fixed="false"
          is-back
          back-icon-name="arrow-left"
          back-icon-size="48rpx"
          back-icon-color="#1989fa"
        />
        <ui-navbar
          title="带文字的返回"
          :fixed="false"
          is-back
          back-text="返回"
          back-text-size="28rpx"
          back-text-color="#1989fa"
          back-text-weight="500"
        />
      </demo-block>
    </demo-section>

    <demo-section title="自定义左侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false">
          <template #left>
            <ui-icon name="close" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义右侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back>
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <!-- 新增：多个右侧图标 -->
    <demo-section title="多个右侧图标">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" is-back>
          <template #right>
            <view class="navbar-icons">
              <ui-icon name="search" size="40rpx" @click="onSearch" />
              <ui-icon name="more" size="40rpx" @click="onMore" />
            </view>
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="主题色背景" :fixed="false" background="primary" title-color="#ffffff" is-back back-icon-color="#ffffff" />
        <ui-navbar title="成功色背景" :fixed="false" background="#07c160" title-color="#ffffff" is-back back-icon-color="#ffffff" />
        <ui-navbar title="渐变背景" :fixed="false" background="linear-gradient(90deg, #1989fa 0%, #07c160 100%)" title-color="#ffffff" is-back back-icon-color="#ffffff" />
      </demo-block>
    </demo-section>

    <demo-section title="标题居中">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="标题居中" :fixed="false" is-back title-center />
        <ui-navbar title="标题居左" :fixed="false" is-back :title-center="false" />
      </demo-block>
    </demo-section>

    <!-- 新增：标题样式 -->
    <demo-section title="标题样式">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">自定义标题大小、颜色、粗细、宽度</text>
        <ui-navbar
          title="大标题"
          :fixed="false"
          is-back
          title-size="40rpx"
          title-weight="800"
        />
        <ui-navbar
          title="彩色标题"
          :fixed="false"
          is-back
          title-color="#1989fa"
          title-weight="600"
        />
        <ui-navbar
          title="这是一个很长很长的标题需要限制宽度"
          :fixed="false"
          is-back
          title-width="300rpx"
        >
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <!-- 新增：导航栏高度 -->
    <demo-section title="导航栏高度">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">通过 height 自定义导航栏高度</text>
        <ui-navbar title="默认高度" :fixed="false" is-back />
        <ui-navbar title="高度 100rpx" :fixed="false" is-back height="100rpx" />
        <ui-navbar title="高度 120rpx" :fixed="false" is-back height="120rpx" />
      </demo-block>
    </demo-section>

    <!-- 新增：内边距 -->
    <demo-section title="内边距">
      <demo-block direction="column" :gap="16">
        <text class="demo-text">通过 padding 设置左右内边距</text>
        <ui-navbar title="padding: 20rpx" :fixed="false" is-back padding="20rpx" />
        <ui-navbar title="padding: 40rpx" :fixed="false" is-back padding="40rpx" />
      </demo-block>
    </demo-section>

    <demo-section title="底部边框">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="有底部边框" :fixed="false" border-bottom />
        <ui-navbar title="无底部边框" :fixed="false" />
      </demo-block>
    </demo-section>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级</text>
        <ui-navbar title="z-index: 100" :fixed="false" is-back z-index="100" />
      </demo-block>
    </demo-section>

    <!-- 新增：沉浸式模式 -->
    <demo-section title="沉浸式模式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">开启 immersive 后导航栏背景透明</text>
        <view class="immersive-demo">
          <ui-navbar
            title="沉浸式导航"
            :fixed="false"
            is-back
            immersive
            title-color="#fff"
            back-icon-color="#fff"
          />
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：渐变背景 -->
    <demo-section title="渐变背景">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">开启 gradient 后，导航栏背景会随滚动渐变</text>
        <text class="demo-text">gradient-height 设置渐变区域高度</text>
        <view class="gradient-demo">
          <ui-navbar
            title="渐变导航栏"
            :fixed="false"
            is-back
            gradient
            gradient-height="150px"
            :scroll-top="0"
          />
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义返回 -->
    <demo-section title="自定义返回">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 custom-back 自定义返回逻辑</text>
        <ui-navbar
          title="自定义返回"
          :fixed="false"
          is-back
          :custom-back="onCustomBack"
        />
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-navbar
          title="事件监听"
          :fixed="false"
          is-back
          @back="onNavbarBack"
          @height="onNavbarHeight"
          @rect="onNavbarRect"
        />
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="16">
        <ui-navbar
          title="自定义类名"
          :fixed="false"
          is-back
          custom-class="my-navbar"
        />
        <ui-navbar
          title="自定义样式"
          :fixed="false"
          is-back
          :custom-style="{ boxShadow: '0 4rpx 16rpx rgba(0,0,0,0.1)' }"
        />
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例 - 搜索导航栏">
      <demo-block direction="column">
        <ui-navbar
          :fixed="false"
          is-back
          :title="null"
          background="#f7f8fa"
          border-bottom
        >
          <template #title>
            <view class="search-box" @click="onSearchClick">
              <ui-icon name="search" size="32rpx" color="#999" />
              <text class="search-placeholder">搜索商品</text>
            </view>
          </template>
          <template #right>
            <text class="nav-text" @click="onCategoryClick">分类</text>
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 透明导航栏 -->
    <demo-section title="综合示例 - 透明导航栏">
      <demo-block direction="column">
        <view class="transparent-demo">
          <image class="demo-bg" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" mode="aspectFill" />
          <ui-navbar
            title="详情页"
            :fixed="false"
            is-back
            background="transparent"
            title-color="#fff"
            back-icon-color="#fff"
          >
            <template #right>
              <view class="navbar-icons">
                <ui-icon name="share" size="40rpx" color="#fff" />
                <ui-icon name="more" size="40rpx" color="#fff" />
              </view>
            </template>
          </ui-navbar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 - 个人中心导航栏 -->
    <demo-section title="综合示例 - 个人中心">
      <demo-block direction="column">
        <ui-navbar
          :fixed="false"
          :is-back="false"
          title-center
          background="#1989fa"
        >
          <template #title>
            <view class="user-info">
              <image class="user-avatar" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
              <text class="user-name">用户昵称</text>
            </view>
          </template>
          <template #right>
            <ui-icon name="setting" size="44rpx" color="#fff" @click="onSetting" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Navbar 导航栏" },
})

const { showToast } = useToast()

// 事件日志
const eventLog = ref("点击导航栏触发事件")

// 返回事件
function onBack() {
  uni.navigateBack()
}

function onNavbarBack() {
  eventLog.value = "触发 back 事件"
  showToast({ message: "点击了返回按钮" })
}

function onNavbarHeight(height: number) {
  eventLog.value = `触发 height 事件，高度: ${height}px`
}

function onNavbarRect(rect: UniApp.NodeInfo) {
  eventLog.value = `触发 rect 事件，宽: ${rect.width}px, 高: ${rect.height}px`
  console.log("Navbar rect:", rect)
}

// 自定义返回
function onCustomBack() {
  showToast({ message: "触发自定义返回逻辑", type: "success" })
}

// 右侧图标点击
function onSearch() {
  showToast({ message: "点击搜索" })
}

function onMore() {
  showToast({ message: "点击更多" })
}

// 搜索导航栏
function onSearchClick() {
  showToast({ message: "点击搜索框" })
}

function onCategoryClick() {
  showToast({ message: "点击分类" })
}

// 设置
function onSetting() {
  showToast({ message: "点击设置" })
}
</script>

<style lang="scss" scoped>
.navbar-demo-page {
  padding-top: 0;
}

.demo-text {
  font-size: 24rpx;
  color: var(--ui-color-text-secondary);
}

.navbar-icons {
  display: flex;
  gap: 24rpx;
  align-items: center;
}

.immersive-demo {
  width: 100%;
  height: 200rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  overflow: hidden;
}

.gradient-demo {
  width: 100%;
  height: 200rpx;
  background: linear-gradient(180deg, #1989fa 0%, #f7f8fa 100%);
  border-radius: 12rpx;
  overflow: hidden;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12rpx;
  width: 400rpx;
  height: 64rpx;
  padding: 0 20rpx;
  background: #fff;
  border-radius: 32rpx;
}

.search-placeholder {
  font-size: 26rpx;
  color: #999;
}

.nav-text {
  font-size: 28rpx;
  color: #333;
}

.transparent-demo {
  position: relative;
  width: 100%;
  height: 300rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.demo-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
}

.user-name {
  font-size: 30rpx;
  font-weight: 600;
  color: #fff;
}

:deep(.my-navbar) {
  border-radius: 0 0 24rpx 24rpx;
  background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%) !important;
}
</style>
