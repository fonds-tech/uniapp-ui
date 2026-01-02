<template>
  <demo-page>
    <demo-section title="基础用法" desc="向下滚动页面，右下角会出现返回顶部按钮" />

    <demo-section title="自定义位置">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 right 和 bottom 属性设置按钮位置</text>
        <text class="demo-text">当前配置: right="40rpx" bottom="200rpx"</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 background 和 borderRadius 自定义外观</text>
        <demo-block :cols="2" :gap="16">
          <ui-button size="small" @click="styleType = 'default'">默认样式</ui-button>
          <ui-button size="small" @click="styleType = 'primary'">主题色</ui-button>
          <ui-button size="small" @click="styleType = 'gradient'">渐变色</ui-button>
          <ui-button size="small" @click="styleType = 'custom'">自定义</ui-button>
        </demo-block>
        <text class="demo-text">当前样式: {{ styleType }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="显示阈值">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 offset 设置滚动多少距离后显示按钮</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentOffset = '100rpx'">100rpx</ui-button>
          <ui-button size="small" @click="currentOffset = '300rpx'">300rpx</ui-button>
          <ui-button size="small" @click="currentOffset = '500rpx'">500rpx</ui-button>
        </demo-block>
        <text class="demo-text">当前阈值: {{ currentOffset }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="过渡时间">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">通过 duration 设置返回顶部的动画时间（毫秒）</text>
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 100">100ms</ui-button>
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 500">500ms</ui-button>
        </demo-block>
        <text class="demo-text">当前时间: {{ currentDuration }}ms</text>
      </demo-block>
    </demo-section>

    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ clickLog }}</text>
      </demo-block>
    </demo-section>

    <!-- Placeholder Content -->
    <demo-section v-for="i in 20" :key="i" :title="`占位内容 ${i}`" desc="这是一段占位内容，用于演示滚动效果" />

    <!-- 默认样式 -->
    <ui-back-top
      v-if="styleType === 'default'"
      :offset="currentOffset"
      :duration="currentDuration"
      right="40rpx"
      bottom="200rpx"
      @click="onBackTopClick"
    />

    <!-- 主题色样式 -->
    <ui-back-top
      v-if="styleType === 'primary'"
      :offset="currentOffset"
      :duration="currentDuration"
      right="40rpx"
      bottom="200rpx"
      background="#1989fa"
      border-radius="50%"
      @click="onBackTopClick"
    />

    <!-- 渐变色样式 -->
    <ui-back-top
      v-if="styleType === 'gradient'"
      :offset="currentOffset"
      :duration="currentDuration"
      right="40rpx"
      bottom="200rpx"
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      border-radius="16rpx"
      @click="onBackTopClick"
    />

    <!-- 自定义样式 -->
    <ui-back-top
      v-if="styleType === 'custom'"
      :offset="currentOffset"
      :duration="currentDuration"
      right="40rpx"
      bottom="200rpx"
      custom-class="my-back-top"
      :custom-style="{ background: '#07c160', boxShadow: '0 4rpx 16rpx rgba(7, 193, 96, 0.4)' }"
      border-radius="24rpx"
      :z-index="999"
      @click="onBackTopClick"
    />
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "BackTop 返回顶部" },
})

const { showToast } = useToast()

// 样式类型
const styleType = ref<"default" | "primary" | "gradient" | "custom">("default")

// 显示阈值
const currentOffset = ref("200rpx")

// 过渡时间
const currentDuration = ref(200)

// 点击日志
const clickLog = ref("点击返回顶部按钮触发事件")

// 事件处理
function onBackTopClick() {
  clickLog.value = `触发 click 事件，时间: ${new Date().toLocaleTimeString()}`
  showToast({ message: "返回顶部", type: "success" })
}
</script>

<style lang="scss" scoped>
.demo-text {
  font-size: 24rpx;
  color: var(--ui-color-text-secondary);
}

:deep(.my-back-top) {
  color: #fff;
}
</style>
