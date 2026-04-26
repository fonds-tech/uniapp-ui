<template>
  <ui-popup
    v-if="props.poppable"
    :show="props.show"
    mode="bottom"
    :border-radius="props.borderRadius"
    :close-on-click-overlay="props.closeOnClickOverlay"
    :z-index="props.zIndex"
    :safe-area-inset-bottom="props.safeAreaInsetBottom"
    @update:show="onUpdateShow"
    @open="emits('open')"
    @opened="emits('opened')"
    @close="emits('close')"
    @closed="emits('closed')"
    @click-overlay="emits('clickOverlay')"
  >
    <ui-calendar-panel
      ref="panelRef"
      v-bind="panelProps"
      @select="emits('select', $event)"
      @confirm="onConfirm"
      @month-change="emits('monthChange', $event)"
      @over-range="emits('overRange')"
      @close="onClose"
    />
  </ui-popup>

  <ui-calendar-panel
    v-else
    ref="panelRef"
    v-bind="panelProps"
    @select="emits('select', $event)"
    @confirm="emits('confirm', $event)"
    @month-change="emits('monthChange', $event)"
    @over-range="emits('overRange')"
  />
</template>

<script setup lang="ts">
import type { CalendarConfirmData } from "./index"
import UiPopup from "../ui-popup/ui-popup.vue"
import UiCalendarPanel from "../ui-calendar-panel/ui-calendar-panel.vue"
import { ref, computed } from "vue"
import { calendarEmits, calendarProps } from "./index"

defineOptions({ name: "ui-calendar" })

const props = defineProps(calendarProps)
const emits = defineEmits(calendarEmits)

const panelRef = ref<InstanceType<typeof UiCalendarPanel>>()

const panelProps = computed(() => ({
  type: props.type,
  title: props.title,
  minDate: props.minDate,
  maxDate: props.maxDate,
  defaultDate: props.defaultDate,
  formatter: props.formatter,
  showConfirm: props.showConfirm,
  confirmText: props.confirmText,
  confirmDisabledText: props.confirmDisabledText,
  showTitle: props.showTitle,
  showSubtitle: props.showSubtitle,
  firstDayOfWeek: props.firstDayOfWeek,
  readonly: props.readonly,
  maxRange: props.maxRange,
  rangePrompt: props.rangePrompt,
  color: props.color,
  showMark: props.showMark,
  closeable: props.poppable && props.closeable,
  markedDates: props.markedDates,
  customStyle: props.customStyle,
  customClass: props.customClass,
}))

function onConfirm(data: CalendarConfirmData) {
  emits("confirm", data)
  if (props.poppable) {
    emits("update:show", false)
  }
}

function onClose() {
  emits("update:show", false)
}

function onUpdateShow(show: boolean) {
  emits("update:show", show)
}

function reset() {
  panelRef.value?.reset()
}

function goToToday() {
  panelRef.value?.goToToday()
}

function goToDate(date: Date | string) {
  panelRef.value?.goToDate(date)
}

function selectDate(date: string) {
  panelRef.value?.selectDate(date)
}

function clearSelection() {
  panelRef.value?.clearSelection()
}

defineExpose({
  reset,
  goToToday,
  goToDate,
  selectDate,
  clearSelection,
})
</script>

<script lang="ts">
export default {
  name: "ui-calendar",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>
