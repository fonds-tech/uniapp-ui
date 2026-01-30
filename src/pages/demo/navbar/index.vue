<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" />
      </demo-block>
    </demo-section>

    <demo-section title="返回按钮">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" show-back />
      </demo-block>
    </demo-section>

    <demo-section title="返回文字">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" show-back back-text="返回" />
      </demo-block>
    </demo-section>

    <demo-section title="自定义左侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false">
          <template #left>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义右侧">
      <demo-block direction="column">
        <ui-navbar title="标题" :fixed="false" show-back>
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="自定义背景">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="主题色背景" :fixed="false" background="primary" title-color="#ffffff" show-back back-icon-color="#ffffff" />
        <ui-navbar title="成功色背景" :fixed="false" background="#07c160" title-color="#ffffff" show-back back-icon-color="#ffffff" />
        <ui-navbar title="渐变背景" :fixed="false" background="linear-gradient(90deg, #1989fa 0%, #07c160 100%)" title-color="#ffffff" show-back back-icon-color="#ffffff" />
      </demo-block>
    </demo-section>

    <demo-section title="标题位置">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="标题居中" :fixed="false" show-back center-title />
        <ui-navbar title="标题居左" :fixed="false" show-back :center-title="false" />
      </demo-block>
    </demo-section>

    <demo-section title="标题样式" extra="自定义标题大小、颜色、粗细、宽度">
      <demo-block direction="column" :gap="16">
        <ui-navbar title="大标题" :fixed="false" show-back title-size="40rpx" title-weight="800" />
        <ui-navbar title="彩色标题" :fixed="false" show-back title-color="#1989fa" title-weight="600" />
        <ui-navbar title="这是一个很长很长的标题需要限制宽度会自动省略" :fixed="false" show-back>
          <template #right>
            <ui-icon name="search" size="40rpx" />
          </template>
        </ui-navbar>
      </demo-block>
    </demo-section>

    <demo-section title="渐变背景">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">开启 gradient 后，导航栏背景会随滚动渐变</text>
        <text class="demo-text">点击下方按钮查看完整示例</text>
        <ui-button type="primary" size="small" @click="toGradientDemo">查看渐变效果</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义返回">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 custom-back 自定义返回逻辑</text>
        <ui-navbar title="自定义返回" :fixed="false" show-back :custom-back="onCustomBack" />
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-navbar title="事件监听" :fixed="false" show-back @back="onNavbarBack" @height="onNavbarHeight" @rect="onNavbarRect" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Navbar 导航栏" },
})

const toast = useToast()

// 事件日志
const eventLog = ref("点击导航栏触发事件")

// 返回事件
function onBack() {
  uni.navigateBack()
}

function onNavbarBack() {
  eventLog.value = "触发 back 事件"
  toast.text("点击了返回按钮")
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
  toast.success("触发自定义返回逻辑")
}

// 右侧图标点击
function onSearch() {
  toast.text("点击搜索")
}

function onMore() {
  toast.text("点击更多")
}

// 搜索导航栏
function onSearchClick() {
  toast.text("点击搜索框")
}

function onCategoryClick() {
  toast.text("点击分类")
}

// 设置
function onSetting() {
  toast.text("点击设置")
}

// 跳转渐变 demo
function toGradientDemo() {
  uni.navigateTo({ url: "/pages/demo/navbar-gradient/index" })
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.navbar-icons {
  gap: 24rpx;
  display: flex;
  align-items: center;
}

.immersive-demo {
  width: 100%;
  height: 200rpx;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
}

.search-box {
  gap: 12rpx;
  width: 400rpx;
  height: 64rpx;
  display: flex;
  padding: 0 20rpx;
  background: #fff;
  align-items: center;
  border-radius: 32rpx;
}

.search-placeholder {
  color: #999;
  font-size: 26rpx;
}

.nav-text {
  color: #333;
  font-size: 28rpx;
}

.transparent-demo {
  width: 100%;
  height: 300rpx;
  overflow: hidden;
  position: relative;
  border-radius: 12rpx;
}

.demo-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.user-info {
  gap: 16rpx;
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 60rpx;
  border: 2rpx solid #fff;
  height: 60rpx;
  border-radius: 50%;
}

.user-name {
  color: #fff;
  font-size: 30rpx;
  font-weight: 600;
}

:deep(.my-navbar) {
  background: linear-gradient(90deg, #ff9a9e 0%, #fecfef 100%) !important;
  border-radius: 0 0 24rpx 24rpx;
}
</style>
