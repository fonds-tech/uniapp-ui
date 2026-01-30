<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block direction="column">
        <ui-tabs v-model="active1">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

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

    <demo-section title="disabled 禁用">
      <demo-block direction="column">
        <ui-tabs v-model="activeDisabled">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" disabled />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

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

    <demo-section title="scrollable 滚动">
      <demo-block direction="column">
        <ui-tabs v-model="activeScrollable" scrollable>
          <ui-tab v-for="i in 12" :key="i" :title="`标签 ${i}`" />
        </ui-tabs>
      </demo-block>
    </demo-section>

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

    <demo-section title="indicatorColor 指示器颜色">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">indicatorColor="#ee0a24"</text>
        <ui-tabs v-model="activeLineColor" indicator-color="#ee0a24">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="indicatorWidth 指示器宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">indicatorWidth="80rpx"</text>
        <ui-tabs v-model="activeLineWidth" indicator-width="80rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="autoIndicatorWidth 自动宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">autoIndicatorWidth</text>
        <ui-tabs v-model="activeAutoWidth" auto-indicator-width>
          <ui-tab title="短" />
          <ui-tab title="中等长度" />
          <ui-tab title="这是一个很长的标签" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="indicatorHeight 指示器高度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">indicatorHeight="8rpx"</text>
        <ui-tabs v-model="activeLineHeight" indicator-height="8rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="indicatorRadius 指示器圆角">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">indicatorRadius="0"</text>
        <ui-tabs v-model="activeLineRadius" indicator-radius="0" indicator-height="6rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="showIndicator 显示指示器">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">:showIndicator="false"</text>
        <ui-tabs v-model="activeShowLine" :show-indicator="false" active-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="itemWidth 单项宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">itemWidth="200rpx"</text>
        <ui-tabs v-model="activeTabWidth" item-width="200rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="itemMaxWidth 单项最大宽度">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">itemMaxWidth="180rpx"</text>
        <ui-tabs v-model="activeTabMaxWidth" item-max-width="180rpx">
          <ui-tab title="这是一个很长的标签" />
          <ui-tab title="短标签" />
          <ui-tab title="中等长度" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="background 背景颜色">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">background="#f7f8fa"</text>
        <ui-tabs v-model="activeBg1" background="#f7f8fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">background="#e8f4ff"</text>
        <ui-tabs v-model="activeBg2" background="#e8f4ff" active-color="#1989fa" indicator-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

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

    <demo-section title="borderBottom 底部边框">
      <demo-block direction="column">
        <ui-tabs v-model="activeBorder" border-bottom>
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

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

    <demo-section title="tab-click 事件">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">{{ clickTabLog }}</text>
        <ui-tabs v-model="activeClickTab" @tab-click="onClickTab">
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
const activeAutoWidth = ref(0)
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
  clickTabLog.value = `tab-click: ${name}`
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
