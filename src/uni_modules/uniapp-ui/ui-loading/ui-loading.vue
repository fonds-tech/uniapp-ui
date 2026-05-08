<template>
  <view
    v-if="props.show"
    class="ui-loading"
    :class="[{ 'ui-loading--vertical': props.vertical }, props.customClass]"
    :style="[rootStyle]"
  >
    <view class="ui-loading__icon">
      <slot name="icon">
        <view class="ui-loading__rotate" :class="`ui-loading__rotate--${props.type}`" />
      </slot>
    </view>
    <text v-if="props.text || $slots.default" class="ui-loading__text">
      <slot>{{ props.text }}</slot>
    </text>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { loadingProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-loading" })

const props = defineProps(loadingProps)

// 根节点样式：所有可定制项通过 CSS var 注入，SCSS 提供默认值
const rootStyle = computed(() => {
  const vars: Record<string, string | number | undefined> = {}
  if (props.color) vars["--ui-loading-color"] = useColor(props.color)
  if (props.size !== undefined) vars["--ui-loading-size"] = useUnit(props.size)
  if (props.textGap !== undefined) vars["--ui-loading-text-gap"] = useUnit(props.textGap)
  if (props.textSize !== undefined) vars["--ui-loading-text-size"] = useUnit(props.textSize)
  if (props.textColor) vars["--ui-loading-text-color"] = useColor(props.textColor)
  if (props.textWeight !== undefined) vars["--ui-loading-text-weight"] = String(props.textWeight)
  return useStyle({ ...vars, ...useStyle(props.customStyle) })
})
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
  --ui-loading-size: 32rpx;
  --ui-loading-color: var(--ui-color-text-tertiary);
  --ui-loading-text-gap: 12rpx;
  --ui-loading-text-size: inherit;
  --ui-loading-text-color: inherit;
  --ui-loading-text-weight: inherit;

  color: var(--ui-loading-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__icon {
    width: var(--ui-loading-size);
    height: var(--ui-loading-size);
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

  &__text {
    color: var(--ui-loading-text-color);
    font-size: var(--ui-loading-text-size);
    font-weight: var(--ui-loading-text-weight);
    margin-left: var(--ui-loading-text-gap);
  }

  &--vertical {
    flex-direction: column;

    .ui-loading__text {
      margin-top: var(--ui-loading-text-gap);
      margin-left: 0;
    }
  }
}
</style>
