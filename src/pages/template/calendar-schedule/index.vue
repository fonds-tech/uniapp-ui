<template>
  <view class="page">
    <view class="header">
      <view class="header__row">
        <text class="header__title">{{ currentMonth }}</text>
        <ui-segmented v-model="viewMode" :options="viewOptions" size="small" />
      </view>
      <view class="header__actions">
        <ui-button size="small" plain @click="onPickDate">选择日期</ui-button>
        <ui-button size="small" type="primary" @click="onAddEvent">新建日程</ui-button>
      </view>
    </view>

    <view class="calendar-wrap">
      <ui-calendar v-if="viewMode !== 'range'" v-model="selectedDate" :show-confirm="false" />
      <ui-date-range-picker v-else v-model="dateRange" @confirm="onRangeConfirm" />
    </view>

    <view class="events">
      <view class="events__head">
        <text class="events__title">{{ formattedDate }} 的日程</text>
        <ui-tag v-if="todayEvents.length" type="primary" plain>{{ todayEvents.length }} 项</ui-tag>
      </view>

      <ui-empty v-if="!todayEvents.length" description="今天没有日程" />

      <view v-else class="events__list">
        <view v-for="(e, idx) in todayEvents" :key="e.id" class="event">
          <view class="event__time">
            <text class="event__hour">{{ e.start }}</text>
            <text class="event__dur">{{ e.dur }}</text>
          </view>
          <view class="event__line">
            <view class="event__dot" :class="[`event__dot--${e.color}`]" />
            <view v-if="idx < todayEvents.length - 1" class="event__pipe" />
          </view>
          <view class="event__card" :class="[`event__card--${e.color}`]">
            <text class="event__title">{{ e.title }}</text>
            <view v-if="e.location" class="event__loc">
              <ui-icon name="location" size="24rpx" color="text-secondary" />
              <text class="event__loc-text">{{ e.location }}</text>
            </view>
            <view class="event__attendees">
              <ui-avatar-group :max-count="3">
                <ui-avatar v-for="a in e.attendees" :key="a" :background="a" size="40rpx" />
              </ui-avatar-group>
              <text class="event__attendee-count">{{ e.attendees.length }} 人参与</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <ui-popup v-model:show="showDatePopup" position="bottom" round>
      <ui-date-picker v-model="selectedDate" mode="date" @confirm="showDatePopup = false" @cancel="showDatePopup = false" />
    </ui-popup>

    <ui-action-sheet v-model:show="showAddSheet" title="新建日程" :actions="addActions" @select="onSelectType" />
  </view>
</template>

<script setup lang="ts">
import { useToast } from "@/uni_modules/uniapp-ui"
import { ref, computed } from "vue"

definePage({
  style: { navigationBarTitleText: "日历日程" },
})

const toast = useToast()

const viewOptions = [
  { label: "日", value: "day" },
  { label: "月", value: "month" },
  { label: "范围", value: "range" },
]
const viewMode = ref("month")
const dateRange = ref<[string, string]>(["", ""])

const now = new Date()
const selectedDate = ref(now.toISOString().slice(0, 10))
const currentMonth = computed(() => `${now.getFullYear()} 年 ${now.getMonth() + 1} 月`)
const formattedDate = computed(() => {
  const parts = selectedDate.value.split("-")
  return parts.length === 3 ? `${parts[1]}月${parts[2]}日` : selectedDate.value
})

const showDatePopup = ref(false)
const showAddSheet = ref(false)

const addActions = [
  { name: "工作会议" },
  { name: "个人事项" },
  { name: "提醒" },
]

type EventColor = "primary" | "warning" | "success"

const events = ref<{ id: number; date: string; start: string; dur: string; title: string; location: string; color: EventColor; attendees: string[] }[]>([
  { id: 1, date: selectedDate.value, start: "09:00", dur: "1h", title: "晨会同步", location: "会议室 A", color: "primary", attendees: ["primary", "warning", "success"] },
  { id: 2, date: selectedDate.value, start: "14:30", dur: "2h", title: "产品评审", location: "线上腾讯会议", color: "warning", attendees: ["primary", "danger"] },
  { id: 3, date: selectedDate.value, start: "18:00", dur: "1h", title: "团队聚餐", location: "公司楼下", color: "success", attendees: ["primary", "warning", "success", "danger", "info"] },
])

const todayEvents = computed(() => events.value.filter((e) => e.date === selectedDate.value))

function onRangeConfirm(range: [string, string]) {
  toast.success(`已选 ${range[0]} ~ ${range[1]}`)
}

function onPickDate() {
  showDatePopup.value = true
}

function onAddEvent() {
  showAddSheet.value = true
}

function onSelectType(action: { name: string }) {
  toast.success(`已新建: ${action.name}`)
}
</script>

<style lang="scss" scoped>
.page {
  background: var(--ui-color-background-page);
  min-height: 100vh;
}

.header {
  padding: var(--ui-spacing-lg) var(--ui-spacing-md);
  background: var(--ui-color-background);

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-lg);
    font-weight: var(--ui-font-weight-bold);
  }

  &__actions {
    gap: var(--ui-spacing-md);
    display: flex;
  }
}

.calendar-wrap {
  margin: var(--ui-spacing-md);
  overflow: hidden;
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);
}

.events {
  margin: var(--ui-spacing-md);
  padding: var(--ui-spacing-lg);
  background: var(--ui-color-background);
  border-radius: var(--ui-radius-lg);

  &__head {
    display: flex;
    align-items: center;
    margin-bottom: var(--ui-spacing-md);
    justify-content: space-between;
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-md);
    font-weight: var(--ui-font-weight-bold);
  }

  &__list {
    gap: var(--ui-spacing-md);
    display: flex;
    flex-direction: column;
  }
}

.event {
  gap: var(--ui-spacing-md);
  display: flex;

  &__time {
    gap: var(--ui-spacing-xxs);
    width: 120rpx;
    display: flex;
    flex-direction: column;
  }

  &__hour {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-bold);
  }

  &__dur {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }

  &__line {
    width: 20rpx;
    display: flex;
    position: relative;
    align-items: center;
    flex-direction: column;
  }

  &__dot {
    width: 16rpx;
    height: 16rpx;
    margin-top: var(--ui-spacing-xs);
    border-radius: var(--ui-radius-round);

    &--primary {
      background: var(--ui-color-primary);
    }

    &--warning {
      background: var(--ui-color-warning);
    }

    &--success {
      background: var(--ui-color-success);
    }
  }

  &__pipe {
    flex: 1;
    width: 2rpx;
    background: var(--ui-color-border-light);
  }

  &__card {
    gap: var(--ui-spacing-xs);
    flex: 1;
    display: flex;
    padding: var(--ui-spacing-md);
    background: var(--ui-color-background-section);
    border-left: 6rpx solid transparent;
    border-radius: var(--ui-radius-md);
    flex-direction: column;

    &--primary {
      border-left-color: var(--ui-color-primary);
    }

    &--warning {
      border-left-color: var(--ui-color-warning);
    }

    &--success {
      border-left-color: var(--ui-color-success);
    }
  }

  &__title {
    color: var(--ui-color-text);
    font-size: var(--ui-font-size-sm);
    font-weight: var(--ui-font-weight-normal);
  }

  &__loc {
    gap: var(--ui-spacing-xxs);
    display: flex;
    align-items: center;
  }

  &__loc-text {
    color: var(--ui-color-text-secondary);
    font-size: var(--ui-font-size-xs);
  }

  &__attendees {
    gap: var(--ui-spacing-sm);
    display: flex;
    align-items: center;
  }

  &__attendee-count {
    color: var(--ui-color-text-tertiary);
    font-size: var(--ui-font-size-xs);
  }
}
</style>
