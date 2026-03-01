<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-cell title="选择日期" padding="0" :value="displayValue(date1)" is-link @click="show1 = true" />
      <ui-date-picker v-model="date1" v-model:show="show1" title="选择日期" />
    </demo-section>

    <demo-section title="选择年月">
      <ui-cell title="选择年月" padding="0" :value="displayValue(date2)" is-link @click="show2 = true" />
      <ui-date-picker v-model="date2" v-model:show="show2" title="选择年月" :columns="['year', 'month']" format="YYYY-MM" />
    </demo-section>

    <demo-section title="选择时间">
      <ui-cell title="选择时间" padding="0" :value="displayValue(date3)" is-link @click="show3 = true" />
      <ui-date-picker v-model="date3" v-model:show="show3" title="选择时间" :columns="['hour', 'minute']" format="HH:mm" />
    </demo-section>

    <demo-section title="完整日期时间">
      <ui-cell title="日期时间" padding="0" :value="displayValue(date4)" is-link @click="show4 = true" />
      <ui-date-picker v-model="date4" v-model:show="show4" title="选择日期时间" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
    </demo-section>

    <demo-section title="限制日期范围">
      <ui-cell title="选择日期" padding="0" :value="displayValue(date5)" is-link @click="show5 = true" />
      <ui-date-picker v-model="date5" v-model:show="show5" title="选择日期" :min-date="minDate" :max-date="maxDate" />
    </demo-section>

    <demo-section title="自定义选项文案">
      <ui-cell title="中文年月日" padding="0" :value="displayValue(date6)" is-link @click="show6 = true" />
      <ui-date-picker v-model="date6" v-model:show="show6" title="自定义文案" :columns="['year', 'month', 'day']" format="YYYY-MM-DD" :column-formatter="columnFormatter" />
    </demo-section>

    <demo-section title="选项过滤">
      <ui-cell title="偶数年份+季度月份" padding="0" :value="displayValue(date7)" is-link @click="show7 = true" />
      <ui-date-picker
        v-model="date7"
        v-model:show="show7"
        title="过滤选项"
        :columns="['year', 'month', 'day']"
        format="YYYY-MM-DD"
        :min-date="filterMinDate"
        :max-date="filterMaxDate"
        :column-filter="columnFilter"
      />
    </demo-section>

    <demo-section title="样式定制">
      <ui-cell title="字号/颜色/高度" padding="0" :value="displayValue(date9)" is-link @click="show9 = true" />
      <ui-date-picker
        v-model="date9"
        v-model:show="show9"
        title="样式定制"
        :columns="['year', 'month', 'day']"
        format="YYYY-MM-DD"
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
      <ui-cell title="查看事件输出" padding="0" :value="displayValue(date10)" is-link @click="show10 = true" />
      <ui-date-picker
        v-model="date10"
        v-model:show="show10"
        title="事件演示"
        :columns="['year', 'month', 'day', 'hour', 'minute']"
        format="YYYY-MM-DD HH:mm"
        @change="onChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
      <view class="event-list">
        <view v-for="(log, index) in eventLogs" :key="index" class="event-item">
          <text class="event-text">{{ log }}</text>
        </view>
      </view>
    </demo-section>
  </demo-page>
</template>

<script setup lang="ts">
definePage({
  style: { navigationBarTitleText: "DatePicker 日期选择" },
})

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const show6 = ref(false)
const show7 = ref(false)
const show9 = ref(false)
const show10 = ref(false)

const date1 = ref("")
const date2 = ref("")
const date3 = ref("")
const date4 = ref("")
const date5 = ref("")
const date6 = ref("")
const date7 = ref("")
const date9 = ref("")
const date10 = ref("")

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 11, 31)
const filterMinDate = "2020-01-01"
const filterMaxDate = "2030-12-31"
const eventLogs = ref<string[]>([])

function displayValue(value: string) {
  return value || "请选择"
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

function addEventLog(text: string) {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${time}] ${text}`)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

function onChange(data: { value: string }) {
  addEventLog(`change: ${data.value}`)
}

function onConfirm(data: { value: string }) {
  addEventLog(`confirm: ${data.value}`)
}

function onCancel(data: { value: string }) {
  addEventLog(`cancel: ${data.value}`)
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
