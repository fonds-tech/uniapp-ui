<template>
  <view class="ui-rate" :class="[classNames, props.customClass]" :style="[rootStyle]" @click="onClick" @touchstart="onTouchstart" @touchmove="onTouchmove">
    <view v-for="(item, index) in list" :key="index" class="ui-rate__item" :style="[itemStyle(index)]">
      <view class="ui-rate__item__icon">
        <ui-icon :name="iconName(item)" :size="props.size" :weight="props.iconWeight" :color="iconColor(item)" />
      </view>
      <view v-if="isShowHalf(item)" class="ui-rate__item__icon ui-rate__item__icon--half" :style="[halfStyle(item)]">
        <ui-icon :name="props.icon" :size="props.size" :weight="props.iconWeight" :color="props.color" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import type { RateItem, RateRangeItem } from "./index"
import { formItemKey } from "../ui-form-item"
import { rateEmits, rateProps } from "./index"
import { useRect, useRects, useStyle, useParent, useUnitToPx } from "../hooks"
import { ref, computed, nextTick, onMounted, getCurrentInstance } from "vue"

defineOptions({ name: "ui-rate" })

const props = defineProps(rateProps)
const emits = defineEmits(rateEmits)

const instance = getCurrentInstance()

// form/form-item 级 disabled/readonly 合并
const { parent: formItem } = useParent(formItemKey)
const effectiveDisabled = computed(() => Boolean(props.disabled) || Boolean(formItem?.disabled?.value))
const effectiveReadonly = computed(() => Boolean(props.readonly) || Boolean(formItem?.readonly?.value))

const ranges = ref<RateRangeItem[]>([])

const list = computed<RateItem[]>(() => Array.from({ length: props.count }, (_, i) => getRateStatus(props.modelValue, i + 1)))
const rootStyle = computed(() => useStyle(props.customStyle))
const classNames = computed(() => {
  const list: string[] = []
  if (effectiveDisabled.value) list.push("ui-rate--disabled")
  if (effectiveReadonly.value) list.push("ui-rate--readonly")
  return list
})

function itemStyle(index: number): CSSProperties {
  return index < list.value.length - 1 ? { marginRight: `${useUnitToPx(props.gutter)}px` } : {}
}

function halfStyle(item: RateItem): CSSProperties {
  if (item.status === "full") return { width: "100%" }
  if (item.status === "half") return { width: `${item.value * 100}%` }
  return {}
}

function iconName(item: RateItem) {
  return item.status === "full" ? props.icon : props.voidIcon
}

function iconColor(item: RateItem) {
  if (effectiveDisabled.value) return props.disabledColor
  return item.value && item.status === "full" ? props.color : props.voidColor
}

function isShowHalf(item: RateItem) {
  return item.value > 0 && item.status === "half"
}

// 状态划分: full=已选 / half=半选 / void=未选
function getRateStatus(value: number, index: number): RateItem {
  if (value >= index) return { status: "full", value: 1 }
  if (value + 0.5 >= index && props.allowHalf && !effectiveReadonly.value) return { status: "half", value: 0.5 }
  if (value + 1 >= index && props.allowHalf && effectiveReadonly.value) {
    // 只读 + 半星: 精确显示小数比例 (避免 0.7 被强制显示成 0.5)
    const cardinal = 10 ** 10
    return { status: "half", value: Math.round((value - index + 1) * cardinal) / cardinal }
  }
  return { status: "void", value: 0 }
}

// 测量每个 item 的位置，划分点击/滑动可命中区间
async function updateRanges() {
  const gutter = useUnitToPx(props.gutter)
  const rects = await useRects(".ui-rate__item", instance)
  ranges.value = []
  rects?.forEach((rect, index) => {
    if (props.allowHalf) {
      const left = index === 0 ? rect.left : rect.left - gutter / 2
      const right = index === 0 ? rect.left + rect.width / 2 : rect.right - rect.width / 2
      ranges.value.push({ score: index + 0.5, left, right }, { score: index + 1, left: rect.left + rect.width / 2, right: rect.right + gutter / 2 })
    } else {
      const left = index === 0 ? rect.left : rect.left - gutter / 2
      const right = index === 0 ? rect.width + gutter / 2 : left + rect.width + gutter
      ranges.value.push({ score: index + 1, left, right })
    }
  })
}

function getScoreByPosition(x: number) {
  if (!ranges.value.length) return props.modelValue
  const minLeft = Math.min(...ranges.value.map((r) => r.left))
  const maxRight = Math.max(...ranges.value.map((r) => r.right))
  const hit = ranges.value.find((r) => x >= r.left && x < r.right)
  if (hit) return hit.score
  if (x <= minLeft) return 0
  if (x >= maxRight) return props.count
  return props.modelValue
}

async function updateValue(value: number) {
  if (effectiveDisabled.value || effectiveReadonly.value) return
  if (value === props.modelValue) return
  emits("change", value)
  await nextTick()
  emits("update:modelValue", value)
}

async function onClick(event: { detail: { x: number } }) {
  await updateRanges()
  updateValue(getScoreByPosition(event.detail.x))
}

async function onTouchstart() {
  await updateRanges()
}

function onTouchmove(event: TouchEvent) {
  if (!props.touchable) return
  updateValue(getScoreByPosition(event.touches[0].clientX))
}

async function resize() {
  await nextTick()
  await updateRanges()
}

onMounted(() => resize())

defineExpose({ resize })
</script>

<script lang="ts">
export default {
  name: "ui-rate",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style lang="scss" scoped>
.ui-rate {
  width: max-content;
  display: inline-flex;
  align-items: center;

  &--disabled {
    opacity: var(--ui-opacity-disabled);
    cursor: not-allowed;
  }

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
        z-index: 1;
        display: flex;
        overflow: hidden;
        position: absolute;
        pointer-events: none;
      }
    }
  }
}
</style>
