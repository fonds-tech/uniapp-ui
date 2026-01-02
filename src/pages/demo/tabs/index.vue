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

    <demo-section title="通过名称匹配">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前选中: {{ active2 }}</text>
        <ui-tabs v-model="active2">
          <ui-tab title="标签一" name="a" />
          <ui-tab title="标签二" name="b" />
          <ui-tab title="标签三" name="c" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="禁用标签">
      <demo-block direction="column">
        <ui-tabs v-model="active3">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" disabled />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="滑动标签">
      <demo-block direction="column">
        <ui-tabs v-model="active4" scrollable>
          <ui-tab v-for="i in 8" :key="i" :title="`标签 ${i}`" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义高度 -->
    <demo-section title="自定义高度">
      <demo-block direction="column" :gap="24">
        <ui-tabs v-model="activeHeight1" height="80rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <ui-tabs v-model="activeHeight2" height="120rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：标签宽度 -->
    <demo-section title="标签宽度">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">固定宽度:</text>
        <ui-tabs v-model="activeWidth1" :tab-width="200">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
        </ui-tabs>
        <text class="demo-text">最大宽度:</text>
        <ui-tabs v-model="activeWidth2" :tab-max-width="150">
          <ui-tab title="这是一个很长的标签标题" />
          <ui-tab title="短标签" />
          <ui-tab title="中等长度标签" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色">
      <demo-block direction="column" :gap="24">
        <ui-tabs v-model="active5" active-color="#07c160" inactive-color="#999">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <ui-tabs v-model="active5b" active-color="#ee0a24" inactive-color="#666">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：文字样式 -->
    <demo-section title="文字样式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">激活样式（大号粗体）:</text>
        <ui-tabs
          v-model="activeTextStyle1"
          active-size="32rpx"
          active-weight="600"
          inactive-size="26rpx"
        >
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">自定义粗细:</text>
        <ui-tabs
          v-model="activeTextStyle2"
          active-weight="700"
          inactive-weight="300"
        >
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：线条样式 -->
    <demo-section title="线条样式">
      <demo-block direction="column" :gap="24">
        <text class="demo-text">自定义颜色和宽度:</text>
        <ui-tabs v-model="activeLine1" line-color="#ee0a24" line-width="60rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">自定义高度和圆角:</text>
        <ui-tabs v-model="activeLine2" line-color="#07c160" line-height="8rpx" line-radius="4rpx">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <text class="demo-text">隐藏线条:</text>
        <ui-tabs v-model="activeLine3" :show-line="false" active-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：动画时长 -->
    <demo-section title="动画时长">
      <demo-block direction="column" align="start" :gap="16">
        <demo-block :cols="3" :gap="16">
          <ui-button size="small" @click="currentDuration = 0">无动画</ui-button>
          <ui-button size="small" @click="currentDuration = 300">300ms</ui-button>
          <ui-button size="small" @click="currentDuration = 600">600ms</ui-button>
        </demo-block>
        <text class="demo-text">当前动画时长: {{ currentDuration }}ms</text>
        <ui-tabs v-model="activeDuration" :duration="currentDuration">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
          <ui-tab title="标签四" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：背景颜色 -->
    <demo-section title="背景颜色">
      <demo-block direction="column" :gap="24">
        <ui-tabs v-model="activeBg1" background="#f7f8fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <ui-tabs v-model="activeBg2" background="#e8f4ff" active-color="#1989fa">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="底部边框">
      <demo-block direction="column">
        <ui-tabs v-model="active6" border-bottom>
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-tabs v-model="activeEvent" @change="onTabChange" @click-tab="onClickTab">
          <ui-tab title="标签一" @click="onTabClick(0)" />
          <ui-tab title="标签二" @click="onTabClick(1)" />
          <ui-tab title="标签三" @click="onTabClick(2)" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block direction="column" :gap="24">
        <ui-tabs
          v-model="activeCustom1"
          custom-class="my-tabs"
          :custom-style="{ padding: '16rpx', borderRadius: '16rpx', background: '#f7f8fa' }"
        >
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <ui-tabs v-model="activeCustom2">
          <ui-tab title="自定义1" custom-class="my-tab" />
          <ui-tab title="自定义2" custom-class="my-tab" />
          <ui-tab title="自定义3" custom-class="my-tab" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block direction="column" :gap="16">
        <ui-tabs
          v-model="activeComplex"
          height="100rpx"
          background="#fff"
          active-color="#1989fa"
          active-size="30rpx"
          active-weight="600"
          inactive-color="#646566"
          inactive-size="26rpx"
          line-color="#1989fa"
          line-width="48rpx"
          line-height="6rpx"
          line-radius="3rpx"
          :duration="200"
          border-bottom
          custom-class="complex-tabs"
        >
          <ui-tab title="首页" name="home" />
          <ui-tab title="分类" name="category" />
          <ui-tab title="购物车" name="cart" />
          <ui-tab title="我的" name="mine" />
        </ui-tabs>
        <view class="tab-content">
          <text class="tab-content__text">当前页面: {{ activeComplex }}</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：卡片风格 -->
    <demo-section title="卡片风格">
      <demo-block direction="column">
        <view class="card-tabs-wrap">
          <ui-tabs
            v-model="activeCard"
            :show-line="false"
            background="transparent"
            active-color="#fff"
            inactive-color="#1989fa"
          >
            <ui-tab
              title="全部"
              :custom-style="activeCard === 0 ? activeTabStyle : inactiveTabStyle"
            />
            <ui-tab
              title="待付款"
              :custom-style="activeCard === 1 ? activeTabStyle : inactiveTabStyle"
            />
            <ui-tab
              title="待发货"
              :custom-style="activeCard === 2 ? activeTabStyle : inactiveTabStyle"
            />
            <ui-tab
              title="已完成"
              :custom-style="activeCard === 3 ? activeTabStyle : inactiveTabStyle"
            />
          </ui-tabs>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/ui"
import { DemoPage, DemoBlock, DemoSection } from "../components"

definePage({
  style: { navigationBarTitleText: "Tabs 标签页" },
})

const { showToast } = useToast()

// 基础示例
const active1 = ref(0)
const active2 = ref("a")
const active3 = ref(0)
const active4 = ref(0)
const active5 = ref(0)
const active5b = ref(0)
const active6 = ref(0)

// 自定义高度
const activeHeight1 = ref(0)
const activeHeight2 = ref(0)

// 标签宽度
const activeWidth1 = ref(0)
const activeWidth2 = ref(0)

// 文字样式
const activeTextStyle1 = ref(0)
const activeTextStyle2 = ref(0)

// 线条样式
const activeLine1 = ref(0)
const activeLine2 = ref(0)
const activeLine3 = ref(0)

// 动画时长
const activeDuration = ref(0)
const currentDuration = ref(300)

// 背景颜色
const activeBg1 = ref(0)
const activeBg2 = ref(0)

// 事件处理
const activeEvent = ref(0)
const eventLog = ref("点击标签触发事件")

// 自定义样式
const activeCustom1 = ref(0)
const activeCustom2 = ref(0)

// 综合示例
const activeComplex = ref("home")

// 卡片风格
const activeCard = ref(0)
const activeTabStyle = {
  background: "#1989fa",
  borderRadius: "8rpx",
  padding: "12rpx 24rpx",
}
const inactiveTabStyle = {
  background: "#e8f4ff",
  borderRadius: "8rpx",
  padding: "12rpx 24rpx",
}

// 事件处理
function onTabChange(name: string | number) {
  eventLog.value = `触发 change 事件，切换到: ${name}`
  showToast({ message: `切换到第 ${Number(name) + 1} 项`, type: "success" })
}

function onClickTab(name: string | number) {
  eventLog.value = `触发 click-tab 事件，点击: ${name}`
}

function onTabClick(index: number) {
  eventLog.value = `触发 tab 的 click 事件，索引: ${index}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  font-size: 24rpx;
  color: var(--ui-color-text-secondary);
}

.tab-content {
  padding: 32rpx;
  background: #f7f8fa;
  border-radius: 12rpx;
  text-align: center;

  &__text {
    font-size: 28rpx;
    color: var(--ui-color-text-main);
  }
}

.card-tabs-wrap {
  padding: 16rpx;
  background: #fff;
  border-radius: 12rpx;
}

:deep(.my-tabs) {
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

:deep(.my-tab) {
  font-style: italic;
}

:deep(.complex-tabs) {
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}
</style>
