<template>
  <view class="page">
    <view class="search">
      <ui-search v-model="keyword" placeholder="搜索联系人" background="background-section" radius="36rpx" />
    </view>

    <ui-sticky :offset-top="0">
      <view v-if="!keyword" class="quick-bar">
        <view v-for="q in quickEntries" :key="q.label" class="quick-bar__item" @click="onQuickClick(q)">
          <view class="quick-bar__icon" :class="[`quick-bar__icon--${q.color}`]">
            <ui-icon :name="q.icon" size="40rpx" :color="q.color" />
          </view>
          <text class="quick-bar__label">{{ q.label }}</text>
        </view>
      </view>
    </ui-sticky>

    <ui-index-bar v-if="filteredGroups.length" :index-list="indexList" :sticky="true" :sticky-offset-top="60">
      <view v-for="group in filteredGroups" :key="group.letter">
        <ui-index-anchor :index="group.letter" />
        <ui-cell v-for="c in group.contacts" :key="c.id" @click="onClickContact(c)">
          <template #icon>
            <ui-avatar :background="c.bg" :text="c.name.charAt(0)" size="80rpx" :custom-style="{ marginRight: 'var(--ui-spacing-md)' }" />
          </template>
          <template #title>
            <ui-text-highlight :text="c.name" :match="keyword" highlight-color="primary" font-weight="bold" />
          </template>
          <template #label>
            <ui-text :text="c.role" color="text-secondary" size="24rpx" />
          </template>
          <template #value>
            <view class="hit" @click.stop="onCall(c)">
              <ui-icon name="phone" size="32rpx" color="primary" />
            </view>
          </template>
        </ui-cell>
      </view>
    </ui-index-bar>

    <ui-empty v-else :description="`没有找到「${keyword}」相关联系人`" />

    <ui-back-top :scroll-top="100" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "通讯录" },
})

const toast = useToast()

const keyword = ref("")

const quickEntries = [
  { label: "新朋友", icon: "user-o", color: "primary" },
  { label: "群聊", icon: "user-circle-o", color: "success" },
  { label: "标签", icon: "coupon", color: "warning" },
  { label: "公众号", icon: "shop", color: "info" },
]

const allContacts = [
  { id: 1, name: "阿琴", letter: "A", role: "产品经理", bg: "primary" },
  { id: 2, name: "阿强", letter: "A", role: "运营", bg: "warning" },
  { id: 3, name: "白雪", letter: "B", role: "设计师", bg: "danger" },
  { id: 4, name: "陈明", letter: "C", role: "前端工程师", bg: "success" },
  { id: 5, name: "陈晓", letter: "C", role: "测试", bg: "primary" },
  { id: 6, name: "李刚", letter: "L", role: "后端工程师", bg: "warning" },
  { id: 7, name: "李响", letter: "L", role: "项目经理", bg: "danger" },
  { id: 8, name: "王红", letter: "W", role: "HR", bg: "success" },
  { id: 9, name: "王明", letter: "W", role: "CEO", bg: "primary" },
  { id: 10, name: "张三", letter: "Z", role: "前端工程师", bg: "warning" },
  { id: 11, name: "周杰", letter: "Z", role: "市场", bg: "danger" },
]

const filteredGroups = computed(() => {
  const list = keyword.value ? allContacts.filter((c) => c.name.includes(keyword.value)) : allContacts
  const groups: Record<string, typeof allContacts> = {}
  list.forEach((c) => {
    if (!groups[c.letter]) groups[c.letter] = []
    groups[c.letter].push(c)
  })
  return Object.keys(groups).sort().map((letter) => ({ letter, contacts: groups[letter] }))
})

const indexList = computed(() => filteredGroups.value.map((g) => g.letter))

function onQuickClick(q: { label: string }) {
  toast.text(q.label)
}

function onClickContact(c: { name: string }) {
  toast.text(`查看: ${c.name}`)
}

function onCall(c: { name: string }) {
  toast.success(`呼叫 ${c.name}`)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background);
  min-height: 100vh;
}

.search {
  padding: var(--ui-spacing-md);
}

.quick-bar {
  display: flex;
  padding: var(--ui-spacing-md);
  background: var(--ui-color-background);
  border-top: 1rpx solid var(--ui-color-border-light);
  border-bottom: 1rpx solid var(--ui-color-border-light);
  justify-content: space-around;

  &__item {
    gap: var(--ui-spacing-xs);
    display: flex;
    padding: var(--ui-spacing-xs);
    align-items: center;
    flex-direction: column;
  }

  &__icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-radius: var(--ui-radius-md);
    justify-content: center;

    &--primary {
      background: var(--ui-color-primary-light);
    }

    &--success {
      background: var(--ui-color-success-light);
    }

    &--warning {
      background: var(--ui-color-warning-light);
    }

    &--info {
      background: var(--ui-color-info-light);
    }
  }

  &__label {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }
}

.hit {
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
