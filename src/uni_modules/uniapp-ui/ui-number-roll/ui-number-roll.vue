<template>
  <view class="ui-number-roll" :style="[style]">
    <view v-for="(column, index) in columns" :key="index" class="ui-number-roll__column" :style="[columnStyle(index)]">
      <text v-for="(v, valueIndex) in column" :key="valueIndex" class="ui-number-roll__row" :style="[columnItemStyle]">{{ v }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onMounted, onUpdated, ref, watch } from "vue"

import { formatDigit } from "../utils/format"
import { numberRollProps, useNumberRollProps } from "./index"
import { useRect, useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-number-roll" })

const props = defineProps(numberRollProps)
const useProps = useNumberRollProps(props)

const instance = getCurrentInstance()
const isInit = ref(false)
const height = ref("auto")
const indexs = ref([])
const columns = ref([])
const arab = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const style = computed(() => {
  const style: any = {}
  style.height = useProps.fontSize ? useUnit(useProps.fontSize) : `${height.value}px`
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})
const columnStyle = computed(() => {
  return (index: number) => {
    const style: any = {}
    const h = useProps.fontSize ? useUnit(useProps.fontSize) : `${height.value}px`
    style.transform = `translate3d(0, calc(${indexs.value[index]} * ${h} * -1), 0)`
    style.transitionTimingFunction = useProps.timingFunction
    if (useProps.duration) style.transitionDuration = `${useProps.duration}ms`
    return useStyle(style)
  }
})
const columnItemStyle = computed(() => {
  const style: any = {}
  style.color = useColor(useProps.color)
  style.height = useProps.fontSize ? useUnit(useProps.fontSize) : `${height.value}px`
  style.fontSize = useProps.fontSize ? useUnit(useProps.fontSize) : `${height.value}px`
  style.lineHeight = useProps.fontSize ? useUnit(useProps.fontSize) : `${height.value}px`
  style.fontWeight = useProps.fontWeight
  return useStyle(style)
})

watch(() => useProps.value, resize)

async function resize() {
  await nextTick()
  let value: string | number = Number(isInit.value ? useProps.value : 0)
  value = formatDigit(value, { decimalPlaces: useProps.decimalPlaces, trimZero: useProps.trimZero, thousandsSep: useProps.thousandsSep })
  const formatValueArr = String(value).split("")
  columns.value = formatValueArr.map((val) => (~arab.indexOf(val) ? arab : [val]))
  indexs.value = formatValueArr
    .reverse()
    .map((val) => (~arab.indexOf(val) ? Number(val) : 0))
    .reverse()

  initRect()
  if (!isInit.value) {
    isInit.value = true
    resize()
  }
}

function initRect() {
  useRect(".ui-number-roll", instance).then((rect: any) => {
    height.value = rect.height
  })
}

onMounted(() => resize())
onUpdated(() => initRect())
defineExpose({ name: "ui-number-roll" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-number-roll {
  display: inline-flex;
  overflow: hidden;

  &__column {
    transition-duration: 1.2s;
    transition-property: transform;
    transition-timing-function: ease-out;
  }

  &__row {
    color: inherit;
    display: flex;
    font-size: inherit;
    transition: all 0.3s ease-out;
    font-weight: inherit;
    justify-content: center;
  }
}
</style>
