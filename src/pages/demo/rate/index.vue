<template>
  <demo-page>
    <demo-section title="基础用法" desc="点击或滑动改分">
      <demo-block direction="column" align="start" :gap="12">
        <ui-rate v-model="state.basic" />
        <text class="demo-text">分数: {{ state.basic }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="半星" desc="allow-half 开启">
      <demo-block direction="column" align="start" :gap="12">
        <ui-rate v-model="state.half" allow-half />
        <text class="demo-text">分数: {{ state.half }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标" desc="icon / voidIcon">
      <demo-block direction="column" align="start" :gap="20">
        <view class="row">
          <text class="row__label">爱心</text>
          <ui-rate v-model="state.icon1" icon="like" void-icon="like-o" color="#ef4444" />
        </view>
        <view class="row">
          <text class="row__label">笑脸</text>
          <ui-rate v-model="state.icon2" icon="smile" void-icon="smile-o" color="#f59e0b" />
        </view>
        <view class="row">
          <text class="row__label">圆星</text>
          <ui-rate v-model="state.icon3" icon="star-circle" void-icon="star-circle-o" color="#10b981" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="数量" desc="count 控制总数">
      <demo-block direction="column" align="start" :gap="20">
        <view v-for="c in [3, 5, 7, 10]" :key="c" class="row">
          <text class="row__label">{{ c }} 个</text>
          <ui-rate v-model="state.count" :count="c" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="size 控制图标大小">
      <demo-block direction="column" align="start" :gap="16">
        <ui-rate v-for="s in [28, 40, 56]" :key="s" v-model="state.size" :size="`${s}rpx`" />
      </demo-block>
    </demo-section>

    <demo-section title="颜色" desc="color 接受语义色 / hex">
      <demo-block direction="column" align="start" :gap="12">
        <ui-rate v-for="c in colors" :key="c.value" v-model="state.color" :color="c.value" />
      </demo-block>
    </demo-section>

    <demo-section title="间距" desc="gutter 调整图标间距">
      <demo-block direction="column" align="start" :gap="16">
        <view v-for="g in ['4rpx', '12rpx', '24rpx']" :key="g" class="row">
          <text class="row__label">{{ g }}</text>
          <ui-rate v-model="state.gutter" :gutter="g" />
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="禁用 / 只读" desc="disabled 完全锁死 / readonly 仅展示">
      <demo-block direction="column" align="start" :gap="16">
        <ui-rate :model-value="3" disabled />
        <ui-rate :model-value="3.7" readonly allow-half />
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:订单评价" desc="多维度评分">
      <demo-block direction="column" align="start" :gap="20">
        <view v-for="r in reviewItems" :key="r.label" class="review-row">
          <text class="review-row__label">{{ r.label }}</text>
          <ui-rate v-model="reviewScores[r.key]" :color="r.color" allow-half size="44rpx" />
          <text class="review-row__value">{{ reviewScores[r.key] }}</text>
        </view>
        <ui-button type="primary" @click="submitReview">提交评价</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:商品口碑" desc="只读半星展示精确分">
      <demo-block direction="column" align="start" :gap="12">
        <view class="praise">
          <text class="praise__score">{{ praiseScore.toFixed(1) }}</text>
          <view class="praise__rate">
            <ui-rate :model-value="praiseScore" allow-half readonly color="#f59e0b" size="36rpx" />
            <text class="praise__count">{{ praiseCount }} 人评价</text>
          </view>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="12">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-rate v-model="state.event" allow-half @change="onChange" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Rate 评分" },
})

const toast = useToast()

const colors = [
  { label: "primary", value: "primary" },
  { label: "success", value: "success" },
  { label: "danger", value: "danger" },
  { label: "暖橙", value: "#f59e0b" },
]

const reviewItems = [
  { key: "quality", label: "商品质量", color: "#f59e0b" },
  { key: "speed", label: "物流速度", color: "#10b981" },
  { key: "service", label: "客服态度", color: "#ef4444" },
] as const

const state = reactive({
  basic: 3,
  half: 3.5,
  icon1: 4,
  icon2: 3,
  icon3: 5,
  count: 4,
  size: 4,
  color: 4,
  gutter: 3,
  event: 3.5,
})
const reviewScores = reactive<Record<string, number>>({ quality: 5, speed: 4, service: 4.5 })
const praiseScore = ref(4.7)
const praiseCount = ref(2358)
const eventLog = ref("等待事件...")

function onChange(value: number) {
  eventLog.value = `[change] ${value}`
}

function submitReview() {
  const total = Object.values(reviewScores).reduce((a, b) => a + b, 0)
  const avg = (total / Object.keys(reviewScores).length).toFixed(2)
  toast.success(`已提交 平均 ${avg} 分`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.row {
  gap: 16rpx;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-secondary);
    width: 100rpx;
    font-size: 22rpx;
    flex-shrink: 0;
  }
}

.review-row {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text);
    width: 140rpx;
    font-size: 26rpx;
  }

  &__value {
    color: var(--ui-color-text-secondary);
    font-size: 24rpx;
  }
}

.praise {
  gap: 24rpx;
  width: 100%;
  display: flex;
  padding: 32rpx;
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-md);

  &__score {
    color: var(--ui-color-danger);
    font-size: 72rpx;
    font-weight: bold;
  }

  &__rate {
    gap: 8rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__count {
    color: var(--ui-color-text-tertiary);
    font-size: 22rpx;
  }
}
</style>
