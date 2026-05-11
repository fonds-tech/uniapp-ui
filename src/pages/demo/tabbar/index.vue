<template>
  <demo-page>
    <demo-section title="基础用法" desc="内嵌使用需 fixed=false">
      <ui-tabbar v-model="basic" :fixed="false" :safe-area-inset-bottom="false">
        <ui-tabbar-item icon="home-o" text="首页" />
        <ui-tabbar-item icon="search" text="搜索" />
        <ui-tabbar-item icon="like-o" text="收藏" />
        <ui-tabbar-item icon="user-o" text="我的" />
      </ui-tabbar>
    </demo-section>

    <demo-section title="徽标 / 圆点" desc="dot 显示红点；badge 显示数字/文本">
      <ui-tabbar v-model="badge" :fixed="false" :safe-area-inset-bottom="false">
        <ui-tabbar-item icon="home-o" text="首页" />
        <ui-tabbar-item icon="search" text="搜索" dot />
        <ui-tabbar-item icon="chat-o" text="消息" badge="5" />
        <ui-tabbar-item icon="user-o" text="我的" badge="99+" />
      </ui-tabbar>
    </demo-section>

    <demo-section title="颜色" desc="active / inactive 颜色切换">
      <demo-block direction="column" :gap="16">
        <ui-tabbar v-model="colorActive" :fixed="false" :safe-area-inset-bottom="false" :active-color="colorPreset.active" inactive-color="text-secondary">
          <ui-tabbar-item icon="home-o" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="like-o" text="收藏" />
          <ui-tabbar-item icon="user-o" text="我的" />
        </ui-tabbar>
        <demo-block :cols="4" :gap="12">
          <ui-button v-for="c in colorPresets" :key="c.value" size="small" :type="colorPreset.active === c.value ? 'primary' : 'default'" @click="colorPreset.active = c.value">
            {{ c.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="边框 / 背景" desc="border 顶部分隔线 + background 自定义底色">
      <demo-block direction="column" :gap="16">
        <ui-tabbar v-model="bgActive" :fixed="false" :safe-area-inset-bottom="false" border background="background-section">
          <ui-tabbar-item icon="home-o" text="首页" />
          <ui-tabbar-item icon="search" text="搜索" />
          <ui-tabbar-item icon="user-o" text="我的" />
        </ui-tabbar>
      </demo-block>
    </demo-section>

    <demo-section title="禁用" desc="单独禁用某项">
      <ui-tabbar v-model="disabled" :fixed="false" :safe-area-inset-bottom="false">
        <ui-tabbar-item icon="home-o" text="首页" />
        <ui-tabbar-item icon="search" text="搜索" disabled />
        <ui-tabbar-item icon="like-o" text="收藏" />
        <ui-tabbar-item icon="user-o" text="我的" />
      </ui-tabbar>
    </demo-section>

    <demo-section title="切换拦截 beforeChange" desc="确认后才切换">
      <ui-tabbar v-model="intercept" :fixed="false" :safe-area-inset-bottom="false" :before-change="beforeChange">
        <ui-tabbar-item icon="home-o" text="首页" />
        <ui-tabbar-item icon="search" text="搜索" />
        <ui-tabbar-item icon="like-o" text="收藏" />
        <ui-tabbar-item icon="user-o" text="我的" />
      </ui-tabbar>
    </demo-section>

    <demo-section title="自定义 slot" desc="icon / default / extra slot 三种">
      <ui-tabbar v-model="slotActive" :fixed="false" :safe-area-inset-bottom="false" height="120rpx">
        <ui-tabbar-item v-for="item in slotItems" :key="item.name" :name="item.name">
          <template #icon>
            <view class="slot-icon" :class="{ 'slot-icon--active': slotActive === item.name }">
              <text>{{ item.emoji }}</text>
            </view>
          </template>
          <template #default>
            <text class="slot-label">{{ item.label }}</text>
          </template>
          <template v-if="item.extra" #extra>
            <view class="slot-extra">{{ item.extra }}</view>
          </template>
        </ui-tabbar-item>
      </ui-tabbar>
    </demo-section>

    <demo-section title="事件回显" desc="change / click / item click 实时日志">
      <demo-block direction="column" :gap="12">
        <ui-tabbar v-model="eventActive" :fixed="false" :safe-area-inset-bottom="false" @change="onChange">
          <ui-tabbar-item icon="home-o" text="首页" @click="onItemClick(0)" />
          <ui-tabbar-item icon="search" text="搜索" @click="onItemClick(1)" />
          <ui-tabbar-item icon="user-o" text="我的" @click="onItemClick(2)" />
        </ui-tabbar>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商城底部栏" desc="徽标 + 自定义激活色 + 内容区联动">
      <demo-block direction="column" :gap="16">
        <view class="shop-panel">
          <text class="shop-panel__title">{{ shopPanel.title }}</text>
          <text class="shop-panel__desc">{{ shopPanel.desc }}</text>
        </view>
        <ui-tabbar v-model="shopActive" :fixed="false" :safe-area-inset-bottom="false" active-color="danger" border>
          <ui-tabbar-item v-for="item in shopTabs" :key="item.name" :name="item.name" :icon="item.icon" :text="item.label" :badge="item.badge" />
        </ui-tabbar>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast, useDialog } from "@/uni_modules/uniapp-ui"
import { ref, computed, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Tabbar 标签栏" },
})

const toast = useToast()
const dialog = useDialog()

const basic = ref(0)
const badge = ref(0)

const colorPresets = [
  { label: "主色", value: "primary" },
  { label: "成功", value: "success" },
  { label: "警告", value: "warning" },
  { label: "危险", value: "danger" },
]
const colorPreset = reactive({ active: "primary" })
const colorActive = ref(0)

const bgActive = ref(0)
const disabled = ref(0)

const intercept = ref(0)
function beforeChange(name: string | number): Promise<boolean> {
  return new Promise((resolve) => {
    dialog.confirm({
      title: "提示",
      content: `确定切换到第 ${+name + 1} 项？`,
      onConfirm: () => resolve(true),
      onCancel: () => resolve(false),
    })
  })
}

const slotItems = [
  { name: 0, label: "首页", emoji: "🏠", extra: "" },
  { name: 1, label: "发现", emoji: "🔍", extra: "新" },
  { name: 2, label: "我的", emoji: "👤", extra: "" },
]
const slotActive = ref<number>(0)

const eventActive = ref(0)
const eventLog = ref("等待事件...")
function onChange(name: string | number) {
  eventLog.value = `[change] name=${name}`
}
function onItemClick(idx: number) {
  eventLog.value = `[click] index=${idx}`
}

const shopTabs = [
  { name: "home", label: "首页", icon: "home-o", badge: "" },
  { name: "category", label: "分类", icon: "apps-o", badge: "" },
  { name: "cart", label: "购物车", icon: "shopping-cart-o", badge: "8" },
  { name: "user", label: "我的", icon: "user-o", badge: "" },
]
const shopActive = ref("home")
const shopPanels = {
  home: { title: "推荐商品", desc: "猜你喜欢、限时折扣" },
  category: { title: "全部分类", desc: "电子 / 服饰 / 美食 / 家居" },
  cart: { title: "购物车", desc: "8 件商品待结算" },
  user: { title: "个人中心", desc: "订单 / 优惠券 / 设置" },
}
const shopPanel = computed(() => shopPanels[shopActive.value as keyof typeof shopPanels])
</script>

<style lang="scss" scoped>
.event-log {
  color: var(--ui-color-text-secondary);
  padding: var(--ui-spacing-md);
  font-size: var(--ui-font-size-xs);
  background: var(--ui-color-background-section);
  font-family: var(--ui-font-family-mono);
  border-radius: var(--ui-radius-md);
}

.slot-icon {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  font-size: 32rpx;
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: 50%;
  justify-content: center;

  &--active {
    background: var(--ui-color-primary);
  }
}

.slot-label {
  font-size: var(--ui-font-size-xs);
}

.slot-extra {
  color: var(--ui-color-text-inverse);
  padding: 0 var(--ui-spacing-xxs);
  font-size: 20rpx;
  background: var(--ui-color-danger);
  margin-top: var(--ui-spacing-xxs);
  border-radius: var(--ui-radius-sm);
}

.shop-panel {
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
