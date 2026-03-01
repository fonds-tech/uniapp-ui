<template>
  <demo-page>
    <demo-section title="基础用法">
      <ui-cell title="选择日期" padding="0" :value="date1" is-link @click="show1 = true" />
      <ui-date-picker v-model="date1" v-model:show="show1" title="选择日期" />
    </demo-section>

    <demo-section title="选择年月">
      <ui-cell title="选择年月" padding="0" :value="date2" is-link @click="show2 = true" />
      <ui-date-picker v-model="date2" v-model:show="show2" title="选择年月" :columns="['year', 'month']" format="YYYY-MM" />
    </demo-section>

    <demo-section title="选择时间">
      <ui-cell title="选择时间" padding="0" :value="date3" is-link @click="show3 = true" />
      <ui-date-picker v-model="date3" v-model:show="show3" title="选择时间" :columns="['hour', 'minute']" format="HH:mm" />
    </demo-section>

    <demo-section title="完整日期时间">
      <ui-cell title="日期时间" padding="0" :value="date4" is-link @click="show4 = true" />
      <ui-date-picker v-model="date4" v-model:show="show4" title="选择日期时间" :columns="['year', 'month', 'day', 'hour', 'minute']" format="YYYY-MM-DD HH:mm" />
    </demo-section>

    <demo-section title="限制日期范围">
      <ui-cell title="选择日期" padding="0" :value="date5" is-link @click="show5 = true" />
      <ui-date-picker v-model="date5" v-model:show="show5" title="选择日期" :min-date="minDate" :max-date="maxDate" />
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

const date1 = ref("请选择")
const date2 = ref("请选择")
const date3 = ref("请选择")
const date4 = ref("请选择")
const date5 = ref("请选择")

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 11, 31)
</script>
