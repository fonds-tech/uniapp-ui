<template>
  <view class="page">
    <view class="search">
      <ui-search v-model="keyword" placeholder="搜索消息" background="background-section" radius="36rpx" />
    </view>

    <view class="tabs">
      <ui-tabs v-model="cate" type="card">
        <ui-tab v-for="c in cates" :key="c.value" :name="c.value" :title="c.label" />
      </ui-tabs>
    </view>

    <view v-if="filteredList.length">
      <ui-swipe-cell v-for="m in filteredList" :key="m.id">
        <ui-cell :title="m.name" :label="m.lastMsg">
          <template #icon>
            <ui-badge :value="m.unread" :show="m.unread > 0" :max="99">
              <ui-avatar :icon="m.systemIcon" :background="m.bg" size="96rpx" :custom-style="{ marginRight: 'var(--ui-spacing-md)' }" />
            </ui-badge>
          </template>
          <template #value>
            <text class="cell__time">{{ m.time }}</text>
          </template>
        </ui-cell>
        <template #right>
          <view class="swipe-act swipe-act--mute" @click="onMute(m)">
            <text class="swipe-act__text">免打扰</text>
          </view>
          <view class="swipe-act swipe-act--del" @click="onDelete(m)">
            <text class="swipe-act__text">删除</text>
          </view>
        </template>
      </ui-swipe-cell>
    </view>

    <ui-empty v-else description="暂无消息" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "消息" },
})

const toast = useToast()

const cates = [
  { label: "全部", value: "all" },
  { label: "系统", value: "system" },
  { label: "私信", value: "chat" },
]
const cate = ref("all")
const keyword = ref("")

const list = ref([
  { id: 1, name: "系统通知", lastMsg: "您的订单已发货，请注意查收快递信息", time: "10:24", unread: 3, type: "system", systemIcon: "bell", bg: "primary" },
  { id: 2, name: "活动消息", lastMsg: "双 11 大促开启，全场满 199 减 30", time: "昨天", unread: 1, type: "system", systemIcon: "gift", bg: "warning" },
  { id: 3, name: "客户服务", lastMsg: "您好，请问还有什么需要帮助？", time: "昨天", unread: 0, type: "chat", systemIcon: "user-o", bg: "primary" },
  { id: 4, name: "张三", lastMsg: "明天下午两点的会议改到三点了", time: "周日", unread: 0, type: "chat", systemIcon: "user-o", bg: "primary" },
  { id: 5, name: "李四", lastMsg: "项目文档已经更新", time: "上周", unread: 2, type: "chat", systemIcon: "user-o", bg: "primary" },
])

const filteredList = computed(() => {
  let result = cate.value === "all" ? list.value : list.value.filter((m) => m.type === cate.value)
  if (keyword.value) result = result.filter((m) => m.name.includes(keyword.value) || m.lastMsg.includes(keyword.value))
  return result
})

function onMute(m: { name: string }) {
  toast.success(`已免打扰 ${m.name}`)
}

function onDelete(m: { id: number }) {
  list.value = list.value.filter((x) => x.id !== m.id)
  toast.success("已删除")
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background);
  min-height: 100vh;
}

.search {
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
}

.tabs {
  padding: var(--ui-spacing-xs) var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-bottom: 1rpx solid var(--ui-color-border-light);
}

.cell__time {
  color: var(--ui-color-text-tertiary);
  font-size: var(--ui-font-size-xs);
}

.swipe-act {
  width: 140rpx;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &--mute {
    background: var(--ui-color-info);
  }

  &--del {
    background: var(--ui-color-danger);
  }

  &__text {
    color: var(--ui-color-text-inverse);
    font-size: var(--ui-font-size-sm);
  }
}
</style>
