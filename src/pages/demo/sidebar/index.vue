<template>
  <demo-page>
    <demo-section title="基础用法">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="active1">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <demo-section title="使用 name 标识符">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">当前选中: {{ activeByName }}</text>
        <view class="sidebar-wrap">
          <ui-sidebar v-model="activeByName">
            <ui-sidebar-item title="首页" name="home" />
            <ui-sidebar-item title="分类" name="category" />
            <ui-sidebar-item title="购物车" name="cart" />
            <ui-sidebar-item title="我的" name="mine" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用选项">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="active3">
          <ui-sidebar-item title="标签一" />
          <ui-sidebar-item title="标签二" disabled />
          <ui-sidebar-item title="标签三" />
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义尺寸 -->
    <demo-section title="自定义尺寸">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeSize1" width="200rpx">
            <ui-sidebar-item title="窄侧栏" height="80rpx" />
            <ui-sidebar-item title="标签二" height="80rpx" />
            <ui-sidebar-item title="标签三" height="80rpx" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeSize2" width="240rpx">
            <ui-sidebar-item title="正常" height="120rpx" />
            <ui-sidebar-item title="标签二" height="120rpx" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：线条样式 -->
    <demo-section title="线条样式">
      <demo-block direction="column" :gap="24">
        <view class="sidebar-row">
          <text class="sidebar-row__label">默认线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="activeLine1">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">自定义颜色:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="activeLine2" line-color="#ee0a24" line-width="6rpx">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">圆角线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="activeLine3" line-color="#07c160" line-height="60rpx" line-radius="16rpx">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
        <view class="sidebar-row">
          <text class="sidebar-row__label">隐藏线条:</text>
          <view class="sidebar-wrap sidebar-wrap--mini">
            <ui-sidebar v-model="activeLine4" :show-line="false">
              <ui-sidebar-item title="标签一" />
              <ui-sidebar-item title="标签二" />
            </ui-sidebar>
          </view>
        </view>
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
        <view class="sidebar-wrap">
          <ui-sidebar v-model="activeDuration" :duration="currentDuration">
            <ui-sidebar-item title="标签一" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
            <ui-sidebar-item title="标签四" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：背景颜色 -->
    <demo-section title="自定义背景">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeBg1" background="#fff">
            <ui-sidebar-item title="白底" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeBg2" background="#e8f4ff">
            <ui-sidebar-item title="浅蓝底" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：标题样式 -->
    <demo-section title="标题样式">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeTitle1">
            <ui-sidebar-item title="自定义颜色" title-color="#666" active-title-color="#1989fa" />
            <ui-sidebar-item title="标签二" title-color="#666" active-title-color="#1989fa" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeTitle2">
            <ui-sidebar-item title="大号粗体" title-size="32rpx" title-weight="600" active-title-size="36rpx" />
            <ui-sidebar-item title="标签二" title-size="32rpx" title-weight="600" active-title-size="36rpx" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：激活背景 -->
    <demo-section title="激活背景">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeActiveBg1" background="#f7f8fa">
            <ui-sidebar-item title="标签一" active-background="#fff" />
            <ui-sidebar-item title="标签二" active-background="#fff" />
            <ui-sidebar-item title="标签三" active-background="#fff" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeActiveBg2" background="#f0f0f0">
            <ui-sidebar-item title="标签一" active-background="#e8f4ff" />
            <ui-sidebar-item title="标签二" active-background="#e8f4ff" />
            <ui-sidebar-item title="标签三" active-background="#e8f4ff" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：文字对齐 -->
    <demo-section title="文字对齐">
      <demo-block :cols="3" :gap="16">
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="activeAlign1" width="180rpx">
            <ui-sidebar-item title="左对齐" title-align="left" />
            <ui-sidebar-item title="标签二" title-align="left" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="activeAlign2" width="180rpx">
            <ui-sidebar-item title="居中" title-align="center" />
            <ui-sidebar-item title="标签二" title-align="center" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--mini">
          <ui-sidebar v-model="activeAlign3" width="180rpx">
            <ui-sidebar-item title="右对齐" title-align="right" />
            <ui-sidebar-item title="标签二" title-align="right" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义插槽 -->
    <demo-section title="自定义内容">
      <demo-block class="sidebar-wrap">
        <ui-sidebar v-model="activeSlot">
          <ui-sidebar-item>
            <template #default="{ active }">
              <view class="custom-item">
                <ui-icon name="home" :color="active ? '#1989fa' : '#666'" />
                <text class="custom-item__text" :class="[{ 'custom-item__text--active': active }]">首页</text>
              </view>
            </template>
          </ui-sidebar-item>
          <ui-sidebar-item>
            <template #default="{ active }">
              <view class="custom-item">
                <ui-icon name="grid" :color="active ? '#1989fa' : '#666'" />
                <text class="custom-item__text" :class="[{ 'custom-item__text--active': active }]">分类</text>
                <view class="custom-item__badge">6</view>
              </view>
            </template>
          </ui-sidebar-item>
          <ui-sidebar-item>
            <template #default="{ active }">
              <view class="custom-item">
                <ui-icon name="cart" :color="active ? '#1989fa' : '#666'" />
                <text class="custom-item__text" :class="[{ 'custom-item__text--active': active }]">购物车</text>
                <view class="custom-item__dot" />
              </view>
            </template>
          </ui-sidebar-item>
          <ui-sidebar-item>
            <template #default="{ active }">
              <view class="custom-item">
                <ui-icon name="user" :color="active ? '#1989fa' : '#666'" />
                <text class="custom-item__text" :class="[{ 'custom-item__text--active': active }]">我的</text>
              </view>
            </template>
          </ui-sidebar-item>
        </ui-sidebar>
      </demo-block>
    </demo-section>

    <!-- 新增：事件处理 -->
    <demo-section title="事件处理">
      <demo-block direction="column" align="start" :gap="16">
        <text class="demo-text">{{ eventLog }}</text>
        <view class="sidebar-wrap">
          <ui-sidebar v-model="activeEvent" @change="onSidebarChange" @click-item="onClickItem">
            <ui-sidebar-item title="标签一" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：自定义样式 -->
    <demo-section title="自定义样式">
      <demo-block :cols="2" :gap="24">
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeCustom1" custom-class="my-sidebar">
            <ui-sidebar-item title="自定义类名" />
            <ui-sidebar-item title="标签二" />
            <ui-sidebar-item title="标签三" />
          </ui-sidebar>
        </view>
        <view class="sidebar-wrap sidebar-wrap--small">
          <ui-sidebar v-model="activeCustom2" :custom-style="{ borderRadius: '16rpx', overflow: 'hidden' }">
            <ui-sidebar-item title="圆角样式" custom-class="my-sidebar-item" />
            <ui-sidebar-item title="标签二" custom-class="my-sidebar-item" />
            <ui-sidebar-item title="标签三" custom-class="my-sidebar-item" />
          </ui-sidebar>
        </view>
      </demo-block>
    </demo-section>

    <!-- 新增：综合示例 -->
    <demo-section title="综合示例">
      <demo-block class="sidebar-wrap sidebar-wrap--large">
        <ui-sidebar v-model="activeComplex" width="220rpx" background="#f7f8fa" line-color="#1989fa" line-width="8rpx" line-radius="4rpx" :duration="200">
          <ui-sidebar-item
            v-for="item in categories"
            :key="item.name"
            :name="item.name"
            :title="item.title"
            :disabled="item.disabled"
            active-background="#fff"
            active-title-color="#1989fa"
            active-title-weight="600"
          />
        </ui-sidebar>
        <view class="sidebar-content">
          <text class="sidebar-content__title">{{ currentCategory?.title }}</text>
          <text class="sidebar-content__desc">当前分类: {{ activeComplex }}</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Sidebar 侧边栏" },
})

const toast = useToast()

// 基础示例
const active1 = ref(0)
const activeByName = ref("home")
const active3 = ref(0)

// 自定义尺寸
const activeSize1 = ref(0)
const activeSize2 = ref(0)

// 线条样式
const activeLine1 = ref(0)
const activeLine2 = ref(0)
const activeLine3 = ref(0)
const activeLine4 = ref(0)

// 动画时长
const activeDuration = ref(0)
const currentDuration = ref(300)

// 背景颜色
const activeBg1 = ref(0)
const activeBg2 = ref(0)

// 标题样式
const activeTitle1 = ref(0)
const activeTitle2 = ref(0)

// 激活背景
const activeActiveBg1 = ref(0)
const activeActiveBg2 = ref(0)

// 文字对齐
const activeAlign1 = ref(0)
const activeAlign2 = ref(0)
const activeAlign3 = ref(0)

// 自定义插槽
const activeSlot = ref(0)

// 事件处理
const activeEvent = ref(0)
const eventLog = ref("点击侧边栏触发事件")

// 自定义样式
const activeCustom1 = ref(0)
const activeCustom2 = ref(0)

// 综合示例
const activeComplex = ref("fruits")
const categories = ref<Array<{ name: string; title: string; disabled?: boolean }>>([
  { name: "fruits", title: "水果" },
  { name: "vegetables", title: "蔬菜" },
  { name: "meat", title: "肉禽蛋" },
  { name: "seafood", title: "海鲜水产" },
  { name: "snacks", title: "休闲零食", disabled: true },
  { name: "drinks", title: "酒水饮料" },
  { name: "dairy", title: "乳品烘焙" },
])

const currentCategory = computed(() => categories.value.find((c) => c.name === activeComplex.value))

// 事件处理
function onSidebarChange(name: number | string) {
  eventLog.value = `触发 change 事件，切换到: ${name}`
  toast.success(`切换到第 ${Number(name) + 1} 项`)
}

function onClickItem(name: number | string, index: number) {
  eventLog.value = `触发 click-item 事件，name: ${name}, index: ${index}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.sidebar-wrap {
  height: 300rpx;
  overflow: hidden;
  border-radius: 12rpx;

  &--small {
    height: 240rpx;
  }

  &--mini {
    height: 200rpx;
  }

  &--large {
    height: 400rpx;
    display: flex;
  }
}

.sidebar-row {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-main);
    width: 160rpx;
    font-size: 28rpx;
  }
}

.custom-item {
  gap: 8rpx;
  display: flex;
  padding: 16rpx;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__text {
    color: #666;
    font-size: 24rpx;

    &--active {
      color: #1989fa;
      font-weight: 600;
    }
  }

  &__badge {
    top: 8rpx;
    color: #fff;
    right: 24rpx;
    height: 32rpx;
    display: flex;
    padding: 0 8rpx;
    position: absolute;
    font-size: 20rpx;
    min-width: 32rpx;
    background: #ee0a24;
    align-items: center;
    border-radius: 32rpx;
    justify-content: center;
  }

  &__dot {
    top: 12rpx;
    right: 32rpx;
    width: 16rpx;
    height: 16rpx;
    position: absolute;
    background: #ee0a24;
    border-radius: 50%;
  }
}

.sidebar-content {
  gap: 16rpx;
  flex: 1;
  display: flex;
  background: #fff;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &__title {
    color: var(--ui-color-text-main);
    font-size: 36rpx;
    font-weight: 600;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

:deep(.my-sidebar) {
  background: linear-gradient(180deg, #e8f4ff 0%, #f7f8fa 100%);
}

:deep(.my-sidebar-item) {
  font-size: 26rpx;
}
</style>
