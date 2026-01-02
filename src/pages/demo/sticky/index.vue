<template>
  <demo-page>
    <demo-section title="基础用法" desc="向下滚动页面，按钮会吸顶" />

    <ui-sticky @change="onStickyChange1" @scroll="onStickyScroll">
      <ui-button type="primary" block>基础用法</ui-button>
    </ui-sticky>

    <demo-section title="吸顶距离" desc="offset-top 可设置吸顶距离" />

    <ui-sticky :offset-top="100" @change="onStickyChange2">
      <ui-button type="success" block>吸顶距离 100rpx</ui-button>
    </ui-sticky>

    <!-- 新增：不同吸顶距离 -->
    <demo-section title="多级吸顶" desc="设置不同的 offset-top 实现多级吸顶" />

    <ui-sticky :offset-top="150">
      <view class="sticky-box sticky-box--warning">
        <text>吸顶距离 150rpx</text>
      </view>
    </ui-sticky>

    <!-- 新增：层级设置 -->
    <demo-section title="层级设置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 z-index 设置元素层级，确保吸顶元素在正确的层次</text>
      </demo-block>
    </demo-section>

    <ui-sticky :offset-top="200" :z-index="100">
      <view class="sticky-box sticky-box--info">
        <text>z-index: 100</text>
      </view>
    </ui-sticky>

    <!-- 新增：背景色 -->
    <demo-section title="自定义背景">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 background 设置吸顶时的背景色</text>
      </demo-block>
    </demo-section>

    <ui-sticky :offset-top="250" background="#fff">
      <view class="sticky-content">
        <ui-button type="warning" size="small">带背景的吸顶</ui-button>
        <text class="sticky-content__text">吸顶时显示白色背景</text>
      </view>
    </ui-sticky>

    <!-- 新增：禁用状态 -->
    <demo-section title="禁用状态">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">disabled 属性可禁用粘性效果</text>
        <ui-button size="small" @click="stickyDisabled = !stickyDisabled">
          {{ stickyDisabled ? '启用吸顶' : '禁用吸顶' }}
        </ui-button>
      </demo-block>
    </demo-section>

    <ui-sticky :offset-top="300" :disabled="stickyDisabled">
      <view class="sticky-box" :class="stickyDisabled ? 'sticky-box--disabled' : 'sticky-box--danger'">
        <text>{{ stickyDisabled ? '已禁用吸顶' : '正常吸顶' }}</text>
      </view>
    </ui-sticky>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ stickyLog }}</text>
        <text class="demo-text">{{ scrollLog }}</text>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 customClass 和 customStyle 自定义样式</text>
      </demo-block>
    </demo-section>

    <ui-sticky
      :offset-top="350"
      custom-class="my-sticky"
      :custom-style="{ padding: '16rpx', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }"
    >
      <view class="sticky-custom">
        <text>自定义样式吸顶</text>
      </view>
    </ui-sticky>

    <!-- Placeholder Content -->
    <demo-section v-for="i in 15" :key="i" :title="`占位内容 ${i}`" desc="这是一段占位内容，用于演示滚动效果" />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Sticky 粘性布局" },
})

const toast = useToast()

// 禁用状态
const stickyDisabled = ref(false)

// 事件日志
const stickyLog = ref("等待 change 事件...")
const scrollLog = ref("等待 scroll 事件...")

// 事件处理
function onStickyChange1(isFixed: boolean) {
  stickyLog.value = `change 事件: ${isFixed ? "已吸顶" : "未吸顶"}`
  if (isFixed) {
    toast.text("基础吸顶生效")
  }
}

function onStickyChange2(isFixed: boolean) {
  if (isFixed) {
    toast.success("偏移吸顶生效")
  }
}

function onStickyScroll(data: { scrollTop: number; isFixed: boolean }) {
  scrollLog.value = `scroll 事件: scrollTop=${data.scrollTop.toFixed(0)}, isFixed=${data.isFixed}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.sticky-box {
  color: #fff;
  padding: 24rpx;
  font-size: 28rpx;
  text-align: center;

  &--warning {
    background: var(--ui-color-warning);
  }

  &--info {
    background: var(--ui-color-info);
  }

  &--danger {
    background: var(--ui-color-danger);
  }

  &--disabled {
    background: #c8c9cc;
  }
}

.sticky-content {
  gap: 16rpx;
  display: flex;
  padding: 16rpx 24rpx;
  align-items: center;

  &__text {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

.sticky-custom {
  color: #fff;
  padding: 24rpx;
  font-size: 28rpx;
  text-align: center;
}

:deep(.my-sticky) {
  overflow: hidden;
  border-radius: 16rpx;
}
</style>
