<template>
  <demo-page>
    <demo-section title="基础用法" desc="均分宽度、底部指示器">
      <ui-tabs v-model="basic">
        <ui-tab title="推荐" />
        <ui-tab title="发现" />
        <ui-tab title="关注" />
      </ui-tabs>
    </demo-section>

    <demo-section title="name 标识符" desc="v-model 绑定 name 字段">
      <demo-block direction="column" :gap="12">
        <text class="demo-text">当前: {{ activeName }}</text>
        <ui-tabs v-model="activeName">
          <ui-tab title="首页" name="home" />
          <ui-tab title="发现" name="discover" />
          <ui-tab title="我的" name="mine" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="禁用 disabled" desc="单独禁用某项">
      <ui-tabs v-model="disabled">
        <ui-tab title="标签一" />
        <ui-tab title="标签二" disabled />
        <ui-tab title="标签三" />
      </ui-tabs>
    </demo-section>

    <demo-section title="横向滚动 scrollable" desc="标签多时启用">
      <ui-tabs v-model="scrollable" scrollable>
        <ui-tab v-for="i in 12" :key="i" :title="`标签 ${i}`" />
      </ui-tabs>
    </demo-section>

    <demo-section title="高度 height" desc="切换不同高度">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="heightActive" :height="heightDemo">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="h in heightPresets" :key="h" size="small" :type="heightDemo === h ? 'primary' : 'default'" @click="heightDemo = h">
            {{ h }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="文字样式" desc="active / inactive 颜色 / 字号 / 粗细 切换">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="textActive" :active-color="textCfg.color" :active-size="textCfg.size" :active-weight="textCfg.weight" inactive-color="text-secondary" :inactive-size="textCfg.size">
          <ui-tab title="标签一" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in textColors" :key="c.value" size="small" :type="textCfg.color === c.value ? 'primary' : 'default'" @click="textCfg.color = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="s in textSizes" :key="s" size="small" :type="textCfg.size === s ? 'primary' : 'default'" @click="textCfg.size = s">
            {{ s }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="指示器" desc="颜色 / 宽度 / 高度 / 圆角 / autoIndicatorWidth / 隐藏">
      <demo-block direction="column" :gap="16">
        <ui-tabs
          v-model="indicatorActive"
          :indicator-color="indicator.color"
          :indicator-width="indicator.width"
          :indicator-height="indicator.height"
          :indicator-radius="indicator.radius"
          :show-indicator="indicator.show"
          :auto-indicator-width="indicator.auto"
        >
          <ui-tab title="短" />
          <ui-tab title="中等长度" />
          <ui-tab title="这是较长的标签" />
        </ui-tabs>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in textColors" :key="c.value" size="small" :type="indicator.color === c.value ? 'primary' : 'default'" @click="indicator.color = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="indicator.auto ? 'primary' : 'default'" @click="indicator.auto = !indicator.auto">{{ indicator.auto ? "自动宽度" : "固定宽度" }}</ui-button>
          <ui-button size="small" :type="!indicator.show ? 'primary' : 'default'" @click="indicator.show = !indicator.show">{{ indicator.show ? "显示" : "隐藏" }}</ui-button>
          <ui-button size="small" :type="indicator.radius === '0' ? 'primary' : 'default'" @click="indicator.radius = indicator.radius === '0' ? undefined : '0'">{{ indicator.radius === "0" ? "方角" : "圆角" }}</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="单项宽度" desc="itemWidth 固定 / itemMaxWidth 最大">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="widthActive" :item-width="widthMode === 'fixed' ? '200rpx' : undefined" :item-max-width="widthMode === 'max' ? '180rpx' : undefined" scrollable>
          <ui-tab title="短" />
          <ui-tab title="中等长度" />
          <ui-tab title="这是一个很长的标签文字" />
        </ui-tabs>
        <demo-block :cols="3" :gap="12">
          <ui-button size="small" :type="widthMode === 'auto' ? 'primary' : 'default'" @click="widthMode = 'auto'">自动</ui-button>
          <ui-button size="small" :type="widthMode === 'fixed' ? 'primary' : 'default'" @click="widthMode = 'fixed'">固定 200</ui-button>
          <ui-button size="small" :type="widthMode === 'max' ? 'primary' : 'default'" @click="widthMode = 'max'">最大 180</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="背景 / 底部边框" desc="background + border-bottom">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="bgActive1" background="background-section">
          <ui-tab title="次级背景" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
        <ui-tabs v-model="bgActive2" border-bottom>
          <ui-tab title="底部分隔线" />
          <ui-tab title="标签二" />
          <ui-tab title="标签三" />
        </ui-tabs>
      </demo-block>
    </demo-section>

    <demo-section title="动画时长 duration" desc="切换不同动画时长">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="durationActive" :duration="durationDemo">
          <ui-tab v-for="i in 4" :key="i" :title="`标签 ${i}`" />
        </ui-tabs>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="d in durationPresets" :key="d" size="small" :type="durationDemo === d ? 'primary' : 'default'" @click="durationDemo = d">{{ d }}ms</ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义内容 slot" desc="default slot 替代标题">
      <ui-tabs v-model="slotActive">
        <ui-tab v-for="item in slotTabs" :key="item.name" :name="item.name">
          <template #default="{ active }">
            <view class="tab-slot">
              <ui-icon :name="item.icon" :color="active ? 'primary' : 'text-secondary'" size="32rpx" />
              <text :class="{ 'tab-slot__text--active': active }">{{ item.label }}</text>
            </view>
          </template>
        </ui-tab>
      </ui-tabs>
    </demo-section>

    <demo-section title="事件回显" desc="change / tab-click / Tab click 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-tabs v-model="eventActive" @change="onChange" @tab-click="onTabClick">
          <ui-tab title="标签一" @click="onItemClick(0)" />
          <ui-tab title="标签二" @click="onItemClick(1)" />
          <ui-tab title="标签三" @click="onItemClick(2)" />
        </ui-tabs>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 内容切换" desc="tabs 联动内容面板">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="contentActive">
          <ui-tab v-for="cat in categories" :key="cat.key" :title="cat.label" :name="cat.key" />
        </ui-tabs>
        <view class="panel">
          <text class="panel__title">{{ currentCategory?.label }}</text>
          <text class="panel__desc">{{ currentCategory?.desc }}</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商城分类" desc="可滚动多分类 + autoIndicatorWidth">
      <demo-block direction="column" :gap="16">
        <ui-tabs v-model="shopActive" scrollable auto-indicator-width active-color="danger" indicator-color="danger" border-bottom>
          <ui-tab v-for="t in shopCategories" :key="t.key" :title="t.label" :name="t.key" />
        </ui-tabs>
        <view class="panel">
          <text class="panel__title">{{ shopActive }}</text>
          <text class="panel__desc">已加载该分类商品</text>
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Tabs 标签页" },
})

const basic = ref(0)
const activeName = ref("home")
const disabled = ref(0)
const scrollable = ref(0)

const heightPresets = ["70rpx", "88rpx", "120rpx"]
const heightDemo = ref("88rpx")
const heightActive = ref(0)

const textColors = [
  { label: "primary", value: "primary" },
  { label: "success", value: "success" },
  { label: "warning", value: "warning" },
  { label: "danger", value: "danger" },
]
const textSizes = ["28rpx", "32rpx", "36rpx"]
const textCfg = reactive({ color: "primary", size: "32rpx", weight: "600" })
const textActive = ref(0)

const indicator = reactive<{ color: string; width: string; height: string; radius: string | undefined; show: boolean; auto: boolean }>({
  color: "primary",
  width: "40rpx",
  height: "6rpx",
  radius: undefined,
  show: true,
  auto: false,
})
const indicatorActive = ref(0)

const widthMode = ref<"auto" | "fixed" | "max">("auto")
const widthActive = ref(0)

const bgActive1 = ref(0)
const bgActive2 = ref(0)

const durationPresets = [0, 200, 400, 800]
const durationDemo = ref(300)
const durationActive = ref(0)

const slotTabs = [
  { name: "home", label: "首页", icon: "home-o" },
  { name: "shop", label: "商城", icon: "shop-o" },
  { name: "user", label: "我的", icon: "user-o" },
]
const slotActive = ref("home")

const eventActive = ref(0)
const eventLog = ref("等待事件...")
function onChange(name: string | number) {
  eventLog.value = `[change] name=${name}`
}
function onTabClick(name: string | number) {
  eventLog.value = `[tab-click] name=${name}`
}
function onItemClick(idx: number) {
  eventLog.value = `[Tab click] index=${idx}`
}

// 综合：内容切换
const categories = [
  { key: "all", label: "全部", desc: "全部商品" },
  { key: "phone", label: "手机", desc: "手机分类商品" },
  { key: "computer", label: "电脑", desc: "电脑分类商品" },
  { key: "audio", label: "音频", desc: "音频设备" },
]
const contentActive = ref("all")
const currentCategory = computed(() => categories.find((c) => c.key === contentActive.value))

// 综合：商城分类
const shopCategories = [
  { key: "all", label: "推荐" },
  { key: "phone", label: "手机数码" },
  { key: "computer", label: "电脑办公" },
  { key: "fashion", label: "服饰鞋包" },
  { key: "food", label: "美食生鲜" },
  { key: "home", label: "家居家装" },
  { key: "beauty", label: "美妆个护" },
  { key: "sport", label: "运动户外" },
]
const shopActive = ref("all")
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: var(--ui-font-size-xs);
}

.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.tab-slot {
  gap: var(--ui-spacing-xxs);
  color: var(--ui-color-text-secondary);
  display: flex;
  font-size: var(--ui-font-size-sm);
  align-items: center;
  flex-direction: column;

  &__text--active {
    color: var(--ui-color-primary);
    font-weight: var(--ui-font-weight-bold);
  }
}

.panel {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);
  flex-direction: column;

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
