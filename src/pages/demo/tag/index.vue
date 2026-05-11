<template>
  <demo-page>
    <demo-section title="基础用法" desc="5 种主题色">
      <demo-block :gap="12" wrap>
        <ui-tag v-for="t in types" :key="t" :type="t" :text="typeLabels[t]" />
      </demo-block>
    </demo-section>

    <demo-section title="镂空 plain" desc="白底彩边">
      <demo-block :gap="12" wrap>
        <ui-tag v-for="t in types" :key="t" :type="t" plain :text="typeLabels[t]" />
      </demo-block>
    </demo-section>

    <demo-section title="圆角 round" desc="胶囊样式">
      <demo-block :gap="12" wrap>
        <ui-tag v-for="t in types" :key="t" :type="t" round :text="typeLabels[t]" />
      </demo-block>
    </demo-section>

    <demo-section title="带图标 icon" desc="左侧图标">
      <demo-block :gap="12" wrap>
        <ui-tag type="primary" icon="star-o" text="收藏" />
        <ui-tag type="success" icon="checked" text="已完成" />
        <ui-tag type="warning" icon="time" text="进行中" />
        <ui-tag type="danger" icon="cross" text="已删除" />
      </demo-block>
    </demo-section>

    <demo-section title="可关闭 closeable" desc="点击 × 移除">
      <demo-block direction="column" :gap="16">
        <demo-block :gap="12" wrap>
          <ui-tag v-for="(t, i) in closeableTags" :key="i" v-model:show="t.show" :type="t.type" closeable :text="t.text" />
        </demo-block>
        <ui-button size="small" type="primary" @click="resetTags">重置</ui-button>
      </demo-block>
    </demo-section>

    <demo-section title="尺寸切换" desc="文字大小 + padding 切换">
      <demo-block direction="column" :gap="16">
        <ui-tag type="primary" :text-size="sizeDemo.text" :padding="sizeDemo.padding" text="尺寸演示" />
        <demo-block :cols="3" :gap="12">
          <ui-button v-for="(s, i) in sizePresets" :key="i" size="small" :type="sizeDemo === s ? 'primary' : 'default'" @click="sizeDemo = s">
            {{ s.label }}
          </ui-button>
        </demo-block>
      </demo-block>
    </demo-section>

    <demo-section title="自定义颜色 / 边框 / 圆角" desc="精细化样式">
      <demo-block :gap="12" wrap>
        <ui-tag background="#7232dd" text-color="text-inverse" text="紫色" />
        <ui-tag background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" text-color="text-inverse" text="渐变" />
        <ui-tag plain border-color="primary" text-color="primary" border-width="2rpx" text="加粗边框" />
        <ui-tag type="primary" border-radius="0" text="直角" />
        <ui-tag type="success" border-radius="16rpx" text="大圆角" />
      </demo-block>
    </demo-section>

    <demo-section title="事件回显" desc="click / close / update:show 实时日志">
      <demo-block direction="column" :gap="12">
        <demo-block :gap="12" wrap>
          <ui-tag v-model:show="eventTag.show" type="primary" closeable text="点我 / 关闭我" @click="onClick" @close="onClose" @update:show="onUpdate" />
          <ui-button v-if="!eventTag.show" size="small" @click="eventTag.show = true">恢复</ui-button>
        </demo-block>
        <text class="event-log">{{ eventLog }}</text>
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 技能标签云" desc="wrap 自动换行 + 多色搭配">
      <demo-block :gap="12" wrap>
        <ui-tag v-for="(skill, i) in skills" :key="skill" :type="skillTypes[i % skillTypes.length]" plain round :text="skill" />
      </demo-block>
    </demo-section>

    <demo-section title="综合 · 商品筛选" desc="可关闭筛选条件">
      <view class="filter">
        <text class="filter__title">已选筛选：</text>
        <ui-tag v-for="(f, i) in filters" :key="f.key" v-model:show="f.show" type="primary" plain closeable :text="f.label" @close="onFilterClose(i)" />
        <text v-if="filters.every((f) => !f.show)" class="filter__empty">暂无筛选条件</text>
      </view>
    </demo-section>

    <demo-section title="综合 · 订单状态" desc="不同状态对应不同 type">
      <demo-block direction="column" :gap="16">
        <view v-for="order in orders" :key="order.id" class="order-row">
          <view class="order-row__info">
            <text class="order-row__id">订单 #{{ order.id }}</text>
            <text class="order-row__amount">¥{{ order.amount }}</text>
          </view>
          <ui-tag :type="statusMap[order.status].type" :icon="statusMap[order.status].icon" :text="statusMap[order.status].label" />
        </view>
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { TagType } from "@/uni_modules/uniapp-ui/ui-tag"
import { ref, reactive } from "vue"

definePage({
  style: { navigationBarTitleText: "Tag 标签" },
})

const types: TagType[] = ["primary", "success", "warning", "danger", "info"]
const typeLabels: Record<TagType, string> = {
  primary: "主要",
  success: "成功",
  warning: "警告",
  danger: "危险",
  info: "信息",
}

const closeableTags = reactive([
  { type: "primary" as TagType, text: "前端", show: true },
  { type: "success" as TagType, text: "后端", show: true },
  { type: "warning" as TagType, text: "测试", show: true },
  { type: "danger" as TagType, text: "运维", show: true },
])
function resetTags() {
  closeableTags.forEach((t) => (t.show = true))
}

const sizePresets = [
  { label: "小号", text: "20rpx", padding: "4rpx 8rpx" },
  { label: "默认", text: "24rpx", padding: "6rpx 12rpx" },
  { label: "大号", text: "28rpx", padding: "8rpx 16rpx" },
]
const sizeDemo = ref(sizePresets[1])

const eventTag = reactive({ show: true })
const eventLog = ref("等待事件...")
function onClick() {
  eventLog.value = "[click] 点击 tag"
}
function onClose() {
  eventLog.value = "[close] 关闭 tag"
}
function onUpdate(show: boolean) {
  eventLog.value = `[update:show] show=${show}`
}

const skills = ["Vue", "React", "TypeScript", "Vite", "Node.js", "Python", "Go", "Rust", "Docker", "K8s", "Redis", "MySQL"]
const skillTypes: TagType[] = ["primary", "success", "warning", "danger", "info"]

const filters = reactive([
  { key: "price", label: "100-500 元", show: true },
  { key: "brand", label: "苹果", show: true },
  { key: "ship", label: "包邮", show: true },
  { key: "rate", label: "好评率 95%+", show: true },
])
function onFilterClose(i: number) {
  console.log("filter removed", filters[i].key)
}

const statusMap = {
  pending: { type: "warning" as TagType, icon: "time", label: "待付款" },
  paid: { type: "primary" as TagType, icon: "checked", label: "已支付" },
  shipped: { type: "success" as TagType, icon: "logistics", label: "已发货" },
  cancel: { type: "danger" as TagType, icon: "cross", label: "已取消" },
}

const orders = [
  { id: "20240101", amount: 199.0, status: "pending" as keyof typeof statusMap },
  { id: "20240102", amount: 388.0, status: "paid" as keyof typeof statusMap },
  { id: "20240103", amount: 98.0, status: "shipped" as keyof typeof statusMap },
  { id: "20240104", amount: 256.0, status: "cancel" as keyof typeof statusMap },
]
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

.filter {
  gap: var(--ui-spacing-xs);
  display: flex;
  padding: var(--ui-spacing-md);
  flex-wrap: wrap;
  background: var(--ui-color-background-section);
  align-items: center;
  border-radius: var(--ui-radius-md);

  &__title {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-sm);
    margin-right: var(--ui-spacing-xxs);
  }

  &__empty {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}

.order-row {
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  align-items: center;
  border-bottom: var(--ui-border-width-thin) solid var(--ui-color-border-light);
  justify-content: space-between;

  &__info {
    gap: var(--ui-spacing-xxs);
    display: flex;
    flex-direction: column;
  }

  &__id {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
  }

  &__amount {
    color: var(--ui-color-danger);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }
}
</style>
