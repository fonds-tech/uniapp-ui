<template>
  <demo-page>
    <demo-section title="基础用法" desc="dot / icon 两种形状">
      <demo-block direction="column" :gap="20">
        <view class="row">
          <text class="row__label">dot</text>
          <ui-radio-group v-model="value.basicDot" :gap="24">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="row">
          <text class="row__label">icon</text>
          <ui-radio-group v-model="value.basicIcon" shape="icon" :gap="24">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="圆形 / 方形" desc="round 切换形状">
      <demo-block :cols="2" :gap="24">
        <ui-radio-group v-model="value.round" :gap="20">
          <ui-radio name="r" :round="true">圆形</ui-radio>
          <ui-radio name="s" :round="false">方形</ui-radio>
        </ui-radio-group>
        <ui-radio-group v-model="value.round" shape="icon" :gap="20">
          <ui-radio name="r" :round="true">圆形</ui-radio>
          <ui-radio name="s" :round="false">方形</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸" desc="iconSize 控制图标大小">
      <demo-block direction="column" :gap="16">
        <ui-radio-group v-model="value.size" :gap="24">
          <ui-radio v-for="s in sizeList" :key="s.value" :name="s.value" :icon-size="s.iconSize">{{ s.label }}</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="颜色" desc="color 改选中态色">
      <demo-block :cols="2" :gap="20">
        <ui-radio-group v-model="value.color" :gap="16">
          <ui-radio v-for="c in colorList" :key="c.value" :name="c.value" :color="c.color">{{ c.label }}</ui-radio>
        </ui-radio-group>
        <ui-radio-group v-model="value.color" shape="icon" :gap="16">
          <ui-radio v-for="c in colorList" :key="c.value" :name="c.value" :color="c.color">{{ c.label }}</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="禁用" desc="disabled 单项 / 整组">
      <demo-block direction="column" :gap="16">
        <ui-radio-group :model-value="'a'" :gap="20">
          <ui-radio name="a" disabled>已选禁用</ui-radio>
          <ui-radio name="b" disabled>未选禁用</ui-radio>
        </ui-radio-group>
        <ui-radio-group v-model="value.disabledGroup" disabled :gap="20">
          <ui-radio name="a">整组禁用 A</ui-radio>
          <ui-radio name="b">整组禁用 B</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="只读" desc="readonly 不可点击但视觉无禁用样式">
      <demo-block>
        <ui-radio-group :model-value="'a'" :gap="20">
          <ui-radio name="a" readonly>已选只读</ui-radio>
          <ui-radio name="b" readonly>未选只读</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="标签位置" desc="labelPosition 切换左右">
      <demo-block :cols="2" :gap="24">
        <ui-radio-group v-model="value.labelPos" :gap="20">
          <ui-radio name="r">标签在右</ui-radio>
        </ui-radio-group>
        <ui-radio-group v-model="value.labelPos" :gap="20" label-position="left">
          <ui-radio name="l">标签在左</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="标签禁点" desc="labelDisabled 标签不响应点击，仅图标可点">
      <demo-block>
        <ui-radio-group v-model="value.labelDisabled" :gap="20">
          <ui-radio name="a" label-disabled>仅图标可点 A</ui-radio>
          <ui-radio name="b" label-disabled>仅图标可点 B</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="排列方式" desc="水平 / 垂直 / 网格">
      <demo-block direction="column" :gap="20">
        <view class="row">
          <text class="row__label">水平</text>
          <ui-radio-group v-model="value.layoutH" :gap="24">
            <ui-radio name="a">A</ui-radio>
            <ui-radio name="b">B</ui-radio>
            <ui-radio name="c">C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="row">
          <text class="row__label">垂直</text>
          <ui-radio-group v-model="value.layoutV" vertical :gap="12">
            <ui-radio name="a">选项 A</ui-radio>
            <ui-radio name="b">选项 B</ui-radio>
            <ui-radio name="c">选项 C</ui-radio>
          </ui-radio-group>
        </view>
        <view class="row">
          <text class="row__label">网格 (3 列)</text>
          <ui-radio-group v-model="value.layoutG" :columns="3" :gap="12">
            <ui-radio name="a">A</ui-radio>
            <ui-radio name="b">B</ui-radio>
            <ui-radio name="c">C</ui-radio>
            <ui-radio name="d">D</ui-radio>
            <ui-radio name="e">E</ui-radio>
            <ui-radio name="f">F</ui-radio>
          </ui-radio-group>
        </view>
      </demo-block>
    </demo-section>

    <demo-section title="自定义图标" desc="icon slot 接管图标渲染">
      <demo-block>
        <ui-radio-group v-model="value.customIcon" :gap="24">
          <ui-radio name="like">
            <template #icon="{ checked }">
              <ui-icon :name="checked ? 'like' : 'like-o'" :color="checked ? '#ef4444' : 'text-tertiary'" size="40rpx" />
            </template>
            喜欢
          </ui-radio>
          <ui-radio name="star">
            <template #icon="{ checked }">
              <ui-icon :name="checked ? 'star' : 'star-o'" :color="checked ? '#f59e0b' : 'text-tertiary'" size="40rpx" />
            </template>
            收藏
          </ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:支付方式" desc="搭配 ui-cell 列表选择">
      <demo-block>
        <ui-cell-group :radius="12">
          <ui-radio-group v-model="value.pay" vertical>
            <ui-cell title="微信支付" icon="wechat">
              <template #right>
                <ui-radio name="wechat" />
              </template>
            </ui-cell>
            <ui-cell title="支付宝" icon="alipay">
              <template #right>
                <ui-radio name="alipay" />
              </template>
            </ui-cell>
            <ui-cell title="银联" icon="card">
              <template #right>
                <ui-radio name="bank" />
              </template>
            </ui-cell>
          </ui-radio-group>
        </ui-cell-group>
      </demo-block>
    </demo-section>

    <demo-section title="业务场景:套餐选择" desc="自定义内容 + 选中态样式">
      <demo-block>
        <ui-radio-group v-model="value.plan" vertical :gap="16">
          <ui-radio v-for="p in plans" :key="p.id" :name="p.id" :class="['plan', { 'plan--active': value.plan === p.id }]">
            <view class="plan__main">
              <text class="plan__name">{{ p.name }}</text>
              <text class="plan__desc">{{ p.desc }}</text>
            </view>
            <text class="plan__price">¥ {{ p.price }}</text>
          </ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>

    <demo-section title="事件回显">
      <demo-block direction="column" align="start" :gap="8">
        <text class="demo-text">{{ eventLog }}</text>
        <ui-radio-group v-model="value.event" :gap="24" @change="onChange">
          <ui-radio name="a">A</ui-radio>
          <ui-radio name="b">B</ui-radio>
          <ui-radio name="c">C</ui-radio>
        </ui-radio-group>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"

definePage({
  style: { navigationBarTitleText: "Radio 单选框" },
})

const toast = useToast()

const sizeList = [
  { label: "小 (24)", value: "s", iconSize: "24rpx" },
  { label: "中 (36)", value: "m", iconSize: "36rpx" },
  { label: "大 (48)", value: "l", iconSize: "48rpx" },
]
const colorList = [
  { label: "蓝", value: "blue", color: "#1989fa" },
  { label: "绿", value: "green", color: "#10b981" },
  { label: "红", value: "red", color: "#ef4444" },
  { label: "紫", value: "purple", color: "#8b5cf6" },
]
const plans = [
  { id: "basic", name: "基础版", desc: "10 GB 存储 · 1 设备", price: 9 },
  { id: "pro", name: "专业版", desc: "100 GB 存储 · 5 设备", price: 29 },
  { id: "team", name: "团队版", desc: "1 TB 存储 · 不限设备", price: 99 },
]

const value = reactive({
  basicDot: "a",
  basicIcon: "a",
  round: "r",
  size: "m",
  color: "blue",
  disabledGroup: "a",
  labelPos: "r",
  labelDisabled: "a",
  layoutH: "a",
  layoutV: "a",
  layoutG: "a",
  customIcon: "like",
  pay: "wechat",
  plan: "pro",
  event: "a",
})
const eventLog = ref("等待事件...")

function onChange(v: string | number) {
  eventLog.value = `[change] ${v}`
  toast.text(`选中: ${v}`)
}
</script>

<style lang="scss" scoped>
.demo-text {
  color: var(--ui-color-text-secondary);
  font-size: 24rpx;
}

.row {
  gap: 16rpx;
  width: 100%;
  display: flex;
  align-items: center;

  &__label {
    color: var(--ui-color-text-secondary);
    width: 140rpx;
    font-size: 22rpx;
    flex-shrink: 0;
  }
}

.plan {
  width: 100%;
  padding: 20rpx 24rpx;
  background: var(--ui-color-background-section);
  border: 2rpx solid transparent;
  border-radius: var(--ui-radius-md);

  &--active {
    border-color: var(--ui-color-primary);
    background: var(--ui-color-background);
  }

  &__main {
    gap: 4rpx;
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
</style>
