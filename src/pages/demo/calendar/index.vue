<template>
  <demo-page>
    <!-- 单选模式 -->
    <demo-section title="单选模式">
      <demo-block>
        <ui-cell title="选择日期" :value="date1 || '请选择'" is-link @click="show1 = true" />
        <ui-calendar v-model:show="show1" title="选择日期" @confirm="onConfirm1" />
      </demo-block>
    </demo-section>

    <!-- 多选模式 -->
    <demo-section title="多选模式">
      <demo-block>
        <ui-cell title="选择多个日期" :value="date2 || '请选择'" is-link @click="show2 = true" />
        <ui-calendar v-model:show="show2" type="multiple" title="选择多个日期" @confirm="onConfirm2" />
      </demo-block>
    </demo-section>

    <!-- 范围选择 -->
    <demo-section title="范围选择">
      <demo-block>
        <ui-cell title="选择日期范围" :value="date3 || '请选择'" is-link @click="show3 = true" />
        <ui-calendar v-model:show="show3" type="range" title="选择日期范围" @confirm="onConfirm3" />
      </demo-block>
    </demo-section>

    <!-- 限制日期范围 -->
    <demo-section title="限制日期范围">
      <demo-block>
        <ui-cell title="限制可选范围" :value="date4 || '请选择'" is-link @click="show4 = true" />
        <ui-calendar v-model:show="show4" title="限制日期范围" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm4" />
      </demo-block>
    </demo-section>

    <!-- 自定义日期格式化 -->
    <demo-section title="自定义日期格式化">
      <demo-block>
        <ui-cell title="标记特殊日期" :value="date5 || '请选择'" is-link @click="show5 = true" />
        <ui-calendar v-model:show="show5" title="自定义格式化" :formatter="formatter" @confirm="onConfirm5" />
      </demo-block>
    </demo-section>

    <!-- 自定义主题色 -->
    <demo-section title="自定义主题色">
      <demo-block>
        <ui-cell title="自定义颜色" :value="date6 || '请选择'" is-link @click="show6 = true" />
        <ui-calendar v-model:show="show6" title="自定义颜色" color="#07c160" @confirm="onConfirm6" />
      </demo-block>
    </demo-section>

    <!-- 范围选择最大天数限制 -->
    <demo-section title="最大可选天数">
      <demo-block>
        <ui-cell title="最多选择 7 天" :value="date7 || '请选择'" is-link @click="show7 = true" />
        <ui-calendar v-model:show="show7" type="range" title="最多选择7天" :max-range="7" range-prompt="最多选择7天" @confirm="onConfirm7" @over-range="onOverRange" />
      </demo-block>
    </demo-section>

    <!-- 标记日期 -->
    <demo-section title="标记日期">
      <demo-block>
        <ui-cell title="带标记点" :value="date8 || '请选择'" is-link @click="show8 = true" />
        <ui-calendar v-model:show="show8" title="标记日期" :marked-dates="markedDates" @confirm="onConfirm8" />
      </demo-block>
    </demo-section>

    <!-- 内嵌模式 -->
    <demo-section title="内嵌模式">
      <demo-block>
        <ui-calendar :poppable="false" :show-confirm="false" @select="onSelect9" />
        <view class="selected-info">
          <text>已选日期: {{ date9 || "未选择" }}</text>
        </view>
      </demo-block>
    </demo-section>

    <!-- 显示月份水印 -->
    <demo-section title="月份水印">
      <demo-block>
        <ui-cell title="显示月份水印" :value="date10 || '请选择'" is-link @click="show10 = true" />
        <ui-calendar v-model:show="show10" title="月份水印" show-mark @confirm="onConfirm10" />
      </demo-block>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { CalendarDay, CalendarSelectData, CalendarConfirmData } from "@/uni_modules/uniapp-ui/ui-calendar"

definePage({
  style: { navigationBarTitleText: "Calendar 日历" },
})

// 单选模式
const show1 = ref(false)
const date1 = ref("")

function onConfirm1(data: CalendarConfirmData) {
  date1.value = data.dateStr as string
}

// 多选模式
const show2 = ref(false)
const date2 = ref("")

function onConfirm2(data: CalendarConfirmData) {
  const dates = data.dateStr as string[]
  date2.value = dates.length > 0 ? `已选择 ${dates.length} 个日期` : ""
}

// 范围选择
const show3 = ref(false)
const date3 = ref("")

function onConfirm3(data: CalendarConfirmData) {
  const range = data.dateStr as { start: string; end: string }
  date3.value = `${range.start} 至 ${range.end}`
}

// 限制日期范围
const show4 = ref(false)
const date4 = ref("")
const minDate = new Date()
const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后

function onConfirm4(data: CalendarConfirmData) {
  date4.value = data.dateStr as string
}

// 自定义日期格式化
const show5 = ref(false)
const date5 = ref("")

function formatter(day: CalendarDay): CalendarDay {
  const month = day.date.getMonth() + 1
  const date = day.date.getDate()

  // 标记每月的1号
  if (date === 1) {
    day.topInfo = "月初"
  }

  // 标记周末
  const weekday = day.date.getDay()
  if (weekday === 0 || weekday === 6) {
    day.bottomInfo = "休"
  }

  // 标记特定日期
  if (month === new Date().getMonth() + 1 && date === 15) {
    day.topInfo = "重要"
    day.className = "important-day"
  }

  return day
}

function onConfirm5(data: CalendarConfirmData) {
  date5.value = data.dateStr as string
}

// 自定义主题色
const show6 = ref(false)
const date6 = ref("")

function onConfirm6(data: CalendarConfirmData) {
  date6.value = data.dateStr as string
}

// 最大可选天数
const show7 = ref(false)
const date7 = ref("")

function onConfirm7(data: CalendarConfirmData) {
  const range = data.dateStr as { start: string; end: string }
  date7.value = `${range.start} 至 ${range.end}`
}

function onOverRange() {
  console.log("超过最大可选天数")
}

// 标记日期
const show8 = ref(false)
const date8 = ref("")

// 标记当月的几个日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, "0")
const markedDates = ref([`${year}-${month}-05`, `${year}-${month}-10`, `${year}-${month}-15`, `${year}-${month}-20`, `${year}-${month}-25`])

function onConfirm8(data: CalendarConfirmData) {
  date8.value = data.dateStr as string
}

// 内嵌模式
const date9 = ref("")

function onSelect9(data: CalendarSelectData) {
  date9.value = data.dateStr as string
}

// 月份水印
const show10 = ref(false)
const date10 = ref("")

function onConfirm10(data: CalendarConfirmData) {
  date10.value = data.dateStr as string
}
</script>

<style lang="scss" scoped>
.selected-info {
  padding: 24rpx 32rpx;
  margin-top: 16rpx;
  border-radius: 8rpx;
  background-color: var(--ui-color-background-secondary);

  text {
    color: var(--ui-color-text-secondary);
    font-size: 28rpx;
  }
}

:deep(.important-day) {
  .ui-calendar__day-top {
    color: #ee0a24 !important;
  }
}
</style>
