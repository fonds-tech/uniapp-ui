<template>
  <view
    class="ui-rate"
    :class="[classes, customClass]"
    :style="[style]"
    @click="onClick"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
  >
    <view v-for="(item, index) in list" :key="index" class="ui-rate__item" :style="[itemStyle(index)]">
      <view class="ui-rate__item__icon">
        <ui-icon :name="icon(item)" :size="size" :weight="iconWeight" :color="iconColor(item)" />
      </view>
      <view v-if="isShowHalf(item)" class="ui-rate__item__icon ui-rate__item__icon--half" :style="[iconHalfStyle(item, index)]">
        <ui-icon :name="useProps.icon" :size="size" :weight="iconWeight" :color="color" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { rateEmits, rateProps, useRateProps } from "./index"
import { useRect, useRects, useStyle, useUnitToPx } from "../hooks"
import { ref, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-rate" })

const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)
const useProps = useRateProps(props)
const score = ref(null)
const ranges = ref([])
const rect = ref<UniApp.NodeInfo>({})
const rects = ref<UniApp.NodeInfo[]>([])
const instance = getCurrentInstance()

const list = computed(() =>
  Array.from({ length: useProps.count })
    .fill("")
    .map((_, i) => getRateStatus(useProps.modelValue, i + 1)),
)

const style = computed(() => {
  const style: any = {}
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classes = computed(() => {
  const list: string[] = []
  if (useProps.disabled) list.push("ui-rate--disabled")
  if (useProps.readonly) list.push("ui-rate--readonly")
  return list
})

const itemStyle = computed(() => {
  return (index: number) => {
    const style: any = {}
    if (index < list.value.length - 1) {
      style.marginRight = `${useUnitToPx(useProps.gutter)}px`
    }
    return useStyle(style)
  }
})

const iconHalfStyle = computed(() => {
  return (item: any, index: number) => {
    const style: any = {}
    if (item.status === "full") style.width = "100%"
    if (item.status === "half") style.width = `${item.value * 100}%`
    return useStyle(style)
  }
})

const icon = computed(() => {
  return (item: any) => {
    return item.status === "full" ? useProps.icon : useProps.voidIcon
  }
})

const iconColor = computed(() => {
  return (item: any) => {
    return item.value && item.status === "full" ? useProps.color : useProps.voidColor
  }
})

const isShowHalf = computed(() => {
  return (item: any) => {
    return item.value && item.status === "half"
  }
})

async function resize() {
  await nextTick()
  rect.value = await useRect(".ui-rate", instance)
  rects.value = await useRects(".ui-rate__item", instance)
  await nextTick()

  updateRanges()
}

function getRateStatus(value: number, index: number) {
  if (value >= index) return { status: "full", value: 1 }

  if (value + 0.5 >= index && useProps.allowHalf && !useProps.readonly) return { status: "half", value: 0.5 }

  if (value + 1 >= index && useProps.allowHalf && useProps.readonly) {
    const cardinal = 10 ** 10
    return { status: "half", value: Math.round((value - index + 1) * cardinal) / cardinal }
  }

  return { status: "void", value: 0 }
}

async function updateRanges() {
  const gutter = useUnitToPx(useProps.gutter)
  rect.value = await useRect(".ui-rate", instance)
  rects.value = await useRects(".ui-rate__item", instance)
  ranges.value = []
  rects.value?.forEach((rect, index) => {
    if (useProps.allowHalf) {
      const left = index === 0 ? rect.left : rect.left - gutter / 2
      const right = index === 0 ? rect.width / 2 : rect.right - rect.width / 2
      ranges.value.push({ score: index + 0.5, left, right }, { score: index + 1, left: rect.left + rect.width / 2, right: rect.right + gutter / 2 })
    } else {
      const left = index === 0 ? rect.left : rect.left - gutter / 2
      const right = index === 0 ? rect.width + gutter / 2 : left + rect.width + gutter
      ranges.value.push({ score: index + 1, left, right })
    }
  })
}

function getScoreByPosition(x: number) {
  const minLeft = Math.min(...ranges.value.map((item) => item.left))
  const maxRight = Math.max(...ranges.value.map((item) => item.right))
  for (let i = 0; i < ranges.value.length; i++) {
    if (x >= ranges.value[i].left && x < ranges.value[i].right) {
      return ranges.value[i].score
    }
  }
  if (x <= minLeft) return 0
  if (x >= maxRight) return useProps.count
  return useProps.modelValue
}

async function onClick(event: any) {
  await updateRanges()
  const value = getScoreByPosition(event.detail.x)
  updateValue(value)
}

function onTouchstart() {
  updateRanges()
}

function onTouchmove(event: any) {
  if (!useProps.touchable) return
  const value = getScoreByPosition(event.touches[0].clientX)
  updateValue(value)
}

async function updateValue(value: number) {
  if (useProps.disabled) return
  if (useProps.readonly) return
  if (value === score.value) return
  emits("change", value)
  await nextTick()
  emits("update:modelValue", value)
  score.value = value
}

onMounted(() => resize())
defineExpose({ name: "ui-rate" })
</script>

<script lang="ts">
export default {
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss">
.ui-rate {
  width: max-content;
  display: inline-flex;
  align-items: center;

  &__item {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;

    &__icon {
      display: flex;
      overflow: hidden;

      &--half {
        top: 0;
        left: 0;
        width: 0;
        display: flex;
        z-index: 1;
        overflow: hidden;
        position: absolute;
        pointer-events: none;
      }
    }
  }
}
</style>
