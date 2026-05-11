<template>
  <demo-page>
    <demo-section title="切换演示场景">
      <demo-block :cols="3" :gap="12">
        <ui-button v-for="(s, i) in scenes" :key="s.label" size="small" :type="sceneIndex === i ? 'primary' : 'default'" @click="sceneIndex = i">{{ s.label }}</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="开关">
      <demo-block :cols="2" :gap="12">
        <view class="row">
          <text class="row__label">禁用</text>
          <ui-switch v-model="disabled" />
        </view>
        <view class="row">
          <text class="row__label">动画 ms</text>
          <ui-stepper v-model="animationDuration" :step="100" :min="100" :max="1000" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section :title="`实例 (${currentScene.label})`" :desc="currentScene.desc">
      <demo-block direction="column" :gap="0">
        <ui-pull-refresh
          v-model="loading"
          :disabled="disabled"
          :animation-duration="animationDuration"
          :pulling-text="currentScene.pullingText"
          :loosing-text="currentScene.loosingText"
          :loading-text="currentScene.loadingText"
          :success-text="currentScene.successText"
          @refresh="onRefresh"
          @change="onChange"
        >
          <!-- 自定义插槽场景 -->
          <template v-if="sceneIndex === 3" #pulling="{ distance }">
            <view class="custom-tip">
              <view class="custom-tip__icon" :style="{ transform: `rotate(${Math.min(distance * 3, 180)}deg)` }">↓</view>
              <text class="custom-tip__text">下拉 {{ Math.round(distance) }}px</text>
            </view>
          </template>
          <template v-if="sceneIndex === 3" #loosing>
            <view class="custom-tip custom-tip--active">
              <view class="custom-tip__icon" style="transform: rotate(180deg)">↓</view>
              <text class="custom-tip__text">释放刷新</text>
            </view>
          </template>
          <template v-if="sceneIndex === 3" #loading>
            <view class="custom-tip custom-tip--active">
              <ui-loading size="32rpx" color="primary" />
              <text class="custom-tip__text">努力加载中…</text>
            </view>
          </template>
          <template v-if="sceneIndex === 3" #success>
            <view class="custom-tip custom-tip--success">
              <text class="custom-tip__text">✓ 加载成功</text>
            </view>
          </template>

          <!-- 列表内容 -->
          <view class="list">
            <view v-for="msg in messages" v-if="sceneIndex === 4" :key="msg.id" class="msg-item">
              <view class="msg-item__avatar" :style="{ background: msg.color }">
                <text class="msg-item__initial">{{ msg.name[0] }}</text>
              </view>
              <view class="msg-item__main">
                <view class="msg-item__head">
                  <text class="msg-item__name">{{ msg.name }}</text>
                  <text class="msg-item__time">{{ msg.time }}</text>
                </view>
                <text class="msg-item__last">{{ msg.last }}</text>
              </view>
              <view v-if="msg.unread" class="msg-item__badge">
                <text class="msg-item__badge-text">{{ msg.unread }}</text>
              </view>
            </view>

            <view v-for="g in goods" v-else-if="sceneIndex === 5" :key="g.id" class="goods-item">
              <view class="goods-item__cover" :style="{ background: g.color }" />
              <view class="goods-item__main">
                <text class="goods-item__name">{{ g.name }}</text>
                <text class="goods-item__desc">{{ g.desc }}</text>
                <text class="goods-item__price">¥ {{ g.price.toFixed(2) }}</text>
              </view>
            </view>

            <view v-for="item in list" v-else :key="item" class="list-item">
              <text class="list-item__text">{{ item }}</text>
            </view>
          </view>
        </ui-pull-refresh>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-button size="small" @click="eventLog = '等待事件...'">清空</ui-button>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { PullRefreshStatus } from "@/uni_modules/uniapp-ui/ui-pull-refresh"
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "PullRefresh 下拉刷新" },
})

const toast = useToast()

const scenes = [
  { label: "基础", desc: "默认文案 + 默认成功提示", pullingText: "下拉即可刷新...", loosingText: "释放即可刷新...", loadingText: "加载中...", successText: "刷新成功" },
  { label: "无成功提示", desc: "successText 为空，刷新完成直接收起", pullingText: "下拉即可刷新...", loosingText: "释放即可刷新...", loadingText: "加载中...", successText: "" },
  { label: "自定义文案", desc: "覆盖各状态文案", pullingText: "继续下拉…", loosingText: "松开马上刷新", loadingText: "正在加载新数据", successText: "数据已是最新" },
  { label: "自定义插槽", desc: "插槽接管各状态视觉，箭头跟随旋转", pullingText: "", loosingText: "", loadingText: "", successText: "" },
  { label: "消息列表", desc: "下拉刷新最新消息", pullingText: "下拉刷新消息", loosingText: "松开收新消息", loadingText: "拉取中…", successText: "已是最新" },
  { label: "商品列表", desc: "下拉刷新商品流", pullingText: "下拉看新货", loosingText: "松开看新货", loadingText: "上新中…", successText: "已是最新" },
]

const sceneIndex = ref(0)
const loading = ref(false)
const disabled = ref(false)
const animationDuration = ref(300)
const eventLog = ref("等待事件...")

const list = ref(["项目 1", "项目 2", "项目 3", "项目 4", "项目 5", "项目 6"])
const messages = ref([
  { id: 1, name: "张三", color: "#6366f1", time: "12:30", last: "明天的会议提前到 10 点", unread: 2 },
  { id: 2, name: "李四", color: "#14b8a6", time: "11:20", last: "文档已收到，谢谢", unread: 0 },
  { id: 3, name: "王五", color: "#f59e0b", time: "昨天", last: "[图片]", unread: 5 },
  { id: 4, name: "赵六", color: "#ec4899", time: "周三", last: "好的，按你说的办", unread: 0 },
])
const goods = ref([
  { id: 1, name: "夏季限定礼盒", desc: "六款手工茶点 · 顺丰包邮", price: 198, color: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
  { id: 2, name: "马卡龙礼盒", desc: "12 枚装 · 节令限定", price: 88, color: "linear-gradient(135deg, #ec4899, #f43f5e)" },
  { id: 3, name: "原叶冻顶乌龙", desc: "250g · 高山茶园直采", price: 128, color: "linear-gradient(135deg, #10b981, #059669)" },
])

const currentScene = computed(() => scenes[sceneIndex.value])

function onRefresh() {
  eventLog.value = `[refresh] 触发 @ ${new Date().toLocaleTimeString()}`
  setTimeout(() => {
    if (sceneIndex.value === 4) {
      messages.value = messages.value.map((m) => ({ ...m, time: "刚刚", unread: m.unread + (Math.random() > 0.5 ? 1 : 0) }))
    } else if (sceneIndex.value === 5) {
      goods.value = goods.value.map((g) => ({ ...g, name: `${g.name} ★` }))
    } else {
      list.value = list.value.map((_, i) => `项目 ${i + 1} (已刷新 ${new Date().getSeconds()}s)`)
    }
    loading.value = false
    toast.success("已刷新")
  }, 1200)
}

function onChange(status: PullRefreshStatus) {
  eventLog.value = `[change] ${status} @ ${new Date().toLocaleTimeString()}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.row {
  gap: 12rpx;
  width: 100%;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

.list {
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-md);
}

.list-item {
  height: 100rpx;
  display: flex;
  padding: 0 24rpx;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &__text {
    color: var(--ui-color-text);
    font-size: 28rpx;
  }
}

// 消息列表场景
.msg-item {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &__avatar {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-radius: var(--ui-radius-round);
    justify-content: center;
  }

  &__initial {
    color: var(--ui-color-text-inverse);
    font-size: 32rpx;
    font-weight: bold;
  }

  &__main {
    gap: 8rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__head {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    color: var(--ui-color-text);
    font-size: 28rpx;
    font-weight: bold;
  }

  &__time {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }

  &__last {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }

  &__badge {
    height: 36rpx;
    display: flex;
    padding: 0 8rpx;
    min-width: 36rpx;
    background: var(--ui-color-danger);
    align-items: center;
    border-radius: 18rpx;
    justify-content: center;
  }

  &__badge-text {
    color: var(--ui-color-text-inverse);
    font-size: 20rpx;
  }
}

// 商品列表场景
.goods-item {
  gap: 16rpx;
  display: flex;
  padding: 24rpx;
  align-items: center;
  border-bottom: 2rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }

  &__cover {
    width: 140rpx;
    height: 140rpx;
    flex-shrink: 0;
    border-radius: var(--ui-radius-md);
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
    font-weight: bold;
  }

  &__desc {
    color: var(--ui-color-text-secondary);
    font-size: 22rpx;
  }

  &__price {
    color: var(--ui-color-danger);
    font-size: 28rpx;
    font-weight: bold;
  }
}

// 自定义插槽样式
.custom-tip {
  gap: 12rpx;
  color: var(--ui-color-text-secondary);
  display: flex;
  font-size: 26rpx;
  align-items: center;
  justify-content: center;

  &--active {
    color: var(--ui-color-primary);
  }

  &--success {
    color: var(--ui-color-success);
  }

  &__icon {
    font-size: 32rpx;
    transition: transform var(--ui-transition-fast);
  }

  &__text {
    color: inherit;
    font-size: inherit;
  }
}
</style>
