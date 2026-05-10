<template>
  <demo-page>
    <demo-section title="基础用法" desc="block 撑满父容器">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.basic" :options="basicOptions" block />
        <text class="demo-text">当前选中: {{ value.basic }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="按内容宽" desc="不传 block，宽度按文字撑">
      <demo-block direction="column" align="start" :gap="12">
        <ui-segmented v-model="value.inline" :options="basicOptions" />
      </demo-block>
    </demo-section>

    <demo-section title="样式类型" desc="filled (默认) / outline / block">
      <demo-block direction="column" :gap="16">
        <ui-segmented v-model="value.tFilled" :options="typeOptions" type="filled" block />
        <ui-segmented v-model="value.tOutline" :options="typeOptions" type="outline" block />
        <ui-segmented v-model="value.tBlock" :options="typeOptions" type="block" block />
      </demo-block>
    </demo-section>

    <demo-section title="圆角" desc="round 胶囊 (默认) / round=false 直角 / radius 自定义">
      <demo-block direction="column" :gap="16">
        <ui-segmented v-model="value.r1" :options="basicOptions" block />
        <ui-segmented v-model="value.r2" :options="basicOptions" :round="false" block />
        <ui-segmented v-model="value.r3" :options="basicOptions" radius="12rpx" block />
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="height + fontSize + itemPadding 自定义">
      <demo-block direction="column" :gap="16">
        <ui-segmented v-model="value.s1" :options="sizeOptions" height="48rpx" font-size="24rpx" item-padding="16rpx" block />
        <ui-segmented v-model="value.s2" :options="sizeOptions" block />
        <ui-segmented v-model="value.s3" :options="sizeOptions" height="72rpx" font-size="32rpx" item-padding="32rpx" block />
      </demo-block>
    </demo-section>

    <demo-section title="带图标" desc="option.icon 设置图标名">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.icon" :options="iconOptions" block />
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色" desc="activeColor / activeTextColor / inactiveTextColor">
      <demo-block direction="column" :gap="16">
        <ui-segmented v-model="value.c1" :options="typeOptions" active-color="success" active-text-color="#fff" block />
        <ui-segmented v-model="value.c2" :options="typeOptions" active-color="danger" active-text-color="#fff" inactive-text-color="text-tertiary" block />
      </demo-block>
    </demo-section>

    <demo-section title="滚动模式" desc="选项多时横向滚动 + 居中激活项">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.scroll" :options="scrollOptions" scrollable />
      </demo-block>
    </demo-section>

    <demo-section title="禁用" desc="整组 disabled / 单项 disabled">
      <demo-block direction="column" :gap="16">
        <ui-segmented v-model="value.d1" :options="basicOptions" disabled block />
        <ui-segmented v-model="value.d2" :options="disabledOptions" block />
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:图表周期" desc="日 / 周 / 月 / 年 切换">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.period" :options="periodOptions" block />
        <view class="chart-mock">
          <text class="chart-mock__text">{{ periodLabel }} 数据视图 (mock)</text>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:订单状态筛选" desc="scrollable 配合长选项">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.order" :options="orderStatusOptions" scrollable />
        <text class="demo-text">当前筛选: {{ orderLabel }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:视图切换" desc="列表 / 卡片 / 网格 (icon + outline)">
      <demo-block direction="column" :gap="12">
        <ui-segmented v-model="value.view" :options="viewOptions" type="outline" />
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-segmented
          v-model="value.event"
          :options="basicOptions"
          block
          @change="(v) => onEvent('change', v)"
          @click="(o, i) => onEvent('click', `${o.label}@${i}`)"
        />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { SegmentedOption } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Segmented 分段控制器" },
})

const basicOptions: SegmentedOption[] = [
  { label: "日", value: "daily" },
  { label: "周", value: "weekly" },
  { label: "月", value: "monthly" },
]
const typeOptions: SegmentedOption[] = [
  { label: "A", value: "a" },
  { label: "B", value: "b" },
  { label: "C", value: "c" },
]
const sizeOptions: SegmentedOption[] = [
  { label: "A", value: 1 },
  { label: "B", value: 2 },
  { label: "C", value: 3 },
]
const iconOptions: SegmentedOption[] = [
  { label: "列表", value: "list", icon: "todo-list-o" },
  { label: "条形", value: "bars", icon: "bars" },
  { label: "卡片", value: "card", icon: "card" },
]
const scrollOptions: SegmentedOption[] = [
  { label: "选项一", value: "option1" },
  { label: "选项二", value: "option2" },
  { label: "选项三", value: "option3" },
  { label: "选项四", value: "option4" },
  { label: "选项五", value: "option5" },
  { label: "选项六", value: "option6" },
  { label: "选项七", value: "option7" },
  { label: "选项八", value: "option8" },
]
const disabledOptions: SegmentedOption[] = [
  { label: "日", value: "daily" },
  { label: "周", value: "weekly" },
  { label: "月", value: "monthly", disabled: true },
]
const periodOptions: SegmentedOption[] = [
  { label: "日", value: "d" },
  { label: "周", value: "w" },
  { label: "月", value: "m" },
  { label: "年", value: "y" },
]
const orderStatusOptions: SegmentedOption[] = [
  { label: "全部", value: "all" },
  { label: "待付款", value: "unpaid" },
  { label: "待发货", value: "shipping" },
  { label: "待收货", value: "delivering" },
  { label: "待评价", value: "comment" },
  { label: "已完成", value: "done" },
  { label: "退款/售后", value: "refund" },
]
const viewOptions: SegmentedOption[] = [
  { label: "列表", value: "list", icon: "todo-list-o" },
  { label: "卡片", value: "card", icon: "card" },
  { label: "网格", value: "grid", icon: "bars" },
]

const value = reactive({
  basic: "daily",
  inline: "daily",
  tFilled: "a",
  tOutline: "a",
  tBlock: "a",
  r1: "daily",
  r2: "daily",
  r3: "daily",
  s1: 1,
  s2: 1,
  s3: 1,
  icon: "list",
  c1: "a",
  c2: "a",
  scroll: "option1",
  d1: "daily",
  d2: "weekly",
  period: "d",
  order: "all",
  view: "list",
  event: "daily",
})

const eventLog = ref("等待事件...")

const periodLabel = computed(() => periodOptions.find((o) => o.value === value.period)?.label ?? "")
const orderLabel = computed(() => orderStatusOptions.find((o) => o.value === value.order)?.label ?? "")

function onEvent(type: string, payload: unknown) {
  eventLog.value = `[${type}] ${payload}`
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.chart-mock {
  width: 100%;
  height: 160rpx;
  display: flex;
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-sm);
  justify-content: center;

  &__text {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
