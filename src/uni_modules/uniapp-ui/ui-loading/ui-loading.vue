<template>
  <view v-if="useProps.show" class="ui-loading" :class="[classs, useProps.customClass]" :style="[style]">
    <view class="ui-loading__icon" :style="[iconStyle]">
      <slot name="icon">
        <view class="ui-loading__rotate" :class="[rotateClass]" />
      </slot>
    </view>
    <text v-if="isShowText" class="ui-loading__text" :style="[textStyle]">
      <slot>{{ useProps.text }}</slot>
    </text>
  </view>
</template>

<script setup lang="ts">
import type { CSSProperties } from "vue"
import { computed, useSlots } from "vue"
import { useUnit, useColor, useStyle } from "../hooks"
import { loadingEmits, loadingProps, useLoadingProps } from "./index"

defineOptions({ name: "ui-loading" })

const props = defineProps(loadingProps)
const emits = defineEmits(loadingEmits)
const useProps = useLoadingProps(props)
const slots = useSlots()

const style = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.color)
  return useStyle({ ...style, ...useStyle(useProps.customStyle) })
})

const classs = computed(() => {
  const list: string[] = []
  if (useProps.vertical) list.push("ui-loading--vertical")
  return list
})

const iconStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.color)
  style.width = useUnit(useProps.size)
  style.height = useUnit(useProps.size)
  return useStyle(style)
})

const rotateClass = computed(() => {
  const list: string[] = []
  list.push(`ui-loading__rotate--${useProps.type}`)
  return list
})

const textStyle = computed(() => {
  const style: CSSProperties = {}
  style.color = useColor(useProps.textColor)
  style.fontSize = useUnit(useProps.textSize)
  style.fontWeight = useProps.textWeight
  if (useProps.vertical) {
    style.marginTop = useUnit(useProps.textGap)
  } else {
    style.marginLeft = useUnit(useProps.textGap)
  }
  return useStyle(style)
})

const isShowText = computed(() => useProps.text || slots.default)
</script>

<script lang="ts">
export default {
  name: "ui-loading",
  options: {
    // #ifndef MP-TOUTIAO
    virtualHost: true,
    // #endif
    multipleSlots: true,
    styleIsolation: "shared",
  },
}
</script>

<style scoped lang="scss">
.ui-loading {
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__icon {
    width: 1em;
    height: 1em;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  &__rotate {
    color: currentColor;
    width: 100%;
    height: 100%;
    mask-size: 100% 100%;
    mask-repeat: no-repeat;
    background-color: currentColor;

    &--circular {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg stroke='currentColor'%3E%3Ccircle cx='12' cy='12' r='9.5' fill='none' stroke-linecap='round' stroke-width='2'%3E%3Canimate attributeName='stroke-dasharray' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0 150;42 150;42 150;42 150'/%3E%3Canimate attributeName='stroke-dashoffset' calcMode='spline' dur='1.5s' keySplines='0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1' keyTimes='0;0.475;0.95;1' repeatCount='indefinite' values='0;-16;-59;-59'/%3E%3C/circle%3E%3CanimateTransform attributeName='transform' dur='2s' repeatCount='indefinite' type='rotate' values='0 12 12;360 12 12'/%3E%3C/g%3E%3C!-- 1728200999879 --%3E%3C/svg%3E");
    }

    &--spinner {
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cg%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.08' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.17' transform='rotate(30 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.25' transform='rotate(60 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.33' transform='rotate(90 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.42' transform='rotate(120 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.50' transform='rotate(150 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.58' transform='rotate(180 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.67' transform='rotate(210 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.75' transform='rotate(240 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.83' transform='rotate(270 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' opacity='.92' transform='rotate(300 12 12)' rx='1' ry='1'/%3E%3Crect width='2' height='6' x='11' y='1' fill='currentColor' transform='rotate(330 12 12)' rx='1' ry='1'/%3E%3CanimateTransform attributeName='transform' calcMode='discrete' dur='1s' repeatCount='indefinite' type='rotate' values='0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12'/%3E%3C/g%3E%3C/svg%3E");
    }
  }

  &--vertical {
    flex-direction: column;
  }
}
</style>
