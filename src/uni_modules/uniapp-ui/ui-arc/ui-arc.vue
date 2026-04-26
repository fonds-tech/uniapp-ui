<template>
  <view class="ui-arc" :class="[classNames, props.customClass]" :style="[containerStyle]" @click="emits('click')">
    <view class="ui-arc__inner" />
    <view v-if="$slots.default" class="ui-arc__content">
      <slot />
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { arcEmits, arcProps } from "./index"
import { useUnit, useColor, useStyle } from "../hooks"

defineOptions({ name: "ui-arc" })

const props = defineProps(arcProps)
const emits = defineEmits(arcEmits)

// 内层左右偏移百分比：(curvature - 100) / 2，<100 取 0
const offsetPercent = computed(() => Math.max(0, (validCurvature.value - 100) / 2))

// 类名集合
const classNames = computed(() => [`ui-arc--${props.direction}`, { "ui-arc--fixed": props.fixed }])

// 曲率限幅 [50, 500]，NaN 回退 120。曲率 = 内层宽度百分比，100 = 与父等宽（无弧），>100 越大弧越平
const validCurvature = computed(() => {
  const raw = Number(props.curvature)
  if (Number.isNaN(raw)) return 120
  return Math.max(50, Math.min(500, raw))
})

// 容器样式：所有可配置量通过 CSS var 注入，避免 inline 与 SCSS 双路径
const containerStyle = computed(() => {
  const styles: Record<string, string | number | undefined> = {
    "--ui-arc-offset": `${offsetPercent.value}%`,
    top: useUnit(props.top),
    left: useUnit(props.left),
    zIndex: props.zIndex,
  }
  if (props.height !== undefined) styles["--ui-arc-height"] = useUnit(props.height) as string
  if (props.background) styles["--ui-arc-background"] = useColor(props.background)
  return useStyle({ ...styles, ...useStyle(props.customStyle) })
})
</script>

<script lang="ts">
export default {
  name: "ui-arc",
  options: { virtualHost: true, multipleSlots: true, styleIsolation: "shared" },
}
</script>

<style lang="scss" scoped>
.ui-arc {
  --ui-arc-height: 130rpx;
  --ui-arc-offset: 10%;
  --ui-arc-background: var(--ui-color-primary);

  width: 100%;
  height: var(--ui-arc-height);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;

  // inner 用负偏移撑宽 + 100% border-radius 切椭圆弧；padding 抵消偏移使可视区回到父宽
  &__inner {
    left: calc(var(--ui-arc-offset) * -1);
    right: calc(var(--ui-arc-offset) * -1);
    height: 100%;
    overflow: hidden;
    position: absolute;
    background: var(--ui-arc-background);
    padding-left: var(--ui-arc-offset);
    padding-right: var(--ui-arc-offset);
  }

  &__content {
    z-index: var(--ui-z-index-base);
    position: relative;
  }

  &--fixed {
    position: fixed;
  }

  &--bottom &__inner {
    top: 0;
    border-radius: 0 0 100% 100%;
  }

  &--top &__inner {
    bottom: 0;
    border-radius: 100% 100% 0 0;
  }
}
</style>
