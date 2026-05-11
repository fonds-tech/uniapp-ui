<template>
  <demo-page>
    <demo-section title="基础用法" desc="通过 v-model:show 控制显隐">
      <demo-block>
        <ui-button type="primary" @click="state.basic = true">打开弹窗</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="弹出位置" desc="mode 5 个方向">
      <demo-block :cols="3" :gap="16">
        <ui-button v-for="m in modes" :key="m" size="small" @click="openMode(m)">{{ modeLabel(m) }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="关闭按钮" desc="closeable + closeIconPosition 控制位置">
      <demo-block :cols="2" :gap="16">
        <ui-button size="small" @click="openClose('top-right')">右上</ui-button>
        <ui-button size="small" @click="openClose('top-left')">左上</ui-button>
        <ui-button size="small" @click="openClose('bottom-right')">右下</ui-button>
        <ui-button size="small" @click="openClose('bottom-left')">左下</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义尺寸" desc="width / height / maxHeight">
      <demo-block :cols="2" :gap="16">
        <ui-button size="small" @click="state.fixedSize = true">固定尺寸</ui-button>
        <ui-button size="small" @click="state.maxSize = true">最大高度限制</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="动画时长" desc="duration 控制速度">
      <demo-block :cols="3" :gap="16">
        <ui-button v-for="d in durations" :key="d" size="small" @click="openDuration(d)">{{ d }}ms</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="遮罩配置" desc="overlay / overlayStyle / closeOnClickOverlay">
      <demo-block :cols="3" :gap="16">
        <ui-button size="small" @click="state.noOverlay = true">无遮罩</ui-button>
        <ui-button size="small" @click="state.tintedOverlay = true">蓝色遮罩</ui-button>
        <ui-button size="small" @click="state.lockedOverlay = true">禁点遮罩关</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="背景色" desc="background 接受颜色 / 渐变">
      <demo-block :cols="2" :gap="16">
        <ui-button size="small" @click="state.bgSolid = true">纯色背景</ui-button>
        <ui-button size="small" @click="state.bgGradient = true">渐变背景</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="安全区" desc="safeAreaInsetTop / safeAreaInsetBottom">
      <demo-block :cols="2" :gap="16">
        <ui-button size="small" @click="state.safeTop = true">顶部安全区</ui-button>
        <ui-button size="small" @click="state.safeBottom = true">底部安全区</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="自定义样式" desc="customClass + customStyle">
      <demo-block>
        <ui-button @click="state.custom = true">自定义外观</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="header / footer / outside slots">
      <demo-block>
        <ui-button @click="state.slots = true">复合插槽</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:筛选面板" desc="bottom 模式 + header + footer 操作区">
      <demo-block>
        <ui-button type="primary" @click="state.filter = true">打开筛选</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:购物车结算" desc="bottom 模式 + 列表 + 合计">
      <demo-block>
        <ui-button type="primary" @click="state.cart = true">查看购物车</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:商品详情" desc="center 模式 + 图片预览">
      <demo-block>
        <ui-button type="primary" @click="state.detail = true">查看详情</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="open / opened / close / closed / click / clickClose / clickOverlay">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-button size="small" @click="state.event = true">触发事件</ui-button>
      </demo-block>
    </demo-section>

    <!-- 单实例：基础 + 弹出位置 + 关闭按钮 共用一个，靠 currentMode/currentClosePos 切换 -->
    <ui-popup v-model:show="state.basic" mode="center">
      <view class="popup-card">
        <text class="popup-card__title">基础弹窗</text>
        <text class="popup-card__body">点击遮罩或下面按钮关闭</text>
        <ui-button size="small" type="primary" @click="state.basic = false">关闭</ui-button>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.modeOpen" :mode="currentMode">
      <view class="popup-card" :class="`popup-card--${currentMode}`">
        <text class="popup-card__title">{{ modeLabel(currentMode) }}</text>
        <text class="popup-card__body">mode = {{ currentMode }}</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.closeOpen" mode="center" closeable :close-icon-position="currentClosePos">
      <view class="popup-card">
        <text class="popup-card__title">关闭按钮位置: {{ currentClosePos }}</text>
        <text class="popup-card__body">点击关闭图标关闭弹窗</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.fixedSize" mode="center" width="600rpx" height="400rpx">
      <view class="popup-card">
        <text class="popup-card__title">固定尺寸</text>
        <text class="popup-card__body">600rpx × 400rpx</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.maxSize" mode="bottom" max-height="50vh">
      <view class="popup-card">
        <text class="popup-card__title">最大高度 50vh</text>
        <view v-for="i in 30" :key="i" class="popup-card__row">列表项 {{ i }}</view>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.durationOpen" mode="center" :duration="currentDuration">
      <view class="popup-card">
        <text class="popup-card__title">动画 {{ currentDuration }}ms</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.noOverlay" mode="bottom" :overlay="false" closeable>
      <view class="popup-card">
        <text class="popup-card__title">无遮罩</text>
        <text class="popup-card__body">背景透明，无任何遮挡</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.tintedOverlay" mode="center" :overlay-style="{ background: 'rgba(64,158,255,0.3)' }">
      <view class="popup-card">
        <text class="popup-card__title">蓝色遮罩</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.lockedOverlay" mode="center" :close-on-click-overlay="false" closeable>
      <view class="popup-card">
        <text class="popup-card__title">禁点遮罩关</text>
        <text class="popup-card__body">必须点关闭按钮才能关闭</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.bgSolid" mode="center" background="#e8f4ff">
      <view class="popup-card popup-card--transparent">
        <text class="popup-card__title">纯色背景</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.bgGradient" mode="center" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <view class="popup-card popup-card--transparent popup-card--inverse">
        <text class="popup-card__title">渐变背景</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.safeTop" mode="top" safe-area-inset-top closeable>
      <view class="popup-card">
        <text class="popup-card__title">顶部安全区</text>
        <text class="popup-card__body">为状态栏让出空间</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.safeBottom" mode="bottom" :safe-area-inset-bottom="true" closeable>
      <view class="popup-card">
        <text class="popup-card__title">底部安全区</text>
        <text class="popup-card__body">为底部小条让出空间</text>
      </view>
    </ui-popup>

    <ui-popup
      v-model:show="state.custom"
      mode="center"
      :custom-style="{ border: '4rpx solid var(--ui-color-primary)', boxShadow: '0 8rpx 32rpx rgba(0,0,0,0.2)' }"
      :border-radius="32"
    >
      <view class="popup-card">
        <text class="popup-card__title">自定义样式</text>
        <text class="popup-card__body">边框 + 阴影 + 大圆角</text>
      </view>
    </ui-popup>

    <ui-popup v-model:show="state.slots" mode="bottom" closeable>
      <template #header>
        <view class="slot-header">
          <text class="slot-header__title">头部固定</text>
        </view>
      </template>
      <view class="popup-card">
        <view v-for="i in 20" :key="i" class="popup-card__row">滚动内容 {{ i }}</view>
      </view>
      <template #footer>
        <view class="slot-footer">
          <ui-button size="small" type="primary" @click="state.slots = false">确认 (footer 固定)</ui-button>
        </view>
      </template>
    </ui-popup>

    <ui-popup v-model:show="state.filter" mode="bottom" closeable>
      <template #header>
        <view class="filter-header">
          <text class="filter-header__title">筛选条件</text>
        </view>
      </template>
      <view class="filter-body">
        <view v-for="group in filterGroups" :key="group.title" class="filter-group">
          <text class="filter-group__title">{{ group.title }}</text>
          <view class="filter-group__options">
            <view
              v-for="opt in group.options"
              :key="opt"
              class="filter-tag"
              :class="{ 'filter-tag--active': filterSelected[group.title] === opt }"
              @click="filterSelected[group.title] = opt"
            >
              <text class="filter-tag__text" :class="{ 'filter-tag__text--active': filterSelected[group.title] === opt }">{{ opt }}</text>
            </view>
          </view>
        </view>
      </view>
      <template #footer>
        <view class="filter-footer">
          <ui-button @click="resetFilter">重置</ui-button>
          <ui-button type="primary" @click="confirmFilter">确认</ui-button>
        </view>
      </template>
    </ui-popup>

    <ui-popup v-model:show="state.cart" mode="bottom" closeable>
      <template #header>
        <view class="cart-header">
          <text class="cart-header__title">购物车 ({{ cartItems.length }})</text>
        </view>
      </template>
      <view class="cart-body">
        <view v-for="item in cartItems" :key="item.id" class="cart-item">
          <view class="cart-item__main">
            <text class="cart-item__name">{{ item.name }}</text>
            <text class="cart-item__price">¥{{ item.price.toFixed(2) }}</text>
          </view>
          <text class="cart-item__qty">× {{ item.qty }}</text>
        </view>
      </view>
      <template #footer>
        <view class="cart-footer">
          <view class="cart-footer__total">
            <text class="cart-footer__label">合计</text>
            <text class="cart-footer__amount">¥{{ cartTotal.toFixed(2) }}</text>
          </view>
          <ui-button type="primary" @click="onCheckout">去结算</ui-button>
        </view>
      </template>
    </ui-popup>

    <ui-popup v-model:show="state.detail" mode="center" closeable :border-radius="24">
      <view class="detail-card">
        <view class="detail-card__cover" />
        <view class="detail-card__body">
          <text class="detail-card__title">夏季限定礼盒</text>
          <text class="detail-card__price">¥ 198.00</text>
          <text class="detail-card__desc">精选 6 款手工茶点 · 顺丰包邮 · 限时直降</text>
          <ui-button type="primary" @click="onAddCart">加入购物车</ui-button>
        </view>
      </view>
    </ui-popup>

    <ui-popup
      v-model:show="state.event"
      mode="center"
      closeable
      @open="onEvent('open')"
      @opened="onEvent('opened')"
      @close="(a) => onEvent(`close[${a}]`)"
      @closed="(a) => onEvent(`closed[${a}]`)"
      @click="onEvent('click')"
      @click-close="onEvent('clickClose')"
      @click-overlay="onEvent('clickOverlay')"
    >
      <view class="popup-card">
        <text class="popup-card__title">点击主体/关闭/遮罩</text>
        <text class="popup-card__body">查看事件回显</text>
      </view>
    </ui-popup>
  </demo-page>
</template>

<script setup lang="ts">
import type { PopupMode, PopupCloseIconPosition } from "@/uni_modules/uniapp-ui/ui-popup"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Popup 弹出层" },
})

const toast = useToast()

const modes: PopupMode[] = ["top", "bottom", "left", "right", "center"]
const modeLabel = (m: PopupMode) => ({ top: "顶部", bottom: "底部", left: "左侧", right: "右侧", center: "居中" })[m]

const durations = [100, 300, 600]

const filterGroups = [
  { title: "排序", options: ["综合", "销量", "价格"] },
  { title: "类型", options: ["全部", "新品", "热销", "促销"] },
  { title: "价格", options: ["不限", "0-100", "100-500", "500+"] },
]

const cartItems = [
  { id: 1, name: "夏季限定礼盒", price: 198, qty: 1 },
  { id: 2, name: "手工马卡龙 12 枚装", price: 88, qty: 2 },
  { id: 3, name: "原叶冻顶乌龙 250g", price: 128, qty: 1 },
]

const state = reactive({
  basic: false,
  modeOpen: false,
  closeOpen: false,
  fixedSize: false,
  maxSize: false,
  durationOpen: false,
  noOverlay: false,
  tintedOverlay: false,
  lockedOverlay: false,
  bgSolid: false,
  bgGradient: false,
  safeTop: false,
  safeBottom: false,
  custom: false,
  slots: false,
  filter: false,
  cart: false,
  detail: false,
  event: false,
})
const currentMode = ref<PopupMode>("center")
const currentClosePos = ref<PopupCloseIconPosition>("top-right")
const currentDuration = ref(300)
const filterSelected = reactive<Record<string, string>>({ 排序: "综合", 类型: "全部", 价格: "不限" })
const eventLog = ref("打开弹窗触发事件")

const cartTotal = computed(() => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0))

function openMode(m: PopupMode) {
  currentMode.value = m
  state.modeOpen = true
}

function openClose(pos: PopupCloseIconPosition) {
  currentClosePos.value = pos
  state.closeOpen = true
}

function openDuration(d: number) {
  currentDuration.value = d
  state.durationOpen = true
}

function resetFilter() {
  filterSelected.排序 = "综合"
  filterSelected.类型 = "全部"
  filterSelected.价格 = "不限"
  toast.text("已重置")
}

function confirmFilter() {
  state.filter = false
  toast.success("已应用筛选")
}

function onCheckout() {
  state.cart = false
  toast.success(`结算 ¥${cartTotal.value.toFixed(2)}`)
}

function onAddCart() {
  state.detail = false
  toast.success("已加入购物车")
}

function onEvent(name: string) {
  eventLog.value = `[event] ${name} @ ${Date.now() % 100000}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.popup-card {
  gap: 16rpx;
  width: 500rpx;
  display: flex;
  padding: 32rpx;
  background: var(--ui-color-background);
  align-items: center;
  flex-direction: column;

  &--top,
  &--bottom {
    width: 100%;
  }

  &--left,
  &--right {
    height: 100%;
  }

  &--transparent {
    background: transparent;
  }

  &--inverse {
    .popup-card__title,
    .popup-card__body {
      color: var(--ui-color-text-inverse);
    }
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 32rpx;
    font-weight: bold;
  }

  &__body {
    color: var(--ui-color-text-secondary);
    font-size: 26rpx;
    text-align: center;
    line-height: 1.5;
  }

  &__row {
    color: var(--ui-color-text-secondary);
    width: 100%;
    padding: 16rpx 0;
    font-size: 26rpx;
    border-bottom: 2rpx solid var(--ui-color-border-light);
  }
}

.slot-header {
  padding: 24rpx 32rpx;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &__title {
    color: var(--ui-color-text);
    font-size: 30rpx;
    font-weight: bold;
  }
}

.slot-footer {
  display: flex;
  padding: 24rpx 32rpx;
  border-top: 2rpx solid var(--ui-color-border-light);
  justify-content: flex-end;
}

.filter-header {
  padding: 32rpx;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &__title {
    color: var(--ui-color-text);
    font-size: 32rpx;
    font-weight: bold;
  }
}

.filter-body {
  padding: 24rpx 32rpx;
}

.filter-group {
  padding: 16rpx 0;

  &__title {
    color: var(--ui-color-text);
    display: block;
    font-size: 28rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }

  &__options {
    gap: 16rpx;
    display: flex;
    flex-wrap: wrap;
  }
}

.filter-tag {
  padding: 12rpx 24rpx;
  background: var(--ui-color-background-section);
  border-radius: var(--ui-radius-md);

  &--active {
    background: var(--ui-color-primary);
  }

  &__text {
    color: var(--ui-color-text);
    font-size: 26rpx;

    &--active {
      color: var(--ui-color-text-inverse);
    }
  }
}

.filter-footer {
  gap: 16rpx;
  display: grid;
  padding: 24rpx 32rpx;
  border-top: 2rpx solid var(--ui-color-border-light);
  grid-template-columns: 1fr 1fr;
}

.cart-header {
  padding: 32rpx;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &__title {
    color: var(--ui-color-text);
    font-size: 32rpx;
    font-weight: bold;
  }
}

.cart-body {
  max-height: 50vh;
}

.cart-item {
  gap: 16rpx;
  display: flex;
  padding: 24rpx 32rpx;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &__main {
    gap: 8rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: 28rpx;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 26rpx;
  }

  &__qty {
    color: var(--ui-color-text-tertiary);
    font-size: 24rpx;
  }
}

.cart-footer {
  gap: 24rpx;
  display: flex;
  padding: 24rpx 32rpx;
  border-top: 2rpx solid var(--ui-color-border-light);
  align-items: center;

  &__total {
    gap: 8rpx;
    flex: 1;
    display: flex;
    align-items: baseline;
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: 36rpx;
    font-weight: bold;
  }
}

.detail-card {
  width: 560rpx;
  background: var(--ui-color-background);

  &__cover {
    width: 100%;
    height: 320rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &__body {
    gap: 16rpx;
    display: flex;
    padding: 32rpx;
    flex-direction: column;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: 32rpx;
    font-weight: bold;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 36rpx;
    font-weight: bold;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
    line-height: 1.5;
  }
}
</style>
