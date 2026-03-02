<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-cell title="选择日期范围" padding="0" :value="formatRange(value1)" @click="show1 = true" />
      <ui-date-range-picker v-model:show="show1" v-model="value1" title="选择日期范围" />
    </demo-section>

    <demo-section title="激活侧与自动切换">
      <ui-cell title="先选结束日期，不自动切换" padding="0" :value="formatRange(value2)" @click="show2 = true" />
      <ui-date-range-picker v-model:show="show2" v-model="value2" active-type="end" :auto-switch-to-end="false" title="结束日期优先" />
    </demo-section>

    <demo-section title="选择日期时间">
      <ui-cell title="选择时间范围" padding="0" :value="formatRange(value3)" @click="show3 = true" />
      <ui-date-range-picker v-model:show="show3" v-model="value3" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" title="选择日期时间范围" />
    </demo-section>

    <demo-section title="范围限制与选项处理">
      <ui-cell title="偶数年份 + 季度月份" padding="0" :value="formatRange(value4)" @click="show4 = true" />
      <ui-date-range-picker
        v-model:show="show4"
        v-model="value4"
        :columns="['year', 'month', 'day']"
        format="YYYY-MM-DD"
        min-date="2024-01-01"
        max-date="2030-12-31"
        :column-filter="columnFilter"
        :column-formatter="columnFormatter"
        title="选项过滤与格式化"
      />
    </demo-section>

    <demo-section title="头部与文案">
      <ui-cell title="占位/按钮文案" padding="0" :value="formatRange(value6)" @click="show6 = true" />
      <ui-date-range-picker
        v-model:show="show6"
        v-model="value6"
        title="请选择出行区间"
        start-placeholder="出发日期"
        end-placeholder="返程日期"
        cancel-text="先不选"
        confirm-text="确定区间"
      />
    </demo-section>

    <demo-section title="列样式">
      <ui-cell title="列高/可见项/字号颜色" padding="0" :value="formatRange(value7)" @click="show7 = true" />
      <ui-date-range-picker
        v-model:show="show7"
        v-model="value7"
        title="样式定制"
        column-height="100rpx"
        :visible-column-num="7"
        column-size="24rpx"
        column-color="#94a3b8"
        column-weight="400"
        active-column-size="32rpx"
        active-column-color="#0f766e"
        active-column-weight="700"
      />
    </demo-section>

    <demo-section title="事件回调">
      <ui-cell title="查看事件输出" padding="0" :value="formatRange(value9)" @click="show9 = true" />
      <ui-date-range-picker v-model:show="show9" v-model="value9" title="事件示例" @change="onChange" @confirm="onConfirm" @cancel="onCancel" />
      <view v-if="eventLogs.length > 0" class="event-list">
        <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
          <text class="event-text">{{ log }}</text>
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
import type { DateRangePickerValue, DateRangePickerCancelData, DateRangePickerChangeData, DateRangePickerConfirmData } from "@/uni_modules/uniapp-ui/ui-date-range-picker"

definePage({
  style: { navigationBarTitleText: "DateRangePicker 日期范围选择" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show9 = ref(false)

const value1 = ref<DateRangePickerValue>([])
const value2 = ref<DateRangePickerValue>([])
const value3 = ref<DateRangePickerValue>([])
const value4 = ref<DateRangePickerValue>([])
const value6 = ref<DateRangePickerValue>([])
const value7 = ref<DateRangePickerValue>([])
const value9 = ref<DateRangePickerValue>([])

const eventLogs = ref<string[]>([])

function formatRange(value: DateRangePickerValue) {
  if (!value || value.length < 2) return "请选择"
  return `${value[0]} 至 ${value[1]}`
}

function addEventLog(text: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${text}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

function columnFormatter(type: string, option: { text: string; value: string }) {
  const suffixMap: Record<string, string> = {
    year: "年",
    month: "月",
    day: "日",
    hour: "时",
    minute: "分",
    second: "秒",
  }

  return {
    ...option,
    text: `${option.text}${suffixMap[type] ?? ""}`,
  }
}

function columnFilter(type: string, options: Array<{ text: string; value: string }>) {
  if (type === "year") {
    return options.filter((item) => Number(item.value) % 2 === 0)
  }
  if (type === "month") {
    return options.filter((item) => [3, 6, 9, 12].includes(Number(item.value)))
  }
  return options
}

function onChange(data: DateRangePickerChangeData) {
  addEventLog(`change: ${data.type} = ${data.value}`)
}

function onConfirm(data: DateRangePickerConfirmData) {
  addEventLog(`confirm: ${data.startValue} ~ ${data.endValue}`)
}

function onCancel(data: DateRangePickerCancelData) {
  addEventLog(`cancel: ${data.range.length ? "保留已选区间" : "空区间"}`)
}
</script>

<style lang="scss" scoped>
.event-list {
  padding: 16rpx;
  background: var(--ui-color-background-page);
  margin-top: 16rpx;
  border-radius: 8rpx;
}

.event-item {
  padding: 8rpx 0;
  border-bottom: 1rpx solid var(--ui-color-border-light);

  &:last-child {
    border-bottom: none;
  }
}

.event-text {
  color: var(--ui-color-text-secondary);
  font-size: 22rpx;
}
</style>
