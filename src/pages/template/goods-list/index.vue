<template>
  <view class="page">
    <view class="topbar">
      <ui-search v-model="keyword" placeholder="搜索商品 / 品牌 / 店铺" shape="round" background="background-section" />
      <view class="topbar__filter" @click="showFilter = true">
        <ui-icon name="filter-o" size="40rpx" color="text" />
      </view>
    </view>

    <view class="sort">
      <ui-tabs v-model="sortKey" type="line">
        <ui-tab v-for="opt in sortOptions" :key="opt.value" :name="opt.value" :title="opt.label" />
      </ui-tabs>
    </view>

    <view class="seckill" @click="onSeckill">
      <view class="seckill__left">
        <view class="seckill__title-row">
          <ui-icon name="fire" size="32rpx" color="text-inverse" />
          <text class="seckill__title">限时秒杀</text>
        </view>
        <text class="seckill__sub">每日 10:00 / 14:00 / 20:00</text>
      </view>
      <view class="seckill__time">
        <ui-count-down :time="seckillTime" format="HH:mm:ss" color="text-inverse" font-size="28rpx" font-weight="bold" />
      </view>
    </view>

    <scroll-view scroll-y class="scroll">
      <ui-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <view class="grid">
          <view v-for="g in goods" :key="g.id" class="goods" @click="onClickGoods(g)">
            <view class="goods__image-wrap">
              <ui-image :src="g.image" width="100%" height="380rpx" mode="aspectFill" />
              <view v-if="g.tag" class="goods__corner" :class="[`goods__corner--${g.tagTheme || 'hot'}`]">{{ g.tag }}</view>
              <view v-if="g.live" class="goods__live">
                <view class="goods__live-dot" />
                <text class="goods__live-text">直播中</text>
              </view>
            </view>
            <view class="goods__body">
              <view class="goods__title-row">
                <ui-tag v-if="g.brand" type="primary" plain>{{ g.brand }}</ui-tag>
                <ui-text-ellipsis :content="g.title" :rows="2" />
              </view>
              <view v-if="g.activity" class="goods__activity">
                <text class="goods__activity-text">{{ g.activity }}</text>
              </view>
              <view class="goods__price-row">
                <view class="goods__price">
                  <text class="goods__currency">¥</text>
                  <text class="goods__amount">{{ g.price }}</text>
                  <text v-if="g.origin" class="goods__origin">¥{{ g.origin }}</text>
                </view>
                <view class="goods__cart" @click.stop="onAddCart(g)">
                  <ui-icon name="cart" size="32rpx" color="text-inverse" />
                </view>
              </view>
              <view class="goods__meta">
                <view class="goods__rate">
                  <ui-icon name="star" size="20rpx" color="warning" />
                  <text class="goods__rate-text">{{ g.rate }}</text>
                </view>
                <text class="goods__sales">{{ g.sales }} 人付款</text>
              </view>
            </view>
          </view>
        </view>
      </ui-pull-refresh>
    </scroll-view>

    <ui-back-top :scroll-top="100" />

    <ui-popup v-model:show="showFilter" position="right" :custom-style="{ width: '80%', height: '100%' }">
      <view class="filter">
        <view class="filter__head">
          <ui-button type="text" @click="showFilter = false">取消</ui-button>
          <text class="filter__title">筛选</text>
          <ui-button type="text" @click="onApplyFilter">确定</ui-button>
        </view>

        <view class="filter__body">
          <view class="filter__group">
            <text class="filter__label">分类</text>
            <view class="filter__tags">
              <view v-for="c in categories" :key="c" class="filter__tag" :class="[filterCate === c ? 'filter__tag--active' : '']" @click="filterCate = c">
                {{ c }}
              </view>
            </view>
          </view>

          <view class="filter__group">
            <text class="filter__label">品牌</text>
            <view class="filter__tags">
              <view v-for="b in brands" :key="b" class="filter__tag" :class="[filterBrand === b ? 'filter__tag--active' : '']" @click="filterBrand = b">
                {{ b }}
              </view>
            </view>
          </view>

          <view class="filter__group">
            <text class="filter__label">价格区间</text>
            <view class="filter__price">
              <ui-input v-model="filterMin" type="digit" placeholder="最低" background="background-section" radius="16rpx" :custom-style="{ flex: 1 }" />
              <text class="filter__price-sep">-</text>
              <ui-input v-model="filterMax" type="digit" placeholder="最高" background="background-section" radius="16rpx" :custom-style="{ flex: 1 }" />
            </view>
          </view>
        </view>

        <view class="filter__footer">
          <ui-button block plain @click="onReset">重置</ui-button>
          <ui-button block type="primary" @click="onApplyFilter">应用</ui-button>
        </view>
      </view>
    </ui-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "商品列表" },
})

const toast = useToast()

type TagTheme = "new" | "hot" | "trending" | "premium" | "dark"

const keyword = ref("")
const sortKey = ref("default")
const refreshing = ref(false)
const showFilter = ref(false)
const seckillTime = 2 * 3600 * 1000 + 18 * 60 * 1000

const sortOptions = [
  { label: "综合", value: "default" },
  { label: "新品", value: "new" },
  { label: "销量", value: "sales" },
  { label: "价格 ↑", value: "price-asc" },
  { label: "价格 ↓", value: "price-desc" },
]

const categories = ["全部", "数码电子", "服装鞋帽", "美妆个护", "家居生活", "食品酒水", "母婴亲子"]
const brands = ["不限", "Apple", "华为", "小米", "Nike", "Adidas", "无印良品"]

const filterCate = ref("全部")
const filterBrand = ref("不限")
const filterMin = ref("")
const filterMax = ref("")

const goods = ref<{ id: number; brand?: string; title: string; price: string; origin?: string; rate: number; sales: string; image: string; tag?: string; tagTheme?: TagTheme; activity?: string; live?: boolean }[]>([
  { id: 1, brand: "Apple", title: "AirPods Pro 2 主动降噪 长续航 USB-C", price: "1899", origin: "1999", rate: 4.9, sales: "1.2 万", image: "https://picsum.photos/400/400?random=101", tag: "新品", tagTheme: "new", activity: "限时 -100 / 满 2000 减 200" },
  { id: 2, brand: "华为", title: "Mate 60 Pro 旗舰智能手机 12+512GB", price: "6499", origin: "7499", rate: 4.8, sales: "8.6k", image: "https://picsum.photos/400/400?random=102", tag: "爆款", tagTheme: "hot", live: true },
  { id: 3, brand: "Nike", title: "Air Force 1 经典低帮休闲运动鞋", price: "799", origin: "899", rate: 4.7, sales: "5.6k", image: "https://picsum.photos/400/400?random=103", tag: "热销", tagTheme: "trending", activity: "买一送一" },
  { id: 4, brand: "无印良品", title: "记忆棉颈椎护理枕 慢回弹", price: "189", rate: 4.6, sales: "2.3k", image: "https://picsum.photos/400/400?random=104", activity: "下单立减 20" },
  { id: 5, brand: "小米", title: "便携充电宝 20000mAh 大容量 双向快充", price: "159", origin: "199", rate: 4.8, sales: "8.1k", image: "https://picsum.photos/400/400?random=105", tag: "优选", tagTheme: "premium" },
  { id: 6, brand: "雀巢", title: "速溶咖啡黑咖啡袋装 100 条", price: "78", origin: "98", rate: 4.5, sales: "12 万+", image: "https://picsum.photos/400/400?random=106" },
  { id: 7, brand: "Adidas", title: "运动短袖 T 恤 透气速干 男士款", price: "249", origin: "299", rate: 4.7, sales: "892", image: "https://picsum.photos/400/400?random=107", live: true },
  { id: 8, brand: "戴森", title: "Dyson V12 无线吸尘器 长续航", price: "3990", rate: 4.9, sales: "1.5k", image: "https://picsum.photos/400/400?random=108", tag: "尊享", tagTheme: "dark" },
])

function onRefresh() {
  setTimeout(() => {
    refreshing.value = false
    toast.success("刷新成功")
  }, 800)
}

function onClickGoods(_g: { title: string }) {
  uni.navigateTo({ url: "/pages/template/goods-detail/index" })
}

function onAddCart(_g: { title: string }) {
  toast.success("已加入购物车")
}

function onSeckill() {
  toast.text("进入秒杀专场")
}

function onReset() {
  filterCate.value = "全部"
  filterBrand.value = "不限"
  filterMin.value = ""
  filterMax.value = ""
}

function onApplyFilter() {
  showFilter.value = false
  toast.success("筛选已应用")
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  display: flex;
  background: var(--ui-color-background-page);
  flex-direction: column;
}

.topbar {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  background: var(--ui-color-background);
  align-items: center;

  &__filter {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    background: var(--ui-color-background-section);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }
}

.sort {
  background: var(--ui-color-background);
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.seckill {
  margin: var(--ui-spacing-sm) var(--ui-spacing-md);
  display: flex;
  padding: var(--ui-spacing-md) var(--ui-spacing-lg);
  background: linear-gradient(135deg, var(--ui-color-danger), var(--ui-color-warning));
  box-shadow: var(--ui-shadow-sm);
  align-items: center;
  border-radius: var(--ui-radius-lg);
  justify-content: space-between;

  &__title-row {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: center;
  }

  &__title {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__sub {
    color: rgba(255, 255, 255, 0.8);
    display: block;
    font-size: var(--ui-font-size-xs);
    margin-top: var(--ui-spacing-xxs);
  }

  &__time {
    padding: var(--ui-spacing-xs) var(--ui-spacing-md);
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--ui-radius-md);
  }
}

.scroll {
  flex: 1;
}

.grid {
  gap: var(--ui-spacing-sm);
  display: flex;
  padding: var(--ui-spacing-sm) var(--ui-spacing-md);
  flex-wrap: wrap;
}

.goods {
  width: calc(50% - var(--ui-spacing-xs));
  overflow: hidden;
  background: var(--ui-color-background);
  box-shadow: var(--ui-shadow-xs);
  border-radius: var(--ui-radius-lg);

  &__image-wrap {
    position: relative;
  }

  &__corner {
    top: var(--ui-spacing-sm);
    left: 0;
    color: var(--ui-color-text-inverse);
    padding: var(--ui-spacing-xxs) var(--ui-spacing-sm);
    position: absolute;
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-bold);
    border-radius: 0 var(--ui-radius-sm) var(--ui-radius-sm) 0;

    &--new {
      background: linear-gradient(135deg, var(--ui-color-warning), var(--ui-color-danger));
    }

    &--hot {
      background: var(--ui-color-danger);
    }

    &--trending {
      background: linear-gradient(135deg, var(--ui-color-warning), var(--ui-color-danger));
    }

    &--premium {
      background: linear-gradient(135deg, var(--ui-color-primary), var(--ui-color-primary-active));
    }

    &--dark {
      background: var(--ui-gray-7);
    }
  }

  &__live {
    gap: var(--ui-spacing-xxs);
    top: var(--ui-spacing-sm);
    right: var(--ui-spacing-sm);
    display: flex;
    padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    align-items: center;
    border-radius: var(--ui-radius-sm);
  }

  &__live-dot {
    width: 12rpx;
    height: 12rpx;
    background: var(--ui-color-danger);
    border-radius: var(--ui-radius-round);
  }

  &__live-text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }

  &__body {
    gap: var(--ui-spacing-sm);
    display: flex;
    padding: var(--ui-spacing-md);
    flex-direction: column;
  }

  &__title-row {
    gap: var(--ui-spacing-xs);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  &__activity {
    padding: var(--ui-spacing-xxs) var(--ui-spacing-xs);
    align-self: flex-start;
    background: var(--ui-color-danger-light);
    border-radius: var(--ui-radius-sm);
  }

  &__activity-text {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
  }

  &__price-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__price {
    gap: var(--ui-spacing-xxs);
    color: var(--ui-color-danger);
    display: flex;
    align-items: baseline;
  }

  &__currency {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-bold);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__origin {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
    text-decoration: line-through;
  }

  &__cart {
    width: 56rpx;
    height: 56rpx;
    display: flex;
    background: linear-gradient(135deg, var(--ui-color-warning), var(--ui-color-danger));
    box-shadow: var(--ui-shadow-sm);
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__rate {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: center;
  }

  &__rate-text {
    color: var(--ui-color-warning);
    font-size: var(--ui-font-size-xs);
    font-weight: var(--ui-font-weight-normal);
  }

  &__sales {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.filter {
  height: 100%;
  display: flex;
  background: var(--ui-color-background);
  flex-direction: column;

  &__head {
    display: flex;
    padding: var(--ui-spacing-md);
    align-items: center;
    border-bottom: 1rpx solid var(--ui-color-border-light);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__body {
    flex: 1;
    padding: var(--ui-spacing-lg);
    overflow-y: auto;
  }

  &__group {
    margin-bottom: var(--ui-spacing-xl);
  }

  &__label {
    color: var(--ui-color-text);
    display: block;
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
    margin-bottom: var(--ui-spacing-md);
  }

  &__tags {
    gap: var(--ui-spacing-sm);
    display: flex;
    flex-wrap: wrap;
  }

  &__tag {
    color: var(--ui-color-text);
    padding: var(--ui-spacing-xs) var(--ui-spacing-md);
    font-size: var(--ui-font-size-xs);
    background: var(--ui-color-background-section);
    border-radius: var(--ui-radius-round);

    &--active {
      color: var(--ui-color-text-inverse);
      background: var(--ui-color-primary);
    }
  }

  &__price {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__price-sep {
    color: var(--ui-color-text-tertiary);
  }

  &__footer {
    gap: var(--ui-spacing-md);
    display: flex;
    padding: var(--ui-spacing-md);
    border-top: 1rpx solid var(--ui-color-border-light);
  }
}
</style>
