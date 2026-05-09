<template>
  <demo-page>
    <ui-header
      ref="headerRef"
      :background="background"
      :offset="offset"
      :z-index="zIndex"
      :safe-area-inset-top="safe"
      :custom-style="customStyle"
      @rect="onRect"
      @height="onHeight"
    >
      <view v-if="current === 0" class="scene-shop">
        <view class="scene-shop__location">
          <ui-icon name="location" size="28rpx" color="#fff" />
          <text class="scene-shop__city">杭州</text>
          <ui-icon name="down" size="20rpx" color="#fff" />
        </view>
        <view class="scene-shop__search">
          <ui-icon name="search" size="28rpx" color="#999" />
          <text class="scene-shop__placeholder">搜索商品</text>
        </view>
        <view class="scene-shop__actions">
          <ui-icon name="scan" size="40rpx" color="#fff" />
          <ui-icon name="bell" size="40rpx" color="#fff" />
        </view>
      </view>

      <view v-else-if="current === 1" class="scene-filter">
        <view v-for="(item, i) in filterTabs" :key="item.key" class="scene-filter__item" :class="{ active: activeFilter === i }" @click="activeFilter = i">
          <text>{{ item.label }}</text>
          <ui-icon v-if="item.sortable" :name="item.asc ? 'up' : 'down'" size="20rpx" />
        </view>
      </view>

      <view v-else-if="current === 2" class="scene-tabs">
        <scroll-view scroll-x class="scene-tabs__scroll">
          <view class="scene-tabs__inner">
            <view v-for="(tab, i) in categoryTabs" :key="tab" class="scene-tabs__item" :class="{ active: activeTab === i }" @click="activeTab = i">
              <text>{{ tab }}</text>
              <view v-if="activeTab === i" class="scene-tabs__line" />
            </view>
          </view>
        </scroll-view>
      </view>

      <view v-else-if="current === 3" class="scene-player">
        <view class="scene-player__cover" />
        <view class="scene-player__info">
          <text class="scene-player__title">晴天 - 周杰伦</text>
          <text class="scene-player__sub">{{ isPlaying ? "正在播放" : "已暂停" }}</text>
        </view>
        <view class="scene-player__controls">
          <ui-icon name="step-backward" size="36rpx" color="#333" />
          <view class="scene-player__play" @click="isPlaying = !isPlaying">
            <ui-icon :name="isPlaying ? 'pause' : 'caret-right'" size="28rpx" color="#fff" />
          </view>
          <ui-icon name="step-forward" size="36rpx" color="#333" />
        </view>
      </view>

      <view v-else-if="current === 4" class="scene-steps">
        <view v-for="(step, i) in steps" :key="step" class="scene-steps__item">
          <view class="scene-steps__dot" :class="{ active: i <= currentStep, done: i < currentStep }">
            <ui-icon v-if="i < currentStep" name="check" size="20rpx" color="#fff" />
            <text v-else>{{ i + 1 }}</text>
          </view>
          <text class="scene-steps__label" :class="{ active: i <= currentStep }">{{ step }}</text>
          <view v-if="i < steps.length - 1" class="scene-steps__line" :class="{ active: i < currentStep }" />
        </view>
      </view>

      <view v-else class="scene-notice">
        <ui-icon name="sound" size="32rpx" color="#fa8c16" />
        <text class="scene-notice__text">双 11 活动进行中，全场满 300 减 50</text>
        <ui-icon name="close" size="28rpx" color="#999" />
      </view>
    </ui-header>

    <demo-section title="基础用法" desc="顶部固定栏，自动避让 ui-navbar 与顶部安全区，提供占位防遮挡。下滑页面查看效果。" />

    <demo-section title="场景切换" desc="同一个 ui-header 实例，按钮切换 slot 内容">
      <demo-block direction="column" align="start" :gap="12">
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="(s, i) in scenes" :key="s.key" size="small" :type="current === i ? 'primary' : 'default'" @click="current = i">{{ s.label }}</ui-button>
        </demo-block>
        <text class="demo-text">{{ scenes[current].desc }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="背景色 (background)">
      <demo-block :cols="4" :gap="12">
        <ui-button size="small" :type="background === '' ? 'primary' : 'default'" @click="background = ''">默认</ui-button>
        <ui-button size="small" :type="background === '#fff' ? 'primary' : 'default'" @click="background = '#fff'">白</ui-button>
        <ui-button size="small" :type="background === '#1989fa' ? 'primary' : 'default'" @click="background = '#1989fa'">蓝</ui-button>
        <ui-button size="small" :type="background.startsWith('linear') ? 'primary' : 'default'" @click="background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
          渐变
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="顶部偏移 (offset)" desc="数值默认 px，字符串透传单位">
      <demo-block :cols="4" :gap="12">
        <ui-button v-for="o in offsetOptions" :key="String(o)" size="small" :type="offset === o ? 'primary' : 'default'" @click="offset = o">{{ o === 0 ? "0" : o }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="层级 (z-index)">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="z in [50, 100, 999]" :key="z" size="small" :type="zIndex === z ? 'primary' : 'default'" @click="zIndex = z">{{ z }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="安全区域 (safe-area-inset-top)" desc="iOS 全面屏顶部刘海避让">
      <demo-block align="center" :gap="16">
        <ui-switch v-model="safe" />
        <text class="switch-label">{{ safe ? "启用" : "禁用" }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式 (customStyle)" desc="常见用法：底部阴影、底部分割线">
      <demo-block :cols="3" :gap="12">
        <ui-button size="small" :type="customStyle === '' ? 'primary' : 'default'" @click="customStyle = ''">无</ui-button>
        <ui-button size="small" :type="customStyle.includes('shadow') ? 'primary' : 'default'" @click="customStyle = 'box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08)'">
          底部阴影
        </ui-button>
        <ui-button size="small" :type="customStyle.includes('border-bottom') ? 'primary' : 'default'" @click="customStyle = 'border-bottom: 1rpx solid #e5e7eb'">
          底部分割线
        </ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显 (rect / height)" desc="ui-resize 触发，slot 内容变化时高度自动上报">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">height: {{ headerHeight }} px</text>
        <text class="demo-text">rect: {{ rectText }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="实例方法 (resize)" desc="ref 调用，强制重算高度">
      <demo-block :gap="12">
        <ui-button size="small" @click="onResize">手动触发 resize()</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="步骤场景控制" desc="切换到「步骤进度」场景后可前进/后退">
      <demo-block :cols="2" :gap="12">
        <ui-button size="small" :disabled="currentStep === 0" @click="currentStep--">上一步</ui-button>
        <ui-button size="small" type="primary" :disabled="currentStep === 2" @click="currentStep++">下一步</ui-button>
      </demo-block>
    </demo-section>

    <demo-section v-for="i in 6" :key="i" :title="`占位内容 ${i}`" desc="滚动查看 header 始终贴顶" />
  </demo-page>
</template>

<script setup lang="ts">
import type { HeaderInstance } from "@/uni_modules/uniapp-ui/ui-header"
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Header 页头" },
})

const toast = useToast()

const scenes = [
  { key: "shop", label: "电商搜索栏", desc: "定位 + 搜索 + 扫码/消息，电商首页顶部" },
  { key: "filter", label: "筛选排序", desc: "综合 / 销量 / 价格，支持升降序切换" },
  { key: "tabs", label: "分类导航", desc: "横向滚动标签 + 选中态指示器" },
  { key: "player", label: "迷你播放器", desc: "悬浮播放控制条 + 上下首/暂停" },
  { key: "steps", label: "步骤进度", desc: "订单/向导步骤指示，已完成态" },
  { key: "notice", label: "公告通知", desc: "顶部活动公告 + 关闭按钮" },
]

const offsetOptions = [0, "20rpx", "40rpx", "80rpx"] as const

const safe = ref(false)
const current = ref(0)
const zIndex = ref(100)
const offset = ref<number | string>(0)
const background = ref("linear-gradient(135deg, #667eea 0%, #764ba2 100%)")
const customStyle = ref("")

const headerHeight = ref(0)
const rectText = ref("尚未触发")
const headerRef = ref<HeaderInstance>()

const activeFilter = ref(0)
const filterTabs = [
  { key: "default", label: "综合", sortable: false, asc: false },
  { key: "sales", label: "销量", sortable: true, asc: false },
  { key: "price", label: "价格", sortable: true, asc: true },
  { key: "new", label: "新品", sortable: false, asc: false },
]

const activeTab = ref(0)
const categoryTabs = ["推荐", "手机", "电脑", "家电", "服饰", "美妆", "食品"]

const isPlaying = ref(true)
const currentStep = ref(1)
const steps = ["填写信息", "确认订单", "支付完成"]

function onHeight(h: number) {
  headerHeight.value = Math.round(h)
}

function onRect(rect: UniApp.NodeInfo) {
  rectText.value = `top=${Math.round(rect.top ?? 0)}, height=${Math.round(rect.height ?? 0)}`
}

function onResize() {
  headerRef.value?.resize()
  toast.text("已触发 resize()")
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  display: block;
  font-size: 24rpx;
  word-break: break-all;
}

.switch-label {
  color: var(--ui-color-text);
  font-size: 26rpx;
  margin-left: 12rpx;
}

// === 场景：电商搜索栏 ===
.scene-shop {
  gap: 16rpx;
  display: flex;
  padding: 20rpx 24rpx;
  align-items: center;

  &__location {
    gap: 4rpx;
    display: flex;
    align-items: center;
  }

  &__city {
    color: var(--ui-color-text-inverse);
    font-size: 24rpx;
  }

  &__search {
    gap: 8rpx;
    flex: 1;
    height: 56rpx;
    display: flex;
    padding: 0 20rpx;
    background: var(--ui-color-background);
    align-items: center;
    border-radius: 28rpx;
  }

  &__placeholder {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__actions {
    gap: 20rpx;
    display: flex;
  }
}

// === 场景：筛选 ===
.scene-filter {
  display: flex;
  padding: 20rpx 24rpx;
  background: var(--ui-color-background);

  &__item {
    gap: 4rpx;
    flex: 1;
    color: var(--ui-color-text-secondary);
    display: flex;
    font-size: 26rpx;
    align-items: center;
    justify-content: center;

    &.active {
      color: var(--ui-color-primary);
      font-weight: 600;
    }
  }
}

// === 场景：分类标签 ===
.scene-tabs {
  background: var(--ui-color-background);

  &__scroll {
    white-space: nowrap;
  }

  &__inner {
    display: inline-flex;
    padding: 0 16rpx;
  }

  &__item {
    color: var(--ui-color-text-secondary);
    padding: 24rpx 28rpx;
    position: relative;
    font-size: 26rpx;

    &.active {
      color: var(--ui-color-primary);
      font-weight: 600;
    }
  }

  &__line {
    left: 50%;
    width: 32rpx;
    bottom: 12rpx;
    height: 6rpx;
    position: absolute;
    transform: translateX(-50%);
    background: var(--ui-color-primary);
    border-radius: 3rpx;
  }
}

// === 场景：迷你播放器 ===
.scene-player {
  gap: 16rpx;
  display: flex;
  padding: 16rpx 24rpx;
  background: var(--ui-color-background);
  align-items: center;

  &__cover {
    width: 72rpx;
    height: 72rpx;
    background: linear-gradient(135deg, #1989fa, #07c160);
    border-radius: 12rpx;
  }

  &__info {
    flex: 1;
  }

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: 26rpx;
    font-weight: 500;
  }

  &__sub {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }

  &__controls {
    gap: 20rpx;
    display: flex;
    align-items: center;
  }

  &__play {
    width: 56rpx;
    height: 56rpx;
    display: flex;
    background: var(--ui-color-primary);
    align-items: center;
    border-radius: 50%;
    justify-content: center;
  }
}

// === 场景：步骤进度 ===
.scene-steps {
  display: flex;
  padding: 28rpx 24rpx;
  background: var(--ui-color-background);

  &__item {
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
  }

  &__dot {
    color: var(--ui-color-text-secondary);
    width: 40rpx;
    height: 40rpx;
    display: flex;
    z-index: 2;
    font-size: 22rpx;
    background: var(--ui-color-background-disabled);
    align-items: center;
    border-radius: 50%;
    justify-content: center;

    &.active {
      color: var(--ui-color-text-inverse);
      background: var(--ui-color-primary);
    }

    &.done {
      background: var(--ui-color-success);
    }
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
    margin-top: 12rpx;

    &.active {
      color: var(--ui-color-text);
    }
  }

  &__line {
    top: 20rpx;
    left: 50%;
    width: 100%;
    height: 4rpx;
    z-index: 1;
    position: absolute;
    background: var(--ui-color-background-disabled);

    &.active {
      background: var(--ui-color-success);
    }
  }
}

// === 场景：公告通知 ===
.scene-notice {
  gap: 12rpx;
  display: flex;
  padding: 20rpx 24rpx;
  background: #fffbe6;
  align-items: center;

  &__text {
    flex: 1;
    color: #d46b08;
    font-size: 26rpx;
  }
}
</style>
