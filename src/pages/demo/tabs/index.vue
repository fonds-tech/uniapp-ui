<template>
  <demo-page>
    <!-- 基础用法 -->
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-tabs v-model="active1">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- Tab: name -->
    <demo-section title="name 标识符">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">当前选中: {{ activeName }}</text>
        <ui-tabs v-model="activeName">
          <ui-tab title="标签一" name="a" />
          <ui-tab title="标签二" name="b" />
          <ui-tab title="标签三" name="c" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- Tab: disabled -->
    <demo-section title="disabled 禁用">
      <demo-block direction="column">
        <ui-tabs v-model="activeDisabled">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" disabled />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- height -->
    <demo-section title="height 高度">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">height="70rpx"</text>
        <ui-tabs v-model="activeHeight1" height="70rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">height="120rpx"</text>
        <ui-tabs v-model="activeHeight2" height="120rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- scrollable -->
    <demo-section title="scrollable 滚动">
      <demo-block direction="column">
        <ui-tabs v-model="activeScrollable" scrollable>
          <ui-tab v-for="i in 12" :key="i" :title="`标签 ${i}`" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- activeSize / inactiveSize -->
    <demo-section title="activeSize / inactiveSize 文字大小">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">activeSize="34rpx" inactiveSize="26rpx"</text>
        <ui-tabs v-model="activeSize1" active-size="34rpx" inactive-size="26rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- activeColor / inactiveColor -->
    <demo-section title="activeColor / inactiveColor 文字颜色">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">activeColor="#07c160" inactiveColor="#999"</text>
        <ui-tabs v-model="activeColor1" active-color="#07c160" inactive-color="#999">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- activeWeight / inactiveWeight -->
    <demo-section title="activeWeight / inactiveWeight 文字粗细">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">activeWeight="700" inactiveWeight="400"</text>
        <ui-tabs v-model="activeWeight1" active-weight="700" inactive-weight="400">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- lineColor -->
    <demo-section title="lineColor 线条颜色">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">lineColor="#ee0a24"</text>
        <ui-tabs v-model="activeLineColor" line-color="#ee0a24">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- lineWidth -->
    <demo-section title="lineWidth 线条宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">lineWidth="80rpx"</text>
        <ui-tabs v-model="activeLineWidth" line-width="80rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- lineHeight -->
    <demo-section title="lineHeight 线条高度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">lineHeight="8rpx"</text>
        <ui-tabs v-model="activeLineHeight" line-height="8rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- lineRadius -->
    <demo-section title="lineRadius 线条圆角">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">lineRadius="0"</text>
        <ui-tabs v-model="activeLineRadius" line-radius="0" line-height="6rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- showLine -->
    <demo-section title="showLine 显示线条">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">:showLine="false"</text>
        <ui-tabs v-model="activeShowLine" :show-line="false" active-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- tabWidth -->
    <demo-section title="tabWidth 标签宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">tabWidth="200rpx"</text>
        <ui-tabs v-model="activeTabWidth" tab-width="200rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- tabMaxWidth -->
    <demo-section title="tabMaxWidth 标签最大宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">tabMaxWidth="180rpx"</text>
        <ui-tabs v-model="activeTabMaxWidth" tab-max-width="180rpx">
          <ui-tab title="这是一个很长的标签" />
          <ui-tab title="短标签" />
          <ui-tab title="中等长度" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- background -->
    <demo-section title="background 背景颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">background="#f7f8fa"</text>
        <ui-tabs v-model="activeBg1" background="#f7f8fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">background="#e8f4ff"</text>
        <ui-tabs v-model="activeBg2" background="#e8f4ff" active-color="#1989fa" line-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- duration -->
    <demo-section title="duration 动画时长">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block :gap="16">
          <ui-button size="small" @click="currentDuration = 0">0ms</ui-button>
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 800">800ms</ui-button>
        </demo-block>
        <text class="demo-text">duration="{{ currentDuration }}"</text>
        <ui-tabs v-model="activeDuration" :duration="currentDuration">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
          <ui-tab title="标签四" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- borderBottom -->
    <demo-section title="borderBottom 底部边框">
      <demo-block direction="column">
        <ui-tabs v-model="activeBorder" border-bottom>
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- zIndex -->
    <demo-section title="zIndex 层级">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">zIndex="100"</text>
        <ui-tabs v-model="activeZIndex" :z-index="100">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- Events -->
    <demo-section title="change 事件">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">{{ changeLog }}</text>
        <ui-tabs v-model="activeChange" @change="onTabChange">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="clickTab 事件">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">{{ clickTabLog }}</text>
        <ui-tabs v-model="activeClickTab" @click-tab="onClickTab">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="Tab click 事件">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">{{ tabClickLog }}</text>
        <ui-tabs v-model="activeTabClick">
          <ui-tab title="标签一" @click="onTabClick(0)" />
          <ui-tab title="标签二" @click="onTabClick(1)" />
          <ui-tab title="标签三" @click="onTabClick(2)" />
        </ui-tabs>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Tabs 标签页" },
})

const toast = useToast()

// 基础用法
const active1 = ref(0)

// Tab Props
const activeName = ref("a")
const activeDisabled = ref(0)

// 尺寸
const activeHeight1 = ref(0)
const activeHeight2 = ref(0)
const activeTabWidth = ref(0)
const activeTabMaxWidth = ref(0)

// 滚动
const activeScrollable = ref(0)

// 文字样式
const activeColor1 = ref(0)
const activeSize1 = ref(0)
const activeWeight1 = ref(0)

// 线条样式
const activeLineColor = ref(0)
const activeLineWidth = ref(0)
const activeLineHeight = ref(0)
const activeLineRadius = ref(0)
const activeShowLine = ref(0)

// 外观
const activeBg1 = ref(0)
const activeBg2 = ref(0)
const activeBorder = ref(0)
const activeZIndex = ref(0)

// 动画
const activeDuration = ref(0)
const currentDuration = ref(300)

// 事件
const activeChange = ref(0)
const activeClickTab = ref(0)
const activeTabClick = ref(0)
const changeLog = ref("切换标签触发")
const clickTabLog = ref("点击标签触发")
const tabClickLog = ref("点击 Tab 组件触发")

function onTabChange(name: string | number) {
  changeLog.value = `change: ${name}`
  toast.success(`切换到 ${name}`)
}

function onClickTab(name: string | number) {
  clickTabLog.value = `clickTab: ${name}`
}

function onTabClick(index: number) {
  tabClickLog.value = `Tab click: ${index}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}
</style>
